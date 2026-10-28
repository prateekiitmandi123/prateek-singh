import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/ComingSoon";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "India Family Dashboard",
  description: "India’s Changing Family Dynamics — coming soon.",
};

export default function DashboardPage() {
  return (
    <>
      <PageHero
        kicker="Dashboard"
        title="India’s Changing Family Dynamics"
        lede="Coming soon. Interactive maps and charts for household composition, marriage and fertility, work, and children."
      />
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <ComingSoon
          kicker="India Family Dashboard"
          lede="The interactive dashboard will appear here when it is ready. Demonstration charts are not shown in the meantime."
        />
      </div>
    </>
  );
}
