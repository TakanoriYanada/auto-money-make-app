import type { Tool } from "@/types";

// Server-only imports (fs/path)
let fs: typeof import("fs") | null = null;
let path: typeof import("path") | null = null;

if (typeof window === "undefined") {
  fs = require("fs");
  path = require("path");
}

const TOOLS_DIR = typeof window === "undefined" && path ? path.join(process.cwd(), "src/data/tools") : "";

export function getAllTools(): Tool[] {
  if (typeof window !== "undefined" || !fs || !path || !TOOLS_DIR) return [];
  if (!fs.existsSync(TOOLS_DIR)) return [];

  const files = fs
    .readdirSync(TOOLS_DIR)
    .filter((f) => f.endsWith(".json"));

  return files
    .map((file) => {
      const raw = fs!.readFileSync(path!.join(TOOLS_DIR, file), "utf-8");
      return JSON.parse(raw) as Tool;
    })
    .filter((tool) => tool.status === "active")
    .sort((a, b) => b.rating - a.rating);
}

export function getToolBySlug(slug: string): Tool | null {
  if (typeof window !== "undefined" || !fs || !path || !TOOLS_DIR) return null;
  const filePath = path.join(TOOLS_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Tool;
}

export function getFeaturedTools(limit = 6): Tool[] {
  return getAllTools()
    .filter((t) => t.featured)
    .slice(0, limit);
}

export function getToolsByCategory(category: string): Tool[] {
  return getAllTools().filter((t) => t.categories.includes(category));
}

export function getAllToolSlugs(): string[] {
  if (typeof window !== "undefined" || !fs || !TOOLS_DIR) return [];
  if (!fs.existsSync(TOOLS_DIR)) return [];
  return fs
    .readdirSync(TOOLS_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""));
}

/**
 * ツールのアイコンURLを取得する。
 *
 * 優先順位:
 * 1. tool.logo_url が /images/ または /logos/ で始まる場合はローカル画像として使用
 * 2. tool.logo_url が https:// で始まる場合は外部URLをそのまま使用
 * 3. それ以外（空・無効）の場合は Google Favicon API にフォールバック
 *
 * ローカル画像は /public/images/tools/{slug}.webp に配置する想定。
 * Google Favicon は 128px（表示サイズ 56px の 2倍、Retina対応）。
 */
export function getToolIconUrl(tool: Tool): string | null {
  // 優先1: ローカル画像パス（public/ 配下に実ファイルがある場合のみ）
  if (tool.logo_url && (tool.logo_url.startsWith("/images/") || tool.logo_url.startsWith("/logos/"))) {
    if (fs && path) {
      const localPath = path.join(process.cwd(), "public", tool.logo_url);
      if (fs.existsSync(localPath)) return tool.logo_url;
    }
    // 実ファイルが無ければ次のフォールバックへ進む
  }

  // 優先2: 外部URL（https://）
  if (tool.logo_url && tool.logo_url.startsWith("https://")) {
    return tool.logo_url;
  }

  // 優先3: Google Favicon APIフォールバック
  if (!tool.website_url) return null;
  try {
    const domain = new URL(tool.website_url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  } catch {
    return null;
  }
}

export function getRelatedTools(tool: Tool, limit = 3): Tool[] {
  const allTools = getAllTools().filter((t) => t.slug !== tool.slug);

  const scored = allTools.map((t) => {
    let score = 0;
    const sharedCategories = t.categories.filter((c) => tool.categories.includes(c)).length;
    const sharedTags = t.tags.filter((tag) => tool.tags.includes(tag)).length;
    score += sharedCategories * 3;
    score += sharedTags * 1;
    return { tool: t, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || b.tool.rating - a.tool.rating)
    .slice(0, limit)
    .map((s) => s.tool);
}

/**
 * 全ツールから重複なしのカテゴリ一覧を取得する。
 */
export function getAllCategories(): string[] {
  const categoriesSet = new Set<string>();
  getAllTools().forEach((tool) => {
    tool.categories.forEach((cat) => categoriesSet.add(cat));
  });
  return Array.from(categoriesSet).sort();
}
