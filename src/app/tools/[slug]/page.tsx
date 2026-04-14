import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllToolSlugs, getToolBySlug, getRelatedTools, getToolIconUrl } from "@/lib/tools";
import { buildAffiliateUrl, getCtaLabel, getImpressionPixelUrl } from "@/lib/affiliate";
import { getAllToolGuides } from "@/lib/guides";
import { generateToolJsonLd, generateBreadcrumbJsonLd, getToolPageTitle, getCanonicalUrl } from "@/lib/seo";
import AffiliateButton from "@/components/AffiliateButton";
import StarRating from "@/components/StarRating";
import Breadcrumb from "@/components/Breadcrumb";
import ToolCard from "@/components/ToolCard";
import SponsorBanner from "@/components/SponsorBanner";
import ToolIcon from "@/components/ToolIcon";

const SITE_NAME = "AIツール比較ナビ";

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllToolSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  const title = getToolPageTitle(tool);
  const description = tool.description.length > 155
    ? tool.description.slice(0, 155).replace(/。[^。]*$/, "。") || tool.description.slice(0, 155) + "…"
    : tool.description;
  const canonicalUrl = getCanonicalUrl(`/tools/${slug}`);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: SITE_NAME,
      locale: "ja_JP",
      type: "article",
      url: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const affiliateUrl = buildAffiliateUrl(tool);
  const ctaLabel = getCtaLabel(tool);
  const impressionPixel = getImpressionPixelUrl(tool);
  const relatedTools = getRelatedTools(tool, 3);
  const toolGuide = getAllToolGuides().find((g) => g.toolSlug === tool.slug) ?? null;
  const iconUrl = getToolIconUrl(tool);

  const toolJsonLd = generateToolJsonLd(tool);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "ホーム", url: "/" },
    { name: "ツール一覧", url: "/tools" },
    { name: tool.name, url: `/tools/${tool.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {impressionPixel && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={impressionPixel} alt="" width={1} height={1} className="hidden" />
      )}

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb items={[
          { name: "ホーム", href: "/" },
          { name: "ツール一覧", href: "/tools" },
          { name: tool.name },
        ]} />

        {/* ヘッダー */}
        <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex-1">
              <div className="flex items-start gap-4">
                <ToolIcon iconUrl={iconUrl} name={tool.name} size="xl" />
                <div className="flex-1 min-w-0">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{tool.name}</h1>
                  <p className="text-gray-500 mt-1">{tool.tagline}</p>
                </div>
              </div>
              <StarRating rating={tool.rating} size="lg" className="mt-4" />
              <p className="mt-4 text-gray-700 leading-relaxed">{tool.description}</p>
            </div>
            <div className="flex flex-col gap-3 md:min-w-48">
              {affiliateUrl ? (
                <>
                  <AffiliateButton href={affiliateUrl} label={ctaLabel} toolName={tool.name} size="lg" />
                  <a href={tool.website_url} target="_blank" rel="noopener noreferrer"
                    className="text-center text-sm text-gray-500 hover:text-gray-700 underline">
                    公式サイト
                  </a>
                </>
              ) : (
                <a
                  href={tool.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center min-h-[56px] px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors text-center"
                >
                  公式サイトを見る
                </a>
              )}
            </div>
          </div>
        </div>

        {/* 料金 */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">料金プラン</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tool.pricing.map((tier) => (
              <div key={tier.name} className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="font-semibold text-gray-900">{tier.name}</div>
                <div className="mt-1 text-2xl font-bold text-green-600">
                  {tier.billing === "free" ? "無料" :
                    tier.price_jpy ? `¥${tier.price_jpy.toLocaleString()}/月` :
                    tier.price_usd ? `$${tier.price_usd}/月` : "要問合せ"}
                </div>
                <ul className="mt-3 space-y-1">
                  {tier.features.map((f) => (
                    <li key={f} className="text-sm text-gray-600 flex items-start gap-1">
                      <span className="text-green-500 mt-0.5">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* メリット・デメリット */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-green-50 rounded-xl p-6">
            <h2 className="text-lg font-bold text-green-800 mb-3">メリット</h2>
            <ul className="space-y-2">
              {tool.pros.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-green-900">
                  <span className="text-green-500 mt-0.5 shrink-0">✓</span> {p}
                </li>
              ))}
            </ul>
          </section>
          <section className="bg-red-50 rounded-xl p-6">
            <h2 className="text-lg font-bold text-red-800 mb-3">デメリット</h2>
            <ul className="space-y-2">
              {tool.cons.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm text-red-900">
                  <span className="text-red-400 mt-0.5 shrink-0">✕</span> {c}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* 対応する使い方ガイドへの誘導 */}
        {toolGuide && (
          <Link
            href={`/guide/${toolGuide.slug}`}
            className="mt-10 block bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-5 hover:border-green-400 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white text-xl shrink-0">
                📘
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-green-700 uppercase tracking-wider">
                  使い方ガイド
                </p>
                <p className="font-bold text-gray-900 mt-0.5 leading-tight">
                  {tool.name}の使い方完全ガイドを読む
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {toolGuide.useCases.length}のプロンプト例と使いこなしのコツを紹介
                </p>
              </div>
              <svg
                className="w-5 h-5 text-green-600 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        )}

        {/* スポンサー枠: インライン（ツール毎にローテーション） */}
        <div className="mt-10">
          <SponsorBanner variant="inline" seed={slug} />
        </div>

        {/* CTA */}
        <div className="mt-10 bg-gray-900 rounded-2xl p-8 text-center text-white">
          <p className="text-lg font-semibold">{tool.name}を試してみる</p>
          <p className="text-gray-400 text-sm mt-1">
            {tool.has_free_plan ? "無料プランから始められます" : `月額${tool.starting_price_jpy?.toLocaleString() ?? "—"}円〜`}
          </p>
          {affiliateUrl ? (
            <AffiliateButton href={affiliateUrl} label={ctaLabel} toolName={tool.name} size="lg" variant="secondary" className="mt-4" />
          ) : (
            <a
              href={tool.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-[56px] px-8 py-3 mt-4 bg-white hover:bg-gray-100 text-gray-900 font-semibold rounded-lg transition-colors"
            >
              公式サイトを見る
            </a>
          )}
        </div>

        {/* 関連ツール */}
        {relatedTools.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">関連するAIツール</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedTools.map((t) => (
                <ToolCard key={t.slug} tool={t} />
              ))}
            </div>
            <div className="text-center mt-6">
              <Link href="/tools" className="text-green-600 hover:text-green-700 font-medium text-sm">
                すべてのツールを見る →
              </Link>
            </div>
          </section>
        )}

        <p className="mt-8 text-xs text-gray-400 text-right">最終更新: {tool.last_updated}</p>
      </div>
    </>
  );
}
