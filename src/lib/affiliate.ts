import type { Tool, AffiliateProgram } from "@/types";

const AFFILIATE_IDS: Record<AffiliateProgram, string | undefined> = {
  a8: process.env.AFFILIATE_ID_A8,
  vc: process.env.AFFILIATE_ID_VC,
  moshimo: process.env.AFFILIATE_ID_MOSHIMO,
  direct: undefined,
  none: undefined,
};

/**
 * アフィリエイトクリックURLを構築する
 *
 * A8.net: `affiliate_program_id` にプログラムごとに発行される完全なa8matトークン
 *         （例: `4B1ILN+JNBQQ+2PEO+1I2SVM`）をそのまま格納する
 * もしもアフィリエイト: `a_id=会員ID` と `p_id=プログラムID`
 * バリューコマース: `sid=会員ID` と `pid=プログラムID`
 */
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

  // a8matトークンがそのまま格納されているので、会員IDは不要
  if (tool.affiliate_program === "a8") {
    if (!tool.affiliate_program_id) return tool.website_url;
    return `https://px.a8.net/svt/ejp?a8mat=${tool.affiliate_program_id}`;
  }

  const affiliateId = AFFILIATE_IDS[tool.affiliate_program];

  // アフィリエイトIDが未設定の場合は公式サイトにフォールバック
  if (!affiliateId || !tool.affiliate_program_id) {
    return tool.website_url;
  }

  if (tool.affiliate_program === "moshimo") {
    return `https://af.moshimo.com/af/c/click?a_id=${affiliateId}&p_id=${tool.affiliate_program_id}`;
  }

  if (tool.affiliate_program === "vc") {
    return `https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=${affiliateId}&pid=${tool.affiliate_program_id}`;
  }

  return tool.website_url;
}

/**
 * A8.net のインプレッション計測ピクセル画像URLを取得する。
 * 対応プログラム以外は null。
 */
export function getImpressionPixelUrl(tool: Tool): string | null {
  if (tool.affiliate_program === "a8" && tool.affiliate_program_id) {
    return `https://www15.a8.net/0.gif?a8mat=${tool.affiliate_program_id}`;
  }
  return null;
}

export function getCtaLabel(tool: Tool): string {
  if (tool.has_free_plan) {
    return "無料で試す";
  }
  return "公式サイトを見る";
}
