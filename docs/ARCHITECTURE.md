# アーキテクチャ設計

## システム概要

ファイルベースのコンテンツ管理システムを採用したNext.js 15製アフィリエイトサイト。
DBを使わず、JSONとMDXファイルがコンテンツのソースオブトゥルース。

## 技術選定理由

### Next.js 15 (App Router)
- SSG/ISRによるSEO最強構成
- Vercel公式サポートでデプロイが単純
- React Server ComponentsでDB不要のデータ取得が書きやすい

### ファイルベースコンテンツ
- DBのセットアップ・マイグレーション不要
- エージェントがJSONファイルを書くだけでコンテンツ追加できる
- Gitで変更履歴が追える

### Tailwind CSS v4
- ランタイムCSSゼロ
- ビルド後のCSSサイズが最小

## データフロー

```
src/data/tools/chatgpt.json
        ↓
src/lib/tools.ts (getToolBySlug, getAllTools)
        ↓
src/app/tools/[slug]/page.tsx (Server Component)
        ↓
src/components/ToolCard.tsx, AffiliateButton.tsx
        ↓
HTML配信（静的生成 + ISR）
```

## アフィリエイトURL解決フロー

```
src/data/tools/xxx.json
  { "affiliate_program": "a8", "affiliate_program_id": "tool-id" }
        ↓
src/lib/affiliate.ts
  buildAffiliateUrl(program, id)
  → 環境変数 AFFILIATE_ID_A8 を組み合わせてURL生成
        ↓
src/components/AffiliateButton.tsx
  href={affiliateUrl} target="_blank" rel="noopener sponsored"
```

## ページ構成とURL設計

| URL | ページ | コンテンツソース | ISR |
|---|---|---|---|
| `/` | ホーム（注目ツール・最新比較） | tools/ + comparisons/ | 1h |
| `/tools` | ツール一覧 | tools/ | 24h |
| `/tools/[slug]` | ツール詳細レビュー | tools/[slug].json | 24h |
| `/compare/[slug]` | ツール比較（vsページ） | comparisons/[slug].mdx | 7d |
| `/best/[slug]` | おすすめ記事 | roundups/[slug].mdx | 7d |

## コンポーネント設計方針

- **Server Components（デフォルト）**: データフェッチ・静的表示
- **Client Components（`'use client'` 必要な場合のみ）**: クリック追跡・インタラクション
- `AffiliateButton.tsx` はクリックイベントのためClient Component
- `AdUnit.tsx` はAdSenseスクリプトのためClient Component

## 環境変数一覧

| 変数名 | 必須 | 説明 |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | ✅ | 本番ドメイン（例: https://ai-hikaku-navi.com）|
| `AFFILIATE_ID_A8` | ✅ | A8.net会員ID |
| `AFFILIATE_ID_VC` | ✅ | バリューコマースID |
| `AFFILIATE_ID_MOSHIMO` | ✅ | もしもアフィリエイトID |
| `NEXT_PUBLIC_ADSENSE_ID` | ⬜ | Google AdSense Publisher ID（後で追加可） |

## SEO戦略

- JSON-LD構造化データで全ページリッチスニペット対応
- `<link rel="canonical">` で重複コンテンツ防止
- 動的サイトマップで全ページをインデックスさせる
- 内部リンクで PageRank を分配
