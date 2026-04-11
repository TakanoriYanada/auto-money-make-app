import type { MetadataRoute } from "next";
import { getAllToolSlugs } from "@/lib/tools";
import fs from "fs";
import path from "path";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://auto-money-make-app.vercel.app").trim().replace(/\/$/, "");

function getComparisonSlugs(): string[] {
  const dir = path.join(process.cwd(), "src/data/comparisons");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(".mdx", ""));
}

function getRoundupSlugs(): string[] {
  const dir = path.join(process.cwd(), "src/data/roundups");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(".mdx", ""));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const toolSlugs = getAllToolSlugs();
  const comparisonSlugs = getComparisonSlugs();
  const roundupSlugs = getRoundupSlugs();

  const now = new Date();

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/tools`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...toolSlugs.map((slug) => ({
      url: `${SITE_URL}/tools/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...comparisonSlugs.map((slug) => ({
      url: `${SITE_URL}/compare/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...roundupSlugs.map((slug) => ({
      url: `${SITE_URL}/best/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
