export const site = {
  name: "Prateek Singh",
  shortName: "Prateek Singh",
  tagline: "Understanding Families Through Data.",
  role: "Research scholar in family demography",
  affiliation: "Indian Institute of Technology Mandi",
  email: "prateekiitmandi@gmail.com",
  description:
    "Academic research platform on family demography, biostatistics, and India’s changing household dynamics.",
  url: "https://prateeksingh.in",
  shinyDashboardUrl: process.env.NEXT_PUBLIC_SHINY_DASHBOARD_URL ?? "",
  headerNav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/research", label: "Research" },
    { href: "/articles", label: "Articles" },
    { href: "/dashboard", label: "India Family Dashboard" },
    { href: "/contact", label: "Contact" },
  ],
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Me" },
    { href: "/research", label: "Research" },
    { href: "/dashboard", label: "India Family Dashboard" },
    { href: "/articles", label: "Articles" },
    { href: "/resources", label: "Resources" },
    { href: "/contact", label: "Contact" },
  ],
};

export const categories = [
  "Family and Society",
  "Demographic Change",
  "Gender and Work",
  "Population Health",
  "Data Stories",
  "Research Methods",
  "Commentary",
] as const;

export const articleKinds = [
  { id: "research", label: "Research paper" },
  { id: "explainer", label: "Explainer" },
  { id: "opinion", label: "Opinion" },
] as const;
