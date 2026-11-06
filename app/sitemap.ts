import type { MetadataRoute } from "next";
import { projects, workHref } from "./_lib/projects";

const BASE_URL = "https://thirdindex.co";

const ROUTES = ["", "/select", "/studio", "/project", "/fractional"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...ROUTES.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...projects.map((p) => ({
      url: `${BASE_URL}${workHref(p)}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
