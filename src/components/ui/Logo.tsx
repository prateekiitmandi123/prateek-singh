export function Logo({ className = "h-10 w-14 text-forest" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 72 44"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="13" cy="11" r="6" stroke="currentColor" strokeWidth="2.2" />
      <path
        d="M3.5 38c0-9.4 4.2-14.5 9.5-14.5S22.5 28.6 22.5 38"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="32" cy="13.5" r="5.2" stroke="currentColor" strokeWidth="2.2" />
      <path
        d="M23.5 38c0-8.2 3.8-12.6 8.5-12.6S40.5 29.8 40.5 38"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <rect x="48" y="24" width="5.5" height="14" rx="1.2" fill="currentColor" />
      <rect x="56.5" y="16" width="5.5" height="22" rx="1.2" fill="currentColor" />
      <rect x="65" y="8" width="5.5" height="30" rx="1.2" fill="currentColor" />
    </svg>
  );
}
