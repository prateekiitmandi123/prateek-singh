export type UserRole = "administrator" | "editor" | "contributor";

export type ArticleKind = "research" | "explainer" | "opinion";

export type ArticleStatus = "draft" | "published" | "archived";

export interface Author {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  affiliation: string;
  email?: string;
  isGuest: boolean;
  isSample: boolean;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  coverHue: number;
  coverLabel: string;
  authorIds: string[];
  category: string;
  tags: string[];
  kind: ArticleKind;
  status: ArticleStatus;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  citations: Citation[];
  featured: boolean;
  isSample: boolean;
}

export interface Citation {
  id: string;
  text: string;
  url?: string;
}

export interface Project {
  id: string;
  title: string;
  status: "ongoing" | "planned" | "completed";
  summary: string;
  topics: string[];
  methods: string[];
  year: string;
  isSample: boolean;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  topic: "collaboration" | "submission" | "enquiry";
  message: string;
  createdAt: string;
  status: "new" | "read";
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface IndicatorMeta {
  id: string;
  title: string;
  definition: string;
  source: string;
  period: string;
  unit: string;
  methodology: string;
  notes: string;
  isDemonstration: boolean;
}

export interface ResourceItem {
  id: string;
  title: string;
  kind: "dataset" | "documentation" | "paper" | "method" | "tool";
  description: string;
  url: string;
  publisher: string;
  year: string;
}
