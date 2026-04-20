# 収益モデル・アフィリエイトプログラム情報

## ⚠️ このファイルはデプロイ前に必ず人間が記入すること

deployer エージェントはこのファイルに `FILL_IN` が残っている場合、デプロイを中止します。

---

## アフィリエイトASP

### A8.net
- **登録URL**: https://www.a8.net/
- **会員ID**: `a26041100844`
- **メモ**: 日本最大のASP。国内SaaSやツールの広告主が多い

### バリューコマース
- **登録URL**: https://www.valuecommerce.ne.jp/
- **パブリッシャーID**: `FILL_IN`
- **メモ**: 大手ECとの相性が良い

### もしもアフィリエイト
- **登録URL**: https://af.moshimo.com/
- **パートナーID（a_id）楽天用**: `5481795`
- **パートナーID（a_id）Amazon用**: `5481797`
- **提携済みプログラム**:
  - 楽天市場（p_id=54, pc_id=54, pl_id=621）
  - Amazon（p_id=170, pc_id=185, pl_id=4161）
- **メモ**: Amazonや楽天商品のアフィリエイトも一括管理できる

---

## 個別ツールのアフィリエイトプログラム

デプロイ後に順次登録して追記していく。

| ツール | ASP / 直接 | プログラムID | 報酬 | 登録URL |
|---|---|---|---|---|
| ChatGPT Plus | - | - | なし | - |
| Claude Pro | - | - | なし | - |
| Notion | - | `FILL_IN` | - | - |
| Canva Pro | A8.net | `FILL_IN` | - | - |
| Adobe Creative Cloud | A8.net | `FILL_IN` | - | - |

---

## Google AdSense

- **Publisher ID**: `FILL_IN` （形式: `ca-pub-XXXXXXXXXX`）
- **申請タイミング**: 月間PV 3,000〜5,000を超えてから申請推奨
- **申請URL**: https://adsense.google.com/

---

## 収益予測（参考）

| 月間PV | アフィリエイト収益（想定） | AdSense収益（想定） |
|---|---|---|
| 1,000 | 1〜3万円 | 200〜500円 |
| 10,000 | 10〜30万円 | 2,000〜5,000円 |
| 100,000 | 100〜300万円 | 2〜5万円 |

アフィリエイト収益はツールの単価・コンバージョン率により大きく変動する。

---

## 環境変数設定方法

```bash
# ローカル開発用（.env.local）
AFFILIATE_ID_A8=your_a8_member_id
AFFILIATE_ID_VC=your_vc_publisher_id
AFFILIATE_ID_MOSHIMO=your_moshimo_partner_id_rakuten
AFFILIATE_ID_MOSHIMO_AMAZON=your_moshimo_partner_id_amazon
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://aitool-hikaku-navi.com

# Vercel本番用
vercel env add AFFILIATE_ID_A8 production
vercel env add AFFILIATE_ID_VC production
vercel env add AFFILIATE_ID_MOSHIMO production
vercel env add AFFILIATE_ID_MOSHIMO_AMAZON production
vercel env add NEXT_PUBLIC_ADSENSE_ID production
vercel env add NEXT_PUBLIC_SITE_URL production
```
