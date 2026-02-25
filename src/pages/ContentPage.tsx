import { useState, useEffect } from "react";
import { Play, Heart, Mic, Lock, Eye, Search, ChevronDown } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useTabContext } from "../lib/tabContext";
import { useNavigate } from "react-router";
import { SubscriptionModal } from "../components/SubscriptionModal";
import { useAuth } from "../lib/authContext";

type MainTabType = "video" | "course" | "article" | "podcast";
type SubTabType = "live" | "favorite" | "unpurchased" | "purchased" | "stock" | "tutorial";
type SortType = "latest" | "popular";

interface ContentItem {
  id: string;
  thumbnail: string;
  title: string;
  channel: string;
  date: string;
  duration?: string;
  type: MainTabType;
  timeRange?: string; // 講座專用：時間段，例如 "14:00-16:00"
  price?: number; // 講座專用：價格
  isLocked?: boolean; // 是否需要VIP才能觀看
  views?: number; // 文章專用：瀏覽數
  isPurchased?: boolean; // 講座專用：是否已購買
  popularity?: number; // 用於排序的熱門度分數
}

const mockContent: ContentItem[] = [
  {
    id: "1",
    thumbnail:
      "https://images.unsplash.com/photo-1740153204804-200310378f2f?w=400&h=225&fit=crop",
    title:
      "【林恩如】市場修正我🔥強勢股｜飆股女王 • 10/14 晚上直播",
    channel: "[CMoney理財寶] 官方頻道",
    date: "2025/10/15",
    duration: "45:23",
    type: "video",
    popularity: 1500,
  },
  {
    id: "2",
    thumbnail:
      "https://images.unsplash.com/photo-1762279389020-eeeb69c25813?w=400&h=225&fit=crop",
    title:
      "【林恩如】超簡單－看懂趨勢交易致勝的關鍵｜飆股女王 • 9/12 教學",
    channel: "[CMoney理財寶] 官方頻道",
    date: "2025/09/12",
    duration: "38:15",
    type: "video",
    isLocked: true,
    popularity: 2300,
  },
  {
    id: "3",
    thumbnail:
      "https://images.unsplash.com/photo-1767972160300-86d0af82558f?w=400&h=225&fit=crop",
    title:
      "【林恩如】超簡單－條線！掌握多空趨勢 • 選股邏輯｜飆股女王",
    channel: "[CMoney理財寶] 官方頻道",
    date: "2025/08/15",
    duration: "42:08",
    type: "video",
    popularity: 1800,
  },
  {
    id: "4",
    thumbnail:
      "https://images.unsplash.com/photo-1758691736591-5bf31a5d0dea?w=400&h=225&fit=crop",
    title:
      "川普中美貿易，必看應對之策！｜林恩如 飛股女王 • 6月免費直播",
    channel: "[CMoney理財寶] 官方頻道",
    date: "2025/06/12",
    duration: "51:33",
    type: "video",
    isLocked: true,
    popularity: 2100,
  },
];

const courseContent: ContentItem[] = [
  {
    id: "c1",
    thumbnail:
      "https://images.unsplash.com/photo-1758691736591-5bf31a5d0dea?w=400&h=225&fit=crop",
    title: "恩如三部曲完整教學｜從零開始學選股",
    channel: "[CMoney理財寶] 官方頻道",
    date: "2月15日",
    timeRange: "14:00-16:00",
    price: 1999,
    type: "course",
    isPurchased: false,
  },
  {
    id: "c2",
    thumbnail:
      "https://images.unsplash.com/photo-1740153204804-200310378f2f?w=400&h=225&fit=crop",
    title: "技術分析進階課程｜均線與型態應用",
    channel: "[CMoney理財寶] 官方頻道",
    date: "2月22日",
    timeRange: "19:00-21:00",
    price: 2499,
    type: "course",
    isPurchased: false,
  },
  {
    id: "c3",
    thumbnail:
      "https://images.unsplash.com/photo-1767972160300-86d0af82558f?w=400&h=225&fit=crop",
    title: "籌碼分析實戰班｜看懂主力動向",
    channel: "[CMoney理財寶] 官方頻道",
    date: "3月1日",
    timeRange: "14:00-17:00",
    price: 2999,
    type: "course",
    isPurchased: true,
  },
  {
    id: "c4",
    thumbnail:
      "https://images.unsplash.com/photo-1762279389020-eeeb69c25813?w=400&h=225&fit=crop",
    title: "量價關係深度解析｜成交量與價格的秘密",
    channel: "[CMoney理財寶] 官方頻道",
    date: "3月8日",
    timeRange: "14:00-16:00",
    price: 1799,
    type: "course",
    isPurchased: true,
  },
  {
    id: "c5",
    thumbnail:
      "https://images.unsplash.com/photo-1740153204804-200310378f2f?w=400&h=225&fit=crop",
    title: "波段操作策略大全｜掌握中長線投資",
    channel: "[CMoney理財寶] 官方頻道",
    date: "3月15日",
    timeRange: "19:00-21:00",
    price: 2199,
    type: "course",
    isPurchased: true,
  },
];

const articleContent: ContentItem[] = [
  {
    id: "a1",
    thumbnail:
      "https://images.unsplash.com/photo-1762279389020-eeeb69c25813?w=400&h=225&fit=crop",
    title:
      "2026年第一季投資策略全解析｜掌握Q1市場趨勢與佈局重點",
    channel: "[CMoney理財寶] 編輯部",
    date: "2026/01/15",
    type: "article",
    views: 1200,
    isLocked: true,
  },
  {
    id: "a2",
    thumbnail:
      "https://images.unsplash.com/photo-1767972160300-86d0af82558f?w=400&h=225&fit=crop",
    title:
      "AI概念股完整名單與投資建議｜從晶片到應用的全產業鏈分析",
    channel: "[CMoney理財寶] 編輯部",
    date: "2026/01/10",
    type: "article",
    views: 850,
  },
  {
    id: "a3",
    thumbnail:
      "https://images.unsplash.com/photo-1740153204804-200310378f2f?w=400&h=225&fit=crop",
    title: "恩如三部曲深度解析｜溫度條、型態、趨勢完整應用指南",
    channel: "[CMoney理財寶] 編輯部",
    date: "2026/01/05",
    type: "article",
    views: 1500,
    isLocked: true,
  },
  {
    id: "a4",
    thumbnail:
      "https://images.unsplash.com/photo-1758691736591-5bf31a5d0dea?w=400&h=225&fit=crop",
    title: "台股紅包行情歷史統計｜春節前後的投資策略與風險控管",
    channel: "[CMoney理財寶] 編輯部",
    date: "2025/12/28",
    type: "article",
    views: 1000,
  },
  {
    id: "a5",
    thumbnail:
      "https://images.unsplash.com/photo-1762279389020-eeeb69c25813?w=400&h=225&fit=crop",
    title:
      "半導體產業2026展望｜台積電、聯發科、IC設計族群投資攻略",
    channel: "[CMoney理財寶] 編輯部",
    date: "2025/12/20",
    type: "article",
    views: 900,
  },
  {
    id: "a6",
    thumbnail:
      "https://images.unsplash.com/photo-1767972160300-86d0af82558f?w=400&h=225&fit=crop",
    title: "均線理論實戰應用｜如何用20MA、60MA找出最佳進出場點",
    channel: "[CMoney理財寶] 編輯部",
    date: "2025/12/15",
    type: "article",
    views: 1100,
    isLocked: true,
  },
  {
    id: "a7",
    thumbnail:
      "https://images.unsplash.com/photo-1740153204804-200310378f2f?w=400&h=225&fit=crop",
    title: "外資籌碼分析教學｜如何追蹤三大法人動向並順勢操作",
    channel: "[CMoney理財寶] 編輯部",
    date: "2025/12/08",
    type: "article",
    views: 1300,
  },
  {
    id: "a8",
    thumbnail:
      "https://images.unsplash.com/photo-1758691736591-5bf31a5d0dea?w=400&h=225&fit=crop",
    title: "電動車供應鏈全解析｜台廠在全球EV市場的機會與挑戰",
    channel: "[CMoney理財寶] 編輯部",
    date: "2025/12/01",
    type: "article",
    views: 1400,
  },
  {
    id: "a9",
    thumbnail:
      "https://images.unsplash.com/photo-1762279389020-eeeb69c25813?w=400&h=225&fit=crop",
    title: "存股族必看｜高殖利率股票篩選策略與風險評估指標",
    channel: "[CMoney理財寶] 編輯部",
    date: "2025/11/25",
    type: "article",
    views: 1600,
  },
  {
    id: "a10",
    thumbnail:
      "https://images.unsplash.com/photo-1767972160300-86d0af82558f?w=400&h=225&fit=crop",
    title:
      "技術分析型態大全｜頭肩頂、雙底、三角收斂等經典圖形判讀",
    channel: "[CMoney理財寶] 編輯部",
    date: "2025/11/18",
    type: "article",
    views: 1700,
  },
];

const podcastContent: ContentItem[] = [
  {
    id: "p1",
    thumbnail:
      "https://images.unsplash.com/photo-1740153204804-200310378f2f?w=400&h=225&fit=crop",
    title: "EP56 | #投資理財 進場 5 分鐘就「畢業」？聽聽...",
    channel:
      "在投資市場裡，大家都在追求翻倍，但事實是很多人連市場的門檻都還沒貼，就先迎來了「畢業典禮」。這集...",
    date: "01/28(三)",
    duration: "8分鐘",
    type: "podcast",
    isLocked: true,
    popularity: 890,
  },
  {
    id: "p2",
    thumbnail:
      "https://images.unsplash.com/photo-1758691736591-5bf31a5d0dea?w=400&h=225&fit=crop",
    title: "EP55 | #投資理財 主動投資真的很恐怖嗎？想...",
    channel:
      "在投資的世界裡，到底該自己選股，還是無腦跟著大盤走？很多人覺得主動投資就是在玩命，風險高得嚇人；...",
    date: "01/21(三)",
    duration: "6分鐘",
    type: "podcast",
    popularity: 1200,
  },
  {
    id: "p3",
    thumbnail:
      "https://images.unsplash.com/photo-1767972160300-86d0af82558f?w=400&h=225&fit=crop",
    title: "EP53 | #投資理財 股票總是一買就漲？為什麼...",
    channel:
      "為什麼股票一買就反彈，抱著的卻遲遲不漲？這種讓人抓狂的經驗，往往來自於衝動出缺乏依據，以及過度貼近盤...",
    date: "01/07(三)",
    duration: "9分鐘",
    type: "podcast",
    isLocked: true,
    popularity: 1050,
  },
  {
    id: "p4",
    thumbnail:
      "https://images.unsplash.com/photo-1740153204804-200310378f2f?w=400&h=225&fit=crop",
    title: "EP52 | #生活趨點 為什麼拼命工作卻存不到錢...",
    channel:
      "你是否發現，有些人一輩子都在努力工作，卻永遠存不到錢？而有些人看起來非常輕鬆愜意，財富卻像雪球一樣...",
    date: "12/31(三)",
    duration: "9分鐘",
    type: "podcast",
    popularity: 750,
  },
];

export function ContentPage() {
  const { contentMainTab, setContentMainTab, contentSubTab, setContentSubTab } = useTabContext();
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(),
  );
  const [playingVideo, setPlayingVideo] =
    useState<ContentItem | null>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState<SortType>("latest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // 當主標籤改變時，自動設置sub tab為第一個，並重置搜尋和排序
  useEffect(() => {
    const subTabs = getSubTabs();
    if (subTabs.length > 0 && !subTabs.some(tab => tab.id === contentSubTab)) {
      setContentSubTab(subTabs[0].id);
    }
    // 當主標籤改變時，關閉正在播放的影片
    setPlayingVideo(null);
    // 重置搜尋和排序
    setSearchQuery("");
    setSortType("latest");
  }, [contentMainTab]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handlePlay = (item: ContentItem) => {
    if (!item.isLocked) {
      setPlayingVideo(item);
    } else {
      setShowSubscriptionModal(true);
    }
  };

  const handleClosePlayer = () => {
    setPlayingVideo(null);
  };

  const getCurrentContent = () => {
    if (contentSubTab === "favorite") {
      const allContent = [
        ...mockContent,
        ...courseContent,
        ...articleContent,
        ...podcastContent,
      ];
      // 只顯示當前主標籤類型的收藏內容
      return allContent.filter((item) =>
        favorites.has(item.id) && item.type === contentMainTab
      );
    }

    switch (contentMainTab) {
      case "video":
        return mockContent;
      case "course":
        // 根據 sub tab 篩選講座
        if (contentSubTab === "purchased") {
          return courseContent.filter(item => item.isPurchased);
        } else if (contentSubTab === "unpurchased") {
          return courseContent.filter(item => !item.isPurchased);
        }
        return courseContent;
      case "article":
        return articleContent;
      case "podcast":
        return podcastContent;
      default:
        return mockContent;
    }
  };

  // 檢查是否需要顯示搜尋和排序（排除講座和我的最愛）
  const showSearchAndSort = contentMainTab !== "course" && contentSubTab !== "favorite";

  // 搜尋和排序處理
  const getFilteredAndSortedContent = () => {
    let content = getCurrentContent();

    // 搜尋過濾
    if (searchQuery.trim()) {
      content = content.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.channel.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 排序
    if (showSearchAndSort) {
      content = [...content].sort((a, b) => {
        if (sortType === "latest") {
          // 依日期排序（最新的在前）
          return b.date.localeCompare(a.date);
        } else {
          // 依熱門度排序
          if (contentMainTab === "article") {
            return (b.views || 0) - (a.views || 0);
          } else {
            // 影音和 podcast 使用 popularity（假設值）
            return (b.popularity || 0) - (a.popularity || 0);
          }
        }
      });
    }

    return content;
  };

  // 獲取類別的中文名稱
  const getCategoryLabel = (type: MainTabType): string => {
    switch (type) {
      case "video": return "影音";
      case "course": return "講座";
      case "article": return "文章";
      case "podcast": return "Podcast";
      default: return "";
    }
  };

  // Determine which sub tabs to show based on main tab
  const getSubTabs = (): { id: SubTabType, label: string }[] => {
    switch (contentMainTab) {
      case "video":
        return [
          { id: "live", label: "直播教學" },
          { id: "favorite", label: "我的最愛" },
        ];
      case "course":
        return [
          { id: "unpurchased", label: "未購買" },
          { id: "purchased", label: "已購買" },
          { id: "favorite", label: "我的最愛" },
        ];
      case "article":
        return [
          { id: "stock", label: "股票" },
          { id: "tutorial", label: "教學" },
          { id: "favorite", label: "我的最愛" },
        ];
      case "podcast":
        return [
          { id: "live", label: "全部內容" },
          { id: "favorite", label: "我的最愛" },
        ];
      default:
        return [];
    }
  };

  const currentContent = getFilteredAndSortedContent();
  const mainTabs = [
    { id: "video" as const, label: "影音" },
    { id: "course" as const, label: "講座" },
    { id: "article" as const, label: "文章" },
    { id: "podcast" as const, label: "Podcast" },
  ];
  const subTabs = getSubTabs();

  return (
    <div className="bg-background pb-16">
      {/* Header with Tabs */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-sm z-40">
        {/* Main Tabs */}
        <div className="px-4 h-14 flex items-center">
          <div className="flex items-center gap-6">
            {mainTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setContentMainTab(tab.id)}
                className="relative pb-1 transition-colors"
              >
                <span className={`text-base font-medium ${
                  contentMainTab === tab.id ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {tab.label}
                </span>
                {contentMainTab === tab.id && (
                  <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF]" />
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Sub Tabs */}
        {subTabs.length > 0 && (
          <div className="border-b border-border bg-muted/20">
            <div className="flex items-center gap-1 px-4  overflow-x-auto">
              {subTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setContentSubTab(tab.id)}
                  className="relative px-4 py-1.5 text-base font-medium transition-colors whitespace-nowrap"
                >
                  <span className={
                    contentSubTab === tab.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }>
                    {tab.label}
                  </span>
                  {contentSubTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Video Player - At the top when playing */}
      {playingVideo && (
        <div className="w-full bg-black sticky top-0 z-40">
          <div className="relative w-full aspect-video">
            <video
              className="w-full h-full"
              controls
              autoPlay
              poster={playingVideo.thumbnail}
              src={playingVideo.thumbnail}
            >
              您的瀏覽器不支援影片播放
            </video>
            <button
              className="absolute top-2 right-2 p-2 bg-black/60 hover:bg-black/80 rounded-full transition-colors"
              onClick={handleClosePlayer}
            >
              <svg
                className="w-5 h-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" />
              </svg>
            </button>
          </div>
          <div className="px-4 py-3 bg-card">
            <h3 className="text-sm font-medium mb-1">
              {playingVideo.title}
            </h3>
            <div className="text-xs text-muted-foreground">
              <div>{playingVideo.channel}</div>
              <div>{playingVideo.date}</div>
            </div>
          </div>
        </div>
      )}

      {/* Content List */}
      <div className="px-4 py-3">
        {/* Search and Sort Bar */}
        {showSearchAndSort && (
          <div className="flex items-center gap-2 mb-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="搜尋標題或頻道..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-1.5 px-4 py-2  text-sm hover:bg-muted transition-colors whitespace-nowrap"
              >
                <span>{sortType === "latest" ? "最新" : "最熱門"}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Dropdown Menu */}
              {showSortDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowSortDropdown(false)}
                  />
                  <div className="absolute right-0 top-full mt-1 w-28 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-20">
                    <button
                      onClick={() => {
                        setSortType("latest");
                        setShowSortDropdown(false);
                      }}
                      className={`w-full px-4 py-2.5 text-sm text-left hover:bg-muted/50 transition-colors ${
                        sortType === "latest" ? "bg-muted/30 text-primary font-medium" : ""
                      }`}
                    >
                      最新
                    </button>
                    <button
                      onClick={() => {
                        setSortType("popular");
                        setShowSortDropdown(false);
                      }}
                      className={`w-full px-4 py-2.5 text-sm text-left hover:bg-muted/50 transition-colors ${
                        sortType === "popular" ? "bg-muted/30 text-primary font-medium" : ""
                      }`}
                    >
                      最熱門
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {contentSubTab === "favorite" ? (
          // 我的最愛模式：只顯示當前主標籤類型的收藏
          <div className="space-y-3">
            {currentContent.length === 0 ? (
              <div className="flex flex-col items-center justify-between min-h-[calc(100vh-350px)] py-12">
                <div className="flex-1 flex flex-col items-center justify-center">
                  <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground mb-2">
                    尚無收藏內容
                  </p>
                  <p className="text-sm text-muted-foreground">
                    點擊下方按鈕瀏覽更多內容
                  </p>
                </div>
                <button
                  onClick={() => {
                    // 跳轉到該類別的第一個 tab
                    const firstTab = getSubTabs()[0]?.id;
                    if (firstTab) {
                      setContentSubTab(firstTab);
                    }
                  }}
                  className="px-6 py-3 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium transition-all"
                >
                  瀏覽內容
                </button>
              </div>
            ) : (
              currentContent.map((item) => (
                <ContentCard
                  key={item.id}
                  item={item}
                  isFavorite={favorites.has(item.id)}
                  onToggleFavorite={() => toggleFavorite(item.id)}
                  onPlay={() => handlePlay(item)}
                  onLockedClick={() => setShowSubscriptionModal(true)}
                />
              ))
            )}
          </div>
        ) : (
          // 一般模式：直接顯示列表
          <div className="space-y-3">
            {currentContent.map((item) => (
              <ContentCard
                key={item.id}
                item={item}
                isFavorite={favorites.has(item.id)}
                onToggleFavorite={() => toggleFavorite(item.id)}
                onPlay={() => handlePlay(item)}
                onLockedClick={() => setShowSubscriptionModal(true)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <SubscriptionModal
          isOpen={showSubscriptionModal}
          onClose={() => setShowSubscriptionModal(false)}
        />
      )}
    </div>
  );
}

interface ContentCardProps {
  item: ContentItem;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onPlay?: () => void;
  onLockedClick?: () => void;
}

function ContentCard({
  item,
  isFavorite,
  onToggleFavorite,
  onPlay,
  onLockedClick,
}: ContentCardProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // 檢查是否應該顯示鎖：內容被鎖定 且 使用者不是專業版
  const shouldShowLock = item.isLocked && !(user?.isPro);

  const handleCardClick = () => {
    if (item.isLocked) {
      onLockedClick();
    }
  };

  const handleThumbnailClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.type === "video") {
      if (!item.isLocked) {
        onPlay();
      } else {
        onLockedClick();
      }
    }
  };

  // Podcast 專用 UI - 不顯示縮圖
  if (item.type === "podcast") {
    return (
      <div 
        className={`relative flex gap-3 pb-4 border-b border-border/50 last:border-b-0 ${shouldShowLock ? "cursor-pointer" : ""}`}
        onClick={shouldShowLock ? handleCardClick : undefined}
      >
        {/* Content Info */}
        <div className="flex-1 min-w-0">
          <h3 className={`text-sm font-normal leading-snug mb-2 ${shouldShowLock ? "opacity-60" : ""}`}>
            {item.title}
          </h3>
          <p className={`text-xs text-muted-foreground leading-relaxed mb-2 line-clamp-2 ${shouldShowLock ? "opacity-60" : ""}`}>
            {item.channel}
          </p>
          <div className={`text-xs text-muted-foreground ${shouldShowLock ? "opacity-60" : ""}`}>
            {item.date}·{item.duration}
          </div>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!shouldShowLock) {
              onToggleFavorite();
            }
          }}
          className="flex-shrink-0 self-start mt-1 p-2 hover:bg-muted/50 rounded-full transition-colors"
          disabled={shouldShowLock}
        >
          <Heart
            className={`w-5 h-5 transition-all ${
              isFavorite
                ? "fill-[#4A90E2] text-[#4A90E2]"
                : "text-muted-foreground"
            } ${shouldShowLock ? "opacity-40" : ""}`}
          />
        </button>

        {/* Play Button or Lock */}
        {shouldShowLock ? (
          <div className="flex-shrink-0 self-center flex flex-col items-center gap-1">
            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <span className="text-[10px] text-[#D4AF37] font-medium whitespace-nowrap">
              升級解鎖
            </span>
          </div>
        ) : (
          <button
            className="flex-shrink-0 self-center w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            onClick={(e) => {
              e.stopPropagation();
              // TODO: 播放 podcast
            }}
          >
            <Play className="w-5 h-5 text-black fill-black ml-0.5" />
          </button>
        )}
      </div>
    );
  }

  // 文章專用 UI - 不顯示縮圖
  if (item.type === "article") {
    return (
      <div
        className={`relative flex gap-3 pb-4 border-b border-border/50 last:border-b-0 cursor-pointer hover:bg-muted/30 transition-colors -mx-4 px-4`}
        onClick={shouldShowLock ? handleCardClick : () => navigate(`/article/${item.id}`)}
      >
        {/* Content Info */}
        <div className="flex-1 min-w-0">
          <h3 className={`text-sm font-normal leading-snug mb-2 ${shouldShowLock ? "opacity-60" : ""}`}>
            {item.title}
          </h3>
          <div className={`flex items-center gap-3 text-xs text-muted-foreground ${shouldShowLock ? "opacity-60" : ""}`}>
            <span>{item.date}</span>
            <div className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              <span>{item.views}</span>
            </div>
          </div>
        </div>

        {/* Favorite Button - 只在非鎖定狀態顯示 */}
        {!shouldShowLock && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className="flex-shrink-0 self-start mt-1 p-2 hover:bg-muted/50 rounded-full transition-colors"
          >
            <Heart
              className={`w-5 h-5 transition-all ${
                isFavorite
                  ? "fill-[#4A90E2] text-[#4A90E2]"
                  : "text-muted-foreground"
              }`}
            />
          </button>
        )}

        {/* Lock Icon */}
        {shouldShowLock && (
          <div className="flex-shrink-0 self-center flex flex-col items-center gap-1">
            <Lock className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-[10px] text-[#D4AF37] font-medium whitespace-nowrap">
              升級解鎖
            </span>
          </div>
        )}
      </div>
    );
  }

  // 其他類型（影音、講座）的原有 UI
  return (
    <div
      className={`flex gap-3 pb-3 border-b border-border/50 last:border-b-0 ${item.isLocked ? "cursor-pointer" : ""}`}
      onClick={handleCardClick}
    >
      {/* Thumbnail */}
      <div
        className="relative flex-shrink-0 w-40 h-24 bg-muted rounded-lg overflow-hidden cursor-pointer"
        onClick={handleThumbnailClick}
      >
        <ImageWithFallback
          src={item.thumbnail}
          alt={item.title}
          className={`w-full h-full object-cover ${shouldShowLock ? "opacity-60" : ""}`}
        />
        {item.duration && !shouldShowLock && (
          <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 text-white text-xs rounded">
            {item.duration}
          </div>
        )}
        {item.type === "video" && !shouldShowLock && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-black/60 rounded-full flex items-center justify-center">
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </div>
          </div>
        )}
        {shouldShowLock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <div className="flex flex-col items-center gap-1">
              <Lock className="w-6 h-6 text-[#D4AF37]" />
              <span className="text-xs text-[#D4AF37] font-medium">
                VIP專屬
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-normal leading-snug line-clamp-2 mb-1">
            {item.title}
          </h3>
          <div className="text-xs text-muted-foreground">
            {item.type === "course" ? (
              item.isPurchased ? (
                // 已購買：顯示立即觀看按鈕
                <div className="flex items-center gap-2 mt-1">
                  <button
                    className="px-3 py-1 bg-[#4A90E2] text-white text-xs font-bold rounded hover:bg-[#3A80D2] transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    立即觀看
                  </button>
                </div>
              ) : (
                // 未購買：顯示日期、時間和價格
                <>
                  <div>
                    {item.date} {item.timeRange}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-primary font-medium">
                      NT$ {item.price}
                    </span>
                    <button
                      className="px-2 py-0.5 bg-[#4A90E2] text-white text-xs font-bold rounded hover:bg-[#3A80D2] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      購買
                    </button>
                  </div>
                </>
              )
            ) : (
              <>
                <div>{item.channel}</div>
                <div>{item.date}</div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite();
        }}
        className="flex-shrink-0 self-start mt-1 p-2 hover:bg-muted/50 rounded-full transition-colors"
      >
        <Heart
          className={`w-5 h-5 transition-all ${
            isFavorite
              ? "fill-[#4A90E2] text-[#4A90E2]"
              : "text-muted-foreground"
          }`}
        />
      </button>
    </div>
  );
}