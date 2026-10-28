import Link from "next/link";
import { getSession } from "@/lib/auth";
import { getStore } from "@/lib/store";

export const instant = false;

export default async function AdminArticlesPage() {
  const [store, user] = await Promise.all([getStore(), getSession()]);
  const articles =
    user?.role === "contributor"
      ? store.articles.filter((a) => a.authorIds.includes("prateek-singh") || a.authorIds.includes(user.id))
      : store.articles;
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl text-forest-deep">Articles</h1>
        <Link href="/admin/articles/new" className="rounded-full bg-forest px-4 py-2 text-sm text-cream">
          New
        </Link>
      </div>
      <table className="mt-6 w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line text-muted">
            <th className="py-2">Title</th>
            <th>Status</th>
            <th>Type</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((a) => (
            <tr key={a.id} className="border-b border-line/70">
              <td className="py-3">
                <Link href={`/admin/articles/${a.id}`} className="text-teal hover:underline">
                  {a.title}
                </Link>
              </td>
              <td>{a.status}</td>
              <td>{a.kind}</td>
              <td>{a.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
