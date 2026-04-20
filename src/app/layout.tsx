import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const SITE_NAME = "AIツール比較ナビ";
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://auto-money-make-app.vercel.app").trim().replace(/\/$/, "");

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — AIツールを徹底比較`,
    template: `%s | ${SITE_NAME}`,
  },
  description: "ChatGPT・Claude・Geminiなど人気AIツールを料金・機能・使いやすさで徹底比較。あなたに最適なAIツールが見つかります。",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    siteName: SITE_NAME,
    locale: "ja_JP",
    type: "website",
  },
  robots: { index: true, follow: true },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID?.trim();
  const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();

  return (
    <html lang="ja" className={`${notoSansJP.variable}`}>
      <head>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="font-bold text-lg text-green-600 hover:text-green-700">
              {SITE_NAME}
            </Link>
            <nav className="flex items-center gap-3 md:gap-5 text-xs sm:text-sm text-gray-600">
              <Link href="/tools" className="hover:text-green-600 transition-colors">ツール一覧</Link>
              <Link href="/compare" className="hover:text-green-600 transition-colors">比較記事</Link>
              <Link href="/guide" className="hover:text-green-600 transition-colors">ガイド</Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-gray-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="font-bold text-gray-900 text-base">{SITE_NAME}</p>
                <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                  ChatGPT・Claude・Geminiなど人気AIツールを料金・機能・使いやすさで徹底比較。
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-700 mb-3">コンテンツ</p>
                <ul className="space-y-2 text-xs">
                  <li><Link href="/tools" className="hover:text-green-600 transition-colors">ツール一覧</Link></li>
                  <li><Link href="/compare" className="hover:text-green-600 transition-colors">比較記事</Link></li>
                  <li><Link href="/guide" className="hover:text-green-600 transition-colors">ガイド一覧</Link></li>
                  <li><Link href="/guide/ai-blog-start" className="hover:text-green-600 transition-colors">AIブログの始め方</Link></li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-gray-700 mb-3">サイト情報</p>
                <ul className="space-y-2 text-xs">
                  <li><Link href="/about" className="hover:text-green-600 transition-colors">運営者情報</Link></li>
                  <li><Link href="/privacy" className="hover:text-green-600 transition-colors">プライバシーポリシー</Link></li>
                  <li><Link href="/disclaimer" className="hover:text-green-600 transition-colors">免責事項</Link></li>
                  <li><Link href="/contact" className="hover:text-green-600 transition-colors">お問い合わせ</Link></li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 space-y-2 text-xs">
              <div className="flex flex-col md:flex-row justify-between gap-2">
                <p>© {new Date().getFullYear()} {SITE_NAME}</p>
                <p className="text-gray-400">
                  当サイトはアフィリエイト広告を利用しています。
                </p>
              </div>
              <p className="text-gray-400">
                Amazonのアソシエイトとして、当メディアは適格販売により収入を得ています。
              </p>
            </div>
          </div>
        </footer>
        {adsenseId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
