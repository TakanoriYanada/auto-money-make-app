# デプロイ手順

## 基本情報

| 項目 | 値 |
|---|---|
| ホスティング | Vercel |
| 本番URL | https://aitool-hikaku-navi.com |
| Vercel App URL | https://auto-money-make-app.vercel.app |
| フレームワーク | Next.js 15 (App Router) |
| ビルドコマンド | `npm run build` |

## 本番デプロイ

```bash
# 1. ビルドが通ることを確認
npm run build

# 2. 本番デプロイ
npx vercel --prod
```

デプロイ完了後、ターミナルに本番URLが表示される。

## 環境変数の変更を反映する場合

Next.js の Metadata（タイトル・OGP等）はビルド時に評価される。
Vercel の環境変数を変更した場合、**ビルドキャッシュを無効にして再デプロイ**する必要がある。

```bash
# キャッシュなし再デプロイ（環境変数の変更を確実に反映）
npx vercel --prod --force
```

> Vercel Dashboard からの Redeploy では「Use existing Build Cache」のチェックを外すこと。

## 環境変数一覧

Vercel Dashboard → Settings → Environment Variables で管理。

| 変数名 | 用途 | 必須 |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | 本番ドメイン（canonical URL・OGP等） | Yes |
| `AFFILIATE_ID_A8` | A8.net アフィリエイトID | Yes |
| `AFFILIATE_ID_VC` | バリューコマースID | No（登録後） |
| `AFFILIATE_ID_MOSHIMO` | もしもアフィリエイトID | No（登録後） |
| `NEXT_PUBLIC_ADSENSE_ID` | Google AdSense Publisher ID | No（審査通過後） |
| `GOOGLE_SITE_VERIFICATION` | Google Search Console 認証コード | Yes |

## プレビューデプロイ

本番に出す前に確認したい場合:

```bash
# プレビューデプロイ（本番には影響しない）
npx vercel
```

プレビューURLが発行されるので、ブラウザで確認できる。

## デプロイ後の確認事項

1. **主要ページの表示確認** — トップ・ツール一覧・比較記事・ガイドが正常に表示されるか
2. **OGP確認** — SNSでURLを貼ってプレビューが正しく出るか
3. **GSCインデックス** — 変更したページを Google Search Console の「URL検査」からインデックス登録リクエスト

## トラブルシューティング

### ビルドエラー
```bash
# ローカルでビルドして原因を特定
npm run build
```

### 環境変数が反映されない
- `--force` を付けてデプロイしたか確認
- Vercel Dashboard で対象の環境（Production）に変数が設定されているか確認
- `NEXT_PUBLIC_` プレフィックスが必要な変数にプレフィックスが付いているか確認

### .env ファイルの警告
Vercel ビルド時に `.env` ファイル検出の警告が出るが、Vercel 環境変数で運用しているため無視してよい。
