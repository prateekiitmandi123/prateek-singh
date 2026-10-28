import Link from "next/link";
import { ArrowRight } from "lucide-react";

const tabs = ["Family Structure", "Fertility", "Marriage", "Gender & Education", "Household Composition"];

const legend = [
  { label: "< 20", color: "#d7ebe3" },
  { label: "20 – 40", color: "#b7d8cc" },
  { label: "40 – 60", color: "#8fb9ad" },
  { label: "60 – 80", color: "#5e8f86" },
  { label: "> 80", color: "#355f5a" },
];

export function DashboardPreview() {
  return (
    <section className="bg-[#f8f8f8]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-[0.78fr_1.22fr] md:px-8 md:py-20">
        <div>
          <p className="text-xs tracking-[0.18em] text-teal uppercase">Coming soon</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-forest-deep md:text-5xl">
            India’s Changing Family Dynamics
          </h2>
          <span className="accent-rule" />
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-ink-soft">
            Explore how family structures, sizes, and composition are changing across India — from marriage and fertility
            to women’s empowerment and intergenerational support.
          </p>
          <Link
            href="/dashboard"
            className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-lg bg-forest px-5 text-sm text-cream hover:bg-teal"
          >
            Explore the Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="rounded-2xl border border-white/70 bg-paper p-4 shadow-[var(--shadow-card)] md:p-5">
          <div className="flex gap-1 overflow-x-auto border-b border-line pb-2 text-[12px] text-muted">
            {tabs.map((tab, i) => (
              <span
                key={tab}
                className={
                  i === 0
                    ? "shrink-0 border-b-2 border-forest px-3 py-2 font-medium text-forest-deep"
                    : "shrink-0 px-3 py-2"
                }
              >
                {tab}
              </span>
            ))}
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-[1.05fr_1fr_0.95fr]">
            <div className="rounded-xl border border-line bg-white p-3">
              <p className="text-center text-[11px] font-medium text-ink-soft">Nuclear Families (% of total)</p>
              <svg viewBox="0 0 220 180" className="mx-auto mt-2 h-40 w-full" aria-hidden="true">
                <path
                  d="M108 18c16 6 26 18 40 24 14 6 28 2 36 14 10 14-2 26 4 40 6 12 22 14 20 28-2 14-16 18-14 32 2 12 14 16 8 26-8 12-24 8-32 18-10 12 2 24-12 32-16 10-32 0-48 6-14 4-20 18-36 18-18 0-24-14-40-12-14 2-20 14-34 10-12-4-10-18-6-30 4-12-8-22-2-34 6-12 20-14 24-26 4-12-8-22-2-34 6-12 20-10 28-20 8-8 4-22 16-30 10-6 24-2 40-10z"
                  fill="#8fb9ad"
                  stroke="#5e8f86"
                  strokeWidth="1.2"
                />
                <path d="M92 70c18-8 28-4 40 8 8 8 4 20-6 26-12 8-24 2-28-8-4-10 0-20-6-26z" fill="#d7ebe3" />
                <path d="M128 108c14-2 24 8 22 20-2 10-14 16-26 12-10-4-14-14-8-22 4-6 8-10 12-10z" fill="#355f5a" />
                <path d="M70 112c12 0 18 10 16 20-2 8-12 12-22 8-8-4-10-12-6-18 4-6 8-10 12-10z" fill="#b7d8cc" />
              </svg>
              <ul className="mt-1 space-y-1 text-[11px] text-muted">
                {legend.map((item) => (
                  <li key={item.label} className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-3">
              <div className="rounded-xl border border-line bg-white p-3">
                <p className="text-[12px] font-medium text-ink-soft">Total Fertility Rate (TFR)</p>
                <svg viewBox="0 0 220 110" className="mt-2 h-24 w-full" aria-hidden="true">
                  <line x1="28" y1="18" x2="28" y2="90" stroke="#e4ddd0" />
                  <line x1="28" y1="90" x2="208" y2="90" stroke="#e4ddd0" />
                  <text x="8" y="22" fontSize="9" fill="#6b756f">
                    4.0
                  </text>
                  <text x="8" y="48" fontSize="9" fill="#6b756f">
                    2.0
                  </text>
                  <text x="8" y="94" fontSize="9" fill="#6b756f">
                    1.0
                  </text>
                  <polyline
                    points="40,28 90,42 140,58 190,70"
                    fill="none"
                    stroke="#5e8f86"
                    strokeWidth="2.4"
                  />
                  <circle cx="40" cy="28" r="3.2" fill="#5e8f86" />
                  <circle cx="90" cy="42" r="3.2" fill="#5e8f86" />
                  <circle cx="140" cy="58" r="3.2" fill="#5e8f86" />
                  <circle cx="190" cy="70" r="3.2" fill="#5e8f86" />
                  <text x="32" y="106" fontSize="9" fill="#6b756f">
                    1990
                  </text>
                  <text x="80" y="106" fontSize="9" fill="#6b756f">
                    2000
                  </text>
                  <text x="130" y="106" fontSize="9" fill="#6b756f">
                    2010
                  </text>
                  <text x="176" y="106" fontSize="9" fill="#6b756f">
                    2020
                  </text>
                </svg>
              </div>
              <div className="rounded-xl border border-line bg-white p-3">
                <p className="text-[12px] font-medium text-ink-soft">Women’s Labour Force Participation</p>
                <svg viewBox="0 0 220 90" className="mt-2 h-20 w-full" aria-hidden="true">
                  <rect x="36" y="48" width="22" height="30" rx="2" fill="#8fb9ad" />
                  <rect x="78" y="40" width="22" height="38" rx="2" fill="#6f9bb3" />
                  <rect x="120" y="28" width="22" height="50" rx="2" fill="#5e8f86" />
                  <rect x="162" y="22" width="22" height="56" rx="2" fill="#4e7a94" />
                  <text x="36" y="88" fontSize="8" fill="#6b756f">
                    1990
                  </text>
                  <text x="78" y="88" fontSize="8" fill="#6b756f">
                    2000
                  </text>
                  <text x="120" y="88" fontSize="8" fill="#6b756f">
                    2010
                  </text>
                  <text x="162" y="88" fontSize="8" fill="#6b756f">
                    2020
                  </text>
                </svg>
              </div>
            </div>

            <div className="grid gap-3">
              <div className="rounded-xl border border-line bg-white p-3">
                <p className="text-[12px] font-medium text-ink-soft">Family Type (Latest)</p>
                <div className="mt-2 flex items-center gap-3">
                  <svg viewBox="0 0 88 88" className="h-20 w-20" aria-hidden="true">
                    <circle cx="44" cy="44" r="30" fill="none" stroke="#e4ddd0" strokeWidth="12" />
                    <circle
                      cx="44"
                      cy="44"
                      r="30"
                      fill="none"
                      stroke="#5e8f86"
                      strokeWidth="12"
                      strokeDasharray="117 188"
                      transform="rotate(-90 44 44)"
                    />
                    <circle
                      cx="44"
                      cy="44"
                      r="30"
                      fill="none"
                      stroke="#8fb9ad"
                      strokeWidth="12"
                      strokeDasharray="53 188"
                      strokeDashoffset="-117"
                      transform="rotate(-90 44 44)"
                    />
                    <circle
                      cx="44"
                      cy="44"
                      r="30"
                      fill="none"
                      stroke="#c9a06a"
                      strokeWidth="12"
                      strokeDasharray="18 188"
                      strokeDashoffset="-170"
                      transform="rotate(-90 44 44)"
                    />
                    <text x="44" y="42" textAnchor="middle" fontSize="13" fill="#14302a" fontWeight="700">
                      62%
                    </text>
                    <text x="44" y="56" textAnchor="middle" fontSize="7" fill="#6b756f">
                      Nuclear
                    </text>
                  </svg>
                  <ul className="space-y-1 text-[11px] text-muted">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#5e8f86]" /> Nuclear 62%
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#8fb9ad]" /> Joint 28%
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#c9a06a]" /> Extended 10%
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-line bg-white p-3 text-center">
                  <p className="text-[10px] tracking-wide text-muted uppercase">Average Household Size</p>
                  <p className="mt-1 font-serif text-3xl text-forest-deep">4.2</p>
                  <p className="text-[10px] text-muted">(2015–2023)</p>
                </div>
                <div className="rounded-xl border border-line bg-white p-3 text-center">
                  <p className="text-[10px] tracking-wide text-muted uppercase">Share of Nuclear Families</p>
                  <p className="mt-1 font-serif text-2xl text-forest-deep">34% → 48%</p>
                  <p className="text-[10px] text-muted">(2015–2023)</p>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-3 text-[11px] text-muted">Demonstration values. Not official estimates.</p>
        </div>
      </div>
    </section>
  );
}
