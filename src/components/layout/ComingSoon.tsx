import Link from "next/link";

export function ComingSoon({
  kicker,
  lede,
}: {
  kicker: string;
  lede: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-cream/70 px-6 py-12 text-center">
      <p className="text-xs tracking-[0.18em] text-teal uppercase">{kicker}</p>
      <h3 className="mt-3 font-serif text-3xl text-forest-deep">Coming soon</h3>
      <p className="mx-auto mt-3 max-w-xl text-ink-soft">{lede}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/contact"
          className="inline-flex min-h-11 items-center rounded-lg bg-forest px-5 text-sm text-cream hover:bg-teal"
        >
          Get in touch
        </Link>
        <Link
          href="/about"
          className="inline-flex min-h-11 items-center rounded-lg border border-forest px-5 text-sm text-forest hover:bg-cream"
        >
          About Me
        </Link>
      </div>
    </div>
  );
}
