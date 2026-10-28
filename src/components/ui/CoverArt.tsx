import type { ReactNode } from "react";

const scenes: Record<string, (hue: number) => ReactNode> = {
  Households: (hue) => (
    <>
      <rect width="400" height="200" fill={`hsl(${hue} 28% 28%)`} />
      <circle cx="70" cy="46" r="28" fill="#f2d58a" opacity="0.85" />
      <path d="M0 128 90 78l70 38 80-58 70 48 90-40V200H0z" fill="#5f8f5a" />
      <path d="M0 156 70 118l60 28 90-50 80 36 100-24V200H0z" fill="#3f6b4a" />
      <g fill="#f4efe4" opacity="0.9">
        <circle cx="148" cy="118" r="10" />
        <circle cx="176" cy="120" r="10" />
        <circle cx="162" cy="132" r="8" />
      </g>
    </>
  ),
  Fertility: (hue) => (
    <>
      <rect width="400" height="200" fill={`hsl(${hue + 8} 22% 36%)`} />
      <circle cx="320" cy="40" r="70" fill="#f0d98a" opacity="0.35" />
      <path d="M0 150c60-40 90-10 150-40 70-34 90 6 160-20 50-18 70-8 90 6v104H0z" fill="#c9a06a" />
      <path d="M168 86c0 28 18 48 32 62 14-14 32-34 32-62 0-22-14-36-32-36s-32 14-32 36z" fill="#7aa38a" />
    </>
  ),
  Work: (hue) => (
    <>
      <rect width="400" height="200" fill={`hsl(${hue} 24% 30%)`} />
      <rect x="40" y="70" width="70" height="90" fill="#d7c4a3" />
      <rect x="130" y="40" width="90" height="120" fill="#cbb48a" />
      <rect x="240" y="58" width="80" height="102" fill="#b79a6e" />
      <rect x="80" y="96" width="18" height="28" fill="#6f8fa8" />
      <rect x="160" y="70" width="22" height="34" fill="#6f8fa8" />
      <path d="M0 170h400v30H0z" fill="#8aa382" />
    </>
  ),
  Methods: (hue) => (
    <>
      <rect width="400" height="200" fill={`hsl(${hue} 18% 26%)`} />
      <rect x="40" y="40" width="140" height="120" rx="8" fill="#f4efe4" opacity="0.16" />
      <path d="M60 130 110 80 150 108 210 50" stroke="#d4bc7a" strokeWidth="4" fill="none" />
      <circle cx="110" cy="80" r="6" fill="#c5d4b8" />
      <circle cx="210" cy="50" r="6" fill="#d4bc7a" />
      <rect x="240" y="70" width="16" height="70" fill="#8aa382" />
      <rect x="268" y="50" width="16" height="90" fill="#6f8fa8" />
      <rect x="296" y="86" width="16" height="54" fill="#d4bc7a" />
    </>
  ),
  Children: (hue) => (
    <>
      <rect width="400" height="200" fill={`hsl(${hue} 26% 32%)`} />
      <circle cx="80" cy="40" r="26" fill="#f6e7a8" />
      <path d="M0 120c50-20 90 10 140-10 60-24 90 8 140-8 50-16 80 4 120 16v82H0z" fill="#7aa38a" />
      <circle cx="190" cy="108" r="14" fill="#c9a06a" />
      <circle cx="230" cy="112" r="11" fill="#f4efe4" />
      <path d="M176 148c0-18 12-28 24-28h20c12 0 24 10 24 28" fill="#5f8f7a" />
    </>
  ),
  Commentary: (hue) => (
    <>
      <rect width="400" height="200" fill={`hsl(${hue} 20% 28%)`} />
      <path d="M0 160 80 90l70 40 90-70 80 50 80-30V200H0z" fill="#4e6b58" />
      <path d="M40 200 120 110l40 30 70-60 70 40 60-20v100z" fill="#6d8f5e" />
      <circle cx="300" cy="46" r="22" fill="#f0d98a" opacity="0.7" />
    </>
  ),
  Draft: (hue) => (
    <>
      <rect width="400" height="200" fill={`hsl(${hue} 16% 30%)`} />
      <rect x="70" y="36" width="260" height="128" rx="8" fill="#f4efe4" opacity="0.14" />
      <path d="M96 70h208M96 96h176M96 122h140" stroke="#d4bc7a" strokeWidth="4" />
    </>
  ),
};

function fallback(hue: number) {
  const a = `hsl(${hue} 28% 28%)`;
  const b = `hsl(${hue + 24} 22% 46%)`;
  const c = `hsl(${hue - 18} 30% 72%)`;
  return (
    <>
      <rect width="400" height="200" fill={a} />
      <circle cx="320" cy="40" r="70" fill={c} opacity="0.35" />
      <circle cx="70" cy="160" r="50" fill={b} opacity="0.35" />
      <path d="M0 150c40-40 80-20 120-50s90-10 140-40 70-20 80-10v150H0z" fill={b} opacity="0.45" />
    </>
  );
}

export function CoverArt({
  hue,
  label,
  className = "h-44",
}: {
  hue: number;
  label: string;
  className?: string;
}) {
  const scene = scenes[label] ?? fallback;
  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 200" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        {scene(hue)}
      </svg>
    </div>
  );
}
