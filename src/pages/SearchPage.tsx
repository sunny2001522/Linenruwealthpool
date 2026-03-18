import { useState, useEffect } from "react";
import { ArrowLeft, Search, X, Clock, TrendingUp, Heart } from "lucide-react";
import { useNavigate } from "react-router";
import { generateMockStocks } from "../lib/stockData";
import { AddToWatchlistModal } from "../components/AddToWatchlistModal";

const STORAGE_KEY = "stock_search_history";

// 熱門搜尋數據
const popularSearches = [
  { code: "2330", name: "台積電" },
  { code: "2317", name: "鴻海" },
  { code: "2454", name: "聯發科" },
  { code: "2412", name: "中華電" },
  { code: "2308", name: "台達電" },
  { code: "2882", name: "國泰金" },
  { code: "2881", name: "富邦金" },
  { code: "2891", name: "中信金" },
];

interface SearchHistoryItem {
  code: string;
  name: string;
  timestamp: number;
}

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

export function SearchPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState<{ code: string; name: string } | null>(null);
  const allStocks = generateMockStocks();

  // 獲取熱門股票完整數據
  const popularStocksData = popularSearches.map(pop => 
    allStocks.find(s => s.code === pop.code) || { ...pop, change: 0 }
  );

  // 載入搜尋歷史
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const history = JSON.parse(stored);
        setSearchHistory(history);
      } catch (e) {
        console.error("Failed to load search history", e);
      }
    }
  }, []);

  // 搜尋股票
  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const results = allStocks
        .filter(
          (stock) =>
            stock.code.toLowerCase().includes(query) ||
            stock.name.toLowerCase().includes(query)
        )
        .slice(0, 20);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // 添加到搜尋歷史
  const addToHistory = (code: string, name: string) => {
    const newHistory = [
      { code, name, timestamp: Date.now() },
      ...searchHistory.filter((item) => item.code !== code),
    ].slice(0, 10); // 保留最近10筆

    setSearchHistory(newHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  };

  // 清空搜尋歷史
  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  // 處理股票點擊
  const handleStockClick = (code: string, name: string) => {
    addToHistory(code, name);
    navigate(`/stock/${code}`);
  };

  // 處理搜尋標籤點擊
  const handleTagClick = (code: string, name: string) => {
    setSearchQuery(`${code} ${name}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜尋股票代號或名稱..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-muted/50 border border-border rounded-full pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-background rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {searchQuery.trim() ? (
          // 搜尋結果 - 長條形帶愛心
          <div className="px-4 py-3">
            {searchResults.length > 0 ? (
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground mb-2 px-2">
                  找到 {searchResults.length} 個結果
                </div>
                {searchResults.map((stock) => (
                  <div
                    key={stock.code}
                    className="w-full flex items-center gap-3 px-3 py-3 hover:bg-muted/50 rounded-lg transition-colors group"
                  >
                    <button
                      onClick={() => handleStockClick(stock.code, stock.name)}
                      className="flex-1 flex items-center gap-3 text-left"
                    >
                      <KBar change={stock.change || 0} />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{stock.name}</div>
                        <div className="text-xs text-muted-foreground">{stock.code}</div>
                      </div>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStock(stock);
                        setShowAddModal(true);
                      }}
                      className="p-2 hover:bg-primary/10 rounded-full transition-colors"
                    >
                      <Heart className="w-5 h-5 text-muted-foreground hover:text-primary hover:fill-primary transition-all" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-muted-foreground text-sm">找不到相關股票</div>
              </div>
            )}
          </div>
        ) : (
          // 熱門搜尋 & 歷史搜尋
          <div className="px-4 py-4 space-y-6">
            {/* 搜尋歷史 - Pill形式 */}
            {searchHistory.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <h2 className="font-semibold text-sm">搜尋紀錄</h2>
                  </div>
                  <button
                    onClick={clearHistory}
                    className="text-xs text-primary hover:text-primary/80 transition-colors"
                  >
                    清除
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {searchHistory.map((item) => (
                    <button
                      key={`${item.code}-${item.timestamp}`}
                      onClick={() => handleStockClick(item.code, item.name)}
                      className="px-4 py-2 bg-muted/50 hover:bg-primary/10 hover:border-primary/30 border border-border rounded-full text-sm transition-all"
                    >
                      <span className="font-medium">{item.name}</span>
                      <span className="text-muted-foreground ml-1.5">{item.code}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 熱門搜尋 - 長條形帶愛心 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-primary" />
                <h2 className="font-semibold text-sm">熱門搜尋股票</h2>
              </div>
              <div className="space-y-1">
                {popularStocksData.map((stock) => (
                  <div
                    key={stock.code}
                    className="w-full flex items-center gap-3 px-3 py-3 hover:bg-muted/50 rounded-lg transition-colors group"
                  >
                    <button
                      onClick={() => handleStockClick(stock.code, stock.name)}
                      className="flex-1 flex items-center gap-3 text-left"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-sm">{stock.name}</div>
                        <div className="text-xs text-muted-foreground">{stock.code}</div>
                      </div>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStock(stock);
                        setShowAddModal(true);
                      }}
                      className="p-2 hover:bg-primary/10 rounded-full transition-colors"
                    >
                      <Heart className="w-5 h-5 text-muted-foreground hover:text-primary hover:fill-primary transition-all" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add to Watchlist Modal */}
      {showAddModal && selectedStock && (
        <AddToWatchlistModal
          isOpen={showAddModal}
          onClose={() => {
            setShowAddModal(false);
            setSelectedStock(null);
          }}
          stockCode={selectedStock.code}
          stockName={selectedStock.name}
        />
      )}
    </div>
  );
}