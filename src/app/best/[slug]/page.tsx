import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { getToolBySlug } from "@/lib/tools";
import { buildAffiliateUrl, getCtaLabel } from "@/lib/affiliate";
import {
  generateBreadcrumbJsonLd,
  getCanonicalUrl,
  generateRoundupItemListJsonLd,
  getRoundupPageTitle,
} from "@/lib/seo";
import type { RoundupFrontmatter } from "@/types";
import AffiliateButton from "@/components/AffiliateButton";
import StarRating from "@/components/StarRating";
import Breadcrumb from "@/components/Breadcrumb";

const SITE_NAME = "AIツール比較ナビ";

export const revalidate = 604800;

function getRoundupSlugs(): string[] {
  const dir = path.join(process.cwd(), "src/data/roundups");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(".mdx", ""));
}

function getRoundup(slug: string): { frontmatter: RoundupFrontmatter; content: string } | null {
  const filePath = path.join(process.cwd(), "src/data/roundups", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;

  const yamlLines = match[1].split("\n");
  const frontmatter: Record<string, unknown> = {};
  for (const line of yamlLines) {
    const colonIdx = line.indexOf(": ");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 2).replace(/^["']|["']$/g, "");
    if (key === "tool_slugs") {
      frontmatter[key] = value.replace(/[\[\]]/g, "").split(",").map((s) => s.trim());
    } else {
      frontmatter[key] = value;
    }
  }

  return { frontmatter: frontmatter as unknown as RoundupFrontmatter, content: match[2] };
}

export async function generateStaticParams() {
  return getRoundupSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = getRoundup(slug);
  if (!data) return {};

  const { frontmatter } = data;
  const tools = frontmatter.tool_slugs
    .map((s) => getToolBySlug(s))
    .filter((t): t is NonNullable<typeof t> => t !== null);

  const title = getRoundupPageTitle(frontmatter.category, tools.length);
  const description = frontmatter.description;
  const canonicalUrl = getCanonicalUrl(`/best/${slug}`);

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

export default async function BestPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getRoundup(slug);
  if (!data) notFound();

  const { frontmatter } = data;
  const tools = frontmatter.tool_slugs
    .map((s) => getToolBySlug(s))
    .filter((t): t is NonNullable<typeof t> => t !== null);

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "ホーム", url: "/" },
    { name: "おすすめ記事", url: "/best" },
    { name: frontmatter.title, url: `/best/${slug}` },
  ]);

  const itemListJsonLd = generateRoundupItemListJsonLd(tools, frontmatter);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb items={[
          { name: "ホーム", href: "/" },
          { name: "おすすめ記事" },
          { name: frontmatter.title },
        ]} />

        <h1 className="mt-6 text-2xl md:text-3xl font-bold text-gray-900 leading-tight">{frontmatter.title}</h1>
        <p className="mt-2 text-gray-600">{frontmatter.description}</p>
        <p className="mt-1 text-sm text-gray-400">対象: {frontmatter.target_user}</p>

        <div className="mt-8 space-y-6">
          {tools.map((tool, i) => {
            const affiliateUrl = buildAffiliateUrl(tool);
            return (
              <div key={tool.slug} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-700 shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900">{tool.name}</h2>
                    <StarRating rating={tool.rating} size="sm" className="mt-1" />
                    <p className="mt-2 text-sm text-gray-600">{tool.description.slice(0, 120)}...</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {tool.pros.slice(0, 3).map((p) => (
                        <span key={p} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">{p}</span>
                      ))}
                    </div>
                    {affiliateUrl && (
                      <div className="mt-4 flex gap-3">
                        <AffiliateButton href={affiliateUrl} label={getCtaLabel(tool)} toolName={tool.name} size="sm" />
                        <a href={`/tools/${tool.slug}`} className="text-sm text-gray-500 hover:text-gray-700 underline self-center">
                          詳細レビュー
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 関連リンク */}
        <section className="mt-10 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">関連ページ</h2>
          <ul className="space-y-2">
            {tools.slice(0, 3).map((tool) => (
              <li key={tool.slug}>
                <Link href={`/tools/${tool.slug}`} className="text-green-600 hover:text-green-700 text-sm">
                  → {tool.name}の詳細レビュー
                </Link>
              </li>
            ))}
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
