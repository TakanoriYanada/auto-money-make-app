import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllToolGuideSlugs,
  getToolGuideBySlug,
  TOOL_GUIDES,
} from "@/lib/guides";
import { getToolBySlug, getToolIconUrl } from "@/lib/tools";
import { buildAffiliateUrl, getCtaLabel, getImpressionPixelUrl } from "@/lib/affiliate";
import {
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
  getCanonicalUrl,
} from "@/lib/seo";
import Breadcrumb from "@/components/Breadcrumb";
import AffiliateButton from "@/components/AffiliateButton";
import StarRating from "@/components/StarRating";
import SponsorBanner from "@/components/SponsorBanner";
import ToolIcon from "@/components/ToolIcon";
import BookRecommendation from "@/components/BookRecommendation";

const SITE_NAME = "AIツール比較ナビ";

export const revalidate = 604800;

export async function generateStaticParams() {
  return getAllToolGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getToolGuideBySlug(slug);
  if (!guide) return {};

  const canonicalUrl = getCanonicalUrl(`/guide/${slug}`);

  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: guide.title,
      description: guide.description,
      siteName: SITE_NAME,
      locale: "ja_JP",
      type: "article",
      url: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function ToolGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getToolGuideBySlug(slug);
  if (!guide) notFound();

  const tool = getToolBySlug(guide.toolSlug);
  const affiliateUrl = tool ? buildAffiliateUrl(tool) : null;
  const impressionPixel = tool ? getImpressionPixelUrl(tool) : null;
  const ctaLabel = tool ? getCtaLabel(tool) : "公式サイトを見る";
  const toolIconUrl = tool ? getToolIconUrl(tool) : null;

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "ホーム", url: "/" },
    { name: "ガイド", url: "/guide" },
    { name: tool?.name ?? guide.slug, url: `/guide/${slug}` },
  ]);

  const faqJsonLd = generateFaqJsonLd(guide.faqs);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.lastUpdated,
    dateModified: guide.lastUpdated,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: getCanonicalUrl("/"),
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getCanonicalUrl(`/guide/${slug}`),
    },
  };

  const relatedGuides = (guide.relatedGuides ?? [])
    .map((s) => TOOL_GUIDES[s])
    .filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {impressionPixel && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={impressionPixel} alt="" width={1} height={1} className="hidden" aria-hidden />
      )}

      <article className="max-w-3xl mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { name: "ホーム", href: "/" },
            { name: "ガイド", href: "/guide" },
            { name: tool?.name ?? guide.slug },
          ]}
        />

        {/* ヘッダー */}
        <header className="mt-6">
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
              使い方ガイド
            </span>
            <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
              2026年最新版
            </span>
            <span className="text-xs text-gray-500">
              読了時間: 約{guide.readingMinutes}分
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {guide.title}
          </h1>

          {/* 対象ツール情報 */}
          {tool && (
            <div className="mt-6 bg-white border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 group">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <ToolIcon iconUrl={toolIconUrl} name={tool.name} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900">{tool.name}</p>
                  <StarRating rating={tool.rating} size="sm" />
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/tools/${tool.slug}`}
                  className="text-sm py-2 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  詳細を見る
                </Link>
                {affiliateUrl && (
                  <AffiliateButton
                    href={affiliateUrl}
                    label={ctaLabel}
                    toolName={tool.name}
                    size="sm"
                  />
                )}
              </div>
            </div>
          )}
        </header>

        {/* イントロ */}
        <section className="mt-8">
          {guide.intro.split("\n\n").map((paragraph, i) => (
            <p key={i} className="mt-4 text-gray-700 leading-relaxed first:mt-0">
              {paragraph}
            </p>
          ))}
        </section>

        {/* こんな人におすすめ */}
        <section className="mt-8 bg-green-50 border-l-4 border-green-500 rounded-r-xl p-5">
          <p className="font-bold text-green-900 mb-2">🎯 この記事はこんな人におすすめ</p>
          <ul className="text-sm text-green-900 space-y-1 list-disc list-inside">
            {guide.targetUsers.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
        </section>

        {/* 目次 */}
        <nav className="mt-8 bg-white border border-gray-200 rounded-xl p-5" aria-label="目次">
          <p className="font-bold text-gray-900 mb-3">📋 目次</p>
          <ol className="space-y-1.5 text-sm text-gray-700 list-decimal list-inside">
            <li>
              <a href="#use-cases" className="hover:text-green-600 hover:underline">
                活用シーン{guide.useCases.length}選
              </a>
            </li>
            <li>
              <a href="#tips" className="hover:text-green-600 hover:underline">
                使いこなしのコツ
              </a>
            </li>
            {guide.books && guide.books.length > 0 && (
              <li>
                <a href="#books" className="hover:text-green-600 hover:underline">
                  おすすめ書籍
                </a>
              </li>
            )}
            <li>
              <a href="#faq" className="hover:text-green-600 hover:underline">
                よくある質問
              </a>
            </li>
          </ol>
        </nav>

        {/* 活用シーン */}
        <section id="use-cases" className="mt-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-green-500 pb-2">
            活用シーン{guide.useCases.length}選
          </h2>
          <p className="mt-3 text-sm text-gray-600">
            すぐに使える実践的な活用シーンを紹介します。プロンプト例はコピペで使えます。
          </p>

          <div className="mt-6 space-y-8">
            {guide.useCases.map((useCase, i) => (
              <div key={useCase.title} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-700 shrink-0 text-sm">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900">{useCase.title}</h3>
                    <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                      {useCase.description}
                    </p>

                    {useCase.promptExample && (
                      <div className="mt-4">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                          プロンプト例
                        </p>
                        <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap">
                          {useCase.promptExample}
                        </pre>
                      </div>
                    )}

                    {useCase.tips && (
                      <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-xs text-yellow-900">
                          <strong>💡 Tip:</strong> {useCase.tips}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* スポンサー挿入（記事中盤） */}
        <div className="mt-10">
          <SponsorBanner variant="inline" seed={slug} />
        </div>

        {/* 使いこなしのコツ */}
        <section id="tips" className="mt-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-green-500 pb-2">
            使いこなしのコツ
          </h2>
          <p className="mt-3 text-sm text-gray-600">
            プロが実践している{guide.tips.length}つのポイントを紹介します。
          </p>

          <div className="mt-6 space-y-4">
            {guide.tips.map((tip) => (
              <div key={tip.title} className="bg-white border border-gray-200 rounded-xl p-5">
                <p className="font-semibold text-gray-900">✨ {tip.title}</p>
                <p className="mt-2 text-sm text-gray-700 leading-relaxed">{tip.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* おすすめ書籍 */}
        {guide.books && guide.books.length > 0 && (
          <div id="books">
            <BookRecommendation
              books={guide.books}
              sectionTitle={`${tool?.name ?? "このテーマ"}を学ぶおすすめ書籍`}
            />
          </div>
        )}

        {/* CTA（対象ツール） */}
        {tool && affiliateUrl && (
          <section className="mt-12 bg-gray-900 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold">{tool.name}を実際に使ってみる</h2>
            <p className="mt-3 text-gray-300 leading-relaxed">
              {tool.has_free_plan
                ? "無料プランから始められます。登録は数分で完了します。"
                : `月額${tool.starting_price_jpy?.toLocaleString() ?? "—"}円〜。すべての機能を試してみましょう。`}
            </p>
            <div className="mt-5">
              <AffiliateButton
                href={affiliateUrl}
                label={ctaLabel}
                toolName={tool.name}
                size="lg"
                variant="secondary"
              />
            </div>
          </section>
        )}

        {/* FAQ */}
        <section id="faq" className="mt-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-green-500 pb-2">
            よくある質問（FAQ）
          </h2>
          <div className="mt-6 space-y-4">
            {guide.faqs.map((faq) => (
              <details key={faq.question} className="bg-white border border-gray-200 rounded-xl p-5 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-start justify-between gap-4">
                  <span>Q. {faq.question}</span>
                  <span className="text-green-500 text-xl group-open:rotate-45 transition-transform shrink-0">+</span>
                </summary>
                <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                  A. {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* 関連ガイド */}
        {relatedGuides.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">関連するガイド記事</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedGuides.map((related) => {
                const relatedTool = getToolBySlug(related.toolSlug);
                const relatedIconUrl = relatedTool ? getToolIconUrl(relatedTool) : null;
                return (
                  <Link
                    key={related.slug}
                    href={`/guide/${related.slug}`}
                    className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-green-300 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <ToolIcon
                        iconUrl={relatedIconUrl}
                        name={relatedTool?.name ?? related.slug}
                        size="sm"
                      />
                      <p className="text-xs font-semibold text-green-700 uppercase tracking-wider">
                        {relatedTool?.name ?? related.slug}
                      </p>
                    </div>
                    <h3 className="mt-3 font-semibold text-gray-900 leading-tight">
                      {related.title.replace(/【.*?】/g, "")}
                    </h3>
                    <span className="mt-3 inline-block text-green-600 text-sm">読む →</span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <p className="mt-8 text-xs text-gray-400 text-right">
          最終更新: {guide.lastUpdated}
        </p>
      </article>
    </>
  );
}
