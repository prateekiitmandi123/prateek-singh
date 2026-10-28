import Link from "next/link";
import { site } from "@/data/site";
import { MobileNav } from "@/components/layout/MobileNav";

export function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-white/15 bg-[#1a1a1a] text-white">
      <div className="flex h-16 w-full items-center justify-between gap-4 px-5 md:px-8 lg:px-12">
        <Link href="/" className="brand-name text-lg uppercase">
          {site.name}
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {site.headerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[12px] tracking-[0.16em] text-white/80 uppercase hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <MobileNav items={site.headerNav} />
      </div>
    </header>
  );
}
