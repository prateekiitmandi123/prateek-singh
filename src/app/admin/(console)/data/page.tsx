"use client";

import { useState } from "react";
import { AGE_GROUPS, RESIDENCE, SES_GROUPS, SEX, STATES, YEARS, indicators } from "@/data/dashboard";

export default function AdminDataPage() {
  const [message, setMessage] = useState("");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const point = Object.fromEntries(form.entries());
    const res = await fetch("/api/admin/dashboard", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ point }),
    });
    const json = await res.json();
    setMessage(res.ok ? "Point updated. Still demonstration data unless you document otherwise." : json.error);
  }
  return (
    <div>
      <h1 className="font-serif text-3xl text-forest-deep">Dashboard data</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Administrators can overwrite a single demonstration cell. Record the real source before
        treating a value as official.
      </p>
      <form onSubmit={onSubmit} className="mt-6 grid gap-3 rounded-2xl border border-line bg-cream p-4 md:grid-cols-2">
        <label className="text-sm">
          Indicator
          <select name="indicatorId" className="mt-1 min-h-11 w-full rounded-lg border px-2">
            {indicators.map((i) => (
              <option key={i.id} value={i.id}>
                {i.title}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          State
          <select name="state" className="mt-1 min-h-11 w-full rounded-lg border px-2">
            {STATES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          Year
          <select name="year" className="mt-1 min-h-11 w-full rounded-lg border px-2">
            {YEARS.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          Residence
          <select name="residence" className="mt-1 min-h-11 w-full rounded-lg border px-2">
            {RESIDENCE.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          Sex
          <select name="sex" className="mt-1 min-h-11 w-full rounded-lg border px-2">
            {SEX.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          Age
          <select name="age" className="mt-1 min-h-11 w-full rounded-lg border px-2">
            {AGE_GROUPS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          SES
          <select name="ses" className="mt-1 min-h-11 w-full rounded-lg border px-2">
            {SES_GROUPS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          Value
          <input name="value" type="number" step="0.01" required className="mt-1 min-h-11 w-full rounded-lg border px-3" />
        </label>
        <button className="min-h-11 rounded-full bg-forest text-cream md:col-span-2" type="submit">
          Update cell
        </button>
      </form>
      {message ? <p className="mt-3 text-sm text-teal">{message}</p> : null}
    </div>
  );
}
