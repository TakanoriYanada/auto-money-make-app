"use client";

interface AffiliateButtonProps {
  href: string;
  label: string;
  toolName: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
  className?: string;
}

export default function AffiliateButton({
  href,
  label,
  toolName,
  size = "md",
  variant = "primary",
  className = "",
}: AffiliateButtonProps) {
  const handleClick = () => {
    if (typeof window !== "undefined" && "gtag" in window) {
      (window as Window & { gtag: Function }).gtag("event", "affiliate_click", {
        tool_name: toolName,
        destination: href,
      });
    }
  };

  const sizeClass = {
    sm: "py-2.5 px-5 text-sm min-h-[44px]",
    md: "py-3 px-6 text-base min-h-[48px]",
    lg: "py-4 px-8 text-lg min-h-[52px]",
  }[size];

  const variantClass = {
    primary: "bg-green-500 hover:bg-green-600 active:bg-green-700 text-white shadow-md hover:shadow-lg",
    secondary: "bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white shadow-md hover:shadow-lg",
  }[variant];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener sponsored"
      onClick={handleClick}
      className={`inline-flex items-center justify-center rounded-lg font-bold transition-all duration-200 ${sizeClass} ${variantClass} ${className}`}
    >
      <span>{label}</span>
      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
      </svg>
    </a>
  );
}
