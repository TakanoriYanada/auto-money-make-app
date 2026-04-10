import type { Tool, AffiliateProgram } from "@/types";

const AFFILIATE_IDS: Record<AffiliateProgram, string | undefined> = {
  a8: process.env.AFFILIATE_ID_A8,
  vc: process.env.AFFILIATE_ID_VC,
  moshimo: process.env.AFFILIATE_ID_MOSHIMO,
  direct: undefined,
  none: undefined,
};

export function buildAffiliateUrl(tool: Tool): string | null {
  // 直接指定のURLが存在する場合は優先
  if (tool.affiliate_url_override) {
    return tool.affiliate_url_override;
  }

  if (tool.affiliate_program === "none") {
    return null;
  }

  if (tool.affiliate_program === "direct") {
    return tool.website_url;
  }

  const affiliateId = AFFILIATE_IDS[tool.affiliate_program];

  // アフィリエイトIDが未設定の場合は公式サイトにフォールバック
  if (!affiliateId || !tool.affiliate_program_id) {
    return tool.website_url;
  }

  if (tool.affiliate_program === "a8") {
    return `https://px.a8.net/svt/ejp?a8mat=${affiliateId}_${tool.affiliate_program_id}`;
  }

  if (tool.affiliate_program === "moshimo") {
    return `https://af.moshimo.com/af/c/click?a_id=${affiliateId}&p_id=${tool.affiliate_program_id}`;
  }

  if (tool.affiliate_program === "vc") {
    return `https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=${affiliateId}&pid=${tool.affiliate_program_id}`;
  }

  return tool.website_url;
}

export function getCtaLabel(tool: Tool): string {
  if (tool.has_free_plan) {
    return "無料で試す";
  }
  return "公式サイトを見る";
}
