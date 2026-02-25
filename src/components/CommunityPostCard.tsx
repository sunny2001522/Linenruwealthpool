import { useState } from "react";
import { MoreHorizontal, ThumbsUp, MessageCircle, Share2, Trash2, Flag, Ban, Edit, History } from "lucide-react";

interface StockTag {
  code: string;
  name: string;
  trend: "up" | "down";
}

interface PostAuthor {
  memberId: string;
  name: string;
  avatar?: string;
  timeAgo: string;
}

interface PostCardProps {
  postId: string;
  author: PostAuthor;
  content: string;
  stockTags?: StockTag[];
  imageUrl?: string;
  reactions: {
    count: number;
    types: string[];
  };
  commentsCount: number;
  hasEditHistory?: boolean;
  
  // 當前用戶信息
  currentUserMemberId: string;
  currentUserRole: "author" | "admin" | "member"; // 社長、幹部、一般社員
  
  // 回調函數
  onDelete?: () => void;
  onReport?: () => void;
  onBlock?: () => void;
  onEdit?: () => void;
  onViewHistory?: () => void;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
}

export function CommunityPostCard({
  postId,
  author,
  content,
  stockTags = [],
  imageUrl,
  reactions,
  commentsCount,
  hasEditHistory = false,
  currentUserMemberId,
  currentUserRole,
  onDelete,
  onReport,
  onBlock,
  onEdit,
  onViewHistory,
  onLike,
  onComment,
  onShare,
}: PostCardProps) {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showBlockConfirm, setShowBlockConfirm] = useState(false);

  // 判斷是否為自己的貼文
  const isOwnPost = currentUserMemberId === author.memberId;
  
  // 判斷是否為作者(社長)
  const isAuthor = currentUserRole === "author";
  
  // 判斷是否為幹部
  const isAdmin = currentUserRole === "admin";

  // 計算顯示哪些選項
  const showDelete = isOwnPost || (isAuthor && !isOwnPost) || (isAdmin && !isOwnPost && !isAuthor);
  const showReport = !isOwnPost;
  const showBlock = author.memberId !== currentUserMemberId && !isAuthor;
  const showEdit = isOwnPost;
  const showHistory = hasEditHistory;

  const handleMoreClick = () => {
    setShowMoreMenu(true);
  };

  const handleBlockClick = () => {
    setShowMoreMenu(false);
    setShowBlockConfirm(true);
  };

  const handleBlockConfirm = () => {
    onBlock?.();
    setShowBlockConfirm(false);
  };

  return (
    <>
      <div className="bg-[#141414] w-full">
        {/* 用戶資訊 */}
        <div className="px-4 py-3 flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-10 h-10 rounded-full bg-muted overflow-hidden flex-shrink-0">
              {author.avatar ? (
                <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-muted-foreground/20" />
              )}
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-white">{author.name}</p>
              <p className="text-xs text-muted-foreground">{author.timeAgo}</p>
            </div>
          </div>
          <button
            onClick={handleMoreClick}
            className="p-1 hover:bg-muted/20 rounded-full transition-colors"
          >
            <MoreHorizontal className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* 貼文內容 */}
        <div className="px-4 pb-3">
          {/* 股票標籤 */}
          {stockTags.length > 0 && (
            <div className="flex gap-2 mb-2">
              {stockTags.map((tag) => (
                <div
                  key={tag.code}
                  className="bg-[#212121] rounded px-2 py-1.5 flex items-center gap-2"
                >
                  <div className="w-8 h-5.5">
                    <svg viewBox="0 0 33 22" fill="none" className="w-full h-full">
                      <path
                        d={tag.trend === "up" ? "M1 21L12 10L16 14L32 1" : "M1 1L12 12L16 8L32 21"}
                        stroke={tag.trend === "up" ? "#FE6D73" : "#9cffd9"}
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path d="M1 21H33V22H0V0H1V21Z" fill="#2F2F2F" />
                    </svg>
                  </div>
                  <span className="text-sm text-white">{tag.name}</span>
                </div>
              ))}
            </div>
          )}

          {/* 文字內容 */}
          <p className="text-base leading-7 text-white whitespace-pre-wrap">{content}</p>
        </div>

        {/* 圖片 */}
        {imageUrl && (
          <div className="relative border-t border-b border-[#2f2f2f]">
            <img
              src={imageUrl}
              alt="Post image"
              className="w-full h-[283px] object-cover"
            />
          </div>
        )}

        {/* 互動資訊 */}
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center -space-x-1">
              {/* 表情符號疊加顯示 */}
              <div className="w-5 h-5 rounded-full bg-red-600 border-2 border-[#141414] flex items-center justify-center z-30">
                <span className="text-xs">❤️</span>
              </div>
              <div className="w-5 h-5 rounded-full bg-yellow-400 border-2 border-[#141414] flex items-center justify-center z-20">
                <span className="text-xs">😄</span>
              </div>
              <div className="w-5.5 h-5.5 rounded-full bg-yellow-400 border-2 border-[#141414] flex items-center justify-center z-10">
                <span className="text-xs">😂</span>
              </div>
            </div>
            <span className="text-sm text-muted-foreground">{reactions.count}</span>
          </div>
          <span className="text-sm text-muted-foreground">{commentsCount}則留言</span>
        </div>

        {/* 互動按鈕 */}
        <div className="border-t border-[#2f2f2f] px-4">
          <div className="flex items-center">
            <button
              onClick={onLike}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 hover:bg-muted/10 transition-colors"
            >
              <ThumbsUp className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">讚</span>
            </button>
            <button
              onClick={onComment}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 hover:bg-muted/10 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">留言</span>
            </button>
            <button
              onClick={onShare}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 hover:bg-muted/10 transition-colors"
            >
              <Share2 className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">分享</span>
            </button>
          </div>
        </div>
      </div>

      {/* 更多選項底部彈窗 */}
      {showMoreMenu && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 animate-in fade-in duration-200"
          onClick={() => setShowMoreMenu(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a] rounded-t-3xl animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-xl mx-auto">
              {/* 選項列表 */}
              <div className="py-2">
                {showDelete && (
                  <button
                    onClick={() => {
                      setShowMoreMenu(false);
                      onDelete?.();
                    }}
                    className="w-full px-6 py-4 flex items-center gap-4 hover:bg-muted/10 transition-colors text-left"
                  >
                    <Trash2 className="w-5 h-5 text-white" />
                    <span className="text-base text-white">刪除貼文</span>
                  </button>
                )}
                
                {showReport && (
                  <button
                    onClick={() => {
                      setShowMoreMenu(false);
                      onReport?.();
                    }}
                    className="w-full px-6 py-4 flex items-center gap-4 hover:bg-muted/10 transition-colors text-left"
                  >
                    <Flag className="w-5 h-5 text-white" />
                    <span className="text-base text-white">檢舉貼文</span>
                  </button>
                )}
                
                {showBlock && (
                  <button
                    onClick={handleBlockClick}
                    className="w-full px-6 py-4 flex items-center gap-4 hover:bg-muted/10 transition-colors text-left"
                  >
                    <Ban className="w-5 h-5 text-white" />
                    <span className="text-base text-white">封鎖此用戶</span>
                  </button>
                )}
                
                {showEdit && (
                  <button
                    onClick={() => {
                      setShowMoreMenu(false);
                      onEdit?.();
                    }}
                    className="w-full px-6 py-4 flex items-center gap-4 hover:bg-muted/10 transition-colors text-left"
                  >
                    <Edit className="w-5 h-5 text-white" />
                    <span className="text-base text-white">編輯貼文</span>
                  </button>
                )}
                
                {showHistory && (
                  <button
                    onClick={() => {
                      setShowMoreMenu(false);
                      onViewHistory?.();
                    }}
                    className="w-full px-6 py-4 flex items-center gap-4 hover:bg-muted/10 transition-colors text-left"
                  >
                    <History className="w-5 h-5 text-white" />
                    <span className="text-base text-white">查看編輯紀錄</span>
                  </button>
                )}
              </div>

              {/* 底部安全區 */}
              <div className="h-8" />
            </div>
          </div>
        </div>
      )}

      {/* 封鎖確認彈窗 */}
      {showBlockConfirm && (
        <div
          className="fixed inset-0 z-50 bg-black/60 animate-in fade-in duration-200"
          onClick={() => setShowBlockConfirm(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a] rounded-t-3xl animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-xl mx-auto px-6 py-6">
              <h3 className="text-lg font-bold text-white mb-2">
                確定要封鎖此為用戶嗎？
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                封鎖後將不能再看到他的文章和留言
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowBlockConfirm(false)}
                  className="flex-1 py-3 rounded-xl bg-muted hover:bg-muted/80 text-white font-medium transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleBlockConfirm}
                  className="flex-1 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black font-medium transition-colors"
                >
                  確定
                </button>
              </div>

              {/* 底部安全區 */}
              <div className="h-8" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}