"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function MobileNav({
  items,
}: {
  items: Array<{ href: string; label: string }>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        <span className="sr-only">Toggle menu</span>
      </button>
      {open ? (
        <nav
          id="mobile-nav"
          className="absolute top-16 right-0 left-0 border-t border-white/15 bg-[#1a1a1a] px-4 py-3"
          aria-label="Mobile"
        >
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block px-3 py-3 text-sm tracking-[0.12em] text-white/85 uppercase"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/resources"
                className="block px-3 py-3 text-sm tracking-[0.12em] text-white/85 uppercase"
                onClick={() => setOpen(false)}
              >
                Resources
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
