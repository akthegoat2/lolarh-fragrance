import { Star, StarHalf } from "lucide-react";

export default function Stars({ rating = 0 }: { rating?: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`full-${i}`} size={14} className="fill-amber-400 text-amber-400" />
      ))}
      {hasHalf && <StarHalf key="half" size={14} className="fill-amber-400 text-amber-400" />}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`empty-${i}`} size={14} className="text-gray-300" />
      ))}
    </div>
  );
}
