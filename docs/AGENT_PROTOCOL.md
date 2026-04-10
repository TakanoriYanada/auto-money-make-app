# エージェント通信プロトコル

## 概要

このプロジェクトは複数のClaudeエージェントが協調して開発・運営する。
エージェント間の調整は以下のファイルを共有ステートとして行う。

## 共有ステートファイル

| ファイル | 役割 | 操作 |
|---|---|---|
| `docs/PROGRESS.md` | 完了済み作業のログ | 追記のみ（削除禁止） |
| `docs/TASKS.md` | タスクキュー | Plannerが作成・更新、各エージェントが自分のタスクをチェック |
| `CLAUDE.md` | 全エージェントへの共通ルール | 読み取り専用（Plannerのみ更新可） |

## 作業開始時の手順（全エージェント必須）

```
1. CLAUDE.md を読む
2. docs/PROGRESS.md を読む（何が終わっているか把握）
3. docs/TASKS.md を読む（自分のタスクを確認）
4. src/ の現状を必要に応じて確認する
```

## 作業完了時の手順（全エージェント必須）

```
1. docs/TASKS.md で完了タスクを [ ] → [x] にチェック
2. docs/PROGRESS.md に以下フォーマットで追記:
```

### PROGRESS.md 追記フォーマット

```markdown
## [YYYY-MM-DD HH:MM] [エージェント名] — [完了したタスクの概要]

### 実施内容
- 作業の箇条書き
- 作成・更新したファイル名

### 次のエージェントへの引き継ぎ事項
- 注意点や依存関係など
```

## タスク優先度とブロッカー

依存関係の基本順序:
```
1. types/index.ts（型定義）
   ↓
2. lib/tools.ts, lib/affiliate.ts（データ層）
   ↓
3. app/[page]（ページ）+ components/（UI）  ← 並行可能
   ↓
4. data/tools/, data/comparisons/（コンテンツ）
   ↓
5. SEO監査
   ↓
6. QAテスト
   ↓
7. デプロイ
```

ブロッカーが発生した場合: `docs/TASKS.md` に `⚠️ BLOCKED:` として記録し、`docs/PROGRESS.md` に詳細を追記する。

## ファイル所有権（競合防止）

| エージェント | 担当ディレクトリ |
|---|---|
| implementer | `src/app/`, `src/lib/`, `src/types/`, `next.config.ts` |
| ui-designer | `src/components/`, `tailwind.config.ts` |
| content-writer | `src/data/` |
| seo-specialist | SEO関連コード（`src/app/sitemap.ts`, `src/app/robots.ts`, `src/lib/seo.ts`）|
| tester | 読み取り専用（ファイルを書かない）|
| deployer | `.env.example`, `vercel.json` |
| planner | `docs/TASKS.md`, `docs/ARCHITECTURE.md` |

同一ファイルへの同時編集は避けること。
