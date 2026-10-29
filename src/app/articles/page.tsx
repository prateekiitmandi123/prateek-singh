import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { ArticlesEmpty } from "@/components/articles/ArticlesEmpty";
import { PageHero } from "@/components/layout/PageHero";
import { articleKinds, categories } from "@/data/site";
import { getAuthorMap, searchArticles } from "@/lib/queries";



export const metadata: Metadata = {
  title: "Articles",
  description: "Research notes, explainers, and commentary on family demography and Indian households.",
};

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; tag?: string; kind?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const page = Number(sp.page || 1);
  const [{ items, total, pages }, authors] = await Promise.all([
    searchArticles({
      q: sp.q,
      category: sp.category,
      tag: sp.tag,
      kind: sp.kind,
      page,
      pageSize: 6,
    }),
    getAuthorMap(),
  ]);

  const featured = items.filter((a) => a.featured).slice(0, 2);
  const tags = Array.from(new Set(items.flatMap((a) => a.tags))).slice(0, 12);
  const emptyCatalog = total === 0 && !sp.q && !sp.category && !sp.tag && !sp.kind;

  return (
    <>
      <PageHero
        kicker="Articles"
        title="Writing that keeps the source next to the sentence."
        lede="Coming soon. This section is open for explainers, research notes, data stories, and opinion. Nothing is listed yet because no articles have been written for this site."
      />
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        {emptyCatalog ? (
          <ArticlesEmpty />
        ) : (
          <>
            <form className="grid gap-3 rounded-2xl border border-line bg-cream p-4 md:grid-cols-4" method="get">
              <label className="block text-sm md:col-span-2">
                Search
                <input
                  name="q"
                  defaultValue={sp.q}
                  placeholder="Title, tag, or topic"
                  className="mt-1 min-h-11 w-full rounded-lg border border-line bg-paper px-3"
                />
              </label>
              <label className="block text-sm">
                Category
                <select name="category" defaultValue={sp.category || ""} className="mt-1 min-h-11 w-full rounded-lg border border-line bg-paper px-3">
                  <option value="">All</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                Type
                <select name="kind" defaultValue={sp.kind || ""} className="mt-1 min-h-11 w-full rounded-lg border border-line bg-paper px-3">
                  <option value="">All</option>
                  {articleKinds.map((k) => (
                    <option key={k.id} value={k.id}>
                      {k.label}
                    </option>
                  ))}
                </select>
              </label>
              <div className="md:col-span-4">
                <button className="min-h-11 rounded-lg bg-forest px-5 text-sm text-cream hover:bg-teal" type="submit">
                  Filter
                </button>
              </div>
            </form>

            {featured.length > 0 && !sp.q && !sp.category && page === 1 ? (
              <section className="mt-10">
                <h2 className="font-serif text-2xl text-forest-deep">Featured</h2>
                <div className="mt-4 grid gap-5 md:grid-cols-2">
                  {featured.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      authors={article.authorIds.map((id) => authors[id]).filter(Boolean)}
                    />
                  ))}
                </div>
              </section>
            ) : null}

            {tags.length > 0 ? (
              <div className="mt-8 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/articles?tag=${encodeURIComponent(tag)}`}
                    className="rounded-full border border-line px-3 py-1 text-xs text-teal hover:bg-cream"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            ) : null}

            <section className="mt-10">
              <p className="text-sm text-muted">
                {total} article{total === 1 ? "" : "s"}
              </p>
              <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    authors={article.authorIds.map((id) => authors[id]).filter(Boolean)}
                  />
                ))}
              </div>
              {items.length === 0 ? (
                <p className="mt-8 text-ink-soft">No articles match these filters.</p>
              ) : null}
              {pages > 1 ? (
                <nav className="mt-10 flex gap-2" aria-label="Pagination">
                  {Array.from({ length: pages }, (_, i) => i + 1).map((n) => {
                    const params = new URLSearchParams();
                    if (sp.q) params.set("q", sp.q);
                    if (sp.category) params.set("category", sp.category);
                    if (sp.tag) params.set("tag", sp.tag);
                    if (sp.kind) params.set("kind", sp.kind);
                    params.set("page", String(n));
                    return (
                      <Link
                        key={n}
                        href={`/articles?${params.toString()}`}
                        className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border ${n === page ? "bg-forest text-cream" : "border-line"}`}
                      >
                        {n}
                      </Link>
                    );
                  })}
                </nav>
              ) : null}
            </section>
          </>
        )}
      </div>
    </>
  );
}
