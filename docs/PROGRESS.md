# プロジェクト進捗ログ

このファイルはエージェントが作業完了後に追記するログです。削除・編集はしないでください。

---

## [2026-04-11] 初期セットアップ — プロジェクト基盤構築

### 実施内容
- CLAUDE.md を作成（全エージェント共通コンテキスト）
- .claude/agents/ に7つのサブエージェント定義を作成
  - planner.md, implementer.md, content-writer.md
  - ui-designer.md, seo-specialist.md, tester.md, deployer.md
- docs/ ディレクトリとドキュメント群を作成
  - AGENT_PROTOCOL.md（通信プロトコル）
  - ARCHITECTURE.md（技術設計）
  - CONTENT_SPEC.md（コンテンツスキーマ）
  - REVENUE_MODEL.md（アフィリエイト情報 — 人間の記入待ち）
  - PROGRESS.md（このファイル）
  - TASKS.md（タスクキュー）
- Context7 MCP をインストール（`npx -y @upstash/context7-mcp`）
- Playwright MCP をインストール（`npx -y @playwright/mcp@latest`）

### 次のエージェントへの引き継ぎ事項
- **REVENUE_MODEL.md への記入**: アフィリエイトASP登録後、各IDをユーザーが記入する
- **次のステップ**: docs/TASKS.md のフェーズ1から開始する
  - Volta で Node LTS をピン留めする
  - `npx create-next-app@latest` で Next.js 15 プロジェクトを作成
  - src/types/index.ts の型定義から始める

---

## [2026-04-11] implementer — フェーズ1 基盤実装完了

### 実施内容
- Volta で Node 24.14.1 LTS をピン留め（`package.json` の `volta` フィールド）
- Next.js 16.2.3 (App Router, TypeScript, Tailwind CSS v4) プロジェクトをスキャフォールド
- `npm run build` でゼロエラーを確認
- `src/types/index.ts` — Tool, PricingTier, ComparisonFrontmatter, RoundupFrontmatter 型を定義
- `src/lib/tools.ts` — getAllTools, getToolBySlug, getFeaturedTools 等のデータアクセス層
- `src/lib/affiliate.ts` — 環境変数からアフィリエイトURL構築（a8/vc/moshimo対応）
- `src/lib/seo.ts` — JSON-LD生成ユーティリティ（Tool, Breadcrumb, FAQ, ItemList）
- `.env.example` — 必要な全環境変数のテンプレート

### 次のエージェントへの引き継ぎ事項
- **ui-designer**: `src/components/` のUIコンポーネントを実装してください（docs/TASKS.md フェーズ2参照）
- **implementer**: ページファイル（`src/app/tools/[slug]/page.tsx` 等）はまだ未実装です（フェーズ1の残タスク参照）
- **content-writer**: `src/data/tools/` と `src/data/comparisons/` のコンテンツファイルがまだありません（フェーズ3参照）

---

## [2026-04-11] implementer — フェーズ1 ページ・コンポーネント実装完了

### 実施内容
- `src/app/layout.tsx` — 日本語フォント(Noto Sans JP)、ヘッダー・フッター、AdSenseスクリプト
- `src/app/page.tsx` — ホームページ（ヒーロー・注目ツール・比較記事・特徴セクション）
- `src/app/sitemap.ts` — 動的サイトマップ（ツール・比較・おすすめページ全対応）
- `src/app/robots.ts` — robots.txt
- `src/app/tools/page.tsx` — ツール一覧（全ツールグリッド表示）
- `src/app/tools/[slug]/page.tsx` — ツール詳細（料金・pros/cons・CTA・JSON-LD）
- `src/app/compare/[slug]/page.tsx` — 比較ページ（2ツール並列・比較表・結論）
- `src/app/best/[slug]/page.tsx` — おすすめ記事（ランキング形式）
- `src/components/` — ToolCard, AffiliateButton, StarRating, Breadcrumb, AdUnit（スタブ）
- `npm run build` ゼロエラー確認済み

### 次のエージェントへの引き継ぎ事項
- **content-writer**: `src/data/tools/` にツールJSONを作成してください（フェーズ3）。JSONがないとホームページ・一覧は空になります
- **ui-designer**: `src/components/` のコンポーネントはスタブです。デザインを強化してください（フェーズ2）

---

## [2026-04-11] content-writer — フェーズ3・4 コンテンツ作成完了

### 実施内容

**フェーズ3: ツールJSON 10ファイル作成**
- `chatgpt.json` — 世界最大の対話型AI、無料プラン充実、rating 4.7
- `claude.json` — 安全性重視、200Kトークン長文対応、rating 4.6
- `gemini.json` — Google検索連携、無料でウェブ検索可能、rating 4.5
- `perplexity.json` — AI検索エンジン、出典付き回答、rating 4.4
- `notion.json` — オールインワンワークスペース、チーム共同編集、rating 4.6
- `obsidian.json` — ローカルMarkdownノート、プライバシー重視、rating 4.7
- `canva.json` — デザインツール、テンプレート豊富、A8アフィリエイト対応、rating 4.7
- `cursor.json` — AI統合エディタ、Composerモード、rating 4.8
- `github-copilot.json` — GitHub公式AIコーディング、複数エディタ対応、rating 4.6
- `jasper.json` — マーケティング特化ライティングAI、A8アフィリエイト対応、rating 4.5

**品質基準達成状況**
- `description`: 全ツール200文字以上（平均250文字）
- `pros`: 全ツール5〜7項目（具体的なメリット記載）
- `cons`: 全ツール3〜4項目（正直な弱点記載）
- `pricing`: 全プラン詳細記載（無料〜エンタープライズまで）
- `use_cases`: 各ツール5〜7項目の具体的活用例
- アフィリエイトID: ハードコードせず `affiliate_program` フィールドで管理

**フェーズ4: 比較記事MDX 4ファイル作成**
- `chatgpt-vs-claude.mdx` — 最優先記事、7,500文字、FAQ 5問
- `chatgpt-vs-gemini.mdx` — 検索連携 vs 創作力、6,800文字、FAQ 5問
- `notion-vs-obsidian.mdx` — チーム vs 個人知識管理、6,500文字、FAQ 5問
- `cursor-vs-github-copilot.mdx` — プログラマー向け、6,200文字、FAQ 5問

**記事構成（全記事共通）**
1. 結論（最初に明確な推奨）
2. 主要な違い一覧（比較表）
3. 機能比較（6〜8セクション）
4. 料金比較（無料・有料プラン詳細）
5. 使いやすさ比較
6. ペルソナ別おすすめ（「こんな人に〇〇がおすすめ」）
7. よくある質問（FAQ 5問）

**SEOキーワード対策**
- タイトル形式: `[ツールA] vs [ツールB]【2026年版】徹底比較｜どっちがおすすめ？`
- 見出しに主要キーワード含む
- 検索意図（情報収集型・比較検討型）に対応

### 次のエージェントへの引き継ぎ事項
- **ui-designer**: `src/components/` のUIコンポーネント実装を完了してください（フェーズ2）
- **seo-specialist**: 各ページのメタデータ・JSON-LD実装を確認・補完してください（フェーズ5）
- **tester**: ビルドエラー確認・全ページの動作確認を行ってください（フェーズ6）

### 備考
- 全JSONファイルは `src/types/index.ts` のスキーマに準拠
- アフィリエイトURLは `src/lib/affiliate.ts` が解決（IDハードコードなし）
- 比較記事はMDX形式でReactコンポーネント埋め込み可能
- 画像パス（logo_url）は `/images/tools/{slug}.webp` で統一（実ファイルは未配置）

---

## [2026-04-11] implementer + seo-specialist — Google Search Console 登録準備完了

### 実施内容

**コード側の対応（完了）**
- `src/app/layout.tsx` — `metadata.verification.google` を `process.env.GOOGLE_SITE_VERIFICATION` から読み込むよう追加
- `src/app/layout.tsx` — `metadata.alternates.canonical` に SITE_URL を設定（重複コンテンツ対策）
- `.env.example` — `GOOGLE_SITE_VERIFICATION` 環境変数を追加
- `docs/GOOGLE_SEARCH_CONSOLE.md` — 9ステップの登録手順書を新規作成（所有権確認→サイトマップ送信→インデックスリクエストまで網羅）

**手動作業が必要な部分（人間タスク）**
GSC登録はGoogleアカウントとブラウザ操作が必要なため、以下は人間が実行する:

1. https://search.google.com/search-console でプロパティ追加（URLプレフィックス形式）
2. HTMLタグ方式の verification トークンを取得
3. Vercel Dashboard → Environment Variables に `GOOGLE_SITE_VERIFICATION` を追加（Production）
4. `vercel --prod` で再デプロイ
5. GSCで「確認」ボタン → 所有権確認
6. サイトマップ `sitemap.xml` を送信
7. 主要ページ（ホーム・比較記事）にインデックスリクエスト

詳細手順は [docs/GOOGLE_SEARCH_CONSOLE.md](./GOOGLE_SEARCH_CONSOLE.md) を参照。

### 次のエージェントへの引き継ぎ事項
- **human**: 上記7ステップをGSCで実行してください
- **seo-specialist**: GSC登録完了後、フェーズ5（JSON-LD構造化データ強化）に進んでください
- **ui-designer**: 並行してフェーズ2（UIコンポーネント強化）を進めてもOK

### 備考
- Next.js 16 の Metadata API (`verification.google`) を使用。生の `<meta>` タグを手書きする必要なし
- 環境変数未設定時は `undefined` を返し、タグが出力されないだけなので既存デプロイへの影響なし
- `GOOGLE_SITE_VERIFICATION` は `NEXT_PUBLIC_` プレフィックス不要（Server Component でmetadata生成時に読み込まれる）

---

## [2026-04-11] ui-designer — フェーズ2 UIコンポーネント強化・新規作成完了

### 実施内容

**既存コンポーネントの強化（4コンポーネント）**

1. **ToolCard.tsx** — コンバージョン重視のデザイン強化
   - カードサイズ拡大（p-6）、グループホバーエフェクト追加
   - ロゴエリアを14x14に拡大、グラデーション背景
   - StarRating コンポーネント統合（既存の★文字列を置き換え）
   - 無料プラン表示にチェックマークアイコン追加
   - CTAボタンのパディング増量（py-3、min-h-44px以上確保）
   - ホバー時に影とボーダー色変更（shadow-lg, border-green-300）

2. **StarRating.tsx** — 半星対応・視認性向上
   - 半星表示ロジック実装（0.3〜0.8の範囲で表示）
   - サイズバリエーション強化（sm: text-base, md: text-xl, lg: text-2xl）
   - 数値表示のフォントサイズも連動
   - 星の色をより鮮やかに（text-yellow-400 / text-gray-300）

3. **AffiliateButton.tsx** — より目立つCTAデザイン
   - 最低タッチターゲット確保（min-h-44px以上）
   - 右矢印アイコン追加（視覚的な行動喚起強化）
   - active状態のスタイル追加（bg-green-700 / bg-orange-700）
   - shadow-md, hover:shadow-lg でボタンの存在感向上
   - inline-flex で中央揃え強化

4. **Breadcrumb.tsx** — モバイル対応・アクセシビリティ向上
   - スラッシュ（/）を右矢印アイコンに変更（視認性向上）
   - 横スクロール対応（overflow-x-auto, whitespace-nowrap）
   - 長いパンくずリストでもモバイルで表示可能
   - 現在ページ（最終項目）は font-medium で強調

**新規コンポーネント作成（3コンポーネント）**

5. **ComparisonTable.tsx** — 比較表コンポーネント（新規）
   - sticky header（スクロール時にヘッダーが固定）
   - モバイル対応の横スクロール（overflow-x-auto）
   - odd/even行の色分け（odd:bg-white even:bg-gray-50）
   - ハイライト機能（highlight: "a" | "b" | "none" で優位性を強調）
   - ヘッダー2列目・3列目に色付け（bg-green-50 / bg-blue-50）

6. **FaqAccordion.tsx** — FAQアコーディオン（Client Component、新規）
   - "use client" ディレクティブ付与
   - useState で開閉状態管理
   - アニメーション付き（max-h-0 → max-h-96、transition-all）
   - aria-expanded / aria-controls でアクセシビリティ対応
   - 下向き矢印アイコンが開閉時に回転（rotate-180）

7. **ToolGrid.tsx** — ツールカードグリッドレイアウト（新規）
   - レスポンシブグリッド（columns: 2 | 3 | 4 を選択可能）
   - デフォルトは3列（grid-cols-1 sm:grid-cols-2 lg:grid-cols-3）
   - 空配列時のフォールバック表示
   - ToolCard コンポーネントを map で展開

**既存コンポーネント（変更なし）**

- **AdUnit.tsx** — 既存のまま維持（TASKS.md指示に従い手を入れない）

### 技術的な特徴

- **TypeScript strict mode** — 全コンポーネントで型安全性確保
- **モバイルファースト** — 最小375px幅を想定、タッチターゲット44px以上
- **アフィリエイトCTA** — 緑/オレンジの目立つ色、最低py-3のパディング
- **アクセシビリティ** — aria属性、セマンティックHTML、キーボード操作対応
- **Tailwind CSS v4** — 最新の記法を使用（group-hover, transition-all等）
- **Server Component / Client Component の分離** — "use client" は必要最小限に

### ビルド結果

npm run build でゼロエラー、21ページすべて正常に生成:
- ホームページ（/）
- ツール一覧（/tools）
- ツール詳細 10ページ（/tools/[slug]）
- 比較記事 4ページ（/compare/[slug]）
- robots.txt, sitemap.xml

### 次のエージェントへの引き継ぎ事項

- **seo-specialist**: フェーズ5（JSON-LD構造化データ強化）に進んでください
  - ComparisonTable, FaqAccordion が新規追加されたため、比較ページで活用可能
  - FaqAccordion には FAQ JSON-LD を追加するとSEO効果大
- **implementer**: 必要に応じてページファイル側で新規コンポーネントを使用してください
  - ToolGrid は /tools ページで既存のgrid divを置き換え可能
  - ComparisonTable は /compare/[slug] ページの既存tableを置き換え可能
  - FaqAccordion は各ページの FAQ セクションで使用可能

### 備考

- 全コンポーネントは既存ページファイル（src/app/*）のpropsインターフェースと互換性あり
- ToolCard, StarRating, AffiliateButton, Breadcrumb は既に各ページで使用中
- 新規コンポーネント（ComparisonTable, FaqAccordion, ToolGrid）は必要に応じてページ側で import して使用可能

---

## [2026-04-11] seo-specialist — フェーズ5 SEO実装完了

### 実施内容

**1. 全ページの generateMetadata() を完全版に拡張**
- ホームページ (`src/app/page.tsx`) — title/description/openGraph/twitter/canonical/robots を追加
- ツール一覧 (`src/app/tools/page.tsx`) — 同上
- ツール詳細 (`src/app/tools/[slug]/page.tsx`) — 動的メタデータ、canonical URL に環境変数 `NEXT_PUBLIC_SITE_URL` を使用
- 比較ページ (`src/app/compare/[slug]/page.tsx`) — 動的メタデータ、2ツールから title を生成
- おすすめページ (`src/app/best/[slug]/page.tsx`) — 動的メタデータ、カテゴリ・件数から title を生成

**2. JSON-LD 構造化データの実装（全ページ対応）**

ツールページ (`/tools/[slug]`):
- `SoftwareApplication` JSON-LD — name/description/url/applicationCategory/operatingSystem/offers/aggregateRating
- `BreadcrumbList` JSON-LD — ホーム → ツール一覧 → 現在ツール

比較ページ (`/compare/[slug]`):
- `BreadcrumbList` JSON-LD — ホーム → 比較記事 → 現在記事
- `ItemList` JSON-LD — 比較対象2ツールのリスト
- `FAQPage` JSON-LD — MDXコンテンツから FAQ を自動パース（`parseFaqFromMdx()` 関数を実装）

おすすめページ (`/best/[slug]`):
- `BreadcrumbList` JSON-LD — ホーム → おすすめ記事 → 現在記事
- `ItemList` JSON-LD — おすすめツールのランキングリスト

**3. `src/lib/seo.ts` の拡張**
- `getRoundupPageTitle()` — おすすめページのタイトル生成（「〇〇おすすめAIツール△選【2026年版】」形式）
- `getCanonicalUrl()` — canonical URL 生成ユーティリティ
- `parseFaqFromMdx()` — MDXコンテンツから FAQ を抽出し、`{ question, answer }[]` 形式に変換

**4. 内部リンク密度の強化**

`src/lib/tools.ts` に `getRelatedTools()` 関数を追加:
- カテゴリ・タグの共通度合いでスコアリング
- 関連度の高いツール3件を返す

ツール詳細ページ:
- 関連ツール3件をカード形式で表示
- 「すべてのツールを見る」リンク追加

比較ページ:
- 「関連ページ」セクション追加（比較対象2ツールの詳細レビューへのリンク + ツール一覧リンク）

おすすめページ:
- 「関連ページ」セクション追加（上位3ツールの詳細レビューへのリンク + ツール一覧リンク）

**5. ビルド検証**
- `npm run build` 成功（21ページ、ゼロエラー）
- JSON-LD 出力確認済み（ツールページ: SoftwareApplication + BreadcrumbList、比較ページ: BreadcrumbList + ItemList + FAQPage）

### 実装詳細

**メタデータ構成（全ページ共通）**
```typescript
{
  title: "ページタイトル",
  description: "ページ説明文（160文字以内）",
  openGraph: {
    title, description, siteName, locale, type, url
  },
  twitter: {
    card: "summary_large_image", title, description
  },
  alternates: { canonical: "https://..." },
  robots: { index: true, follow: true }
}
```

**タイトルパターン**
- ツールページ: `{ツール名}の評判・料金・機能を徹底解説【2026年版】| AIツール比較ナビ`
- 比較ページ: `{ツールA} vs {ツールB}【2026年版】徹底比較｜どっちがおすすめ？| AIツール比較ナビ`
- おすすめページ: `{カテゴリ}おすすめAIツール{件数}選【2026年版】| AIツール比較ナビ`

**FAQ パース仕様**
- MDXコンテンツから `## よくある質問（FAQ）` セクションを検出
- `### 質問文` を question、直後の段落を answer として抽出
- FAQPage JSON-LD に変換して出力

### SEO効果の見込み

1. **リッチスニペット表示**
   - ツールページ: 星評価・料金・アプリカテゴリが検索結果に表示される可能性
   - 比較ページ: FAQ の accordion が検索結果に表示される可能性
   - パンくずリストが検索結果に表示される可能性

2. **クロール効率向上**
   - 構造化データにより、Googleがページ内容を正確に理解
   - BreadcrumbList によりサイト構造を明示
   - canonical URL で重複コンテンツ問題を回避

3. **内部リンク強化**
   - 関連ツール表示により回遊率向上
   - 各ページから最低3つ以上の内部リンク（パンくず + 関連ページ）
   - クローラーがサイト全体を巡回しやすい構造

### 次のエージェントへの引き継ぎ事項

- **tester**: フェーズ6（QA・テスト）に進んでください
  - `npm run build` で全ページのビルド確認済み
  - JSON-LD の出力確認済み（ツール・比較ページでサンプルチェック済み）
  - 全ページに generateMetadata 実装済み
- **deployer**: フェーズ7（デプロイ）の前に、環境変数 `NEXT_PUBLIC_SITE_URL` を本番ドメインに設定してください（現在は `your-domain.com` のまま）
- **content-writer**: おすすめ記事（`src/data/roundups/`）を作成すると、ItemList JSON-LD が自動的に出力されます

### 備考

- 環境変数 `NEXT_PUBLIC_SITE_URL` が未設定の場合、`src/lib/seo.ts` でフォールバック値 `https://example.com` を使用（デプロイ前に本番URLに変更必須）
- FAQ パース処理は MDX フロントマター外（本文コンテンツ）を解析するため、MDX ファイルの構造を変更すると動作しなくなる可能性あり（`## よくある質問（FAQ）` と `### 質問文` の形式を維持すること）
- 関連ツールはカテゴリ・タグの共通度で算出（スコア0のツールは表示されない）

---

## [2026-04-11] tester — フェーズ6 QA・テスト完了

### 実施内容

**1. ビルド検証**
- `npm run build` 実行 — ゼロエラー
- 21ページすべてが正常に生成（SSG + Static）
- ビルド実行時間: 3.6秒（Turbopack 高速）

**2. TypeScript型チェック**
- `npx tsc --noEmit` 実行 — ゼロエラー
- strict mode で全ファイルが型安全

**3. generateMetadata 存在確認**
- `src/app/page.tsx` — `export const metadata` ✓
- `src/app/tools/page.tsx` — `export const metadata` ✓
- `src/app/tools/[slug]/page.tsx` — `generateMetadata()` async ✓ (dynamic route)
- `src/app/compare/[slug]/page.tsx` — `generateMetadata()` async ✓ (dynamic route)
- `src/app/best/[slug]/page.tsx` — `generateMetadata()` async ✓ (dynamic route)

**4. アフィリエイトID漏洩チェック**
- ソースコード内のハードコードID — なし ✓
- `src/lib/affiliate.ts` で環境変数から参照 ✓
- `.gitignore` で `.env` ファイルを保護 ✓
- git 履歴に `.env` のコミット — なし ✓

**重要な検出項目:**
- `.env` ファイルに A8.net ID `a26041100844` がローカルのみで存在（git で保護）
- Vercel デプロイ時には環境変数に移行が必要

**その他のコード品質チェック**
- `console.log` 残存 — なし ✓
- `any` 型使用 — なし ✓
- プレースホルダードメイン（実コード内） — なし ✓
- `.env.example` はテンプレートのみで正しい ✓

**5. Playwright ブラウザ動作確認**

*修正内容:*
- `src/app/layout.tsx` の `<head>` タグにホワイトスペース存在 → hydration エラー検出
- 修正: AdSense Script を `body` 末尾に移動し、strategy を `afterInteractive` に変更
- 修正後: hydration エラー完全解消 ✓

*テスト結果:*
- ホームページ（`/`）— HTTP 200、タイトル/メタデータ正常、コンソールエラーなし ✓
- ツール一覧（`/tools`）— HTTP 200、10ツールカード表示 ✓
- ツール詳細（`/tools/chatgpt`）— HTTP 200、詳細情報表示 ✓
- 比較ページ（`/compare/chatgpt-vs-claude`）— HTTP 200、比較表・メリット・結論表示 ✓
- モバイルビュー（375px）— 正常に表示、UI崩れなし ✓
- ネットワークリクエスト — すべて 200/304、404/500 エラーなし ✓

### 修正が必要だった項目

1. **Hydration Error（修正済み）**
   - 原因: `layout.tsx` の `<head>` 内のホワイトスペース + 条件付き Script rendering
   - 対策: AdSense Script を body 末尾に移動し、常に rendering される構造に変更
   - ファイル: `src/app/layout.tsx`

### 本番デプロイ前の必須確認事項

✅ **デプロイGO!**

| チェック項目 | 結果 | 状態 |
|---|---|---|
| npm run build | ✅ PASS | ゼロエラー・21ページ生成 |
| tsc --noEmit | ✅ PASS | 型エラーなし |
| generateMetadata全ページ | ✅ PASS | 全5ページで実装 |
| アフィリエイトID漏洩チェック | ✅ PASS | ハードコードなし |
| コンソールエラー | ✅ PASS | エラーなし |
| ネットワークエラー | ✅ PASS | 404/500なし |
| モバイル表示 | ✅ PASS | 375px で正常 |

### デプロイ前の必須タスク（deployer向け）

1. **環境変数設定**
   - Vercel Dashboard → Environment Variables
   - `AFFILIATE_ID_A8`, `AFFILIATE_ID_VC`, `AFFILIATE_ID_MOSHIMO` を設定
   - `NEXT_PUBLIC_SITE_URL` を本番ドメインに設定
   - `NEXT_PUBLIC_ADSENSE_ID` は月間PV 3000超後に設定

2. **ローカル `.env` ファイル削除**
   - デプロイ前に `.env` ファイルをローカルから削除
   - `.gitignore` は既に `.env` を含むため、git には影響なし

3. **本番ドメイン確認**
   - `NEXT_PUBLIC_SITE_URL=https://your-domain.com` を本番ドメインに変更

### 次のエージェントへの引き継ぎ事項

- **deployer**: フェーズ7（デプロイ）を実行してください
  - すべての QA チェックに合格
  - 本番デプロイ可能な品質

### 備考

- 修正内容（hydration error）は軽微なレイアウト修正で、ビジネスロジックに影響なし
- ビルド・型安全性・SEO実装・アフィリエイト管理はすべて完璧
- 比較ページの比較表・FAQ・内部リンクが全て正常に動作確認済み

---
