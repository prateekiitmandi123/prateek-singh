import Link from "next/link";
import { ArrowRight, BarChart3, BookOpen, Mail, Newspaper } from "lucide-react";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { ArticlesEmpty } from "@/components/articles/ArticlesEmpty";
import { DashboardPreview } from "@/components/home/DashboardPreview";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeIntro } from "@/components/home/HomeIntro";
import { getPublishedArticles } from "@/lib/queries";



export default async function Home() {
  const articles = await getPublishedArticles();
  const latest = articles.slice(0, 4);

  return (
    <>
      <HomeHero />
      <HomeIntro />
      <DashboardPreview />

      <section className="mx-auto max-w-6xl px-4 py-20 md:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-4xl text-forest-deep">Latest Articles</h2>
            <div className="mt-4 h-px w-16 bg-forest" />
          </div>
          <Link
            href="/articles"
            className="inline-flex min-h-11 items-center gap-1 text-sm text-muted hover:text-forest"
          >
            View all articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {latest.length > 0 ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {latest.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="mt-10">
            <ArticlesEmpty />
          </div>
        )}
      </section>

      <section className="border-t border-line bg-[#f8f8f8]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[0.7fr_1.3fr] md:px-8">
          <blockquote className="max-w-sm">
            <p className="font-serif text-2xl italic leading-snug text-forest-deep md:text-3xl">
              “Data tells a story, people give it meaning.”
            </p>
            <div className="mt-4 h-px w-16 bg-forest" />
          </blockquote>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/research",
                icon: BookOpen,
                title: "Research",
                text: "Coming soon — working papers, projects and datasets",
                cta: "Learn more",
              },
              {
                href: "/articles",
                icon: Newspaper,
                title: "Articles",
                text: "Thoughts, analysis and perspectives",
                cta: "Read more",
              },
              {
                href: "/dashboard",
                icon: BarChart3,
                title: "India Family Dashboard",
                text: "Coming soon — interactive maps and charts",
                cta: "View dashboard",
              },
              {
                href: "/contact",
                icon: Mail,
                title: "Get in Touch",
                text: "Collaboration, feedback or just a hello!",
                cta: "Contact me",
              },
            ].map((item) => (
              <div key={item.href}>
                <item.icon className="h-5 w-5 text-forest" strokeWidth={1.6} />
                <h3 className="mt-3 font-medium text-forest-deep">{item.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">{item.text}</p>
                <Link
                  href={item.href}
                  className="mt-3 inline-flex min-h-11 items-center gap-1 text-sm text-teal hover:underline"
                >
                  {item.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
