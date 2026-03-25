import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

export function MarketIndexPage() {
  const navigate = useNavigate();
  // 均线显示状态
  const [showShortMA, setShowShortMA] = useState(true);
  const [showLongMA, setShowLongMA] = useState(true);
  // 強勢線顯示狀態
  const [showCurrentLeader, setShowCurrentLeader] = useState(true);
  const [showPrevLeader, setShowPrevLeader] = useState(true);
  // 選中的K線數據
  const [selectedBarIndex, setSelectedBarIndex] = useState<number | null>(null);

  // 模拟数据
  const indexPrice = 31801.27;
  const indexChange = -488.54;
  const indexChangePercent = -1.51;
  const isPositive = indexChange >= 0;

  // 模拟K线数据
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

  // 選中或預設顯示的數據
  const displayCandle = selectedBarIndex !== null ? candleData[selectedBarIndex] : candleData[candleData.length - 1];

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex-none bg-background border-b border-border">
        <div className="px-4 py-2 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold">加權指數</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* 價格 - 無背景無框 */}
      <div className="px-3 pt-1">
        <div className="flex items-baseline gap-2">
          <span className={`text-4xl font-bold ${isPositive ? "text-[#FE6D73]" : "text-[#9cffd9]"}`}>
            {indexPrice.toFixed(2)}
          </span>
          <span className={`text-sm font-semibold ${isPositive ? "text-[#FE6D73]" : "text-[#9cffd9]"}`}>
            {isPositive ? "▲" : "▼"}{Math.abs(indexChange).toFixed(2)} ({isPositive ? "+" : "-"}{Math.abs(indexChangePercent).toFixed(2)}%)
          </span>
        </div>
      </div>

      {/* Tabs - 膠囊樣式 */}
      <div className="px-3 py-1">
        <div className="flex items-center gap-0.5 bg-muted/30 rounded-lg p-0.5">
          {[
            { key: "day", label: "日K" },
            { key: "week", label: "週K" },
            { key: "month", label: "月K" },
            { key: "trend", label: "走勢" },
            { key: "discussion", label: "討論區" },
          ].map((tab) => (
            <button
              key={tab.key}
              className={`flex-1 px-2 py-1 rounded-md text-xs font-medium transition-all ${
                tab.key === "week"
                  ? "bg-primary text-black"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 日期 + 開高低收 - 單行緊湊 */}
      <div className="px-3 mb-0.5">
        <p className="text-xs text-muted-foreground">
          <span className="text-foreground font-medium">2026/02/05</span>
          {" "}開 {displayCandle.open}{" "}
          高 <span className="text-[#FE6D73]">{displayCandle.high}</span>{" "}
          低 <span className="text-[#9cffd9]">{displayCandle.low}</span>{" "}
          收 {displayCandle.close}
        </p>
      </div>

      {/* MA 數值 + 強勢線數值 - 2x2 grid */}
      <div className="px-3 mb-0.5 grid grid-cols-2 gap-x-4 gap-y-0 text-xs">
        {showShortMA && (
          <span>
            <span className="text-muted-foreground">MA20 </span>
            <span style={{ color: "#EAB308" }}>{displayCandle.ma20.toFixed(2)}</span>
          </span>
        )}
        {showLongMA && (
          <span>
            <span className="text-muted-foreground">MA100 </span>
            <span style={{ color: "#E040FB" }}>{displayCandle.ma100.toFixed(2)}</span>
          </span>
        )}
        {showCurrentLeader && (
          <span>
            <span className="text-muted-foreground">當期領頭羊 </span>
            <span style={{ color: "#FF9800" }}>46.2</span>
          </span>
        )}
        {showPrevLeader && (
          <span>
            <span className="text-muted-foreground">前期領頭羊 </span>
            <span style={{ color: "#42A5F5" }}>47.36</span>
          </span>
        )}
      </div>

      {/* Chart */}
      <div className="flex-1 px-1 overflow-hidden">
        <div className="h-full relative">
          <svg viewBox="0 0 400 300" className="w-full h-full">
            {/* Y轴网格线和标签 */}
            <line x1="40" y1="0" x2="40" y2="200" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <text x="5" y="25" className="fill-muted-foreground" style={{ fontSize: "8px" }}>32.52K</text>
            <text x="5" y="100" className="fill-muted-foreground" style={{ fontSize: "8px" }}>30.14K</text>
            <text x="5" y="175" className="fill-muted-foreground" style={{ fontSize: "8px" }}>27.75K</text>
            <text x="5" y="200" className="fill-muted-foreground" style={{ fontSize: "8px" }}>25.37K</text>

            {/* MA20 均线 (金色) */}
            {showShortMA && (
              <path d="M 50,120 Q 120,100 200,80 T 350,50" fill="none" stroke="#EAB308" strokeWidth="1.5" />
            )}

            {/* MA100 均线 (洋紅色) */}
            {showLongMA && (
              <path d="M 50,180 Q 120,170 200,140 T 350,100" fill="none" stroke="#E040FB" strokeWidth="1.5" />
            )}

            {/* 當期領頭羊指標（橘色虛線） */}
            {showCurrentLeader && (
              <path d="M 50,150 Q 120,120 200,70 T 350,20" fill="none" stroke="#FF9800" strokeWidth="1.5" strokeDasharray="6 3" />
            )}

            {/* 前期領頭羊指標（藍色虛線） */}
            {showPrevLeader && (
              <path d="M 50,140 Q 120,115 200,65 T 350,15" fill="none" stroke="#42A5F5" strokeWidth="1.5" strokeDasharray="6 3" />
            )}

            {/* K线图 */}
            {candleData.map((candle, i) => {
              const isGreen = candle.close < candle.open;
              const color = isGreen ? "#9cffd9" : "#FE6D73";
              const yScale = 200 / 7000;
              const high = 200 - (candle.high - 25370) * yScale;
              const low = 200 - (candle.low - 25370) * yScale;
              const open = 200 - (candle.open - 25370) * yScale;
              const close = 200 - (candle.close - 25370) * yScale;
              const isSelected = selectedBarIndex === i;

              return (
                <g key={i} onClick={() => setSelectedBarIndex(i)} style={{ cursor: "pointer" }}>
                  {isSelected && (
                    <rect x={candle.x - 8} y="0" width="16" height="200"
                      fill="rgba(74, 144, 226, 0.1)" stroke="rgba(74, 144, 226, 0.3)" strokeWidth="1" />
                  )}
                  <line x1={candle.x} y1={high} x2={candle.x} y2={low} stroke={color} strokeWidth="1" />
                  <rect x={candle.x - 4} y={Math.min(open, close)} width="8"
                    height={Math.abs(close - open) || 1} fill={color} />
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
                { x: 60, h: 20 }, { x: 80, h: 25 }, { x: 100, h: 18 },
                { x: 120, h: 30 }, { x: 140, h: 22 }, { x: 160, h: 28 },
                { x: 180, h: 35 }, { x: 200, h: 32 }, { x: 220, h: 27 },
                { x: 240, h: 40 }, { x: 260, h: 38 }, { x: 280, h: 33 },
                { x: 300, h: 45 }, { x: 320, h: 42 }, { x: 340, h: 50 },
              ].map((bar, i) => (
                <rect key={i} x={bar.x - 3} y={60 - bar.h} width="6" height={bar.h} fill="rgba(150,150,150,0.5)" />
              ))}
              <text x="5" y="10" className="fill-muted-foreground" style={{ fontSize: "8px" }}>619.00M</text>
              <text x="5" y="35" className="fill-muted-foreground" style={{ fontSize: "8px" }}>385.95M</text>
              <text x="5" y="65" className="fill-muted-foreground" style={{ fontSize: "8px" }}>152.05M</text>
            </g>
          </svg>
        </div>
      </div>

      {/* 底部技術線切換 - 簡單圓圈勾選 */}
      <div className="flex-none flex items-center justify-between px-3 py-2 border-t border-border">
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground font-medium">技術線：</span>

          <button onClick={() => setShowShortMA(!showShortMA)} className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: "#EAB308", backgroundColor: showShortMA ? "#EAB308" : "transparent" }}>
              {showShortMA && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
            </div>
            <span className="text-xs text-foreground">短均</span>
          </button>

          <button onClick={() => setShowLongMA(!showLongMA)} className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: "#E040FB", backgroundColor: showLongMA ? "#E040FB" : "transparent" }}>
              {showLongMA && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
            <span className="text-xs text-foreground">長均</span>
          </button>

          <button onClick={() => setShowCurrentLeader(!showCurrentLeader)} className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: "#FF9800", backgroundColor: showCurrentLeader ? "#FF9800" : "transparent" }}>
              {showCurrentLeader && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
            <span className="text-xs text-foreground">當期</span>
          </button>

          <button onClick={() => setShowPrevLeader(!showPrevLeader)} className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: "#42A5F5", backgroundColor: showPrevLeader ? "#42A5F5" : "transparent" }}>
              {showPrevLeader && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
            <span className="text-xs text-foreground">前期</span>
          </button>
        </div>
      </div>
    </div>
  );
}
