import { useState } from "react";
import {
  Star,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  X,
  Edit2,
  GripVertical,
  Minus,
  Search,
  Flame,
  Plus,
  LayoutGrid,
  LayoutList,
  Heart,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router";
import {
  getWatchlistNames,
  updateWatchlistName,
  isInAnyWatchlist,
  removeFromWatchlist,
  addToWatchlist,
} from "../lib/watchlistStorage";
import { RankStarRating } from "../components/RankStarRating";
import { SearchStockModal } from "../components/SearchStockModal";
import {
  StockFilters,
  MarketType,
  FilterType,
} from "../components/StockFilters";
import {
  AdvancedFilters,
  AdvancedFilterOptions,
} from "../components/AdvancedFilters";
import { StockCard } from "../components/StockCard";
import { AddToWatchlistModal } from "../components/AddToWatchlistModal";

type SortField =
  | "rank"
  | "code"
  | "name"
  | "price"
  | "changePercent" // 新增：漲跌幅排序字段
  | "trilogy1"
  | "trilogy2"
  | "trilogy3"
  | "capitalBillion"
  | "weekly20MaPrice"
  | "weeklyDeviation"
  | "weeklyVolume"
  | "weeklyVolumeMultiple"
  | "industry";
type SortDirection = "asc" | "desc";

interface WatchlistStock {
  code: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  trilogy1: number;
  trilogy2: number;
  trilogy3: number;
  totalScore: number;
  capitalBillion: number;
  weekly20MaPrice: number;
  weeklyDeviation: number;
  weeklyVolume: number;
  weeklyVolumeMultiple: number;
  industry: string;
  hasFlame: boolean; // 火焰標記
}

// 模擬自選股數據
const mockWatchlist: WatchlistStock[] = [
  {
    code: "2330",
    name: "台積電",
    price: 575.0,
    change: 5.0,
    changePercent: 0.88,
    trilogy1: 2,
    trilogy2: 1,
    trilogy3: 2,
    totalScore: 5,
    capitalBillion: 500,
    weekly20MaPrice: 570,
    weeklyDeviation: 5,
    weeklyVolume: 25680,
    weeklyVolumeMultiple: 1.2,
    industry: "半導體-IC製造",
    hasFlame: true,
  },
  {
    code: "2454",
    name: "聯發科",
    price: 920.0,
    change: -12.0,
    changePercent: -1.29,
    trilogy1: 1,
    trilogy2: 2,
    trilogy3: 1,
    totalScore: 4,
    capitalBillion: 300,
    weekly20MaPrice: 910,
    weeklyDeviation: -15,
    weeklyVolume: 8540,
    weeklyVolumeMultiple: 0.8,
    industry: "半導體-IC設計",
    hasFlame: false,
  },
  {
    code: "2317",
    name: "鴻海",
    price: 105.5,
    change: 2.5,
    changePercent: 2.43,
    trilogy1: 2,
    trilogy2: 2,
    trilogy3: 0,
    totalScore: 4,
    capitalBillion: 100,
    weekly20MaPrice: 100,
    weeklyDeviation: 5,
    weeklyVolume: 45200,
    weeklyVolumeMultiple: 1.5,
    industry: "電子-零組件",
    hasFlame: false,
  },
  {
    code: "2308",
    name: "台達電",
    price: 315.0,
    change: -3.5,
    changePercent: -1.1,
    trilogy1: 0,
    trilogy2: 1,
    trilogy3: 2,
    totalScore: 3,
    capitalBillion: 200,
    weekly20MaPrice: 310,
    weeklyDeviation: -10,
    weeklyVolume: 6780,
    weeklyVolumeMultiple: 1.1,
    industry: "電子-電源供應",
    hasFlame: false,
  },
];

// K棒組件 - 紅上升綠下降
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

export function WatchlistPage() {
  const [watchlist, setWatchlist] =
    useState<WatchlistStock[]>(mockWatchlist);
  const [sortField, setSortField] = useState<SortField>("code");
  const [sortDirection, setSortDirection] =
    useState<SortDirection>("asc");
  const [activeTab, setActiveTab] = useState(1); // 自選1-5
  const [isEditMode, setIsEditMode] = useState(false); // 編輯模式
  const [watchlistNames, setWatchlistNames] = useState(
    getWatchlistNames(),
  ); // 群組名稱
  const [editingTab, setEditingTab] = useState<number | null>(
    null,
  ); // 正在編輯的標籤
  const [editingName, setEditingName] = useState(""); // 編輯中的名稱
  const [showSearchModal, setShowSearchModal] = useState(false); // 搜尋彈窗
  const [draggedIndex, setDraggedIndex] = useState<
    number | null
  >(null); // 正在拖拽的項目索引
  const [showAddGroupModal, setShowAddGroupModal] = useState(false); // 新增群組彈窗
  const [newGroupName, setNewGroupName] = useState(""); // 新群組名稱
  const [totalGroups, setTotalGroups] = useState(5); // 總群組數，預設5個
  const [showEditGroupModal, setShowEditGroupModal] = useState(false); // 編輯群組名稱彈窗

  // 篩選器狀態
  const [marketType, setMarketType] =
    useState<MarketType>("bull");
  const [filterType, setFilterType] =
    useState<FilterType>("above-ma");
  const [advancedFilters, setAdvancedFilters] =
    useState<AdvancedFilterOptions>({
      leaderIndustry: null,
      loserIndustry: null,
      specialFilter: null,
      volumePeriod: null,
      volumeMultiple: null,
      marketCap: "above20B", // 預設：股本大於20億
      avgVolume: "above1000", // 預設：周均量大於1000張
    });
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">(
    "list",
  ); // 視圖模式：列表或卡片
  // 大盤數據
  const [marketChange, setMarketChange] = useState(-488.54); // 大盤漲跌點數
  const [marketChangePercent, setMarketChangePercent] =
    useState(-1.51); // 大盤漲跌幅

  // 加入自選股彈窗狀態
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState<{code: string; name: string} | null>(null);

  // 移除自選股彈窗狀態
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [stockToRemove, setStockToRemove] = useState<{code: string; name: string} | null>(null);

  const navigate = useNavigate();

  const handleMarketTypeChange = (type: MarketType) => {
    setMarketType(type);
    // 根據市場類型自動調整篩選類型
    if (type === "bull") {
      setFilterType("above-ma");
    } else {
      setFilterType("below-ma");
    }
  };

  const handleRemove = (
    code: string,
    event: React.MouseEvent,
  ) => {
    event.stopPropagation();
    setWatchlist(
      watchlist.filter((stock) => stock.code !== code),
    );
    removeFromWatchlist(code);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(
        sortDirection === "asc" ? "desc" : "asc",
      );
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // 開始編輯群組名稱
  const handleStartEdit = (
    tab: number,
    e: React.MouseEvent,
  ) => {
    if (isEditMode) {
      e.stopPropagation();
      setEditingTab(tab);
      setEditingName(watchlistNames[tab]);
    }
  };

  // 保存群組名稱
  const handleSaveEdit = (tab: number) => {
    if (editingName.trim()) {
      updateWatchlistName(tab, editingName.trim());
      setWatchlistNames({
        ...watchlistNames,
        [tab]: editingName.trim(),
      });
    }
    setEditingTab(null);
    setEditingName("");
  };

  // 取消編輯
  const handleCancelEdit = () => {
    setEditingTab(null);
    setEditingName("");
  };

  // 拖拽排序處理函數
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (
    e: React.DragEvent,
    index: number,
  ) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newWatchlist = [...watchlist];
    const draggedItem = newWatchlist[draggedIndex];
    newWatchlist.splice(draggedIndex, 1);
    newWatchlist.splice(index, 0, draggedItem);

    setWatchlist(newWatchlist);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const sortedWatchlist = [...watchlist].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (aValue < bValue)
      return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue)
      return sortDirection === "asc" ? 1 : -1;
    return 0;
  });
  
  // 根据当前活动的群组过滤股票列表
  // 目前只有自选1有数据，其他群组显示空状态
  const currentWatchlist = activeTab === 1 ? sortedWatchlist : [];

  const totalValue = watchlist.reduce(
    (sum, stock) => sum + stock.price * 100,
    0,
  );
  const totalChange = watchlist.reduce(
    (sum, stock) => sum + stock.change * 100,
    0,
  );

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
      onClick={() => handleSort(field)}
      className={`sticky top-0 bg-card backdrop-blur-sm border-b border-border px-2 py-2.5 text-[11px] font-semibold text-muted-foreground cursor-pointer hover:text-foreground hover:bg-muted/30 transition-colors z-10 ${className}`}
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

  return (
    <div className="pb-16">
      <div className="flex flex-col gap-3">
        {/* Header */}
        <div className="flex-none bg-background border-b border-border">
          <div className="max-w-screen-xl mx-auto px-4 pt-3">
            {/* 恩如選股區域 */}
            <div>
              <div className="flex flex-col gap-3">
                {/* 第一排：大盤 + 工具按鈕 */}
                <div className="pb-1">
                  <div className="flex items-center justify-between gap-3">
                    {/* 左側：大盤 */}
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          navigate("/market-index")
                        }
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                          marketChange > 0
                            ? "bg-[#FE6D73]/20 border border-[#FE6D73]/30 hover:bg-[#FE6D73]/30"
                            : marketChange < 0
                              ? "bg-[#9cffd9]/20 border border-[#9cffd9]/30 hover:bg-[#9cffd9]/30"
                              : "bg-gray-500/20 border border-gray-500/30 hover:bg-gray-500/30"
                        }`}
                      >
                        <span
                          className={`text-xs font-medium ${
                            marketChange > 0
                              ? "text-[#FE6D73]"
                              : marketChange < 0
                                ? "text-[#9cffd9]"
                                : "text-gray-400"
                          }`}
                        >
                          大盤
                        </span>
                        <span
                          className={`text-xs font-bold ${
                            marketChange > 0
                              ? "text-[#FE6D73]"
                              : marketChange < 0
                                ? "text-[#9cffd9]"
                                : "text-gray-400"
                          }`}
                        >
                          {marketChange > 0
                            ? "▲"
                            : marketChange < 0
                              ? "▼"
                              : "—"}
                        </span>
                        <span
                          className={`text-xs font-bold ${
                            marketChange > 0
                              ? "text-[#FE6D73]"
                              : marketChange < 0
                                ? "text-[#9cffd9]"
                                : "text-gray-400"
                          }`}
                        >
                          {Math.abs(marketChange).toFixed(2)}
                        </span>
                      </button>
                    </div>

                    {/* 右側按鈕組 */}
                    <div className="flex items-center gap-2">
                      {/* 切換視圖按鈕 */}
                      <button
                        onClick={() =>
                          setViewMode(
                            viewMode === "list"
                              ? "grid"
                              : "list",
                          )
                        }
                        className="p-2 rounded-lg bg-muted/50 text-muted-foreground hover:bg-muted transition-all"
                        title="切換視圖"
                      >
                        {viewMode === "list" ? (
                          <LayoutGrid className="w-5 h-5" />
                        ) : (
                          <LayoutList className="w-5 h-5" />
                        )}
                      </button>

                      {/* 編輯模式按鈕 */}
                      <button
                        onClick={() => {
                          if (!isEditMode) {
                            // 進入編輯模式
                            setIsEditMode(true);
                          } else {
                            // 退出編輯模式
                            setIsEditMode(false);
                            setEditingTab(null);
                            setEditingName("");
                          }
                        }}
                        className={`p-2 rounded-lg transition-all ${
                          isEditMode
                            ? "bg-primary text-black"
                            : " text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>

                      {/* 搜尋按鈕 */}
                      <button
                        onClick={() => navigate("/search")}
                        className="p-2  text-muted-foreground hover:bg-muted rounded-full transition-colors"
                      >
                        <Search className="w-5 h-5 " />
                      </button>
                    </div>
                  </div>
                </div>

                 {/* 目前為假資料 正式開發請用1.資料來源：
a.策略(Signal)
【多方】
站上週20MA
"dtnoNum": "6038991",
"paramStr": "SPMode=0;DTMode=0;",
"assignSpid": "",
"keyMap": "",
"filterNumber": "0"

強勢週20MA之上
"dtnoNum": "5893528",
"paramStr": "SPMode=0;DTMode=0;",
"assignSpid": "",
"keyMap": "",
"filterNumber": "0"

【空方】
跌破週20MA
"dtnoNum": "6279677",
"paramStr": "SPMode=0;DTMode=0;",
"assignSpid": "",
"keyMap": "",
"filterNumber": "0"

弱勢週20MA之下
"dtnoNum": "6279696",
"paramStr": "SPMode=0;DTMode=0;",
"assignSpid": "",
"keyMap": "",
"filterNumber": "0" */}
                {/* 篩選條件 Tab */}
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                      {marketType === "bull" ? (
                        <>
                          
                          
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() =>
                              setFilterType("below-ma")
                            }
                            className="relative px-4 py-1.5 text-base font-medium transition-colors whitespace-nowrap"
                          >
                            <span
                              className={
                                filterType === "below-ma"
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              }
                            >
                              跌破週20MA
                            </span>
                            {filterType === "below-ma" && (
                              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF]" />
                            )}
                          </button>
                          <button
                            onClick={() =>
                              setFilterType("weak-ma")
                            }
                            className="relative px-4 py-1.5 text-base font-medium transition-colors whitespace-nowrap"
                          >
                            <span
                              className={
                                filterType === "weak-ma"
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              }
                            >
                              弱勢週20MA
                            </span>
                            {filterType === "weak-ma" && (
                              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF]" />
                            )}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {/* 產業與篩選按鈕組被移除了，下方內容將自然往上頂部填補垂直空間 */}
              </div>
            </div>
          </div>

          {/* 搜索輸入框 - 可收合 */}
          {showSearchInput && (
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="搜尋股票代號或名稱..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                autoFocus
              />
            </div>
          )}
        </div>
      </div>

      {/* 群組標籤 */}
      <div className="flex-none bg-background border-b border-border">
        <div className="max-w-screen-xl mx-auto px-4 pb-3">
          <div className="flex items-center gap-3 border-t border-border pt-3">
            {/* 滾動區域 */}
            <div className="flex-1 overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-6">
                {Array.from({ length: totalGroups }, (_, i) => i + 1).map((tab) => (
                  <div
                    key={tab}
                    className="relative pb-1 transition-colors whitespace-nowrap"
                  >
                    {editingTab === tab ? (
                      // 編輯模式：顯示輸入框
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) =>
                          setEditingName(e.target.value)
                        }
                        onBlur={() => handleSaveEdit(tab)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSaveEdit(tab);
                          } else if (e.key === "Escape") {
                            handleCancelEdit();
                          }
                        }}
                        autoFocus
                        className="text-xs font-medium bg-background border border-primary rounded px-1.5 py-0.5 outline-none focus:ring-1 focus:ring-primary/50 text-foreground min-w-[50px] max-w-[80px]"
                      />
                    ) : (
                      // 正常模式：顯示標籤
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            if (!isEditMode) {
                              setActiveTab(tab);
                            }
                          }}
                          className={`text-sm font-medium ${
                            isEditMode
                              ? "cursor-default"
                              : "cursor-pointer"
                          } ${
                            activeTab === tab
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {watchlistNames[tab] || `自選${tab}`}
                        </button>
                        {/* 編輯模式下顯示筆圖標 */}
                        {isEditMode && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingName(watchlistNames[tab] || `自選${tab}`);
                              setActiveTab(tab);
                              setShowEditGroupModal(true);
                            }}
                            className="p-1 hover:bg-muted rounded transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                          </button>
                        )}
                      </div>
                    )}
                    {activeTab === tab && editingTab !== tab && (
                      <div className="absolute bottom-[-9px] left-1/2 -translate-x-1/2 w-full h-0.5 bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF]" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* 固定的新增群組按鈕 */}
            <button
              onClick={() => setShowAddGroupModal(true)}
              className="flex-shrink-0 p-2 hover:bg-muted rounded-lg transition-colors"
              title="新增群組"
            >
              <Plus className="w-4 h-4 text-muted-foreground hover:text-primary" />
            </button>
          </div>
        </div>
      </div>

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
      {/* Stock Table */}
      <div className="max-w-screen-xl mx-auto ">
        {currentWatchlist.length === 0 ? (
          // 空状态：根据视图模式显示不同的空状态
          viewMode === "grid" ? (
            // 卡片视图 - 空状态
            <div className="flex flex-col items-center justify-between min-h-[calc(100vh-400px)] px-4 py-12">
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="text-center mb-2 text-muted-foreground">
                  尚未添加自選股
                </div>
                <div className="text-sm text-center text-muted-foreground">
                  點擊下方按鈕添加您感興趣的股票
                </div>
              </div>
              <button
                onClick={() => navigate("/search")}
                className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
              >
                <Plus className="w-8 h-8" />
              </button>
            </div>
          ) : (
            // 列表视图 - 空状态
            <div className="flex flex-col items-center justify-between min-h-[calc(100vh-400px)] px-4 py-12">
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="text-center mb-2 text-muted-foreground">
                  尚未添加自選股
                </div>
                <div className="text-sm text-center text-muted-foreground">
                  點擊下方按鈕添加您感興趣的股票
                </div>
              </div>
              <button
                onClick={() => setShowSearchModal(true)}
                className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
              >
                <Plus className="w-8 h-8" />
              </button>
            </div>
          )
        ) : viewMode === "grid" ? (
          // 卡片视图 - 有数据
          <div className="px-4 pt-4 pb-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {currentWatchlist.map((stock) => (
                <StockCard
                  key={stock.code}
                  code={stock.code}
                  name={stock.name}
                  price={stock.price}
                  change={stock.change}
                  changePercent={stock.changePercent}
                  trilogyScore={stock.totalScore}
                  trilogy1={stock.trilogy1}
                  trilogy2={stock.trilogy2}
                  trilogy3={stock.trilogy3}
                  weeklyDeviation={stock.weeklyDeviation}
                  hasFlame={
                    (filterType === "strong-ma" || filterType === "weak-ma") &&
                    stock.hasFlame
                  }
                  isEditMode={isEditMode}
                  isFavorite={true}
                  onToggleFavorite={(code) => {
                    setSelectedStock({ code, name: stock.name });
                    setShowGroupModal(true);
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          // 列表视图 - 有数据
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  {/* 編輯模式：加入自選股 */}
                  {isEditMode && (
                    <th className="sticky top-0 left-0 z-40 bg-card backdrop-blur-sm border-b border-border px-2 py-2.5 text-[11px] font-semibold text-muted-foreground min-w-[50px] border-r border-border/50">
                      自選
                    </th>
                  )}
                  
                  {/* 編輯模式：排序欄位 */}
                  {isEditMode && (
                    <th className="sticky top-0 left-[50px] z-40 bg-card backdrop-blur-sm border-b border-border px-2 py-2.5 text-[11px] font-semibold text-muted-foreground min-w-[50px] border-r border-border/50">
                      排序
                    </th>
                  )}
                  
                  {/* 火焰欄位 - 只在強勢/弱勢時顯示 */}
                  {(filterType === "strong-ma" ||
                    filterType === "weak-ma") && (
                    <th
                      className={`sticky top-0 backdrop-blur-sm border-b border-border px-1 py-2.5 text-[11px] font-semibold text-muted-foreground z-40 min-w-[50px] border-r border-border/50 bg-card ${isEditMode ? "left-[100px]" : "left-0"}`}
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
                          ? "left-[150px]"
                          : "left-[50px]"
                        : isEditMode
                          ? "left-[100px]"
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
                          ? "left-[190px]"
                          : "left-[90px]"
                        : isEditMode
                          ? "left-[140px]"
                          : "left-[40px]"
                    } z-40 min-w-[70px] w-[70px] bg-card border-r-2 border-border`}
                  >
                    股票
                  </TableHeader>

                  <TableHeader field="price" className="min-w-[70px] bg-card">
                    收盤價
                  </TableHeader>
                  
                  <TableHeader field="changePercent" className="min-w-[80px] bg-card border-r border-border/50">
                    漲跌幅
                  </TableHeader>

                  <TableHeader field="trilogy1" className="min-w-[100px] bg-card">
                    {marketType === "bull"
                      ? "挑噴出/回檔"
                      : "挑下殺/反彈"}
                  </TableHeader>
                  
                  <TableHeader field="trilogy2" className="min-w-[110px] bg-card">
                    看型態
                  </TableHeader>
                  
                  <TableHeader field="trilogy3" className="min-w-[100px] bg-card">
                    看量找動能
                  </TableHeader>
                  
                  <TableHeader field="weeklyDeviation" className="min-w-[90px] bg-card border-r border-border/50">
                    週20MA乖離
                  </TableHeader>

                  <TableHeader field="capitalBillion" className="min-w-[80px] bg-card">
                    股本(億)
                  </TableHeader>
                  
                  <TableHeader field="weekly20MaPrice" className="min-w-[100px] bg-card">
                    {filterType === "strong-ma"
                      ? "領頭羊(價)"
                      : filterType === "weak-ma"
                        ? "落水狗(價)"
                        : "20週均(價)"}
                  </TableHeader>
                  
                  <TableHeader field="weeklyVolume" className="min-w-[80px] bg-card">
                    週成交量
                  </TableHeader>
                  
                  <TableHeader field="weeklyVolumeMultiple" className="min-w-[90px] bg-card">
                    週爆量(倍)
                  </TableHeader>
                  
                  <TableHeader field="industry" className="min-w-[100px] bg-card">
                    產業名稱
                  </TableHeader>
                </tr>
              </thead>
              <tbody>
                {currentWatchlist.map((stock, index) => {
                  const isEven = index % 2 === 0;
                  const isPositive = stock.change > 0;
                  const isNegative = stock.change < 0;
                  
                  return (
                    <tr
                      key={stock.code}
                      draggable={isEditMode}
                      onDragStart={() =>
                        handleDragStart(index)
                      }
                      onDragOver={(e) =>
                        handleDragOver(e, index)
                      }
                      onDragEnd={handleDragEnd}
                      className={`border-b border-border/30 hover:bg-primary/10 transition-all duration-150 cursor-pointer ${
                        isEditMode ? "cursor-move" : ""
                      } ${draggedIndex === index ? "opacity-50" : ""} ${
                        isEven ? "bg-card/30" : "bg-card/60"
                      }`}
                      onClick={() =>
                        navigate(`/stock/${stock.code}`)
                      }
                    >
                      {/* 編輯模式：移除自選股 */}
                      {isEditMode && (
                        <td
                          className={`sticky left-0 z-20 px-2 py-2 text-center border-r border-border/50 ${isEven ? "bg-card" : "bg-card/95"}`}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setStockToRemove({ code: stock.code, name: stock.name });
                              setShowRemoveModal(true);
                            }}
                            className="p-1 hover:bg-[#4A90E2]/20 rounded-full transition-colors group"
                          >
                            <Heart className="w-4 h-4 text-[#4A90E2] fill-[#4A90E2]" />
                          </button>
                        </td>
                      )}
                      
                      {/* 編輯模式：排序欄位 */}
                      {isEditMode && (
                        <td
                          className={`sticky left-[50px] z-20 px-2 py-2 text-center border-r border-border/50 ${isEven ? "bg-card" : "bg-card/95"}`}
                        >
                          <GripVertical className="w-4 h-4 text-muted-foreground" />
                        </td>
                      )}
                      
                      {/* 火焰欄位 */}
                      {(filterType === "strong-ma" ||
                        filterType === "weak-ma") && (
                        <td
                          className={`sticky z-20 px-3 py-3 text-center border-r border-border/50 ${isEven ? "bg-card" : "bg-card/95"} ${isEditMode ? "left-[100px]" : "left-0"}`}
                        >
                          {stock.hasFlame && (
                            <Flame className="w-4 h-4 text-chart-2 mx-auto" />
                          )}
                        </td>
                      )}
                      
                      {/* 總分 */}
                      <td
                        className={`sticky z-20 px-2 py-2 text-center border-r border-border/50 ${isEven ? "bg-card" : "bg-card/95"} ${
                          filterType === "strong-ma" ||
                          filterType === "weak-ma"
                            ? isEditMode
                              ? "left-[150px]"
                              : "left-[50px]"
                            : isEditMode
                              ? "left-[100px]"
                              : "left-0"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <RankStarRating
                            score={stock.totalScore}
                            size="sm"
                          />
                        </div>
                      </td>
                      
                      {/* 股票（代号+名称+K棒） */}
                      <td
                        className={`sticky z-20 px-3 py-2.5 border-r-2 border-border ${isEven ? "bg-card" : "bg-card/95"} ${
                          filterType === "strong-ma" ||
                          filterType === "weak-ma"
                            ? isEditMode
                              ? "left-[190px]"
                              : "left-[90px]"
                            : isEditMode
                              ? "left-[140px]"
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
                        className={`px-3 py-3 text-center font-semibold text-[13px] ${
                          isEven ? "bg-card/30" : "bg-card/60"
                        }`}
                      >
                        {stock.price.toFixed(2)}
                      </td>
                      
                      {/* 漲跌幅 */}
                      <td
                        className={`px-3 py-3 text-center font-semibold text-[13px] border-r border-border/50 ${
                          isEven ? "bg-card/30" : "bg-card/60"
                        } ${
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
                        className={`px-3 py-3 text-center ${
                          isEven ? "bg-primary/5" : "bg-primary/10"
                        }`}
                      >
                        <StarRating count={stock.trilogy1} />
                      </td>
                      <td
                        className={`px-3 py-3 text-center ${
                          isEven ? "bg-primary/5" : "bg-primary/10"
                        }`}
                      >
                        <StarRating count={stock.trilogy2} />
                      </td>
                      <td
                        className={`px-3 py-3 text-center ${
                          isEven ? "bg-primary/5" : "bg-primary/10"
                        }`}
                      >
                        <StarRating count={stock.trilogy3} />
                      </td>
                      
                      {/* 週20MA乖離 */}
                      <td
                        className={`px-3 py-3 text-center font-semibold text-[13px] border-r border-border/50 ${
                          isEven ? "bg-card/30" : "bg-card/60"
                        } ${
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
                        className={`px-3 py-3 text-center text-[13px] ${
                          isEven ? "bg-card/30" : "bg-card/60"
                        }`}
                      >
                        {stock.capitalBillion}
                      </td>
                      
                      {/* 20週均(價) */}
                      <td
                        className={`px-3 py-3 text-center text-[13px] ${
                          isEven ? "bg-card/30" : "bg-card/60"
                        }`}
                      >
                        {stock.weekly20MaPrice.toFixed(2)}
                      </td>
                      
                      {/* 週成交量 */}
                      <td
                        className={`px-3 py-3 text-center text-[13px] ${
                          isEven ? "bg-card/30" : "bg-card/60"
                        }`}
                      >
                        {stock.weeklyVolume.toLocaleString()}
                      </td>
                      
                      {/* 週爆量(倍) */}
                      <td
                        className={`px-3 py-3 text-center font-semibold text-[13px] ${
                          isEven ? "bg-card/30" : "bg-card/60"
                        } ${
                          stock.weeklyVolumeMultiple > 1
                            ? "text-chart-2"
                            : stock.weeklyVolumeMultiple < 1
                              ? "text-chart-3"
                              : ""
                        }`}
                      >
                        {stock.weeklyVolumeMultiple.toFixed(2)}x
                      </td>
                      
                      {/* 產業名稱 */}
                      <td
                        className={`px-3 py-3 text-left text-muted-foreground text-[12px] ${
                          isEven ? "bg-card/30" : "bg-card/60"
                        }`}
                      >
                        {stock.industry}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 搜尋彈窗 */}
      <SearchStockModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
      />
      
      {/* 加入自選股彈窗 */}
      {selectedStock && (
        <AddToWatchlistModal
          isOpen={showGroupModal}
          onClose={() => {
            setShowGroupModal(false);
            setSelectedStock(null);
          }}
          stockCode={selectedStock.code}
          stockName={selectedStock.name}
          currentWatchlistIndex={activeTab}
        />
      )}
      
      {/* 新增群組彈窗 */}
      {showAddGroupModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
          <div className="bg-card border-t border-border rounded-t-2xl shadow-lg w-full max-w-screen-xl mx-auto animate-slide-up">
            <div className="px-6 py-5 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">新增群組</h2>
                <button
                  onClick={() => {
                    setShowAddGroupModal(false);
                    setNewGroupName("");
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="px-6 py-6">
              <label className="block text-base font-medium mb-3">
                群組名稱
              </label>
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newGroupName.trim()) {
                    // 處理新增群組
                    const newGroupIndex = totalGroups + 1;
                    updateWatchlistName(newGroupIndex, newGroupName.trim());
                    setWatchlistNames({
                      ...watchlistNames,
                      [newGroupIndex]: newGroupName.trim(),
                    });
                    setTotalGroups(newGroupIndex);
                    setShowAddGroupModal(false);
                    setNewGroupName("");
                    setActiveTab(newGroupIndex);
                  }
                }}
                placeholder="請輸入群組名稱"
                className="w-full px-4 py-4 text-base bg-background border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                autoFocus
              />
            </div>
            <div className="px-6 py-5 border-t border-border flex justify-end gap-3 pb-24">
              <button
                onClick={() => {
                  setShowAddGroupModal(false);
                  setNewGroupName("");
                }}
                className="px-6 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => {
                  if (newGroupName.trim()) {
                    // 處理新增群組
                    const newGroupIndex = totalGroups + 1;
                    updateWatchlistName(newGroupIndex, newGroupName.trim());
                    setWatchlistNames({
                      ...watchlistNames,
                      [newGroupIndex]: newGroupName.trim(),
                    });
                    setTotalGroups(newGroupIndex);
                    setShowAddGroupModal(false);
                    setNewGroupName("");
                    setActiveTab(newGroupIndex);
                  }
                }}
                disabled={!newGroupName.trim()}
                className="px-6 py-3 text-base font-medium bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                確認
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* 移除自選股彈窗 */}
      {stockToRemove && showRemoveModal && (
        <>
          {/* 背景遮罩 */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-200"
            onClick={() => {
              setShowRemoveModal(false);
              setStockToRemove(null);
            }}
          />

          {/* 彈窗內容 */}
          <div className="fixed inset-x-0 bottom-0 z-50 animate-in slide-in-from-bottom duration-300">
            <div className="bg-background rounded-t-3xl shadow-2xl max-w-xl mx-auto">
              {/* Header */}
              <div className="relative border-b border-border px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold">管理自選股群組</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {stockToRemove.name} ({stockToRemove.code})
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowRemoveModal(false);
                      setStockToRemove(null);
                    }}
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* 自選股清單選項 */}
              <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
                <div className="space-y-2">
                  {Array.from({ length: totalGroups }, (_, i) => i + 1).map((groupIndex) => {
                    // 每次渲染时重新检查该股票所在的群组
                    const groupsWithStock = isInAnyWatchlist(stockToRemove.code);
                    const isChecked = groupsWithStock.includes(groupIndex);
                    
                    return (
                      <label
                        key={groupIndex}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border-2 transition-all cursor-pointer ${
                          isChecked
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50 hover:bg-primary/5"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              if (isChecked) {
                                // 從此群組移除股票
                                removeFromWatchlist(groupIndex, stockToRemove.code);
                                // 如果這是當前群組，更新列表
                                if (groupIndex === activeTab) {
                                  setWatchlist(
                                    watchlist.filter((s) => s.code !== stockToRemove.code)
                                  );
                                }
                              } else {
                                // 添加到此群組
                                addToWatchlist(groupIndex, stockToRemove.code, stockToRemove.name);
                              }
                              // 強制重新渲染
                              setShowRemoveModal(false);
                              setTimeout(() => setShowRemoveModal(true), 0);
                            }}
                            className="w-5 h-5 rounded border-2 border-muted-foreground checked:bg-primary checked:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer accent-primary"
                          />
                          <div className="text-left">
                            <div className="font-medium text-sm">
                              {watchlistNames[groupIndex] || `自選${groupIndex}`}
                            </div>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-border">
                <button
                  onClick={() => {
                    setShowRemoveModal(false);
                    setStockToRemove(null);
                  }}
                  className="w-full py-3 rounded-xl bg-muted hover:bg-muted/80 font-medium transition-colors"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* 編輯群組名稱彈窗 */}
      {showEditGroupModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
          <div className="bg-card border-t border-border rounded-t-2xl shadow-lg w-full max-w-screen-xl mx-auto animate-slide-up">
            <div className="px-6 py-5 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">編輯群組名稱</h2>
                <button
                  onClick={() => {
                    setShowEditGroupModal(false);
                    setEditingName("");
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="px-6 py-6">
              <label className="block text-base font-medium mb-3">
                群組名稱
              </label>
              <input
                type="text"
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && editingName.trim()) {
                    // 處理編輯群組名稱
                    updateWatchlistName(activeTab, editingName.trim());
                    setWatchlistNames({
                      ...watchlistNames,
                      [activeTab]: editingName.trim(),
                    });
                    setShowEditGroupModal(false);
                    setEditingName("");
                  }
                }}
                placeholder="請輸入群組名稱"
                className="w-full px-4 py-4 text-base bg-background border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                autoFocus
              />
            </div>
            <div className="px-6 py-5 border-t border-border flex justify-end gap-3 pb-24">
              <button
                onClick={() => {
                  setShowEditGroupModal(false);
                  setEditingName("");
                }}
                className="px-6 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => {
                  if (editingName.trim()) {
                    // 處理編輯群組名稱
                    updateWatchlistName(activeTab, editingName.trim());
                    setWatchlistNames({
                      ...watchlistNames,
                      [activeTab]: editingName.trim(),
                    });
                    setShowEditGroupModal(false);
                    setEditingName("");
                  }
                }}
                disabled={!editingName.trim()}
                className="px-6 py-3 text-base font-medium bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                確認
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
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
            fill={`url(#gold-gradient-watchlist-${i})`}
            stroke="#B8860B"
            strokeWidth="0.5"
          />
          <defs>
            <linearGradient
              id={`gold-gradient-watchlist-${i}`}
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