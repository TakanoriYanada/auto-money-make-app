import type { Metadata } from "next";
import Link from "next/link";
import { getCanonicalUrl } from "@/lib/seo";
import Breadcrumb from "@/components/Breadcrumb";

const SITE_NAME = "AIツール比較ナビ";
const PAGE_TITLE = "プライバシーポリシー | AIツール比較ナビ";
const PAGE_DESC = `${SITE_NAME}のプライバシーポリシー。個人情報の取り扱い、Cookie・アクセス解析ツール・広告配信の利用について記載しています。`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: getCanonicalUrl("/privacy") },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    siteName: SITE_NAME,
    locale: "ja_JP",
    type: "website",
    url: getCanonicalUrl("/privacy"),
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Breadcrumb items={[{ name: "ホーム", href: "/" }, { name: "プライバシーポリシー" }]} />

      <h1 className="mt-6 text-3xl font-bold text-gray-900">プライバシーポリシー</h1>
      <p className="mt-2 text-sm text-gray-500">
        {SITE_NAME}（以下「当サイト」といいます）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。本ポリシーでは、当サイトが取得する情報とその利用目的、第三者への提供について説明します。
      </p>

      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6 md:p-8 space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. 個人情報の取得について</h2>
          <p>
            当サイトでは、お問い合わせフォーム等を通じて、氏名・メールアドレスなどの個人情報を取得する場合があります。取得した情報は、お問い合わせへの回答、当サイトの運営上の連絡目的以外には使用いたしません。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. 個人情報の第三者提供</h2>
          <p>
            当サイトでは、法令に基づく場合を除き、取得した個人情報をユーザー本人の同意なく第三者に提供することはありません。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. アクセス解析ツールについて</h2>
          <p>
            当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス（Google Analytics 4）」および「Google Search Console」を利用しています。これらはトラフィックデータの収集のためにCookieを使用しており、このトラフィックデータは匿名で収集されています。個人を特定するものではありません。
          </p>
          <p className="mt-2">
            この機能はCookieを無効にすることで収集を拒否することができますので、お使いのブラウザの設定をご確認ください。詳しくは
            <a
              href="https://marketingplatform.google.com/about/analytics/terms/jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 underline mx-1"
            >
              Googleアナリティクスサービス利用規約
            </a>
            をご参照ください。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Cookieについて</h2>
          <p>
            Cookie（クッキー）は、ウェブサイトがユーザーのブラウザに保存する小さなデータファイルで、ユーザーの利用状況を記録するために使用されます。当サイトでは、ユーザーエクスペリエンスの向上、アクセス解析、広告配信の最適化のためにCookieを使用することがあります。
          </p>
          <p className="mt-2">
            Cookieの利用を希望されない場合は、ブラウザの設定からCookieを無効化することができますが、一部のサービスが正しく動作しない可能性があります。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. 広告配信について</h2>
          <p>
            当サイトでは、第三者配信の広告サービス（Google AdSense、A8.net、バリューコマース、もしもアフィリエイト等）を利用する場合があります。
          </p>
          <p className="mt-2">
            こうした広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。Cookieを無効にする設定およびGoogle AdSenseに関する詳細は
            <a
              href="https://policies.google.com/technologies/ads?hl=ja"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 underline mx-1"
            >
              Googleの広告に関するポリシー
            </a>
            をご覧ください。
          </p>
          <p className="mt-2">
            第三者がコンテンツおよび宣伝を提供し、訪問者から直接情報を収集し、訪問者のブラウザにCookieを設定したりこれを認識したりする場合があります。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">6. アフィリエイトプログラムについて</h2>
          <p>
            当サイトは、以下のアフィリエイトプログラムを利用して広告収益を得ています:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>A8.net（株式会社ファンコミュニケーションズ）</li>
            <li>バリューコマース（バリューコマース株式会社）</li>
            <li>もしもアフィリエイト（株式会社もしも）</li>
            <li>Amazonアソシエイト・プログラム</li>
          </ul>
          <p className="mt-2">
            これらのプログラムは、当サイトに広告を掲載することで、商品・サービス購入時に発生する紹介料を得る仕組みです。当サイト内のリンクから遷移して商品・サービスをご購入・ご利用いただいた場合、当サイトに成果報酬が発生することがあります。
          </p>
          <p className="mt-3 bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm">
            Amazonのアソシエイトとして、当メディアは適格販売により収入を得ています。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">7. 免責事項</h2>
          <p>
            当サイトに掲載する情報の正確性には万全を期していますが、内容を保証するものではありません。情報の利用によって生じたいかなる損害についても、当サイトは責任を負いません。詳細は
            <Link href="/disclaimer" className="text-green-600 hover:text-green-700 underline mx-1">
              免責事項
            </Link>
            をご確認ください。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">8. プライバシーポリシーの変更</h2>
          <p>
            当サイトは、必要に応じて本プライバシーポリシーを変更することがあります。変更後のプライバシーポリシーは、当サイトに掲載された時点から効力を生じるものとします。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">9. お問い合わせ</h2>
          <p>
            本プライバシーポリシーに関するお問い合わせは、
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
