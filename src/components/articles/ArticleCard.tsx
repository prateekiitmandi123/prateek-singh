import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { CoverArt } from "@/components/ui/CoverArt";
import type { Article, Author } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function ArticleCard({
  article,
}: {
  article: Article;
  authors?: Author[];
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-paper shadow-[var(--shadow-card)] transition-shadow duration-200 hover:shadow-[var(--shadow)]">
      <Link href={`/articles/${article.slug}`} className="block overflow-hidden">
        <CoverArt hue={article.coverHue} label={article.coverLabel} className="h-40 w-full" />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-medium tracking-[0.14em] text-teal uppercase">
          {article.category}
        </p>
        <h3 className="mt-2 font-serif text-lg leading-snug text-forest-deep">
          <Link href={`/articles/${article.slug}`} className="hover:text-teal">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm text-ink-soft">{article.summary}</p>
        <div className="mt-4 flex items-center justify-between text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(article.publishedAt)}
          </span>
          <Link
            href={`/articles/${article.slug}`}
            className="inline-flex min-h-8 min-w-8 items-center justify-center text-forest group-hover:translate-x-0.5"
            aria-label={`Read ${article.title}`}
          >
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
