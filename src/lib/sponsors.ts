/**
 * スポンサー広告データ
 *
 * AIツール一覧とは別枠で、サイト全体のマネタイズに貢献するスポンサー広告を管理する。
 * ツールJSONとは分離することで「AI比較コンテンツ」の純度を保ちつつ、
 * レンタルサーバー等の収益性の高い広告を掲載できる。
 */

export interface Sponsor {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: "server" | "learning" | "tool" | "other";
  affiliateProgram: "a8";
  affiliateProgramId: string;
  ctaLabel: string;
  badge?: string;
  active: boolean;
}

export const SPONSORS: Sponsor[] = [
  {
    id: "conoha-wing",
    name: "ConoHa WING",
    tagline: "国内最速の高性能レンタルサーバー",
    description: "AIブログを始めるなら、表示速度No.1のConoHa WING。初期費用無料、月額費用もお得。独自ドメインが無料で使えるため、AIツール比較ブログの開設にも最適です。",
    category: "server",
    affiliateProgram: "a8",
    affiliateProgramId: "4B1ILN+1C84S2+50+5SJPS2",
    ctaLabel: "キャンペーン詳細を見る",
    badge: "最大55％OFF",
    active: true,
  },
  {
    id: "xserver",
    name: "エックスサーバー",
    tagline: "国内シェアNo.1の定番レンタルサーバー",
    description: "運用サイト数250万件突破の国内シェアNo.1レンタルサーバー。高速・高安定性・24時間365日サポートで、初心者から上級者まで幅広く支持されています。AIツールを活用した副業ブログやポートフォリオサイトの運営にも最適です。",
    category: "server",
    affiliateProgram: "a8",
    affiliateProgramId: "4B1ILN+1I6GTU+CO4+61JSI",
    ctaLabel: "公式サイトで詳細を見る",
    badge: "実績No.1",
    active: true,
  },
  {
    id: "mixhost",
    name: "mixhost",
    tagline: "国内最速クラスの次世代レンタルサーバー",
    description: "LiteSpeed搭載で高速表示を実現するmixhost。初期費用無料・無料独自SSL・自動バックアップ標準装備で、技術的な知識がなくても安心して使えます。AIコンテンツ主体のメディア運営にもぴったりです。",
    category: "server",
    affiliateProgram: "a8",
    affiliateProgramId: "4B1ILN+1JDC1E+3JTE+5YJRM",
    ctaLabel: "公式サイトで詳細を見る",
    badge: "LiteSpeed高速",
    active: true,
  },
  {
    id: "onamae",
    name: "お名前.com",
    tagline: "国内最大級のドメイン登録サービス",
    description: "登録実績2,800万件超の国内最大級ドメイン登録サービス。.com / .jpなど580種類以上のドメインを取り扱い、1円〜のキャンペーンも常時開催。AIツール比較サイトや副業ブログの独自ドメイン取得に最適です。",
    category: "other",
    affiliateProgram: "a8",
    affiliateProgramId: "4B1ILI+9RV7AQ+50+2HHVNM",
    ctaLabel: "ドメインを検索する",
    badge: "1円〜",
    active: true,
  },
  {
    id: "muumuu-domain",
    name: "ムームードメイン",
    tagline: "初心者にやさしい格安ドメイン取得サービス",
    description: "GMOペパボが運営する、初心者にもわかりやすい格安ドメイン取得サービス。.com / .jpはもちろん、個性的なTLDも400種類以上。ロリポップ！レンタルサーバーとの連携もスムーズで、AIブログや副業サイトの立ち上げに最適です。",
    category: "other",
    affiliateProgram: "a8",
    affiliateProgramId: "4B1JDH+79DBCI+348+1BNBJM",
    ctaLabel: "ドメインを探す",
    badge: "初心者向け",
    active: true,
  },
];

export function getActiveSponsors(): Sponsor[] {
  return SPONSORS.filter((s) => s.active);
}

export function getSponsorById(id: string): Sponsor | null {
  return SPONSORS.find((s) => s.id === id) ?? null;
}

export function buildSponsorUrl(sponsor: Sponsor): string {
  if (sponsor.affiliateProgram === "a8") {
    return `https://px.a8.net/svt/ejp?a8mat=${sponsor.affiliateProgramId}`;
  }
  return "#";
}

export function getSponsorImpressionPixelUrl(sponsor: Sponsor): string | null {
  if (sponsor.affiliateProgram === "a8") {
    return `https://www13.a8.net/0.gif?a8mat=${sponsor.affiliateProgramId}`;
  }
  return null;
}
