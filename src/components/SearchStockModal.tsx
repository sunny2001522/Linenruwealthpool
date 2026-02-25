import { useState, useEffect } from "react";
import { X, Search, Heart } from "lucide-react";
import { generateMockStocks } from "../lib/stockData";
import { AddToWatchlistModal } from "./AddToWatchlistModal";
import { isInAnyWatchlist } from "../lib/watchlistStorage";

interface SearchStockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchStockModal({
  isOpen,
  onClose,
}: SearchStockModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [allStocks] = useState(generateMockStocks());
  const [filteredStocks, setFilteredStocks] = useState(allStocks.slice(0, 20)); // 默認顯示前20個
  const [selectedStock, setSelectedStock] = useState<{ code: string; name: string } | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredStocks(allStocks.slice(0, 20));
    } else {
      const filtered = allStocks.filter(
        (stock) =>
          stock.code.includes(searchTerm.toUpperCase()) ||
          stock.name.includes(searchTerm)
      );
      setFilteredStocks(filtered.slice(0, 50)); // 最多顯示50個結果
    }
  }, [searchTerm, allStocks]);

  const handleAddToWatchlist = (stock: { code: string; name: string }) => {
    setSelectedStock(stock);
    setShowAddModal(true);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 背景遮罩 */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* 彈窗內容 */}
      <div className="fixed inset-x-0 top-0 z-50 animate-in slide-in-from-top duration-300">
        <div className="bg-background min-h-screen max-w-xl mx-auto">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* 搜尋輸入框 */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="搜尋股票代號或名稱"
                  className="w-full pl-10 pr-4 py-2.5 bg-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  autoFocus
                />
              </div>
            </div>
          </div>

          {/* 搜尋結果 */}
          <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 80px)" }}>
            {filteredStocks.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                找不到相關股票
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredStocks.map((stock) => {
                  const isFavorite = isInAnyWatchlist(stock.code).length > 0;
                  const isPositive = stock.change > 0;
                  const isNegative = stock.change < 0;

                  return (
                    <div
                      key={stock.code}
                      className="flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{stock.code}</span>
                          <span className="text-sm">{stock.name}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-bold">{stock.price.toFixed(2)}</span>
                          <span
                            className={`text-sm font-semibold ${
                              isPositive
                                ? "text-red-500"
                                : isNegative
                                  ? "text-green-500"
                                  : "text-muted-foreground"
                            }`}
                          >
                            {isPositive ? "+" : ""}
                            {stock.changePercent.toFixed(2)}%
                          </span>
                        </div>
                      </div>

                      {/* 愛心按鈕 */}
                      <button
                        onClick={() => handleAddToWatchlist({ code: stock.code, name: stock.name })}
                        className="p-2 hover:bg-primary/10 rounded-full transition-colors"
                      >
                        <Heart
                          className={`w-6 h-6 ${
                            isFavorite ? "fill-primary text-primary" : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 加入自選股彈窗 */}
      {selectedStock && (
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
    </>
  );
}
