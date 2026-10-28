import { NextResponse } from "next/server";
import { canPublish, getSession } from "@/lib/auth";
import { getStore, saveStore } from "@/lib/store";
import type { Article, ArticleKind, ArticleStatus } from "@/lib/types";
import { readingTime, slugify, uid } from "@/lib/utils";

export async function GET() {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const store = await getStore();
  const articles =
    user.role === "contributor"
      ? store.articles.filter((a) => a.authorIds.includes("prateek-singh") || a.authorIds.includes(user.id))
      : store.articles;
  return NextResponse.json({ articles, authors: store.authors });
}

export async function POST(request: Request) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const body = await request.json();
  const title = String(body.title || "").trim();
  if (title.length < 4) return NextResponse.json({ error: "Title is required." }, { status: 400 });
  let status = (body.status || "draft") as ArticleStatus;
  if (status === "published" && !canPublish(user.role)) status = "draft";
  const content = String(body.content || "");
  const article: Article = {
    id: uid("art"),
    slug: slugify(String(body.slug || title)),
    title,
    summary: String(body.summary || "").slice(0, 280),
    content,
    coverHue: Number(body.coverHue || 150),
    coverLabel: String(body.coverLabel || "Article"),
    authorIds: Array.isArray(body.authorIds) && body.authorIds.length ? body.authorIds : ["prateek-singh"],
    category: String(body.category || "Commentary"),
    tags: String(body.tags || "")
      .split(",")
      .map((t: string) => t.trim())
      .filter(Boolean),
    kind: (body.kind || "explainer") as ArticleKind,
    status,
    publishedAt: new Date().toISOString().slice(0, 10),
    updatedAt: new Date().toISOString().slice(0, 10),
    readingMinutes: readingTime(content),
    citations: Array.isArray(body.citations) ? body.citations : [],
    featured: Boolean(body.featured) && canPublish(user.role),
    isSample: false,
  };
  await saveStore((store) => {
    store.articles.unshift(article);
  });
  return NextResponse.json({ article });
}

export async function PUT(request: Request) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const body = await request.json();
  const id = String(body.id || "");
  const store = await getStore();
  const existing = store.articles.find((a) => a.id === id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (user.role === "contributor" && !existing.authorIds.includes("prateek-singh") && !existing.authorIds.includes(user.id)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  let status = (body.status ?? existing.status) as ArticleStatus;
  if (status === "published" && !canPublish(user.role)) status = existing.status;
  const content = String(body.content ?? existing.content);
  await saveStore((s) => {
    const i = s.articles.findIndex((a) => a.id === id);
    s.articles[i] = {
      ...s.articles[i],
      title: String(body.title ?? existing.title),
      slug: slugify(String(body.slug ?? existing.slug)),
      summary: String(body.summary ?? existing.summary),
      content,
      coverHue: Number(body.coverHue ?? existing.coverHue),
      coverLabel: String(body.coverLabel ?? existing.coverLabel),
      authorIds: Array.isArray(body.authorIds) ? body.authorIds : existing.authorIds,
      category: String(body.category ?? existing.category),
      tags: body.tags
        ? String(body.tags)
            .split(",")
            .map((t: string) => t.trim())
            .filter(Boolean)
        : existing.tags,
      kind: (body.kind ?? existing.kind) as ArticleKind,
      status,
      featured: canPublish(user.role) ? Boolean(body.featured) : existing.featured,
      updatedAt: new Date().toISOString().slice(0, 10),
      readingMinutes: readingTime(content),
      citations: Array.isArray(body.citations) ? body.citations : existing.citations,
    };
  });
  return NextResponse.json({ ok: true });
}
