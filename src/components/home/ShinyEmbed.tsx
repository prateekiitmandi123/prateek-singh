export function ShinyEmbed({ url }: { url: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-card)]">
      <iframe
        title="India Family Dashboard"
        src={url}
        className="h-[min(82vh,900px)] w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allow="fullscreen"
      />
    </div>
  );
}

export function ShinyConnectNote() {
  return (
    <div className="mb-8 rounded-2xl border border-line bg-cream p-5 md:p-6">
      <h2 className="font-serif text-2xl text-forest-deep">Connect your R Shiny dashboard</h2>
      <p className="mt-2 max-w-3xl text-sm text-ink-soft">
        Shiny apps cannot be pasted into this Next.js site as R files. Host the app, then set{" "}
        <code className="rounded bg-cream-dark px-1.5 py-0.5 text-xs">NEXT_PUBLIC_SHINY_DASHBOARD_URL</code> to
        its public HTTPS address. The dashboard page will embed it here.
      </p>
      <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-ink-soft">
        <li>Publish on shinyapps.io, Posit Connect, or your own Shiny Server.</li>
        <li>Copy the live URL (for example https://you.shinyapps.io/india-family-dashboard/).</li>
        <li>Put that URL in NEXT_PUBLIC_SHINY_DASHBOARD_URL and restart the site.</li>
        <li>If the frame stays blank, allow embedding on the Shiny host (do not send X-Frame-Options: DENY).</li>
      </ol>
      <p className="mt-3 text-xs text-muted">
        Until a URL is set, the demonstration charts below stay in place. They are labelled as demonstration
        values, not official estimates.
      </p>
    </div>
  );
}
