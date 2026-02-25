import { ChevronLeft, HelpCircle, BookOpen, Video, FileText, MessageCircle, Search } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

/**
 * ⚠️ 轉換到 Swift/Kotlin 注意事項
 * 
 * Figma Make 跑版通常是因為 React 使用了寬度 100% 但在 Swift 裡沒有對應的 spacer() 或 maxWidth: .infinity。
 * 在交給 Claude 轉代碼時，特別備註：
 * 「請確保在 SwiftUI 中使用彈性佈局，適應不同尺寸的 iPhone。」
 * 
 * 關鍵轉換規則：
 * - w-full → SwiftUI: .frame(maxWidth: .infinity) / Kotlin: match_parent
 * - flex-1 → SwiftUI: Spacer() / Kotlin: layout_weight="1"
 * - justify-between → SwiftUI: HStack(spacing:0){...Spacer()...} / Kotlin: Space Between
 * - 所有容器都需要明確寬度約束，避免內容溢出
 */

export function HelpCenterPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // 📱 建議1: 使用純色而非漸層，更容易轉換到原生平台
  const categories = [
    {
      icon: BookOpen,
      title: "新手入門",
      description: "了解基本功能和操作",
      articles: 12,
      color: "#4A90E2" // 使用單一顏色而非漸層
    },
    {
      icon: Video,
      title: "影片教學",
      description: "觀看詳細操作影片",
      articles: 8,
      color: "#9B59B6"
    },
    {
      icon: FileText,
      title: "功能說明",
      description: "深入了解各項功能",
      articles: 24,
      color: "#27AE60"
    },
    {
      icon: MessageCircle,
      title: "常見問題",
      description: "快速找到答案",
      articles: 36,
      color: "#F39C12"
    },
  ];

  const popularTopics = [
    "如何使用選股功能",
    "恩如三部曲評分說明",
    "如何設定自選股",
    "專業版功能介紹",
    "如何參加VIP社團",
    "股價資料更新頻率",
  ];

  const recentArticles = [
    {
      title: "選股頁面完整教學",
      category: "功能說明",
      views: 1234,
      helpful: 98,
    },
    {
      title: "如何解讀恩如三部曲",
      category: "新手入門",
      views: 2341,
      helpful: 156,
    },
    {
      title: "自選股管理技巧",
      category: "功能說明",
      views: 876,
      helpful: 67,
    },
    {
      title: "訂閱與付款說明",
      category: "常見問題",
      views: 543,
      helpful: 42,
    },
  ];

  return (
    // 📱 建議2: 避免複雜漸層，使用純色背景
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      {/* 📱 建議3: 移除 backdrop-blur，原生平台效能較差 */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center gap-3">
          {/* 📱 建議4: 明確指定尺寸 (40x40) */}
          <button
            onClick={() => navigate("/more")}
            className="w-10 h-10 rounded-xl bg-muted hover:bg-muted/80 flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">幫助中心</h1>
        </div>
      </div>

      {/* 📱 建議5: 使用固定間距 (16px) 而非 space-y-6 */}
      <div className="max-w-screen-xl mx-auto px-4 py-4">
        {/* Search */}
        {/* 📱 建議6: 簡化卡片樣式，移除 backdrop-blur */}
        <div className="bg-card border border-border rounded-2xl p-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            {/* ⚠️ w-full 轉換：SwiftUI 用 .frame(maxWidth: .infinity)，Kotlin 用 android:layout_width="match_parent" */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜尋幫助文章..."
              className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Categories */}
        {/* 📱 建議7: 使用 Grid 2列布局，間距明確 (12px) */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <button
                key={index}
                className="bg-card border border-border rounded-2xl p-4 text-left"
              >
                {/* 📱 建議8: 使用純色背景而非漸層 */}
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: category.color }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-sm mb-1">{category.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">
                  {category.description}
                </p>
                <p className="text-xs text-primary font-medium">
                  {category.articles} 篇文章
                </p>
              </button>
            );
          })}
        </div>

        {/* Popular Topics */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden mb-4">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="font-bold text-sm text-muted-foreground">熱門主題</h3>
          </div>
          {/* 📱 建議9: 使用 FlexWrap 布局，明確間距 */}
          <div className="p-3">
            <div className="flex flex-wrap gap-2">
              {popularTopics.map((topic, index) => (
                <button
                  key={index}
                  className="px-3 py-2 bg-muted border border-border rounded-lg text-xs font-medium"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Articles */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden mb-4">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="font-bold text-sm text-muted-foreground">熱門文章</h3>
          </div>
          <div>
            {recentArticles.map((article, index) => (
              <button
                key={index}
                className={`w-full text-left px-4 py-3 ${
                  index < recentArticles.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                {/* 📱 建議10: 使用水平布局，明確間距 (12px) */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  {/* ⚠️ flex-1 轉換：SwiftUI 在 HStack 中不需要 Spacer，直接用 .frame(maxWidth: .infinity, alignment: .leading) */}
                  {/* Kotlin 用 android:layout_weight="1" */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm mb-1">
                      {article.title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="px-2 py-0.5 bg-muted rounded text-[10px]">
                        {article.category}
                      </span>
                      <span>{article.views} 次瀏覽</span>
                      <span>{article.helpful} 人覺得有幫助</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        {/* 📱 建議11: 簡化背景，使用純色 */}
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 mb-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm mb-1">找不到答案？</h3>
              <p className="text-xs text-muted-foreground mb-3">
                我們的客服團隊隨時準備為您提供協助
              </p>
              <button
                onClick={() => navigate("/customer-service")}
                className="px-4 py-2 bg-primary text-black rounded-xl text-sm font-bold"
              >
                聯絡客服
              </button>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="font-bold text-sm text-muted-foreground">快速連結</h3>
          </div>
          <div>
            <QuickLink label="會員服務條款" onClick={() => navigate("/terms-of-service")} />
            <QuickLink label="隱私權政策" onClick={() => navigate("/privacy-policy")} />
            <QuickLink label="著作權保護政策" onClick={() => navigate("/copyright-policy")} />
            <QuickLink label="版本更新說明" isLast />
          </div>
        </div>
      </div>
    </div>
  );
}

interface QuickLinkProps {
  label: string;
  isLast?: boolean;
  onClick?: () => void;
}

// 📱 建議12: 簡化按鈕樣式
function QuickLink({ label, isLast, onClick }: QuickLinkProps) {
  return (
    // ⚠️ w-full + justify-between 轉換：
    // SwiftUI: HStack { Text(...); Spacer(); Image(...) }.frame(maxWidth: .infinity)
    // Kotlin: LinearLayout with layout_width="match_parent" + Space Between
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 ${
        !isLast ? 'border-b border-border' : ''
      }`}
    >
      <span className="font-medium text-sm">{label}</span>
      {/* 📱 建議13: 使用簡單的箭頭圖示 */}
      <svg
        className="w-5 h-5 text-muted-foreground"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}