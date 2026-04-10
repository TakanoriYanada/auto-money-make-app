import type { Tool, ComparisonFrontmatter, RoundupFrontmatter } from "@/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const SITE_NAME = "AIツール比較ナビ";

export function generateToolJsonLd(tool: Tool) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    url: tool.website_url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: tool.has_free_plan
      ? { "@type": "Offer", price: "0", priceCurrency: "JPY" }
      : tool.pricing[0]
      ? {
          "@type": "Offer",
          price: String(tool.pricing[0].price_jpy ?? ""),
          priceCurrency: "JPY",
        }
      : undefined,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(tool.rating),
      bestRating: "5",
      worstRating: "1",
      reviewCount: "1",
    },
  };
}

export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateFaqJsonLd(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateComparisonItemListJsonLd(
  tools: Tool[],
  comparison: ComparisonFrontmatter
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: comparison.title,
    description: comparison.description,
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: `${SITE_URL}/tools/${tool.slug}`,
    })),
  };
}

export function generateRoundupItemListJsonLd(
  tools: Tool[],
  roundup: RoundupFrontmatter
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: roundup.title,
    description: roundup.description,
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: `${SITE_URL}/tools/${tool.slug}`,
    })),
  };
}

export function getToolPageTitle(tool: Tool): string {
  const year = new Date().getFullYear();
  return `${tool.name}の評判・料金・機能を徹底解説【${year}年版】| ${SITE_NAME}`;
}

export function getComparisonPageTitle(
  toolA: Tool,
  toolB: Tool
): string {
  const year = new Date().getFullYear();
  return `${toolA.name} vs ${toolB.name}【${year}年版】徹底比較｜どっちがおすすめ？| ${SITE_NAME}`;
}
