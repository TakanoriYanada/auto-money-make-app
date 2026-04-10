export interface PricingTier {
  name: string;
  price_jpy?: number;
  price_usd?: number;
  billing: "monthly" | "annual" | "one_time" | "free";
  features: string[];
}

export type AffiliateProgram = "a8" | "vc" | "moshimo" | "direct" | "none";
export type CommissionType = "recurring" | "one_time" | "flat" | "none";
export type ToolStatus = "active" | "discontinued";

export interface Tool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  logo_url: string;
  website_url: string;

  // アフィリエイト情報
  affiliate_program: AffiliateProgram;
  affiliate_program_id: string;
  affiliate_url_override?: string;
  commission_type: CommissionType;
  commission_rate: string;

  // カテゴリ・タグ
  categories: string[];
  use_cases: string[];
  tags: string[];

  // レビュー情報
  rating: number;
  pros: string[];
  cons: string[];

  // 料金
  pricing: PricingTier[];
  has_free_plan: boolean;
  starting_price_jpy?: number;

  // メタ情報
  last_updated: string;
  featured: boolean;
  status: ToolStatus;
}

export interface ComparisonFrontmatter {
  title: string;
  description: string;
  tool_a: string;
  tool_b: string;
  slug: string;
  last_updated: string;
  featured: boolean;
}

export interface RoundupFrontmatter {
  title: string;
  description: string;
  category: string;
  target_user: string;
  slug: string;
  tool_slugs: string[];
  last_updated: string;
}

export interface SiteMetadata {
  title: string;
  description: string;
  url: string;
  ogImage?: string;
}
