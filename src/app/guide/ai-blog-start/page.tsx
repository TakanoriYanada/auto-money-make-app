import type { Metadata } from "next";
import Link from "next/link";
import {
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
  getCanonicalUrl,
} from "@/lib/seo";
import { getSponsorById, buildSponsorUrl, getSponsorImpressionPixelUrl } from "@/lib/sponsors";
import Breadcrumb from "@/components/Breadcrumb";

export const revalidate = 604800;

const SITE_NAME = "AIツール比較ナビ";
const PAGE_TITLE = "AIブログの始め方【2026年版】初心者でも月1万円稼ぐ完全ガイド";
const PAGE_DESC =
  "ChatGPTやClaudeなどAIツールを使ったブログで月1万円を稼ぐ方法を、初心者向けに完全解説。ドメイン取得・レンタルサーバー契約・WordPress設置・記事執筆・アフィリエイト収益化まで6ステップで解説します。";
const CANONICAL = getCanonicalUrl("/guide/ai-blog-start");
const LAST_UPDATED = "2026-04-12";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    siteName: SITE_NAME,
    locale: "ja_JP",
    type: "article",
    url: CANONICAL,
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESC,
  },
  robots: { index: true, follow: true },
};

const FAQS = [
  {
    question: "AIブログは本当に初心者でも始められますか？",
    answer:
      "はい、始められます。本記事のステップ通りに進めれば、プログラミングやデザインの知識がなくても約1時間でブログを立ち上げられます。記事の執筆はChatGPTやClaudeといったAIツールが下書きを作成してくれるので、タイピングが遅くても問題ありません。",
  },
  {
    question: "初期費用はいくらくらいかかりますか？",
    answer:
      "ドメイン取得が年1,000円前後、レンタルサーバーが月額643円〜1,200円程度です。月間で見ると1,500円〜2,000円で始められます。ConoHa WINGの「WINGパック」のようなキャンペーンを使えば、ドメイン料金が無料になりさらに安く始められます。",
  },
  {
    question: "月1万円稼げるようになるまでどのくらいかかりますか？",
    answer:
      "一般的に、アフィリエイトで月1万円を達成するには3〜6ヶ月かかると言われています。AIツールを活用して週3〜5本のペースで記事を投稿すると、この期間を短縮できる可能性があります。ジャンル選定とSEO対策が鍵です。",
  },
  {
    question: "どのレンタルサーバーがおすすめですか？",
    answer:
      "速度を重視するならConoHa WING、安定性と実績ならエックスサーバー、LiteSpeedによる高速表示を求めるならmixhostがおすすめです。いずれも月額1,000円前後で、初心者でも扱いやすい管理画面を備えています。",
  },
  {
    question: "AIツールはどれを使えばいいですか？",
    answer:
      "記事執筆の下書きにはChatGPT Plus（月額3,000円）かClaude Pro（月額3,000円）が定番です。無料で始めるならChatGPTやClaudeの無料プラン、Google Geminiも十分使えます。用途やトークン数に応じて使い分けると効率的です。",
  },
];

const breadcrumbJsonLd = generateBreadcrumbJsonLd([
  { name: "ホーム", url: "/" },
  { name: "ガイド", url: "/guide" },
  { name: "AIブログの始め方", url: "/guide/ai-blog-start" },
]);

const faqJsonLd = generateFaqJsonLd(FAQS);

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: PAGE_TITLE,
  description: PAGE_DESC,
  datePublished: LAST_UPDATED,
  dateModified: LAST_UPDATED,
  author: { "@type": "Organization", name: SITE_NAME },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: getCanonicalUrl("/"),
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": CANONICAL },
};

/** スポンサーCTA（記事中に差し込む小カード） */
function SponsorCallout({ sponsorId }: { sponsorId: string }) {
  const sponsor = getSponsorById(sponsorId);
  if (!sponsor) return null;
  const url = buildSponsorUrl(sponsor);
  const pixel = getSponsorImpressionPixelUrl(sponsor);

  return (
    <div className="my-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-5 md:p-6">
      <div className="flex items-start gap-2 mb-2">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Sponsored
        </span>
        {sponsor.badge && (
          <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded">
            {sponsor.badge}
          </span>
        )}
      </div>
      <h3 className="text-xl font-bold text-gray-900">{sponsor.name}</h3>
      <p className="text-sm text-blue-700 font-medium mt-0.5">{sponsor.tagline}</p>
      <p className="mt-3 text-sm text-gray-700 leading-relaxed">{sponsor.description}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener sponsored nofollow"
        className="mt-4 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-lg transition-colors"
      >
        {sponsor.ctaLabel}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </a>
      {pixel && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={pixel} alt="" width={1} height={1} className="hidden" aria-hidden />
      )}
    </div>
  );
}

export default function AiBlogStartGuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <article className="max-w-3xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ name: "ホーム", href: "/" }, { name: "ガイド" }, { name: "AIブログの始め方" }]} />

        {/* ヘッダー */}
        <header className="mt-6">
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">完全ガイド</span>
            <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">2026年最新版</span>
            <span className="text-xs text-gray-500">読了時間: 約10分</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            AIブログの始め方【2026年版】
            <br />
            <span className="text-green-600">初心者でも月1万円稼ぐ</span>完全ガイド
          </h1>
          <p className="mt-4 text-gray-600 leading-relaxed">
            「ChatGPTやClaudeなどのAIツールを使って、自分のブログで副収入を得たい」——そんな方に向けて、
            ドメイン取得からアフィリエイト収益化まで、6ステップで完全解説します。
            AIツールを活用すれば、記事執筆にかかる時間を半分以下に圧縮できます。
          </p>
        </header>

        {/* 目次 */}
        <nav className="mt-8 bg-white border border-gray-200 rounded-xl p-5" aria-label="目次">
          <p className="font-bold text-gray-900 mb-3">📋 目次</p>
          <ol className="space-y-1.5 text-sm text-gray-700 list-decimal list-inside">
            <li><a href="#step1" className="hover:text-green-600 hover:underline">AIブログとは？なぜ今始めるべきか</a></li>
            <li><a href="#step2" className="hover:text-green-600 hover:underline">独自ドメインを取得する</a></li>
            <li><a href="#step3" className="hover:text-green-600 hover:underline">レンタルサーバーを契約する</a></li>
            <li><a href="#step4" className="hover:text-green-600 hover:underline">WordPressをインストールする</a></li>
            <li><a href="#step5" className="hover:text-green-600 hover:underline">AIツールで記事を執筆する</a></li>
            <li><a href="#step6" className="hover:text-green-600 hover:underline">アフィリエイトで収益化する</a></li>
            <li><a href="#faq" className="hover:text-green-600 hover:underline">よくある質問</a></li>
          </ol>
        </nav>

        {/* 結論ボックス */}
        <section className="mt-8 bg-green-50 border-l-4 border-green-500 rounded-r-xl p-5">
          <p className="font-bold text-green-900 mb-2">💡 結論：この記事でわかること</p>
          <ul className="text-sm text-green-900 space-y-1 list-disc list-inside">
            <li>AIブログに必要な初期費用は月1,500〜2,000円（ドメイン＋サーバー代）</li>
            <li>ChatGPT・Claude・Geminiを使い分けると執筆効率が大幅アップ</li>
            <li>月1万円の収益化までの現実的なロードマップ（3〜6ヶ月）</li>
          </ul>
        </section>

        {/* Step 1 */}
        <section id="step1" className="mt-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-green-500 pb-2">
            Step 1: AIブログとは？なぜ今始めるべきか
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            「AIブログ」とは、ChatGPT・Claude・Geminiといった生成AIツールを活用して記事を作成するブログのことです。
            これまでのブログ運営では「毎日キーボードに向かって数時間執筆する」のが一般的でしたが、
            AIツールを使うと<strong>下書き作成の時間が1/3〜1/5に短縮</strong>できます。
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            特に2026年現在、Google検索はAIコンテンツを排除していません（品質が伴っていれば）。
            つまり、ルールを守って<strong>人間の手でチェック・加筆したAI執筆記事は正当に評価される</strong>のです。
            初心者でも今から始めれば、継続すれば月数万円の副収入を目指せます。
          </p>
        </section>

        {/* Step 2 */}
        <section id="step2" className="mt-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-green-500 pb-2">
            Step 2: 独自ドメインを取得する
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            ブログの「住所」にあたるのが独自ドメインです（例: <code className="text-sm bg-gray-100 px-2 py-0.5 rounded">aitool-hikaku-navi.com</code>）。
            無料ブログ（はてなブログ、noteなど）ではなく<strong>独自ドメイン＋レンタルサーバー</strong>で運営することで、
            広告の自由な配置・収益最大化・Googleからの評価向上などのメリットがあります。
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            ドメインは年間1,000〜1,500円で取得できます。初心者には、国内大手で実績豊富な2社がおすすめです。
          </p>

          <SponsorCallout sponsorId="onamae" />
          <SponsorCallout sponsorId="muumuu-domain" />

          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-900">
              <strong>💡 ドメイン選びのコツ</strong>: <code className="bg-white px-1 rounded">.com</code>が最も信頼性が高くおすすめ。
              ブログ名に関連した英単語で、短く覚えやすいものを選びましょう。
            </p>
          </div>
        </section>

        {/* Step 3 */}
        <section id="step3" className="mt-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-green-500 pb-2">
            Step 3: レンタルサーバーを契約する
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            レンタルサーバーはブログの「土地」にあたり、ブログのすべてのデータが置かれる場所です。
            表示速度・安定性・セキュリティに直結するため、<strong>ここはケチらずにしっかり選びましょう</strong>。
            初心者でも扱いやすく、AIブログ運営にぴったりな3社を紹介します。
          </p>

          <SponsorCallout sponsorId="conoha-wing" />
          <SponsorCallout sponsorId="xserver" />
          <SponsorCallout sponsorId="mixhost" />

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>💡 サーバー選びのコツ</strong>: 表示速度を重視するなら<strong>ConoHa WING</strong>、
              実績・安定性重視なら<strong>エックスサーバー</strong>、
              LiteSpeedの高速性を求めるなら<strong>mixhost</strong>がおすすめです。
              ConoHaの「WINGパック」なら独自ドメインが無料になるので、初めての方には特におすすめです。
            </p>
          </div>
        </section>

        {/* Step 4 */}
        <section id="step4" className="mt-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-green-500 pb-2">
            Step 4: WordPressをインストールする
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            WordPressは世界で最も使われているブログ運営ソフトウェアです。無料で使え、
            カスタマイズ性が高く、SEOにも強いため、ブログ運営の定番となっています。
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            近年のレンタルサーバーには<strong>「WordPressかんたんインストール」</strong>機能が付いており、
            数クリックで導入できます。ConoHa WINGなら契約と同時に自動インストールされるので、
            初心者でも迷うことはありません。
          </p>
          <div className="mt-4 bg-white border border-gray-200 rounded-lg p-5">
            <p className="font-semibold text-gray-900 mb-2">WordPress導入後にやること</p>
            <ol className="text-sm text-gray-700 space-y-1.5 list-decimal list-inside">
              <li>テーマ（デザイン）を選ぶ（無料のCocoonや有料のSWELLなどが人気）</li>
              <li>SSL化設定（https化）</li>
              <li>パーマリンク設定（記事URLの形式）</li>
              <li>最低限のプラグイン導入（SEO対策、セキュリティ等）</li>
            </ol>
          </div>
        </section>

        {/* Step 5 */}
        <section id="step5" className="mt-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-green-500 pb-2">
            Step 5: AIツールで記事を執筆する
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            ここからがAIブログの本番です。AIツールを使えば、
            <strong>1記事あたりの執筆時間を3時間→1時間に短縮</strong>できます。
            当サイトで比較している主要なAIツールを用途別に使い分けるのがコツです。
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/tools/chatgpt"
              className="bg-white border-2 border-gray-200 hover:border-green-400 rounded-xl p-5 transition-colors"
            >
              <p className="font-bold text-gray-900">ChatGPT</p>
              <p className="text-xs text-gray-500 mt-1">記事の構成案作成・見出し生成に最適</p>
              <span className="text-green-600 text-sm mt-3 inline-block">詳細を見る →</span>
            </Link>
            <Link
              href="/tools/claude"
              className="bg-white border-2 border-gray-200 hover:border-green-400 rounded-xl p-5 transition-colors"
            >
              <p className="font-bold text-gray-900">Claude</p>
              <p className="text-xs text-gray-500 mt-1">長文の下書き作成・自然な日本語文章に強い</p>
              <span className="text-green-600 text-sm mt-3 inline-block">詳細を見る →</span>
            </Link>
            <Link
              href="/tools/gemini"
              className="bg-white border-2 border-gray-200 hover:border-green-400 rounded-xl p-5 transition-colors"
            >
              <p className="font-bold text-gray-900">Gemini</p>
              <p className="text-xs text-gray-500 mt-1">最新情報の検索・ファクトチェック用途に</p>
              <span className="text-green-600 text-sm mt-3 inline-block">詳細を見る →</span>
            </Link>
          </div>

          <div className="mt-6 bg-white border border-gray-200 rounded-xl p-5">
            <p className="font-semibold text-gray-900 mb-3">AI執筆のおすすめワークフロー</p>
            <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
              <li><strong>キーワード調査</strong>: Googleサジェスト・関連キーワードで検索需要を確認</li>
              <li><strong>構成案作成</strong>: ChatGPTに「◯◯の記事構成を考えて」と指示</li>
              <li><strong>本文下書き</strong>: Claudeに見出しごとに本文を生成させる</li>
              <li><strong>ファクトチェック</strong>: Geminiや公式情報で事実確認</li>
              <li><strong>編集・加筆</strong>: 自分の体験談や独自視点を必ず追加する</li>
              <li><strong>投稿</strong>: WordPressで公開</li>
            </ol>
          </div>

          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-900">
              <strong>⚠️ 注意</strong>: AIが生成した文章をそのままコピペして公開するのはNGです。
              必ず自分で読み返し、独自の情報・体験を追加しましょう。
              Googleは「人間の経験・専門性」を重視しており、AI丸投げ記事は評価されません。
            </p>
          </div>
        </section>

        {/* Step 6 */}
        <section id="step6" className="mt-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-green-500 pb-2">
            Step 6: アフィリエイトで収益化する
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            記事を何本か投稿したら、いよいよ収益化です。AIブログの収益化にはいくつかの方法がありますが、
            初心者に最もおすすめなのは<strong>アフィリエイト広告</strong>です。
          </p>

          <div className="mt-6 space-y-4">
            {[
              {
                title: "1. アフィリエイトASPに登録する",
                desc: "A8.net・もしもアフィリエイト・バリューコマースなど、複数のASPに無料登録します。ASPとは広告主とブロガーを仲介するサービスです。",
              },
              {
                title: "2. 紹介する商品・サービスを決める",
                desc: "自分のブログジャンルに合った商品を選びます。当サイトのようにAIツール比較をするなら、関連するSaaSやサービスを紹介するのが自然です。",
              },
              {
                title: "3. 記事内に広告リンクを貼る",
                desc: "紹介した商品のアフィリエイトリンクを記事内に配置します。読者が押しつけに感じないよう、「自分が使っておすすめできるもの」を選ぶのが鉄則です。",
              },
              {
                title: "4. Google AdSenseも併用する",
                desc: "記事数が10〜20本になったらGoogle AdSenseを申請しましょう。自動で広告が表示され、表示回数とクリックで報酬が発生します。",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-5">
                <p className="font-semibold text-gray-900">{item.title}</p>
                <p className="mt-2 text-sm text-gray-700 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* まとめ */}
        <section className="mt-12 bg-gray-900 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold">まとめ：今日から始めれば半年後には収益化も</h2>
          <p className="mt-4 text-gray-300 leading-relaxed">
            AIブログは、従来のブログ運営より大幅に効率が良く、初心者でも収益化を目指せる副業です。
            最初の一歩は<strong className="text-white">ドメインとレンタルサーバーの契約だけ</strong>。
            時間は待ってくれません。今日から始めれば、3〜6ヶ月後には月1万円の副収入が見えてきます。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/tools"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              AIツール一覧を見る
            </Link>
            <Link
              href="/compare/chatgpt-vs-claude"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              ChatGPT vs Claude 比較
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mt-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-green-500 pb-2">
            よくある質問（FAQ）
          </h2>
          <div className="mt-6 space-y-4">
            {FAQS.map((faq) => (
              <details key={faq.question} className="bg-white border border-gray-200 rounded-xl p-5 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-start justify-between gap-4">
                  <span>Q. {faq.question}</span>
                  <span className="text-green-500 text-xl group-open:rotate-45 transition-transform shrink-0">+</span>
                </summary>
                <p className="mt-3 text-sm text-gray-700 leading-relaxed">A. {faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* 関連記事 */}
        <section className="mt-12 bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">関連コンテンツ</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href="/tools/chatgpt" className="text-green-600 hover:text-green-700">→ ChatGPTの評判・料金・機能を徹底解説</Link></li>
            <li><Link href="/tools/claude" className="text-green-600 hover:text-green-700">→ Claudeの評判・料金・機能を徹底解説</Link></li>
            <li><Link href="/compare/chatgpt-vs-claude" className="text-green-600 hover:text-green-700">→ ChatGPT vs Claude 徹底比較</Link></li>
            <li><Link href="/tools" className="text-green-600 hover:text-green-700">→ すべてのAIツールを見る</Link></li>
          </ul>
        </section>

        <p className="mt-8 text-xs text-gray-400 text-right">最終更新: {LAST_UPDATED}</p>
      </article>
    </>
  );
}
