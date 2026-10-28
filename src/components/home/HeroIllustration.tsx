export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 720 520"
      className="h-auto w-full"
      role="img"
      aria-label="Watercolor illustration of a family under a tree, a house, charts, and a schematic map of India"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f7f3e8" />
          <stop offset="100%" stopColor="#e8f0e4" />
        </linearGradient>
        <radialGradient id="sun" cx="58%" cy="18%" r="22%">
          <stop offset="0%" stopColor="#f3e3a8" />
          <stop offset="100%" stopColor="#f3e3a8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="720" height="520" fill="url(#sky)" />
      <circle cx="430" cy="92" r="118" fill="url(#sun)" />
      <ellipse cx="430" cy="92" rx="68" ry="68" fill="#f0d98a" opacity="0.55" />
      <ellipse cx="430" cy="92" rx="48" ry="48" fill="#f6e7a8" opacity="0.9" />

      <path
        d="M118 430c40-18 90-28 150-18 70 12 110 8 170-10 50-16 90-8 140 8 40 12 80 8 120-6"
        fill="#d7e6d2"
        opacity="0.7"
      />
      <path d="M40 455c80-30 180-20 280-8 90 10 170-18 250-6 70 10 120 4 150 16H40z" fill="#c9dbc4" opacity="0.55" />

      <g opacity="0.9">
        <ellipse cx="168" cy="168" rx="78" ry="92" fill="#9cbf86" />
        <ellipse cx="214" cy="148" rx="62" ry="78" fill="#b3d09a" />
        <ellipse cx="128" cy="196" rx="52" ry="64" fill="#86ad72" />
        <ellipse cx="188" cy="210" rx="70" ry="54" fill="#a8c88e" />
      </g>
      <path d="M168 210c8 40 10 90 8 150" stroke="#6d8f5e" strokeWidth="10" strokeLinecap="round" />
      <path d="M176 268c-28 18-46 14-62 8" stroke="#6d8f5e" strokeWidth="5" strokeLinecap="round" />
      <path d="M176 248c22 10 38 8 54 2" stroke="#6d8f5e" strokeWidth="4" strokeLinecap="round" />

      <g transform="translate(248 168)">
        <path d="M18 92 78 28l60 64v86H18z" fill="#e8f0dc" stroke="#7ea06c" strokeWidth="3.2" />
        <path d="M8 96 78 22l70 74" stroke="#7ea06c" strokeWidth="4" fill="none" strokeLinejoin="round" />
        <rect x="68" y="118" width="22" height="60" rx="2" fill="#8aa97a" />
        <rect x="40" y="108" width="18" height="18" rx="2" fill="#cfe0c0" />
        <rect x="100" y="108" width="18" height="18" rx="2" fill="#cfe0c0" />
      </g>

      <g transform="translate(286 292)">
        <circle cx="28" cy="22" r="16" fill="#5f8f7a" />
        <path d="M4 92c0-28 10-44 24-44s24 16 24 44" fill="#5f8f7a" />
        <circle cx="78" cy="18" r="17" fill="#3f6b5c" />
        <path d="M52 92c0-30 12-48 26-48s26 18 26 48" fill="#3f6b5c" />
        <circle cx="128" cy="38" r="13" fill="#7aa38a" />
        <path d="M108 92c0-20 8-32 20-32s20 12 20 32" fill="#7aa38a" />
        <circle cx="54" cy="48" r="11" fill="#c9a06a" />
        <path d="M38 92c0-18 7-28 16-28s16 10 16 28" fill="#c9a06a" />
        <path d="M44 54c8 10 16 12 24 2" stroke="#3f6b5c" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        <path d="M100 48c8 8 16 10 22 4" stroke="#3f6b5c" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>

      <g transform="translate(470 168)" opacity="0.95">
        <rect x="8" y="86" width="18" height="70" rx="3" fill="#8fb7c9" />
        <rect x="34" y="62" width="18" height="94" rx="3" fill="#6f9bb3" />
        <rect x="60" y="40" width="18" height="116" rx="3" fill="#5d8aa3" />
        <rect x="86" y="22" width="18" height="134" rx="3" fill="#4e7a94" />
      </g>

      <g transform="translate(548 78)" opacity="0.85">
        <path
          d="M42 8c10 6 16 16 24 20 10 6 20 2 26 12 8 12-2 22 4 34 6 10 18 12 16 24-2 14-14 16-12 28 2 10 12 14 6 22-6 10-18 8-24 16-8 10 2 20-10 26-12 8-24 0-36 4-10 4-14 16-26 16-14 0-18-12-30-10-10 2-14 12-26 8-10-4-8-16-6-26 2-10-6-18-2-28 4-10 16-12 18-22 2-10-8-18-4-28 4-10 16-8 22-16 6-8 2-20 12-26 8-6 18-2 30-8z"
          fill="#c5d9c2"
          stroke="#8aa97a"
          strokeWidth="1.4"
        />
      </g>

      <path
        d="M560 210c28-8 58-4 86 18 18 14 34 18 52 14"
        stroke="#7ea8bc"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="646" cy="228" r="4" fill="#4e7a94" />
      <circle cx="668" cy="214" r="3.2" fill="#4e7a94" />
      <g transform="translate(500 248)">
        <circle cx="18" cy="18" r="9" fill="#7aa38a" />
        <path d="M6 44c0-10 5-16 12-16s12 6 12 16" fill="#7aa38a" />
        <circle cx="46" cy="16" r="9" fill="#5f8f7a" />
        <path d="M34 44c0-10 5-16 12-16s12 6 12 16" fill="#5f8f7a" />
        <circle cx="74" cy="20" r="8" fill="#c9a06a" />
        <path d="M62 44c0-9 5-14 12-14s12 5 12 14" fill="#c9a06a" />
      </g>

      <g transform="translate(612 268)">
        <circle cx="40" cy="40" r="40" fill="#ead9a8" />
        <path d="M40 40 40 8 A32 32 0 0 1 68 54z" fill="#c9a06a" />
        <path d="M40 40 68 54 A32 32 0 0 1 18 64z" fill="#8fb7c9" />
        <path d="M40 40 18 64 A32 32 0 0 1 40 8z" fill="#7aa38a" />
      </g>

      <text
        x="548"
        y="52"
        className="font-script"
        fill="#3f6b5c"
        fontSize="22"
        fontFamily="var(--font-caveat), 'Segoe Script', cursive"
        transform="rotate(-8 548 52)"
      >
        Better families
      </text>
      <text
        x="572"
        y="78"
        fill="#3f6b5c"
        fontSize="20"
        fontFamily="var(--font-caveat), 'Segoe Script', cursive"
        transform="rotate(-6 572 78)"
      >
        Stronger communities
      </text>
      <text
        x="604"
        y="104"
        fill="#3f6b5c"
        fontSize="20"
        fontFamily="var(--font-caveat), 'Segoe Script', cursive"
        transform="rotate(-4 604 104)"
      >
        A healthier tomorrow
      </text>
    </svg>
  );
}
