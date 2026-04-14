"use client";

import { useState } from "react";
import Image from "next/image";

type IconSize = "sm" | "md" | "lg" | "xl";

interface ToolIconProps {
  iconUrl: string | null;
  name: string;
  /** 表示サイズ。sm = 40px, md = 48px, lg = 56px, xl = 64px (default: lg) */
  size?: IconSize;
}

const SIZE_MAP: Record<
  IconSize,
  { box: string; image: string; imagePx: number; fallbackText: string }
> = {
  sm: { box: "w-10 h-10 rounded-lg", image: "w-7 h-7", imagePx: 64, fallbackText: "text-base" },
  md: { box: "w-12 h-12 rounded-xl", image: "w-8 h-8", imagePx: 96, fallbackText: "text-xl" },
  lg: { box: "w-14 h-14 rounded-xl", image: "w-10 h-10", imagePx: 128, fallbackText: "text-2xl" },
  xl: { box: "w-16 h-16 rounded-2xl", image: "w-12 h-12", imagePx: 128, fallbackText: "text-3xl" },
};

/**
 * ツールアイコン表示コンポーネント。
 * next/image でローカル画像・外部URL（Google Favicon等）を最適化して表示。
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
        <Image
          src={iconUrl}
          alt={`${name} ロゴ`}
          width={sizes.imagePx}
          height={sizes.imagePx}
          className={`${sizes.image} object-contain`}
          onError={() => setFailed(true)}
          unoptimized={iconUrl.startsWith("https://www.google.com/")}
        />
      )}
    </div>
  );
}
