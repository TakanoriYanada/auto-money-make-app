import type { Metadata } from "next";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { getToolBySlug, getToolIconUrl } from "@/lib/tools";
import { getCanonicalUrl } from "@/lib/seo";
import type { ComparisonFrontmatter } from "@/types";
import Breadcrumb from "@/components/Breadcrumb";
import ToolIcon from "@/components/ToolIcon";

const SITE_NAME = "AIツール比較ナビ";
const PAGE_TITLE =
  "AIツール比較記事一覧【2026年版】人気ツール同士を徹底比較";
const PAGE_DESC =
  "ChatGPT vs Claude、Notion vs Obsidianなど人気AIツール同士の違いを料金・機能・使いやすさで徹底比較。目的別にどちらがおすすめかをわかりやすく解説した比較記事の一覧です。";

export const revalidate = 604800;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: getCanonicalUrl("/compare") },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    siteName: SITE_NAME,
    locale: "ja_JP",
    type: "website",
    url: getCanonicalUrl("/compare"),
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESC,
  },
  robots: { index: true, follow: true },
};

function getAllComparisons(): (ComparisonFrontmatter & { content: string })[] {
  const dir = path.join(process.cwd(), "src/data/comparisons");
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  const comparisons: (ComparisonFrontmatter & { content: string })[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
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

export default function CompareIndexPage() {
  const comparisons = getAllComparisons();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumb
        items={[{ name: "ホーム", href: "/" }, { name: "比較記事" }]}
      />

      <header className="mt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          AIツール比較記事一覧
        </h1>
        <p className="mt-3 text-gray-600">
          人気AIツール同士の違いを徹底比較。料金・機能・使いやすさからあなたに最適なツールを見つけましょう。
        </p>
      </header>

      <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {comparisons.map((comp) => {
          const toolA = getToolBySlug(comp.tool_a);
          const toolB = getToolBySlug(comp.tool_b);
          if (!toolA || !toolB) return null;

          const iconUrlA = getToolIconUrl(toolA);
          const iconUrlB = getToolIconUrl(toolB);

          return (
            <Link
              key={comp.slug}
              href={`/compare/${comp.slug}`}
              className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-green-300 transition-all"
            >
              <div className="flex items-center justify-center gap-4">
                <div className="flex flex-col items-center gap-1">
                  <ToolIcon
                    iconUrl={iconUrlA}
                    name={toolA.name}
                    size="md"
                  />
                  <span className="text-sm font-semibold text-gray-900">
                    {toolA.name}
                  </span>
                </div>
                <span className="text-lg font-bold text-gray-400">VS</span>
                <div className="flex flex-col items-center gap-1">
                  <ToolIcon
                    iconUrl={iconUrlB}
                    name={toolB.name}
                    size="md"
                  />
                  <span className="text-sm font-semibold text-gray-900">
                    {toolB.name}
                  </span>
                </div>
              </div>

              <h2 className="mt-4 text-base font-bold text-gray-900 text-center leading-snug">
                {comp.title}
              </h2>
              <p className="mt-2 text-xs text-gray-500 text-center line-clamp-2">
                {comp.description}
              </p>

              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-gray-400">
                  更新: {comp.last_updated}
                </span>
                <span className="text-green-600 font-medium group-hover:underline">
                  比較を読む →
                </span>
              </div>
            </Link>
          );
        })}
      </section>

      {/* 関連導線 */}
      <section className="mt-12 bg-gray-50 rounded-xl p-6 text-center">
        <p className="text-gray-600 text-sm">
          ツール単体の詳細レビューは
          <Link
            href="/tools"
            className="text-green-600 hover:text-green-700 font-medium mx-1"
          >
            AIツール一覧
          </Link>
          をご覧ください。
        </p>
      </section>
    </div>
  );
}
