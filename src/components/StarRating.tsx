interface StarRatingProps {
  rating: number;
  showNumber?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function StarRating({
  rating,
  showNumber = true,
  size = "md",
  className = "",
}: StarRatingProps) {
  const sizeMap = {
    sm: { text: "text-base", number: "text-sm" },
    md: { text: "text-xl", number: "text-base" },
    lg: { text: "text-2xl", number: "text-lg" },
  };
  const sizes = sizeMap[size];

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.3 && rating - fullStars < 0.8;
  const emptyStars = hasHalfStar ? 4 - fullStars : 5 - fullStars;

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className={`flex items-center gap-0.5 ${sizes.text}`}>
        {Array.from({ length: fullStars }).map((_, i) => (
          <span key={`full-${i}`} className="text-green-500">
            ★
          </span>
        ))}
        {hasHalfStar && (
          <span className="relative text-gray-300">
            ★
            <span className="absolute inset-0 overflow-hidden text-green-500" style={{ width: '50%' }}>
              ★
            </span>
          </span>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300">
            ★
          </span>
        ))}
      </span>
      {showNumber && (
        <span className={`text-gray-600 font-medium ${sizes.number}`}>{rating.toFixed(1)}</span>
      )}
    </span>
  );
}
