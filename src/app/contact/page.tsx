import type { Metadata } from "next";
import Link from "next/link";
import { getCanonicalUrl } from "@/lib/seo";
import Breadcrumb from "@/components/Breadcrumb";

const SITE_NAME = "AIツール比較ナビ";
const PAGE_TITLE = "お問い合わせ";
const PAGE_DESC = `${SITE_NAME}へのお問い合わせ方法。記事内容の訂正依頼、広告掲載のご相談、その他のお問い合わせはこちらから。`;

// Google Forms フォームURL例（後で人間が差し替え）
const CONTACT_FORM_URL = process.env.NEXT_PUBLIC_CONTACT_FORM_URL ?? "";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: getCanonicalUrl("/contact") },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    siteName: SITE_NAME,
    locale: "ja_JP",
    type: "website",
    url: getCanonicalUrl("/contact"),
  },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Breadcrumb items={[{ name: "ホーム", href: "/" }, { name: "お問い合わせ" }]} />

      <h1 className="mt-6 text-3xl font-bold text-gray-900">お問い合わせ</h1>
      <p className="mt-2 text-gray-600">
        {SITE_NAME}へのお問い合わせは、以下のフォームよりお願いいたします。
      </p>

      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6 md:p-8 space-y-6">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">お問い合わせの種類</h2>
          <ul className="text-gray-700 space-y-2 list-disc list-inside">
            <li>記事内容に関する訂正・補足のご連絡</li>
            <li>AIツールの掲載希望・レビュー依頼</li>
            <li>広告掲載・タイアップのご相談</li>
            <li>取材・執筆依頼</li>
            <li>その他、当サイトに関するお問い合わせ</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">お問い合わせフォーム</h2>
          {CONTACT_FORM_URL ? (
            <a
              href={CONTACT_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              お問い合わせフォームを開く
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-900">
              お問い合わせフォームは現在準備中です。しばらくお待ちください。
            </div>
          )}
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">回答について</h2>
          <p className="text-gray-700 leading-relaxed">
            お問い合わせの内容を確認の上、順次ご返信いたします。内容によっては回答までお時間をいただく場合や、回答しかねる場合がございますので、あらかじめご了承ください。
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            いただいた個人情報は、お問い合わせへの回答以外の目的では使用いたしません。詳しくは
            <Link href="/privacy" className="text-green-600 hover:text-green-700 underline mx-1">
              プライバシーポリシー
            </Link>
            をご覧ください。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">よくあるご質問</h2>
          <div className="space-y-4 text-gray-700">
            <div>
              <p className="font-semibold text-gray-900">Q. 掲載されているAIツールの情報が古い・間違っている</p>
              <p className="mt-1 text-sm">
                各ツール提供元の公式サイトで料金や機能が変更された場合、すぐに反映できないことがあります。お気づきの点があれば、お問い合わせフォームよりご連絡ください。該当記事のURLと具体的な箇所を記載いただけますと幸いです。
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Q. 自社サービスを当サイトに掲載してほしい</p>
              <p className="mt-1 text-sm">
                AIツールの掲載依頼は随時受け付けています。サービス名・公式サイトURL・主な機能・料金プランをお問い合わせフォームに記載してお送りください。審査の上、掲載可否をご連絡いたします。
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Q. 記事の転載・引用は可能ですか？</p>
              <p className="mt-1 text-sm">
                引用元として当サイトのURLを明記いただければ、引用（著作権法第32条に基づく引用の範囲内）は可能です。記事全体の転載・無断転載は固くお断りいたします。詳細は
                <Link href="/disclaimer" className="text-green-600 hover:text-green-700 underline mx-1">
                  免責事項
                </Link>
                をご覧ください。
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
