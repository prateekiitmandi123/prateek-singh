import Link from "next/link";

export function ArticlesEmpty({
  heading = "Coming soon",
  lede = "This section is ready. Pieces will appear here as they are written and published — no sample essays in the meantime.",
}: {
  heading?: string;
  lede?: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-cream/70 px-6 py-12 text-center">
      <p className="text-xs tracking-[0.18em] text-teal uppercase">Articles</p>
      <h3 className="mt-3 font-serif text-3xl text-forest-deep">{heading}</h3>
      <p className="mx-auto mt-3 max-w-xl text-ink-soft">{lede}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/contact"
          className="inline-flex min-h-11 items-center rounded-lg bg-forest px-5 text-sm text-cream hover:bg-teal"
        >
          Suggest a topic
        </Link>
        <Link
          href="/research"
          className="inline-flex min-h-11 items-center rounded-lg border border-forest px-5 text-sm text-forest hover:bg-cream"
        >
          See research notes
        </Link>
      </div>
    </div>
  );
}
