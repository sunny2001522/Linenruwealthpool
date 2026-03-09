import { useState } from "react";
import { useNavigate } from "react-router";
import { TrendingUp, ChevronRight, TrendingDown } from "lucide-react";
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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { StarIcon1, StarIcon2, StarIcon3 } from "../components/StarIcons";
import { Carousel } from "../components/Carousel";

type PeriodType = "current" | "previous";

interface WatchStock {
  rank: number;
  code: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

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

const watchStocks: WatchStock[] = [
  {
    rank: 1,
    code: "2330",
    name: "台積電",
    price: 685.0,
    change: 15.0,
    changePercent: 2.24,
  },
  {
    rank: 2,
    code: "2454",
    name: "聯發科",
    price: 1245.0,
    change: 35.0,
    changePercent: 2.89,
  },
  {
    rank: 3,
    code: "2382",
    name: "廣達",
    price: 298.5,
    change: 12.5,
    changePercent: 4.37,
  },
];

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

// 落水狗類股數據
const currentLosers: LeaderStock[] = [
  {
    rank: 1,
    code: "",
    name: "傳產-塑膠工業",
    industry: "傳產-塑膠工業",
  },
  {
    rank: 2,
    code: "",
    name: "傳產-紡織纖維",
    industry: "傳產-紡織纖維",
  },
  {
    rank: 3,
    code: "",
    name: "金融-證券",
    industry: "金融-證券",
  },
  {
    rank: 4,
    code: "",
    name: "傳產-航運",
    industry: "傳產-航運",
  },
  {
    rank: 5,
    code: "",
    name: "傳產-鋼鐵工業",
    industry: "傳產-鋼鐵工業",
  },
  {
    rank: 6,
    code: "",
    name: "傳產-水泥工業",
    industry: "傳產-水泥工業",
  },
  {
    rank: 7,
    code: "",
    name: "金融-保險",
    industry: "金融-保險",
  },
  {
    rank: 8,
    code: "",
    name: "傳產-化學工業",
    industry: "傳產-化學工業",
  },
  {
    rank: 9,
    code: "",
    name: "傳產-營建",
    industry: "傳產-營建",
  },
  {
    rank: 10,
    code: "",
    name: "傳產-觀光",
    industry: "傳產-觀光",
  },
];

const previousLosers: LeaderStock[] = [
  {
    rank: 1,
    code: "",
    name: "傳產-貿易百貨",
    industry: "傳產-貿易百貨",
  },
  {
    rank: 2,
    code: "",
    name: "傳產-食品工業",
    industry: "傳產-食品工業",
  },
  {
    rank: 3,
    code: "",
    name: "金融-金控",
    industry: "金融-金控",
  },
  {
    rank: 4,
    code: "",
    name: "傳產-汽車工業",
    industry: "傳產-汽車工業",
  },
  {
    rank: 5,
    code: "",
    name: "傳產-造紙工業",
    industry: "傳產-造紙工業",
  },
  {
    rank: 6,
    code: "",
    name: "傳產-電機機械",
    industry: "傳產-電機機械",
  },
  {
    rank: 7,
    code: "",
    name: "傳產-橡膠工業",
    industry: "傳產-橡膠工業",
  },
  {
    rank: 8,
    code: "",
    name: "傳產-玻璃陶瓷",
    industry: "傳產-玻璃陶瓷",
  },
  {
    rank: 9,
    code: "",
    name: "金融-其他金融",
    industry: "金融-其他金融",
  },
  {
    rank: 10,
    code: "",
    name: "傳產-其他",
    industry: "傳產-其他",
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

// 大盤趨勢數據 (最近30天)
const marketTrendData = [
  { date: "12/29", value: 22800 },
  { date: "1/02", value: 22950 },
  { date: "1/03", value: 22820 },
  { date: "1/06", value: 23100 },
  { date: "1/07", value: 23250 },
  { date: "1/08", value: 23180 },
  { date: "1/09", value: 23350 },
  { date: "1/10", value: 23280 },
  { date: "1/13", value: 23450 },
  { date: "1/14", value: 23520 },
  { date: "1/15", value: 23410 },
  { date: "1/16", value: 23680 },
  { date: "1/17", value: 23750 },
  { date: "1/20", value: 23820 },
  { date: "1/21", value: 23690 },
  { date: "1/22", value: 23850 },
  { date: "1/23", value: 23920 },
  { date: "1/24", value: 24050 },
  { date: "1/27", value: 24180 },
  { date: "1/28", value: 24320 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-2 shadow-lg">
        <p className="text-xs text-muted-foreground mb-1">
          {payload[0].payload.date}
        </p>
        <p className="text-sm font-bold text-foreground">
          {payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export function HomePage() {
  const [leaderPeriod, setLeaderPeriod] =
    useState<PeriodType>("current");
  const [loserPeriod, setLoserPeriod] =
    useState<PeriodType>("current");
  const navigate = useNavigate();

  const currentLeaderStocks =
    leaderPeriod === "current"
      ? currentLeaders
      : previousLeaders;

  const currentLoserStocks =
    loserPeriod === "current"
      ? currentLosers
      : previousLosers;

  const handleIndustryClick = (industry: string, type?: "leader" | "loser") => {
    if (type === "loser") {
      // 落水狗类股：同时设置loserIndustry和空方
      navigate(
        `/stock-picker?loserIndustry=${encodeURIComponent(industry)}&side=short`,
      );
    } else {
      // 领头羊类股：只设置industry
      navigate(
        `/stock-picker?industry=${encodeURIComponent(industry)}`,
      );
    }
  };

  // 計算大盤漲跌
  const marketChange =
    marketTrendData[marketTrendData.length - 1].value -
    marketTrendData[0].value;
  const isMarketUp = marketChange > 0;
  const lineColor = isMarketUp ? "#FE6D73" : "#9cffd9"; // 紅漲綠跌

  return (
    <div className="bg-background pb-16">
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
      <section className="px-4 py-4 border-b border-border/30">
        <div className="flex items-center justify-between mb-3 px-4">
          <h2 className="text-lg font-bold">熱門焦點股票</h2>
          <button
            onClick={() => navigate("/home/stock-picker")}
            className="text-primary text-sm flex items-center gap-1 hover:opacity-80 transition-opacity font-medium"
          >
            查看更多
            <ChevronRight className="w-4 h-4 text-primary" />
          </button>
        </div>
        <div className="space-y-2">
          {watchStocks.map((stock, index) => {
            const StarIcon = index === 0 ? StarIcon3 : index === 1 ? StarIcon1 : StarIcon2;
            const starColor = index === 0 ? "#D4AF37" : index === 1 ? "#F5E0A4" : "#8B4513";
            return (
              <div
                key={stock.code}
                onClick={() => navigate(`/stock/${stock.code}`)}
                className="flex items-center justify-between bg-card rounded-lg p-3 border border-border hover:border-primary/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex flex-col items-center justify-center">
                    <StarIcon className="size-[28px]" />
                    <span className="text-[10px] font-medium -mt-1" style={{ color: starColor }}>
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex flex-col items-start justify-center gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold">
                        {stock.price}
                      </span>
                      <span className="text-sm font-medium" style={{ color: '#FE6D73' }}>
                        +{stock.change} (+{stock.changePercent}%)
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] text-muted-foreground font-medium">
                        {stock.code}
                      </span>
                      <span className="text-[13px] font-semibold">
                        {stock.name}
                      </span>
                    </div>
                  </div>
                </div>
                <TrendingUp className="w-5 h-5" style={{ color: '#FE6D73' }} />
              </div>
            );
          })}
        </div>
      </section>

      {/* 領頭羊類股 */}
      <section className="px-4 py-4 border-b border-border/30">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold">領頭羊類股</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setLeaderPeriod("current")}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all shadow-md ${
                leaderPeriod === "current"
                  ? "bg-gradient-to-r from-[#E5C100] via-[#D4AF37] to-[#B8860B] text-black"
                  : "bg-card text-muted-foreground border border-border"
              }`}
            >
              當期
            </button>
            <button
              onClick={() => setLeaderPeriod("previous")}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all shadow-md ${
                leaderPeriod === "previous"
                  ? "bg-gradient-to-r from-[#E5C100] via-[#D4AF37] to-[#B8860B] text-black"
                  : "bg-card text-muted-foreground border border-border"
              }`}
            >
              前期
            </button>
          </div>
        </div>

        {/* 領頭羊卡片 - 橫向滑動 */}
        {/* 目前為假資料 正式開發邏輯:
領頭羊
多方情況下
取表 4702290 (近120日漲幅) 的各欄位
每一欄位：
累加所有股票漲幅數值 (A)
計算樣本數 (B)
取得領頭羊計算指標 C = A / B
逐欄位生成集合 D (所有 C 的集合)

舉例:
第一輪計算  　取欄位「漲幅(%)119」中所有股票的數值進行加總，記為 A。  　同時，記錄該欄位中股票的總數，記為 B。  　以 A ÷ B 計算所得之結果，定義為「領頭羊計算指標」(C)。
第二輪計算  　取欄位「漲幅(%)118」中所有股票的數值進行加總，記為 A。  　記錄該欄位股票總數為 B，並以 A ÷ B 計算出「領頭羊計算指標」(C)。
重複計算與結果彙整  　依上述步驟，依序對表格中各「漲幅(%)」欄位進行相同之計算。  　最終，彙整各輪所取得之「領頭羊計算指標」(C) 值，形成「領頭羊計算指標集合」(D)。
以此類推。 
設定每檔股票的「領頭羊」：
預設值 = 個股近120天收盤價
領頭羊 = 累乘 (1 + 集合D之第N筆數值/100(N從0到集合D結束) */}
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {currentLeaderStocks.map((stock) => {
            // 拆分產業名稱，例如 "電子上游-IC設計" -> ["電子上游", "IC設計"]
            const parts = stock.industry.split("-");
            const category = parts[0] || "";
            const subCategory = parts.slice(1).join("-") || "";
            
            return (
              <div
                key={`${stock.rank}-${stock.industry}`}
                onClick={() => handleIndustryClick(stock.industry)}
                className="flex-shrink-0 w-24 bg-card rounded-lg p-3 border border-border hover:border-primary/50 transition-colors cursor-pointer shadow-sm"
              >
                <div className="flex flex-col h-full items-center">
                  {/* 排名 */}
                  <div className="text-2xl font-bold mb-1.5 text-primary">
                    {stock.rank}
                  </div>
                  
                  {/* 類別 */}
                  <div className="text-xs text-foreground/70 mb-1 text-center leading-tight">
                    {category}
                  </div>
                  
                  {/* 子類別 */}
                  <div className="text-sm font-medium text-primary mb-2 flex-1 text-center leading-tight">
                    {subCategory}
                  </div>
                  
                  {/* 箭頭 */}
                  <ChevronRight className="w-4 h-4 text-primary" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 落水狗類股 */}
      <section className="px-4 py-4 border-b border-border/30">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold">落水狗類股</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setLoserPeriod("current")}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all shadow-md ${
                loserPeriod === "current"
                  ? "bg-gradient-to-r from-[#E5C100] via-[#D4AF37] to-[#B8860B] text-black"
                  : "bg-card text-muted-foreground border border-border"
              }`}
            >
              當期
            </button>
            <button
              onClick={() => setLoserPeriod("previous")}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all shadow-md ${
                loserPeriod === "previous"
                  ? "bg-gradient-to-r from-[#E5C100] via-[#D4AF37] to-[#B8860B] text-black"
                  : "bg-card text-muted-foreground border border-border"
              }`}
            >
              前期
            </button>
          </div>
        </div>

        {/* 落水狗卡片 - 橫向滑動 */}
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {currentLoserStocks.map((stock) => {
            // 拆分產業名稱，例如 "電子上游-IC設計" -> ["電子上游", "IC設計"]
            const parts = stock.industry.split("-");
            const category = parts[0] || "";
            const subCategory = parts.slice(1).join("-") || "";
            
            return (
              <div
                key={`${stock.rank}-${stock.industry}`}
                onClick={() => handleIndustryClick(stock.industry, "loser")}
                className="flex-shrink-0 w-24 bg-card rounded-lg p-3 border border-border hover:border-primary/50 transition-colors cursor-pointer shadow-sm"
              >
                <div className="flex flex-col h-full items-center">
                  {/* 排名 */}
                  <div className="text-2xl font-bold mb-1.5 text-primary">
                    {stock.rank}
                  </div>
                  
                  {/* 類別 */}
                  <div className="text-xs text-foreground/70 mb-1 text-center leading-tight">
                    {category}
                  </div>
                  
                  {/* 子類別 */}
                  <div className="text-sm font-medium text-primary mb-2 flex-1 text-center leading-tight">
                    {subCategory}
                  </div>
                  
                  {/* 箭頭 */}
                  <ChevronRight className="w-4 h-4 text-primary" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 大盤趨勢 */}
      <section className="px-4 py-3 border-b border-border/30">
        <h2 className="text-base font-bold mb-2">大盤趨勢</h2>

        <div className="bg-card rounded-lg border border-border overflow-hidden shadow-sm">
          {/* 指數資訊卡片 */}
          <div className="bg-gradient-to-br from-card via-card to-primary/5 p-3 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-foreground/60 mb-0.5">
                  台灣加權指數
                </div>
                <div className="text-2xl font-bold">
                  {marketTrendData[
                    marketTrendData.length - 1
                  ].value.toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`text-xl font-bold ${
                    marketTrendData[marketTrendData.length - 1]
                      .value -
                      marketTrendData[0].value >
                    0
                      ? "text-chart-2"
                      : "text-chart-3"
                  }`}
                >
                  {marketTrendData[marketTrendData.length - 1]
                    .value -
                    marketTrendData[0].value >
                  0
                    ? "+"
                    : ""}
                  {(
                    marketTrendData[marketTrendData.length - 1]
                      .value - marketTrendData[0].value
                  ).toLocaleString()}
                </div>
                <div
                  className={`text-sm font-medium ${
                    marketTrendData[marketTrendData.length - 1]
                      .value -
                      marketTrendData[0].value >
                    0
                      ? "text-chart-2"
                      : "text-chart-3"
                  }`}
                >
                  {marketTrendData[marketTrendData.length - 1]
                    .value -
                    marketTrendData[0].value >
                  0
                    ? "+"
                    : ""}
                  {(
                    ((marketTrendData[
                      marketTrendData.length - 1
                    ].value -
                      marketTrendData[0].value) /
                      marketTrendData[0].value) *
                    100
                  ).toFixed(2)}
                  %
                </div>
              </div>
            </div>
          </div>

          {/* 圖表區域 */}
          <div className="p-3">
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={marketTrendData}>
                <CartesianGrid
                  key="grid"
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  opacity={0.2}
                />
                <XAxis
                  key="xAxis"
                  dataKey="date"
                  stroke="hsl(var(--foreground))"
                  style={{ fontSize: "10px", fill: "hsl(var(--foreground))" }}
                  tickLine={false}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                  interval={3}
                />
                <YAxis
                  key="yAxis"
                  stroke="hsl(var(--foreground))"
                  style={{ fontSize: "10px", fill: "hsl(var(--foreground))" }}
                  tickLine={false}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                  domain={["dataMin - 200", "dataMax + 200"]}
                  tickFormatter={(value) => value.toLocaleString()}
                />
                <Tooltip key="tooltip" content={<CustomTooltip />} />
                <Line
                  key="line"
                  type="monotone"
                  dataKey="value"
                  stroke={lineColor}
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{
                    r: 5,
                    fill: lineColor,
                    strokeWidth: 2,
                    stroke: "#fff",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="text-xs text-foreground/50 text-center mt-1.5">
              近20個交易日走勢
            </div>
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