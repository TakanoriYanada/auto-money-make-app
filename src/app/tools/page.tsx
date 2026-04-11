import type { Metadata } from "next";
import { getAllTools } from "@/lib/tools";
import { getCanonicalUrl } from "@/lib/seo";
import ToolCard from "@/components/ToolCard";

export const revalidate = 86400;

const SITE_NAME = "AIツール比較ナビ";
const PAGE_TITLE = "AIツール一覧【2026年版】人気ツールを徹底比較";
const PAGE_DESC = "ChatGPT・Claude・Gemini・Perplexity AIなど人気AIツールを一覧で比較。料金・機能・評価・使いやすさで絞り込めます。";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    siteName: SITE_NAME,
    locale: "ja_JP",
    type: "website",
    url: getCanonicalUrl("/tools"),
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESC,
  },
  alternates: {
    canonical: getCanonicalUrl("/tools"),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolsPage() {
  const tools = getAllTools();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">AIツール一覧</h1>
      <p className="text-gray-600 mb-8">
        {tools.length}件のAIツールを掲載中。料金・機能・評価で比較できます。
      </p>

      {tools.length === 0 ? (
        <p className="text-gray-500 text-center py-20">ツール情報を準備中です...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
