import type { Metadata } from "next";
import Link from "next/link";
import { getAllToolGuides } from "@/lib/guides";
import { getToolBySlug, getToolIconUrl } from "@/lib/tools";
import { getCanonicalUrl } from "@/lib/seo";
import Breadcrumb from "@/components/Breadcrumb";
import ToolIcon from "@/components/ToolIcon";

const SITE_NAME = "AIツール比較ナビ";
const PAGE_TITLE = "AIツール使い方ガイド一覧【2026年版】初心者向け完全解説";
const PAGE_DESC =
  "ChatGPT・Claude・Gemini等のAIツールの使い方を初心者向けに完全解説。プロンプト例・活用シーン・コツを含む実践的なガイド記事を多数掲載。AIブログの始め方・収益化方法も詳しく紹介します。";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: getCanonicalUrl("/guide") },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    siteName: SITE_NAME,
    locale: "ja_JP",
    type: "website",
    url: getCanonicalUrl("/guide"),
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESC,
  },
  robots: { index: true, follow: true },
};

/** AIブログの始め方など、ツールに紐付かない特別ガイドを手動で定義 */
const SPECIAL_GUIDES = [
  {
    slug: "ai-blog-start",
    path: "/guide/ai-blog-start",
    title: "AIブログの始め方【2026年版】初心者でも月1万円稼ぐ完全ガイド",
    description:
      "ドメイン取得・レンタルサーバー契約・WordPressインストール・AIツール活用・アフィリエイト収益化まで、初心者向けに6ステップで解説。",
    badge: "収益化",
    readingMinutes: 10,
  },
];

export default function GuideIndexPage() {
  const toolGuides = getAllToolGuides();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumb items={[{ name: "ホーム", href: "/" }, { name: "ガイド" }]} />

      <header className="mt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          AIガイド一覧
        </h1>
        <p className="mt-3 text-gray-600">
          AIツールの使い方からブログの収益化まで、初心者にもわかりやすい完全ガイドをまとめました。
        </p>
      </header>

      {/* 特別ガイド */}
      {SPECIAL_GUIDES.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-5">📘 おすすめのガイド</h2>
          <div className="grid grid-cols-1 gap-5">
            {SPECIAL_GUIDES.map((g) => (
              <Link
                key={g.slug}
                href={g.path}
                className="block bg-gradient-to-br from-green-500 via-green-600 to-emerald-700 rounded-2xl p-6 md:p-8 text-white hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {g.badge && (
                        <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                          {g.badge}
                        </span>
                      )}
                      <span className="text-xs text-green-100">
                        読了時間 約{g.readingMinutes}分
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold leading-tight">{g.title}</h3>
                    <p className="mt-2 text-green-50 text-sm md:text-base">{g.description}</p>
                  </div>
                  <div className="shrink-0 bg-white text-green-700 font-bold py-3 px-6 rounded-lg inline-flex items-center gap-2 whitespace-nowrap">
                    読む
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ツール別ガイド */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-5">🔧 ツール別使い方ガイド</h2>
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
                <p className="mt-2 text-xs text-gray-500 line-clamp-2">{guide.description}</p>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-gray-400">読了時間 約{guide.readingMinutes}分</span>
                  <span className="text-green-600 font-medium">読む →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
