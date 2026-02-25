import { X } from "lucide-react";

interface StockTag {
  code: string;
  name: string;
  trend: "up" | "down";
}

interface EditHistoryEntry {
  version: number;
  timestamp: string;
  content: string;
  stockTags: StockTag[];
  imageUrl?: string;
  isOriginal?: boolean;
}

interface EditHistoryModalProps {
  isOpen?: boolean;
  onClose: () => void;
  postTitle: string;
  history: EditHistoryEntry[];
}

export function EditHistoryModal({
  isOpen = true,
  onClose,
  postTitle,
  history,
}: EditHistoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-[#141414] flex flex-col">
      {/* 導航列 */}
      <div className="bg-[#212121] h-11 flex items-center justify-between px-2 flex-shrink-0">
        {/* 關閉按鈕 */}
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/5 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* 標題 */}
        <h2 className="text-[18px] font-medium text-white absolute left-1/2 -translate-x-1/2">
          編輯紀錄
        </h2>
      </div>

      {/* 內容區域 */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-4">
          {/* 貼文標題 */}
          <div className="mb-6">
            <h3 className="text-white/60 text-xs mb-2">貼文標題</h3>
            <p className="text-white text-base">{postTitle}</p>
          </div>

          {/* 編輯歷史列表 */}
          <div className="space-y-4">
            {history.map((entry, index) => (
              <div
                key={entry.version}
                className="bg-[#212121] rounded-lg p-4 relative"
              >
                {/* 版本標籤 */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[#4A90E2] text-sm font-medium">
                      {entry.isOriginal ? "原始版本" : `版本 ${entry.version}`}
                    </span>
                    {index === 0 && !entry.isOriginal && (
                      <span className="bg-[#4A90E2] text-white text-xs px-2 py-0.5 rounded-full">
                        最新
                      </span>
                    )}
                  </div>
                  <span className="text-white/40 text-xs">{entry.timestamp}</span>
                </div>

                {/* 股票標籤 */}
                {entry.stockTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {entry.stockTags.map((tag) => (
                      <div
                        key={tag.code}
                        className="bg-[#2f2f2f] rounded flex items-center gap-1 px-3 py-1.5"
                      >
                        <span className="text-sm text-white whitespace-nowrap">
                          {tag.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* 內容 */}
                <div className="text-white/90 text-sm leading-6 whitespace-pre-wrap">
                  {entry.content}
                </div>

                {/* 圖片 */}
                {entry.imageUrl && (
                  <div className="mt-3">
                    <img
                      src={entry.imageUrl}
                      alt="Post image"
                      className="w-full h-auto object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* 連接線（除了最後一個） */}
                {index < history.length - 1 && (
                  <div className="absolute left-8 -bottom-4 w-0.5 h-4 bg-[#2f2f2f]" />
                )}
              </div>
            ))}
          </div>

          {/* 提示文字 */}
          <div className="mt-6 text-center text-white/40 text-xs">
            編輯紀錄會保存最近 10 次的修改
          </div>
        </div>
      </div>

      {/* 底部安全區 */}
      <div className="h-8 bg-[#141414] flex-shrink-0" />
    </div>
  );
}
