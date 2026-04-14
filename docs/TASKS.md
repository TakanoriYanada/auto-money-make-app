# タスクキュー

エージェントは自分の担当タグ（`[implementer]` など）のタスクを上から順に実行し、完了したら `[ ]` → `[x]` にチェックを入れること。

---

## 今回のイテレーション（2026-04-14）

本イテレーションでは 🔴（8件）+ 🟡（16件）= 合計24件を実装対象とする。
🟢 は「次回バックログ」に退避済み。[seo-specialist] タスクは STEP 5 で別途実行するため今回は除外。

### 依存関係メモ

```
[implementer] 型定義・ロジック修正
    ↓
[ui-designer] コンポーネント改修（implementerの修正を前提とする箇所あり）
    ↓
[content-writer] コンテンツ更新（UIの変更後に最適化）
```

**並列実行可否**: 
- バケットA（ui-designer）とバケットC（implementer）は一部依存関係あり
  - 🟡 ロゴ画像切り替え: implementerの`getToolIconUrl()`修正 → ui-designerの`ToolIcon`改修
  - それ以外は並列実行可能
- バケットB（content-writer）は独立して並列実行可能

---

### バケットA: [ui-designer] — 14件

UIコンポーネント・スタイリング関連。`src/components/`, `src/app/`のUI部分。

| # | 優先度 | タスク |
|---|--------|--------|
| A1 | 🔴 | [x] ホームヒーローCTAの視覚的重み強化（`src/app/page.tsx` L64） |
| A2 | 🔴 | [x] 全ページのH1サイズ拡大（`page.tsx`, `tools/[slug]/page.tsx`, `compare/[slug]/page.tsx`） |
| A3 | 🔴 | [x] ToolCard本文を`text-base`に拡大（`src/components/ToolCard.tsx` L30） |
| A4 | 🟡 | [x] モバイルヘッダーで「ガイド」リンク欠落を解消（`src/app/layout.tsx` L62-73） |
| A5 | 🟡 | [x] ツール一覧にカテゴリフィルタ・無料トグル・ソート追加（`src/app/tools/page.tsx`） |
| A6 | 🟡 | [x] ツール詳細ヒーローに64x64ロゴ表示（`src/app/tools/[slug]/page.tsx` L94-101） |
| A7 | 🟡 | [x] 比較記事結論後に両ツールCTAボタン配置（`src/app/compare/[slug]/page.tsx`）※既存実装済み |
| A8 | 🟡 | [x] ToolCard「詳細を見る」ボタンの視覚的重み軽減（`src/components/ToolCard.tsx` L48-53） |
| A9 | 🟡 | [x] 比較ページ2カラムをモバイル1カラム化（`src/app/compare/[slug]/page.tsx` L140） |
| A10 | 🟡 | [x] 比較ページツールカードCTAを`size="md"`に拡大（L149） |
| A11 | 🟡 | [x] パンくず最終アイテムに`max-w`制限追加（`src/components/Breadcrumb.tsx` L30） |
| A12 | 🟡 | [x] ホーム「注目ツール」グリッドgap拡大（`src/app/page.tsx` L77） |
| A13 | 🟡 | [x] 星評価の色を緑に統一（`src/components/StarRating.tsx`） |
| A14 | 🟡 | [x] Tailwind CSS v4カスタムカラートークン整備（`src/app/globals.css`） |

**依存**: A6はimplementerの`ToolIcon`改修と連携が望ましいが、既存コンポーネントでも実装可能。

---

### バケットB: [content-writer] — 3件

コンテンツ・データ更新。`src/data/tools/*.json`, `src/data/comparisons/*.mdx`。

| # | 優先度 | タスク |
|---|--------|--------|
| B1 | 🟡 | [x] `/about`運営者情報ページにハンドル名・経歴・X(Twitter)リンク・連絡先追記（E-E-A-T強化） |
| B2 | 🟡 | [x] 各比較記事H1直後に「【結論】こんな人はA/こんな人はB」サマリボックス追加 |
| B3 | 🟡 | [x] 各ツールJSONの`updated_at`を実更新日に更新 or 「データ参照日」表記に変更 |

**依存**: なし。独立して並列実行可能。

---

### バケットC: [implementer] — 6件

ロジック・型定義・ページ構造。`src/app/`, `src/lib/`, `src/types/`。

| # | 優先度 | タスク |
|---|--------|--------|
| C1 | 🔴 | [x] ツール詳細ページに公式サイトCTAボタン追加（affiliate未設定時はofficial_urlフォールバック）（`src/app/tools/[slug]/page.tsx` L102-110） |
| C2 | 🔴 | [x] 比較記事MDXのFAQセクション未レンダリング不具合を調査・修正 |
| C3 | 🔴 | [x] `/best`の404問題解消（`src/app/best/page.tsx`作成 or `/tools`へ308リダイレクト）+ `not-found.tsx`日本語化 |
| C4 | 🟡 | [x] ロゴをGoogle Faviconsから`/public/images/tools/{slug}.webp`に切り替え、`next/image`で最適化（`src/lib/tools.ts`, `src/components/ToolIcon.tsx`） |
| C5 | 🟡 | [x] 比較記事H1の「| AIツール比較ナビ」suffix混入を修正（`src/app/compare/[slug]/page.tsx` L136, `src/lib/seo.ts`） |

**依存**: C4完了後、ui-designerがA6（ヒーローロゴ表示）を実装するとより良いUX。

---

### バケットD: [seo-specialist] — STEP 5で実行（今回除外）

以下のタスクは STEP 5 で別途実行する。

- 🔴 [x] 全ページのタイトル重複解消（layout.tsx の template 修正）※implementerが実装済み
- 🔴 ツール一覧ページの「50選」→実ツール数に修正

---

### 実行順序の推奨

```
Phase 1（並列実行可能）:
├── [implementer] C1, C2, C3, C5 を実行
├── [ui-designer] A1, A2, A3, A4, A8, A9, A10, A11, A12, A13, A14 を実行
└── [content-writer] B1, B2, B3 を実行

Phase 2（依存解決後）:
├── [implementer] C4（ロゴ画像切り替え）を実行
└── [ui-designer] A5, A6, A7 を実行（C4完了後が理想だが先行実装も可）
```

---

### 所要時間見積もり

| バケット | 件数 | 見積もり |
|----------|------|----------|
| A: ui-designer | 14件 | 3-4時間 |
| B: content-writer | 3件 | 1-1.5時間 |
| C: implementer | 5件 | 2-3時間 |
| **合計** | **22件** | **6-8.5時間** |

---

### リスクの高いタスクTOP3

1. **C2: FAQ未レンダリング不具合** — MDXコンポーネント渡し漏れ or FaqAccordionマウント問題の調査が必要。原因特定に時間がかかる可能性
2. **A5: ツール一覧フィルタ機能** — Client Component化が必要で、既存Server Componentからの移行作業が大きい
3. **C4: ロゴ画像切り替え** — 21ツール分のロゴ画像取得・WebP変換・配置作業が手動で必要

---

## フェーズ1: プロジェクト初期化

- [x] 初期ドキュメント・エージェント定義の作成（完了: 2026-04-11）
- [x] [implementer] Voltaで Node LTS をピン留めする（`volta pin node@lts`）
- [x] [implementer] `npx create-next-app@latest` で Next.js 15 + TypeScript + Tailwind CSS プロジェクトをsrc以外のディレクトリに作成し、src/以下に移動する
- [x] [implementer] `src/types/index.ts` に Tool, PricingTier, Comparison, Roundup の TypeScript 型を定義する
- [x] [implementer] `src/lib/tools.ts` — JSONファイルからツールデータを読み込むデータアクセス層を実装する
- [x] [implementer] `src/lib/affiliate.ts` — 環境変数からアフィリエイトURLを構築するユーティリティを実装する
- [x] [implementer] `src/lib/seo.ts` — JSON-LD構造化データ生成ユーティリティを実装する
- [x] [implementer] `src/app/layout.tsx` — ルートレイアウト（AdSense・Analyticsのプレースホルダー含む）を実装する
- [x] [implementer] `src/app/page.tsx` — ホームページ（注目ツール・最新比較記事セクション）を実装する
- [x] [implementer] `src/app/sitemap.ts` — 全URLの動的サイトマップを実装する
- [x] [implementer] `src/app/robots.ts` — robots.txtを実装する
- [x] [implementer] `src/app/tools/page.tsx` — ツール一覧ページを実装する
- [x] [implementer] `src/app/tools/[slug]/page.tsx` — ツール詳細ページを実装する
- [x] [implementer] `src/app/compare/[slug]/page.tsx` — 比較ページを実装する
- [x] [implementer] `src/app/best/[slug]/page.tsx` — おすすめ記事ページを実装する
- [x] [implementer] `.env.example` を作成する（必要な環境変数を全て記載）

---

## フェーズ2: UIコンポーネント

- [x] [ui-designer] `src/components/ToolCard.tsx` — ツールカードコンポーネントを実装する
- [x] [ui-designer] `src/components/AffiliateButton.tsx` — クリック計測付きCTAボタン（Client Component）を実装する
- [x] [ui-designer] `src/components/ComparisonTable.tsx` — 比較表コンポーネントを実装する
- [x] [ui-designer] `src/components/StarRating.tsx` — 星評価コンポーネントを実装する
- [x] [ui-designer] `src/components/AdUnit.tsx` — AdSenseスロットラッパー（Client Component）を実装する
- [x] [ui-designer] `src/components/Breadcrumb.tsx` — パンくずリストを実装する
- [x] [ui-designer] `src/components/FaqAccordion.tsx` — FAQアコーディオン（Client Component）を実装する
- [x] [ui-designer] `src/components/ToolGrid.tsx` — ToolCardを並べるグリッドレイアウトを実装する

---

## フェーズ3: 初期コンテンツ（ツールJSON）

優先度高いツールのJSONファイルを `src/data/tools/` に作成する:

- [x] [content-writer] `chatgpt.json` — ChatGPT
- [x] [content-writer] `claude.json` — Claude（Anthropic）
- [x] [content-writer] `gemini.json` — Google Gemini
- [x] [content-writer] `perplexity.json` — Perplexity AI
- [x] [content-writer] `notion.json` — Notion
- [x] [content-writer] `obsidian.json` — Obsidian
- [x] [content-writer] `canva.json` — Canva
- [x] [content-writer] `cursor.json` — Cursor
- [x] [content-writer] `github-copilot.json` — GitHub Copilot
- [x] [content-writer] `jasper.json` — Jasper AI

---

## フェーズ4: 初期コンテンツ（比較記事）

`src/data/comparisons/` に比較MDX記事を作成する:

- [x] [content-writer] `chatgpt-vs-claude.mdx` — ChatGPT vs Claude（最優先・検索数多い）
- [x] [content-writer] `chatgpt-vs-gemini.mdx` — ChatGPT vs Gemini
- [x] [content-writer] `notion-vs-obsidian.mdx` — Notion vs Obsidian
- [x] [content-writer] `cursor-vs-github-copilot.mdx` — Cursor vs GitHub Copilot

---

## フェーズ5: SEO実装

- [x] [seo-specialist] 全ページの `generateMetadata()` を確認・補完する
- [x] [seo-specialist] ツールページに SoftwareApplication JSON-LD を実装する
- [x] [seo-specialist] 比較ページに ItemList + FAQPage JSON-LD を実装する
- [x] [seo-specialist] おすすめページに ItemList + FAQPage JSON-LD を実装する
- [x] [seo-specialist] 全ページに BreadcrumbList JSON-LD を実装する
- [x] [seo-specialist] 内部リンクの密度を確認・追加する

---

## フェーズ6: QA・テスト

- [x] [tester] `npm run build` でゼロエラーを確認する
- [x] [tester] `npx tsc --noEmit` でゼロエラーを確認する
- [x] [tester] 全ページの generateMetadata 存在確認
- [x] [tester] アフィリエイトID漏洩チェック
- [x] [tester] Playwright でブラウザ動作確認（ホーム・ツール・比較ページ）
- [x] [tester] QAレポートを PROGRESS.md に追記する

---

## フェーズ7: デプロイ

- [x] [deployer] `.env.example` の内容確認・Vercel環境変数設定（完了: 2026-04-11）
- [x] [deployer] `docs/REVENUE_MODEL.md` の記入完了確認（FILL_INが残っていないか）（完了: 2026-04-11）
- [x] [deployer] `vercel --prod` でデプロイ実行（完了: 2026-04-11）
- [x] [deployer] デプロイ後スモークテスト（全主要ページのHTTP 200確認）（完了: 2026-04-11）
- [x] [deployer] デプロイレポートを PROGRESS.md に追記する（完了: 2026-04-11）

---

## バックログ（将来のフェーズ）

- [x] [content-writer] 追加ツール10件のJSONファイル作成（完了: 2026-04-11）
- [ ] [content-writer] おすすめ記事5本（`src/data/roundups/`）
- [x] [seo-specialist] Google Search Consoleへのサイトマップ登録手順書作成（完了: 2026-04-11, docs/GOOGLE_SEARCH_CONSOLE.md）
- [ ] [implementer] サイト内検索機能の追加
- [ ] [ui-designer] ダークモード対応

---

## フェーズ8: Google Search Console 登録（手動作業含む）

- [x] [implementer] `layout.tsx` の metadata に `verification.google` を環境変数で設定（完了: 2026-04-11）
- [x] [implementer] `.env.example` に `GOOGLE_SITE_VERIFICATION` を追加（完了: 2026-04-11）
- [x] [implementer] `NEXT_PUBLIC_SITE_URL` の改行/末尾スラッシュ防御的trim（layout/sitemap/robots/seo）（完了: 2026-04-11）
- [x] [seo-specialist] `docs/GOOGLE_SEARCH_CONSOLE.md` 登録手順書作成（完了: 2026-04-11）
- [x] [human] GSCでプロパティ追加し、verification トークンを取得（完了: 2026-04-11）
- [x] [human] Vercel環境変数 `GOOGLE_SITE_VERIFICATION` に貼り付け（完了: 2026-04-11）
- [x] [human] `vercel --prod --force` で再デプロイ（完了: 2026-04-11）
- [x] [human] GSCで所有権確認 → `sitemap.xml` 送信（完了: 2026-04-11, 検出16ページ）
- [x] [human] 主要ページのインデックスリクエスト送信（完了: 2026-04-11）

---

## フェーズ9: evaluator 2026-04-14 改善タスク

本イテレーションは 🔴 + 🟡 のみ実装。🟢 は下部「次回バックログ（evaluator 2026-04-14）」に隔離。

### 🔴 致命的（最優先・即着手）

- [ ] 🔴 [seo-specialist] 全ページのタイトル重複 "〜 | AIツール比較ナビ | AIツール比較ナビ" を解消する（layout の metadata.title.template とページ側 title のどちらか一方から "| AIツール比較ナビ" を削除）
- [ ] 🔴 [implementer] ツール詳細ページ（特に ChatGPT/Claude/Gemini/Cursor/Notion/Obsidian など affiliate 未提携ツール）にヒーロー/本文末の2箇所に公式サイトへの CTA ボタンを追加。affiliate.ts が未設定でも official_url にフォールバックして表示する設計にする
  - **ファイル**: `src/app/tools/[slug]/page.tsx` L102-110（既存条件分岐 `{affiliateUrl && ...}` を `{(affiliateUrl || tool.official_url) && ...}` に変更）
  - **デザイン**: `bg-indigo-600 hover:bg-indigo-700` でアフィリエイトCTA（緑）と差別化、ラベルは「公式サイトを見る」
  - **影響**: 現在CTAがないツール詳細ページ（ChatGPT/Claude/Gemini/Cursor/Notion）で離脱率改善、比較サイトとしての使命回復
- [x] 🔴 [seo-specialist] ツール一覧ページの `<title>` / `<h1>` / meta description から「50選」を外し、実ツール数（21件）に合わせた文言へ修正（例: 「AIツール厳選21選【2026年版】」）
- [ ] 🔴 [implementer] 比較記事 MDX の FAQ セクションがDOMにレンダリングされていない不具合を調査・修正（MDX コンポーネント渡し漏れ or FaqAccordion 未マウント）。FAQ が出ない限り FAQPage JSON-LD は外すこと
- [ ] 🔴 [implementer] `/best` に 404 が出る問題を解消（`src/app/best/page.tsx` を作成して一覧表示 or `/tools` へ 308 リダイレクト）。併せて `src/app/not-found.tsx` を日本語化して「トップへ戻る」「ツール一覧を見る」CTAを追加

### 🟡 改善推奨（同イテレーション内で対応）

- [ ] 🟡 [ui-designer] モバイル（<640px）のヘッダーで「ガイド」リンクが欠落する問題を解消。ハンバーガーメニュー化 or 3項目すべて収まる詰めレイアウトへ
  - **ファイル**: `src/app/layout.tsx` L62-73（ヘッダーnav部分）
  - **オプションA（簡易）**: `hidden sm:inline` を削除し、3項目すべて `text-xs gap-3` で詰め表示
  - **オプションB（推奨）**: Client Component でハンバーガーメニュー実装（shadcn Sheet or Headless UI）
  - **現状**: `hidden sm:inline` で 640px 未満では「ガイド」が非表示 → ユーザーがガイドページにアクセス不可
- [ ] 🟡 [content-writer] `/about` 運営者情報ページに運営者のハンドル名・経歴（AI利用歴・業種）・X(Twitter)リンク・連絡先窓口を追記。E-E-A-T 強化
- [ ] 🟡 [ui-designer] ツール一覧ページにカテゴリフィルタ（チャット/画像生成/コード支援/ノート/音声/デザイン）・「無料プランあり」トグル・評価順ソートを追加
  - **ファイル**: `src/app/tools/page.tsx`（新規 Client Component 化 or useState hooks 追加）
  - **デザイン**: ページ上部にチップボタン形式でカテゴリ選択（`bg-green-50 text-green-700 border-green-200` active 時）+ トグルスイッチ「無料のみ」+ ドロップダウン「評価順/名前順/料金順」
  - **影響**: 現在21ツールが単一リスト → せっかちユーザーの離脱防止、フィルタによる回遊率UP
- [ ] 🟡 [ui-designer] ツール詳細ページのヒーローに 64×64 ロゴ画像を表示（H1 の左に配置）
  - **ファイル**: `src/app/tools/[slug]/page.tsx` L94-101（ヒーローセクション）
  - **実装**: 既存の `ToolIcon` コンポーネント（`size="lg"` 64×64）を H1 の左に配置、flex レイアウトで `items-start gap-4`
  - **現状**: ToolCard（一覧）にはロゴ表示があるが、詳細ページのヒーローにはなし → ブランド認知低下
- [ ] 🟡 [ui-designer] or [implementer] ロゴを Google Favicons から `/public/images/tools/{slug}.webp` に切り替え、`next/image` で最適化配信。全ツール分のロゴを用意（公式ブランド利用規約準拠）
  - **ファイル**: `src/lib/tools.ts` `getToolIconUrl()` 関数、`src/components/ToolIcon.tsx`
  - **作業**: 21ツール分のロゴを各公式サイトからダウンロード → WebP 変換（128×128 推奨）→ `/public/images/tools/{slug}.webp` に配置
  - **実装**: `getToolIconUrl()` を `return /images/tools/${tool.slug}.webp` に変更、`ToolIcon` で `next/image` の `<Image>` に置き換え
  - **現状**: `https://www.google.com/s2/favicons?domain=...` 依存 → Google API 停止で全ロゴ壊れるリスク
- [ ] 🟡 [content-writer] 各比較記事の H1 直後に「【結論】こんな人は A / こんな人は B」のサマリボックスを追加（結論最下部よりファーストビューで見える位置）
- [ ] 🟡 [ui-designer] 比較記事の結論セクション直後に、両ツールの公式サイトへの CTA ボタン（並列2カラム）を配置
  - **ファイル**: `src/app/compare/[slug]/page.tsx`（MDX 本文レンダリング後の静的挿入 or MDX 内にコンポーネント埋め込み）
  - **デザイン**: 2カラムグリッド `grid-cols-1 sm:grid-cols-2 gap-4`、各 `AffiliateButton size="lg"` で「{toolA.name}を試す」「{toolB.name}を試す」
  - **現状**: 結論セクションが最下部にあり、その後は内部リンク（`/tools/chatgpt`）のみ → 外部CTAがなく離脱
- [ ] 🟡 [implementer] 比較記事 H1 に「| AIツール比較ナビ」suffix が混入している問題を修正（`page.tsx` で title 文字列を H1 に流用している箇所から suffix を剥がす）
  - **ファイル**: `src/app/compare/[slug]/page.tsx` L136（`<h1>{title}</h1>` が `getComparisonPageTitle()` の戻り値をそのまま使用）
  - **原因**: `getComparisonPageTitle()` が返す文字列に「| AIツール比較ナビ」が含まれている可能性（`src/lib/seo.ts` 確認）
  - **修正**: H1 用に suffix なしの見出しを別途生成（例: `{toolA.name} vs {toolB.name}【2026年版】徹底比較`）または `title.replace(/\|.*$/, "")` で削除
- [ ] 🟡 [content-writer] 各ツールJSONの `updated_at` を実更新日に更新、または「データ参照日」表記に変更。全ツール同一日付は鮮度偽装に見える

---

## 次回バックログ（evaluator 2026-04-14 🟢）

- [ ] 🟢 [ui-designer] ダークモード対応（既存バックログ再掲）
- [ ] 🟢 [implementer] サイト内検索機能（既存バックログ再掲）
- [ ] 🟢 [content-writer] ユーザーの声・アンケート機能 or CTA後アンケート
- [ ] 🟢 [content-writer] 各ツール詳細ページにUIスクリーンショットを追加
- [ ] 🟢 [content-writer] 比較記事を 10 本以上に増やす（現在 4 本）
- [ ] 🟢 [content-writer] おすすめランキング記事 `/best/*` を 3 本以上公開し、`/best` index を整備
- [ ] 🟢 [ui-designer] 右サイドバーに「ランキングTOP3」固定表示（デスクトップ回遊促進）
- [ ] 🟢 [ui-designer] パンくずの現在ページのコントラスト強化（a11y）

---

## 新規追加タスク（ui-designer 2026-04-14 デザインデット）

### 🔴 致命的（デザイン観点で即修正）

- [ ] 🔴 [ui-designer] ホームヒーローCTAの視覚的重み強化: サイズ・色コントラスト・影を増強してCVR向上
  - **ファイル**: `src/app/page.tsx` L64
  - **現状**: `bg-green-500 py-3 px-6`（高さ48px、コントラスト 3.2:1）でWCAG AA未達、視線誘導弱い
  - **修正**: `bg-green-600 py-4 px-8 text-lg shadow-lg hover:shadow-xl` に変更（高さ56px、コントラスト 4.8:1）
  - **影響**: ファーストビューでのCTA認識率UP、CVR改善

- [ ] 🔴 [ui-designer] 全ページの H1 サイズ拡大（タイポグラフィ階層の正常化）
  - **ファイル**: 
    - `src/app/page.tsx` L57-58（ホームヒーロー: `text-4xl md:text-6xl`）
    - `src/app/tools/[slug]/page.tsx` L97（ツール詳細: `text-4xl`）
    - `src/app/compare/[slug]/page.tsx` L136（比較: `text-3xl md:text-4xl`）
  - **現状**: H1 が 30px（`text-3xl`）と小さく、カード見出し（18px）との差が 1.67倍のみ
  - **推奨**: H1:H2:body = 2:1.5:1 以上の比率（36px:24px:16px）

- [ ] 🔴 [ui-designer] ToolCard 本文を `text-base` に拡大（モバイル可読性）
  - **ファイル**: `src/components/ToolCard.tsx` L30
  - **現状**: `text-sm`（14px）+ `line-clamp-3` でモバイル可読性低い
  - **修正**: `text-base line-clamp-2` に変更（16px、行数削減で高さ調整）

### 🟡 改善推奨（デザインデット）

- [ ] 🟡 [ui-designer] ToolCard「詳細を見る」ボタンの視覚的重み軽減
  - **ファイル**: `src/components/ToolCard.tsx` L48-53
  - **現状**: `border-2 border-gray-300` で線が太く、アフィリエイトCTA（`bg-green-500`）より視線が先に行く
  - **修正**: `border border-gray-200 text-gray-600 hover:border-gray-300` に変更

- [ ] 🟡 [ui-designer] 比較ページの2カラムレイアウトをモバイルで1カラム化
  - **ファイル**: `src/app/compare/[slug]/page.tsx` L140
  - **現状**: `grid-cols-2` でモバイル（375px）でも2カラム → 各カード幅 180px で窮屈
  - **修正**: `grid-cols-1 sm:grid-cols-2` に変更

- [ ] 🟡 [ui-designer] 比較ページツールカードCTAを `size="md"` に拡大（タップターゲット）
  - **ファイル**: `src/app/compare/[slug]/page.tsx` L149
  - **現状**: `size="sm"`（`min-h-[44px]`）でタップターゲット最低限
  - **修正**: `size="md"`（`min-h-[48px]`）に変更、より確実なタップ可能

- [ ] 🟡 [ui-designer] パンくず最終アイテムに `max-w` 制限追加（モバイル横スクロール防止）
  - **ファイル**: `src/components/Breadcrumb.tsx` L30
  - **現状**: 比較記事タイトル「ChatGPT vs Claude【2026年版】徹底比較…」が長く、`truncate` のみでは不十分
  - **修正**: `max-w-[200px] sm:max-w-none truncate` 追加

- [ ] 🟡 [ui-designer] ホームの「注目ツール」グリッドgap拡大（デスクトップ3カラム時の詰まり解消）
  - **ファイル**: `src/app/page.tsx` L77
  - **現状**: `gap-5`（20px）で `lg:grid-cols-3` 時に横幅33%で詰まる
  - **修正**: `gap-6`（24px）に変更

- [ ] 🟡 [ui-designer] 星評価の色を緑に統一（ブランドカラー一貫性）
  - **ファイル**: `src/components/StarRating.tsx`
  - **現状**: `text-yellow-400`（黄色）でサイト全体のアクセントカラー（緑）と不統一
  - **修正**: `text-green-500` に変更（filled star）、`text-green-200`（empty star）

- [ ] 🟡 [ui-designer] Tailwind CSS v4 カスタムカラートークンの整備
  - **ファイル**: `src/app/globals.css` `@theme inline` ブロック
  - **現状**: `--color-background` 等が定義されているがどこでも使用されていない、フォント変数名不一致（`--font-geist-sans` vs `--font-noto-sans-jp`）
  - **修正**: 不要な変数削除 or アクセントカラー `--color-primary-green: #16a34a` 等を追加して活用

### 🟢 次回バックログ（中長期デザインタスク）

- [ ] 🟢 [ui-designer] `/public/images/tools/` にロゴ画像21ツール分を配置（WebP 128×128）
  - 各ツール公式サイトからブランドガイドライン準拠でダウンロード
  - ツール名リスト: chatgpt, claude, gemini, perplexity, notion, obsidian, canva, cursor, github-copilot, jasper, midjourney, stable-diffusion, microsoft-copilot, google-bard, slack, trello, asana, zapier, make, airtable, coda

- [ ] 🟢 [ui-designer] AdSense ユニット配置戦略の設計・実装
  - `AdUnit.tsx` コンポーネントは実装済みだが未使用
  - ツール詳細ページ: 本文中段・関連ツール上に1ユニットずつ
  - 比較ページ: スペック表下・結論前に1ユニット
  - `SponsorBanner` との棲み分け明確化

- [ ] 🟢 [ui-designer] ComparisonTable コンポーネントの活用（sticky header）
  - 実装済みだが比較ページで未使用
  - MDX 内の Markdown テーブルを `<ComparisonTable>` に置き換え

- [ ] 🟢 [ui-designer] ダークモード対応（`@theme` で dark 変数定義 + `dark:` 修飾子追加）
  - `globals.css` に `@media (prefers-color-scheme: dark)` 追加
  - 全コンポーネントに `dark:bg-gray-800 dark:text-gray-100` 等を追加

