import type { ComparisonFrontmatter } from "@/types";

// Server-only imports (fs/path)
let fs: typeof import("fs") | null = null;
let path: typeof import("path") | null = null;

if (typeof window === "undefined") {
  fs = require("fs");
  path = require("path");
}

const COMPARISONS_DIR = typeof window === "undefined" && path ? path.join(process.cwd(), "src/data/comparisons") : "";

export interface Comparison extends ComparisonFrontmatter {
  content: string;
}

export function getAllComparisons(): Comparison[] {
  if (typeof window !== "undefined" || !fs || !path || !COMPARISONS_DIR) return [];
  if (!fs.existsSync(COMPARISONS_DIR)) return [];

  const files = fs
    .readdirSync(COMPARISONS_DIR)
    .filter((f) => f.endsWith(".mdx"));

  const comparisons: Comparison[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(COMPARISONS_DIR, file), "utf-8");
    const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) continue;

    const yamlLines = match[1].split("\n");
    const frontmatter: Record<string, unknown> = {};
    for (const line of yamlLines) {
      const [key, ...rest] = line.split(": ");
      if (key && rest.length) {
        const value = rest.join(": ").replace(/^["']|["']$/g, "");
        frontmatter[key.trim()] =
          value === "true" ? true : value === "false" ? false : value;
      }
    }

    comparisons.push({
      ...(frontmatter as unknown as ComparisonFrontmatter),
      content: match[2],
    });
  }

  return comparisons;
}

export function getComparisonBySlug(slug: string): Comparison | null {
  if (typeof window !== "undefined" || !fs || !path || !COMPARISONS_DIR) return null;
  const filePath = path.join(COMPARISONS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;

  const yamlLines = match[1].split("\n");
  const frontmatter: Record<string, unknown> = {};
  for (const line of yamlLines) {
    const [key, ...rest] = line.split(": ");
    if (key && rest.length) {
      const value = rest.join(": ").replace(/^["']|["']$/g, "");
      frontmatter[key.trim()] =
        value === "true" ? true : value === "false" ? false : value;
    }
  }

  return {
    ...(frontmatter as unknown as ComparisonFrontmatter),
    content: match[2],
  };
}

/**
 * 指定したツールスラッグを含む比較記事を取得する
 */
export function getComparisonsForTool(toolSlug: string, limit?: number): Comparison[] {
  const allComparisons = getAllComparisons();
  const related = allComparisons.filter(
    (comp) => comp.tool_a === toolSlug || comp.tool_b === toolSlug
  );

  return limit ? related.slice(0, limit) : related;
}

/**
 * 指定した比較記事に関連する他の比較記事を取得する
 * （同じツールが登場する比較記事）
 */
export function getRelatedComparisons(comparison: Comparison, limit = 3): Comparison[] {
  const allComparisons = getAllComparisons().filter((c) => c.slug !== comparison.slug);

  const scored = allComparisons.map((comp) => {
    let score = 0;

    // 同じツールが登場するかチェック
    if (comp.tool_a === comparison.tool_a || comp.tool_b === comparison.tool_a) score += 3;
    if (comp.tool_a === comparison.tool_b || comp.tool_b === comparison.tool_b) score += 3;

    return { comparison: comp, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.comparison);
}

export function getAllComparisonSlugs(): string[] {
  if (typeof window !== "undefined" || !fs || !COMPARISONS_DIR) return [];
  if (!fs.existsSync(COMPARISONS_DIR)) return [];
  return fs
    .readdirSync(COMPARISONS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));
}
