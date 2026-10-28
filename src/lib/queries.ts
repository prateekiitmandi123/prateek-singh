import { getStore } from "@/lib/store";
import type { Article } from "@/lib/types";

export async function getPublishedArticles() {
  const store = await getStore();
  return store.articles
    .filter((a) => a.status === "published")
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export async function getArticleBySlug(slug: string, includeUnpublished = false) {
  const store = await getStore();
  return store.articles.find((a) => a.slug === slug && (includeUnpublished || a.status === "published"));
}

export async function getAuthors() {
  const store = await getStore();
  return store.authors;
}

export async function getAuthorMap() {
  const authors = await getAuthors();
  return Object.fromEntries(authors.map((a) => [a.id, a]));
}

export async function getProjects() {
  const store = await getStore();
  return store.projects;
}

export async function relatedArticles(article: Article, limit = 3) {
  const all = await getPublishedArticles();
  return all
    .filter((a) => a.id !== article.id)
    .map((a) => {
      const tagScore = a.tags.filter((t) => article.tags.includes(t)).length;
      const catScore = a.category === article.category ? 2 : 0;
      return { a, score: tagScore + catScore };
    })
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score)
    .slice(0, limit)
    .map((x) => x.a);
}

export async function searchArticles(opts: {
  q?: string;
  category?: string;
  tag?: string;
  kind?: string;
  page?: number;
  pageSize?: number;
}) {
  const all = await getPublishedArticles();
  const q = opts.q?.toLowerCase().trim() ?? "";
  const filtered = all.filter((a) => {
    if (opts.category && a.category !== opts.category) return false;
    if (opts.tag && !a.tags.includes(opts.tag)) return false;
    if (opts.kind && a.kind !== opts.kind) return false;
    if (!q) return true;
    const hay = `${a.title} ${a.summary} ${a.tags.join(" ")} ${a.category}`.toLowerCase();
    return hay.includes(q);
  });
  const pageSize = opts.pageSize ?? 6;
  const page = Math.max(1, opts.page ?? 1);
  const start = (page - 1) * pageSize;
  return {
    items: filtered.slice(start, start + pageSize),
    total: filtered.length,
    page,
    pageSize,
    pages: Math.max(1, Math.ceil(filtered.length / pageSize)),
  };
}
