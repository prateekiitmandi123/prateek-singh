import Link from "next/link";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-[#f8f8f8] text-ink-soft">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center md:px-8">
        <p className="font-serif text-sm tracking-[0.22em] text-forest-deep uppercase">{site.name}</p>
        <p className="text-sm">
          Family Demography
          <span className="mx-2 text-muted">|</span>
          Biostatistics
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] tracking-[0.14em] uppercase">
          <Link href="/" className="hover:text-forest">
            Home
          </Link>
          <Link href="/about" className="hover:text-forest">
            About
          </Link>
          <Link href="/research" className="hover:text-forest">
            Research
          </Link>
          <Link href="/resources" className="hover:text-forest">
            Resources
          </Link>
          <Link href="/cv" className="hover:text-forest">
            CV
          </Link>
          <Link href="/contact" className="hover:text-forest">
            Contact
          </Link>
        </nav>
        <p className="text-[11px] text-muted">
          <Link href="/admin" className="hover:text-forest">
            Editorial login
          </Link>
          <span className="mx-2">·</span>
          Demonstration content is labelled throughout.
        </p>
      </div>
    </footer>
  );
}
