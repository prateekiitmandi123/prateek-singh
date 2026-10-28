import { ProjectsManager } from "@/components/admin/ProjectsManager";
import { getStore } from "@/lib/store";

export const instant = false;

export default async function AdminProjectsPage() {
  const store = await getStore();
  return <ProjectsManager initial={store.projects} />;
}
