import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { siteUrl, isIndexable } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl || !isIndexable) return [];
  return [
    "/",
    "/projects",
    "/about",
    "/contact",
    "/privacy",
    ...projects.map((project) => `/${project.id}`),
  ].map((path) => ({ url: `${siteUrl}${path}` }));
}
