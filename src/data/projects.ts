import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "household-change",
    title: "Household composition and living arrangements in India",
    status: "ongoing",
    year: "2024–present",
    topics: ["Family structure", "Household composition", "Intergenerational relationships"],
    methods: ["Survey analysis", "Descriptive demography", "State comparisons"],
    summary:
      "A working programme on how Indian households are organised: nuclear and joint forms, household size, and coresidence of older adults and children. The emphasis is on measurement, comparability across Census and NFHS, and careful description rather than causal claims.",
    isSample: true,
  },
  {
    id: "marriage-fertility",
    title: "Marriage timing and fertility change",
    status: "planned",
    year: "Planned",
    topics: ["Marriage", "Fertility", "Demographic change"],
    methods: ["Age-specific rates", "Cohort comparison"],
    summary:
      "A planned study of marriage and fertility indicators using published NFHS, SRS, and Census tabulations. No original findings are claimed on this site until they are written and reviewed.",
    isSample: true,
  },
  {
    id: "gender-work",
    title: "Women’s employment and household organisation",
    status: "planned",
    year: "Planned",
    topics: ["Gender", "Women’s employment", "Household work"],
    methods: ["PLFS indicators", "Cross-tabulation"],
    summary:
      "A planned exploration of how employment, unpaid work, and household structure appear together in public labour-force and health survey data. Demonstration charts on the dashboard are labelled as such.",
    isSample: true,
  },
];
