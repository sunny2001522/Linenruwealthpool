import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router";
import {
  MarketType,
  FilterType,
} from "../components/StockFilters";
import {
  SortField,
  SortDirection,
} from "../components/StockTable";
import {
  AdvancedFilters,
  AdvancedFilterOptions,
} from "../components/AdvancedFilters";
import {
  generateMockStocks,
  calculateTrilogyScore,
} from "../lib/stockData";
import { Search, Edit2, LayoutGrid, LayoutList } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../lib/authContext";
import { StockCard } from "../components/StockCard";

export function StockPicker2Page() {
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
  const [isEditMode, setIsEditMode] = useState(false);
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

  // 生成模擬數據
  const allStocks = useMemo(() => generateMockStocks(), []);

  // 根據市場類型、篩選條件、排序和搜索過濾股票
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
        case "rank":
          comparison =
            b.trilogyScore - a.trilogyScore ||
            b.changePercent - a.changePercent;
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
        case "trilogy2":
        case "trilogy3":
          comparison = b.trilogyScore - a.trilogyScore;
          break;
        case "capitalBillion":
          comparison = b.capitalBillion - a.capitalBillion;
          break;
        case "weekly20MaPrice":
          comparison = b.weekly20MaPrice - a.weekly20MaPrice;
          break;
        case "weeklyDeviation":
          comparison = b.weeklyDeviation - a.weeklyDeviation;
          break;
        case "weeklyVolume":
          comparison = b.weeklyVolume - a.weeklyVolume;
          break;
        case "weeklyVolumeMultiple":
          comparison = b.weeklyVolumeMultiple - a.weeklyVolumeMultiple;
          break;
        case "industry":
          comparison = a.industry.localeCompare(b.industry);
          break;
        default:
          comparison = 0;
      }

      return sortDirection === "asc" ? -comparison : comparison;
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
      setSortDirection(
        sortDirection === "asc" ? "desc" : "asc",
      );
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const handleMarketTypeChange = (type: MarketType) => {
    setMarketType(type);
    if (type === "bull") {
      setFilterType("above-ma");
    } else {
      setFilterType("below-ma");
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
      setAdvancedFilters((prev) => ({
        ...prev,
        leaderIndustry: decodeURIComponent(industry),
      }));
    }

    if (loserIndustry) {
      setAdvancedFilters((prev) => ({
        ...prev,
        loserIndustry: decodeURIComponent(loserIndustry),
      }));
    }

    if (side === "short") {
      setMarketType("bear");
      setFilterType("below-ma");
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-none bg-background border-b border-border">
        <div className="max-w-screen-xl mx-auto px-4 pt-3">
          {/* 恩如選股區域 */}
          <div>
            <div className="flex flex-col gap-3">
              {/* 多方/空方 Tab */}
              <div className="pb-1">
                <div className="flex items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => handleMarketTypeChange("bull")}
                      className="relative pb-1 transition-colors"
                    >
                      <span
                        className={`text-base font-medium ${
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
                      onClick={() => handleMarketTypeChange("bear")}
                      className="relative pb-1 transition-colors"
                    >
                      <span
                        className={`text-base font-medium ${
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

                  {/* 右側按鈕組 */}
                  <div className="flex items-center gap-2">
                    {/* 切換視圖按鈕 */}
                    <button
                      onClick={() => navigate("/stock-picker")}
                      className="p-2 rounded-lg bg-muted/50 text-muted-foreground hover:bg-muted transition-all"
                      title="切換至表格視圖"
                    >
                      <LayoutList className="w-5 h-5" />
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

                    {/* 搜尋圖標按鈕 */}
                    <button
                      onClick={() => navigate("/search")}
                      className="p-2 hover:bg-muted rounded-full transition-colors"
                    >
                      <Search className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 篩選條件 Tab */}
              <div>
                <div className="flex items-center gap-1">
                  {marketType === "bull" ? (
                    <>
                      <button
                        onClick={() => setFilterType("above-ma")}
                        className="relative px-4 py-1.5 text-base font-medium transition-colors whitespace-nowrap"
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
                        onClick={() => setFilterType("strong-ma")}
                        className="relative px-4 py-1.5 text-base font-medium transition-colors whitespace-nowrap"
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
                        onClick={() => setFilterType("below-ma")}
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
                        onClick={() => setFilterType("weak-ma")}
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

      {/* Advanced Filters */}
      <div className="flex-none bg-background border-b border-border">
        <div className="max-w-screen-xl mx-auto px-4 py-3">
          <AdvancedFilters
            filters={advancedFilters}
            onChange={setAdvancedFilters}
            marketType={marketType}
          />
        </div>
      </div>

      {/* Stock Cards - 填滿剩餘空間 */}
      <div className="flex-1 bg-background overflow-auto pb-24">
        {filteredAndSortedStocks.length > 0 ? (
          <div className="max-w-screen-xl mx-auto px-4 py-4">
            {/* 2列卡片網格 */}
            <div className="grid grid-cols-2 gap-3">
              {/* 免費版：顯示前3個真實股票 + 填滿屏幕的鎖定卡片 */}
              {user?.isPro ? (
                // 專業版：顯示所有股票
                filteredAndSortedStocks.map((stock) => (
                  <div key={stock.code}>
                    <StockCard
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
                        filterType === "strong-ma" ||
                        filterType === "weak-ma"
                          ? stock.hasFlame
                          : false
                      }
                    />
                  </div>
                ))
              ) : (
                // 試用版：前3個 + 9個鎖定卡片（刚好填满屏幕）
                <>
                  {filteredAndSortedStocks.slice(0, 3).map((stock) => (
                    <div key={stock.code}>
                      <StockCard
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
                          filterType === "strong-ma" ||
                          filterType === "weak-ma"
                            ? stock.hasFlame
                            : false
                        }
                      />
                    </div>
                  ))}
                  {/* 鎖定卡片：9個（刚好填满屏幕，2列布局 = 4.5行）*/}
                  {Array.from({ length: 9 }).map((_, index) => {
                    const lockedStock = filteredAndSortedStocks[3 + index] || filteredAndSortedStocks[3];
                    return (
                      <div key={`locked-${index}`} className="relative">
                        {/* 鎖定覆蓋層 - 使用絕對定位確保高度一致 */}
                        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10 rounded-xl flex items-center justify-center">
                          <div className="flex flex-col items-center gap-1">
                            <svg
                              className="w-8 h-8"
                              fill="none"
                              stroke="#D4AF37"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                              />
                            </svg>
                            <p className="text-[10px] text-[#D4AF37] font-medium">
                              升級解鎖
                            </p>
                          </div>
                        </div>
                        {/* 模糊的股票卡片 - 保持正常高度 */}
                        <div className="blur-sm pointer-events-none">
                          <StockCard
                            code={lockedStock?.code || "0000"}
                            name={lockedStock?.name || "鎖定股票"}
                            price={lockedStock?.price || 0}
                            change={lockedStock?.change || 0}
                            changePercent={lockedStock?.changePercent || 0}
                            trilogyScore={lockedStock?.trilogyScore || 0}
                            trilogy1={lockedStock?.trilogy1Score || 0}
                            trilogy2={lockedStock?.trilogy2Score || 0}
                            trilogy3={lockedStock?.trilogy3Score || 0}
                            weeklyDeviation={lockedStock?.weeklyDeviation || 0}
                            hasFlame={false}
                          />
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center px-4">
            <div className="text-center py-12 bg-card border border-border rounded-lg w-full max-w-md">
              <div className="text-muted-foreground mb-2">
                找不到符合條件的股票
              </div>
              <div className="text-sm text-muted-foreground">
                請嘗試其他搜索條件
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}