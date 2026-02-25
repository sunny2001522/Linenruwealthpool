import { Star } from "lucide-react";
import { StarIcon1, StarIcon2, StarIcon3 } from "./StarIcons";

interface RankStarRatingProps {
  score: number; // 0-6
}

export function RankStarRating({ score }: RankStarRatingProps) {
  // 確保分數在0-6範圍內
  const normalizedScore = Math.max(0, Math.min(6, score));
  
  // 根據分數決定星星類型和顏色
  // 6, 5 分: 金色 (StarIcon3)
  // 4, 3 分: 銀色 (StarIcon1)
  // 2, 1 分: 銅色 (StarIcon2)
  // 0 分: 灰色空心星星
  
  const getStarConfig = () => {
    if (normalizedScore >= 5) {
      return {
        StarComponent: StarIcon3,
        color: "#D4AF37", // 金色
      };
    }
    if (normalizedScore >= 3) {
      return {
        StarComponent: StarIcon1,
        color: "#C0C0C0", // 銀色
      };
    }
    if (normalizedScore >= 1) {
      return {
        StarComponent: StarIcon2,
        color: "#CD7F32", // 銅色
      };
    }
    return {
      StarComponent: null,
      color: "hsl(var(--muted-foreground))", // 灰色
    };
  };
  
  const { StarComponent, color } = getStarConfig();
  
  return (
    <div className="flex flex-col items-center justify-center">

      {/* 數字 */}
      <span className="text-[16px] font-medium -mt-0.5" style={{ color }}>
        {normalizedScore}
      </span>
      {/* 星星圖片 */}
      {StarComponent ? (
        <StarComponent className="size-[16px]" />
      ) : (
        <Star className="w-[20px] h-[20px] text-muted-foreground" strokeWidth={1.5} />
      )}
      
      
    </div>
  );
}