interface MiniStockChartProps {
  trend: "up" | "down";
  pattern: number; // 0-9，用於生成不同的線段形狀
}

export function MiniStockChart({ trend, pattern }: MiniStockChartProps) {
  const color = trend === "up" ? "#FE6D73" : "#9cffd9";
  
  // 根據 pattern 生成不同的路徑
  const patterns = [
    // 上漲型態
    "M2,14 L6,12 L10,8 L14,10 L18,4 L22,6 L26,2", // 0: 波動上漲
    "M2,16 L6,14 L10,12 L14,8 L18,6 L22,4 L26,2", // 1: 穩定上漲
    "M2,12 L6,14 L10,10 L14,8 L18,10 L22,6 L26,2", // 2: 震盪上漲
    "M2,18 L6,16 L10,14 L14,10 L18,6 L22,8 L26,4", // 3: 加速上漲
    "M2,16 L6,12 L10,14 L14,10 L18,8 L22,4 L26,2", // 4: 緩漲
    // 下跌型態
    "M2,2 L6,4 L10,8 L14,6 L18,12 L22,10 L26,16", // 5: 波動下跌
    "M2,2 L6,4 L10,6 L14,10 L18,12 L22,14 L26,16", // 6: 穩定下跌
    "M2,6 L6,4 L10,8 L14,10 L18,8 L22,12 L26,16", // 7: 震盪下跌
    "M2,2 L6,4 L10,6 L14,10 L18,14 L22,12 L26,18", // 8: 加速下跌
    "M2,4 L6,8 L10,6 L14,10 L18,12 L22,14 L26,16", // 9: 緩跌
  ];

  // 根據趨勢選擇合適的 pattern
  let pathIndex = pattern % 10;
  if (trend === "up" && pathIndex > 4) {
    pathIndex = pathIndex % 5;
  } else if (trend === "down" && pathIndex < 5) {
    pathIndex = 5 + (pathIndex % 5);
  }

  return (
    <svg
      width="28"
      height="18"
      viewBox="0 0 28 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <path
        d={patterns[pathIndex]}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
