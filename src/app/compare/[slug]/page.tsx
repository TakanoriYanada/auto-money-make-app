import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { getToolBySlug, getToolIconUrl } from "@/lib/tools";
import { buildAffiliateUrl, getCtaLabel } from "@/lib/affiliate";
import { getRelatedComparisons, getComparisonBySlug } from "@/lib/comparisons";
import {
  generateBreadcrumbJsonLd,
  getComparisonPageTitle,
  getCanonicalUrl,
  generateComparisonItemListJsonLd,
  generateFaqJsonLd,
  parseFaqFromMdx,
} from "@/lib/seo";
import type { ComparisonFrontmatter } from "@/types";
import AffiliateButton from "@/components/AffiliateButton";
import StarRating from "@/components/StarRating";
import Breadcrumb from "@/components/Breadcrumb";
import SponsorBanner from "@/components/SponsorBanner";
import FaqAccordion from "@/components/FaqAccordion";
import ToolIcon from "@/components/ToolIcon";

const SITE_NAME = "AIツール比較ナビ";

export const revalidate = 604800;

function getComparisonSlugs(): string[] {
  const dir = path.join(process.cwd(), "src/data/comparisons");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(".mdx", ""));
}

function getComparison(slug: string): { frontmatter: ComparisonFrontmatter; content: string } | null {
  const filePath = path.join(process.cwd(), "src/data/comparisons", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;

  const yamlLines = match[1].split("\n");
  const frontmatter: Record<string, unknown> = {};
  for (const line of yamlLines) {
    const [key, ...rest] = line.split(": ");
    if (key && rest.length) {
      const value = rest.join(": ").replace(/^["']|["']$/g, "");
      frontmatter[key.trim()] = value === "true" ? true : value === "false" ? false : value;
    }
  }

  return { frontmatter: frontmatter as unknown as ComparisonFrontmatter, content: match[2] };
}

export async function generateStaticParams() {
  return getComparisonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = getComparison(slug);
  if (!data) return {};

  const { frontmatter } = data;
  const toolA = getToolBySlug(frontmatter.tool_a);
  const toolB = getToolBySlug(frontmatter.tool_b);
  if (!toolA || !toolB) return {};

  const title = getComparisonPageTitle(toolA, toolB);
  const description = frontmatter.description;
  const canonicalUrl = getCanonicalUrl(`/compare/${slug}`);

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

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getComparison(slug);
  if (!data) notFound();

  const { frontmatter, content } = data;
  const toolA = getToolBySlug(frontmatter.tool_a);
  const toolB = getToolBySlug(frontmatter.tool_b);
  if (!toolA || !toolB) notFound();

  const urlA = buildAffiliateUrl(toolA);
  const urlB = buildAffiliateUrl(toolB);

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "ホーム", url: "/" },
    { name: "比較記事", url: "/compare" },
    { name: frontmatter.title, url: `/compare/${slug}` },
  ]);

  const itemListJsonLd = generateComparisonItemListJsonLd([toolA, toolB], frontmatter);

  const faqs = parseFaqFromMdx(content);
  const faqJsonLd = faqs.length > 0 ? generateFaqJsonLd(faqs) : null;

  const year = new Date().getFullYear();
  const h1Text = `${toolA.name} vs ${toolB.name}【${year}年版】徹底比較｜どっちがおすすめ？`;

  const currentComparison = getComparisonBySlug(slug);
  const relatedComparisons = currentComparison ? getRelatedComparisons(currentComparison, 3) : [];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb items={[
          { name: "ホーム", href: "/" },
          { name: "比較記事", href: "/compare" },
          { name: `${toolA.name} vs ${toolB.name}` },
        ]} />

        <h1 className="mt-6 text-3xl md:text-5xl font-bold text-gray-900 leading-tight">{h1Text}</h1>
        <p className="mt-2 text-sm text-gray-400">最終更新: {frontmatter.last_updated}</p>

        {/* 2ツール並列比較ヘッダー */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[toolA, toolB].map((tool) => {
            const url = tool === toolA ? urlA : urlB;
            return (
              <div key={tool.slug} className="bg-white border border-gray-200 rounded-xl p-5 text-center">
                <h2 className="text-xl font-bold text-gray-900">{tool.name}</h2>
                <StarRating rating={tool.rating} size="md" className="mt-2 justify-center" />
                <p className="text-sm text-gray-500 mt-2">{tool.tagline}</p>
                {url && (
                  <AffiliateButton href={url} label={getCtaLabel(tool)} toolName={tool.name} size="md" className="mt-4 w-full justify-center" />
                )}
              </div>
            );
          })}
        </div>

        {/* 比較表 */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">スペック比較</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 rounded-xl text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left text-gray-600">項目</th>
                  <th className="py-3 px-4 text-center text-gray-900 font-semibold">{toolA.name}</th>
                  <th className="py-3 px-4 text-center text-gray-900 font-semibold">{toolB.name}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["評価", toolA.rating.toFixed(1) + " / 5.0", toolB.rating.toFixed(1) + " / 5.0"],
                  ["無料プラン", toolA.has_free_plan ? "あり" : "なし", toolB.has_free_plan ? "あり" : "なし"],
                  ["最低月額", toolA.starting_price_jpy ? `¥${toolA.starting_price_jpy.toLocaleString()}` : "無料", toolB.starting_price_jpy ? `¥${toolB.starting_price_jpy.toLocaleString()}` : "無料"],
                ].map(([label, a, b]) => (
                  <tr key={label} className="border-t border-gray-100 odd:bg-white even:bg-gray-50">
                    <td className="py-3 px-4 text-gray-600">{label}</td>
                    <td className="py-3 px-4 text-center">{a}</td>
                    <td className="py-3 px-4 text-center">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* スポンサー枠: インライン（記事ごとにローテーション） */}
        <div className="mt-10">
          <SponsorBanner variant="inline" seed={slug} />
        </div>

        {/* 各ツールのメリット */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[toolA, toolB].map((tool) => (
            <section key={tool.slug} className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">{tool.name}のメリット</h2>
              <ul className="space-y-2">
                {tool.pros.slice(0, 5).map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-green-500 shrink-0">✓</span> {p}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* 結論 */}
        <section className="mt-10 bg-gray-900 rounded-2xl p-8 text-white">
          <h2 className="text-xl font-bold mb-4">結論：どちらを選ぶべきか？</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[toolA, toolB].map((tool) => {
              const url = tool === toolA ? urlA : urlB;
              return (
                <div key={tool.slug} className="bg-white/10 rounded-xl p-5">
                  <p className="font-semibold text-green-400">{tool.name}がおすすめな人</p>
                  <ul className="mt-2 space-y-1">
                    {tool.use_cases.slice(0, 3).map((u) => (
                      <li key={u} className="text-sm text-gray-300">・{u}</li>
                    ))}
                  </ul>
                  {url && (
                    <AffiliateButton href={url} label={getCtaLabel(tool)} toolName={tool.name} size="sm" className="mt-4" />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 両ツールCTAボタン */}
        <section className="mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[toolA, toolB].map((tool) => {
              const url = tool === toolA ? urlA : urlB;
              return (
                <div key={tool.slug} className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{tool.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{tool.tagline}</p>
                  {url ? (
                    <AffiliateButton href={url} label={getCtaLabel(tool)} toolName={tool.name} size="lg" className="w-full justify-center" />
                  ) : (
                    <a
                      href={tool.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full min-h-[56px] px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      公式サイトを見る →
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        {faqs.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">よくある質問（FAQ）</h2>
            <FaqAccordion items={faqs} />
          </section>
        )}

        {/* 関連する比較記事 */}
        {relatedComparisons.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">関連する比較記事</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedComparisons.map((comp) => {
                const compToolA = getToolBySlug(comp.tool_a);
                const compToolB = getToolBySlug(comp.tool_b);
                if (!compToolA || !compToolB) return null;

                const iconUrlA = getToolIconUrl(compToolA);
                const iconUrlB = getToolIconUrl(compToolB);

                return (
                  <Link
                    key={comp.slug}
                    href={`/compare/${comp.slug}`}
                    className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-green-300 transition-all"
                  >
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <ToolIcon iconUrl={iconUrlA} name={compToolA.name} size="sm" />
                      <span className="text-xs font-bold text-gray-400">VS</span>
                      <ToolIcon iconUrl={iconUrlB} name={compToolB.name} size="sm" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 text-center leading-snug">
                      {compToolA.name} vs {compToolB.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-2 text-center line-clamp-2">
                      {comp.description}
                    </p>
                    <div className="mt-3 text-xs text-green-600 font-medium text-center group-hover:underline">
                      比較を読む →
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="text-center mt-6">
              <Link href="/compare" className="text-green-600 hover:text-green-700 font-medium text-sm">
                すべての比較記事を見る →
              </Link>
            </div>
          </section>
        )}

        {/* 関連リンク */}
        <section className="mt-10 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">関連ページ</h2>
          <ul className="space-y-2">
            <li>
              <Link href={`/tools/${toolA.slug}`} className="text-green-600 hover:text-green-700 text-sm">
                → {toolA.name}の詳細レビュー
              </Link>
            </li>
            <li>
              <Link href={`/tools/${toolB.slug}`} className="text-green-600 hover:text-green-700 text-sm">
                → {toolB.name}の詳細レビュー
              </Link>
            </li>
            <li>
              <Link href="/tools" className="text-green-600 hover:text-green-700 text-sm">
                → すべてのAIツール一覧
              </Link>
            </li>
          </ul>
        </section>

        <p className="mt-8 text-xs text-gray-400 text-right">最終更新: {frontmatter.last_updated}</p>
      </div>
    </>
  );
}
