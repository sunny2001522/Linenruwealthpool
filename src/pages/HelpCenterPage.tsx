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
