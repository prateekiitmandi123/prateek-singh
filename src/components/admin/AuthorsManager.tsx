"use client";

import { useState } from "react";
import type { Author } from "@/lib/types";

export function AuthorsManager({ initial }: { initial: Author[] }) {
  const [authors, setAuthors] = useState(initial);
  const [name, setName] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [bio, setBio] = useState("");
  const [isGuest, setIsGuest] = useState(true);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/authors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, affiliation, bio, isGuest, role: isGuest ? "Guest contributor" : "Author" }),
    });
    const json = await res.json();
    if (json.author) setAuthors((list) => [...list, json.author]);
    setName("");
    setBio("");
  }

  return (
    <div>
      <h1 className="font-serif text-3xl text-forest-deep">Author profiles</h1>
      <form onSubmit={create} className="mt-6 grid gap-3 rounded-2xl border border-line bg-cream p-4">
        <input className="min-h-11 rounded-lg border border-line px-3" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="min-h-11 rounded-lg border border-line px-3" placeholder="Affiliation" value={affiliation} onChange={(e) => setAffiliation(e.target.value)} />
        <textarea className="rounded-lg border border-line px-3 py-2" placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isGuest} onChange={(e) => setIsGuest(e.target.checked)} />
          Guest author
        </label>
        <button className="min-h-11 rounded-full bg-forest text-cream" type="submit">
          Add author
        </button>
      </form>
      <ul className="mt-8 space-y-3">
        {authors.map((a) => (
          <li key={a.id} className="rounded-xl border border-line p-4">
            <p className="font-medium">
              {a.name} {a.isGuest ? "· Guest" : ""} {a.isSample ? "· Sample" : ""}
            </p>
            <p className="text-sm text-muted">{a.affiliation}</p>
            <p className="text-sm text-ink-soft">{a.bio}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
