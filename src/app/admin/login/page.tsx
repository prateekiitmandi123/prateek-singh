"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });
    const json = await res.json();
    setPending(false);
    if (!res.ok) {
      setError(json.error || "Could not sign in.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 pt-32">
      <div className="flex items-center gap-3">
        <Logo />
        <h1 className="font-serif text-3xl text-forest-deep">Editorial login</h1>
      </div>
      <p className="mt-3 text-sm text-ink-soft">
        Local demonstration accounts. Change passwords before any public deployment.
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-2xl border border-line bg-paper p-6">
        <label className="block text-sm">
          Email
          <input
            name="email"
            type="email"
            autoComplete="username"
            required
            className="mt-1 min-h-11 w-full rounded-lg border border-line bg-cream px-3"
          />
        </label>
        <label className="block text-sm">
          Password
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="mt-1 min-h-11 w-full rounded-lg border border-line bg-cream px-3"
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="min-h-11 w-full cursor-pointer rounded-lg bg-forest text-cream hover:bg-teal disabled:opacity-60"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
        {error ? <p className="text-sm text-danger">{error}</p> : null}
      </form>
      <ul className="mt-6 space-y-1 text-xs text-muted">
        <li>Administrator: admin@local / admin123</li>
        <li>Editor: editor@local / editor123</li>
        <li>Contributor: contributor@local / contrib123</li>
      </ul>
    </div>
  );
}
