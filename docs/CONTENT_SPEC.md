# コンテンツスキーマ仕様

## ツールJSONスキーマ（`src/data/tools/[slug].json`）

```typescript
interface Tool {
  // 基本情報
  slug: string;               // URL用スラッグ（例: "chatgpt"）
  name: string;               // 表示名（例: "ChatGPT"）
  tagline: string;            // キャッチコピー（50文字以内）
  description: string;        // 詳細説明（200文字以上・キーワード含む）
  logo_url: string;           // "/images/tools/{slug}.webp"
  website_url: string;        // 公式サイトURL
  
  // アフィリエイト情報
  affiliate_program: "a8" | "vc" | "moshimo" | "direct" | "none";
  affiliate_program_id: string; // ASPでのプログラムID（なければ空文字）
  affiliate_url_override?: string; // 直接URLが必要な場合のみ
  commission_type: "recurring" | "one_time" | "flat" | "none";
  commission_rate: string;    // 例: "30%再発" "1,000円/件"
  
  // カテゴリ・タグ
  categories: string[];       // 例: ["ai-writing", "productivity"]
  use_cases: string[];        // 例: ["ブログ執筆", "メール作成"]
  tags: string[];             // 検索・フィルタ用タグ
  
  // レビュー情報
  rating: number;             // 0.0 〜 5.0（小数点1桁）
  pros: string[];             // 5項目以上
  cons: string[];             // 3項目以上
  
  // 料金
  pricing: PricingTier[];
  has_free_plan: boolean;
  starting_price_jpy?: number; // 最安プランの月額円（0なら無料）
  
  // メタ情報
  last_updated: string;       // ISO日付 "2026-04-11"
  featured: boolean;          // ホームページ掲載フラグ
  status: "active" | "discontinued"; // ツールが現役かどうか
}

interface PricingTier {
  name: string;               // プラン名（例: "Free", "Pro"）
  price_jpy?: number;         // 月額円（未定の場合は省略）
  price_usd?: number;         // 月額ドル
  billing: "monthly" | "annual" | "one_time" | "free";
  features: string[];         // このプランの主要機能
}
```

## カテゴリ一覧（統一表記）

| カテゴリID | 表示名 |
|---|---|
| `ai-writing` | AIライティング |
| `ai-coding` | AIコーディング |
| `ai-image` | AI画像生成 |
| `ai-video` | AI動画生成 |
| `ai-chat` | AIチャット |
| `productivity` | 生産性向上 |
| `note-taking` | ノートアプリ |
| `design` | デザインツール |
| `seo-tool` | SEOツール |
| `marketing` | マーケティング |

## 比較記事MDXスキーマ（`src/data/comparisons/[slug].mdx`）

フロントマター:
```yaml
---
title: "ChatGPT vs Claude【2026年版】徹底比較｜どっちがおすすめ？"
description: "ChatGPTとClaudeを料金・機能・使いやすさで徹底比較。目的別のおすすめを解説。"
tool_a: chatgpt    # tools/chatgpt.json のslug
tool_b: claude     # tools/claude.json のslug
slug: chatgpt-vs-claude
last_updated: "2026-04-11"
featured: true
---
```

本文必須セクション:
1. **結論（最初に）** — どちらがどんな人に向いているか1段落
2. **比較表** — `<ComparisonTable toolA={toolA} toolB={toolB} />` コンポーネント使用
3. **各ツールの詳細** — 機能・料金・使いやすさ
4. **シーン別おすすめ** — ペルソナ別に推奨
5. **よくある質問（FAQ）** — 3〜5問

## おすすめ記事MDXスキーマ（`src/data/roundups/[slug].mdx`）

フロントマター:
```yaml
---
title: "ライター向けAIツールおすすめ5選【2026年版】"
description: "ブログ・記事執筆に使えるAIライティングツールを厳選して比較。無料プランの有無も解説。"
category: ai-writing
target_user: "ライター・ブロガー"
slug: best-ai-writing-tools-for-writers
tool_slugs: [chatgpt, claude, jasper, copy-ai, perplexity]
last_updated: "2026-04-11"
---
```

本文必須セクション:
1. **選定基準の明示**
2. **各ツール紹介**（アフィリエイトボタン付き）
3. **比較表**
4. **総合まとめ・FAQ**

## ファイル命名規則

| コンテンツ | ファイル名パターン | 例 |
|---|---|---|
| ツール | `{slug}.json` | `chatgpt.json` |
| 比較 | `{slug-a}-vs-{slug-b}.mdx` | `chatgpt-vs-claude.mdx` |
| おすすめ | `best-{category}-for-{usecase}.mdx` | `best-ai-writing-tools-for-writers.mdx` |
