import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  Heart,
  ChevronLeft,
  ChevronRight,
  Settings,
  Plus,
  Search,
  ChevronDown,
  ChevronUp,
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
import { StarIcon3 } from "../components/StarIcons";

type Tab = "kline" | "realtime" | "info" | "growth";

// 生成股票數據
const stocks = generateMockStocks();

export function StockDetailPage() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("kline");
  const [timeframe, setTimeframe] = useState<
    "week" | "day" | "month"
  >("week");
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
    <div className="min-h-screen bg-background pb-20">
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
              onClick={goToNextStock}
              disabled={currentIndex >= stocks.length - 1}
              className="text-foreground/60 hover:text-primary disabled:text-foreground/20 transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
            <h1 className="font-bold text-base">
              ({stock.code}) {stock.name}
            </h1>
            <button
              onClick={goToPrevStock}
              disabled={currentIndex <= 0}
              className="text-foreground/60 hover:text-primary disabled:text-foreground/20 transition-colors"
            >
              <ChevronUp className="w-4 h-4" />
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
      <div className="px-3 pt-1">
        <div className="flex items-baseline gap-2">
          <span className={`text-4xl font-bold ${isPositive ? "text-[#FE6D73]" : isNegative ? "text-[#9cffd9]" : "text-foreground"}`}>
            {stock.price.toFixed(2)}
          </span>
          <span className={`text-sm font-semibold ${isPositive ? "text-[#FE6D73]" : isNegative ? "text-[#9cffd9]" : "text-muted-foreground"}`}>
            {isPositive ? "▲" : isNegative ? "▼" : "—"}{Math.abs(stock.change).toFixed(2)} ({isPositive ? "+" : isNegative ? "-" : ""}{Math.abs(stock.changePercent).toFixed(2)}%)
          </span>
        </div>
      </div>

      {/* Tabs - 膠囊樣式 */}
      <div className="px-3 py-1">
        <div className="flex items-center gap-0.5 bg-muted/30 rounded-lg p-0.5">
          {[
            { key: "kline", label: "日K" },
            { key: "realtime", label: "即時" },
            { key: "info", label: "基本資訊" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as Tab)}
              className={`flex-1 px-2 py-1 rounded-md text-xs font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-primary text-black"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

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
  // 選中的K線數據
  const [selectedKLineData, setSelectedKLineData] =
    useState<any>(null);

  // 生成最新K線數據用於顯示當前價格
  const generateCurrentData = () => {
    const basePrice = stock.price;
    return {
      open: basePrice * 0.98,
      high: basePrice * 1.02,
      low: basePrice * 0.97,
      close: basePrice,
    };
  };

  const currentData = generateCurrentData();

  // 顯示的數據（選中的 or 當前的）
  const displayData = selectedKLineData || {
    date: "2026/02/05",
    ...currentData,
    ma20: stock.price * 0.95,
    ma100: stock.price * 0.85,
    currentLeader: stock.price * 1.12,
    prevLeader: stock.price * 1.15,
  };

  return (
    <div>
      {/* 日期 + 開高低收 - 單行緊湊 */}
      <div className="px-2 mb-0.5">
        <p className="text-xs text-muted-foreground">
          <span className="text-foreground font-medium">{displayData.date}</span>
          {" "}開 {displayData.open.toFixed(2)}{" "}
          高 <span className="text-[#FE6D73]">{displayData.high.toFixed(2)}</span>{" "}
          低 <span className="text-[#9cffd9]">{displayData.low.toFixed(2)}</span>{" "}
          收 {displayData.close.toFixed(2)}
        </p>
      </div>

      {/* MA 數值 + 強勢線數值 - 2x2 grid */}
      <div className="px-2 mb-0.5 grid grid-cols-2 gap-x-4 gap-y-0 text-xs">
        {showShortMA && (
          <span>
            <span className="text-muted-foreground">MA20 </span>
            <span style={{ color: "#EAB308" }}>{displayData.ma20.toFixed(2)}</span>
          </span>
        )}
        {showLongMA && (
          <span>
            <span className="text-muted-foreground">MA100 </span>
            <span style={{ color: "#E040FB" }}>{displayData.ma100.toFixed(2)}</span>
          </span>
        )}
        {showLeaderLine && (
          <span>
            <span className="text-muted-foreground">當期領頭羊 </span>
            <span style={{ color: "#FF9800" }}>{(displayData.currentLeader || stock.price * 1.12).toFixed(1)}</span>
          </span>
        )}
        {showLeaderLine && (
          <span>
            <span className="text-muted-foreground">前期領頭羊 </span>
            <span style={{ color: "#42A5F5" }}>{(displayData.prevLeader || stock.price * 1.15).toFixed(1)}</span>
          </span>
        )}
      </div>

      {/* K線圖表 - 填滿寬度 */}
      <div className="-mx-1" style={{ height: "300px" }}>
        <KLineChart
          stock={stock}
          showShortMA={showShortMA}
          showLongMA={showLongMA}
          showCurrentLeader={showLeaderLine}
          showPrevLeader={showLeaderLine}
          onSelectKLine={setSelectedKLineData}
        />
      </div>

      {/* 成交量 */}
      <div className="px-2">
        <div className="flex items-center justify-between text-xs mb-0.5">
          <span className="text-foreground font-medium">量: {(selectedKLineData?.volume || 71287914000).toLocaleString()}</span>
        </div>
        <div style={{ height: "60px" }}>
          <VolumeChart />
        </div>
      </div>

      {/* 底部技術線切換 - 簡單圓圈勾選 */}
      <div className="flex items-center justify-between px-2 py-2 mt-1 border-t border-border">
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground font-medium">技術線：</span>

          {/* 短均 */}
          <button onClick={() => setShowShortMA(!showShortMA)} className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: "#EAB308", backgroundColor: showShortMA ? "#EAB308" : "transparent" }}>
              {showShortMA && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
            </div>
            <span className="text-xs text-foreground">短均</span>
          </button>

          {/* 長均 */}
          <button onClick={() => setShowLongMA(!showLongMA)} className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: "#E040FB", backgroundColor: showLongMA ? "#E040FB" : "transparent" }}>
              {showLongMA && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
            <span className="text-xs text-foreground">長均</span>
          </button>

          {/* 強勢線 */}
          <button onClick={() => setShowLeaderLine(!showLeaderLine)} className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: "#4A90E2", backgroundColor: showLeaderLine ? "#4A90E2" : "transparent" }}>
              {showLeaderLine && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
            <span className="text-xs text-foreground">強勢線</span>
          </button>
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

// K線圖表組件（使用 recharts 完整實現）
function KLineChart({
  stock,
  showShortMA,
  showLongMA,
  showCurrentLeader,
  showPrevLeader,
  onSelectKLine,
}: {
  stock: any;
  showShortMA: boolean;
  showLongMA: boolean;
  showCurrentLeader: boolean;
  showPrevLeader: boolean;
  onSelectKLine: (data: any) => void;
}) {
  // 生成模擬K線數據
  const generateKLineData = () => {
    const data = [];
    let basePrice = stock.price * 0.85;
    const dates = [
      "11/26",
      "11/27",
      "11/28",
      "11/29",
      "12/02",
      "12/03",
      "12/04",
      "12/05",
      "12/06",
      "12/09",
      "12/10",
      "12/11",
      "12/12",
      "12/13",
      "12/16",
      "12/17",
      "12/18",
      "12/19",
      "12/20",
      "12/23",
      "12/24",
      "12/25",
      "12/26",
      "12/27",
      "12/30",
      "12/31",
      "01/02",
      "01/03",
      "01/06",
      "01/07",
      "01/08",
      "01/09",
      "01/10",
      "01/13",
      "01/14",
      "01/15",
      "01/16",
      "01/17",
      "01/20",
      "01/21",
      "01/22",
      "01/23",
      "01/24",
      "01/27",
      "01/28",
      "01/29",
      "01/30",
      "01/31",
      "02/03",
      "02/04",
    ];

    for (let i = 0; i < dates.length; i++) {
      const trend = (i / dates.length) * 0.15; // 整體上漲趨勢
      const volatility = (Math.random() - 0.5) * 0.03;

      const open = basePrice * (1 + trend + volatility);
      const close = open * (1 + (Math.random() - 0.45) * 0.04);
      const high =
        Math.max(open, close) * (1 + Math.random() * 0.02);
      const low =
        Math.min(open, close) * (1 - Math.random() * 0.02);

      // 計算均線
      const ma20 = basePrice * (1 + trend * 0.8);
      const ma100 = basePrice * (1 + trend * 0.5);

      // 強勢線（領頭羊指標）- 趨勢向上，略高於股價
      const currentLeader = basePrice * (1 + trend * 1.2 + 0.08 + Math.sin(i * 0.3) * 0.02);
      const prevLeader = basePrice * (1 + trend * 1.1 + 0.12 + Math.sin(i * 0.25) * 0.015);

      data.push({
        date: dates[i],
        open,
        close,
        high,
        low,
        ma20,
        ma100,
        currentLeader,
        prevLeader,
        volume: Math.random() * 100000000 + 50000000,
      });

      basePrice = close;
    }

    return data;
  };

  const data = generateKLineData();
  const currentData = data[data.length - 1];

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
          margin={{ top: 30, right: 10, left: 0, bottom: 20 }}
          onClick={(e: any) => {
            if (
              e &&
              e.activePayload &&
              e.activePayload.length > 0
            ) {
              onSelectKLine(e.activePayload[0].payload);
            }
          }}
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

          {/* Y軸 */}
          <YAxis
            domain={["auto", "auto"]}
            tick={{ fill: "#666", fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            orientation="right"
            tickFormatter={(value) => value.toFixed(2)}
          />

          {/* Tooltip disabled */}
          <Tooltip content={() => null} cursor={false} />

          {/* 短均線（黃色）- 加粗 */}
          {showShortMA && (
            <Line
              type="monotone"
              dataKey="ma20"
              stroke="#EAB308"
              strokeWidth={3}
              dot={false}
              isAnimationActive={false}
            />
          )}

          {/* 長均線（洋紅色）- 加粗 */}
          {showLongMA && (
            <Line
              type="monotone"
              dataKey="ma100"
              stroke="#E040FB"
              strokeWidth={3}
              dot={false}
              isAnimationActive={false}
            />
          )}

          {/* 當期領頭羊指標（藍色） */}
          {showCurrentLeader && (
            <Line
              type="monotone"
              dataKey="currentLeader"
              stroke="#FF9800"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
              strokeDasharray="6 3"
            />
          )}

          {/* 前期領頭羊指標（橘色） */}
          {showPrevLeader && (
            <Line
              type="monotone"
              dataKey="prevLeader"
              stroke="#42A5F5"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
              strokeDasharray="6 3"
            />
          )}

          {/* K線 */}
          <Bar
            dataKey="high"
            shape={<CustomCandlestick />}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

// 成交量圖表組件（使用 recharts 完整實現）
function VolumeChart() {
  // 生成成交量數據
  const generateVolumeData = () => {
    const data = [];
    const dates = [
      "11/26",
      "11/27",
      "11/28",
      "11/29",
      "12/02",
      "12/03",
      "12/04",
      "12/05",
      "12/06",
      "12/09",
      "12/10",
      "12/11",
      "12/12",
      "12/13",
      "12/16",
      "12/17",
      "12/18",
      "12/19",
      "12/20",
      "12/23",
      "12/24",
      "12/25",
      "12/26",
      "12/27",
      "12/30",
      "12/31",
      "01/02",
      "01/03",
      "01/06",
      "01/07",
      "01/08",
      "01/09",
      "01/10",
      "01/13",
      "01/14",
      "01/15",
      "01/16",
      "01/17",
      "01/20",
      "01/21",
      "01/22",
      "01/23",
      "01/24",
      "01/27",
      "01/28",
      "01/29",
      "01/30",
      "01/31",
      "02/03",
      "02/04",
    ];

    for (let i = 0; i < dates.length; i++) {
      const isRise = Math.random() > 0.45; // 55% 上漲概率
      const volume = Math.random() * 80000000 + 30000000;

      data.push({
        date: dates[i],
        volume,
        isRise,
      });
    }

    return data;
  };

  const data = generateVolumeData();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={data}
        margin={{ top: 10, right: 40, left: 0, bottom: 5 }}
      >
        {/* Y軸 */}
        <YAxis
          tick={{ fill: "#666", fontSize: 10 }}
          tickLine={false}
          axisLine={false}
          orientation="right"
          tickFormatter={(value) => {
            if (value >= 1000000) {
              return `${(value / 1000000).toFixed(2)}M`;
            }
            return value.toString();
          }}
        />

        {/* 成交量柱狀圖 */}
        <Bar dataKey="volume" isAnimationActive={false}>
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