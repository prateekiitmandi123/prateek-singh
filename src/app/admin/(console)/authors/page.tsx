import { AuthorsManager } from "@/components/admin/AuthorsManager";
import { getStore } from "@/lib/store";



export default async function AdminAuthorsPage() {
  const store = await getStore();
  return <AuthorsManager initial={store.authors} />;
}
