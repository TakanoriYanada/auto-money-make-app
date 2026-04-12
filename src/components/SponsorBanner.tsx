import { getActiveSponsors, buildSponsorUrl, getSponsorImpressionPixelUrl, type Sponsor } from "@/lib/sponsors";

interface SponsorBannerProps {
  variant?: "card" | "inline" | "hero";
  limit?: number;
  /**
   * seed文字列（ページslug等）を渡すと、そのページで表示するスポンサーが
   * 決定論的に選ばれる。リロードしても同じスポンサーが出るがページごとには変わる。
   */
  seed?: string;
}

/** 文字列から簡易ハッシュ値を生成（スポンサー決定論的ローテーション用） */
function hashString(s: string): number {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = (hash << 5) - hash + s.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * スポンサー広告表示コンポーネント
 *
 * variant:
 * - card: サイドバー・ホームでのカード形式（目立つ）
 * - inline: 記事内のインライン（目立ちすぎない）
 * - hero: トップページのヒーロー下の大きめ枠
 *
 * seedを渡すとページごとに表示スポンサーをローテーションできる。
 */
export default function SponsorBanner({ variant = "card", limit = 1, seed }: SponsorBannerProps) {
  const allSponsors = getActiveSponsors();

  let sponsors: Sponsor[];
  if (seed && allSponsors.length > 0) {
    // seedから決定論的にスポンサーを選ぶ（ローテーション）
    const offset = hashString(seed) % allSponsors.length;
    sponsors = [];
    for (let i = 0; i < limit && i < allSponsors.length; i++) {
      sponsors.push(allSponsors[(offset + i) % allSponsors.length]);
    }
  } else {
    sponsors = allSponsors.slice(0, limit);
  }

  if (sponsors.length === 0) return null;

  return (
    <div className="space-y-4">
      {sponsors.map((sponsor) => {
        const url = buildSponsorUrl(sponsor);
        const pixel = getSponsorImpressionPixelUrl(sponsor);

        if (variant === "hero") {
          return (
            <div
              key={sponsor.id}
              className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
                      Sponsored
                    </span>
                    {sponsor.badge && (
                      <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded">
                        {sponsor.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                    {sponsor.name}
                  </h3>
                  <p className="mt-1 text-blue-100 font-medium">{sponsor.tagline}</p>
                  <p className="mt-3 text-sm text-blue-50/90 leading-relaxed">{sponsor.description}</p>
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener sponsored nofollow"
                  className="shrink-0 bg-white hover:bg-yellow-50 text-blue-700 font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {sponsor.ctaLabel}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              {pixel && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={pixel} alt="" width={1} height={1} className="absolute -top-px -left-px" aria-hidden />
              )}
            </div>
          );
        }

        if (variant === "inline") {
          return (
            <div
              key={sponsor.id}
              className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sponsored
                  </span>
                  {sponsor.badge && (
                    <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded">
                      {sponsor.badge}
                    </span>
                  )}
                </div>
                <p className="font-semibold text-gray-900 text-sm">{sponsor.name}</p>
                <p className="text-xs text-gray-600 mt-0.5">{sponsor.tagline}</p>
              </div>
              <a
                href={url}
                target="_blank"
                rel="noopener sponsored nofollow"
                className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors whitespace-nowrap"
              >
                詳細
              </a>
              {pixel && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={pixel} alt="" width={1} height={1} className="hidden" aria-hidden />
              )}
            </div>
          );
        }

        // default: card variant
        return (
          <div
            key={sponsor.id}
            className="bg-white rounded-xl border-2 border-blue-200 p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                Sponsored
              </span>
              {sponsor.badge && (
                <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded">
                  {sponsor.badge}
                </span>
              )}
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 leading-tight">{sponsor.name}</h3>
              <p className="text-sm text-blue-600 font-medium mt-1">{sponsor.tagline}</p>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{sponsor.description}</p>
            <a
              href={url}
              target="_blank"
              rel="noopener sponsored nofollow"
              className="mt-2 text-center text-sm py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
            >
              {sponsor.ctaLabel}
            </a>
            {pixel && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={pixel} alt="" width={1} height={1} className="hidden" aria-hidden />
            )}
          </div>
        );
      })}
    </div>
  );
}
