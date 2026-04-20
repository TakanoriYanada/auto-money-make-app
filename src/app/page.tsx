import Link from "next/link";
import type { Metadata } from "next";
import { getFeaturedTools, getAllTools, getToolBySlug, getToolIconUrl } from "@/lib/tools";
import { getAllToolGuides } from "@/lib/guides";
import { getAllComparisons } from "@/lib/comparisons";
import { getCanonicalUrl, generateWebSiteJsonLd, generateOrganizationJsonLd } from "@/lib/seo";
import ToolCard from "@/components/ToolCard";
import SponsorBanner from "@/components/SponsorBanner";
import ToolIcon from "@/components/ToolIcon";

export const revalidate = 3600;

const SITE_NAME = "AIツール比較ナビ";
const PAGE_TITLE = "AIツール比較ナビ — ChatGPT・Claude・Geminiなど人気AIを徹底比較";
const PAGE_DESC = "ChatGPT・Claude・Gemini・Perplexity AIなど人気AIツールを料金・機能・使いやすさで徹底比較。初心者にもわかりやすく目的別のおすすめを紹介。無料プランから有料プランまで評判・料金プラン・活用事例を詳しく解説します。";

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

export default function HomePage() {
  const featured = getFeaturedTools(6);
  const allTools = getAllTools();
  const toolGuides = getAllToolGuides();
  const allComparisons = getAllComparisons();

  const webSiteJsonLd = generateWebSiteJsonLd();
  const organizationJsonLd = generateOrganizationJsonLd();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <div className="max-w-6xl mx-auto px-4 py-10">
      {/* ヒーローセクション */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
          AIツールを<span className="text-green-600">徹底比較</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
          ChatGPT・Claude・Geminiなど人気AIツールを料金・機能・使いやすさで比較。あなたに最適な1本が見つかります。
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link href="/tools" className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all">
            ツール一覧を見る
          </Link>
          <Link href="/compare/chatgpt-vs-claude" className="border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-4 px-8 rounded-lg transition-colors">
            比較記事を読む
          </Link>
        </div>
      </section>

      {/* 注目ツール */}
      {featured.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">注目のAIツール</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* ガイド記事への誘導 */}
      <section className="mt-16">
        <Link
          href="/guide/ai-blog-start"
          className="block bg-gradient-to-br from-green-500 via-green-600 to-emerald-700 rounded-2xl p-6 md:p-8 text-white hover:shadow-xl transition-shadow"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">完全ガイド</span>
                <span className="text-xs text-green-100">読了時間 約10分</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                AIブログの始め方【2026年版】
              </h2>
              <p className="mt-2 text-green-50">
                ChatGPT・Claudeを使って初心者でも月1万円稼ぐ完全ロードマップ
              </p>
            </div>
            <div className="shrink-0 bg-white text-green-700 font-bold py-3 px-6 rounded-lg inline-flex items-center gap-2">
              ガイドを読む
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      </section>

      {/* ツール別使い方ガイド */}
      {toolGuides.length > 0 && (
        <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">使い方ガイド</h2>
            <Link href="/guide" className="text-green-600 hover:text-green-700 text-sm font-medium">
              すべてのガイドを見る →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {toolGuides.map((guide) => {
              const tool = getToolBySlug(guide.toolSlug);
              const iconUrl = tool ? getToolIconUrl(tool) : null;
              return (
                <Link
                  key={guide.slug}
                  href={`/guide/${guide.slug}`}
                  className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-green-300 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <ToolIcon iconUrl={iconUrl} name={tool?.name ?? guide.slug} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900">{tool?.name ?? guide.slug}</p>
                      <p className="text-xs text-gray-500">使い方完全ガイド</p>
                    </div>
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-gray-800 leading-snug line-clamp-2">
                    {guide.title.replace(/【.*?】/g, "")}
                  </h3>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-gray-400">{guide.useCases.length}のプロンプト例</span>
                    <span className="text-green-600 font-medium">読む →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* スポンサー枠: ヒーロー形式 */}
      <section className="mt-16">
        <SponsorBanner variant="hero" />
      </section>

      {/* 比較記事 */}
      {allComparisons.length > 0 && (
        <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">人気の比較記事</h2>
            {allComparisons.length > 4 && (
              <Link href="/compare" className="text-green-600 hover:text-green-700 text-sm font-medium">
                すべての比較記事を見る →
              </Link>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {allComparisons.map((comp) => {
              const toolA = getToolBySlug(comp.tool_a);
              const toolB = getToolBySlug(comp.tool_b);
              if (!toolA || !toolB) return null;

              const iconUrlA = getToolIconUrl(toolA);
              const iconUrlB = getToolIconUrl(toolB);

              return (
                <Link
                  key={comp.slug}
                  href={`/compare/${comp.slug}`}
                  className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-green-300 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <ToolIcon iconUrl={iconUrlA} name={toolA.name} size="sm" />
                    <span className="text-xs font-bold text-gray-400">VS</span>
                    <ToolIcon iconUrl={iconUrlB} name={toolB.name} size="sm" />
                  </div>
                  <h3 className="font-semibold text-gray-900 leading-snug">
                    {toolA.name} vs {toolB.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{comp.description}</p>
                  <span className="text-green-600 text-sm mt-3 inline-block font-medium group-hover:underline">
                    比較を読む →
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

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
    </>
  );
}
