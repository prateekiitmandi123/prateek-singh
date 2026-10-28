import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 pt-32 text-center">
      <p className="text-xs tracking-[0.2em] text-gold uppercase">404</p>
      <h1 className="mt-3 font-serif text-4xl text-forest-deep">This page is not on the roster.</h1>
      <p className="mt-4 text-ink-soft">The address does not match a published page.</p>
      <Link href="/" className="mt-8 inline-flex min-h-11 items-center rounded-lg bg-forest px-5 text-sm text-cream hover:bg-teal">
        Back to home
      </Link>
    </div>
  );
}
