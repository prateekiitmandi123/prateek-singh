import { notFound } from "next/navigation";
import { ArticleEditor } from "@/components/admin/ArticleEditor";
import { canPublish, getSession } from "@/lib/auth";
import { getStore } from "@/lib/store";

export const instant = false;

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [store, user] = await Promise.all([getStore(), getSession()]);
  const article = store.articles.find((a) => a.id === id);
  if (!article) notFound();
  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl text-forest-deep">Edit article</h1>
      <ArticleEditor article={article} authors={store.authors} canPublish={canPublish(user!.role)} />
    </div>
  );
}
