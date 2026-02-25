import { useState } from "react";
import { X, Plus } from "lucide-react";
import { toast } from "sonner";
import svgPaths from "../imports/svg-ddr6wzb7kr";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface StockTag {
  code: string;
  name: string;
  trend?: "up" | "down";
}

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    subtitle: string;
    memberId: string;
  };
  time: string;
  title: string;
  content: string;
  stockTags: StockTag[];
  images?: string[];
  stockData?: any[];
  imageUrl?: string;
  likes: number;
  comments: number;
  reactions: string[];
  hasEditHistory?: boolean;
}

interface EditPostModalProps {
  isOpen?: boolean;
  onClose: () => void;
  post: Post;
  onSave: (title: string, content: string, images?: string[]) => void;
}

export function EditPostModal({
  isOpen = true,
  onClose,
  post,
  onSave,
}: EditPostModalProps) {
  const [content, setContent] = useState(post.content);
  const [stockTags, setStockTags] = useState<StockTag[]>(
    post.stockTags || [],
  );
  const [images, setImages] = useState<string[]>(
    post.images || [],
  );

  if (!isOpen) return null;

  const handleSave = () => {
    if (!content.trim()) {
      toast.error("請輸入內容");
      return;
    }
    onSave(post.title, content, images);
    toast.success("已儲存編輯");
    onClose();
  };

  const handleRemoveTag = (code: string) => {
    setStockTags(stockTags.filter((tag) => tag.code !== code));
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleAddImage = () => {
    if (images.length >= 3) {
      toast.error("最多只能上傳 3 張圖片");
      return;
    }
    
    // 模擬圖片上傳 - 實際應用中應該打開文件選擇器
    const newImageUrl = `https://images.unsplash.com/photo-${Date.now()}?w=800&h=600&fit=crop`;
    setImages([...images, newImageUrl]);
    toast.success("已新增圖片");
  };

  return (
    <div className="fixed inset-0 z-[60] bg-[#141414] flex flex-col">
      {/* 導航列 */}
      <div className="bg-[#212121] h-11 flex items-center justify-between px-2">
        {/* 關閉按鈕 */}
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/5 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* 標題 */}
        <h2 className="text-[18px] font-medium text-white absolute left-1/2 -translate-x-1/2">
          編輯貼文
        </h2>
      </div>

      {/* 內容區域 */}
      <div className="flex-1 overflow-y-auto px-3">
        {/* 股票標籤 */}
        {stockTags.length > 0 && (
          <div className="flex flex-wrap gap-2 px-2 pt-3 pb-2">
            {stockTags.map((tag) => (
              <div
                key={tag.code}
                className="bg-[#2f2f2f] rounded flex items-center gap-1 px-3 py-2 h-10 "
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
        <div className="px-2 pt-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-[200px] bg-transparent border-none focus:outline-none resize-none text-white text-base leading-7 placeholder:text-[#7a7a7a]"
            placeholder="請輸入內容..."
            style={{ fontVariationSettings: "'wght' 400" }}
          />
        </div>

        {/* 圖片 */}
        {images.length > 0 && (
          <div className="px-2 mb-4">
            <div className="flex flex-wrap gap-2">
              {images.map((imageUrl, index) => (
                <div key={index} className="relative flex-1 min-w-[calc(50%-4px)] max-w-[calc(50%-4px)]">
                  <ImageWithFallback
                    src={imageUrl}
                    alt={`Post image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  {/* 刪除圖片按鈕 - 右上角 */}
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-[#2f2f2f]/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#2f2f2f] transition-all"
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
          </div>
        )}
      </div>

      {/* 工具列 */}
      <div className="bg-[#141414] border-t border-[#2f2f2f] px-4 py-2 flex gap-4 items-center justify-between pb-18">
        <div className="flex gap-2">
          {/* 標個股按鈕 */}
          <button className="bg-[#2f2f2f] flex gap-1 items-center px-2 py-1 rounded hover:opacity-80 transition-opacity">
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
            className="bg-[#2f2f2f] flex gap-1 items-center px-2 py-1 rounded hover:opacity-80 transition-opacity"
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
          <button className="bg-[#2f2f2f] flex gap-1 items-center px-2 py-1 rounded hover:opacity-80 transition-opacity">
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
              加標題
            </span>
          </button>
        </div>

        {/* 發佈按鈕 - 右下角 */}
        <button
          onClick={handleSave}
          className="px-[14px] py-1 rounded bg-[#4A90E2] hover:opacity-90 transition-opacity"
        >
          <span className="text-[14px] font-medium text-white">
            發佈
          </span>
        </button>
      </div>

      {/* 底部安全區 */}
      <div className="h-8 bg-[#141414]" />
    </div>
  );
}