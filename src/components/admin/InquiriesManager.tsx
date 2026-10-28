"use client";

import { useState } from "react";
import type { Inquiry } from "@/lib/types";

export function InquiriesManager({ initial }: { initial: Inquiry[] }) {
  const [items, setItems] = useState(initial);

  async function mark(id: string) {
    await fetch("/api/admin/inquiries", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setItems((list) => list.map((i) => (i.id === id ? { ...i, status: "read" } : i)));
  }

  return (
    <div>
      <h1 className="font-serif text-3xl text-forest-deep">Inquiries</h1>
      <ul className="mt-6 space-y-4">
        {items.map((i) => (
          <li key={i.id} className="rounded-2xl border border-line p-4">
            <p className="text-xs uppercase text-muted">
              {i.topic} · {i.status} · {i.createdAt.slice(0, 10)}
            </p>
            <p className="font-medium">
              {i.name} · {i.email}
            </p>
            <p className="mt-2 text-sm text-ink-soft">{i.message}</p>
            {i.status === "new" ? (
              <button type="button" className="mt-3 text-sm text-teal" onClick={() => mark(i.id)}>
                Mark read
              </button>
            ) : null}
          </li>
        ))}
        {items.length === 0 ? <p className="text-sm text-muted">No messages yet.</p> : null}
      </ul>
    </div>
  );
}
