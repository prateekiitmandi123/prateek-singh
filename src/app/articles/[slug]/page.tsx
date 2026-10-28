import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CoverArt } from "@/components/ui/CoverArt";
import { getArticleBySlug, getAuthorMap, getPublishedArticles, relatedArticles } from "@/lib/queries";
import { renderMarkdown } from "@/lib/markdown";
import { formatDate } from "@/lib/utils";

export const instant = false;

export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article" };
  return { title: article.title, description: article.summary };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();
  const [authors, related] = await Promise.all([getAuthorMap(), relatedArticles(article)]);
  const byline = article.authorIds.map((id) => authors[id]).filter(Boolean);

  return (
    <article>
      <header className="border-b border-line bg-cream pt-16">
        <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
          <p className="text-xs tracking-[0.18em] text-gold uppercase">
            {article.category} · {article.kind}
            {article.isSample ? " · Sample content" : ""}
          </p>
          <h1 className="mt-3 font-serif text-4xl text-forest-deep md:text-5xl">{article.title}</h1>
          <p className="mt-4 text-lg text-ink-soft">{article.summary}</p>
          <p className="mt-4 text-sm text-muted">
            {byline.map((a) => a.name).join(", ")} · {formatDate(article.publishedAt)} · {article.readingMinutes} min read
          </p>
        </div>
      </header>
      <CoverArt hue={article.coverHue} label={article.coverLabel} className="mx-auto h-56 w-full max-w-5xl md:h-72" />
      <div
        className="prose-article mx-auto max-w-3xl px-4 py-12 md:px-6"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(article.content) }}
      />
      {byline.length > 0 ? (
        <section className="mx-auto max-w-3xl px-4 pb-8 md:px-6">
          <h2 className="font-serif text-2xl text-forest-deep">Authors</h2>
          <ul className="mt-4 space-y-3">
            {byline.map((a) => (
              <li key={a.id} className="rounded-xl border border-line bg-cream p-4">
                <p className="font-medium">
                  {a.name}
                  {a.isGuest ? " · Guest" : ""}
                  {a.isSample ? " · Sample profile" : ""}
                </p>
                <p className="text-sm text-ink-soft">
                  {a.role}, {a.affiliation}
                </p>
                <p className="mt-1 text-sm text-muted">{a.bio}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {article.citations.length > 0 ? (
        <section className="mx-auto max-w-3xl px-4 pb-8 md:px-6">
          <h2 className="font-serif text-2xl text-forest-deep">References</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-ink-soft">
            {article.citations.map((c) => (
              <li key={c.id}>
                {c.text}{" "}
                {c.url ? (
                  <a href={c.url} className="text-teal" target="_blank" rel="noopener noreferrer">
                    Link
                  </a>
                ) : null}
              </li>
            ))}
          </ol>
        </section>
      ) : null}
      {related.length > 0 ? (
        <section className="mx-auto max-w-3xl px-4 pb-16 md:px-6">
          <h2 className="font-serif text-2xl text-forest-deep">Related</h2>
          <ul className="mt-4 space-y-3">
            {related.map((a) => (
              <li key={a.id}>
                <Link href={`/articles/${a.slug}`} className="text-teal hover:underline">
                  {a.title}
                </Link>
                <span className="text-sm text-muted"> · {a.category}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
