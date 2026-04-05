import type { MetadataRoute } from "next";
import { playgroundItems } from "@/data/playground";
import { absoluteUrl } from "@/lib/site";

/** Required for `output: "export"` — sitemap is generated at build time. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/about"), lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: absoluteUrl("/projects"), lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/playground"), lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: absoluteUrl("/contact"), lastModified, changeFrequency: "yearly", priority: 0.5 },
    { url: absoluteUrl("/career"), lastModified, changeFrequency: "yearly", priority: 0.5 },
  ];

  const playgroundRoutes: MetadataRoute.Sitemap = playgroundItems.map((item) => ({
    url: absoluteUrl(`/playground/${item.slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...playgroundRoutes];
}
