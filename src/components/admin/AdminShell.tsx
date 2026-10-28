"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { SessionUser } from "@/lib/types";
import { cx } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Overview", roles: ["administrator", "editor", "contributor"] },
  { href: "/admin/articles", label: "Articles", roles: ["administrator", "editor", "contributor"] },
  { href: "/admin/articles/new", label: "New article", roles: ["administrator", "editor", "contributor"] },
  { href: "/admin/projects", label: "Projects", roles: ["administrator", "editor"] },
  { href: "/admin/authors", label: "Authors", roles: ["administrator", "editor"] },
  { href: "/admin/data", label: "Dashboard data", roles: ["administrator"] },
  { href: "/admin/inquiries", label: "Inquiries", roles: ["administrator", "editor"] },
];

export function AdminShell({ user, children }: { user: SessionUser; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 pt-24 md:grid-cols-[220px_1fr] md:px-6">
      <aside className="rounded-2xl border border-line bg-cream p-4">
        <p className="text-xs tracking-[0.16em] text-gold uppercase">Signed in</p>
        <p className="mt-1 font-medium">{user.name}</p>
        <p className="text-xs text-muted">{user.role}</p>
        <nav className="mt-4 flex flex-col gap-1" aria-label="Admin">
          {links
            .filter((l) => l.roles.includes(user.role))
            .map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cx(
                  "rounded-lg px-3 py-2 text-sm",
                  pathname === l.href ? "bg-forest text-cream" : "hover:bg-cream-dark",
                )}
              >
                {l.label}
              </Link>
            ))}
        </nav>
        <button
          type="button"
          onClick={logout}
          className="mt-4 min-h-11 cursor-pointer text-sm text-danger"
        >
          Sign out
        </button>
      </aside>
      <div>{children}</div>
    </div>
  );
}
