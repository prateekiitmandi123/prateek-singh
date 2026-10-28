"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { categories, articleKinds } from "@/data/site";
import { renderMarkdown } from "@/lib/markdown";
import type { Article, Author } from "@/lib/types";

export function ArticleEditor({
  article,
  authors,
  canPublish,
}: {
  article?: Article;
  authors: Author[];
  canPublish: boolean;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(article?.title ?? "");
  const [summary, setSummary] = useState(article?.summary ?? "");
  const [content, setContent] = useState(article?.content ?? "");
  const [status] = useState(article?.status ?? "draft");
  const [category, setCategory] = useState(article?.category ?? categories[0]);
  const [kind, setKind] = useState(article?.kind ?? "explainer");
  const [tags, setTags] = useState(article?.tags.join(", ") ?? "");
  const [coverLabel, setCoverLabel] = useState(article?.coverLabel ?? "Article");
  const [coverHue, setCoverHue] = useState(article?.coverHue ?? 150);
  const [authorIds, setAuthorIds] = useState<string[]>(article?.authorIds ?? ["prateek-singh"]);
  const [featured, setFeatured] = useState(article?.featured ?? false);
  const [citations, setCitations] = useState(
    article?.citations.map((c) => `${c.text}${c.url ? ` | ${c.url}` : ""}`).join("\n") ?? "",
  );
  const [preview, setPreview] = useState(false);
  const [message, setMessage] = useState("");
  const html = useMemo(() => renderMarkdown(content), [content]);

  function toggleAuthor(id: string) {
    setAuthorIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
  }

  async function save(nextStatus = status) {
    setMessage("");
    const payload = {
      id: article?.id,
      title,
      summary,
      content,
      status: nextStatus,
      category,
      kind,
      tags,
      coverLabel,
      coverHue,
      authorIds,
      featured,
      citations: citations
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line, i) => {
          const [text, url] = line.split("|").map((s) => s.trim());
          return { id: `c${i + 1}`, text, url };
        }),
    };
    const res = await fetch("/api/admin/articles", {
      method: article ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok) {
      setMessage(json.error || "Could not save.");
      return;
    }
    setMessage("Saved.");
    router.push("/admin/articles");
    router.refresh();
  }

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = new FormData();
    data.set("file", file);
    const res = await fetch("/api/admin/uploads", { method: "POST", body: data });
    const json = await res.json();
    if (json.url) {
      setContent((c) => `${c}\n\n![Uploaded image](${json.url})\n`);
      setMessage(`Uploaded ${json.url}`);
    } else setMessage(json.error || "Upload failed.");
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button type="button" className="min-h-11 rounded-full bg-forest px-4 text-sm text-cream" onClick={() => save()}>
          Save
        </button>
        {canPublish ? (
          <button
            type="button"
            className="min-h-11 rounded-full border border-forest px-4 text-sm"
            onClick={() => save("published")}
          >
            Publish
          </button>
        ) : (
          <p className="self-center text-xs text-muted">Contributors save drafts for editorial review.</p>
        )}
        {canPublish && article ? (
          <button
            type="button"
            className="min-h-11 rounded-full border border-line px-4 text-sm"
            onClick={() => save("archived")}
          >
            Archive
          </button>
        ) : null}
        <button type="button" className="min-h-11 rounded-full border border-line px-4 text-sm" onClick={() => setPreview((v) => !v)}>
          {preview ? "Edit" : "Preview"}
        </button>
      </div>
      {message ? <p className="text-sm text-teal">{message}</p> : null}

      {preview ? (
        <div className="rounded-2xl border border-line bg-paper p-6">
          <p className="text-xs uppercase text-gold">{category} · {kind}</p>
          <h2 className="font-serif text-3xl text-forest-deep">{title || "Untitled"}</h2>
          <p className="mt-2 text-ink-soft">{summary}</p>
          <div className="prose-article mt-6" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      ) : (
        <div className="grid gap-4">
          <label className="text-sm">
            Title
            <input className="mt-1 min-h-11 w-full rounded-lg border border-line bg-cream px-3" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label className="text-sm">
            Summary
            <textarea className="mt-1 w-full rounded-lg border border-line bg-cream px-3 py-2" rows={3} value={summary} onChange={(e) => setSummary(e.target.value)} />
          </label>
          <label className="text-sm">
            Body (Markdown)
            <textarea className="mt-1 min-h-64 w-full rounded-lg border border-line bg-cream px-3 py-2 font-mono text-sm" value={content} onChange={(e) => setContent(e.target.value)} />
          </label>
          <label className="text-sm">
            Cover image upload
            <input type="file" accept="image/*" className="mt-1 block" onChange={onUpload} />
          </label>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="text-sm">
              Category
              <select className="mt-1 min-h-11 w-full rounded-lg border border-line bg-cream px-3" value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              Type
              <select className="mt-1 min-h-11 w-full rounded-lg border border-line bg-cream px-3" value={kind} onChange={(e) => setKind(e.target.value as typeof kind)}>
                {articleKinds.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              Tags (comma separated)
              <input className="mt-1 min-h-11 w-full rounded-lg border border-line bg-cream px-3" value={tags} onChange={(e) => setTags(e.target.value)} />
            </label>
            <label className="text-sm">
              Cover label
              <input className="mt-1 min-h-11 w-full rounded-lg border border-line bg-cream px-3" value={coverLabel} onChange={(e) => setCoverLabel(e.target.value)} />
            </label>
            <label className="text-sm">
              Cover hue
              <input type="number" className="mt-1 min-h-11 w-full rounded-lg border border-line bg-cream px-3" value={coverHue} onChange={(e) => setCoverHue(Number(e.target.value))} />
            </label>
            {canPublish ? (
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
                Featured
              </label>
            ) : null}
          </div>
          <fieldset>
            <legend className="text-sm">Authors</legend>
            <div className="mt-2 flex flex-wrap gap-3">
              {authors.map((a) => (
                <label key={a.id} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={authorIds.includes(a.id)} onChange={() => toggleAuthor(a.id)} />
                  {a.name}
                </label>
              ))}
            </div>
          </fieldset>
          <label className="text-sm">
            Citations (one per line: text | url)
            <textarea className="mt-1 w-full rounded-lg border border-line bg-cream px-3 py-2 font-mono text-sm" rows={4} value={citations} onChange={(e) => setCitations(e.target.value)} />
          </label>
        </div>
      )}
    </div>
  );
}
