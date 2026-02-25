import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { 
  ReactionType,
  ReactionAsset1,
  ReactionAsset2,
  ReactionAsset3,
  ReactionAsset4,
  ReactionAsset5,
  ReactionAsset6,
} from "./ReactionPicker";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ReactionData {
  userId: string;
  userName: string;
  userAvatar: string;
  reactionType: ReactionType;
}

interface ReactionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  reactions: ReactionData[];
  reactionCounts: Record<ReactionType, number>;
}

const reactionLabels: Record<ReactionType, string> = {
  1: "讚",
  3: "哈",
  4: "賺",
  5: "哇",
  6: "嗚嗚",
  7: "真的嗎",
};

// 根據表情類型返回對應的 SVG 組件
const getReactionComponent = (type: ReactionType) => {
  switch (type) {
    case 1:
      return <ReactionAsset1 />;
    case 3:
      return <ReactionAsset2 />;
    case 4:
      return <ReactionAsset3 />;
    case 5:
      return <ReactionAsset4 />;
    case 6:
      return <ReactionAsset5 />;
    case 7:
      return <ReactionAsset6 />;
  }
};

export function ReactionDetailModal({
  isOpen,
  onClose,
  reactions,
  reactionCounts,
}: ReactionDetailModalProps) {
  const [activeTab, setActiveTab] = useState<ReactionType | "all">("all");
  const [height, setHeight] = useState(50); // 初始 50%
  const modalRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef({
    isDragging: false,
    startY: 0,
    startHeight: 50,
  });

  // 重置高度當彈窗關閉時
  useEffect(() => {
    if (!isOpen) {
      setHeight(50);
      setActiveTab("all");
    }
  }, [isOpen]);

  // 添加全局事件監聽
  useEffect(() => {
    const handleMove = (e: TouchEvent | MouseEvent) => {
      if (!dragStateRef.current.isDragging) return;
      e.preventDefault();

      const clientY = 'touches' in e ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;
      const deltaY = dragStateRef.current.startY - clientY;
      const windowHeight = window.innerHeight;
      const deltaPercent = (deltaY / windowHeight) * 100;
      
      let newHeight = dragStateRef.current.startHeight + deltaPercent;
      
      // 限制在 50% 到 80% 之間
      newHeight = Math.max(50, Math.min(80, newHeight));
      
      setHeight(newHeight);
    };

    const handleEnd = () => {
      if (!dragStateRef.current.isDragging) return;
      dragStateRef.current.isDragging = false;

      // 如果高度小於 40%，關閉彈窗
      setHeight((currentHeight) => {
        if (currentHeight < 40) {
          onClose();
          return 50;
        }

        // 自動吸附到 50% 或 80%
        return currentHeight < 65 ? 50 : 80;
      });
    };

    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchend', handleEnd);
    window.addEventListener('mouseup', handleEnd);

    return () => {
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchend', handleEnd);
      window.removeEventListener('mouseup', handleEnd);
    };
  }, [onClose]);

  if (!isOpen) return null;

  // 拖動開始
  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    dragStateRef.current.isDragging = true;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    dragStateRef.current.startY = clientY;
    dragStateRef.current.startHeight = height;
  };

  // 獲取有反應的表情類型（按數量排序）
  const availableTabs = Object.entries(reactionCounts)
    .filter(([_, count]) => count > 0)
    .sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1]; // 按數量降序
      return parseInt(a[0]) - parseInt(b[0]); // 相同數量時按類型升序
    })
    .map(([type]) => parseInt(type) as ReactionType);

  // 計算總反應數
  const totalReactions = Object.values(reactionCounts).reduce((a, b) => a + b, 0);

  // 過濾當前 tab 的反應
  const filteredReactions =
    activeTab === "all"
      ? reactions
      : reactions.filter((r) => r.reactionType === activeTab);

  return (
    <>
      {/* 背景遮罩 */}
      <div
        className="fixed inset-0 z-[60] bg-black/60 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* 彈窗內容 */}
      <div 
        ref={modalRef}
        className="fixed inset-x-0 bottom-0 z-[60] transition-all"
        style={{ 
          height: `${height}vh`,
          transition: dragStateRef.current.isDragging ? 'none' : 'height 0.3s ease-out'
        }}
      >
        <div className="bg-[#212121] rounded-t-3xl shadow-2xl max-w-xl mx-auto h-full flex flex-col">
          {/* 拖動指示器 */}
          <div 
            className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing"
            onTouchStart={handleDragStart}
            onMouseDown={handleDragStart}
          >
            <div className="w-10 h-1 rounded-full bg-[#4a4a4a]" />
          </div>

          {/* 標題列 */}
          

          {/* 分頁標籤 */}
          <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide flex-shrink-0">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === "all"
                  ? "bg-[#4A90E2] text-white"
                  : "bg-[#2f2f2f] text-white/70 hover:bg-[#3a3a3a]"
              }`}
            >
              <span>全部</span>
              <span className="font-bold">{totalReactions}</span>
            </button>
            {availableTabs.map((type) => (
              <button
                key={type}
                onClick={() => setActiveTab(type)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === type
                    ? "bg-[#4A90E2] text-white"
                    : "bg-[#2f2f2f] text-white/70 hover:bg-[#3a3a3a]"
                }`}
              >
                <span className="w-5 h-5">{getReactionComponent(type)}</span>
                <span className="font-bold">{reactionCounts[type]}</span>
              </button>
            ))}
          </div>

          {/* 用戶列表 */}
          <div className="flex-1 overflow-y-auto px-4 pb-6">
            <div className="space-y-0">
              {filteredReactions.length > 0 ? (
                filteredReactions.map((reaction, index) => (
                  <div
                    key={`${reaction.userId}-${index}`}
                    className="flex items-center gap-3 py-2.5 hover:bg-[#2f2f2f]/50 rounded-lg transition-colors px-2"
                  >
                    <ImageWithFallback
                      src={reaction.userAvatar}
                      alt={reaction.userName}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white truncate">
                        {reaction.userName}
                      </div>
                    </div>
                    <div className="w-6 h-6 flex-shrink-0">
                      {getReactionComponent(reaction.reactionType)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-white/50 text-sm">
                  目前沒有反應
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
