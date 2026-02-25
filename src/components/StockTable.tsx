import {
  Star,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Heart,
  Lock,
  Flame,
} from "lucide-react";
import { useNavigate } from "react-router";
import { Stock } from "../lib/stockData";
import { MarketType, FilterType } from "./StockFilters";
import { useState } from "react";
import { AddToWatchlistModal } from "./AddToWatchlistModal";
import { RankStarRating } from "./RankStarRating";
import { SubscriptionModal } from "./SubscriptionModal";
import { isInAnyWatchlist } from "../lib/watchlistStorage";

export type SortField =
  | "rank"
  | "code"
  | "name"
  | "price"
  | "changePercent"  // 新增：漲跌幅排序字段
  | "trilogy1"
  | "trilogy2"
  | "trilogy3"
  | "capitalBillion"
  | "weekly20MaPrice" // 修改：從 weekly20MaBillion 改為 weekly20MaPrice
  | "weeklyDeviation"
  | "weeklyVolume"
  | "weeklyVolumeMultiple" // 修改：從 weeklyVolumeDiffBillion 改為 weeklyVolumeMultiple
  | "industry";

export type SortDirection = "asc" | "desc";

interface StockTableProps {
  stocks: Stock[];
  marketType: MarketType;
  filterType: FilterType;
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  isEditMode?: boolean; // 編輯模式
  isPro?: boolean; // 是否為專業版用戶
}

function StarRating({ count }: { count: number }) {
  if (count === 0)
    return <span className="text-muted-foreground">-</span>;
  return (
    <div className="flex items-center justify-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill={`url(#gold-gradient-stock-table-${i})`}
            stroke="#B8860B"
            strokeWidth="0.5"
          />
          <defs>
            <linearGradient
              id={`gold-gradient-stock-table-${i}`}
              x1="12"
              y1="2"
              x2="12"
              y2="22"
            >
              <stop offset="0%" stopColor="#E5C100" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#B8860B" />
            </linearGradient>
          </defs>
        </svg>
      ))}
    </div>
  );
}

// 獲取恩如三部曲的三個評分
function getTrilogyScores(stock: Stock): {
  score1: number;
  score2: number;
  score3: number;
  total: number;
} {
  const score1 = Math.min(stock.trilogyScore, 2);
  const score2 =
    stock.trilogyScore > 0
      ? Math.min(stock.trilogyScore, 2)
      : 0;
  const score3 =
    stock.trilogyScore > 1
      ? Math.min(stock.trilogyScore - 1, 2)
      : 0;
  const total = Math.min(6, score1 + score2 + score3);

  return { score1, score2, score3, total };
}

// K組件 - 紅上升綠下降
function KBar({ change }: { change: number }) {
  const isPositive = change > 0;
  const isNegative = change < 0;

  // 根據漲跌決定顏色 (台股規則: 紅漲綠跌)
  const color = isPositive
    ? "bg-chart-2"
    : isNegative
      ? "bg-chart-3"
      : "bg-muted-foreground";

  return (
    <div className="flex flex-col items-center justify-center h-12 w-3">
      {/* 上影線 */}
      <div className={`w-px h-2 ${color}`}></div>
      {/* K棒實體 */}
      <div className={`w-1.5 h-6 ${color}`}></div>
      {/* 下影線 */}
      <div className={`w-px h-2 ${color}`}></div>
    </div>
  );
}

function SortIcon({
  field,
  currentField,
  direction,
}: {
  field: SortField;
  currentField: SortField;
  direction: SortDirection;
}) {
  if (field !== currentField) {
    return <ArrowUpDown className="w-3 h-3 opacity-50" />;
  }
  return direction === "asc" ? (
    <ArrowUp className="w-3 h-3 text-primary" />
  ) : (
    <ArrowDown className="w-3 h-3 text-primary" />
  );
}

export function StockTable({
  stocks,
  marketType,
  filterType,
  sortField,
  sortDirection,
  onSort,
  isEditMode,
  isPro,
}: StockTableProps) {
  const navigate = useNavigate();

  const TableHeader = ({
    field,
    children,
    className = "",
  }: {
    field: SortField;
    children: React.ReactNode;
    className?: string;
  }) => (
    <th
      onClick={() => onSort(field)}
      className={`sticky top-0 bg-card backdrop-blur-sm border-b border-border ps-2 pe-1 py-2.5 text-[11px] font-semibold text-muted-foreground cursor-pointer hover:text-foreground hover:bg-muted/30 transition-colors z-10 ${className}`}
    >
      <div className="flex items-center justify-center gap-1.5 whitespace-nowrap">
        <span>{children}</span>
        <SortIcon
          field={field}
          currentField={sortField}
          direction={sortDirection}
        />
      </div>
    </th>
  );

  const [selectedStock, setSelectedStock] =
    useState<Stock | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] =
    useState(false);

  const handleAddToWatchlist = (stock: Stock) => {
    setSelectedStock(stock);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openSubscriptionModal = () => {
    setIsSubscriptionModalOpen(true);
  };

  const closeSubscriptionModal = () => {
    setIsSubscriptionModalOpen(false);
  };

  // 免費版只顯示前3筆數據
  const displayStocks = isPro ? stocks : stocks.slice(0, 3);
  const hasMoreStocks = !isPro && stocks.length > 3;

  return (
    <div className="w-full h-full relative flex flex-col">
      {/* 表格區域 - 可左右滑動 */}
      <div className="flex-shrink-0 overflow-x-auto overflow-y-auto scrollbar-hide">
        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

         {/* 目前為假資料，正式開發時請用下方資料
         c.欄位
c-1.恩如三部曲 (星星) 判斷邏輯(預計製作成後端)
(A) 多方情況下
① 挑噴出/回檔
站上週 20MA (最多兩顆星)
若 5122133(蓄勢待發) 內含該股 → 加 兩顆星
否則若 6086866(逆轉勝) 內含該股 → 加 一顆星 
強勢週 20MA
若 (過去9天最低價 > 個股領頭羊(價)) 且 (今日最低價與個股領頭羊(價)差距 < 2%) 且 (收盤價 > 個股領頭羊(價)) → 加 兩顆星
否則若 (收盤價 ≥ 個股領頭羊(價)) 且 (昨日收盤 ≤ 個股領頭羊(價)  或 今日最低價 ≤ 個股領頭羊(價)) → 加 一顆星 
② 選型態看趨勢
若 6086867(海闊天空) 或 6086869(庸中佼佼) 內含該股 → 加 一顆星
若 6086884(一往直前) 或 103664275(直道而行) 內含該股 → 再加 一顆星 
③ 看量找動能
若 6086650(真金烈火) 或 6086870(後起新秀) 內含該股 → 加 一顆星
若 5975178(金玉其質) 或 6086872(前程萬里) 內含該股 → 再加 一顆星 
(B) 空方情況下
① 挑下殺/反轉
站上週 20MA
若 6279813(蓄勢待發S) 內含該股 → 加 兩顆星
否則若 6279861(逆轉勝S) 內含該股 → 加 一顆星 
強勢週 20MA
若 (過去9天最高價 < 個股領頭羊(價)) 且 (今日最高價與個股領頭羊(價)差距 < 2%) 且 (收盤價 > 個股領頭羊(價)) → 加 兩顆星
否則若 (收盤價 ≤ 個股領頭羊(價)) 且 (昨日收盤 ≥ 個股領頭羊(價)) → 加 一顆星 
② 選型態看趨勢
若 6279703(海闊天空S) 或 6279773(庸中佼佼S) 內含該股 → 加 一顆星
若 6279991(一往直前S) 或 6280157(直道而行S) 內含該股 → 再加 一顆星 
③ 看量找動能
若 6283001(真金烈火S) 或 6283009(後起新秀S) 內含該股 → 加 一顆星
若 6283010(金玉其質S) 或 6283011(前程萬里S) 內含該股 → 再加 一顆星

c-2.股價
"index": "218",
"描述": "指定多檔股票計算",
"目標載體": "Api",(包含訂閱WebSocket)
"Route": "GetTarget",
"TypeName": "StockCalculation",
"keyNamePath"："Commodity,CommKey" {"propertyName"："StrikePrice"
"columnName"："即時成交價"}

c-3.漲跌幅
"index": "218",
"描述": "指定多檔股票計算",
"目標載體": "Api",(包含訂閱WebSocket)
"Route": "GetTarget",
"TypeName": "StockCalculation",
"keyNamePath"："Commodity,CommKey" {"propertyName"："ChangeRange"
"columnName"："漲跌幅"}

c-4.20週均(價)
"dtnoNum": "4697915",
"paramStr": "SPMode=0;HideDTField=0;DTMode=0;",
"assignSpid": "",
"keyMap": "",
"filterNumber": "0",
"欄位"："週20MA"

c-5.週20MA乖離
"dtnoNum": "4697915",
"paramStr": "SPMode=0;HideDTField=0;DTMode=0;",
"assignSpid": "",
"keyMap": "",
"filterNumber": "0",
"欄位"："週20MA乖離"

c-6.週成交量
"dtnoNum": "4697915",
"paramStr": "SPMode=0;HideDTField=0;DTMode=0;",
"assignSpid": "",
"keyMap": "",
"filterNumber": "0",
"欄位"："週成交量"

c-7.週爆量(倍)
"dtnoNum": "4697915",
"paramStr": "SPMode=0;HideDTField=0;DTMode=0;",
"assignSpid": "",
"keyMap": "",
"filterNumber": "0",
"欄位"："週爆量_倍數"

c-8.產業名稱
"dtnoNum": "4697915",
"paramStr": "SPMode=0;HideDTField=0;DTMode=0;",
"assignSpid": "",
"keyMap": "",
"filterNumber": "0",
"欄位"："細產業分類"
         
         */}
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-card backdrop-blur-sm border-b-2 border-primary/20">
              {/* 編輯模式：加入自選股 */}
              {isEditMode && (
                <th className="sticky text-nowrap top-0 left-0 z-40 bg-card backdrop-blur-sm border-b border-border px-2 py-2.5 text-[11px] font-semibold text-muted-foreground min-w-[50px] border-r border-border/50">
                  加入自選
                </th>
              )}

              {/* 火焰欄位 - 放在最左邊，總分前面，只在強勢/弱勢時顯示 */}
              {(filterType === "strong-ma" ||
                filterType === "weak-ma") && (
                <th
                  className={`sticky top-0 backdrop-blur-sm border-b border-border px-1 py-2.5 text-[11px] font-semibold text-muted-foreground z-40 min-w-[50px] border-r border-border/50 bg-card ${isEditMode ? "left-[50px]" : "left-0"}`}
                >
                  <div className="flex items-center justify-center gap-1.5 whitespace-nowrap">
                    <span>火焰</span>
                  </div>
                </th>
              )}

              <TableHeader
                field="rank"
                className={`${
                  filterType === "strong-ma" ||
                  filterType === "weak-ma"
                    ? isEditMode
                      ? "left-[100px]"
                      : "left-[50px]"
                    : isEditMode
                      ? "left-[50px]"
                      : "left-0"
                } z-40 min-w-[40px] w-[40px] bg-card border-r border-border/50`}
              >
                總分
              </TableHeader>
              <TableHeader
                field="code"
                className={`${
                  filterType === "strong-ma" ||
                  filterType === "weak-ma"
                    ? isEditMode
                      ? "left-[140px]"
                      : "left-[90px]"
                    : isEditMode
                      ? "left-[90px]"
                      : "left-[40px]"
                } z-40 min-w-[70px] w-[70px] bg-card border-r-2 border-border`}
              >
                股票
              </TableHeader>

              <TableHeader
                field="price"
                className="min-w-[70px] bg-card"
              >
                收盤價
              </TableHeader>
              {/* 新增：漲跌幅 */}
              <TableHeader
                field="changePercent"
                className="min-w-[80px] bg-card border-r border-border/50"
              >
                漲跌幅
              </TableHeader>

              {/* 恩如三部曲 - 直接放在第一行 */}
              <TableHeader
                field="trilogy1"
                className="min-w-[100px] bg-card"
              >
                {marketType === "bull"
                  ? "挑噴出/回檔"
                  : "挑下殺/反彈"}
              </TableHeader>
              <TableHeader
                field="trilogy2"
                className="min-w-[110px] bg-card"
              >
                看型態{" "}
                {/* 修改：從「看盤技籌碼」改為「看型態」 */}
              </TableHeader>
              <TableHeader
                field="trilogy3"
                className="min-w-[100px] bg-card"
              >
                看量找動能
              </TableHeader>
              {/* 移動到這裡：週20MA乖離 */}
              <TableHeader
                field="weeklyDeviation"
                className="min-w-[90px] bg-card border-r border-border/50"
              >
                週20MA乖離
              </TableHeader>

              <TableHeader
                field="capitalBillion"
                className="min-w-[80px] bg-card"
              >
                股本(億)
              </TableHeader>
              <TableHeader
                field="weekly20MaPrice"
                className="min-w-[100px] bg-card"
              >
                {" "}
                {/* 修改：欄位名和顯示名稱 */}
                {filterType === "strong-ma"
                  ? "領頭羊(價)"
                  : filterType === "weak-ma"
                    ? "落水狗(價)"
                    : "20週均(價)"}
              </TableHeader>
              <TableHeader
                field="weeklyVolume"
                className="min-w-[80px] bg-card"
              >
                週成交量
              </TableHeader>
              <TableHeader
                field="weeklyVolumeMultiple"
                className="min-w-[90px] bg-card"
              >
                {" "}
                {/* 修改：欄位名和顯示名稱 */}
                週爆量(倍)
              </TableHeader>
              <TableHeader
                field="industry"
                className="min-w-[100px] bg-card"
              >
                產業名
              </TableHeader>
            </tr>
          </thead>
          <tbody>
            {displayStocks.map((stock, index) => {
              const isPositive = stock.change > 0;
              const isNegative = stock.change < 0;
              const isEven = index % 2 === 0;
              const trilogyScores = getTrilogyScores(stock);

              return (
                <tr
                  key={stock.code}
                  className={`border-b border-border/30 hover:bg-primary/10 transition-all duration-150 relative ${
                    isEven ? "bg-card/30" : "bg-card/60"
                  }`}
                >
                  {/* 編輯模式：加入自選股 */}
                  {isEditMode && (() => {
                    const isFavorite = isInAnyWatchlist(stock.code).length > 0;
                    return (
                      <td
                        className={`sticky left-0 z-20 px-2 py-2 text-center border-r border-border/50 ${isEven ? "bg-card" : "bg-card/95"}`}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToWatchlist(stock);
                          }}
                          className="p-1 hover:bg-primary/20 rounded-full transition-colors group"
                        >
                          <Heart
                            className={`w-4 h-4 transition-all ${
                              isFavorite
                                ? "text-primary fill-primary"
                                : "text-muted-foreground group-hover:text-primary group-hover:fill-primary"
                            }`}
                          />
                        </button>
                      </td>
                    );
                  })()}

                  {/* 火焰欄位 - 放在最左邊，總分前面，只在強勢/弱勢時顯示 */}
                  {(filterType === "strong-ma" ||
                    filterType === "weak-ma") && (
                    <td
                      className={`sticky z-20 px-3 py-3 text-center border-r border-border/50 ${isEven ? "bg-card" : "bg-card/95"} ${isEditMode ? "left-[50px]" : "left-0"}`}
                    >
                      {stock.hasFlame && (
                        <Flame className="w-4 h-4 text-chart-2 mx-auto" />
                      )}
                    </td>
                  )}

                  <td
                    className={`sticky z-20 px-2 py-2 text-center border-r border-border/50 ${isEven ? "bg-card" : "bg-card/95"} ${
                      filterType === "strong-ma" ||
                      filterType === "weak-ma"
                        ? isEditMode
                          ? "left-[100px]"
                          : "left-[50px]"
                        : isEditMode
                          ? "left-[50px]"
                          : "left-0"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <RankStarRating
                        score={trilogyScores.total}
                      />
                    </div>
                  </td>
                  <td
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/stock/${stock.code}`);
                    }}
                    className={`sticky z-20 px-3 py-2.5 border-r-2 border-border cursor-pointer ${isEven ? "bg-card" : "bg-card/95"} ${
                      filterType === "strong-ma" ||
                      filterType === "weak-ma"
                        ? isEditMode
                          ? "left-[140px]"
                          : "left-[90px]"
                        : isEditMode
                          ? "left-[90px]"
                          : "left-[40px]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <KBar change={stock.change} />
                      <div className="flex flex-col items-start justify-center gap-0.5">
                        <span className="text-[10px] text-muted-foreground font-medium leading-tight">
                          {stock.code}
                        </span>
                        <span className="font-semibold leading-tight text-[13px]">
                          {stock.name}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* 收盤價 */}
                  <td
                    className={`relative px-3 py-3 text-center font-semibold text-[13px] ${isEven ? "bg-card/30" : "bg-card/60"}`}
                  >
                    {stock.price.toFixed(2)}
                  </td>
                  {/* 新增：漲跌幅 */}
                  <td
                    className={`relative px-3 py-3 text-center font-semibold text-[13px] border-r border-border/50 ${isEven ? "bg-card/30" : "bg-card/60"} ${
                      isPositive
                        ? "text-chart-2"
                        : isNegative
                          ? "text-chart-3"
                          : "text-foreground"
                    }`}
                  >
                    {isPositive ? "▲" : isNegative ? "▼" : "—"}
                    {Math.abs(stock.changePercent).toFixed(2)}%
                  </td>

                  {/* 恩如三部曲 */}
                  <td
                    className={`relative px-3 py-3 text-center ${isEven ? "bg-primary/5" : "bg-primary/10"}`}
                  >
                    <StarRating count={stock.trilogyScore} />
                  </td>
                  <td
                    className={`relative px-3 py-3 text-center ${isEven ? "bg-primary/5" : "bg-primary/10"}`}
                  >
                    <StarRating
                      count={
                        stock.trilogyScore > 0
                          ? Math.min(stock.trilogyScore, 2)
                          : 0
                      }
                    />
                  </td>
                  <td
                    className={`relative px-3 py-3 text-center ${isEven ? "bg-primary/5" : "bg-primary/10"}`}
                  >
                    <StarRating
                      count={
                        stock.trilogyScore > 1
                          ? Math.min(stock.trilogyScore - 1, 2)
                          : 0
                      }
                    />
                  </td>
                  {/* 移動到這裡：週20MA乖離 */}
                  <td
                    className={`relative px-3 py-3 text-center font-semibold text-[13px] border-r border-border/50 ${isEven ? "bg-card/30" : "bg-card/60"} ${
                      stock.weeklyDeviation > 0
                        ? "text-chart-2"
                        : stock.weeklyDeviation < 0
                          ? "text-chart-3"
                          : ""
                    }`}
                  >
                    {stock.weeklyDeviation > 0 ? "+" : ""}
                    {stock.weeklyDeviation.toFixed(2)}%
                  </td>

                  {/* 股本(億) */}
                  <td
                    className={`relative px-3 py-3 text-center text-[13px] ${isEven ? "bg-card/30" : "bg-card/60"}`}
                  >
                    {stock.capitalBillion.toFixed(2)}
                  </td>
                  {/* 20週均(價) */}
                  <td
                    className={`relative px-3 py-3 text-center text-[13px] ${isEven ? "bg-card/30" : "bg-card/60"}`}
                  >
                    {stock.weekly20MaPrice.toFixed(2)}{" "}
                    {/* 修改：使用 weekly20MaPrice */}
                  </td>
                  {/* 週成交量 */}
                  <td
                    className={`relative px-3 py-3 text-center text-[13px] ${isEven ? "bg-card/30" : "bg-card/60"}`}
                  >
                    {stock.weeklyVolume.toLocaleString()}
                  </td>
                  {/* 週爆量(倍) */}
                  <td
                    className={`relative px-3 py-3 text-center font-semibold text-[13px] ${isEven ? "bg-card/30" : "bg-card/60"} ${
                      stock.weeklyVolumeMultiple > 1
                        ? "text-chart-2"
                        : stock.weeklyVolumeMultiple < 1
                          ? "text-chart-3"
                          : ""
                    }`}
                  >
                    {" "}
                    {/* 修改：顯示邏輯和欄位名 */}
                    {stock.weeklyVolumeMultiple.toFixed(2)}x
                  </td>
                  {/* 產業名稱 */}
                  <td
                    className={`relative px-3 py-3 text-left text-muted-foreground text-[12px] ${isEven ? "bg-card/30" : "bg-card/60"}`}
                  >
                    {" "}
                    {/* 修改：改 text-left 讓格式更好看 */}
                    {stock.industry}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* 試用版升級提示區域 - 固定寬度，不可滾動 */}
      {hasMoreStocks && (
        <div className="flex-shrink-0 w-full py-16 flex items-center justify-center border-t-2 border-border/30 bg-gradient-to-b from-background to-muted/20">
          <div 
            className="flex flex-col items-center gap-4 cursor-pointer"
            onClick={openSubscriptionModal}
          >
            {/* 大的金色鎖頭 */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] to-[#FFD700] rounded-full blur-xl opacity-50" />
              <svg
                className="relative w-20 h-20"
                fill="none"
                stroke="url(#lockGradient)"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <defs>
                  <linearGradient id="lockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#FFD700" />
                  </linearGradient>
                </defs>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            
            {/* 升級按鈕 */}
            <button className="px-10 py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-2xl font-bold text-lg text-black shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              立即升級專業版
            </button>
            
            <p className="text-base text-muted-foreground font-medium">
              解鎖完整選股列表
            </p>
          </div>
        </div>
      )}
      
      {isModalOpen && selectedStock && (
        <AddToWatchlistModal
          isOpen={isModalOpen}
          onClose={closeModal}
          stockCode={selectedStock.code}
          stockName={selectedStock.name}
        />
      )}
      {isSubscriptionModalOpen && (
        <SubscriptionModal
          isOpen={isSubscriptionModalOpen}
          onClose={closeSubscriptionModal}
        />
      )}
    </div>
  );
}