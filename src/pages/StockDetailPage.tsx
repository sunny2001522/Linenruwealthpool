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

          <div className="text-center">
            <h1 className="font-bold text-base">
              ({stock.code}) {stock.name}
            </h1>
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

      {/* 价格信息卡片 */}
      <div className="px-4 pt-3 pb-2">
        <div className="bg-card border border-border rounded-xl p-4">
          {/* 状态标签 */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {/* 已收盤、上市等狀態標籤暫時註解 */}
            </div>
          </div>

          {/* 价格和涨跌 */}
          <div className="flex items-baseline gap-3 mb-3">
            <span
              className={`text-4xl font-bold ${
                isPositive
                  ? "text-chart-2"
                  : isNegative
                    ? "text-chart-3"
                    : "text-foreground"
              }`}
            >
              {stock.price.toFixed(2)}
            </span>
            <div className="flex  gap-2">
              <span
                className={`text-sm font-semibold ${
                  isPositive
                    ? "text-chart-2"
                    : isNegative
                      ? "text-chart-3"
                      : "text-muted-foreground"
                }`}
              >
                {isPositive ? "▲" : isNegative ? "▼" : "—"}
                {Math.abs(stock.change).toFixed(2)}
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
                {isPositive ? "▲" : isNegative ? "▼" : "—"}
                {Math.abs(stock.changePercent).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-2">
        <div className="flex gap-6 border-b border-border">
          <button
            onClick={() => setActiveTab("kline")}
            className={`pb-2 text-sm font-medium transition-colors relative ${
              activeTab === "kline"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            K線
            {activeTab === "kline" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("realtime")}
            className={`pb-2 text-sm font-medium transition-colors relative ${
              activeTab === "realtime"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            即時
            {activeTab === "realtime" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("info")}
            className={`pb-2 text-sm font-medium transition-colors relative ${
              activeTab === "info"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            基本資訊
            {activeTab === "info" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-4">
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
  const [showLongMA, setShowLongMA] = useState(true); // 长均（蓝色）
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

  return (
    <div>
      {/* Timeframe Selector */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2">
          <button
            onClick={() => onTimeframeChange("day")}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              timeframe === "day"
                ? "bg-primary/20 text-primary"
                : "bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            日
          </button>
          <button
            onClick={() => onTimeframeChange("week")}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              timeframe === "week"
                ? "bg-primary/20 text-primary"
                : "bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            週
          </button>
          <button
            onClick={() => onTimeframeChange("month")}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              timeframe === "month"
                ? "bg-primary/20 text-primary"
                : "bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            月
          </button>
        </div>
      </div>

      {/* 當前價格資訊 - 常駐顯示 */}
      <div className="bg-card border border-border rounded-lg p-3 mb-4">
        <div className="grid grid-cols-4 gap-3">
          <div>
            <p className="text-[10px] text-muted-foreground mb-0.5">
              開盤
            </p>
            <p className="text-sm font-semibold">
              {currentData.open.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground mb-0.5">
              最高
            </p>
            <p className="text-sm font-semibold text-chart-2">
              {currentData.high.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground mb-0.5">
              最低
            </p>
            <p className="text-sm font-semibold text-chart-3">
              {currentData.low.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground mb-0.5">
              收盤
            </p>
            <p
              className={`text-sm font-semibold ${currentData.close >= currentData.open ? "text-chart-2" : "text-chart-3"}`}
            >
              {currentData.close.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* 均线信息 - 可点击切换 */}
      <div className="flex items-center gap-3 mb-4">
        {/* 短均MA20按钮（黄色） */}
        <button
          onClick={() => setShowShortMA(!showShortMA)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all active:scale-95"
          style={{
            borderColor: showShortMA ? "#EAB308" : "#404040",
            backgroundColor: showShortMA
              ? "rgba(234, 179, 8, 0.1)"
              : "transparent",
          }}
        >
          {/* 打勾框 */}
          <div
            className="w-5 h-5 rounded flex items-center justify-center border-2 transition-all flex-shrink-0"
            style={{
              borderColor: showShortMA ? "#EAB308" : "#404040",
              backgroundColor: showShortMA
                ? "#EAB308"
                : "transparent",
            }}
          >
            {showShortMA && (
              <svg
                className="w-3.5 h-3.5 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
          {/* 文字信息 */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-muted-foreground">
              短均
            </span>
            <span
              className="text-xs font-medium"
              style={{ color: "#EAB308" }}
            >
              MA20
            </span>
            {showShortMA && selectedKLineData && (
              <span className="text-sm font-bold text-foreground">
                {selectedKLineData.ma20.toFixed(2)}
              </span>
            )}
            {showShortMA && !selectedKLineData && (
              <span className="text-sm font-bold text-foreground">
                {(stock.price * 0.95).toFixed(2)}
              </span>
            )}
          </div>
        </button>

        {/* 长均MA100按钮（蓝色） */}
        <button
          onClick={() => setShowLongMA(!showLongMA)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all active:scale-95"
          style={{
            borderColor: showLongMA ? "#3B82F6" : "#404040",
            backgroundColor: showLongMA
              ? "rgba(59, 130, 246, 0.1)"
              : "transparent",
          }}
        >
          {/* 打勾框 */}
          <div
            className="w-5 h-5 rounded flex items-center justify-center border-2 transition-all flex-shrink-0"
            style={{
              borderColor: showLongMA ? "#3B82F6" : "#404040",
              backgroundColor: showLongMA
                ? "#3B82F6"
                : "transparent",
            }}
          >
            {showLongMA && (
              <svg
                className="w-3.5 h-3.5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
          {/* 文字信息 */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-muted-foreground">
              長均
            </span>
            <span
              className="text-xs font-medium"
              style={{ color: "#3B82F6" }}
            >
              MA100
            </span>
            {showLongMA && selectedKLineData && (
              <span className="text-sm font-bold text-foreground">
                {selectedKLineData.ma100.toFixed(2)}
              </span>
            )}
            {showLongMA && !selectedKLineData && (
              <span className="text-sm font-bold text-foreground">
                {(stock.price * 0.85).toFixed(2)}
              </span>
            )}
          </div>
        </button>
      </div>

      {/* K線圖表 - 左右填滿螢幕 */}
      <div
        className="bg-black rounded-lg -mx-4 px-1 py-3 mb-4"
        style={{ height: "400px" }}
      >
        <KLineChart
          stock={stock}
          showShortMA={showShortMA}
          showLongMA={showLongMA}
          onSelectKLine={setSelectedKLineData}
        />
      </div>

      {/* 選中的K線詳細資訊 */}
      {selectedKLineData && (
        <div className="bg-card border border-border rounded-lg p-4 mb-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                日期
              </p>
              <p className="font-semibold text-sm">
                {selectedKLineData.date}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                開盤
              </p>
              <p className="font-semibold text-sm">
                {selectedKLineData.open.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                最高
              </p>
              <p className="font-semibold text-sm text-chart-2">
                {selectedKLineData.high.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                最低
              </p>
              <p className="font-semibold text-sm text-chart-3">
                {selectedKLineData.low.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                收盤
              </p>
              <p
                className={`font-semibold text-sm ${selectedKLineData.close >= selectedKLineData.open ? "text-chart-2" : "text-chart-3"}`}
              >
                {selectedKLineData.close.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                MA20
              </p>
              <p
                className="font-semibold text-sm"
                style={{ color: "#EAB308" }}
              >
                {selectedKLineData.ma20.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                MA100
              </p>
              <p
                className="font-semibold text-sm"
                style={{ color: "#3B82F6" }}
              >
                {selectedKLineData.ma100.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                成交量
              </p>
              <p className="font-semibold text-sm">
                {(selectedKLineData.volume / 1000).toFixed(0)}K
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 成交量 */}
      <div className="flex items-center justify-between text-xs mb-2">
        <span className="text-foreground font-medium">
          成交量 ▼
        </span>
        <span className="text-foreground font-semibold">
          11,525,431
        </span>
      </div>
      <div
        className="bg-black rounded-lg p-3 mb-4"
        style={{ height: "120px" }}
      >
        <VolumeChart />
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
  onSelectKLine,
}: {
  stock: any;
  showShortMA: boolean;
  showLongMA: boolean;
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

      data.push({
        date: dates[i],
        open,
        close,
        high,
        low,
        ma20,
        ma100,
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

  // 自定義Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload;
      const isPositive = data.close >= data.open;

      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-semibold text-foreground mb-2">
            {data.date}
          </p>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">
                開盤：
              </span>
              <span className="font-medium">
                {data.open.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">
                最高：
              </span>
              <span className="font-medium text-chart-2">
                {data.high.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">
                最低：
              </span>
              <span className="font-medium text-chart-3">
                {data.low.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">
                收盤：
              </span>
              <span
                className={`font-medium ${isPositive ? "text-chart-2" : "text-chart-3"}`}
              >
                {data.close.toFixed(2)}
              </span>
            </div>
            <div className="border-t border-border my-1 pt-1" />
            {showShortMA && data.ma20 && (
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">
                  MA20：
                </span>
                <span
                  className="font-medium"
                  style={{ color: "#EAB308" }}
                >
                  {data.ma20.toFixed(2)}
                </span>
              </div>
            )}
            {showLongMA && data.ma100 && (
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">
                  MA100：
                </span>
                <span
                  className="font-medium"
                  style={{ color: "#3B82F6" }}
                >
                  {data.ma100.toFixed(2)}
                </span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
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

          {/* Tooltip */}
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
          />

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

          {/* 長均線（藍色）- 加粗 */}
          {showLongMA && (
            <Line
              type="monotone"
              dataKey="ma100"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={false}
              isAnimationActive={false}
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