import Link from "next/link";
import type { Metadata } from "next";
import { getFeaturedTools, getAllTools } from "@/lib/tools";
import { getCanonicalUrl } from "@/lib/seo";
import ToolCard from "@/components/ToolCard";

export const revalidate = 3600;

const SITE_NAME = "AIツール比較ナビ";
const PAGE_TITLE = "AIツール比較ナビ — ChatGPT・Claude・Geminiなど人気AIを徹底比較";
const PAGE_DESC = "AIツールを料金・機能・使いやすさで徹底比較。ChatGPT・Claude・Gemini・Perplexity AIなど人気ツールの評判・料金プランを詳しく解説します。";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    siteName: SITE_NAME,
    locale: "ja_JP",
    type: "website",
    url: getCanonicalUrl("/"),
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESC,
  },
  alternates: {
    canonical: getCanonicalUrl("/"),
  },
  robots: {
    index: true,
    follow: true,
  },
};

const COMPARISONS = [
  { slug: "chatgpt-vs-claude", title: "ChatGPT vs Claude 徹底比較", desc: "2大AIチャットを機能・料金・使いやすさで比較" },
  { slug: "chatgpt-vs-gemini", title: "ChatGPT vs Gemini 徹底比較", desc: "OpenAI vs Googleの頂上決戦" },
  { slug: "notion-vs-obsidian", title: "Notion vs Obsidian 徹底比較", desc: "ノートアプリの2大巨頭を比較" },
  { slug: "cursor-vs-github-copilot", title: "Cursor vs GitHub Copilot 比較", desc: "AIコーディングツールどちらがおすすめ？" },
];

export default function HomePage() {
  const featured = getFeaturedTools(6);
  const allTools = getAllTools();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* ヒーローセクション */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          AIツールを<span className="text-green-600">徹底比較</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
          ChatGPT・Claude・Geminiなど人気AIツールを料金・機能・使いやすさで比較。あなたに最適な1本が見つかります。
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link href="/tools" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            ツール一覧を見る
          </Link>
          <Link href="/compare/chatgpt-vs-claude" className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors">
            比較記事を読む
          </Link>
        </div>
      </section>

      {/* 注目ツール */}
      {featured.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">注目のAIツール</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
          {allTools.length > 6 && (
            <div className="text-center mt-8">
              <Link href="/tools" className="text-green-600 hover:text-green-700 font-medium">
                すべてのツールを見る →
              </Link>
            </div>
          )}
        </section>
      )}

      {/* 比較記事 */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">人気の比較記事</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {COMPARISONS.map((c) => (
            <Link
              key={c.slug}
              href={`/compare/${c.slug}`}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900">{c.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{c.desc}</p>
              <span className="text-green-600 text-sm mt-3 inline-block">読む →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 特徴説明 */}
      <section className="mt-16 bg-white rounded-2xl border border-gray-200 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">AIツール比較ナビの特徴</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { icon: "🔍", title: "徹底した比較", desc: "料金・機能・使いやすさを多角的に検証" },
            { icon: "🆕", title: "常に最新情報", desc: "定期的に情報を更新し、最新の料金・機能を掲載" },
            { icon: "🎯", title: "目的別で選べる", desc: "ライター・エンジニア・学生など用途別に推奨" },
          ].map((f) => (
            <div key={f.title}>
              <div className="text-3xl mb-2">{f.icon}</div>
              <h3 className="font-semibold text-gray-900">{f.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
