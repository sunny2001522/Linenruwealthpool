import { ChevronDown, X, SlidersHorizontal, Filter } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export interface AdvancedFilterOptions {
  leaderIndustry: string | null; // 新增：领头羊产业
  loserIndustry: string | null; // 新增：落水狗产业
  specialFilter: "211" | "210" | null;
  volumePeriod: "weekly" | "monthly" | null;
  volumeMultiple: 1 | 2 | 4 | null;
  marketCap: "above20B" | "above100B" | "below20B" | null;
  avgVolume: "above1000" | "above5000" | "above10000" | null;
}

interface AdvancedFiltersProps {
  filters: AdvancedFilterOptions;
  onChange: (filters: AdvancedFilterOptions) => void;
  marketType: "bull" | "bear"; // 新增：多方/空方类型
  renderMode?: "inline" | "full"; // 新增：渲染模式
}

interface DropdownPosition {
  top: number;
  left: number;
}

export function AdvancedFilters({
  filters,
  onChange,
  marketType,
  renderMode = "full",
}: AdvancedFiltersProps) {
  // 統一篩選彈窗的狀態
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [tempFilters, setTempFilters] = useState<AdvancedFilterOptions>(filters);
  const [selectedCategory, setSelectedCategory] = useState<string>("special"); // special, volume, marketCap, avgVolume
  
  // 當 filters 從外部改變時，同步到 tempFilters
  useEffect(() => {
    if (!showFilterModal) {
      setTempFilters(filters);
    }
  }, [filters, showFilterModal]);

  // 領頭羊產業篩選數據
  const leaderIndustries = {
    current: [
      "電子上游-IC設計",
      "電子中游-被動元件",
      "電子上游-IC通路",
      "電子零組件-顯示面板",
      "電腦週邊-電腦系統",
      "電子上游-IC製造",
      "電子中游-連接器",
      "電子上游-記憶體",
      "電子中游-光電元件",
      "電子下游-網路通訊",
    ],
    previous: [
      "電子中游-PCB-材料設備",
      "電子上游-PCB-材料設備",
      "電子上游-IC封測",
      "電子上游-配線驅動雜",
      "電子上游-連接元件",
      "電子上游-PCB-製造",
      "電子上游-配線處理設計",
      "電子上游-感測元件",
      "電子上游-IC製造",
      "電子中游-電源管理",
    ],
  };

  // 落水狗產業篩選數據
  const loserIndustries = {
    current: [
      "傳產-塑膠工業",
      "傳產-紡織纖維",
      "金融-證券",
      "傳產-航運",
      "傳產-鋼鐵工業",
      "傳產-水泥工業",
      "金融-保險",
      "傳產-化學工業",
      "傳產-營建",
      "傳產-觀光",
    ],
    previous: [
      "傳產-貿易百貨",
      "傳產-食品工業",
      "金融-金控",
      "傳產-汽車工業",
      "傳產-造紙工業",
      "傳產-電機機械",
      "傳產-橡膠工業",
      "傳產-玻璃陶瓷",
      "金融-其他金融",
      "傳產-其他",
    ],
  };

  // 清除所有filters
  const clearAllFilters = () => {
    onChange({
      leaderIndustry: null,
      loserIndustry: null,
      specialFilter: null,
      volumePeriod: null,
      volumeMultiple: null,
      marketCap: null,
      avgVolume: null,
    });
  };

  // 預設篩選值
  const defaultFilters: AdvancedFilterOptions = {
    leaderIndustry: null,
    loserIndustry: null,
    specialFilter: null,
    volumePeriod: null,
    volumeMultiple: null,
    marketCap: "above20B",
    avgVolume: "above1000",
  };

  // 恢復預設篩選
  const resetToDefault = () => {
    onChange(defaultFilters);
  };

  // 檢查是否使用預設值
  const isDefaultFilters =
    filters.marketCap === "above20B" &&
    filters.avgVolume === "above1000" &&
    filters.specialFilter === null &&
    filters.volumePeriod === null &&
    filters.volumeMultiple === null &&
    filters.leaderIndustry === null &&
    filters.loserIndustry === null;

  // 檢查是否有任何filter被選中（排除預設值）
  const hasActiveFilters =
    filters.specialFilter !== null ||
    (filters.volumePeriod !== null &&
      filters.volumeMultiple !== null) ||
    filters.leaderIndustry !== null ||
    filters.loserIndustry !== null ||
    (filters.marketCap !== null &&
      filters.marketCap !== "above20B") ||
    (filters.avgVolume !== null &&
      filters.avgVolume !== "above1000");

  // 計算已選擇的篩選數量
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.specialFilter) count++;
    if (filters.volumePeriod && filters.volumeMultiple) count++;
    if (filters.marketCap && filters.marketCap !== "above20B") count++;
    if (filters.avgVolume && filters.avgVolume !== "above1000") count++;
    if (filters.leaderIndustry) count++;
    if (filters.loserIndustry) count++;
    return count;
  };

  // 套用篩選
  const applyFilters = () => {
    onChange(tempFilters);
    setShowFilterModal(false);
  };

  // 重設篩選（彈窗內）
  const resetFilters = () => {
    setTempFilters(defaultFilters);
  };

  // 篩選類別
  const categories = [
    { id: "special", label: marketType === "bull" ? "211強勢/210起漲" : "211弱勢/210起跌" },
    { id: "volume", label: "爆量篩選" },
    { id: "marketCap", label: "股本篩選" },
    { id: "avgVolume", label: "周均量篩選" },
  ];

  // 阻止背景滾動
  useEffect(() => {
    if (showFilterModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showFilterModal]);

  return (
    <div className="relative">
      {renderMode === "full" ? (
        <div className="overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-2 px-3">
            {/* 統一篩選按鈕 */}
            <button
              onClick={() => setShowFilterModal(true)}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap bg-[#4A90E2] text-white hover:bg-[#4A90E2]/90 shadow-md"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>篩選</span>
              {getActiveFilterCount() > 0 && (
                <span className="ml-0.5 px-1.5 py-0.5 bg-white/20 rounded-full text-[10px] font-bold">
                  {getActiveFilterCount()}
                </span>
              )}
            </button>

            {/* 預設按鈕 */}
            {!isDefaultFilters && (
              <button
                onClick={resetToDefault}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30 border border-border"
              >
                <span>預設篩選</span>
              </button>
            )}

            {/* 清除按鈕 */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap bg-destructive/20 text-destructive hover:bg-destructive/30 border border-destructive/30"
              >
                <X className="w-3 h-3" />
                <span>清除</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Inline 模式：只顯示篩選按鈕 */
        <button
          onClick={() => setShowFilterModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30 border border-border"
        >
          <Filter className="w-3.5 h-3.5" />
          {getActiveFilterCount() > 0 && (
            <span className="px-1.5 py-0.5 bg-[#4A90E2] text-white rounded-full text-[10px] font-bold min-w-[16px] text-center">
              {getActiveFilterCount()}
            </span>
          )}
        </button>
      )}

      {/* 篩選彈窗 - 買底設計 */}
      {showFilterModal && (
        <>
          {/* 背景遮罩 */}
          <div 
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              setTempFilters(filters);
              setShowFilterModal(false);
            }}
          />
          
          {/* 彈窗內容 - 在底部導航欄上方 (h-16 = 64px) */}
          <div className="fixed inset-x-0 bottom-16 z-50 max-h-[calc(85vh-64px)] flex flex-col bg-background rounded-t-2xl shadow-2xl">
            {/* 頂部標題欄 */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <button
                onClick={() => {
                  setTempFilters(filters);
                  setShowFilterModal(false);
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                取消
              </button>
              <h2 className="text-base font-semibold">篩選</h2>
              <button
                onClick={resetFilters}
                className="text-sm text-[#4A90E2] hover:text-[#4A90E2]/80 transition-colors font-medium"
              >
                重設
              </button>
            </div>

            {/* 內容區域 - 可滾動 */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="space-y-5">
                {/* 211強勢/210起漲 */}
                <div>
                  <h3 className="text-xs text-muted-foreground mb-2 font-medium">
                    {marketType === "bull" ? "強勢篩選" : "弱勢篩選"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() =>
                        setTempFilters({
                          ...tempFilters,
                          specialFilter: tempFilters.specialFilter === "211" ? null : "211",
                        })
                      }
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        tempFilters.specialFilter === "211"
                          ? "bg-[#4A90E2] text-white shadow-md"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      {marketType === "bull" ? "211強勢股" : "211弱勢股"}
                    </button>
                    <button
                      onClick={() =>
                        setTempFilters({
                          ...tempFilters,
                          specialFilter: tempFilters.specialFilter === "210" ? null : "210",
                        })
                      }
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        tempFilters.specialFilter === "210"
                          ? "bg-[#4A90E2] text-white shadow-md"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      {marketType === "bull" ? "210起漲股" : "210起跌股"}
                    </button>
                  </div>
                </div>

                {/* 爆量篩選 */}
                <div>
                  <h3 className="text-xs text-muted-foreground mb-2 font-medium">爆量篩選</h3>
                  <div className="flex flex-wrap gap-2">
                    {/* 週期 */}
                    <button
                      onClick={() => {
                        if (tempFilters.volumePeriod === "weekly") {
                          setTempFilters({
                            ...tempFilters,
                            volumePeriod: null,
                            volumeMultiple: null,
                          });
                        } else {
                          setTempFilters({
                            ...tempFilters,
                            volumePeriod: "weekly",
                            volumeMultiple: tempFilters.volumeMultiple || 1,
                          });
                        }
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        tempFilters.volumePeriod === "weekly"
                          ? "bg-[#4A90E2] text-white shadow-md"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      當週
                    </button>
                    <button
                      onClick={() => {
                        if (tempFilters.volumePeriod === "monthly") {
                          setTempFilters({
                            ...tempFilters,
                            volumePeriod: null,
                            volumeMultiple: null,
                          });
                        } else {
                          setTempFilters({
                            ...tempFilters,
                            volumePeriod: "monthly",
                            volumeMultiple: tempFilters.volumeMultiple || 1,
                          });
                        }
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        tempFilters.volumePeriod === "monthly"
                          ? "bg-[#4A90E2] text-white shadow-md"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      當月
                    </button>
                    
                    {/* 倍數 */}
                    {[1, 2, 4].map((multiple) => (
                      <button
                        key={multiple}
                        onClick={() => {
                          if (tempFilters.volumeMultiple === multiple) {
                            setTempFilters({
                              ...tempFilters,
                              volumePeriod: null,
                              volumeMultiple: null,
                            });
                          } else {
                            setTempFilters({
                              ...tempFilters,
                              volumePeriod: tempFilters.volumePeriod || "weekly",
                              volumeMultiple: multiple as 1 | 2 | 4,
                            });
                          }
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          tempFilters.volumeMultiple === multiple
                            ? "bg-[#4A90E2] text-white shadow-md"
                            : "bg-muted text-foreground hover:bg-muted/80"
                        }`}
                      >
                        {multiple}倍
                      </button>
                    ))}
                  </div>
                </div>

                {/* 股本篩選 */}
                <div>
                  <h3 className="text-xs text-muted-foreground mb-2 font-medium">股本</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() =>
                        setTempFilters({
                          ...tempFilters,
                          marketCap: tempFilters.marketCap === "above20B" ? null : "above20B",
                        })
                      }
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        tempFilters.marketCap === "above20B"
                          ? "bg-[#4A90E2] text-white shadow-md"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      &gt;20億
                    </button>
                    <button
                      onClick={() =>
                        setTempFilters({
                          ...tempFilters,
                          marketCap: tempFilters.marketCap === "above100B" ? null : "above100B",
                        })
                      }
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        tempFilters.marketCap === "above100B"
                          ? "bg-[#4A90E2] text-white shadow-md"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      &gt;100億
                    </button>
                    <button
                      onClick={() =>
                        setTempFilters({
                          ...tempFilters,
                          marketCap: tempFilters.marketCap === "below20B" ? null : "below20B",
                        })
                      }
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        tempFilters.marketCap === "below20B"
                          ? "bg-[#4A90E2] text-white shadow-md"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      &lt;20億
                    </button>
                  </div>
                </div>

                {/* 周均量篩選 */}
                <div>
                  <h3 className="text-xs text-muted-foreground mb-2 font-medium">周均量</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() =>
                        setTempFilters({
                          ...tempFilters,
                          avgVolume: tempFilters.avgVolume === "above1000" ? null : "above1000",
                        })
                      }
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        tempFilters.avgVolume === "above1000"
                          ? "bg-[#4A90E2] text-white shadow-md"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      &gt;1000張
                    </button>
                    <button
                      onClick={() =>
                        setTempFilters({
                          ...tempFilters,
                          avgVolume: tempFilters.avgVolume === "above5000" ? null : "above5000",
                        })
                      }
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        tempFilters.avgVolume === "above5000"
                          ? "bg-[#4A90E2] text-white shadow-md"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      &gt;5000張
                    </button>
                    <button
                      onClick={() =>
                        setTempFilters({
                          ...tempFilters,
                          avgVolume: tempFilters.avgVolume === "above10000" ? null : "above10000",
                        })
                      }
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        tempFilters.avgVolume === "above10000"
                          ? "bg-[#4A90E2] text-white shadow-md"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      &gt;10000張
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 底部操作按鈕 */}
            <div className="p-4 border-t border-border">
              <button
                onClick={applyFilters}
                className="w-full py-2.5 rounded-lg bg-[#4A90E2] text-white font-medium hover:bg-[#4A90E2]/90 transition-colors text-sm"
              >
                使用
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}