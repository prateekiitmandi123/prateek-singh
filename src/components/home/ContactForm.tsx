"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("startedAt", "0");
    setStatus("sending");
    setMessage("");
    const res = await fetch("/api/contact", { method: "POST", body: data });
    const json = (await res.json()) as { ok: boolean; error?: string };
    if (!res.ok || !json.ok) {
      setStatus("error");
      setMessage(json.error || "Please check the form and try again.");
      return;
    }
    setStatus("ok");
    setMessage("Thank you. The message has been recorded for editorial review.");
    form.reset();
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-paper p-6 md:p-8">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name <span className="text-danger">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className="mt-1 min-h-11 w-full rounded-lg border border-line bg-cream px-3"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email <span className="text-danger">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1 min-h-11 w-full rounded-lg border border-line bg-cream px-3"
          />
        </div>
        <div>
          <label htmlFor="topic" className="block text-sm font-medium">
            Topic <span className="text-danger">*</span>
          </label>
          <select
            id="topic"
            name="topic"
            required
            className="mt-1 min-h-11 w-full rounded-lg border border-line bg-cream px-3"
            defaultValue="enquiry"
          >
            <option value="collaboration">Research collaboration</option>
            <option value="submission">Article submission</option>
            <option value="enquiry">Academic enquiry</option>
          </select>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            Message <span className="text-danger">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            minLength={20}
            rows={6}
            className="mt-1 w-full rounded-lg border border-line bg-cream px-3 py-2"
          />
          <p className="mt-1 text-xs text-muted">At least 20 characters.</p>
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-lg bg-forest px-5 text-sm text-cream hover:bg-teal disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {message ? (
          <p className={status === "ok" ? "text-ok" : "text-danger"} role="status">
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
