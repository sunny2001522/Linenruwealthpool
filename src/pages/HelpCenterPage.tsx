import { ChevronLeft, HelpCircle, BookOpen, Video, FileText, MessageCircle, Search } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

export function HelpCenterPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      icon: BookOpen,
      title: "新手入門",
      description: "了解基本功能和操作",
      articles: 12,
      color: "#4A90E2"
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
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate("/home/more")}
            className="w-10 h-10 rounded-xl bg-muted hover:bg-muted/80 flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">幫助中心</h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-4">
        {/* Search */}
        <div className="bg-card border border-border rounded-2xl p-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
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
        <div className="grid grid-cols-2 gap-3 mb-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <button
                key={index}
                className="bg-card border border-border rounded-2xl p-4 text-left"
              >
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
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
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

function QuickLink({ label, isLast, onClick }: QuickLinkProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 ${
        !isLast ? 'border-b border-border' : ''
      }`}
    >
      <span className="font-medium text-sm">{label}</span>
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
