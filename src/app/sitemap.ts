import type { MetadataRoute } from "next";
import { getPublishedArticles } from "@/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getPublishedArticles();
  const now = new Date();
  const staticRoutes = ["", "/about", "/research", "/dashboard", "/articles", "/resources", "/contact", "/cv"].map(
    (path) => ({
      url: `https://prateeksingh.in${path}`,
      lastModified: now,
    }),
  );
  return [
    ...staticRoutes,
    ...articles.map((a) => ({
      url: `https://prateeksingh.in/articles/${a.slug}`,
      lastModified: new Date(a.updatedAt),
    })),
  ];
}
