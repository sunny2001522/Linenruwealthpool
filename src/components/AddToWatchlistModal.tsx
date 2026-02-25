import { X } from "lucide-react";
import { useState, useEffect } from "react";
import {
  getWatchlistNames,
  addToWatchlist,
  removeFromWatchlist,
  isInAnyWatchlist,
} from "../lib/watchlistStorage";

interface AddToWatchlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  stock?: {
    code: string;
    name: string;
  };
  stockCode?: string;
  stockName?: string;
  currentWatchlistIndex?: number; // 新增：当前所在的自选股群组索引
}

export function AddToWatchlistModal({
  isOpen,
  onClose,
  stock,
  stockCode: propStockCode,
  stockName: propStockName,
  currentWatchlistIndex,
}: AddToWatchlistModalProps) {
  // 支持两种传参方式
  const stockCode = stock?.code ?? propStockCode ?? "";
  const stockName = stock?.name ?? propStockName ?? "";
  
  const [watchlistNames, setWatchlistNames] = useState(getWatchlistNames());
  const [existingLists, setExistingLists] = useState<number[]>([]);

  useEffect(() => {
    if (isOpen) {
      setWatchlistNames(getWatchlistNames());
      // 如果指定了当前群组索引，只显示该群组为选中状态
      // 否则从 storage 中读取
      if (currentWatchlistIndex !== undefined) {
        setExistingLists([currentWatchlistIndex]);
      } else {
        setExistingLists(isInAnyWatchlist(stockCode));
      }
    }
  }, [isOpen, stockCode, currentWatchlistIndex]);

  const handleToggleList = (listIndex: number) => {
    const isChecked = existingLists.includes(listIndex);
    
    if (isChecked) {
      // 移除
      const success = removeFromWatchlist(listIndex, stockCode);
      if (success) {
        setExistingLists(existingLists.filter(id => id !== listIndex));
      }
    } else {
      // 添加
      const success = addToWatchlist(listIndex, stockCode, stockName);
      if (success) {
        setExistingLists([...existingLists, listIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 背景遮罩 */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* 彈窗內容 */}
      <div className="fixed inset-x-0 bottom-0 z-[60] animate-in slide-in-from-bottom duration-300">
        <div className="bg-background rounded-t-3xl shadow-2xl max-w-xl mx-auto">
          {/* Header */}
          <div className="relative border-b border-border px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">加入自選股</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {stockName} ({stockCode})
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 自選股清單選項 */}
          <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
            <div className="space-y-2">
              {[1, 2, 3, 4, 5, 6].map((index) => {
                const isChecked = existingLists.includes(index);
                
                return (
                  <label
                    key={index}
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
                        onChange={() => handleToggleList(index)}
                        className="w-5 h-5 rounded border-2 border-muted-foreground checked:bg-primary checked:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer accent-primary"
                      />
                      <div className="text-left">
                        <div className="font-medium text-sm">
                          {watchlistNames[index]}
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
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-muted hover:bg-muted/80 font-medium transition-colors"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </>
  );
}