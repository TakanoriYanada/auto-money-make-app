import type { Tool, ComparisonFrontmatter, RoundupFrontmatter } from "@/types";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").trim().replace(/\/$/, "");

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
    // aggregateRating は実際のユーザーレビュー機能を実装後に再追加する
    // reviewCount: "1" は信頼性が低く、Googleからスパム判定されるリスクがある
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
  return `${tool.name}の評判・料金・機能を徹底解説【${year}年版】`;
}

export function getComparisonPageTitle(
  toolA: Tool,
  toolB: Tool
): string {
  const year = new Date().getFullYear();
  return `${toolA.name} vs ${toolB.name}【${year}年版】徹底比較｜どっちがおすすめ？`;
}

export function getRoundupPageTitle(category: string, count: number): string {
  const year = new Date().getFullYear();
  return `${category}おすすめAIツール${count}選【${year}年版】`;
}

export function getCanonicalUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

export function parseFaqFromMdx(content: string): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  const lines = content.split("\n");
  let inFaqSection = false;
  let currentQuestion = "";
  let currentAnswer = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.match(/^##\s+(?:よくある質問|FAQ)/)) {
      inFaqSection = true;
      continue;
    }

    if (inFaqSection) {
      if (line.match(/^###\s+(.+)/)) {
        if (currentQuestion && currentAnswer) {
          faqs.push({
            question: currentQuestion.trim(),
            answer: currentAnswer.trim().replace(/\*\*/g, ""),
          });
        }
        currentQuestion = line.replace(/^###\s+/, "");
        currentAnswer = "";
      } else if (line.match(/^##\s+[^#]/)) {
        break;
      } else if (currentQuestion && line.trim() && !line.startsWith("---")) {
        currentAnswer += line + " ";
      }
    }
  }

  if (currentQuestion && currentAnswer) {
    faqs.push({
      question: currentQuestion.trim(),
      answer: currentAnswer.trim().replace(/\*\*/g, ""),
    });
  }

  return faqs;
}

export function generateWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AIツール比較ナビ",
    url: SITE_URL,
    description: "ChatGPT・Claude・Gemini・Perplexity AIなど人気AIツールを料金・機能・使いやすさで徹底比較。初心者にもわかりやすく目的別のおすすめを紹介します。",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/tools?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AIツール比較ナビ",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: "AIツールの比較・レビュー情報を提供するメディア",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      url: `${SITE_URL}/contact`,
    },
  };
}
