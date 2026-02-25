import { useState } from "react";
import { Headphones } from "lucide-react";
import { CommunityPostCard } from "../components/CommunityPostCard";
import { EditPostModal } from "../components/EditPostModal";
import { toast } from "sonner@2.0.3";

type TabType = "chat" | "author" | "board";

export function CommunityPage() {
  const [activeTab, setActiveTab] = useState<TabType>("author");
  const [editingPost, setEditingPost] = useState<any>(null);
  
  // 模擬當前用戶資訊
  const [currentUser] = useState({
    memberId: "user123",
    role: "author" as "author" | "admin" | "member", // 可以改成 "admin" 或 "member" 來測試不同權限
  });

  // 模擬貼文數據
  const mockPosts = [
    {
      postId: "post1",
      id: "post1",
      author: {
        memberId: "user123",
        name: "用戶名稱",
        avatar: "",
        subtitle: "",
        timeAgo: "1小時前",
      },
      time: "1小時前",
      title: "",
      content: "從過往的經驗，台積電一旦完成填息後，股價上攻的動能相當強勁。對於散戶來說，填息時間可作為良好的布局時機，",
      stockTags: [
        { code: "2330", name: "台積電", trend: "up" as const },
        { code: "2317", name: "鴻海", trend: "down" as const },
      ],
      imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
      reactions: {
        count: 999,
        types: ["❤️", "😄", "😂"],
      },
      likes: 999,
      comments: 38,
      commentsCount: 38,
      hasEditHistory: true,
    },
    {
      postId: "post2",
      id: "post2",
      author: {
        memberId: "admin456",
        name: "幹部名稱",
        avatar: "",
        subtitle: "",
        timeAgo: "2小時前",
      },
      time: "2小時前",
      title: "",
      content: "從過往的經驗，台積電一旦完成填息後，股價上攻的動能相當強勁。對於散戶來說，填息時間可作為良好的布局時機，把握時機投入資金，未來台積電的股價只有...",
      stockTags: [
        { code: "2330", name: "台積電", trend: "up" as const },
        { code: "2454", name: "鴻海", trend: "down" as const },
      ],
      reactions: {
        count: 999,
        types: ["❤️", "😄", "😂"],
      },
      likes: 999,
      comments: 38,
      commentsCount: 38,
      hasEditHistory: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#141414]">
      {/* 狀態列 */}
      <div className="h-11 bg-[#212121] flex items-center justify-between px-4">
        <span className="text-sm text-white">9:41</span>
        <div className="flex items-center gap-1">
          {/* 信號圖標 */}
          <div className="text-white text-xs">📶</div>
          <div className="text-white text-xs">📡</div>
          <div className="text-white text-xs">🔋</div>
        </div>
      </div>

      {/* 導航列 */}
      <div className="h-11 bg-[#212121] flex items-center justify-center relative">
        <div className="flex items-center gap-1.5 bg-[#141414] rounded-md p-0.5">
          <button
            onClick={() => setActiveTab("chat")}
            className={`px-6 py-1 rounded text-sm transition-colors ${
              activeTab === "chat"
                ? "text-muted-foreground"
                : "text-muted-foreground"
            }`}
          >
            聊天室
          </button>
          <button
            onClick={() => setActiveTab("author")}
            className={`px-6 py-1 rounded text-sm transition-colors ${
              activeTab === "author"
                ? "bg-[#D4AF37] text-black font-medium"
                : "text-muted-foreground"
            }`}
          >
            作者專區
          </button>
          <button
            onClick={() => setActiveTab("board")}
            className={`px-6 py-1 rounded text-sm transition-colors ${
              activeTab === "board"
                ? "text-muted-foreground"
                : "text-muted-foreground"
            }`}
          >
            看板
          </button>
        </div>
        
        {/* 客服按鈕 */}
        <button className="absolute right-4 p-1">
          <Headphones className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* 貼文列表 */}
      <div className="pt-4 pb-20 space-y-4">
        {mockPosts.map((post) => (
          <CommunityPostCard
            key={post.postId}
            postId={post.postId}
            author={post.author}
            content={post.content}
            stockTags={post.stockTags}
            reactions={post.reactions}
            commentsCount={post.commentsCount}
            hasEditHistory={post.hasEditHistory}
            currentUserMemberId={currentUser.memberId}
            currentUserRole={currentUser.role}
            onDelete={() => {
              toast.success("已刪除貼文");
              console.log("刪除貼文:", post.postId);
            }}
            onReport={() => {
              toast.success("已檢舉此貼文");
              console.log("檢舉貼文:", post.postId);
            }}
            onBlock={() => {
              toast.success("已封鎖用戶");
              console.log("封鎖用戶:", post.author.memberId);
            }}
            onEdit={() => {
              setEditingPost(post);
            }}
            onViewHistory={() => {
              toast.info("查看編輯紀錄");
              console.log("查看編輯紀錄:", post.postId);
            }}
            onLike={() => {
              console.log("按讚:", post.postId);
            }}
            onComment={() => {
              console.log("留言:", post.postId);
            }}
            onShare={() => {
              console.log("分享:", post.postId);
            }}
          />
        ))}
      </div>

      {/* 編輯貼文模態框 */}
      {editingPost && (
        <EditPostModal
          post={editingPost}
          onClose={() => setEditingPost(null)}
          onSave={(updatedPost) => {
            toast.success("已更新貼文");
            console.log("更新貼文:", updatedPost);
            setEditingPost(null);
          }}
        />
      )}

      {/* 底部導航 */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-[#212121] border-t border-[#2f2f2f] z-50">
        <div className="max-w-xl mx-auto h-full flex items-center justify-around">
          <button className="flex flex-col items-center gap-1">
            <span className="text-xs text-muted-foreground">選股</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <span className="text-xs text-muted-foreground">自選股</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <span className="text-xs text-[#D4AF37]">社團</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <span className="text-xs text-muted-foreground">內容專區</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <span className="text-xs text-muted-foreground">更多</span>
          </button>
        </div>
      </div>

      {/* 底部安全區 */}
      <div className="h-8 bg-[#212121]" />
    </div>
  );
}