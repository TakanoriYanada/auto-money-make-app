import Link from "next/link";
import type { Tool } from "@/types";
import { buildAffiliateUrl, getCtaLabel, getImpressionPixelUrl } from "@/lib/affiliate";
import { getToolIconUrl } from "@/lib/tools";
import StarRating from "./StarRating";
import ToolIcon from "./ToolIcon";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const affiliateUrl = buildAffiliateUrl(tool);
  const ctaLabel = getCtaLabel(tool);
  const impressionPixel = getImpressionPixelUrl(tool);
  const iconUrl = getToolIconUrl(tool);

  return (
    <div className="group bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4 hover:shadow-lg hover:border-green-300 transition-all duration-200">
      <div className="flex items-start gap-4">
        <ToolIcon iconUrl={iconUrl} name={tool.name} />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-gray-900 leading-tight">{tool.name}</h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-1">{tool.tagline}</p>
        </div>
      </div>

      <StarRating rating={tool.rating} size="sm" />

      <p className="text-base text-gray-600 leading-relaxed line-clamp-2 flex-1">{tool.description}</p>

      <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
        {tool.has_free_plan ? (
          <span className="inline-flex items-center gap-1.5 text-green-600 font-semibold">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            無料プランあり
          </span>
        ) : (
          <span className="text-gray-600">
            月額<span className="font-semibold text-gray-900">{tool.starting_price_jpy?.toLocaleString() ?? "—"}円</span>〜
          </span>
        )}
      </div>

      <div className="flex gap-3 mt-2">
        <Link
          href={`/tools/${tool.slug}`}
          className="flex-1 text-center text-sm py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
        >
          詳細を見る
        </Link>
        {affiliateUrl && (
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener sponsored"
            className="flex-1 text-center text-sm py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 hover:shadow-md transition-all"
          >
            {ctaLabel}
          </a>
        )}
      </div>

      {impressionPixel && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={impressionPixel} alt="" width={1} height={1} className="hidden" />
      )}
    </div>
  );
}
