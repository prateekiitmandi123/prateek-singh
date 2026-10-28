import type { ResourceItem } from "@/lib/types";

export const resources: ResourceItem[] = [
  {
    id: "census-india",
    title: "Census of India",
    kind: "dataset",
    publisher: "Office of the Registrar General & Census Commissioner, India",
    year: "Ongoing",
    url: "https://censusindia.gov.in/",
    description:
      "Decennial population census, household and housing tables, and related publications used for household size and composition.",
  },
  {
    id: "nfhs",
    title: "National Family Health Survey (NFHS)",
    kind: "dataset",
    publisher: "International Institute for Population Sciences",
    year: "NFHS-5, 2019–21",
    url: "https://rchiips.org/nfhs/",
    description:
      "Household sample survey on fertility, family planning, nutrition, and selected household characteristics. Reports and documentation.",
  },
  {
    id: "lasi",
    title: "Longitudinal Ageing Study in India (LASI)",
    kind: "dataset",
    publisher: "IIPS, MoHFW, HSPH, USC",
    year: "Wave 1, 2017–18",
    url: "https://lasi-india.org/",
    description:
      "National survey of ageing, health, and living arrangements for older adults. Useful for coresidence and later-life wellbeing.",
  },
  {
    id: "plfs",
    title: "Periodic Labour Force Survey (PLFS)",
    kind: "dataset",
    publisher: "National Statistical Office, MoSPI",
    year: "Annual",
    url: "https://www.mospi.gov.in/periodic-labour-force-survey-plfs",
    description:
      "Labour-force participation, worker-population ratios, and unemployment by sex, residence, and age. Not a family survey.",
  },
  {
    id: "srs",
    title: "Sample Registration System (SRS)",
    kind: "dataset",
    publisher: "Office of the Registrar General, India",
    year: "Annual",
    url: "https://censusindia.gov.in/census.website/data/SRSSTAT",
    description:
      "Vital rates including crude birth rate, death rate, infant mortality, and total fertility at national and state levels.",
  },
  {
    id: "dhs-recodes",
    title: "DHS Program recode documentation",
    kind: "documentation",
    publisher: "The DHS Program",
    year: "Updated",
    url: "https://dhsprogram.com/data/Guide-to-DHS-Statistics/",
    description:
      "Guide to DHS statistics and recode manuals. NFHS follows the DHS model; this is the standard reference for indicator construction.",
  },
  {
    id: "census-handbook",
    title: "Census metadata and table notes",
    kind: "documentation",
    publisher: "ORGI",
    year: "Census rounds",
    url: "https://censusindia.gov.in/",
    description:
      "Use the official census site for table notes, definitions of household, head of household, and rural–urban classification.",
  },
  {
    id: "un-principles",
    title: "UN Principles and Recommendations for Population and Housing Censuses",
    kind: "paper",
    publisher: "United Nations Statistics Division",
    year: "2017 revision",
    url: "https://unstats.un.org/unsd/demographic-social/Standards-and-Methods/",
    description:
      "International recommendations on census concepts, including household and family living arrangements.",
  },
  {
    id: "preston-demography",
    title: "Demography: Measuring and Modeling Population Processes",
    kind: "paper",
    publisher: "Preston, Heuveline, and Guillot",
    year: "2001",
    url: "https://www.wiley.com/en-us/Demography%3A+Measuring+and+Modeling+Population+Processes-p-9781557864512",
    description:
      "Standard text on demographic rates, standardisation, and fertility measurement. Print/ebook; not an open dataset.",
  },
  {
    id: "iips-reports",
    title: "IIPS survey reports",
    kind: "paper",
    publisher: "International Institute for Population Sciences",
    year: "Various",
    url: "https://www.iipsindia.ac.in/",
    description:
      "Institutional home for NFHS, LASI, and related Indian demographic surveys. Reports are the preferred citation over secondary blogs.",
  },
  {
    id: "r-survey",
    title: "Survey analysis in R",
    kind: "method",
    publisher: "CRAN / survey package documentation",
    year: "Updated",
    url: "https://cran.r-project.org/package=survey",
    description:
      "Design-based analysis for complex household surveys. Relevant when moving from published tables to microdata.",
  },
  {
    id: "stata-svy",
    title: "Stata survey estimation",
    kind: "method",
    publisher: "StataCorp",
    year: "Documentation",
    url: "https://www.stata.com/manuals/svy.pdf",
    description:
      "Reference for svyset and survey-weighted estimation commonly used with NFHS and DHS files.",
  },
  {
    id: "plotly",
    title: "Plotly documentation",
    kind: "tool",
    publisher: "Plotly",
    year: "Current",
    url: "https://plotly.com/javascript/",
    description:
      "Interactive charting library. Useful for accessible tooltips; pair charts with tables.",
  },
  {
    id: "echarts",
    title: "Apache ECharts",
    kind: "tool",
    publisher: "Apache Software Foundation",
    year: "Current",
    url: "https://echarts.apache.org/",
    description:
      "Charting library used on this site for line, bar, and stacked series.",
  },
  {
    id: "geojson-maps",
    title: "GeoJSON maps of India (use with licence check)",
    kind: "tool",
    publisher: "Various open map projects",
    year: "Current",
    url: "https://github.com/datameet/maps",
    description:
      "Community GeoJSON. Always verify licence and boundary vintage before publishing maps. This site uses a simplified schematic, not official boundaries.",
  },
];
