import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

export function MarketIndexPage() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<"day" | "week" | "month" | "trend" | "discussion">("week"); // 預設為週K
  // 均线显示状态
  const [showShortMA, setShowShortMA] = useState(true); // 短均（黄色）
  const [showLongMA, setShowLongMA] = useState(true); // 长均（蓝色）
  // 選中的K線數據
  const [selectedBarIndex, setSelectedBarIndex] = useState<number | null>(null);
  
  // 模拟数据
  const indexPrice = 31801.27;
  const indexChange = -488.54;
  const indexChangePercent = -1.51;
  const isPositive = indexChange >= 0;

  // 模拟K线数据（简化版）
  const candleData = [
    { x: 50, high: 27063, low: 26500, open: 27000, close: 26800, date: "11/26", ma20: 26850, ma100: 26200 },
    { x: 80, high: 28000, low: 27200, open: 27300, close: 27800, date: "12/03", ma20: 27450, ma100: 26500 },
    { x: 110, high: 29000, low: 28100, open: 28200, close: 28900, date: "12/10", ma20: 28300, ma100: 26900 },
    { x: 140, high: 30000, low: 29200, open: 29300, close: 29800, date: "12/17", ma20: 29100, ma100: 27300 },
    { x: 170, high: 30500, low: 29600, open: 29700, close: 30300, date: "12/24", ma20: 29850, ma100: 27700 },
    { x: 200, high: 31200, low: 30100, open: 30300, close: 31000, date: "12/31", ma20: 30550, ma100: 28100 },
    { x: 230, high: 31800, low: 30900, open: 31000, close: 31600, date: "01/07", ma20: 31200, ma100: 28500 },
    { x: 260, high: 32300, low: 31400, open: 31600, close: 32100, date: "01/14", ma20: 31750, ma100: 28900 },
    { x: 290, high: 32700, low: 31800, open: 32100, close: 32500, date: "01/21", ma20: 32200, ma100: 29300 },
    { x: 320, high: 32100, low: 31000, open: 32000, close: 31400, date: "01/28", ma20: 31900, ma100: 29700 },
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex-none bg-background border-b border-border">
        <div className="px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold">加權指數</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      {/* Price Info */}
      <div className="flex-none px-4 pt-4 pb-3">
        <div className="bg-card border border-border rounded-xl p-4">
          {/* 价格和涨跌 */}
          <div className="flex items-baseline gap-3 mb-4">
            <span className={`text-4xl font-bold ${isPositive ? "text-[#FE6D73]" : "text-[#9cffd9]"}`}>
              {indexPrice.toFixed(2)}
            </span>
            <div className="flex gap-2">
              <span className={`text-sm font-semibold ${isPositive ? "text-[#FE6D73]" : "text-[#9cffd9]"}`}>
                {isPositive ? "▲" : "▼"}
                {Math.abs(indexChange).toFixed(2)}
              </span>
              <span className={`text-sm font-semibold ${isPositive ? "text-[#FE6D73]" : "text-[#9cffd9]"}`}>
                {isPositive ? "▲" : "▼"}
                {Math.abs(indexChangePercent).toFixed(2)}%
              </span>
            </div>
          </div>

         
        </div>

        {/* 均线信息 - 可点击切换 - 移到卡片外 */}
        <div className="flex items-center gap-3 mt-3">
          {/* 短均MA20按钮（黄色） */}
          <button
            onClick={() => setShowShortMA(!showShortMA)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all active:scale-95"
            style={{
              borderColor: showShortMA ? '#EAB308' : '#404040',
              backgroundColor: showShortMA ? 'rgba(234, 179, 8, 0.1)' : 'transparent'
            }}
          >
            {/* 打勾框 */}
            <div
              className="w-5 h-5 rounded flex items-center justify-center border-2 transition-all flex-shrink-0"
              style={{
                borderColor: showShortMA ? '#EAB308' : '#404040',
                backgroundColor: showShortMA ? '#EAB308' : 'transparent'
              }}
            >
              {showShortMA && (
                <svg
                  className="w-3.5 h-3.5 text-black"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                  />
                </svg>
              )}
            </div>
            {/* 文字信息 - 垂直排列 */}
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-muted-foreground">短均</span>
              <span className="text-xs font-medium" style={{ color: '#EAB308' }}>MA20</span>
            </div>
            {/* 数值显示 */}
            {showShortMA && (
              <span className="text-sm font-bold text-foreground">
                31638.73
              </span>
            )}
          </button>

          {/* 长均MA100按钮（蓝色） */}
          <button
            onClick={() => setShowLongMA(!showLongMA)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all active:scale-95"
            style={{
              borderColor: showLongMA ? '#3B82F6' : '#404040',
              backgroundColor: showLongMA ? 'rgba(59, 130, 246, 0.1)' : 'transparent'
            }}
          >
            {/* 打勾框 */}
            <div
              className="w-5 h-5 rounded flex items-center justify-center border-2 transition-all flex-shrink-0"
              style={{
                borderColor: showLongMA ? '#3B82F6' : '#404040',
                backgroundColor: showLongMA ? '#3B82F6' : 'transparent'
              }}
            >
              {showLongMA && (
                <svg
                  className="w-3.5 h-3.5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                  />
                </svg>
              )}
            </div>
            {/* 文字信息 - 垂直排列 */}
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-muted-foreground">長均</span>
              <span className="text-xs font-medium" style={{ color: '#3B82F6' }}>MA100</span>
            </div>
            {/* 数值显示 */}
            {showLongMA && (
              <span className="text-sm font-bold text-foreground">
                28326.60
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Period Tabs */}
      <div className="flex-none px-4 pb-3">
        <div className="flex items-center gap-1 bg-muted/30 rounded-lg p-1">
          {[
            { key: "day", label: "日K" },
            { key: "week", label: "週K" },
            { key: "month", label: "月K" },
            { key: "trend", label: "走勢" },
            { key: "discussion", label: "討論區" },
          ].map((period) => (
            <button
              key={period.key}
              onClick={() => setSelectedPeriod(period.key as any)}
              className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                selectedPeriod === period.key
                  ? "bg-primary text-black"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

    

      {/* Chart */}
      <div className="flex-1 px-4 pb-4 overflow-hidden">
        <div className="h-full bg-card border border-border rounded-lg p-4 relative">
          <svg viewBox="0 0 400 300" className="w-full h-full">
            {/* Y轴网格线和标签 */}
            <line x1="40" y1="0" x2="40" y2="200" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <text x="5" y="25" className="text-[8px] fill-muted-foreground">32.52K</text>
            <text x="5" y="100" className="fill-muted-foreground" style={{ fontSize: "8px" }}>30.14K</text>
            <text x="5" y="175" className="fill-muted-foreground" style={{ fontSize: "8px" }}>27.75K</text>
            <text x="5" y="200" className="fill-muted-foreground" style={{ fontSize: "8px" }}>25.37K</text>

            {/* MA20 均线 (金色) - 根据showShortMA控制显示 */}
            {showShortMA && (
              <path
                d="M 50,120 Q 120,100 200,80 T 350,50"
                fill="none"
                stroke="#EAB308"
                strokeWidth="1.5"
              />
            )}

            {/* MA100 均线 (蓝色) - 根据showLongMA控制显示 */}
            {showLongMA && (
              <path
                d="M 50,180 Q 120,170 200,140 T 350,100"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="1.5"
              />
            )}

            {/* K线图 */}
            {candleData.map((candle, i) => {
              const isGreen = candle.close < candle.open;
              const color = isGreen ? "#9cffd9" : "#FE6D73";
              const yScale = 200 / 7000; // 简化比例
              const high = 200 - (candle.high - 25370) * yScale;
              const low = 200 - (candle.low - 25370) * yScale;
              const open = 200 - (candle.open - 25370) * yScale;
              const close = 200 - (candle.close - 25370) * yScale;
              const isSelected = selectedBarIndex === i;
              
              return (
                <g 
                  key={i}
                  onClick={() => setSelectedBarIndex(i)}
                  style={{ cursor: 'pointer' }}
                  className="hover:opacity-80 transition-opacity"
                >
                  {/* 高亮背景（选中时显示） */}
                  {isSelected && (
                    <rect
                      x={candle.x - 8}
                      y="0"
                      width="16"
                      height="200"
                      fill="rgba(74, 144, 226, 0.1)"
                      stroke="rgba(74, 144, 226, 0.3)"
                      strokeWidth="1"
                    />
                  )}
                  {/* 影线 */}
                  <line
                    x1={candle.x}
                    y1={high}
                    x2={candle.x}
                    y2={low}
                    stroke={color}
                    strokeWidth="1"
                  />
                  {/* K线实体 */}
                  <rect
                    x={candle.x - 4}
                    y={Math.min(open, close)}
                    width="8"
                    height={Math.abs(close - open) || 1}
                    fill={color}
                  />
                </g>
              );
            })}

            {/* X轴日期标签 */}
            <text x="60" y="220" className="fill-muted-foreground" style={{ fontSize: "8px" }}>11/26</text>
            <text x="160" y="220" className="fill-muted-foreground" style={{ fontSize: "8px" }}>12/18</text>
            <text x="260" y="220" className="fill-muted-foreground" style={{ fontSize: "8px" }}>2026 01</text>
            <text x="340" y="220" className="fill-muted-foreground" style={{ fontSize: "8px" }}>02/04</text>

            {/* 成交量柱状图 */}
            <g transform="translate(0, 230)">
              {[
                { x: 60, h: 20 },
                { x: 80, h: 25 },
                { x: 100, h: 18 },
                { x: 120, h: 30 },
                { x: 140, h: 22 },
                { x: 160, h: 28 },
                { x: 180, h: 35 },
                { x: 200, h: 32 },
                { x: 220, h: 27 },
                { x: 240, h: 40 },
                { x: 260, h: 38 },
                { x: 280, h: 33 },
                { x: 300, h: 45 },
                { x: 320, h: 42 },
                { x: 340, h: 50 },
              ].map((bar, i) => (
                <rect
                  key={i}
                  x={bar.x - 3}
                  y={60 - bar.h}
                  width="6"
                  height={bar.h}
                  fill="rgba(150,150,150,0.5)"
                />
              ))}
              <text x="5" y="10" className="fill-muted-foreground" style={{ fontSize: "8px" }}>619.00M</text>
              <text x="5" y="35" className="fill-muted-foreground" style={{ fontSize: "8px" }}>385.95M</text>
              <text x="5" y="65" className="fill-muted-foreground" style={{ fontSize: "8px" }}>152.05M</text>
            </g>
          </svg>

          {/* 选中K线的信息卡片 */}
          {selectedBarIndex !== null && candleData[selectedBarIndex] && (
            <div className="absolute top-4 right-4 bg-card border border-border rounded-lg p-3 shadow-lg z-10">
              <p className="text-sm font-semibold text-foreground mb-2">
                {candleData[selectedBarIndex].date}
              </p>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">開盤：</span>
                  <span className="font-medium">{candleData[selectedBarIndex].open.toFixed(2)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">最高：</span>
                  <span className="font-medium text-[#FE6D73]">{candleData[selectedBarIndex].high.toFixed(2)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">最低：</span>
                  <span className="font-medium text-[#9cffd9]">{candleData[selectedBarIndex].low.toFixed(2)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">收盤：</span>
                  <span className={`font-medium ${candleData[selectedBarIndex].close >= candleData[selectedBarIndex].open ? "text-[#FE6D73]" : "text-[#9cffd9]"}`}>
                    {candleData[selectedBarIndex].close.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-border my-1 pt-1" />
                {showShortMA && (
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">MA20：</span>
                    <span className="font-medium" style={{ color: '#EAB308' }}>{candleData[selectedBarIndex].ma20.toFixed(2)}</span>
                  </div>
                )}
                {showLongMA && (
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">MA100：</span>
                    <span className="font-medium" style={{ color: '#3B82F6' }}>{candleData[selectedBarIndex].ma100.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

     
    </div>
  );
}