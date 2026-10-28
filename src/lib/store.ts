import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { articles as seedArticles } from "@/data/articles";
import { authors as seedAuthors } from "@/data/authors";
import { projects as seedProjects } from "@/data/projects";
import { buildDashboardPoints, type DashboardPoint } from "@/data/dashboard";
import type { Article, Author, Inquiry, Project } from "@/lib/types";

const DATA_DIR = path.join(process.cwd(), ".data");
const STORE_VERSION = 2;

interface StoreShape {
  version: number;
  articles: Article[];
  authors: Author[];
  projects: Project[];
  inquiries: Inquiry[];
  dashboardPoints: DashboardPoint[];
}

const memory: { cache: StoreShape | null } = { cache: null };

function seed(): StoreShape {
  return {
    version: STORE_VERSION,
    articles: seedArticles,
    authors: seedAuthors,
    projects: seedProjects,
    inquiries: [],
    dashboardPoints: buildDashboardPoints(),
  };
}

async function ensure() {
  await mkdir(DATA_DIR, { recursive: true });
  const file = path.join(DATA_DIR, "store.json");
  try {
    const raw = await readFile(file, "utf8");
    const parsed = JSON.parse(raw) as StoreShape;
    if (parsed.version !== STORE_VERSION) {
      memory.cache = {
        ...seed(),
        inquiries: parsed.inquiries ?? [],
        dashboardPoints: parsed.dashboardPoints?.length ? parsed.dashboardPoints : buildDashboardPoints(),
        projects: parsed.projects?.length ? parsed.projects : seedProjects,
      };
      await writeFile(file, JSON.stringify(memory.cache, null, 2));
    } else {
      memory.cache = parsed;
    }
  } catch {
    memory.cache = seed();
    await writeFile(file, JSON.stringify(memory.cache, null, 2));
  }
  return memory.cache!;
}

async function persist() {
  if (!memory.cache) return;
  const file = path.join(DATA_DIR, "store.json");
  await writeFile(file, JSON.stringify(memory.cache, null, 2));
}

export async function getStore() {
  return ensure();
}

export async function saveStore(mutator: (store: StoreShape) => void) {
  const store = await ensure();
  mutator(store);
  memory.cache = store;
  await persist();
  return store;
}
