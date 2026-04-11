# Google Search Console 登録手順書

Google Search Console（GSC）に本サイトを登録し、サイトマップを送信してGoogleインデックスを加速させる手順。

---

## なぜ必要か

- **インデックス加速**: 新規サイトはクロールされるまで数週間かかる。サイトマップ送信で即時発見される
- **検索順位データ**: どのキーワードで何位に表示されているか可視化できる（アフィリエイト記事の改善に必須）
- **インデックスエラー検知**: robots.txtやnoindexの設定ミスをGoogleが通知してくれる
- **構造化データ検証**: JSON-LDが正しく認識されているかチェックできる

---

## 前提条件

- [ ] Vercel 本番デプロイが完了していること（本番URLが発行済み）
- [ ] `NEXT_PUBLIC_SITE_URL` が Vercel 環境変数に設定されていること
- [ ] Googleアカウントを持っていること

---

## ステップ1: Google Search Console にアクセス

1. ブラウザで https://search.google.com/search-console を開く
2. Googleアカウントでログイン
3. 「プロパティを追加」をクリック

---

## ステップ2: プロパティタイプを選択

Vercelデプロイの場合は **「URL プレフィックス」** を推奨する（サブディレクトリ単位で計測可能）。

- **ドメイン プロパティ**: DNSレコード設定が必要（独自ドメイン取得後に推奨）
- **URL プレフィックス プロパティ**: 本サイトではこちらを選択 ✅

「URL プレフィックス」側の入力欄に本番URLを貼り付け:

```
https://あなたのドメイン.vercel.app
```

または独自ドメインを取得済みなら:

```
https://ai-hikaku-navi.com
```

※ 末尾スラッシュなし、httpsであること

「続行」をクリック。

---

## ステップ3: 所有権の確認（HTMLタグ方式）

複数の確認方法が表示されるので、**「HTML タグ」** を選択する。

以下のようなメタタグが表示される:

```html
<meta name="google-site-verification" content="abcd1234efgh5678ijkl9012mnop3456" />
```

**この `content=` の値だけコピーする**（タグ全体ではなく、トークン文字列のみ）。

例:
```
abcd1234efgh5678ijkl9012mnop3456
```

---

## ステップ4: Vercel 環境変数に登録

### 方法A: Vercel Dashboard から設定（推奨）

1. https://vercel.com/dashboard にログイン
2. プロジェクト `auto-money-make-app` を開く
3. 「Settings」→「Environment Variables」
4. 以下を追加:
   - **Key**: `GOOGLE_SITE_VERIFICATION`
   - **Value**: （ステップ3でコピーしたトークン文字列）
   - **Environments**: Production にチェック
5. 「Save」をクリック

### 方法B: Vercel CLI から設定

```bash
vercel env add GOOGLE_SITE_VERIFICATION production
# プロンプトでトークン文字列を貼り付け
```

---

## ステップ5: 再デプロイ

環境変数の反映には再デプロイが必要。

### Dashboard から:
- Deployments タブ → 最新デプロイの「…」メニュー →「Redeploy」

### CLI から:
```bash
vercel --prod
```

デプロイ完了後、`https://あなたのドメイン/` の HTML ソースに
`<meta name="google-site-verification" content="..." />` が含まれていることを確認。

ブラウザで本番URLを開き、「ページのソースを表示」（右クリック or Cmd+Opt+U）で検索:
```
google-site-verification
```

---

## ステップ6: Search Console で所有権確認

1. Google Search Console のタブに戻る
2. 「確認」ボタンをクリック
3. 「所有権を確認しました」と表示されれば成功 ✅

エラーになる場合:
- デプロイが完了していない → 数分待って再試行
- 環境変数のスコープが Production 以外になっている → Production にチェック
- トークン値にスペースや引用符が混入 → 純粋な英数字のみか確認

---

## ステップ7: サイトマップ送信

本サイトは Next.js の `src/app/sitemap.ts` で動的にサイトマップを生成している。
URL: `https://あなたのドメイン/sitemap.xml`

1. Search Console 左メニュー →「サイトマップ」
2. 「新しいサイトマップの追加」入力欄に以下を入力:
   ```
   sitemap.xml
   ```
   （フルURLではなく、相対パスでOK）
3. 「送信」をクリック
4. 「成功しました」と表示されればOK ✅

送信後、「検出されたURL」に `14` 前後（ホーム + ツール一覧 + ツール10件 + 比較4件）が表示されれば正常。

---

## ステップ8: インデックスリクエスト（任意・高速化用）

主要ページを個別にインデックス申請すると、数時間〜数日で検索結果に表示される。

1. Search Console 上部の検索バーに URL を貼り付け（例: ホームページ）
2. 「インデックス登録をリクエスト」をクリック
3. 以下の優先ページで繰り返す:
   - `/`（ホーム）
   - `/tools`
   - `/compare/chatgpt-vs-claude`
   - `/compare/chatgpt-vs-gemini`
   - `/compare/notion-vs-obsidian`
   - `/compare/cursor-vs-github-copilot`

※ 1日10件程度の上限あり

---

## ステップ9: 数日後の確認事項

登録から **1〜7日後** に以下をチェック:

- [ ] 「カバレッジ」→ エラー0件
- [ ] 「サイトマップ」→ ステータス「成功」、検出URL数が想定通り
- [ ] 「検索結果」→ 表示回数が発生し始める
- [ ] 「拡張」→「構造化データ」でエラー0件（JSON-LDが正しく認識されている証拠）

---

## トラブルシューティング

### 「所有権を確認できませんでした」
- HTMLソースに meta タグが存在するか確認
- 環境変数が Production スコープで設定されているか
- デプロイが完了しているか（Vercel Deployments タブで確認）
- トークン文字列の前後にスペースや改行が入っていないか

### 「サイトマップを取得できませんでした」
- `https://あなたのドメイン/sitemap.xml` に直接アクセスして XML が返るか確認
- `https://あなたのドメイン/robots.txt` に `Sitemap: https://.../sitemap.xml` が含まれているか確認

### 「URLが Google に登録されていません」
- 新規サイトは発見まで時間がかかる（通常 1〜14日）
- インデックスリクエスト（ステップ8）で加速
- 内部リンクが少ないページはクロール優先度が低い → 内部リンク強化（フェーズ5 SEO）

---

## 参考リンク

- [Google Search Console ヘルプ](https://support.google.com/webmasters/)
- [サイトマップについて](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview?hl=ja)
- [構造化データテスト](https://search.google.com/test/rich-results)
