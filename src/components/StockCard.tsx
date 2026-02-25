import {
  Flame,
  TrendingUp,
  TrendingDown,
  Heart,
  MinusCircle,
} from "lucide-react";
import { useNavigate } from "react-router";
import {
  StarIcon3,
  StarIcon2,
  StarIconSilver,
} from "./StarIcons";

// 简单的K棒图标组件
function KBarIcon({ isPositive, isNegative }: { isPositive: boolean; isNegative: boolean }) {
  const color = isPositive ? "#FE6D73" : isNegative ? "#9cffd9" : "#888";
  
  return (
    <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 上影线 */}
      <line x1="8" y1="2" x2="8" y2="7" stroke={color} strokeWidth="1.5" />
      {/* K棒实体 */}
      <rect x="4" y="7" width="8" height="10" fill={color} rx="1" />
      {/* 下影线 */}
      <line x1="8" y1="17" x2="8" y2="22" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

interface StockCardProps {
  code: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  trilogyScore: number;
  trilogy1: number;
  trilogy2: number;
  trilogy3: number;
  weeklyDeviation: number;
  hasFlame?: boolean;
  isEditMode?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: (code: string) => void;
}

export function StockCard({
  code,
  name,
  price,
  change,
  changePercent,
  trilogyScore,
  trilogy1,
  trilogy2,
  trilogy3,
  weeklyDeviation,
  hasFlame = false,
  isEditMode = false,
  isFavorite = false,
  onToggleFavorite,
}: StockCardProps) {
  const navigate = useNavigate();
  const isPositive = change > 0;
  const isNegative = change < 0;

  const handleCardClick = () => {
    if (!isEditMode) {
      navigate(`/stock/${code}`);
    }
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(code);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`bg-card border border-border rounded-xl p-3 hover:border-primary/50 hover:shadow-lg transition-all relative ${!isEditMode ? "cursor-pointer" : ""}`}
    >
      {/* 第一行：星星評分 + 股票代码/名称 + 火焰 */}
      <div className="flex items-center justify-between mb-3">
        {/* 左侧：星星評分 */}
        <div className="flex-shrink-0">
          <StarRating score={trilogyScore} />
        </div>

        {/* 中间：股票代码/名称 - 文字居中 */}
        <div className="flex-1 min-w-0 flex flex-col items-center text-center px-2">
          <span className="text-xs text-muted-foreground leading-tight">
            {code}
          </span>
          <span className="font-semibold text-base truncate leading-tight max-w-full">
            {name}
          </span>
        </div>

        {/* 右侧：火焰图标 */}
        <div className="w-5 flex-shrink-0">
          {hasFlame && (
            <Flame className="w-5 h-5 text-chart-2" />
          )}
        </div>
      </div>

      {/* 第二行：价格 */}
      <div className="mb-3">
        <div className="flex items-center gap-2">
          <KBarIcon isPositive={isPositive} isNegative={isNegative} />
          <span
            className={`text-2xl font-bold ${
              isPositive
                ? "text-chart-2"
                : isNegative
                  ? "text-chart-3"
                  : "text-foreground"
            }`}
          >
            {price.toFixed(2)}
          </span>
        </div>
      </div>

      {/* 第三行：涨跌幅 + 涨跌金额 + 爱心（编辑时）*/}
      <div className="flex items-center justify-between">
        {/* 左侧：涨跌信息 */}
        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-semibold ${
              isPositive
                ? "text-chart-2"
                : isNegative
                  ? "text-chart-3"
                  : "text-foreground"
            }`}
          >
            {isPositive ? "▲" : isNegative ? "▼" : "—"}
            {Math.abs(changePercent).toFixed(2)}%
          </span>
          <span
            className={`text-sm font-semibold ${
              isPositive
                ? "text-chart-2"
                : isNegative
                  ? "text-chart-3"
                  : "text-muted-foreground"
            }`}
          >
            {isPositive ? "+" : ""}
            {change.toFixed(2)}
          </span>
        </div>

        {/* 右侧：爱心（编辑模式时）*/}
        <div className="w-5 flex-shrink-0">
          {isEditMode && (
            <div onClick={handleHeartClick}>
              <Heart
                className={`w-5 h-5 transition-all ${
                  isFavorite
                    ? "fill-[#4A90E2] text-[#4A90E2]"
                    : "text-muted-foreground"
                }`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 星星评分组件 - 显示单个星星图标 + 总分
// 金5-6分，银3-4分，铜1-2分
function StarRating({ score }: { score: number }) {
  // 根据分数选择星星颜色和数字颜色
  const getStarConfig = () => {
    if (score >= 5) {
      return {
        icon: <StarIcon3 className="size-[14px]" />, // 金色
        textColor: "#D4AF37", // 金色
      };
    } else if (score >= 3) {
      return {
        icon: <StarIconSilver className="size-[14px]" />, // 银色
        textColor: "#C0C0C0", // 银色
      };
    } else if (score >= 1) {
      return {
        icon: <StarIcon2 className="size-[14px]" />, // 铜色
        textColor: "#CD7F32", // 铜色
      };
    } else {
      // 0分：显示灰色星星
      return {
        icon: (
          <StarIcon3
            className="size-[14px]"
            style={{ filter: "grayscale(100%) opacity(0.3)" }}
          />
        ),
        textColor: "#666", // 灰色
      };
    }
  };

  const config = getStarConfig();

  return (
    <div className="flex flex-col items-center justify-center ">
      <span
        className="text-sm font-bold"
        style={{ color: config.textColor }}
      >
        {score}
      </span>
      {config.icon}
    </div>
  );
}