import type { MetadataRoute } from "next";
import { getAllToolSlugs } from "@/lib/tools";
import { getAllToolGuideSlugs } from "@/lib/guides";
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
    // ガイドインデックス
    { url: `${SITE_URL}/guide`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    // 特別ガイド記事
    { url: `${SITE_URL}/guide/ai-blog-start`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    // ツール別ガイド記事
    ...getAllToolGuideSlugs().map((slug) => ({
      url: `${SITE_URL}/guide/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    // 法的必須ページ
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/disclaimer`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
