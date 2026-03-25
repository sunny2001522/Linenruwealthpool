import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export function MarketIndexPage() {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState<"日" | "周" | "月">("周");

  // 均线显示状态
  const [showShortMA, setShowShortMA] = useState(true);
  const [showLongMA, setShowLongMA] = useState(true);
  const [showLeaderLine, setShowLeaderLine] = useState(true);

  // 模拟大盤数据
  const indexPrice = 22537.25;
  const indexChange = 156.32;
  const indexChangePercent = 0.70;
  const isPositive = indexChange >= 0;

  // 硬編碼顯示數據
  const displayData = {
    date: "2026/02/05",
    open: 22380.50,
    high: 22620.75,
    low: 22350.20,
    close: 22537.25,
    ma20: 22150.80,
    ma100: 21580.45,
    currentLeader: 23650.5,
    prevLeader: 24120.8,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-bold text-base">加權指數</h1>
          <div className="w-6" />
        </div>
      </div>

      {/* 價格 */}
      <div className="px-3 pt-3">
        <div className="flex items-baseline gap-2">
          <span className={`text-4xl font-bold ${isPositive ? "text-[#FE6D73]" : "text-[#9cffd9]"}`}>
            {indexPrice.toFixed(2)}
          </span>
          <span className={`text-sm font-semibold ${isPositive ? "text-[#FE6D73]" : "text-[#9cffd9]"}`}>
            {isPositive ? "▲" : "▼"}{Math.abs(indexChange).toFixed(2)} ({isPositive ? "+" : "-"}{Math.abs(indexChangePercent).toFixed(2)}%)
          </span>
        </div>
      </div>

      {/* Timeframe selector - 日/周/月 */}
      <div className="flex items-center gap-2 px-3 py-2">
        {(["日", "周", "月"] as const).map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              timeframe === tf
                ? "bg-primary text-black"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tf}
          </button>
        ))}
      </div>

      {/* 日期 */}
      <div className="px-4 mb-1">
        <p className="text-xs text-muted-foreground">{displayData.date}</p>
      </div>

      {/* 開高低收 - 4欄排版 */}
      <div className="px-4 mb-2 grid grid-cols-4 gap-2">
        <div className="flex flex-col">
          <span className="text-[10px] text-muted-foreground">開盤</span>
          <span className="text-xs text-foreground font-medium">{displayData.open.toFixed(2)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-muted-foreground">最高</span>
          <span className="text-xs text-[#FE6D73] font-medium">{displayData.high.toFixed(2)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-muted-foreground">最低</span>
          <span className="text-xs text-[#9cffd9] font-medium">{displayData.low.toFixed(2)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-muted-foreground">收盤</span>
          <span className="text-xs text-foreground font-medium">{displayData.close.toFixed(2)}</span>
        </div>
      </div>

      {/* MA + 強勢線 - 三個淡灰底色區塊 */}
      <div className="px-4 mb-2 flex gap-2">
        {/* 短均區塊 */}
        <button onClick={() => setShowShortMA(!showShortMA)}
          className={`flex-1 flex items-start gap-2 p-2 rounded-lg text-left ${!showShortMA ? "opacity-40" : ""}`}
          style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
          <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ borderColor: "#F5C518", backgroundColor: showShortMA ? "#F5C518" : "transparent" }}>
            {showShortMA && (
              <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-medium leading-tight" style={{ color: "#F5C518" }}>短均</span>
            <span className="text-[10px] text-muted-foreground leading-tight">20MA</span>
            <span className="text-xs text-foreground font-medium mt-0.5">{displayData.ma20.toFixed(2)}</span>
          </div>
        </button>

        {/* 長均區塊 */}
        <button onClick={() => setShowLongMA(!showLongMA)}
          className={`flex-1 flex items-start gap-2 p-2 rounded-lg text-left ${!showLongMA ? "opacity-40" : ""}`}
          style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
          <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ borderColor: "#D355F5", backgroundColor: showLongMA ? "#D355F5" : "transparent" }}>
            {showLongMA && (
              <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-medium leading-tight" style={{ color: "#D355F5" }}>長均</span>
            <span className="text-[10px] text-muted-foreground leading-tight">100MA</span>
            <span className="text-xs text-foreground font-medium mt-0.5">{displayData.ma100.toFixed(2)}</span>
          </div>
        </button>

        {/* 強勢線區塊 - 包含當期和前期 */}
        <button onClick={() => setShowLeaderLine(!showLeaderLine)}
          className={`flex-[2] flex items-start gap-2 p-2 rounded-lg text-left ${!showLeaderLine ? "opacity-40" : ""}`}
          style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
          <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ borderColor: "#4A90E2", backgroundColor: showLeaderLine ? "#4A90E2" : "transparent" }}>
            {showLeaderLine && (
              <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-[10px] font-medium leading-tight text-foreground">強勢線</span>
            <div className="flex leading-tight">
              <span className="flex-1 text-[10px] font-medium" style={{ color: "#FFB347" }}>當期領頭羊</span>
              <span className="flex-1 text-[10px] font-medium" style={{ color: "#64B5F6" }}>前期領頭羊</span>
            </div>
            <div className="flex mt-0.5">
              <span className="flex-1 text-xs text-foreground font-medium">{displayData.currentLeader.toFixed(1)}</span>
              <span className="flex-1 text-xs text-foreground font-medium">{displayData.prevLeader.toFixed(1)}</span>
            </div>
          </div>
        </button>
      </div>

      {/* K線圖表 */}
      <div className="px-3" style={{ height: "240px" }}>
        <MarketKLineChart
          showShortMA={showShortMA}
          showLongMA={showLongMA}
          showCurrentLeader={showLeaderLine}
          showPrevLeader={showLeaderLine}
        />
      </div>

      {/* 成交量 */}
      <div className="px-3">
        <div className="flex items-center gap-1 mb-0.5">
          <span className="text-[10px] text-muted-foreground">量</span>
          <span className="text-xs text-foreground font-medium">2,845,123,456</span>
        </div>
        <div style={{ height: "60px" }}>
          <MarketVolumeChart />
        </div>
      </div>

    </div>
  );
}

// 大盤K線圖表組件
function MarketKLineChart({
  showShortMA,
  showLongMA,
  showCurrentLeader,
  showPrevLeader,
}: {
  showShortMA: boolean;
  showLongMA: boolean;
  showCurrentLeader: boolean;
  showPrevLeader: boolean;
}) {
  // 硬編碼的靜態K線數據 - 大盤上漲趨勢，自然變化
  const data = [
    { date: "11/26", open: 20820, close: 21150, high: 21280, low: 20680, ma20: 20600, ma100: 20200, currentLeader: 21500, prevLeader: 21800 },
    { date: "11/27", open: 21100, close: 21050, high: 21220, low: 20920, ma20: 20650, ma100: 20250, currentLeader: 21600, prevLeader: 21900 },
    { date: "11/28", open: 21000, close: 21480, high: 21550, low: 20880, ma20: 20700, ma100: 20300, currentLeader: 21700, prevLeader: 22000 },
    { date: "11/29", open: 21520, close: 21280, high: 21680, low: 21150, ma20: 20750, ma100: 20350, currentLeader: 21750, prevLeader: 22050 },
    { date: "12/02", open: 21250, close: 21750, high: 21820, low: 21100, ma20: 20800, ma100: 20400, currentLeader: 21850, prevLeader: 22150 },
    { date: "12/03", open: 21780, close: 21650, high: 21920, low: 21550, ma20: 20900, ma100: 20450, currentLeader: 21950, prevLeader: 22250 },
    { date: "12/04", open: 21620, close: 22050, high: 22150, low: 21480, ma20: 21000, ma100: 20500, currentLeader: 22100, prevLeader: 22400 },
    { date: "12/05", open: 22100, close: 21880, high: 22250, low: 21780, ma20: 21100, ma100: 20550, currentLeader: 22200, prevLeader: 22500 },
    { date: "12/06", open: 21850, close: 22280, high: 22380, low: 21720, ma20: 21150, ma100: 20600, currentLeader: 22250, prevLeader: 22550 },
    { date: "12/09", open: 22320, close: 22150, high: 22480, low: 22050, ma20: 21250, ma100: 20650, currentLeader: 22350, prevLeader: 22650 },
    { date: "12/10", open: 22100, close: 22580, high: 22680, low: 21980, ma20: 21350, ma100: 20700, currentLeader: 22500, prevLeader: 22800 },
    { date: "12/11", open: 22620, close: 22450, high: 22780, low: 22350, ma20: 21450, ma100: 20750, currentLeader: 22650, prevLeader: 22950 },
    { date: "12/12", open: 22400, close: 22850, high: 22950, low: 22280, ma20: 21500, ma100: 20800, currentLeader: 22700, prevLeader: 23000 },
    { date: "12/13", open: 22900, close: 22720, high: 23050, low: 22620, ma20: 21600, ma100: 20850, currentLeader: 22850, prevLeader: 23150 },
    { date: "12/16", open: 22680, close: 23150, high: 23250, low: 22550, ma20: 21700, ma100: 20900, currentLeader: 23000, prevLeader: 23300 },
    { date: "12/17", open: 23200, close: 23050, high: 23380, low: 22950, ma20: 21750, ma100: 20950, currentLeader: 23050, prevLeader: 23350 },
    { date: "12/18", open: 23000, close: 23420, high: 23520, low: 22880, ma20: 21850, ma100: 21000, currentLeader: 23150, prevLeader: 23450 },
    { date: "12/19", open: 23480, close: 23280, high: 23620, low: 23180, ma20: 21950, ma100: 21050, currentLeader: 23300, prevLeader: 23600 },
    { date: "12/20", open: 23250, close: 23680, high: 23780, low: 23120, ma20: 22000, ma100: 21100, currentLeader: 23350, prevLeader: 23650 },
    { date: "12/23", open: 23720, close: 23550, high: 23880, low: 23450, ma20: 22100, ma100: 21150, currentLeader: 23450, prevLeader: 23750 },
    { date: "12/24", open: 23500, close: 23920, high: 24020, low: 23380, ma20: 22150, ma100: 21200, currentLeader: 23500, prevLeader: 23800 },
    { date: "12/25", open: 23980, close: 23780, high: 24150, low: 23680, ma20: 22200, ma100: 21250, currentLeader: 23550, prevLeader: 23850 },
    { date: "12/26", open: 23750, close: 24180, high: 24280, low: 23620, ma20: 22250, ma100: 21300, currentLeader: 23600, prevLeader: 23900 },
    { date: "12/27", open: 24220, close: 24050, high: 24380, low: 23950, ma20: 22300, ma100: 21350, currentLeader: 23650, prevLeader: 23950 },
    { date: "12/30", open: 24000, close: 24450, high: 24550, low: 23880, ma20: 22350, ma100: 21400, currentLeader: 23700, prevLeader: 24000 },
    { date: "12/31", open: 24500, close: 24320, high: 24680, low: 24220, ma20: 22400, ma100: 21450, currentLeader: 23750, prevLeader: 24050 },
    { date: "01/02", open: 24280, close: 24720, high: 24820, low: 24150, ma20: 22450, ma100: 21500, currentLeader: 23800, prevLeader: 24100 },
    { date: "01/03", open: 24780, close: 24580, high: 24920, low: 24480, ma20: 22500, ma100: 21550, currentLeader: 23850, prevLeader: 24150 },
    { date: "01/06", open: 24550, close: 24950, high: 25050, low: 24420, ma20: 22550, ma100: 21600, currentLeader: 23900, prevLeader: 24200 },
    { date: "01/07", open: 25000, close: 24820, high: 25180, low: 24720, ma20: 22600, ma100: 21650, currentLeader: 23950, prevLeader: 24250 },
    { date: "01/08", open: 24780, close: 25220, high: 25320, low: 24650, ma20: 22650, ma100: 21700, currentLeader: 24000, prevLeader: 24300 },
    { date: "01/09", open: 25280, close: 25080, high: 25450, low: 24980, ma20: 22700, ma100: 21750, currentLeader: 24050, prevLeader: 24350 },
    { date: "01/10", open: 25050, close: 25480, high: 25580, low: 24920, ma20: 22750, ma100: 21800, currentLeader: 24100, prevLeader: 24400 },
    { date: "01/13", open: 25520, close: 25350, high: 25720, low: 25250, ma20: 22800, ma100: 21850, currentLeader: 24150, prevLeader: 24450 },
    { date: "01/14", open: 25300, close: 25750, high: 25850, low: 25180, ma20: 22850, ma100: 21900, currentLeader: 24200, prevLeader: 24500 },
    { date: "01/15", open: 25800, close: 25620, high: 25980, low: 25520, ma20: 22900, ma100: 21950, currentLeader: 24250, prevLeader: 24550 },
    { date: "01/16", open: 25580, close: 26020, high: 26120, low: 25450, ma20: 22950, ma100: 22000, currentLeader: 24300, prevLeader: 24600 },
    { date: "01/17", open: 26080, close: 25880, high: 26250, low: 25780, ma20: 23000, ma100: 22050, currentLeader: 24350, prevLeader: 24650 },
  ];

  const CustomCandlestick = (props: any) => {
    const { x, y, width, height, payload } = props;
    const isRise = payload.close >= payload.open;
    const color = isRise ? "#FE6D73" : "#9cffd9";

    const bodyHeight = (Math.abs(payload.close - payload.open) / (payload.high - payload.low)) * height;
    const bodyY = isRise
      ? y + ((payload.high - payload.close) / (payload.high - payload.low)) * height
      : y + ((payload.high - payload.open) / (payload.high - payload.low)) * height;

    const wickX = x + width / 2;

    return (
      <g>
        <line x1={wickX} y1={y} x2={wickX} y2={y + height} stroke={color} strokeWidth={1} />
        <rect x={x} y={bodyY} width={width} height={Math.max(bodyHeight, 1)} fill={color} stroke={color} strokeWidth={0.5} />
      </g>
    );
  };

  return (
    <div className="relative w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fill: "#666", fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
            tickFormatter={(value, index) => {
              if (index === 0 || index === data.length - 1 || index === Math.floor(data.length / 2)) {
                return value;
              }
              return "";
            }}
          />
          <YAxis
            domain={["auto", "auto"]}
            tick={{ fill: "#666", fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            orientation="left"
            tickFormatter={(value) => value.toFixed(0)}
            width={30}
            tickMargin={0}
          />
          <Tooltip content={() => null} cursor={false} />

          {/* K線 - 先渲染，讓技術線在上層 */}
          <Bar dataKey="high" shape={<CustomCandlestick />} isAnimationActive={false} barSize={6} />

          {/* 短均線（亮黃色）- 加粗 */}
          {showShortMA && (
            <Line type="monotone" dataKey="ma20" stroke="#F5C518" strokeWidth={2.5} dot={false} isAnimationActive={false} />
          )}
          {/* 長均線（柔紫色）- 加粗 */}
          {showLongMA && (
            <Line type="monotone" dataKey="ma100" stroke="#D355F5" strokeWidth={2.5} dot={false} isAnimationActive={false} />
          )}
          {/* 當期領頭羊線（淺橙色）- 實線 */}
          {showCurrentLeader && (
            <Line type="monotone" dataKey="currentLeader" stroke="#FFB347" strokeWidth={2} dot={false} isAnimationActive={false} />
          )}
          {/* 前期領頭羊線（淺藍色）- 實線 */}
          {showPrevLeader && (
            <Line type="monotone" dataKey="prevLeader" stroke="#64B5F6" strokeWidth={2} dot={false} isAnimationActive={false} />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

// 大盤成交量圖表
function MarketVolumeChart() {
  // 與K線數據對應 - isRise 表示該日收盤價 >= 開盤價
  const data = [
    { date: "11/26", volume: 78, isRise: true },
    { date: "11/27", volume: 42, isRise: false },
    { date: "11/28", volume: 92, isRise: true },
    { date: "11/29", volume: 55, isRise: false },
    { date: "12/02", volume: 85, isRise: true },
    { date: "12/03", volume: 48, isRise: false },
    { date: "12/04", volume: 95, isRise: true },
    { date: "12/05", volume: 62, isRise: false },
    { date: "12/06", volume: 75, isRise: true },
    { date: "12/09", volume: 52, isRise: false },
    { date: "12/10", volume: 88, isRise: true },
    { date: "12/11", volume: 45, isRise: false },
    { date: "12/12", volume: 82, isRise: true },
    { date: "12/13", volume: 58, isRise: false },
    { date: "12/16", volume: 95, isRise: true },
    { date: "12/17", volume: 42, isRise: false },
    { date: "12/18", volume: 78, isRise: true },
    { date: "12/19", volume: 55, isRise: false },
    { date: "12/20", volume: 92, isRise: true },
    { date: "12/23", volume: 48, isRise: false },
    { date: "12/24", volume: 85, isRise: true },
    { date: "12/25", volume: 62, isRise: false },
    { date: "12/26", volume: 75, isRise: true },
    { date: "12/27", volume: 52, isRise: false },
    { date: "12/30", volume: 88, isRise: true },
    { date: "12/31", volume: 45, isRise: false },
    { date: "01/02", volume: 82, isRise: true },
    { date: "01/03", volume: 58, isRise: false },
    { date: "01/06", volume: 95, isRise: true },
    { date: "01/07", volume: 42, isRise: false },
    { date: "01/08", volume: 78, isRise: true },
    { date: "01/09", volume: 55, isRise: false },
    { date: "01/10", volume: 92, isRise: true },
    { date: "01/13", volume: 48, isRise: false },
    { date: "01/14", volume: 85, isRise: true },
    { date: "01/15", volume: 62, isRise: false },
    { date: "01/16", volume: 75, isRise: true },
    { date: "01/17", volume: 52, isRise: false },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <YAxis
          tick={{ fill: "#666", fontSize: 10 }}
          tickLine={false}
          axisLine={false}
          orientation="left"
          width={30}
          tickMargin={0}
        />
        <Bar dataKey="volume" isAnimationActive={false} barSize={6}>
          {data.map((entry, index) => (
            <Cell
              key={`volume-cell-${entry.date}-${index}`}
              fill={entry.isRise ? "#FE6D73" : "#9cffd9"}
              opacity={0.7}
            />
          ))}
        </Bar>
      </ComposedChart>
    </ResponsiveContainer>
  );
}
