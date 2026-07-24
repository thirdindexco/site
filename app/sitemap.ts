import type { MetadataRoute } from "next";

const BASE_URL = "https://thirdindex.co";

const ROUTES = ["", "/information", "/projects", "/audit", "/sprint", "/embedded"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
