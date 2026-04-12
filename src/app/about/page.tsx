import type { Metadata } from "next";
import Link from "next/link";
import { getCanonicalUrl } from "@/lib/seo";
import Breadcrumb from "@/components/Breadcrumb";

const SITE_NAME = "AIツール比較ナビ";
const PAGE_TITLE = "運営者情報";
const PAGE_DESC = `${SITE_NAME}の運営者情報・サイトの運営方針・お問い合わせ先を記載しています。`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: getCanonicalUrl("/about") },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    siteName: SITE_NAME,
    locale: "ja_JP",
    type: "website",
    url: getCanonicalUrl("/about"),
  },
  robots: { index: true, follow: true },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Breadcrumb items={[{ name: "ホーム", href: "/" }, { name: "運営者情報" }]} />

      <h1 className="mt-6 text-3xl font-bold text-gray-900">運営者情報</h1>

      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6 md:p-8 space-y-6">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">サイト名</h2>
          <p className="text-gray-700">{SITE_NAME}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">サイトURL</h2>
          <p className="text-gray-700">
            <a
              href="https://aitool-hikaku-navi.com"
              className="text-green-600 hover:text-green-700 underline"
            >
              https://aitool-hikaku-navi.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">サイトの目的</h2>
          <p className="text-gray-700 leading-relaxed">
            {SITE_NAME}は、ChatGPT・Claude・Geminiなど多数の生成AIツールを、料金・機能・使いやすさの観点から徹底的に比較・レビューする日本語情報サイトです。
            AIツール選びに悩む方が、自分の目的や予算に合った最適な1本を見つけられるように、信頼できる情報を公平な視点で提供することを目指しています。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">コンテンツ方針</h2>
          <ul className="text-gray-700 space-y-2 list-disc list-inside">
            <li>実際の機能・料金プランを一次情報（公式サイト）に基づいて記載します</li>
            <li>メリットだけでなくデメリットも率直に記載します</li>
            <li>情報は定期的に見直し、最終更新日を明記します</li>
            <li>アフィリエイトプログラムを利用していますが、収益の有無で評価を変えることはありません</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">運営者</h2>
          <p className="text-gray-700">
            個人運営のサイトです。運営者情報の詳細、お問い合わせ先は
            <Link href="/contact" className="text-green-600 hover:text-green-700 underline mx-1">
              お問い合わせページ
            </Link>
            をご覧ください。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">アフィリエイトプログラムの利用について</h2>
          <p className="text-gray-700 leading-relaxed">
            当サイトは、A8.net・バリューコマース・もしもアフィリエイトなどのアフィリエイトプログラムを利用して広告収益を得ています。
            紹介している商品・サービスのリンクを経由してご購入・ご契約いただいた場合、当サイトに紹介料が支払われることがあります。
            詳細は
            <Link href="/privacy" className="text-green-600 hover:text-green-700 underline mx-1">
              プライバシーポリシー
            </Link>
            および
            <Link href="/disclaimer" className="text-green-600 hover:text-green-700 underline mx-1">
              免責事項
            </Link>
            をご確認ください。
          </p>
        </section>
      </div>

      <p className="mt-6 text-xs text-gray-400 text-right">
        最終更新: {new Date().toISOString().slice(0, 10)}
      </p>
    </div>
  );
}
