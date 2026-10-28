"use client";

import { useState } from "react";
import type { Project } from "@/lib/types";

export function ProjectsManager({ initial }: { initial: Project[] }) {
  const [projects, setProjects] = useState(initial);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [year, setYear] = useState("");
  const [topics, setTopics] = useState("");
  const [methods, setMethods] = useState("");
  const [status, setStatus] = useState<"ongoing" | "planned" | "completed">("planned");

  async function create(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, summary, year, topics, methods, status }),
    });
    const json = await res.json();
    if (json.project) setProjects((list) => [json.project, ...list]);
    setTitle("");
    setSummary("");
  }

  return (
    <div>
      <h1 className="font-serif text-3xl text-forest-deep">Research projects</h1>
      <form onSubmit={create} className="mt-6 grid gap-3 rounded-2xl border border-line bg-cream p-4">
        <input className="min-h-11 rounded-lg border border-line px-3" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea className="rounded-lg border border-line px-3 py-2" placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
        <input className="min-h-11 rounded-lg border border-line px-3" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} />
        <input className="min-h-11 rounded-lg border border-line px-3" placeholder="Topics, comma separated" value={topics} onChange={(e) => setTopics(e.target.value)} />
        <input className="min-h-11 rounded-lg border border-line px-3" placeholder="Methods, comma separated" value={methods} onChange={(e) => setMethods(e.target.value)} />
        <select className="min-h-11 rounded-lg border border-line px-3" value={status} onChange={(e) => setStatus(e.target.value as typeof status)}>
          <option value="planned">planned</option>
          <option value="ongoing">ongoing</option>
          <option value="completed">completed</option>
        </select>
        <button className="min-h-11 rounded-full bg-forest text-cream" type="submit">
          Add project
        </button>
      </form>
      <ul className="mt-8 space-y-3">
        {projects.map((p) => (
          <li key={p.id} className="rounded-xl border border-line p-4">
            <p className="text-xs uppercase text-muted">{p.status} · {p.year}</p>
            <h2 className="font-serif text-xl">{p.title}</h2>
            <p className="text-sm text-ink-soft">{p.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
