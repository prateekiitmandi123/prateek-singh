import Link from "next/link";
import { getSession } from "@/lib/auth";
import { getStore } from "@/lib/store";



export default async function AdminHome() {
  const [store, user] = await Promise.all([getStore(), getSession()]);
  const counts = {
    published: store.articles.filter((a) => a.status === "published").length,
    drafts: store.articles.filter((a) => a.status === "draft").length,
    archived: store.articles.filter((a) => a.status === "archived").length,
    authors: store.authors.length,
    projects: store.projects.length,
    inquiries: store.inquiries.filter((i) => i.status === "new").length,
  };
  return (
    <div>
      <h1 className="font-serif text-3xl text-forest-deep">Editorial overview</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Signed in as {user?.name}. Roles control publish, archive, authors, and dashboard edits.
      </p>
      <dl className="mt-8 grid gap-4 sm:grid-cols-3">
        {Object.entries(counts).map(([k, v]) => (
          <div key={k} className="rounded-2xl border border-line bg-cream p-4">
            <dt className="text-xs tracking-wide text-muted uppercase">{k}</dt>
            <dd className="font-serif text-3xl text-forest-deep">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/admin/articles/new" className="rounded-full bg-forest px-5 py-2 text-sm text-cream">
          New article
        </Link>
        <Link href="/articles" className="rounded-full border border-line px-5 py-2 text-sm">
          View public articles
        </Link>
      </div>
    </div>
  );
}
