import { InquiriesManager } from "@/components/admin/InquiriesManager";
import { getStore } from "@/lib/store";

export const instant = false;

export default async function InquiriesPage() {
  const store = await getStore();
  return <InquiriesManager initial={store.inquiries} />;
}
