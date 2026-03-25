

import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronRight, Search, Bell } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  Facebook,
  Instagram,
  MessageCircle,
} from "lucide-react";
import headerImage from "figma:asset/d20ba1880b93234408a79ed7a95dd69f77384350.png";
import bannerImage1 from "figma:asset/481bd66216aed098ddf5065664bd1aa8a65f2aac.png";
import bannerImage2 from "figma:asset/453b5cbdadb7f3040eee3fdfe4737f36d805c5ef.png";
import {
  ComposedChart,
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";


import { Carousel } from "../components/Carousel";


interface LeaderStock {
  rank: number;
  code: string;
  name: string;
  industry: string;
}

interface SocialPost {
  id: string;
  author: string;
  avatar: string;
  title: string;
  preview: string;
  time: string;
}

interface ContentItem {
  id: string;
  thumbnail: string;
  title: string;
  type: string;
}

const currentLeaders: LeaderStock[] = [
  {
    rank: 1,
    code: "",
    name: "電子上游-IC設計",
    industry: "電子上游-IC設計",
  },
  {
    rank: 2,
    code: "",
    name: "電子中游-被動元件",
    industry: "電子中游-被動元件",
  },
  {
    rank: 3,
    code: "",
    name: "電子上游-IC通路",
    industry: "電子上游-IC通路",
  },
  {
    rank: 4,
    code: "",
    name: "電子零組件-顯示面板",
    industry: "電子零組件-顯示面板",
  },
  {
    rank: 5,
    code: "",
    name: "電腦週邊-電腦系統",
    industry: "電腦週邊-電腦系統",
  },
  {
    rank: 6,
    code: "",
    name: "電子上游-IC製造",
    industry: "電子上游-IC製造",
  },
  {
    rank: 7,
    code: "",
    name: "電子中游-連接器",
    industry: "電子中游-連接器",
  },
  {
    rank: 8,
    code: "",
    name: "電子上游-記憶體",
    industry: "電子上游-記憶體",
  },
  {
    rank: 9,
    code: "",
    name: "電子中游-光電元件",
    industry: "電子中游-光電元件",
  },
  {
    rank: 10,
    code: "",
    name: "電子下游-網路通訊",
    industry: "電子下游-網路通訊",
  },
];

const previousLeaders: LeaderStock[] = [
  {
    rank: 1,
    code: "",
    name: "電子中游-PCB-材料設備",
    industry: "電子中游-PCB-材料設備",
  },
  {
    rank: 2,
    code: "",
    name: "電子上游-PCB-材料設備",
    industry: "電子上游-PCB-材料設備",
  },
  {
    rank: 3,
    code: "",
    name: "電子上游-IC封測",
    industry: "電子上游-IC封測",
  },
  {
    rank: 4,
    code: "",
    name: "電子上游-配線驅動雜",
    industry: "電子上游-配線驅動雜",
  },
  {
    rank: 5,
    code: "",
    name: "電子上游-連接元件",
    industry: "電子上游-連接元件",
  },
  {
    rank: 6,
    code: "",
    name: "電子上游-PCB-製造",
    industry: "電子上游-PCB-製造",
  },
  {
    rank: 7,
    code: "",
    name: "電子上游-配線處理設計",
    industry: "電子上游-配線處理設計",
  },
  {
    rank: 8,
    code: "",
    name: "電子上游-感測元件",
    industry: "電子上游-感測元件",
  },
  {
    rank: 9,
    code: "",
    name: "電子上游-IC製造",
    industry: "電子上游-IC製造",
  },
  {
    rank: 10,
    code: "",
    name: "電子中游-電源管理",
    industry: "電子中游-電源管理",
  },
];

const socialPosts: SocialPost[] = [
  {
    id: "1",
    author: "林恩如-超簡單投資法",
    avatar:
      "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=100&h=100&fit=crop",
    title: "為什麼你買股票總是在「領息」，而不是「賺價差」？",
    preview:
      "很多人買了股票套牢，就開始安慰自己：「沒關係啦，這間公司很穩，我改領股息當存股。」別再騙自己了...",
    time: "6小時前",
  },
  {
    id: "2",
    author: "VIP投資團隊",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
    title: "【獨家】AI伺服器供應鏈深度解析",
    preview:
      "根據我們的內部消息和供應鏈調查，AI伺服器的訂單能見度已經延伸到2026年Q2...",
    time: "12小時前",
  },
  {
    id: "3",
    author: "金融股達人",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    title: "主力佈局曝光：這5檔電子股籌碼已經集中",
    preview:
      "經過三個月的底部整理，這幾檔電子股的籌碼結構已經非常乾淨...",
    time: "1天前",
  },
];

const contentItems: ContentItem[] = [
  {
    id: "1",
    thumbnail:
      "https://images.unsplash.com/photo-1740153204804-200310378f2f?w=300&h=169&fit=crop",
    title: "【林恩如】市場修正我🔥強勢股",
    type: "影音",
  },
  {
    id: "2",
    thumbnail:
      "https://images.unsplash.com/photo-1762279389020-eeeb69c25813?w=300&h=169&fit=crop",
    title: "恩如三部曲完整教學",
    type: "講座",
  },
  {
    id: "3",
    thumbnail:
      "https://images.unsplash.com/photo-1767972160300-86d0af82558f?w=300&h=169&fit=crop",
    title: "2026年第一季投資策略全解析",
    type: "文章",
  },
  {
    id: "4",
    thumbnail:
      "https://images.unsplash.com/photo-1758691736591-5bf31a5d0dea?w=300&h=169&fit=crop",
    title: "技術分析進階課程",
    type: "講座",
  },
];

// 大盤趨勢數據 (最近20天) - 含開高低收 + MA20 + MA100 + 當期/前期領頭羊
const marketTrendData = [
  { date: "12/29", open: 22750, high: 22860, low: 22700, close: 22800, volume: 2850, ma20: 22500, ma100: 21800, currentLeader: 23100, prevLeader: 23300 },
  { date: "1/02", open: 22800, high: 23010, low: 22780, close: 22950, volume: 3120, ma20: 22550, ma100: 21850, currentLeader: 23120, prevLeader: 23320 },
  { date: "1/03", open: 22950, high: 22960, low: 22760, close: 22820, volume: 2680, ma20: 22600, ma100: 21900, currentLeader: 23150, prevLeader: 23340 },
  { date: "1/06", open: 22820, high: 23150, low: 22810, close: 23100, volume: 3450, ma20: 22680, ma100: 21960, currentLeader: 23200, prevLeader: 23380 },
  { date: "1/07", open: 23100, high: 23300, low: 23050, close: 23250, volume: 3680, ma20: 22750, ma100: 22020, currentLeader: 23250, prevLeader: 23420 },
  { date: "1/08", open: 23250, high: 23280, low: 23100, close: 23180, volume: 2940, ma20: 22820, ma100: 22080, currentLeader: 23300, prevLeader: 23460 },
  { date: "1/09", open: 23180, high: 23400, low: 23150, close: 23350, volume: 3210, ma20: 22900, ma100: 22140, currentLeader: 23350, prevLeader: 23500 },
  { date: "1/10", open: 23350, high: 23380, low: 23200, close: 23280, volume: 2760, ma20: 22960, ma100: 22200, currentLeader: 23400, prevLeader: 23540 },
  { date: "1/13", open: 23280, high: 23500, low: 23260, close: 23450, volume: 3350, ma20: 23030, ma100: 22260, currentLeader: 23450, prevLeader: 23580 },
  { date: "1/14", open: 23450, high: 23570, low: 23420, close: 23520, volume: 3180, ma20: 23100, ma100: 22320, currentLeader: 23500, prevLeader: 23620 },
  { date: "1/15", open: 23520, high: 23540, low: 23350, close: 23410, volume: 2890, ma20: 23150, ma100: 22380, currentLeader: 23530, prevLeader: 23650 },
  { date: "1/16", open: 23410, high: 23720, low: 23400, close: 23680, volume: 3560, ma20: 23220, ma100: 22440, currentLeader: 23580, prevLeader: 23700 },
  { date: "1/17", open: 23680, high: 23800, low: 23650, close: 23750, volume: 3420, ma20: 23280, ma100: 22500, currentLeader: 23620, prevLeader: 23740 },
  { date: "1/20", open: 23750, high: 23870, low: 23720, close: 23820, volume: 3280, ma20: 23350, ma100: 22560, currentLeader: 23680, prevLeader: 23780 },
  { date: "1/21", open: 23820, high: 23830, low: 23620, close: 23690, volume: 3050, ma20: 23400, ma100: 22620, currentLeader: 23720, prevLeader: 23820 },
  { date: "1/22", open: 23690, high: 23900, low: 23680, close: 23850, volume: 3370, ma20: 23460, ma100: 22680, currentLeader: 23770, prevLeader: 23860 },
  { date: "1/23", open: 23850, high: 23960, low: 23830, close: 23920, volume: 3150, ma20: 23520, ma100: 22740, currentLeader: 23820, prevLeader: 23900 },
  { date: "1/24", open: 23920, high: 24100, low: 23900, close: 24050, volume: 3580, ma20: 23580, ma100: 22800, currentLeader: 23880, prevLeader: 23950 },
  { date: "1/27", open: 24050, high: 24230, low: 24020, close: 24180, volume: 3720, ma20: 23650, ma100: 22860, currentLeader: 23950, prevLeader: 24000 },
  { date: "1/28", open: 24180, high: 24380, low: 24150, close: 24320, volume: 3890, ma20: 23720, ma100: 22920, currentLeader: 24020, prevLeader: 24060 },
];


export function HomePage() {
  const navigate = useNavigate();
  const [showMA20, setShowMA20] = useState(true);
  const [showLongMA, setShowLongMA] = useState(true);
  const [showLeaderLine, setShowLeaderLine] = useState(true);
  const [marketTimeframe, setMarketTimeframe] = useState<"day" | "week" | "month">("day");

  const handleIndustryClick = (industry: string) => {
    navigate(
      `/home/stock-picker?industry=${encodeURIComponent(industry)}`,
    );
  };

  // 計算大盤漲跌
  const marketChange =
    marketTrendData[marketTrendData.length - 1].close -
    marketTrendData[0].close;
  const isMarketUp = marketChange > 0;
  const lineColor = isMarketUp ? "#FE6D73" : "#9cffd9"; // 紅漲綠跌

  return (
    <div className="bg-background pb-16">
      {/* 頂部工具列：搜尋 + 通知 */}
      <div className="flex items-center justify-end gap-2 px-4 py-2">
        <button
          onClick={() => navigate("/search")}
          className="w-9 h-9 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
        >
          <Search className="w-4.5 h-4.5 text-muted-foreground" />
        </button>
        <button
          onClick={() => navigate("/notifications")}
          className="relative w-9 h-9 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
        >
          <Bell className="w-4.5 h-4.5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </button>
      </div>

      {/* Header Banner */}
      <section className="relative border-b border-border bg-gradient-to-br from-background via-background to-primary/5">
        <div className="h-[140px] overflow-hidden">
          <Carousel>
            {/* Slide 1: 長線聚寶盆 */}
            <div className="flex items-end justify-around h-[140px] bg-gradient-to-br from-background via-background to-primary/5">
              <div className="flex-shrink-0">
                <img
                  src={headerImage}
                  alt="長線聚寶盆"
                  className="h-28 w-auto object-contain"
                />
              </div>
              <div className="pb-6">
                <h1 className="text-3xl font-bold font-serif bg-gradient-to-r from-[#E5C100] via-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent mb-2">
                  長線聚寶盆
                </h1>
                <p className="text-sm text-muted-foreground">
                  選股可以更快、更好、更簡單
                </p>
              </div>
            </div>

            {/* Slide 2: 技術分析實戰 */}
            <div className="h-[140px]">
{/*  目前為假資料 正式開發資料來源：
a.首圖
-透過firebase Remove Config進行遠端遙控
參數：
"openType"：0(關閉)/1(開啟)首圖,
"userType": 0(全部用戶)/1(付費用戶)/2(免費用戶)
"imageUrl"："圖片網址",
"webUrl": "跳轉連結",
"startTime": "開始時間",
"endTime": "結束時間" */}
             
              <img
                src={bannerImage1}
                alt="技術分析實戰"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Slide 3: 十周年專屬回饋 */}
            <div className="h-[140px]">
              <img
                src={bannerImage2}
                alt="十周年專屬回饋"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </Carousel>
        </div>
      </section>

      
      {/* 本期關注股票 */}
      {/* 目前為假資料 正式開發邏輯:
取用篩選條件
【多方】策略-站上週20MA AND 股本大於20億 AND 週均量大於1000張 篩選後前三檔結果(依據恩如三部曲星星多寡進行排序)

股價
"index": "218",
"描述": "指定多檔股票計算",
"目標載體": "Api",(包含訂閱WebSocket)
"Route": "GetTarget",
"TypeName": "StockCalculation",
"keyNamePath"："Commodity,CommKey" {"propertyName"："StrikePrice"
"columnName"："即時成交價"}

漲跌
"index": "218",
"描述": "指定多檔股票計算",
"目標載體": "Api",(包含訂閱WebSocket)
"Route": "GetTarget",
"TypeName": "StockCalculation",
"keyNamePath"："Commodity,CommKey" {"propertyName"："Change"
"columnName"："漲跌"}

漲跌幅
"index": "218",
"描述": "指定多檔股票計算",
"目標載體": "Api",(包含訂閱WebSocket)
"Route": "GetTarget",
"TypeName": "StockCalculation",
"keyNamePath"："Commodity,CommKey" {"propertyName"："ChangeRange"
"columnName"："漲跌幅"}

查看更多：跳轉選股頁，並預設顯示【多方】策略-站上週20MA AND 股本大於20億 AND 週均量大於1000張 篩選後結果(依據恩如三部曲星星多寡進行排序 */}

      {/* 跑馬燈 */}
      <div className="overflow-hidden border-b border-border/30 bg-muted/30 py-1.5">
        <div className="marquee-scroll flex items-center gap-8 whitespace-nowrap text-xs text-muted-foreground">
          <span>台積電(2330) 站上週20MA，恩如三部曲三顆星</span>
          <span className="text-border">│</span>
          <span>鴻海(2317) 週均量突破 5,000 張</span>
          <span className="text-border">│</span>
          <span>聯發科(2454) 型態突破，庸中佼佼選入</span>
          <span className="text-border">│</span>
          <span>台達電(2308) 蓄勢待發策略選入</span>
          <span className="text-border">│</span>
          <span>廣達(2382) 量能放大，後起新秀選入</span>
          <span className="text-border">│</span>
          <span>台積電(2330) 站上週20MA，恩如三部曲三顆星</span>
          <span className="text-border">│</span>
          <span>鴻海(2317) 週均量突破 5,000 張</span>
          <span className="text-border">│</span>
          <span>聯發科(2454) 型態突破，庸中佼佼選入</span>
          <span className="text-border">│</span>
          <span>台達電(2308) 蓄勢待發策略選入</span>
          <span className="text-border">│</span>
          <span>廣達(2382) 量能放大，後起新秀選入</span>
        </div>
      </div>

      {/* 領頭羊類股 */}
      <section className="px-4 py-4 border-b border-border/30">
        <h2 className="text-lg font-bold mb-4">領頭羊</h2>

        {/* 當期 */}
        <div className="mb-3">
          <div className="text-sm font-medium text-muted-foreground mb-2">當期</div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {currentLeaders.map((stock) => {
              const parts = stock.industry.split("-");
              const category = parts[0] || "";
              const subCategory = parts.slice(1).join("-") || "";

              return (
                <div
                  key={`current-${stock.rank}-${stock.industry}`}
                  onClick={() => handleIndustryClick(stock.industry)}
                  className="flex-shrink-0 w-24 bg-card rounded-lg p-3 border border-border hover:border-primary/50 transition-colors cursor-pointer shadow-sm"
                >
                  <div className="flex flex-col h-full items-center">
                    <div className="text-2xl font-bold mb-1.5 text-primary">
                      {stock.rank}
                    </div>
                    <div className="text-xs text-foreground/70 mb-1 text-center leading-tight">
                      {category}
                    </div>
                    <div className="text-sm font-medium text-primary mb-2 flex-1 text-center leading-tight">
                      {subCategory}
                    </div>
                    <ChevronRight className="w-4 h-4 text-primary" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 前期 */}
        <div>
          <div className="text-sm font-medium text-muted-foreground mb-2">前期</div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {previousLeaders.map((stock) => {
              const parts = stock.industry.split("-");
              const category = parts[0] || "";
              const subCategory = parts.slice(1).join("-") || "";

              return (
                <div
                  key={`previous-${stock.rank}-${stock.industry}`}
                  onClick={() => handleIndustryClick(stock.industry)}
                  className="flex-shrink-0 w-24 bg-card rounded-lg p-3 border border-border hover:border-primary/50 transition-colors cursor-pointer shadow-sm"
                >
                  <div className="flex flex-col h-full items-center">
                    <div className="text-2xl font-bold mb-1.5 text-primary">
                      {stock.rank}
                    </div>
                    <div className="text-xs text-foreground/70 mb-1 text-center leading-tight">
                      {category}
                    </div>
                    <div className="text-sm font-medium text-primary mb-2 flex-1 text-center leading-tight">
                      {subCategory}
                    </div>
                    <ChevronRight className="w-4 h-4 text-primary" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 大盤趨勢 */}
      <section className="border-b border-border/30">
        {/* 價格 - 無背景無框 */}
        <div className="px-3 pt-3">
          <div className="text-xs text-foreground/60 mb-0.5">台灣加權指數</div>
          {(() => {
            const latest = marketTrendData[marketTrendData.length - 1];
            const prev = marketTrendData[marketTrendData.length - 2];
            const change = latest.close - prev.close;
            const changePercent = (change / prev.close) * 100;
            const up = change > 0;
            return (
              <div className="flex items-baseline gap-2">
                <span className={`text-4xl font-bold ${up ? "text-[#FE6D73]" : "text-[#9cffd9]"}`}>
                  {latest.close.toLocaleString()}
                </span>
                <span className={`text-sm font-semibold ${up ? "text-[#FE6D73]" : "text-[#9cffd9]"}`}>
                  {up ? "▲" : "▼"}{Math.abs(change).toLocaleString()} ({up ? "+" : "-"}{Math.abs(changePercent).toFixed(2)}%)
                </span>
              </div>
            );
          })()}
        </div>

        {/* Tabs - 膠囊樣式：日/周/月 */}
        <div className="px-3 py-1">
          <div className="flex items-center gap-0.5 bg-muted/30 rounded-lg p-0.5">
            {[
              { key: "day", label: "日" },
              { key: "week", label: "周" },
              { key: "month", label: "月" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setMarketTimeframe(tab.key as "day" | "week" | "month")}
                className={`flex-1 px-2 py-1 rounded-md text-xs font-medium transition-all ${
                  marketTimeframe === tab.key
                    ? "bg-primary text-black"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 日期 + 開高低收 */}
        <div className="px-3 mb-0.5">
          {(() => {
            const latest = marketTrendData[marketTrendData.length - 1];
            return (
              <p className="text-xs text-muted-foreground">
                <span className="text-foreground font-medium">{latest.date}</span>
                {" "}開 {latest.open.toLocaleString()}{" "}
                高 <span className="text-[#FE6D73]">{latest.high.toLocaleString()}</span>{" "}
                低 <span className="text-[#9cffd9]">{latest.low.toLocaleString()}</span>{" "}
                收 {latest.close.toLocaleString()}
              </p>
            );
          })()}
        </div>

        {/* MA + 強勢線數值 - 2x2 grid */}
        <div className="px-3 mb-0.5 grid grid-cols-2 gap-x-4 gap-y-0 text-xs">
          {showMA20 && (
            <span>
              <span className="text-muted-foreground">MA20 </span>
              <span style={{ color: "#EAB308" }}>{marketTrendData[marketTrendData.length - 1].ma20.toLocaleString()}</span>
            </span>
          )}
          {showLongMA && (
            <span>
              <span className="text-muted-foreground">MA100 </span>
              <span style={{ color: "#E040FB" }}>{marketTrendData[marketTrendData.length - 1].ma100.toLocaleString()}</span>
            </span>
          )}
          {showLeaderLine && (
            <span>
              <span className="text-muted-foreground">當期領頭羊 </span>
              <span style={{ color: "#FF9800" }}>{marketTrendData[marketTrendData.length - 1].currentLeader.toLocaleString()}</span>
            </span>
          )}
          {showLeaderLine && (
            <span>
              <span className="text-muted-foreground">前期領頭羊 </span>
              <span style={{ color: "#42A5F5" }}>{marketTrendData[marketTrendData.length - 1].prevLeader.toLocaleString()}</span>
            </span>
          )}
        </div>

        {/* K線圖表 */}
        <div style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={marketTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
              <XAxis
                dataKey="date"
                stroke="hsl(var(--foreground))"
                style={{ fontSize: "10px", fill: "hsl(var(--foreground))" }}
                tickLine={false}
                axisLine={{ stroke: "hsl(var(--border))" }}
                interval={3}
              />
              <YAxis
                stroke="hsl(var(--foreground))"
                style={{ fontSize: "10px", fill: "hsl(var(--foreground))" }}
                tickLine={false}
                axisLine={{ stroke: "hsl(var(--border))" }}
                domain={["dataMin - 200", "dataMax + 200"]}
                tickFormatter={(v) => v.toLocaleString()}
              />
              <Tooltip content={() => null} cursor={false} />
              <Line type="monotone" dataKey="close" stroke={lineColor} strokeWidth={2.5} dot={false} />
              {showMA20 && (
                <Line type="monotone" dataKey="ma20" stroke="#EAB308" strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
              )}
              {showLongMA && (
                <Line type="monotone" dataKey="ma100" stroke="#E040FB" strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
              )}
              {showLeaderLine && (
                <Line type="monotone" dataKey="currentLeader" stroke="#FF9800" strokeWidth={1.5} dot={false} strokeDasharray="6 3" />
              )}
              {showLeaderLine && (
                <Line type="monotone" dataKey="prevLeader" stroke="#42A5F5" strokeWidth={1.5} dot={false} strokeDasharray="6 3" />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 成交量 */}
        <div className="px-3">
          <div className="flex items-center text-xs mb-0.5">
            <span className="text-foreground font-medium">量: {marketTrendData[marketTrendData.length - 1].volume.toLocaleString()}億</span>
          </div>
          <div style={{ height: "60px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={marketTrendData}>
                <Bar dataKey="volume" barSize={6}>
                  {marketTrendData.map((entry, index) => (
                    <Cell
                      key={`vol-${index}`}
                      fill={entry.close >= entry.open ? "#FE6D73" : "#9cffd9"}
                      opacity={0.7}
                    />
                  ))}
                </Bar>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 技術線切換 */}
        <div className="flex items-center justify-between px-3 py-2 mt-1 border-t border-border">
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground font-medium">技術線：</span>

            <button onClick={() => setShowMA20(!showMA20)} className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: "#EAB308", backgroundColor: showMA20 ? "#EAB308" : "transparent" }}>
                {showMA20 && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
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

            <button onClick={() => setShowLeaderLine(!showLeaderLine)} className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: "#4A90E2", backgroundColor: showLeaderLine ? "#4A90E2" : "transparent" }}>
                {showLeaderLine && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <span className="text-xs text-foreground">強勢線</span>
            </button>
          </div>
        </div>
      </section>

      
      {/* 社團貼文 */}
      <section className="py-4 border-b border-border/30">
        <div className="px-4 flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold">社團貼文</h2>
          <button
            onClick={() => navigate("/home/discussion")}
            className="text-primary text-sm flex items-center gap-1 hover:opacity-80 transition-opacity font-medium"
          >
            查看更多
            <ChevronRight className="w-4 h-4 text-primary" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
          {socialPosts.map((post) => (
            <div
              key={post.id}
              className="flex-shrink-0 w-72 bg-card rounded-lg p-3 border border-border hover:border-primary/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-2">
                <ImageWithFallback
                  src={post.avatar}
                  alt={post.author}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate">
                    {post.author}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {post.time}
                  </div>
                </div>
              </div>
              <h3 className="text-sm font-medium mb-1 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {post.preview}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 內容專區 */}
      <section className="py-4 border-b border-border/30">
        <div className="px-4 flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold">精選內容</h2>
          <button
            onClick={() => navigate("/home/content")}
            className="text-primary text-sm flex items-center gap-1 hover:opacity-80 transition-opacity font-medium"
          >
            查看更多
            <ChevronRight className="w-4 h-4 text-primary" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
          {contentItems.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-48 cursor-pointer group"
            >
              <div className="relative rounded-lg overflow-hidden mb-2">
                <ImageWithFallback
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-27 object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-white text-xs rounded font-medium shadow-md">
                  {item.type}
                </div>
              </div>
              <h3 className="text-sm font-normal line-clamp-2 leading-snug">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* 社交媒體連結 */}
      <section className="px-4 py-4">
        <h2 className="text-lg font-bold mb-3">追蹤我們</h2>
        <div className="flex gap-6 justify-center">
          <a
            href="https://line.me"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-14 h-14 bg-[#06C755] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
            <span className="text-xs text-muted-foreground">
              LINE
            </span>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-14 h-14 bg-[#1877F2] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <Facebook className="w-7 h-7 text-white" />
            </div>
            <span className="text-xs text-muted-foreground">
              Facebook
            </span>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#515BD4] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <Instagram className="w-7 h-7 text-white" />
            </div>
            <span className="text-xs text-muted-foreground">
              Instagram
            </span>
          </a>
        </div>
      </section>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}