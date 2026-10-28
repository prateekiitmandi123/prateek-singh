export function PageHero({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede: string;
}) {
  return (
    <section className="border-b border-line bg-[#f8f8f8] pt-16">
      <div className="mx-auto max-w-4xl px-4 py-14 text-center md:px-8 md:py-16">
        <p className="text-[11px] tracking-[0.22em] text-muted uppercase">{kicker}</p>
        <h1 className="mt-4 font-serif text-3xl leading-tight text-forest-deep md:text-5xl">{title}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">{lede}</p>
      </div>
    </section>
  );
}
