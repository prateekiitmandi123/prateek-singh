import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { resources } from "@/data/resources";

export const metadata: Metadata = {
  title: "Resources",
  description: "Verified links to demographic datasets, documentation, methods, and visualisation tools.",
};

const kinds = ["dataset", "documentation", "paper", "method", "tool"] as const;
const labels: Record<(typeof kinds)[number], string> = {
  dataset: "Datasets",
  documentation: "Survey documentation",
  paper: "Research papers and standards",
  method: "Statistical methods",
  tool: "Visualisation tools",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        kicker="Resources"
        title="A small library of sources worth citing."
        lede="Official survey homes, documentation, and tools. Links were checked against public institutional sites. Always re-verify before formal citation."
      />
      <div className="mx-auto max-w-7xl space-y-12 px-4 py-14 md:px-8">
        {kinds.map((kind) => {
          const items = resources.filter((r) => r.kind === kind);
          return (
            <section key={kind}>
              <h2 className="font-serif text-3xl text-forest-deep">{labels[kind]}</h2>
              <ul className="mt-6 grid gap-4 md:grid-cols-2">
                {items.map((item) => (
                  <li key={item.id} className="rounded-2xl border border-line bg-paper p-5">
                    <p className="text-xs text-muted">
                      {item.publisher} · {item.year}
                    </p>
                    <h3 className="mt-1 font-serif text-xl text-forest-deep">
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-teal">
                        {item.title}
                      </a>
                    </h3>
                    <p className="mt-2 text-sm text-ink-soft">{item.description}</p>
                    <p className="mt-3 break-all text-xs text-teal">{item.url}</p>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
