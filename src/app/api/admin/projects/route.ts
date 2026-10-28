import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getStore, saveStore } from "@/lib/store";
import type { Project } from "@/lib/types";
import { uid } from "@/lib/utils";

export async function GET() {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const store = await getStore();
  return NextResponse.json({ projects: store.projects });
}

export async function POST(request: Request) {
  const user = await getSession();
  if (!user || user.role === "contributor") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body = await request.json();
  const project: Project = {
    id: uid("proj"),
    title: String(body.title || "Untitled project"),
    status: body.status || "planned",
    summary: String(body.summary || ""),
    topics: String(body.topics || "")
      .split(",")
      .map((t: string) => t.trim())
      .filter(Boolean),
    methods: String(body.methods || "")
      .split(",")
      .map((t: string) => t.trim())
      .filter(Boolean),
    year: String(body.year || "Planned"),
    isSample: false,
  };
  await saveStore((s) => {
    s.projects.unshift(project);
  });
  return NextResponse.json({ project });
}

export async function PUT(request: Request) {
  const user = await getSession();
  if (!user || user.role === "contributor") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body = await request.json();
  await saveStore((s) => {
    const i = s.projects.findIndex((p) => p.id === body.id);
    if (i >= 0) {
      s.projects[i] = {
        ...s.projects[i],
        title: String(body.title ?? s.projects[i].title),
        status: body.status ?? s.projects[i].status,
        summary: String(body.summary ?? s.projects[i].summary),
        year: String(body.year ?? s.projects[i].year),
        topics: body.topics
          ? String(body.topics)
              .split(",")
              .map((t: string) => t.trim())
              .filter(Boolean)
          : s.projects[i].topics,
        methods: body.methods
          ? String(body.methods)
              .split(",")
              .map((t: string) => t.trim())
              .filter(Boolean)
          : s.projects[i].methods,
      };
    }
  });
  return NextResponse.json({ ok: true });
}
