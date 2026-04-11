import fs from "fs";
import path from "path";
import type { Tool } from "@/types";

const TOOLS_DIR = path.join(process.cwd(), "src/data/tools");

export function getAllTools(): Tool[] {
  if (!fs.existsSync(TOOLS_DIR)) return [];

  const files = fs
    .readdirSync(TOOLS_DIR)
    .filter((f) => f.endsWith(".json"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(TOOLS_DIR, file), "utf-8");
      return JSON.parse(raw) as Tool;
    })
    .filter((tool) => tool.status === "active")
    .sort((a, b) => b.rating - a.rating);
}

export function getToolBySlug(slug: string): Tool | null {
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
  if (!fs.existsSync(TOOLS_DIR)) return [];
  return fs
    .readdirSync(TOOLS_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""));
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
