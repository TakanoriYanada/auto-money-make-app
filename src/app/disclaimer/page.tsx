import type { Metadata } from "next";
import Link from "next/link";
import { getCanonicalUrl } from "@/lib/seo";
import Breadcrumb from "@/components/Breadcrumb";

const SITE_NAME = "AIツール比較ナビ";
const PAGE_TITLE = "免責事項 | AIツール比較ナビ";
const PAGE_DESC = `${SITE_NAME}の免責事項。掲載情報の正確性・リンク先の内容・著作権・損害賠償の責任範囲について記載しています。`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: getCanonicalUrl("/disclaimer") },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    siteName: SITE_NAME,
    locale: "ja_JP",
    type: "website",
    url: getCanonicalUrl("/disclaimer"),
  },
  robots: { index: true, follow: true },
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Breadcrumb items={[{ name: "ホーム", href: "/" }, { name: "免責事項" }]} />

      <h1 className="mt-6 text-3xl font-bold text-gray-900">免責事項</h1>

      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6 md:p-8 space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">掲載情報の正確性について</h2>
          <p>
            {SITE_NAME}（以下「当サイト」）に掲載されている情報は、記事執筆時点での情報であり、最新の情報と異なる場合があります。
            当サイトは掲載情報の正確性・完全性・有用性について万全を期していますが、これらを保証するものではありません。
          </p>
          <p className="mt-2">
            AIツールの料金プラン・機能・仕様は各サービス提供元により予告なく変更される場合があります。ご利用の際は必ず公式サイトにて最新情報をご確認ください。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">損害賠償の免責</h2>
          <p>
            当サイトに掲載されている情報を利用したことにより発生したいかなる損害についても、当サイトは一切の責任を負いかねます。
            掲載情報を利用する際は、利用者ご自身の判断と責任において行ってください。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">リンク先の内容について</h2>
          <p>
            当サイトから他のウェブサイトへリンクを設置している場合がありますが、リンク先のウェブサイトで提供される情報、サービス等について、当サイトは一切の責任を負いません。
            リンク先のウェブサイトでトラブル等が発生した場合も、リンク先のウェブサイトと利用者の間で解決していただくこととなります。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">著作権について</h2>
          <p>
            当サイトに掲載されている文章、画像、ロゴ、アイコン等のコンテンツの著作権は、当サイトまたは正当な権利を有する第三者に帰属します。
            各AIツールのロゴ・サービス名・スクリーンショットは、それぞれの商標権者・著作権者に帰属します。
          </p>
          <p className="mt-2">
            当サイトのコンテンツを無断で複製・転載・改変・再配布することは、私的使用その他著作権法により認められる場合を除き、固く禁じます。
            引用の際は、引用元として当サイトのURLを明記してください。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">アフィリエイトプログラムについて</h2>
          <p>
            当サイトはA8.net・バリューコマース・もしもアフィリエイト等のアフィリエイトプログラムに参加しており、
            当サイトのリンクを経由して商品・サービスを購入・契約された場合、当サイトに紹介料が支払われることがあります。
          </p>
          <p className="mt-2">
            ただし、当サイトはアフィリエイト報酬の有無によってレビュー内容や評価を変えることはありません。
            実際の機能・料金に基づき、公平な視点で情報提供を行うことを運営方針としています。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">掲載内容の変更・削除について</h2>
          <p>
            当サイトは、掲載している情報を予告なく変更・削除することがあります。また、当サイト自体の運営を予告なく中断・中止することがあります。
            これらの変更・削除・中止によって利用者に発生したいかなる損害についても、当サイトは責任を負いかねます。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">免責事項の変更</h2>
          <p>
            当サイトは、必要に応じて本免責事項を変更することがあります。変更後の免責事項は、当サイトに掲載された時点から効力を生じるものとします。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">お問い合わせ</h2>
          <p>
            本免責事項に関するお問い合わせは、
            <Link href="/contact" className="text-green-600 hover:text-green-700 underline mx-1">
              お問い合わせページ
            </Link>
            よりご連絡ください。
          </p>
        </section>
      </div>

      <p className="mt-6 text-xs text-gray-400 text-right">
        制定日: {new Date().toISOString().slice(0, 10)}
      </p>
    </div>
  );
}
