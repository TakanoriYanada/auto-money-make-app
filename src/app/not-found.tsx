import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="bg-white border border-gray-200 rounded-2xl p-10">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="mt-4 text-xl font-semibold text-gray-700">ページが見つかりません</p>
        <p className="mt-2 text-gray-600 leading-relaxed">
          お探しのページは移動または削除された可能性があります。
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
          >
            ホームに戻る
          </Link>
          <Link
            href="/tools"
            className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg transition-colors"
          >
            AIツール一覧を見る
          </Link>
        </div>
      </div>
    </div>
  );
}
