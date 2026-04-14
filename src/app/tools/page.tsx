import type { Metadata } from "next";
import { getAllTools, getAllCategories } from "@/lib/tools";
import { getCanonicalUrl } from "@/lib/seo";
import ToolsList from "@/components/ToolsList";

export const revalidate = 86400;

const SITE_NAME = "AIツール比較ナビ";
const PAGE_TITLE = "AIツール一覧21選【2026年最新版】料金・機能・評価で徹底比較";
const PAGE_DESC = "ChatGPT・Claude・Gemini・Perplexity AIなど人気AIツール21選を一覧で比較。料金プラン・機能・評価・使いやすさで絞り込み可能。無料で使えるツールからプロ向け有料ツールまで網羅的に紹介します。";

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
  const categories = getAllCategories();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">AIツール一覧</h1>
      <p className="text-gray-600 mb-8">
        料金・機能・評価で比較できます。カテゴリや無料プランで絞り込み可能です。
      </p>

      {tools.length === 0 ? (
        <p className="text-gray-500 text-center py-20">ツール情報を準備中です...</p>
      ) : (
        <ToolsList tools={tools} categories={categories} />
      )}
    </div>
  );
}
