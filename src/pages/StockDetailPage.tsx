import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  Heart,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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
import { generateMockStocks } from "../lib/stockData";
import { AddToWatchlistModal } from "../components/AddToWatchlistModal";
import { isInAnyWatchlist } from "../lib/watchlistStorage";

type Tab = "kline" | "realtime" | "info" | "growth";

// 生成股票數據
const stocks = generateMockStocks();

export function StockDetailPage() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("kline");
  const [timeframe, setTimeframe] = useState<"日" | "周" | "月" | "年">("周");
  const [showGroupModal, setShowGroupModal] = useState(false);

  // 找到對應的股票
  const stock = stocks.find((s) => s.code === code);
  const currentIndex = stocks.findIndex((s) => s.code === code);

  const goToPrevStock = () => {
    if (currentIndex > 0) {
      navigate(`/stock/${stocks[currentIndex - 1].code}`, { replace: true });
    }
  };

  const goToNextStock = () => {
    if (currentIndex < stocks.length - 1) {
      navigate(`/stock/${stocks[currentIndex + 1].code}`, { replace: true });
    }
  };

  if (!stock) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">股票不存在</h2>
          <button
            onClick={() => navigate(-1)}
            className="text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
  }

  // 檢查是否在自選股中
  const isFavorite = isInAnyWatchlist(stock.code).length > 0;

  const isPositive = stock.change > 0;
  const isNegative = stock.change < 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate("/")}
            className="text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={goToPrevStock}
              disabled={currentIndex <= 0}
              className="text-foreground/60 hover:text-primary disabled:text-foreground/20 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h1 className="font-bold text-base">
              ({stock.code}) {stock.name}
            </h1>
            <button
              onClick={goToNextStock}
              disabled={currentIndex >= stocks.length - 1}
              className="text-foreground/60 hover:text-primary disabled:text-foreground/20 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGroupModal(true)}
              className="text-foreground hover:text-primary transition-colors"
            >
              <Heart
                className={`w-6 h-6 transition-all ${
                  isFavorite
                    ? "fill-[#4A90E2] text-[#4A90E2]"
                    : "text-muted-foreground"
                }`}
              />
            </button>
            <button
              onClick={() => navigate("/search")}
              className="text-foreground hover:text-primary transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* 價格 - 無背景無框，直接顯示 */}
      <div className="px-3 pt-3">
        <div className="flex items-baseline gap-2">
          <span className={`text-4xl font-bold ${isPositive ? "text-[#FE6D73]" : isNegative ? "text-[#9cffd9]" : "text-foreground"}`}>
            {stock.price.toFixed(2)}
          </span>
          <span className={`text-sm font-semibold ${isPositive ? "text-[#FE6D73]" : isNegative ? "text-[#9cffd9]" : "text-muted-foreground"}`}>
            {isPositive ? "▲" : isNegative ? "▼" : "—"}{Math.abs(stock.change).toFixed(2)} ({isPositive ? "+" : isNegative ? "-" : ""}{Math.abs(stock.changePercent).toFixed(2)}%)
          </span>
        </div>
      </div>

      {/* Tabs - 底線樣式 */}
      <div className="px-3 py-1">
        <div className="flex items-center border-b border-muted-foreground/30">
          {[
            { key: "kline", label: "K棒" },
            { key: "realtime", label: "即時" },
            { key: "info", label: "基本資訊" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as Tab)}
              className={`flex-1 px-2 py-2 text-sm font-medium transition-all border-b-2 -mb-[1px] ${
                activeTab === tab.key
                  ? "text-primary border-primary"
                  : "text-muted-foreground hover:text-foreground border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeframe selector - only show for K棒 tab */}
      {activeTab === "kline" && (
        <div className="flex items-center gap-2 px-3 py-1">
          {(["日", "周", "月", "年"] as const).map((tf) => (
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
      )}

      {/* Content */}
      <div className="px-1 pt-1">
        {activeTab === "kline" && (
          <KLineTab
            stock={stock}
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
          />
        )}
        {activeTab === "realtime" && (
          <RealtimeTab stock={stock} />
        )}
        {activeTab === "info" && <InfoTab stock={stock} />}
        {activeTab === "growth" && <GrowthTab />}
      </div>

      {/* 加入自選股彈窗 */}
      <AddToWatchlistModal
        isOpen={showGroupModal}
        onClose={() => setShowGroupModal(false)}
        stockCode={stock.code}
        stockName={stock.name}
      />
    </div>
  );
}

// K線分頁
function KLineTab({
  stock,
  timeframe,
  onTimeframeChange,
}: {
  stock: any;
  timeframe: string;
  onTimeframeChange: (tf: any) => void;
}) {
  // 均线显示状态
  const [showShortMA, setShowShortMA] = useState(true); // 短均（黄色）
  const [showLongMA, setShowLongMA] = useState(true); // 长均（洋紅色）
  // 強勢線顯示狀態
  const [showLeaderLine, setShowLeaderLine] = useState(true); // 強勢線（當期+前期）

  // 硬編碼顯示數據
  const displayData = {
    date: "2026/02/05",
    open: 323.40,
    high: 336.60,
    low: 320.10,
    close: 330.00,
    ma20: 313.50,
    ma100: 280.50,
    currentLeader: 369.6,
    prevLeader: 379.5,
  };

  return (
    <div>
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
            <span className="text-[10px] font-medium leading-tight" style={{ color: "#4A90E2" }}>強勢線</span>
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
        <KLineChart
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
          <span className="text-xs text-foreground font-medium">71,287,914,000</span>
        </div>
        <div style={{ height: "60px" }}>
          <VolumeChart />
        </div>
      </div>

    </div>
  );
}

// 即時分頁
function RealtimeTab({ stock }: { stock: any }) {
  return (
    <div>
      {/* 即時圖表 */}
      <div
        className="bg-black rounded-lg p-3 mb-4"
        style={{ height: "520px" }}
      >
        <RealtimeChart stock={stock} />
      </div>
    </div>
  );
}

// 基本資訊分頁
function InfoTab({ stock }: { stock: any }) {
  const infoItems = [
    { label: "公司名稱", value: stock.name },
    { label: "公司全稱", value: `${stock.name}, Inc.` },
    { label: "產業類別", value: stock.industry },
    { label: "最新季報", value: "2025/Q3" },
    { label: "最新年報", value: "-" },
    { label: "成立日期", value: "-" },
    { label: "上市日期", value: "2005/10/06" },
    { label: "市值", value: "6.45 億" },
    { label: "董事長", value: "Mitchel B. Sayare" },
    { label: "執行長", value: "Vipin K. Garg" },
    {
      label: "財務長",
      value: "Mr. Gregory L. Weaver CPA, M.B.A.",
    },
  ];

  return (
    <div>
      <div className="space-y-0 border-t border-border">
        {infoItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-4 border-b border-border"
          >
            <span className="text-sm text-muted-foreground">
              {item.label}
            </span>
            <span className="text-sm font-medium text-foreground text-right max-w-[60%]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 營收成長分頁
function GrowthTab() {
  return (
    <div className="text-center py-12 text-muted-foreground">
      營收成長數據待開發
    </div>
  );
}

// K線圖表組件（使用 recharts 完整實現）- 硬編碼靜態數據
function KLineChart({
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
  // 硬編碼的靜態K線數據 - 自然的上漲趨勢，每根K棒長度不同
  const data = [
    { date: "11/26", open: 28.2, close: 29.8, high: 30.5, low: 27.1, ma20: 27, ma100: 25, currentLeader: 32, prevLeader: 34 },
    { date: "11/27", open: 29.5, close: 30.2, high: 31.0, low: 29.0, ma20: 27.5, ma100: 25.2, currentLeader: 32.5, prevLeader: 34.2 },
    { date: "11/28", open: 30.0, close: 32.5, high: 33.2, low: 29.3, ma20: 28, ma100: 25.5, currentLeader: 33, prevLeader: 34.5 },
    { date: "11/29", open: 32.8, close: 31.2, high: 33.5, low: 30.5, ma20: 28.5, ma100: 25.8, currentLeader: 33.5, prevLeader: 34.8 },
    { date: "12/02", open: 31.0, close: 34.5, high: 35.2, low: 30.2, ma20: 29, ma100: 26, currentLeader: 34, prevLeader: 35 },
    { date: "12/03", open: 34.2, close: 35.8, high: 36.5, low: 33.8, ma20: 29.5, ma100: 26.3, currentLeader: 35, prevLeader: 36 },
    { date: "12/04", open: 35.5, close: 34.2, high: 36.8, low: 33.5, ma20: 30, ma100: 26.5, currentLeader: 36, prevLeader: 37 },
    { date: "12/05", open: 34.0, close: 38.2, high: 39.0, low: 33.5, ma20: 30.5, ma100: 26.8, currentLeader: 37, prevLeader: 38 },
    { date: "12/06", open: 38.5, close: 37.0, high: 39.5, low: 36.2, ma20: 31, ma100: 27, currentLeader: 38, prevLeader: 39 },
    { date: "12/09", open: 36.8, close: 40.5, high: 41.2, low: 36.0, ma20: 31.5, ma100: 27.3, currentLeader: 39, prevLeader: 40 },
    { date: "12/10", open: 40.2, close: 42.8, high: 43.5, low: 39.5, ma20: 32, ma100: 27.5, currentLeader: 40, prevLeader: 41 },
    { date: "12/11", open: 43.0, close: 41.5, high: 44.2, low: 40.8, ma20: 33, ma100: 28, currentLeader: 42, prevLeader: 43 },
    { date: "12/12", open: 41.2, close: 45.8, high: 46.5, low: 40.5, ma20: 34, ma100: 28.5, currentLeader: 44, prevLeader: 45 },
    { date: "12/13", open: 46.0, close: 48.2, high: 49.0, low: 45.2, ma20: 35, ma100: 29, currentLeader: 46, prevLeader: 47 },
    { date: "12/16", open: 48.5, close: 47.0, high: 49.8, low: 46.0, ma20: 36, ma100: 29.5, currentLeader: 48, prevLeader: 49 },
    { date: "12/17", open: 46.8, close: 52.5, high: 53.2, low: 46.0, ma20: 38, ma100: 30, currentLeader: 50, prevLeader: 51 },
    { date: "12/18", open: 52.8, close: 51.2, high: 54.0, low: 50.5, ma20: 40, ma100: 31, currentLeader: 52, prevLeader: 53 },
    { date: "12/19", open: 51.0, close: 55.8, high: 56.5, low: 50.2, ma20: 42, ma100: 32, currentLeader: 54, prevLeader: 55 },
    { date: "12/20", open: 56.0, close: 54.2, high: 57.5, low: 53.5, ma20: 44, ma100: 33, currentLeader: 56, prevLeader: 57 },
    { date: "12/23", open: 54.0, close: 58.5, high: 59.2, low: 53.2, ma20: 46, ma100: 34, currentLeader: 58, prevLeader: 59 },
    { date: "12/24", open: 58.8, close: 57.2, high: 60.0, low: 56.5, ma20: 48, ma100: 35, currentLeader: 60, prevLeader: 61 },
    { date: "12/25", open: 57.0, close: 61.5, high: 62.2, low: 56.2, ma20: 50, ma100: 36, currentLeader: 61, prevLeader: 62 },
    { date: "12/26", open: 61.8, close: 60.0, high: 63.0, low: 59.2, ma20: 51, ma100: 37, currentLeader: 62, prevLeader: 63 },
    { date: "12/27", open: 59.8, close: 64.2, high: 65.0, low: 59.0, ma20: 52, ma100: 38, currentLeader: 63, prevLeader: 64 },
    { date: "12/30", open: 64.5, close: 63.0, high: 66.0, low: 62.2, ma20: 53, ma100: 39, currentLeader: 64, prevLeader: 65 },
    { date: "12/31", open: 62.8, close: 68.5, high: 69.2, low: 62.0, ma20: 54, ma100: 40, currentLeader: 65, prevLeader: 66 },
    { date: "01/02", open: 69.0, close: 67.2, high: 70.5, low: 66.5, ma20: 55, ma100: 41, currentLeader: 67, prevLeader: 68 },
    { date: "01/03", open: 67.0, close: 72.8, high: 73.5, low: 66.2, ma20: 56, ma100: 42, currentLeader: 68, prevLeader: 69 },
    { date: "01/06", open: 73.2, close: 71.0, high: 74.5, low: 70.2, ma20: 57, ma100: 43, currentLeader: 69, prevLeader: 70 },
    { date: "01/07", open: 70.8, close: 75.5, high: 76.2, low: 70.0, ma20: 58, ma100: 44, currentLeader: 70, prevLeader: 71 },
    { date: "01/08", open: 75.8, close: 74.0, high: 77.0, low: 73.2, ma20: 59, ma100: 45, currentLeader: 71, prevLeader: 72 },
    { date: "01/09", open: 73.8, close: 78.2, high: 79.0, low: 73.0, ma20: 60, ma100: 46, currentLeader: 72, prevLeader: 73 },
    { date: "01/10", open: 78.5, close: 76.8, high: 80.0, low: 75.8, ma20: 61, ma100: 47, currentLeader: 73, prevLeader: 74 },
    { date: "01/13", open: 76.5, close: 82.0, high: 82.8, low: 75.8, ma20: 62, ma100: 48, currentLeader: 75, prevLeader: 76 },
    { date: "01/14", open: 82.5, close: 80.2, high: 84.0, low: 79.5, ma20: 64, ma100: 49, currentLeader: 76, prevLeader: 77 },
    { date: "01/15", open: 80.0, close: 85.5, high: 86.2, low: 79.2, ma20: 65, ma100: 50, currentLeader: 77, prevLeader: 78 },
    { date: "01/16", open: 85.8, close: 84.0, high: 87.5, low: 83.2, ma20: 66, ma100: 51, currentLeader: 78, prevLeader: 79 },
    { date: "01/17", open: 83.8, close: 88.2, high: 89.0, low: 83.0, ma20: 67, ma100: 52, currentLeader: 79, prevLeader: 80 },
  ];

  // 自定義K線渲染組件
  const CustomCandlestick = (props: any) => {
    const { x, y, width, height, payload } = props;
    const isRise = payload.close >= payload.open;
    const color = isRise ? "#FE6D73" : "#9cffd9"; // 柔和紅和薄荷

    const bodyHeight =
      (Math.abs(payload.close - payload.open) /
        (payload.high - payload.low)) *
      height;
    const bodyY = isRise
      ? y +
        ((payload.high - payload.close) /
          (payload.high - payload.low)) *
          height
      : y +
        ((payload.high - payload.open) /
          (payload.high - payload.low)) *
          height;

    const wickX = x + width / 2;

    return (
      <g>
        {/* 上下影線 */}
        <line
          x1={wickX}
          y1={y}
          x2={wickX}
          y2={y + height}
          stroke={color}
          strokeWidth={1}
        />
        {/* K線實體 */}
        <rect
          x={x}
          y={bodyY}
          width={width}
          height={Math.max(bodyHeight, 1)}
          fill={color}
          stroke={color}
          strokeWidth={0.5}
        />
      </g>
    );
  };


  return (
    <div className="relative w-full h-full">
      {/* K線圖表 */}
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
        >
          {/* 網格線 */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#333"
            vertical={false}
          />

          {/* X軸 */}
          <XAxis
            dataKey="date"
            tick={{ fill: "#666", fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
            tickFormatter={(value, index) => {
              // 只顯示首尾和中間的日期
              if (
                index === 0 ||
                index === data.length - 1 ||
                index === Math.floor(data.length / 2)
              ) {
                return value;
              }
              return "";
            }}
          />

          {/* Y軸 - 左邊貼齊 */}
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

          {/* Tooltip disabled */}
          <Tooltip content={() => null} cursor={false} />

          {/* 短均線（亮黃色）- 加粗 */}
          {showShortMA && (
            <Line
              type="monotone"
              dataKey="ma20"
              stroke="#F5C518"
              strokeWidth={2.5}
              dot={false}
              isAnimationActive={false}
            />
          )}

          {/* 長均線（柔紫色）- 加粗 */}
          {showLongMA && (
            <Line
              type="monotone"
              dataKey="ma100"
              stroke="#D355F5"
              strokeWidth={2.5}
              dot={false}
              isAnimationActive={false}
            />
          )}

          {/* 當期領頭羊指標（淺橘色）- 實線 */}
          {showCurrentLeader && (
            <Line
              type="monotone"
              dataKey="currentLeader"
              stroke="#FFB347"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          )}

          {/* 前期領頭羊指標（淺藍色）- 實線 */}
          {showPrevLeader && (
            <Line
              type="monotone"
              dataKey="prevLeader"
              stroke="#64B5F6"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          )}

          {/* K線 - 加大間距 */}
          <Bar
            dataKey="high"
            shape={<CustomCandlestick />}
            isAnimationActive={false}
            barSize={6}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

// 成交量圖表組件（硬編碼靜態數據）
function VolumeChart() {
  // 硬編碼成交量數據 - 與K線數據對應
  const data = [
    { date: "11/26", volume: 45 },
    { date: "11/27", volume: 32 },
    { date: "11/28", volume: 78 },
    { date: "11/29", volume: 55 },
    { date: "12/02", volume: 92 },
    { date: "12/03", volume: 48 },
    { date: "12/04", volume: 62 },
    { date: "12/05", volume: 85 },
    { date: "12/06", volume: 42 },
    { date: "12/09", volume: 95 },
    { date: "12/10", volume: 72 },
    { date: "12/11", volume: 38 },
    { date: "12/12", volume: 88 },
    { date: "12/13", volume: 65 },
    { date: "12/16", volume: 52 },
    { date: "12/17", volume: 98 },
    { date: "12/18", volume: 45 },
    { date: "12/19", volume: 82 },
    { date: "12/20", volume: 58 },
    { date: "12/23", volume: 75 },
    { date: "12/24", volume: 42 },
    { date: "12/25", volume: 88 },
    { date: "12/26", volume: 55 },
    { date: "12/27", volume: 92 },
    { date: "12/30", volume: 48 },
    { date: "12/31", volume: 95 },
    { date: "01/02", volume: 62 },
    { date: "01/03", volume: 85 },
    { date: "01/06", volume: 45 },
    { date: "01/07", volume: 78 },
    { date: "01/08", volume: 52 },
    { date: "01/09", volume: 88 },
    { date: "01/10", volume: 42 },
    { date: "01/13", volume: 95 },
    { date: "01/14", volume: 58 },
    { date: "01/15", volume: 82 },
    { date: "01/16", volume: 48 },
    { date: "01/17", volume: 72 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={data}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        {/* Y軸 - 左邊貼齊 */}
        <YAxis
          tick={{ fill: "#666", fontSize: 10 }}
          tickLine={false}
          axisLine={false}
          orientation="left"
          width={30}
          tickMargin={0}
        />
        {/* 成交量柱狀圖 - 加大間距 */}
        <Bar dataKey="volume" isAnimationActive={false} barSize={6}>
          {data.map((entry, index) => (
            <Cell
              key={`volume-cell-${entry.date}-${index}`}
              fill="#9CA3AF"
              opacity={0.6}
            />
          ))}
        </Bar>
      </ComposedChart>
    </ResponsiveContainer>
  );
}

// 即時圖表組件（簡化版）
function RealtimeChart({ stock }: { stock: any }) {
  return (
    <div className="relative w-full h-full">
      {/* Y軸標籤 */}
      <div className="absolute right-0 top-0 bottom-20 flex flex-col justify-between text-[10px] pr-1">
        <span className="text-chart-2">6.29</span>
        <span className="text-chart-2">6.08</span>
        <span className="text-chart-2">5.87</span>
        <span className="text-primary font-bold">5.66</span>
        <span className="text-chart-3">5.45</span>
        <span className="text-chart-3">5.24</span>
        <span className="text-chart-3">5.03</span>
      </div>

      {/* X軸標籤 */}
      <div className="absolute bottom-0 left-0 right-12 text-right text-[10px] text-primary font-semibold">
        16
      </div>

      {/* 即時價格曲線 - 台股顏色：上漲用紅色 */}
      <svg
        className="w-full h-full"
        viewBox="0 0 400 450"
        preserveAspectRatio="none"
      >
        {/* 網格線 */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line
            key={i}
            x1="0"
            y1={50 + i * 50}
            x2="370"
            y2={50 + i * 50}
            stroke="#333"
            strokeWidth="0.5"
          />
        ))}

        {/* 基準線（黃色虛線） */}
        <line
          x1="0"
          y1="200"
          x2="370"
          y2="200"
          stroke="#FFD700"
          strokeWidth="1"
          strokeDasharray="3,3"
        />

        {/* 價格標籤 */}
        <text
          x="30"
          y="205"
          fill="#FFD700"
          fontSize="11"
          fontWeight="bold"
        >
          5.63
        </text>

        {/* 即時價格曲線 - 台股顏色：上漲用紅色 */}
        <path
          d="M 10,350 L 30,340 L 50,320 L 70,300 L 90,280 L 110,260 L 130,230 L 150,200 L 170,180 L 190,160 L 210,150 L 230,145 L 250,140 L 270,135 L 290,130 L 310,128 L 330,125 L 350,120 L 370,118"
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
        />

        {/* 填充區域 */}
        <path
          d="M 10,350 L 30,340 L 50,320 L 70,300 L 90,280 L 110,260 L 130,230 L 150,200 L 170,180 L 190,160 L 210,150 L 230,145 L 250,140 L 270,135 L 290,130 L 310,128 L 330,125 L 350,120 L 370,118 L 370,400 L 10,400 Z"
          fill="url(#gradient)"
          opacity="0.3"
        />

        <defs>
          <linearGradient
            id="gradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#ef4444"
              stopOpacity="0.8"
            />
            <stop
              offset="100%"
              stopColor="#ef4444"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>
      </svg>

      {/* 成交量 */}
      <div className="absolute bottom-0 left-0 right-12 h-24 flex items-end gap-[1px]">
        <div className="absolute top-0 left-2 text-[10px] text-primary">
          46.21K
        </div>
        <div className="absolute top-6 left-2 text-[10px] text-primary">
          30.14K
        </div>
        <div className="absolute top-12 left-2 text-[10px] text-primary">
          15.07K
        </div>
        <div className="absolute bottom-0 left-2 text-[10px] text-primary">
          0
        </div>

        {/* 成交量柱狀圖 */}
        {Array.from({ length: 80 }).map((_, i) => {
          const height =
            i < 5
              ? Math.random() * 80 + 20
              : Math.random() * 30;
          const isHighlight = i < 5;
          return (
            <div
              key={i}
              className={`flex-1 rounded-t ${
                isHighlight ? "bg-primary" : "bg-primary/30"
              }`}
              style={{ height: `${height}%` }}
            />
          );
        })}
      </div>
    </div>
  );
}