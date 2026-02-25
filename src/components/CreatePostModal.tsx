import { useState, useEffect, useRef } from "react";
import { X, FileText } from "lucide-react";
import { toast } from "sonner";
import svgPaths from "../imports/svg-ddr6wzb7kr";

interface StockTag {
  code: string;
  name: string;
  trend: "up" | "down";
}

interface CreatePostModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onPublish: (title: string, content: string, stockTags: StockTag[], images: string[]) => Promise<boolean>;
}

export function CreatePostModal({
  isOpen = true,
  onClose,
  onPublish,
}: CreatePostModalProps) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [showTitle, setShowTitle] = useState(false);
  const [stockTags, setStockTags] = useState<StockTag[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showStockSearch, setShowStockSearch] = useState(false);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [previewImageIndex, setPreviewImageIndex] = useState(0);
  
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      // 自動聚焦並彈起鍵盤
      setTimeout(() => {
        contentRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (showTitle && titleRef.current) {
      // 切換到標題輸入時自動聚焦
      setTimeout(() => {
        titleRef.current?.focus();
      }, 100);
    }
  }, [showTitle]);

  if (!isOpen) return null;

  const hasContent = content.trim().length > 0 || title.trim().length > 0 || stockTags.length > 0 || images.length > 0;

  const handleClose = () => {
    if (hasContent) {
      setShowDiscardConfirm(true);
    } else {
      onClose();
    }
  };

  const handleDiscardConfirm = () => {
    setContent("");
    setTitle("");
    setStockTags([]);
    setImages([]);
    setShowTitle(false);
    setShowDiscardConfirm(false);
    onClose();
  };

  const handlePublish = async () => {
    if (!content.trim()) {
      toast.error("您還沒輸入內文喔");
      return;
    }

    setIsPublishing(true);
    try {
      const success = await onPublish(title, content, stockTags, images);
      if (success) {
        toast.success("發佈成功");
        setContent("");
        setTitle("");
        setStockTags([]);
        setImages([]);
        setShowTitle(false);
        onClose();
      } else {
        toast.error("發佈失敗，請檢查網路");
      }
    } catch (error) {
      toast.error("發佈失敗，請檢查網路");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleRemoveTag = (code: string) => {
    setStockTags(stockTags.filter((tag) => tag.code !== code));
  };

  const handleAddStock = (stock: StockTag) => {
    if (stockTags.length < 5) {
      setStockTags([...stockTags, stock]);
    }
    setShowStockSearch(false);
  };

  const handleAddImage = () => {
    // 模擬選擇圖片
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && images.length < 3) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setImages([...images, result]);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setShowImagePreview(false);
  };

  const handleTitleToggle = () => {
    setShowTitle(!showTitle);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 64) {
      setTitle(value);
    } else {
      toast.error("標題已達字數上限");
    }
  };

  const handleCommunityGuidelines = () => {
    window.open("https://www.cmoney.tw/member/community-guidelines.aspx", "_blank");
  };

  // 如果顯示股票搜尋頁面
  if (showStockSearch) {
    return (
      <StockSearchModal
        isOpen={showStockSearch}
        onClose={() => setShowStockSearch(false)}
        onSelect={handleAddStock}
        selectedStocks={stockTags}
      />
    );
  }

  // 如果顯示圖片預覽
  if (showImagePreview) {
    return (
      <div className="fixed inset-0 z-[70] bg-black flex flex-col">
        {/* 導航列 */}
        <div className="bg-[#212121] h-11 flex items-center justify-between px-2 flex-shrink-0">
          <button
            onClick={() => setShowImagePreview(false)}
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <h2 className="text-[18px] font-medium text-white absolute left-1/2 -translate-x-1/2">
            預覽圖片
          </h2>
        </div>

        {/* 圖片預覽 */}
        <div className="flex-1 flex items-center justify-center">
          <img
            src={images[previewImageIndex]}
            alt="Preview"
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* 刪除按鈕 */}
        <div className="p-4 bg-[#212121]">
          <button
            onClick={() => handleRemoveImage(previewImageIndex)}
            className="w-full py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
          >
            刪除此圖
          </button>
        </div>

        {/* 底部安全區 */}
        <div className="h-8 bg-[#212121] flex-shrink-0" />
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-[#141414] flex flex-col">
        {/* 導航列 */}
        <div className="bg-[#212121] h-11 flex items-center justify-between px-2">
          {/* 關閉按鈕 */}
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* 標題 */}
          <h2 className="text-[18px] font-medium text-white absolute left-1/2 -translate-x-1/2">
            發表貼文
          </h2>
        </div>

        {/* 內容區域 */}
        <div className="flex-1 overflow-y-auto px-3">
          {/* 標題輸入（可選） */}
          {showTitle && (
            <div className="px-2 pt-3 pb-2">
              <input
                ref={titleRef}
                type="text"
                value={title}
                onChange={handleTitleChange}
                className="w-full bg-transparent border-none focus:outline-none text-white text-lg font-medium placeholder:text-[#7a7a7a]"
                placeholder="輸入標題..."
                maxLength={64}
              />
              <div className="text-xs text-white/40 mt-1">
                {title.length}/64
              </div>
            </div>
          )}

          {/* 股票標籤 */}
          {stockTags.length > 0 && (
            <div className="flex flex-wrap gap-2 px-2 pt-3 pb-2">
              {stockTags.map((tag) => (
                <div
                  key={tag.code}
                  className="bg-[#2f2f2f] rounded flex items-center gap-1 px-3 py-2 h-10"
                >
                  <span
                    className="text-sm leading-6 text-white whitespace-nowrap"
                    style={{
                      fontVariationSettings: "'wght' 400",
                    }}
                  >
                    {tag.name}
                  </span>
                  <button
                    onClick={() => handleRemoveTag(tag.code)}
                    className="p-0 hover:opacity-80 transition-opacity"
                  >
                    <svg
                      className="size-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path d={svgPaths.p1338ee80} fill="white" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* 文字內容 */}
          <div className="px-2 pt-3">
            <textarea
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full  bg-transparent border-none focus:outline-none resize-none text-white text-base leading-7 placeholder:text-[#7a7a7a]"
              placeholder="分享你的想法..."
              style={{ fontVariationSettings: "'wght' 400" }}
            />
          </div>

          {/* 圖片橫向滾動 - 左右滑動，顯示一張完整 + 第二張一部分 */}
          {images.length > 0 && (
            <div className="pt-2 pb-4">
              <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setPreviewImageIndex(index);
                      setShowImagePreview(true);
                    }}
                    className="relative flex-shrink-0 snap-start rounded-lg overflow-hidden"
                    style={{ width: 'calc(100% - 60px)' }}
                  >
                    <img
                      src={img}
                      alt={`Upload ${index + 1}`}
                      className="w-full aspect-[4/3] object-cover"
                    />
                  </button>
                ))}
              </div>
              {/* 圖片指示器 */}
              {images.length > 1 && (
                <div className="flex justify-center gap-1 mt-2">
                  {images.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 rounded-full transition-all ${
                        index === 0 ? 'w-6 bg-white' : 'w-1.5 bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 工具列 */}
        <div className="bg-[#141414] border-t border-[#2f2f2f] px-4 py-2">
          <div className="flex gap-2 items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {/* 標個股按鈕 */}
              <button
                onClick={() => setShowStockSearch(true)}
                disabled={stockTags.length >= 5}
                className={`flex gap-1 items-center px-2 py-1 rounded transition-opacity ${
                  stockTags.length >= 5
                    ? "bg-[#2f2f2f]/50 opacity-50 cursor-not-allowed"
                    : "bg-[#2f2f2f] hover:opacity-80"
                }`}
              >
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path d={svgPaths.p2223a80} fill="white" />
                </svg>
                <span
                  className="text-[14px] leading-5 text-white"
                  style={{ fontVariationSettings: "'wght' 400" }}
                >
                  標個股
                </span>
              </button>

              {/* 加圖片按鈕 */}
              <button
                onClick={handleAddImage}
                disabled={images.length >= 3}
                className={`flex gap-1 items-center px-2 py-1 rounded transition-opacity ${
                  images.length >= 3
                    ? "bg-[#2f2f2f]/50 opacity-50 cursor-not-allowed"
                    : "bg-[#2f2f2f] hover:opacity-80"
                }`}
              >
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path d={svgPaths.p26542c00} fill="white" />
                </svg>
                <span
                  className="text-[14px] leading-5 text-white"
                  style={{ fontVariationSettings: "'wght' 400" }}
                >
                  加圖片
                </span>
              </button>

              {/* 加標題按鈕 */}
              <button
                onClick={handleTitleToggle}
                className="bg-[#2f2f2f] flex gap-1 items-center px-2 py-1 rounded hover:opacity-80 transition-opacity"
              >
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path d={svgPaths.p14712f00} fill="white" />
                </svg>
                <span
                  className="text-[14px] leading-5 text-white"
                  style={{ fontVariationSettings: "'wght' 400" }}
                >
                  {showTitle ? "關閉標題" : "加標題"}
                </span>
              </button>
            </div>

            {/* 發佈按鈕 */}
            <button
              onClick={handlePublish}
              disabled={!content.trim() || isPublishing}
              className={`px-[14px] py-1 rounded transition-opacity ${
                content.trim() && !isPublishing
                  ? "bg-[#4A90E2] hover:opacity-90"
                  : "bg-[#2f2f2f] opacity-50 cursor-not-allowed"
              }`}
            >
              <span className="text-[14px] font-medium text-white">
                {isPublishing ? "發佈中..." : "發佈"}
              </span>
            </button>
          </div>

          {/* 社群規範連結 - 右下角小字 */}
          <div className="flex justify-end mt-1">
            <button
              onClick={handleCommunityGuidelines}
              className="text-[11px] text-[#7a7a7a] underline hover:text-white transition-colors"
              style={{ fontVariationSettings: "'wght' 400" }}
            >
              社群規範
            </button>
          </div>
        </div>

        {/* 底部安全區 */}
        <div className="h-8 bg-[#141414]" />
      </div>

      {/* 放棄確認彈窗 */}
      {showDiscardConfirm && (
        <div
          className="fixed inset-0 z-[70] bg-black/70 flex items-center justify-center"
          onClick={() => setShowDiscardConfirm(false)}
        >
          <div
            className="bg-[#212121] rounded-[10px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] w-[300px] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 標題 */}
            <div className="h-[52px] flex items-center justify-center rounded-t-[10px]">
              <p className="text-[18px] text-white text-center">
                確定要離開嗎？
              </p>
            </div>

            {/* 內容 */}
            <div className="px-4 py-3">
              <p className="text-[16px] text-white text-center">
                離開後已輸入的內容將無法復原
              </p>
            </div>

            {/* 按鈕 */}
            <div className="px-4 pb-5 pt-4">
              <div className="flex gap-3">
                {/* 取消按鈕 */}
                <button
                  onClick={() => setShowDiscardConfirm(false)}
                  className="flex-1 h-11 bg-[#2f2f2f] rounded-[10px] flex items-center justify-center hover:bg-[#3a3a3a] transition-colors"
                >
                  <span className="text-[16px] text-white">取消</span>
                </button>

                {/* 確定按鈕 */}
                <button
                  onClick={handleDiscardConfirm}
                  className="flex-1 h-11 rounded-[10px] flex items-center justify-center transition-all hover:opacity-90"
                  style={{
                    backgroundImage:
                      "linear-gradient(174.826deg, rgb(74, 144, 226) 26.041%, rgb(59, 130, 246) 73.959%)",
                  }}
                >
                  <span className="text-[16px] text-white font-medium">確定</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// 股票搜尋頁面組件
function StockSearchModal({
  isOpen,
  onClose,
  onSelect,
  selectedStocks,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (stock: StockTag) => void;
  selectedStocks: StockTag[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && searchRef.current) {
      setTimeout(() => {
        searchRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // 模擬股票搜尋結果
  const mockStocks = [
    { code: "2330", name: "台積電", trend: "up" as const },
    { code: "2454", name: "聯發科", trend: "up" as const },
    { code: "2317", name: "鴻海", trend: "up" as const },
    { code: "2382", name: "廣達", trend: "up" as const },
    { code: "2308", name: "台達電", trend: "up" as const },
    { code: "2303", name: "聯電", trend: "down" as const },
    { code: "2412", name: "中華電", trend: "up" as const },
    { code: "1301", name: "台塑", trend: "up" as const },
    { code: "1303", name: "南亞", trend: "up" as const },
    { code: "2881", name: "富邦金", trend: "down" as const },
  ];

  const filteredStocks = mockStocks.filter(
    (stock) =>
      (stock.code.includes(searchQuery) ||
        stock.name.includes(searchQuery)) &&
      !selectedStocks.some((s) => s.code === stock.code)
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[65] bg-[#141414] flex flex-col">
      {/* 導航列 */}
      <div className="bg-[#212121] h-11 flex items-center justify-between px-2">
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/5 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-[18px] font-medium text-white absolute left-1/2 -translate-x-1/2">
          搜尋個股
        </h2>
      </div>

      {/* 搜尋框 */}
      <div className="p-4">
        <input
          ref={searchRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="輸入股票代號或名稱"
          className="w-full px-4 py-3 bg-[#2f2f2f] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] placeholder:text-[#7a7a7a]"
        />
      </div>

      {/* 搜尋結果 */}
      <div className="flex-1 overflow-y-auto">
        {filteredStocks.length > 0 ? (
          <div className="px-4 space-y-2">
            {filteredStocks.map((stock) => (
              <button
                key={stock.code}
                onClick={() => onSelect(stock)}
                className="w-full p-4 bg-[#212121] rounded-lg hover:bg-[#2f2f2f] transition-colors flex items-center justify-between"
              >
                <div className="text-left">
                  <div className="text-white font-medium">
                    {stock.code} {stock.name}
                  </div>
                </div>
                <div className="text-[#4A90E2] text-sm">選擇</div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-white/40">
            <p>找不到符合的股票</p>
          </div>
        )}
      </div>

      {/* 底部安全區 */}
      <div className="h-8 bg-[#141414]" />
    </div>
  );
}