/**
 * もしもアフィリエイト経由の楽天リンク生成ユーティリティ
 */

const MOSHIMO_A_ID = process.env.AFFILIATE_ID_MOSHIMO ?? "";

export interface BookData {
  title: string;
  author: string;
  description: string;
  /** 楽天市場の商品ページURL（https://item.rakuten.co.jp/... または https://books.rakuten.co.jp/...） */
  rakutenUrl: string;
  /** Amazon商品ページURL（もしもアフィリエイト経由で使う場合） */
  amazonUrl?: string;
  /** おすすめ度（1〜5） */
  rating?: number;
  /** 価格（表示用・税込円） */
  priceJpy?: number;
}

/**
 * もしもアフィリエイト経由の楽天アフィリエイトURLを生成
 */
export function buildRakutenAffiliateUrl(itemUrl: string): string {
  if (!MOSHIMO_A_ID) return itemUrl;
  const encodedUrl = encodeURIComponent(itemUrl);
  return `https://af.moshimo.com/af/c/click?a_id=${MOSHIMO_A_ID}&p_id=54&pc_id=54&pl_id=621&url=${encodedUrl}`;
}

/**
 * もしもアフィリエイトのインプレッションピクセルURL
 */
export function getRakutenImpressionPixelUrl(): string | null {
  if (!MOSHIMO_A_ID) return null;
  return `https://i.moshimo.com/af/i/impression?a_id=${MOSHIMO_A_ID}&p_id=54&pc_id=54&pl_id=621`;
}
