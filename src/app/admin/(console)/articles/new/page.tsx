import { ArticleEditor } from "@/components/admin/ArticleEditor";
import { canPublish, getSession } from "@/lib/auth";
import { getStore } from "@/lib/store";

export const instant = false;

export default async function NewArticlePage() {
  const [store, user] = await Promise.all([getStore(), getSession()]);
  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl text-forest-deep">New article</h1>
      <ArticleEditor authors={store.authors} canPublish={canPublish(user!.role)} />
    </div>
  );
}
