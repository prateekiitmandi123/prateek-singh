export default function DashboardLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="h-8 w-64 rounded bg-cream-dark" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-36 rounded-2xl bg-cream" />
        ))}
      </div>
    </div>
  );
}
