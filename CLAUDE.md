# AIツール比較ナビ — プロジェクトコンテキスト

## プロジェクト概要

日本語AIツール比較・レビューアフィリエイトサイト。
複数のClaudeエージェントが協調して構築・運営する。

- **サイト名**: AIツール比較ナビ
- **目的**: AIツールの比較・レビュー記事でアフィリエイト収益を得る
- **言語**: 日本語
- **デプロイ**: Vercel

## テックスタック

- **フレームワーク**: Next.js 15 (App Router, TypeScript)
- **スタイリング**: Tailwind CSS v4
- **コンテンツ**: JSONファイル + MDX（DBなし・ファイルベース）
- **デプロイ**: Vercel

## ディレクトリ構成

```
src/
├── app/              # Next.js App Router ページ
├── components/       # Reactコンポーネント
├── data/
│   ├── tools/        # ツール情報JSON (1ファイル1ツール)
│   └── comparisons/  # 比較記事MDX
├── lib/              # ユーティリティ（tools.ts, affiliate.ts, seo.ts）
└── types/            # 共有TypeScript型定義
docs/                 # プロジェクトドキュメント・エージェントログ
.claude/agents/       # サブエージェント定義
```

## エージェントプロトコル（必読）

**すべてのエージェントは作業開始前に必ず行うこと:**
1. `docs/PROGRESS.md` を読んで完了済み作業を把握する
2. `docs/TASKS.md` を読んで自分の担当タスクを確認する

**作業完了後に必ず行うこと:**
1. 完了したタスクを `docs/TASKS.md` でチェック（`[ ]` → `[x]`）
2. 作業サマリーを `docs/PROGRESS.md` に追記する

詳細: `docs/AGENT_PROTOCOL.md`

## アフィリエイトID管理ポリシー（厳守）

- **アフィリエイトIDをソースコードにハードコードしてはならない**
- アフィリエイトURLはすべて `src/lib/affiliate.ts` 経由で解決すること
- アフィリエイトIDは環境変数から読み込む（`.env.local` または Vercel環境変数）

必要な環境変数:
```
AFFILIATE_ID_A8=          # A8.net会員ID
AFFILIATE_ID_VC=          # バリューコマースID
AFFILIATE_ID_MOSHIMO=     # もしもアフィリエイトID
NEXT_PUBLIC_ADSENSE_ID=   # Google AdSense Publisher ID
NEXT_PUBLIC_SITE_URL=     # 本番ドメイン (例: https://ai-hikaku-navi.com)
```

アフィリエイトID取得先: `docs/REVENUE_MODEL.md`

## コーディング規則

- TypeScript strict mode 必須
- Server Componentsでデータフェッチ、Client Componentsはインタラクションのみ
- すべてのページに `generateMetadata()` を実装すること
- 画像はWebP形式、100KB以下
- モバイルファースト設計

## 禁止事項

- アフィリエイトIDのハードコード
- `any` 型の使用
- `console.log` を本番コードに残すこと
- プレースホルダーのアフィリエイトURLでのデプロイ

## Context7 MCP の使い方

実装エージェントはNext.js、Tailwind、React等のドキュメントを参照するとき、Context7 MCPを使うこと:
`use context7` と指示すれば最新APIドキュメントを取得できる。
