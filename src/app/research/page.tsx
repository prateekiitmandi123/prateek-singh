import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/ComingSoon";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Research",
  description: "Research interests, projects, and publications in family demography.",
};

export default function ResearchPage() {
  return (
    <>
      <PageHero
        kicker="Research"
        title="Projects, methods, and publications."
        lede="Coming soon. Working titles and papers will appear here as they are written."
      />
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        <ComingSoon
          kicker="Research"
          lede="Projects, methods notes, and publications will be listed here when they are ready. Nothing is invented in the meantime."
        />
      </div>
    </>
  );
}
