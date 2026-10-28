import type { IndicatorMeta } from "@/lib/types";

export const STATES = [
  "India",
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Gujarat",
  "Haryana",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
] as const;

export type StateName = (typeof STATES)[number];

export const YEARS = [2005, 2011, 2015, 2019, 2021] as const;
export const RESIDENCE = ["All", "Rural", "Urban"] as const;
export const SEX = ["All", "Female", "Male"] as const;
export const AGE_GROUPS = ["All", "0–14", "15–49", "18–59", "60+"] as const;
export const SES_GROUPS = ["All", "Lowest wealth", "Highest wealth"] as const;

export const indicators: IndicatorMeta[] = [
  {
    id: "hh-size",
    title: "Average household size",
    definition: "Mean number of usual residents per household.",
    source: "Census of India household tables; NFHS household recode (demonstration blend).",
    period: "2005–2021 (selected years)",
    unit: "Persons per household",
    methodology:
      "Demonstration series scaled to resemble published national and selected-state averages. Not an official release.",
    notes: "Demonstration data. Do not cite as Census or NFHS estimates.",
    isDemonstration: true,
  },
  {
    id: "nuclear-share",
    title: "Nuclear household share",
    definition:
      "Percentage of households that are nuclear (couple with or without unmarried children), among classified household types.",
    source: "NFHS household composition tables (demonstration).",
    period: "2005–2021",
    unit: "Percent of households",
    methodology: "Illustrative percentages for teaching the dashboard. Classification simplified.",
    notes: "Demonstration data. Household type definitions vary across sources.",
    isDemonstration: true,
  },
  {
    id: "tfr",
    title: "Total fertility rate",
    definition: "Average number of children a woman would have if current age-specific fertility rates remained constant.",
    source: "NFHS and SRS (demonstration).",
    period: "2005–2021",
    unit: "Children per woman",
    methodology: "Period TFR-like demonstration values. Timing versus quantum not separated.",
    notes: "Demonstration data. Period TFR is not completed cohort fertility.",
    isDemonstration: true,
  },
  {
    id: "marriage-age",
    title: "Median age at first marriage (women 20–49)",
    definition: "Median age at first marriage among women aged 20–49, where defined.",
    source: "NFHS (demonstration).",
    period: "2005–2021",
    unit: "Years",
    methodology: "Rounded demonstration medians. Not computed from microdata on this site.",
    notes: "Demonstration data.",
    isDemonstration: true,
  },
  {
    id: "flfpr",
    title: "Female labour-force participation",
    definition: "Usual status labour-force participation rate for women in the selected age band.",
    source: "PLFS (demonstration).",
    period: "2017–2021 analogue",
    unit: "Percent",
    methodology: "Illustrative rates. PLFS concepts (ps+ss) are not fully reproduced.",
    notes: "Demonstration data. Not official PLFS.",
    isDemonstration: true,
  },
  {
    id: "immunisation",
    title: "Full immunisation among children 12–23 months",
    definition: "Percentage of children 12–23 months who received all basic vaccines as defined in NFHS.",
    source: "NFHS (demonstration).",
    period: "2005–2021",
    unit: "Percent",
    methodology: "Demonstration coverage. Vaccine schedule definitions changed across NFHS rounds.",
    notes: "Demonstration data.",
    isDemonstration: true,
  },
  {
    id: "schooling",
    title: "School attendance, children 6–14",
    definition: "Percentage of children aged 6–14 attending school at the time of survey.",
    source: "NFHS / education statistics (demonstration).",
    period: "2005–2021",
    unit: "Percent",
    methodology: "Illustrative attendance, not UDISE+ enrolment.",
    notes: "Demonstration data. Attendance is not the same as enrolment or learning.",
    isDemonstration: true,
  },
  {
    id: "coreside-60",
    title: "Older adults living with children",
    definition: "Percentage of persons aged 60 and above who coreside with at least one child.",
    source: "Census / LASI (demonstration).",
    period: "2011–2018 analogue",
    unit: "Percent",
    methodology: "Simplified demonstration. LASI and Census living-arrangement classifications differ.",
    notes: "Demonstration data.",
    isDemonstration: true,
  },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

const stateOffset: Record<string, number> = {
  India: 0,
  "Andhra Pradesh": 0.2,
  Assam: -0.4,
  Bihar: 1.1,
  Gujarat: -0.15,
  Haryana: 0.05,
  Karnataka: -0.35,
  Kerala: -1.15,
  "Madhya Pradesh": 0.7,
  Maharashtra: -0.45,
  Odisha: 0.25,
  Punjab: -0.2,
  Rajasthan: 0.85,
  "Tamil Nadu": -0.9,
  Telangana: -0.25,
  "Uttar Pradesh": 1.2,
  "West Bengal": -0.3,
};

function yearT(year: number) {
  return (year - 2005) / 16;
}

export function demoValue(id: string, state: string, year: number, residence: string, sex: string, age: string, ses: string) {
  const t = yearT(year);
  const off = stateOffset[state] ?? 0;
  const rural = residence === "Rural" ? 0.35 : residence === "Urban" ? -0.45 : 0;
  const wealth = ses === "Lowest wealth" ? 0.4 : ses === "Highest wealth" ? -0.35 : 0;
  switch (id) {
    case "hh-size": {
      const base = 5.3 + off * 0.35 + rural * 0.4 + wealth * 0.25;
      return Number(lerp(base, base - 0.9, t).toFixed(2));
    }
    case "nuclear-share": {
      const base = 52 - off * 4 + (residence === "Urban" ? 8 : residence === "Rural" ? -4 : 0);
      return Number(Math.min(82, Math.max(28, lerp(base, base + 9, t))).toFixed(1));
    }
    case "tfr": {
      const base = 2.7 + off * 0.35 + rural * 0.25 + wealth * 0.3;
      return Number(Math.max(1.3, lerp(base, base - 0.7, t)).toFixed(2));
    }
    case "marriage-age": {
      if (sex === "Male") return Number(lerp(23.4 + off * -0.2, 24.6 + off * -0.2, t).toFixed(1));
      const base = 18.6 - off * 0.35 + (residence === "Urban" ? 1.2 : 0) + (ses === "Highest wealth" ? 1.4 : 0);
      return Number(lerp(base, base + 1.6, t).toFixed(1));
    }
    case "flfpr": {
      if (sex === "Male") return Number(lerp(75, 73, t).toFixed(1));
      const base = 24 + off * -1.5 + (residence === "Rural" ? 4 : -2) + (age === "60+" ? -10 : 0);
      return Number(Math.max(8, lerp(base, base + 5, t)).toFixed(1));
    }
    case "immunisation": {
      const base = 55 - off * 6 + (residence === "Urban" ? 8 : 0) + (ses === "Highest wealth" ? 12 : ses === "Lowest wealth" ? -10 : 0);
      return Number(Math.min(96, Math.max(20, lerp(base, base + 22, t))).toFixed(1));
    }
    case "schooling": {
      const base = 78 - off * 3 + (sex === "Female" ? -1.5 : 0);
      return Number(Math.min(98, lerp(base, base + 10, t)).toFixed(1));
    }
    case "coreside-60": {
      const base = 72 + off * 2 + (residence === "Urban" ? -8 : 3);
      return Number(Math.min(90, Math.max(40, lerp(base, base - 6, t))).toFixed(1));
    }
    default:
      return 0;
  }
}

export interface DashboardPoint {
  indicatorId: string;
  state: string;
  year: number;
  residence: string;
  sex: string;
  age: string;
  ses: string;
  value: number;
}

export function pointKey(p: {
  indicatorId: string;
  state: string;
  year: number;
  residence: string;
  sex: string;
  age: string;
  ses: string;
}) {
  return [p.indicatorId, p.state, p.year, p.residence, p.sex, p.age, p.ses].join("|");
}

export function resolveValue(
  overrides: DashboardPoint[],
  q: {
    indicatorId: string;
    state: string;
    year: number;
    residence: string;
    sex: string;
    age: string;
    ses: string;
  },
) {
  const hit = overrides.find(
    (p) =>
      p.indicatorId === q.indicatorId &&
      p.state === q.state &&
      p.year === q.year &&
      p.residence === q.residence &&
      p.sex === q.sex &&
      p.age === q.age &&
      p.ses === q.ses,
  );
  if (hit) return hit.value;
  return demoValue(q.indicatorId, q.state, q.year, q.residence, q.sex, q.age, q.ses);
}

export function buildDashboardPoints(): DashboardPoint[] {
  return [];
}

export function filterPoints(
  points: DashboardPoint[],
  q: {
    indicatorId?: string;
    state?: string;
    year?: number;
    residence?: string;
    sex?: string;
    age?: string;
    ses?: string;
  },
) {
  return points.filter((p) => {
    if (q.indicatorId && p.indicatorId !== q.indicatorId) return false;
    if (q.state && p.state !== q.state) return false;
    if (q.year && p.year !== q.year) return false;
    if (q.residence && p.residence !== q.residence) return false;
    if (q.sex && p.sex !== q.sex) return false;
    if (q.age && p.age !== q.age) return false;
    if (q.ses && p.ses !== q.ses) return false;
    return true;
  });
}

export const householdTypes = [
  { type: "Nuclear", rural: 58, urban: 67 },
  { type: "Joint / extended", rural: 31, urban: 18 },
  { type: "Single person", rural: 4, urban: 9 },
  { type: "Other / residual", rural: 7, urban: 6 },
];

export const livingArrangements = [
  { group: "Children <18 with both parents", value: 78 },
  { group: "Children <18 with one parent", value: 9 },
  { group: "Children <18 with others", value: 13 },
  { group: "Adults 60+ with children", value: 71 },
  { group: "Adults 60+ alone or couple only", value: 29 },
];


