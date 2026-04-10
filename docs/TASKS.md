# タスクキュー

エージェントは自分の担当タグ（`[implementer]` など）のタスクを上から順に実行し、完了したら `[ ]` → `[x]` にチェックを入れること。

---

## フェーズ1: プロジェクト初期化

- [x] 初期ドキュメント・エージェント定義の作成（完了: 2026-04-11）
- [ ] [implementer] Voltaで Node LTS をピン留めする（`volta pin node@lts`）
- [ ] [implementer] `npx create-next-app@latest` で Next.js 15 + TypeScript + Tailwind CSS プロジェクトをsrc以外のディレクトリに作成し、src/以下に移動する
- [ ] [implementer] `src/types/index.ts` に Tool, PricingTier, Comparison, Roundup の TypeScript 型を定義する
- [ ] [implementer] `src/lib/tools.ts` — JSONファイルからツールデータを読み込むデータアクセス層を実装する
- [ ] [implementer] `src/lib/affiliate.ts` — 環境変数からアフィリエイトURLを構築するユーティリティを実装する
- [ ] [implementer] `src/lib/seo.ts` — JSON-LD構造化データ生成ユーティリティを実装する
- [ ] [implementer] `src/app/layout.tsx` — ルートレイアウト（AdSense・Analyticsのプレースホルダー含む）を実装する
- [ ] [implementer] `src/app/page.tsx` — ホームページ（注目ツール・最新比較記事セクション）を実装する
- [ ] [implementer] `src/app/sitemap.ts` — 全URLの動的サイトマップを実装する
- [ ] [implementer] `src/app/robots.ts` — robots.txtを実装する
- [ ] [implementer] `src/app/tools/page.tsx` — ツール一覧ページを実装する
- [ ] [implementer] `src/app/tools/[slug]/page.tsx` — ツール詳細ページを実装する
- [ ] [implementer] `src/app/compare/[slug]/page.tsx` — 比較ページを実装する
- [ ] [implementer] `src/app/best/[slug]/page.tsx` — おすすめ記事ページを実装する
- [ ] [implementer] `.env.example` を作成する（必要な環境変数を全て記載）

---

## フェーズ2: UIコンポーネント

- [ ] [ui-designer] `src/components/ToolCard.tsx` — ツールカードコンポーネントを実装する
- [ ] [ui-designer] `src/components/AffiliateButton.tsx` — クリック計測付きCTAボタン（Client Component）を実装する
- [ ] [ui-designer] `src/components/ComparisonTable.tsx` — 比較表コンポーネントを実装する
- [ ] [ui-designer] `src/components/StarRating.tsx` — 星評価コンポーネントを実装する
- [ ] [ui-designer] `src/components/AdUnit.tsx` — AdSenseスロットラッパー（Client Component）を実装する
- [ ] [ui-designer] `src/components/Breadcrumb.tsx` — パンくずリストを実装する
- [ ] [ui-designer] `src/components/FaqAccordion.tsx` — FAQアコーディオン（Client Component）を実装する
- [ ] [ui-designer] `src/components/ToolGrid.tsx` — ToolCardを並べるグリッドレイアウトを実装する

---

## フェーズ3: 初期コンテンツ（ツールJSON）

優先度高いツールのJSONファイルを `src/data/tools/` に作成する:

- [ ] [content-writer] `chatgpt.json` — ChatGPT
- [ ] [content-writer] `claude.json` — Claude（Anthropic）
- [ ] [content-writer] `gemini.json` — Google Gemini
- [ ] [content-writer] `perplexity.json` — Perplexity AI
- [ ] [content-writer] `notion.json` — Notion
- [ ] [content-writer] `obsidian.json` — Obsidian
- [ ] [content-writer] `canva.json` — Canva
- [ ] [content-writer] `cursor.json` — Cursor
- [ ] [content-writer] `github-copilot.json` — GitHub Copilot
- [ ] [content-writer] `jasper.json` — Jasper AI

---

## フェーズ4: 初期コンテンツ（比較記事）

`src/data/comparisons/` に比較MDX記事を作成する:

- [ ] [content-writer] `chatgpt-vs-claude.mdx` — ChatGPT vs Claude（最優先・検索数多い）
- [ ] [content-writer] `chatgpt-vs-gemini.mdx` — ChatGPT vs Gemini
- [ ] [content-writer] `notion-vs-obsidian.mdx` — Notion vs Obsidian
- [ ] [content-writer] `cursor-vs-github-copilot.mdx` — Cursor vs GitHub Copilot

---

## フェーズ5: SEO実装

- [ ] [seo-specialist] 全ページの `generateMetadata()` を確認・補完する
- [ ] [seo-specialist] ツールページに SoftwareApplication JSON-LD を実装する
- [ ] [seo-specialist] 比較ページに ItemList + FAQPage JSON-LD を実装する
- [ ] [seo-specialist] おすすめページに ItemList + FAQPage JSON-LD を実装する
- [ ] [seo-specialist] 全ページに BreadcrumbList JSON-LD を実装する
- [ ] [seo-specialist] 内部リンクの密度を確認・追加する

---

## フェーズ6: QA・テスト

- [ ] [tester] `npm run build` でゼロエラーを確認する
- [ ] [tester] `npx tsc --noEmit` でゼロエラーを確認する
- [ ] [tester] 全ページの generateMetadata 存在確認
- [ ] [tester] アフィリエイトID漏洩チェック
- [ ] [tester] Playwright でブラウザ動作確認（ホーム・ツール・比較ページ）
- [ ] [tester] QAレポートを PROGRESS.md に追記する

---

## フェーズ7: デプロイ

- [ ] [deployer] `.env.example` の内容確認・Vercel環境変数設定
- [ ] [deployer] `docs/REVENUE_MODEL.md` の記入完了確認（FILL_INが残っていないか）
- [ ] [deployer] `vercel --prod` でデプロイ実行
- [ ] [deployer] デプロイ後スモークテスト（全主要ページのHTTP 200確認）
- [ ] [deployer] デプロイレポートを PROGRESS.md に追記する

---

## バックログ（将来のフェーズ）

- [ ] [content-writer] 追加ツール10件のJSONファイル作成
- [ ] [content-writer] おすすめ記事5本（`src/data/roundups/`）
- [ ] [seo-specialist] Google Search Consoleへのサイトマップ登録手順書作成
- [ ] [implementer] サイト内検索機能の追加
- [ ] [ui-designer] ダークモード対応
