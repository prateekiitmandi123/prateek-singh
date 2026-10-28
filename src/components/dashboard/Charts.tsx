"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AGE_GROUPS,
  RESIDENCE,
  SES_GROUPS,
  SEX,
  STATES,
  YEARS,
  householdTypes,
  indicators,
  livingArrangements,
  resolveValue,
  type DashboardPoint,
} from "@/data/dashboard";

type EChartsType = {
  init: (el: HTMLElement) => {
    setOption: (opt: object) => void;
    resize: () => void;
    dispose: () => void;
  };
};

function useChart(option: object | null) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || !option) return;
    let chart: ReturnType<EChartsType["init"]> | null = null;
    let disposed = false;
    import("echarts").then((echarts) => {
      if (disposed || !ref.current) return;
      chart = (echarts as unknown as EChartsType).init(ref.current);
      chart.setOption(option);
    });
    const onResize = () => chart?.resize();
    window.addEventListener("resize", onResize);
    return () => {
      disposed = true;
      window.removeEventListener("resize", onResize);
      chart?.dispose();
    };
  }, [option]);
  return ref;
}

const palette = ["#1C3D32", "#1A4A4A", "#B0893E", "#6F8FA8", "#8AA382", "#9B3D3D"];

function ChartFrame({
  title,
  summary,
  option,
  table,
}: {
  title: string;
  summary: string;
  option: object;
  table: Array<[string, string | number]>;
}) {
  const ref = useChart(option);
  return (
    <figure className="rounded-2xl border border-line bg-paper p-4 md:p-5">
      <figcaption className="font-serif text-xl text-forest-deep">{title}</figcaption>
      <p className="mt-1 text-sm text-muted">{summary}</p>
      <div ref={ref} className="mt-3 h-64 w-full" role="img" aria-label={summary} />
      <details className="mt-2">
        <summary className="cursor-pointer text-xs text-teal">Data table</summary>
        <table className="mt-2 w-full text-left text-sm">
          <tbody>
            {table.map(([k, v]) => (
              <tr key={k} className="border-t border-line">
                <th className="py-1 pr-3 font-medium">{k}</th>
                <td className="py-1 tabular-nums">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  const id = label.replace(/\s+/g, "-").toLowerCase();
  return (
    <label className="block text-xs">
      {label}
      <select
        id={id}
        className="mt-1 min-h-11 w-full rounded-lg border border-line bg-cream px-2 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function IndiaMap({
  values,
  onSelect,
  selected,
}: {
  values: { state: string; value: number }[];
  onSelect: (state: string) => void;
  selected: string;
}) {
  const max = Math.max(...values.map((v) => v.value), 1);
  const min = Math.min(...values.map((v) => v.value), 0);
  const nodes = [
    { name: "Punjab", x: 118, y: 52 },
    { name: "Haryana", x: 138, y: 72 },
    { name: "Uttar Pradesh", x: 168, y: 96 },
    { name: "Rajasthan", x: 108, y: 108 },
    { name: "Bihar", x: 210, y: 108 },
    { name: "Assam", x: 268, y: 92 },
    { name: "West Bengal", x: 232, y: 132 },
    { name: "Madhya Pradesh", x: 148, y: 138 },
    { name: "Gujarat", x: 88, y: 148 },
    { name: "Odisha", x: 208, y: 158 },
    { name: "Maharashtra", x: 128, y: 178 },
    { name: "Telangana", x: 158, y: 198 },
    { name: "Andhra Pradesh", x: 168, y: 218 },
    { name: "Karnataka", x: 128, y: 228 },
    { name: "Tamil Nadu", x: 148, y: 258 },
    { name: "Kerala", x: 118, y: 268 },
  ];
  function color(state: string) {
    const v = values.find((x) => x.state === state)?.value;
    if (v == null) return "#c5d4b8";
    const t = (v - min) / (max - min || 1);
    const g = Math.round(90 - t * 40);
    return `hsl(152 ${30 + t * 20}% ${g}%)`;
  }
  return (
    <div>
      <svg viewBox="0 0 320 320" className="h-auto w-full" role="img" aria-label="Schematic India map of selected indicator">
        <path
          d="M150 28c18 8 28 22 42 28 16 8 32 4 40 18 10 16-2 30 6 46 8 14 26 16 28 32 2 18-16 24-14 42 2 16 18 20 12 34-8 16-28 12-36 26-10 16 4 32-12 42-18 12-36 2-54 8-16 6-22 24-40 24-20 0-28-18-46-16-16 2-22 18-38 12-14-6-12-24-8-38 4-16-8-28-2-44 6-16 24-18 28-34 4-16-10-28-4-44 6-16 24-14 34-26 8-10 4-28 18-38 12-8 28-2 46-12z"
          fill="#e7dfd0"
          stroke="#1c3d32"
          strokeWidth="1.2"
        />
        {nodes.map((n) => (
          <g key={n.name}>
            <circle
              cx={n.x}
              cy={n.y}
              r={selected === n.name ? 11 : 8}
              fill={color(n.name)}
              stroke={selected === n.name ? "#b0893e" : "#10241e"}
              strokeWidth={selected === n.name ? 2 : 1}
              className="cursor-pointer"
              onClick={() => onSelect(n.name)}
              tabIndex={0}
              role="button"
              aria-label={n.name}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onSelect(n.name);
              }}
            />
            <text x={n.x + 12} y={n.y + 4} fontSize="8" fill="#1a241f">
              {n.name}
            </text>
          </g>
        ))}
      </svg>
      <p className="mt-2 text-xs text-muted">
        Schematic map, not official boundaries. Click a state. Demonstration choropleth.
      </p>
    </div>
  );
}

export function DashboardApp({ points }: { points: DashboardPoint[] }) {
  const [state, setState] = useState("India");
  const [year, setYear] = useState("2021");
  const [residence, setResidence] = useState("All");
  const [sex, setSex] = useState("All");
  const [age, setAge] = useState("All");
  const [ses, setSes] = useState("All");
  const [mapIndicator, setMapIndicator] = useState("hh-size");

  const y = Number(year);
  const q = useMemo(
    () => ({ state, year: y, residence, sex, age, ses }),
    [state, y, residence, sex, age, ses],
  );

  const cards = indicators.map((ind) => {
    const value = resolveValue(points, { ...q, indicatorId: ind.id, sex: ind.id === "tfr" && sex === "Male" ? "All" : sex });
    return { ...ind, value };
  });

  const trend = useMemo(() => {
    return YEARS.map((yr) => {
      const row: Record<string, number | string> = { year: yr };
      for (const id of ["hh-size", "tfr", "nuclear-share"] as const) {
        row[id] = resolveValue(points, {
          indicatorId: id,
          state,
          year: yr,
          residence,
          sex: id === "tfr" && sex === "Male" ? "All" : sex,
          age,
          ses,
        });
      }
      return row;
    });
  }, [points, state, residence, sex, age, ses]);

  const mapValues = useMemo(() => {
    return STATES.filter((s) => s !== "India").map((s) => {
      const value = resolveValue(points, {
        indicatorId: mapIndicator,
        state: s,
        year: y,
        residence,
        sex: mapIndicator === "tfr" && sex === "Male" ? "All" : sex,
        age,
        ses,
      });
      return { state: s, value };
    });
  }, [points, mapIndicator, y, residence, sex, age, ses]);

  const barStates = [...mapValues].sort((a, b) => b.value - a.value).slice(0, 12);

  const lineOption = {
    color: palette,
    tooltip: { trigger: "axis" },
    legend: { data: ["Household size", "TFR", "Nuclear %"] },
    grid: { left: 40, right: 16, top: 36, bottom: 28 },
    xAxis: { type: "category", data: YEARS.map(String) },
    yAxis: { type: "value" },
    series: [
      { name: "Household size", type: "line", data: trend.map((t) => t["hh-size"]) },
      { name: "TFR", type: "line", data: trend.map((t) => t.tfr) },
      { name: "Nuclear %", type: "line", data: trend.map((t) => t["nuclear-share"]) },
    ],
  };

  const barOption = {
    color: ["#1C3D32"],
    tooltip: { trigger: "axis" },
    grid: { left: 110, right: 16, top: 16, bottom: 24 },
    xAxis: { type: "value" },
    yAxis: { type: "category", data: barStates.map((s) => s.state).reverse() },
    series: [{ type: "bar", data: barStates.map((s) => s.value).reverse(), label: { show: true, position: "right" } }],
  };

  const stackedOption = {
    color: ["#1C3D32", "#6F8FA8"],
    tooltip: { trigger: "axis" },
    legend: { data: ["Rural", "Urban"] },
    grid: { left: 120, right: 16, top: 36, bottom: 24 },
    xAxis: { type: "value", max: 100 },
    yAxis: { type: "category", data: householdTypes.map((h) => h.type) },
    series: [
      { name: "Rural", type: "bar", stack: "a", data: householdTypes.map((h) => h.rural) },
      { name: "Urban", type: "bar", stack: "b", data: householdTypes.map((h) => h.urban) },
    ],
  };

  const distOption = {
    color: ["#B0893E"],
    tooltip: { trigger: "axis" },
    grid: { left: 40, right: 16, top: 16, bottom: 80 },
    xAxis: { type: "category", data: livingArrangements.map((l) => l.group), axisLabel: { rotate: 30, fontSize: 10 } },
    yAxis: { type: "value", max: 100 },
    series: [{ type: "bar", data: livingArrangements.map((l) => l.value) }],
  };

  return (
    <div className="space-y-10">
      <div className="rounded-2xl border border-gold/40 bg-gold-soft/20 p-4 text-sm text-forest-deep">
        All series on this page are <strong>demonstration data</strong> constructed to resemble
        public-release patterns from Census, NFHS, LASI, PLFS, and SRS. They are not official
        estimates. Do not cite them. Descriptive patterns are not causal.
      </div>

      <div className="grid gap-3 rounded-2xl border border-line bg-cream p-4 sm:grid-cols-3 lg:grid-cols-6">
        <Select label="State" value={state} onChange={setState} options={STATES} />
        <Select label="Year" value={year} onChange={setYear} options={YEARS.map(String)} />
        <Select label="Residence" value={residence} onChange={setResidence} options={RESIDENCE} />
        <Select label="Sex" value={sex} onChange={setSex} options={SEX} />
        <Select label="Age" value={age} onChange={setAge} options={AGE_GROUPS} />
        <Select label="Socioeconomic group" value={ses} onChange={setSes} options={SES_GROUPS} />
      </div>

      <section>
        <h2 className="font-serif text-3xl text-forest-deep">Key indicators</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <article key={c.id} className="rounded-2xl border border-line bg-paper p-4">
              <p className="text-xs tracking-wide text-gold uppercase">Demonstration</p>
              <h3 className="mt-1 font-serif text-lg text-forest-deep">{c.title}</h3>
              <p className="mt-2 font-serif text-3xl tabular-nums text-teal">{c.value}</p>
              <p className="mt-1 text-xs text-muted">{c.unit}</p>
              <details className="mt-2 text-xs text-ink-soft">
                <summary className="cursor-pointer text-teal">Definition and source</summary>
                <dl className="mt-2 space-y-1">
                  <div>
                    <dt className="font-medium">Definition</dt>
                    <dd>{c.definition}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Source</dt>
                    <dd>{c.source}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Period</dt>
                    <dd>{c.period}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Methodology</dt>
                    <dd>{c.methodology}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Notes</dt>
                    <dd>{c.notes}</dd>
                  </div>
                </dl>
              </details>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-paper p-4 md:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-serif text-xl text-forest-deep">State comparison</h2>
            <label className="text-xs">
              Map indicator
              <select
                className="ml-2 min-h-11 rounded-lg border border-line bg-cream px-2"
                value={mapIndicator}
                onChange={(e) => setMapIndicator(e.target.value)}
              >
                {indicators.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.title}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <IndiaMap values={mapValues} selected={state} onSelect={setState} />
        </div>
        <ChartFrame
          title="Ranked states"
          summary={`Demonstration ${indicators.find((i) => i.id === mapIndicator)?.title ?? ""} for ${year}.`}
          option={barOption}
          table={barStates.map((s) => [s.state, s.value])}
        />
      </section>

      <section>
        <h2 className="font-serif text-3xl text-forest-deep">Family structure and household composition</h2>
        <p className="mt-2 max-w-3xl text-ink-soft">
          Nuclear share and household size move together in the demonstration series. That is a
          teaching pattern, not a finding.
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <ChartFrame
            title="Trends in selected state"
            summary={`Line chart for ${state}. Demonstration values.`}
            option={lineOption}
            table={trend.map((t) => [String(t.year), `HH ${t["hh-size"]} · TFR ${t.tfr} · Nuclear ${t["nuclear-share"]}`])}
          />
          <ChartFrame
            title="Household type, rural and urban"
            summary="Stacked comparison of simplified household types. Demonstration."
            option={stackedOption}
            table={householdTypes.map((h) => [h.type, `Rural ${h.rural}% · Urban ${h.urban}%`])}
          />
        </div>
      </section>

      <section>
        <h2 className="font-serif text-3xl text-forest-deep">Household size and living arrangements</h2>
        <div className="mt-6">
          <ChartFrame
            title="Living arrangements (national analogue)"
            summary="Distribution of selected living-arrangement groups. Demonstration, not LASI microdata."
            option={distOption}
            table={livingArrangements.map((l) => [l.group, `${l.value}%`])}
          />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-cream p-6">
          <h2 className="font-serif text-2xl text-forest-deep">Marriage and fertility</h2>
          <p className="mt-3 text-sm text-ink-soft">
            Use the TFR and median age at marriage cards above with the year and residence filters.
            Period TFR is not completed fertility. Demonstration values only.
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-cream p-6">
          <h2 className="font-serif text-2xl text-forest-deep">Gender and employment</h2>
          <p className="mt-3 text-sm text-ink-soft">
            Female labour-force participation is a PLFS-like demonstration. It is not a family
            survey. Set sex to Female and compare residence.
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-cream p-6">
          <h2 className="font-serif text-2xl text-forest-deep">Children, health, and education</h2>
          <p className="mt-3 text-sm text-ink-soft">
            Immunisation and school attendance cards use the age filter (0–14). Coverage is not
            learning. Demonstration values only.
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-cream p-6">
          <h2 className="font-serif text-2xl text-forest-deep">State and rural–urban</h2>
          <p className="mt-3 text-sm text-ink-soft">
            Choose a state on the map or in the filter. Residence splits rural and urban
            demonstration series. Selected states only; not a complete Indian atlas.
          </p>
        </div>
      </section>
    </div>
  );
}
