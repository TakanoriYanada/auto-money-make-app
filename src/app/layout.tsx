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
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  return (
    <html lang="ja" className={`${notoSansJP.variable}`}>
      <head></head>
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="font-bold text-lg text-green-600 hover:text-green-700">
              {SITE_NAME}
            </Link>
            <nav className="flex items-center gap-5 text-sm text-gray-600">
              <Link href="/tools" className="hover:text-green-600 transition-colors">ツール一覧</Link>
              <Link href="/compare/chatgpt-vs-claude" className="hover:text-green-600 transition-colors">比較記事</Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-500">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <p className="font-medium text-gray-700">{SITE_NAME}</p>
              <p className="text-xs">
                当サイトはアフィリエイト広告を利用しています。
              </p>
            </div>
            <p className="mt-4 text-xs">© {new Date().getFullYear()} {SITE_NAME}</p>
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
