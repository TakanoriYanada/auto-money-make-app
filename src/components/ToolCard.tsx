import Link from "next/link";
import type { Tool } from "@/types";
import { buildAffiliateUrl, getCtaLabel } from "@/lib/affiliate";
import StarRating from "./StarRating";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const affiliateUrl = buildAffiliateUrl(tool);
  const ctaLabel = getCtaLabel(tool);

  return (
    <div className="group bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4 hover:shadow-lg hover:border-green-300 transition-all duration-200">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-2xl font-bold text-gray-700 shrink-0 border border-gray-200 group-hover:border-green-400 transition-colors">
          {tool.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-gray-900 leading-tight">{tool.name}</h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-1">{tool.tagline}</p>
        </div>
      </div>

      <StarRating rating={tool.rating} size="sm" />

      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1">{tool.description}</p>

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
          className="flex-1 text-center text-sm py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all"
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
    </div>
  );
}
