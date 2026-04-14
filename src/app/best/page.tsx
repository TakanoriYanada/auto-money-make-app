import type { Metadata } from "next";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { generateBreadcrumbJsonLd, getCanonicalUrl } from "@/lib/seo";
import Breadcrumb from "@/components/Breadcrumb";

const SITE_NAME = "AIツール比較ナビ";

export const revalidate = 604800;

export const metadata: Metadata = {
  title: "おすすめAIツールランキング記事一覧",
  description: "目的・カテゴリ別のおすすめAIツールランキング記事一覧。用途に合わせた最適なAIツールの選び方を紹介します。",
  alternates: {
    canonical: getCanonicalUrl("/best"),
  },
  robots: {
    index: true,
    follow: true,
  },
};

function getRoundupSlugs(): string[] {
  const dir = path.join(process.cwd(), "src/data/roundups");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(".mdx", ""));
}

export default function BestIndexPage() {
  const roundupSlugs = getRoundupSlugs();
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "ホーム", url: "/" },
    { name: "おすすめランキング", url: "/best" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb items={[
          { name: "ホーム", href: "/" },
          { name: "おすすめランキング" },
        ]} />

        <h1 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          おすすめAIツールランキング
        </h1>
        <p className="mt-3 text-gray-600 leading-relaxed">
          目的・カテゴリ別のおすすめAIツールランキング記事一覧です。用途に合わせた最適なツールを見つけましょう。
        </p>

        {roundupSlugs.length === 0 ? (
          <div className="mt-10 bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
            <p className="text-gray-600">
              現在、ランキング記事を準備中です。最新のAIツールは
              <Link href="/tools" className="text-green-600 hover:text-green-700 font-medium mx-1">
                ツール一覧ページ
              </Link>
              からご覧いただけます。
            </p>
          </div>
        ) : (
          <div className="mt-10 space-y-4">
            {roundupSlugs.map((slug) => (
              <Link
                key={slug}
                href={`/best/${slug}`}
                className="block bg-white border border-gray-200 rounded-xl p-6 hover:border-green-500 hover:shadow-md transition-all"
              >
                <h2 className="text-xl font-bold text-gray-900 hover:text-green-600 transition-colors">
                  {slug.replace(/-/g, " ")}のおすすめランキング
                </h2>
                <p className="text-sm text-gray-500 mt-1">詳細を見る →</p>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-10 bg-green-50 border-l-4 border-green-500 rounded-r-lg p-6">
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-green-700">すべてのAIツールを見る:</strong>
            <Link href="/tools" className="text-green-600 hover:text-green-700 font-medium ml-2">
              AIツール一覧ページはこちら →
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
