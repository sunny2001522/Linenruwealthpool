import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router";
import {
  StockFilters,
  MarketType,
  FilterType,
} from "../components/StockFilters";
import {
  StockTable,
  SortField,
  SortDirection,
} from "../components/StockTable";
import {
  AdvancedFilters,
  AdvancedFilterOptions,
} from "../components/AdvancedFilters";
import {
  generateMockStocks,
  Stock,
  calculateTrilogyScore,
} from "../lib/stockData";
import {
  Search,
  ChevronDown,
  Edit2,
  LayoutGrid,
  LayoutList,
  Bell,
} from "lucide-react";
import enruImage from "figma:asset/095f4405cde9352f659086e40b9cb6883546f0c4.png";
import { useNavigate } from "react-router";
import { useAuth } from "../lib/authContext";
import { StockCard } from "../components/StockCard";
import { AddToWatchlistModal } from "../components/AddToWatchlistModal";
import { isInAnyWatchlist } from "../lib/watchlistStorage";

export function StockPickerPage() {
  const { user } = useAuth();
  const [marketType, setMarketType] =
    useState<MarketType>("bull");
  const [filterType, setFilterType] =
    useState<FilterType>("above-ma");
  const [sortField, setSortField] = useState<SortField>("rank");
  const [sortDirection, setSortDirection] =
    useState<SortDirection>("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // 編輯模式
  const [viewMode, setViewMode] = useState<"list" | "grid">(
    "list",
  ); // 視圖模式：列表或卡片
  const [showWatchlistModal, setShowWatchlistModal] =
    useState(false);
  const [selectedStock, setSelectedStock] = useState<{
    code: string;
    name: string;
  } | null>(null);
  const [refreshKey, setRefreshKey] = useState(0); // 用於強制重新渲染
  // 大盤數據：red(上漲)、green(下跌)、gray(平盤)
  const [marketSignal, setMarketSignal] = useState<
    "red" | "green" | "gray"
  >("red");
  const [marketChange, setMarketChange] = useState(-488.54); // 大盤漲跌點數
  const [marketChangePercent, setMarketChangePercent] =
    useState(-1.51); // 大盤漲跌幅
  const [advancedFilters, setAdvancedFilters] =
    useState<AdvancedFilterOptions>({
      leaderIndustry: null, // 新增：领头羊产业
      loserIndustry: null, // 新增：落水狗产业
      specialFilter: null,
      volumePeriod: null,
      volumeMultiple: null,
      marketCap: "above20B", // 預設：股本大於20億
      avgVolume: "above1000", // 預設：周均量大於1000張
    });

  // 生成模擬數據
  const allStocks = useMemo(() => generateMockStocks(), []);

  // 據市場類型、篩選條件、排序和搜索過濾股票
  const filteredAndSortedStocks = useMemo(() => {
    let stocks = [...allStocks];

    // 根據市場類型和篩選條件過濾
    stocks = stocks.filter((stock) => {
      if (marketType === "bull") {
        if (filterType === "above-ma") {
          return (
            stock.price > stock.weeklyMa &&
            stock.weeklyDeviation > -5
          );
        } else if (filterType === "strong-ma") {
          return (
            stock.price > stock.weeklyMa &&
            stock.weeklyDeviation > 0
          );
        }
      } else {
        if (filterType === "below-ma") {
          return (
            stock.price < stock.weeklyMa &&
            stock.weeklyDeviation < 5
          );
        } else if (filterType === "weak-ma") {
          return (
            stock.price < stock.weeklyMa &&
            stock.weeklyDeviation < 0
          );
        }
      }
      return true;
    });

    // 應用高級篩選條件
    if (advancedFilters) {
      // 领头羊产业筛选
      if (advancedFilters.leaderIndustry) {
        stocks = stocks.filter(
          (stock) =>
            stock.industry === advancedFilters.leaderIndustry,
        );
      }

      // 落水狗产业筛选
      if (advancedFilters.loserIndustry) {
        stocks = stocks.filter(
          (stock) =>
            stock.industry === advancedFilters.loserIndustry,
        );
      }

      // 股本筛选
      if (advancedFilters.marketCap) {
        switch (advancedFilters.marketCap) {
          case "above20B":
            stocks = stocks.filter(
              (stock) => stock.capitalBillion >= 20,
            );
            break;
          case "above100B":
            stocks = stocks.filter(
              (stock) => stock.capitalBillion >= 100,
            );
            break;
          case "below20B":
            stocks = stocks.filter(
              (stock) => stock.capitalBillion < 20,
            );
            break;
        }
      }

      // 周均量筛选
      if (advancedFilters.avgVolume) {
        switch (advancedFilters.avgVolume) {
          case "above1000":
            stocks = stocks.filter(
              (stock) => stock.weeklyVolume >= 1000,
            );
            break;
          case "above5000":
            stocks = stocks.filter(
              (stock) => stock.weeklyVolume >= 5000,
            );
            break;
          case "above10000":
            stocks = stocks.filter(
              (stock) => stock.weeklyVolume >= 10000,
            );
            break;
        }
      }

      // 量能倍数筛选
      if (
        advancedFilters.volumeMultiple &&
        advancedFilters.volumePeriod
      ) {
        const multiple = parseFloat(
          advancedFilters.volumeMultiple,
        );
        stocks = stocks.filter(
          (stock) => stock.weeklyVolumeMultiple >= multiple,
        );
      }

      // 特殊筛选
      if (advancedFilters.specialFilter) {
        switch (advancedFilters.specialFilter) {
          case "hasFlame":
            stocks = stocks.filter((stock) => stock.hasFlame);
            break;
          case "highScore":
            // 先计算分数再筛选
            const scoredStocks = stocks.map((stock) => ({
              ...stock,
              trilogyScore: calculateTrilogyScore(
                stock,
                marketType,
                filterType,
              ),
            }));
            stocks = scoredStocks.filter(
              (stock) => stock.trilogyScore >= 5,
            );
            break;
        }
      }
    }

    // 計算恩如三部曲評分
    stocks = stocks.map((stock) => ({
      ...stock,
      trilogyScore: calculateTrilogyScore(
        stock,
        marketType,
        filterType,
      ),
    }));

    // 搜索過濾
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      stocks = stocks.filter(
        (stock) =>
          stock.code.toLowerCase().includes(query) ||
          stock.name.toLowerCase().includes(query),
      );
    }

    // 排序
    stocks.sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "rank": {
          // 星等排序: 211 > 210 > 其他
          const getStarRank = (s: typeof a) => {
            const s3 = s.trilogy3Score || 0;
            const s2 = s.trilogy2Score || 0;
            const s1 = s.trilogy1Score || 0;
            if (s3 >= 2 && s2 >= 1 && s1 >= 1) return 3; // 211
            if (s3 >= 2 && s2 >= 1) return 2; // 210
            return 1;
          };
          comparison = getStarRank(b) - getStarRank(a) || b.changePercent - a.changePercent;
          break;
        }
        case "hasFlame":
          comparison = (b.hasFlame ? 1 : 0) - (a.hasFlame ? 1 : 0);
          break;
        case "code":
          comparison = a.code.localeCompare(b.code);
          break;
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "price":
          comparison = b.price - a.price;
          break;
        case "trilogy1":
          comparison = (b.trilogy1Score || 0) - (a.trilogy1Score || 0);
          break;
        case "trilogy2":
          comparison = (b.trilogy2Score || 0) - (a.trilogy2Score || 0);
          break;
        case "trilogy3":
          comparison = (b.trilogy3Score || 0) - (a.trilogy3Score || 0);
          break;
        case "capitalBillion":
          comparison = b.capitalBillion - a.capitalBillion;
          break;
        case "weekly20MaPrice": // 修改：從 weekly20MaBillion 改為 weekly20MaPrice
          comparison = b.weekly20MaPrice - a.weekly20MaPrice;
          break;
        case "weeklyDeviation":
          comparison = b.weeklyDeviation - a.weeklyDeviation;
          break;
        case "weeklyVolume":
          comparison = b.weeklyVolume - a.weeklyVolume;
          break;
        case "weeklyVolumeMultiple": // 修改：從 weeklyVolumeDiffBillion 改為 weeklyVolumeMultiple
          comparison =
            b.weeklyVolumeMultiple - a.weeklyVolumeMultiple;
          break;
        case "industry":
          comparison = a.industry.localeCompare(b.industry);
          break;
        default:
          comparison = 0;
      }

      if (comparison !== 0) {
        return sortDirection === "asc" ? -comparison : comparison;
      }
      
      // 同值時第二順位：依 stock id (code) 由小到大排列
      return a.code.localeCompare(b.code);
    });

    return stocks;
  }, [
    allStocks,
    marketType,
    filterType,
    sortField,
    sortDirection,
    searchQuery,
    advancedFilters,
  ]);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      // 切換排序方向
      setSortDirection(
        sortDirection === "asc" ? "desc" : "asc",
      );
    } else {
      // 新欄位，預設降序
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const handleMarketTypeChange = (type: MarketType) => {
    setMarketType(type);
    // 切換市場類型時，自動切換到對應的默認篩選
    if (type === "bull") {
      setFilterType("above-ma");
    } else {
      setFilterType("below-ma");
    }
  };

  const handleToggleFavorite = (code: string) => {
    const stock = filteredAndSortedStocks.find(
      (s) => s.code === code,
    );
    if (stock) {
      setSelectedStock({ code: stock.code, name: stock.name });
      setShowWatchlistModal(true);
    }
  };

  const navigate = useNavigate();

  // URL Search Params
  const [searchParams] = useSearchParams();

  // 处理URL参数，设置初始值
  useEffect(() => {
    const industry = searchParams.get("industry");
    const loserIndustry = searchParams.get("loserIndustry");
    const side = searchParams.get("side");

    if (industry) {
      // 领头羊产业筛选
      setAdvancedFilters((prev) => ({
        ...prev,
        leaderIndustry: decodeURIComponent(industry),
      }));
    }

    if (loserIndustry) {
      // 落水狗产业筛选
      setAdvancedFilters((prev) => ({
        ...prev,
        loserIndustry: decodeURIComponent(loserIndustry),
      }));
    }

    if (side === "short") {
      // 设置为空方
      setMarketType("bear");
      setFilterType("below-ma");
    }
  }, [searchParams]);


  return (
    <div className="flex flex-col h-full w-full bg-background pb-16">
      {/* Header */}
      <div className="flex-none bg-background border-b border-border">
        <div className="max-w-screen-xl mx-auto px-4 pt-3">
          {/* 恩如選股區域 */}
          <div>
            <div className="flex flex-col gap-3">
              {/* 第一排：大盤 + 多方/空方 + 工具按鈕 */}
              <div className="pb-1">
                <div className="flex items-center justify-between gap-3">
                  {/* 左側：大盤 */}
                  <div className="flex items-center">
                    <button
                      onClick={() => navigate("/market-index")}
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

                  {/* 中間：多方/空方 */}
                  <div className="flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
                    <button
                      onClick={() =>
                        handleMarketTypeChange("bull")
                      }
                      className="relative pb-1 transition-colors"
                    >
                      <span
                        className={`text-base font-medium whitespace-nowrap ${
                          marketType === "bull"
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        多方
                      </span>
                      {marketType === "bull" && (
                        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-red-500" />
                      )}
                    </button>
                    <button
                      onClick={() =>
                        handleMarketTypeChange("bear")
                      }
                      className="relative pb-1 transition-colors"
                    >
                      <span
                        className={`text-base font-medium whitespace-nowrap ${
                          marketType === "bear"
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        空方
                      </span>
                      {marketType === "bear" && (
                        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-green-500" />
                      )}
                    </button>
                  </div>

                  {/* 右側：按鈕組 */}
                  <div className="flex items-center gap-2">
                    {/* 搜尋圖標按鈕 */}
                    <button
                      onClick={() => navigate("/search")}
                      className="p-2 hover:bg-muted rounded-full transition-colors"
                    >
                      <Search className="w-5 h-5 text-muted-foreground" />
                    </button>

                    {/* 鈴鐺按鈕 */}
                    <button
                      onClick={() => navigate("/notifications")}
                      className="relative p-2 hover:bg-muted rounded-full transition-colors"
                    >
                      <Bell className="w-5 h-5 text-muted-foreground" />
                      <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
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
              {/* 第二排：篩選條件 Tab + 篩選按鈕 */}
              <div>
                <div className="flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-1">
                    {marketType === "bull" ? (
                      <>
                        <button
                          onClick={() =>
                            setFilterType("above-ma")
                          }
                          className="relative px-3 py-1.5 text-base font-medium transition-colors whitespace-nowrap"
                        >
                          <span
                            className={
                              filterType === "above-ma"
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }
                          >
                            站上週20MA
                          </span>
                          {filterType === "above-ma" && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF]" />
                          )}
                        </button>
                        <button
                          onClick={() =>
                            setFilterType("strong-ma")
                          }
                          className="relative px-3 py-1.5 text-base font-medium transition-colors whitespace-nowrap"
                        >
                          <span
                            className={
                              filterType === "strong-ma"
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }
                          >
                            強勢週20MA
                          </span>
                          {filterType === "strong-ma" && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF]" />
                          )}
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() =>
                            setFilterType("below-ma")
                          }
                          className="relative px-3 py-1.5 text-base font-medium transition-colors whitespace-nowrap"
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
                          className="relative px-3 py-1.5 text-base font-medium transition-colors whitespace-nowrap"
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

                  {/* 右側：篩選按鈕 + 視圖切換 + 編輯 */}
                  <div className="flex items-center gap-2">
                    <AdvancedFilters
                      filters={advancedFilters}
                      onChange={setAdvancedFilters}
                      marketType={marketType}
                      renderMode="inline"
                    />

                    {/* 切換視圖按鈕 */}
                    <button
                      onClick={() =>
                        setViewMode(
                          viewMode === "list" ? "grid" : "list",
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
                      onClick={() => setIsEditMode(!isEditMode)}
                      className={`p-2 rounded-lg transition-all ${
                        isEditMode
                          ? "bg-primary text-black"
                          : "bg-muted/50 text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 第三排：領頭羊類股/落水狗類股按鈕 + 卡片排序 */}
              <div className="pb-1 flex items-center justify-between">
                <button
                  onClick={() => {
                    const selectedIndustry =
                      marketType === "bull"
                        ? advancedFilters.leaderIndustry
                        : advancedFilters.loserIndustry;
                    navigate(
                      `/industry-selection?marketType=${marketType}${selectedIndustry ? `&selected=${encodeURIComponent(selectedIndustry)}` : ""}`,
                    );
                  }}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                    marketType === "bull"
                      ? advancedFilters.leaderIndustry
                        ? "bg-[#4A90E2] text-white shadow-md"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                      : advancedFilters.loserIndustry
                        ? "bg-[#4A90E2] text-white shadow-md"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {(() => {
                    const selectedIndustry =
                      marketType === "bull"
                        ? advancedFilters.leaderIndustry
                        : advancedFilters.loserIndustry;
                    if (!selectedIndustry)
                      return (
                        <span>{marketType === "bull" ? "領頭羊類股" : "落水狗類股"}</span>
                      );
                    // 拆分成父類別和子類別，例如 "電子上游-PCB-材料設備" → 父:"電子上游" 子:"PCB 材料設備"
                    const parts = selectedIndustry.split("-");
                    const parentCategory = parts[0];
                    const childCategory = parts.slice(1).join(" ");
                    return (
                      <span className="flex items-center gap-1">
                        <span className="opacity-70 text-[10px]">{parentCategory}</span>
                        <span className="font-semibold">{childCategory}</span>
                      </span>
                    );
                  })()}
                  <ChevronDown className="w-3 h-3" />
                </button>

                {/* 卡片排序按鈕 - 只在卡片視圖顯示 */}
                {viewMode === "grid" && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSort("rank")}
                      className={`text-xs font-medium transition-colors flex items-center gap-0.5 ${
                        sortField === "rank" ? "text-[#4A90E2]" : "text-muted-foreground"
                      }`}
                    >
                      星等
                      {sortField === "rank" && (sortDirection === "desc" ? " ↓" : " ↑")}
                    </button>
                    {(filterType === "strong-ma" || filterType === "weak-ma") && (
                      <button
                        onClick={() => handleSort("hasFlame")}
                        className={`text-xs font-medium transition-colors flex items-center gap-0.5 ${
                          sortField === "hasFlame" ? "text-[#4A90E2]" : "text-muted-foreground"
                        }`}
                      >
                        火焰
                        {sortField === "hasFlame" && (sortDirection === "desc" ? " ↓" : " ↑")}
                      </button>
                    )}
                    <button
                      onClick={() => handleSort("weeklyDeviation")}
                      className={`text-xs font-medium transition-colors flex items-center gap-0.5 ${
                        sortField === "weeklyDeviation" ? "text-[#4A90E2]" : "text-muted-foreground"
                      }`}
                    >
                      週20乖離
                      {sortField === "weeklyDeviation" && (sortDirection === "desc" ? " ↓" : " ↑")}
                    </button>
                  </div>
                )}
              </div>

              {/* 跑馬燈 */}
              <div className="overflow-hidden bg-muted/30 py-1.5 rounded-lg">
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

      {/* Stock Table - 填滿剩餘空間 */}
      <div className="flex-1 bg-background overflow-auto">
        {filteredAndSortedStocks.length > 0 ? (
          viewMode === "list" ? (
            <StockTable
              stocks={
                user?.isPro
                  ? filteredAndSortedStocks
                  : // 試用版：前3個真實股票 + 12個鎖定股票（刚好填满屏幕）
                    [
                      ...filteredAndSortedStocks.slice(0, 3),
                      ...Array.from({ length: 12 }).map(
                        (_, i) => ({
                          ...(filteredAndSortedStocks[3 + i] ||
                            filteredAndSortedStocks[3] ||
                            filteredAndSortedStocks[0]),
                          code: `LOCK${i}`,
                        }),
                      ),
                    ]
              }
              marketType={marketType}
              filterType={filterType}
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
              isEditMode={isEditMode}
              isPro={user?.isPro ?? false}
            />
          ) : (
            <div className="h-full overflow-y-auto pb-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 px-4 ">
                {(user?.isPro
                  ? filteredAndSortedStocks
                  : // 試用版：前3個真實股票 + 12個鎖定股票
                    [
                      ...filteredAndSortedStocks.slice(0, 3),
                      ...Array.from({ length: 12 }).map(
                        (_, i) => ({
                          ...(filteredAndSortedStocks[3 + i] ||
                            filteredAndSortedStocks[3] ||
                            filteredAndSortedStocks[0]),
                          code: `LOCK${i}`,
                        }),
                      ),
                    ]
                ).map((stock) => (
                  <StockCard
                    key={`${stock.code}-${refreshKey}`}
                    code={stock.code}
                    name={stock.name}
                    price={stock.price}
                    change={stock.change}
                    changePercent={stock.changePercent}
                    trilogyScore={stock.trilogyScore}
                    trilogy1={stock.trilogy1Score || 0}
                    trilogy2={stock.trilogy2Score || 0}
                    trilogy3={stock.trilogy3Score || 0}
                    weeklyDeviation={stock.weeklyDeviation}
                    hasFlame={
                      (filterType === "strong-ma" ||
                        filterType === "weak-ma") &&
                      stock.hasFlame
                    }
                    isEditMode={isEditMode}
                    isFavorite={
                      isInAnyWatchlist(stock.code).length > 0
                    }
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            </div>
          )
        ) : (
          <div className="h-full flex items-center justify-center px-4">
            <div className="text-center py-12 bg-card border border-border rounded-lg w-full max-w-md">
              <div className="text-muted-foreground mb-2">
                找不到符合條件的股票
              </div>
              <div className="text-sm text-muted-foreground mb-4">
                請嘗試其他搜索條件
              </div>
              <button
                onClick={() => {
                  // 恢复到预设筛选条件
                  setAdvancedFilters({
                    leaderIndustry: null,
                    loserIndustry: null,
                    specialFilter: null,
                    volumePeriod: null,
                    volumeMultiple: null,
                    marketCap: "above20B",
                    avgVolume: "above1000",
                  });
                  setSearchQuery("");
                }}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
              >
                恢復預設篩選
              </button>
            </div>
          </div>
        )}
      </div>

      {/* AddToWatchlistModal */}
      {selectedStock && (
        <AddToWatchlistModal
          isOpen={showWatchlistModal}
          onClose={() => {
            setShowWatchlistModal(false);
            setRefreshKey((prev) => prev + 1); // 強制重新渲染以更新愛心狀態
          }}
          stock={selectedStock}
        />
      )}

    </div>
  );
}