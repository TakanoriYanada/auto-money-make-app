import type { BookData } from "@/lib/rakuten";
import { buildRakutenAffiliateUrl, getRakutenImpressionPixelUrl } from "@/lib/rakuten";

interface BookRecommendationProps {
  books: BookData[];
  sectionTitle?: string;
}

export default function BookRecommendation({
  books,
  sectionTitle = "おすすめ書籍",
}: BookRecommendationProps) {
  if (books.length === 0) return null;

  const pixelUrl = getRakutenImpressionPixelUrl();

  return (
    <section className="mt-12 scroll-mt-20">
      <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-green-500 pb-2">
        📚 {sectionTitle}
      </h2>
      <p className="mt-3 text-sm text-gray-600">
        このテーマを深く学びたい方におすすめの書籍を厳選しました。
      </p>

      <div className="mt-6 space-y-5">
        {books.map((book, i) => {
          const affiliateUrl = buildRakutenAffiliateUrl(book.rakutenUrl);
          return (
            <div
              key={book.title}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-700 shrink-0 text-sm">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">{book.author}</p>

                  {book.rating && (
                    <span className="inline-flex items-center gap-0.5 text-yellow-400 text-sm mt-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <span key={j} className={j < book.rating! ? "text-yellow-400" : "text-gray-300"}>
                          ★
                        </span>
                      ))}
                    </span>
                  )}

                  <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                    {book.description}
                  </p>

                  {book.priceJpy && (
                    <p className="mt-2 text-sm text-gray-500">
                      価格: <span className="font-semibold text-gray-900">¥{book.priceJpy.toLocaleString()}</span>（税込）
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      href={affiliateUrl}
                      target="_blank"
                      rel="noopener sponsored nofollow"
                      className="inline-flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      楽天で見る
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    {book.amazonUrl && (
                      <a
                        href={book.amazonUrl}
                        target="_blank"
                        rel="noopener sponsored nofollow"
                        className="inline-flex items-center gap-1.5 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
                      >
                        Amazonで見る
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-gray-400">
        ※ 上記リンクから購入いただくと、当サイトに紹介料が発生します。
      </p>

      {pixelUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={pixelUrl} alt="" width={1} height={1} className="hidden" aria-hidden />
      )}
    </section>
  );
}
