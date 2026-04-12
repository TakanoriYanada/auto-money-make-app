"use client";

import { useState } from "react";

type IconSize = "sm" | "md" | "lg";

interface ToolIconProps {
  iconUrl: string | null;
  name: string;
  /** 表示サイズ。sm = 40px, md = 48px, lg = 56px (default) */
  size?: IconSize;
}

const SIZE_MAP: Record<
  IconSize,
  { box: string; image: string; imagePx: number; fallbackText: string }
> = {
  sm: { box: "w-10 h-10 rounded-lg", image: "w-7 h-7", imagePx: 64, fallbackText: "text-base" },
  md: { box: "w-12 h-12 rounded-xl", image: "w-8 h-8", imagePx: 96, fallbackText: "text-xl" },
  lg: { box: "w-14 h-14 rounded-xl", image: "w-10 h-10", imagePx: 128, fallbackText: "text-2xl" },
};

/**
 * ツールアイコン表示コンポーネント。
 * Google Favicon API から取得したアイコンを表示し、
 * 読み込み失敗時は頭文字1文字のフォールバックに切り替える。
 */
export default function ToolIcon({ iconUrl, name, size = "lg" }: ToolIconProps) {
  const [failed, setFailed] = useState(false);
  const showFallback = !iconUrl || failed;
  const sizes = SIZE_MAP[size];

  return (
    <div
      className={`${sizes.box} bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center shrink-0 border border-gray-200 group-hover:border-green-400 transition-colors overflow-hidden`}
    >
      {showFallback ? (
        <span className={`${sizes.fallbackText} font-bold text-gray-700`}>{name.charAt(0)}</span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={iconUrl}
          alt={`${name} ロゴ`}
          width={sizes.imagePx}
          height={sizes.imagePx}
          loading="lazy"
          decoding="async"
          className={`${sizes.image} object-contain`}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
