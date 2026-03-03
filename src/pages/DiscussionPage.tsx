import { useState } from "react";
import { EditHistoryModal } from "../components/EditHistoryModal";
import { CreatePostModal } from "../components/CreatePostModal";
import {
  MessageCircle,
  Heart,
  ThumbsUp,
  Lock,
  Plus,
  MoreHorizontal,
  Share2,
  TrendingUp,
  TrendingDown,
  Trash2,
  Flag,
  Ban,
  Edit,
  History,
  X,
  Download,
} from "lucide-react";
import enruImage from "figma:asset/095f4405cde9352f659086e40b9cb6883546f0c4.png";
import { useTabContext } from "../lib/tabContext";
import { useAuth } from "../lib/authContext";
import { useNavigate } from "react-router";
import { SubscriptionModal } from "../components/SubscriptionModal";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { EditPostModal } from "../components/EditPostModal";
import { BlockConfirmModal } from "../components/BlockConfirmModal";
import { ReportModal } from "../components/ReportModal";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";
import {
  ReactionPicker,
  ReactionType,
  ReactionAsset1,
  ReactionAsset2,
  ReactionAsset3,
  ReactionAsset4,
  ReactionAsset5,
  ReactionAsset6,
} from "../components/ReactionPicker";
import { ReactionDetailModal } from "../components/ReactionDetailModal";
import { toast } from "sonner";
import { MiniStockChart } from "../components/MiniStockChart";

type TabType = "enru" | "vip";
type SubTabType = "qa" | "elite";

interface StockTag {
  code: string;
  name: string;
  trend: "up" | "down";
  pattern: number; // 0-9，決定線段形狀
}

interface StockData {
  code: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  amount: number;
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
  videoUrl?: string; // YouTube 影片連結
  likes: number;
  comments: number;
  reactions: string[];
  hasEditHistory?: boolean;
}

const enruPosts: Post[] = [
  {
    id: "enru-1",
    author: {
      name: "林恩如-超簡單投資法",
      avatar: enruImage,
      subtitle: "專業投資顧問",
      memberId: "enru",
    },
    time: "6h",
    title: "為什麼你買股票總是在「領股息」，而不是「賺價差」？",
    content:
      "很多人買了股票套牢，就開始自己：「沒關係啦，這間公司很穩，我改領股息當存股。」別再騙自己了！這叫「被迫長期投資」。真正的投資應該是主動選擇，而不是被套牢後才說要領股息...",
    stockTags: [
      { code: "2303", name: "聯電", trend: "down", pattern: 2 },
      { code: "2344", name: "華邦電", trend: "down", pattern: 3 },
      { code: "3064", name: "煒華", trend: "up", pattern: 1 },
      { code: "3037", name: "欣興", trend: "up", pattern: 0 },
      { code: "3322", name: "一詮", trend: "down", pattern: 4 },
    ],
    images: [
      "https://images.unsplash.com/photo-1766218329569-53c9270bb305?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMG1hcmtldCUyMHRyYWRpbmclMjBjaGFydHxlbnwxfHx8fDE3NzA4NjA1ODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    likes: 59,
    comments: 2,
    reactions: ["👍", "😮"],
  },
  {
    id: "enru-2",
    author: {
      name: "林恩如-超簡單投資法",
      avatar: enruImage,
      subtitle: "專業投資顧問",
      memberId: "enru",
    },
    time: "12h",
    title: "恩如三部曲教學：如何用溫度條挑出噴出回檔股",
    content:
      "今天來跟大家分享恩如三部曲的第一步：挑噴出/回檔。很多學員問我，溫度條要怎麼看？其實很簡單，溫度條越高，代表股價離均線越遠，回檔機率越大。但反過來說，溫度條從高降下來，就是進場時機...",
    stockTags: [
      { code: "2330", name: "台積電", trend: "up", pattern: 5 },
      { code: "2454", name: "聯發科", trend: "up", pattern: 6 },
      { code: "3711", name: "日月光投控", trend: "up", pattern: 7 },
    ],
    images: [
      "https://images.unsplash.com/photo-1763038311036-6d18805537e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBidXNpbmVzcyUyMGRhdGF8ZW58MXx8fHwxNzcwODYwNTg1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1734856080638-71e78b3d8d5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlc3RtZW50JTIwYW5hbHlzaXMlMjBncmFwaHxlbnwxfHx8fDE3NzA4NjA1ODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    likes: 125,
    comments: 18,
    reactions: ["👍", "🔥", "💯"],
    hasEditHistory: true,
  },
  {
    id: "enru-3",
    author: {
      name: "林恩如-超簡單投資法",
      avatar: enruImage,
      subtitle: "專業投資顧問",
      memberId: "enru",
    },
    time: "1d",
    title: "本週教學重點：型態判斷與趨勢確認",
    content:
      "這週的課程重點在於如何判斷股票的型態。很多人以為股票漲就是好，跌就是壞，但其實型態比漲跌更重要。一支股票如果是在整理型態，即使漲幅不大，也可能是好的進場點...",
    stockTags: [
      { code: "2308", name: "台達電", trend: "up", pattern: 8 },
      { code: "2382", name: "廣達", trend: "up", pattern: 9 },
      { code: "2317", name: "鴻海", trend: "up", pattern: 1 },
    ],
    likes: 89,
    comments: 12,
    reactions: ["👍", "❤️"],
  },
  // YouTube 影片教學貼文
  {
    id: "enru-4",
    author: {
      name: "林恩如-超簡單投資法",
      avatar: enruImage,
      subtitle: "專業投資顧問",
      memberId: "enru",
    },
    time: "2d",
    title: "",
    content:
      "https://youtu.be/dQw4w9WgXcQ\n\n今天的教學影片來了！這次詳細講解恩如三部曲的實戰應用，包含如何用溫度條、型態和量能來選股。影片中有完整的案例分析，建議大家認真看完，對選股會很有幫助！",
    stockTags: [],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    likes: 523,
    comments: 127,
    reactions: ["🔥", "💯", "👍"],
  },
  // 純文字貼文（無標題、有股票標籤）
  {
    id: "enru-5",
    author: {
      name: "林恩如-超簡單投資法",
      avatar: enruImage,
      subtitle: "專業投資顧問",
      memberId: "enru",
    },
    time: "3d",
    title: "",
    content:
      "今天要跟大家分享一個重要觀念：不要追高！很多學員看到股票漲就想買，結果買在高點。記住，恩如三部曲的第一步就是要等回檔。像台積電和聯發科這種大型權值股，一定要等溫度條降下來再進場，不要FOMO（錯失恐懼症）。耐心等待，才能買在好價位！",
    stockTags: [
      { code: "2330", name: "台積電", trend: "up", pattern: 5 },
      { code: "2454", name: "聯發科", trend: "up", pattern: 6 },
    ],
    likes: 234,
    comments: 45,
    reactions: ["👍", "💪"],
  },
  // 純圖片貼文（多張圖）
  {
    id: "enru-6",
    author: {
      name: "林恩如-超簡單投資法",
      avatar: enruImage,
      subtitle: "專業投資顧問",
      memberId: "enru",
    },
    time: "4d",
    title: "",
    content: "本週選股結果分享！這三支都是用恩如三部曲選出來的，型態和量能都很漂亮 📈",
    stockTags: [
      { code: "2308", name: "台達電", trend: "up", pattern: 8 },
      { code: "3034", name: "聯詠", trend: "up", pattern: 9 },
      { code: "2454", name: "聯發科", trend: "up", pattern: 6 },
    ],
    images: [
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMGNoYXJ0JTIwYW5hbHlzaXN8ZW58MXx8fHwxNzM5MzcxMjAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBncmFwaHxlbnwxfHx8fDE3MzkzNzEyMDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHlzaXN8ZW58MXx8fHwxNzM5MzcxMjAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    likes: 167,
    comments: 28,
    reactions: ["🔥", "👍"],
  },
  // 有標題 + 文字（無圖片、有編輯紀錄）
  {
    id: "enru-7",
    author: {
      name: "林恩如-超簡單投資法",
      avatar: enruImage,
      subtitle: "專業投資顧問",
      memberId: "enru",
    },
    time: "5d",
    title: "重要公告：下週課程調整通知",
    content:
      "各位學員好！因為下週二（2/18）有重要會議，所以當天的直播課程會提前到晚上7點開始。課程內容不變，一樣會教大家如何用恩如三部曲選股。另外，下週四會加開一場Q&A時間，讓大家問問題。請大家記得調整時間喔！",
    stockTags: [],
    likes: 312,
    comments: 67,
    reactions: ["👍", "❤️"],
    hasEditHistory: true,
  },
];

const vipPosts: Post[] = [
  {
    id: "vip-1",
    author: {
      name: "VIP投資團隊",
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
      subtitle: "資深分析師",
      memberId: "vip",
    },
    time: "2h",
    title:
      "【獨家】AI伺服器供應鏈深度解析：下一波主升段即將啟動",
    content:
      "根據我們的內部消息和供應鏈調查，AI伺服器的訂單能見度已經延伸到2026年Q2。這波不是炒作，是真實的訂單成長。重點標的包括：散熱模組、機殼、連接器等相關供應鏈...",
    stockTags: [
      { code: "2382", name: "廣達", trend: "up", pattern: 8 },
      { code: "2317", name: "鴻海", trend: "up", pattern: 1 },
      { code: "6669", name: "緯穎", trend: "up", pattern: 5 },
      { code: "3450", name: "聯鈞", trend: "up", pattern: 6 },
      { code: "2393", name: "億光", trend: "up", pattern: 7 },
    ],
    images: [
      "https://images.unsplash.com/photo-1599709702874-a8ac2e25c538?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwZWxlY3Ryb25pY3MlMjBjaXJjdWl0fGVufDF8fHx8MTc3MDg2MDU4NXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzcwNzY1NDYwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    likes: 256,
    comments: 47,
    reactions: ["🔥", "💎", "🚀"],
  },
  {
    id: "vip-2",
    author: {
      name: "金融股達人",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      subtitle: "VIP專屬分析師",
      memberId: "vip",
    },
    time: "5h",
    title:
      "【VIP限定】主力佈局曝光：這5檔電子股籌碼已經集中完畢",
    content:
      "經過三個月的底部整理，這幾檔電子股的籌碼結構已經非常乾淨。我們追蹤的大戶持股比例持續增加，散戶持股則在減少。這是典型的主力吃貨訊號。預計下週開始會有一波突破行情...",
    stockTags: [
      { code: "3034", name: "聯詠", trend: "up", pattern: 9 },
      { code: "2454", name: "聯發科", trend: "up", pattern: 6 },
      { code: "2449", name: "京元電子", trend: "up", pattern: 7 },
      { code: "3443", name: "創意", trend: "up", pattern: 8 },
      { code: "3661", name: "世芯-KY", trend: "up", pattern: 5 },
    ],
    images: [
      "https://images.unsplash.com/photo-1758518731706-be5d5230e5a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBkaXNjdXNzaW9ufGVufDF8fHx8MTc3MDg1Nzk5Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    likes: 312,
    comments: 68,
    reactions: ["💎", "🚀", "💰"],
  },
  {
    id: "vip-3",
    author: {
      name: "短線狙擊手",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      subtitle: "當沖專家",
      memberId: "vip",
    },
    time: "8h",
    title: "明日盤前佈局策略：三檔強勢股進場點位分析",
    content:
      "今天盤後分析了整體技術面和籌碼面，明天有三檔股票值得關注。第一檔是航運股的陽明，技術面已經突破下降趨勢線；第二檔是塑化股的台塑，基本面轉佳且法人持續買超...",
    stockTags: [
      { code: "2609", name: "陽明", trend: "up", pattern: 8 },
      { code: "1301", name: "台塑", trend: "up", pattern: 9 },
      { code: "2603", name: "長榮", trend: "up", pattern: 1 },
      { code: "1303", name: "南亞", trend: "up", pattern: 5 },
    ],
    likes: 189,
    comments: 35,
    reactions: ["🔥", "👍", "💪"],
  },
  {
    id: "vip-4",
    author: {
      name: "價值投資者",
      avatar:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop",
      subtitle: "長線投資顧問",
      memberId: "vip",
    },
    time: "1d",
    title: "【深度研究】2026 生技醫療產業趨勢與投資機會",
    content:
      "經過我們團隊長達兩個月的研究，整理出生技醫療產業的三大投資主軸：新藥研發、醫材出口、健康照護。特別是新藥研發領域，有幾家公司的臨床進度超乎預期...",
    stockTags: [
      { code: "4123", name: "晟德", trend: "up", pattern: 6 },
      { code: "6446", name: "藥華藥", trend: "up", pattern: 7 },
      { code: "4103", name: "百略", trend: "up", pattern: 8 },
      { code: "1789", name: "神隆", trend: "up", pattern: 5 },
    ],
    images: [
      "https://images.unsplash.com/photo-1766218329569-53c9270bb305?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMG1hcmtldCUyMHRyYWRpbmclMjBjaGFydHxlbnwxfHx8fDE3NzA4NjA1ODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1734856080638-71e78b3d8d5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlc3RtZW50JTIwYW5hbHlzaXMlMjBncmFwaHxlbnwxfHx8fDE3NzA4NjA1ODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    likes: 234,
    comments: 52,
    reactions: ["💎", "📈", "🏆"],
  },
  // 純文字貼文（無標題、無圖片、有股票標籤）
  {
    id: "vip-5",
    author: {
      name: "技術分析師",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
      subtitle: "專業分析師",
      memberId: "tech-analyst",
    },
    time: "3h",
    title: "",
    content:
      "位這樣的布局，台達電和廣達都是AI產業鏈的受惠者，最近觀察到法人持續佈局。從技術面來看，雙雙突破前高，量能也穩定放大。建議可以逢低佈局，目標價往上看10%。這週要特別注意美股動向和台幣匯率變化，會影響外資進出。",
    stockTags: [
      { code: "2308", name: "台達電", trend: "up", pattern: 8 },
      { code: "2382", name: "廣達", trend: "up", pattern: 1 },
    ],
    likes: 156,
    comments: 23,
    reactions: ["👍", "💪"],
  },
  // 有標題純文字貼文（無圖片）
  {
    id: "vip-6",
    author: {
      name: "市場察員",
      avatar:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop",
      subtitle: "市場分析專家",
      memberId: "market-watcher",
    },
    time: "5h",
    title: "台股盤中觀察：外資大買超，資金行情啟動？",
    content:
      "今天外資大買超150億，主要集中在權值股。從籌碼面觀察，這波資金行情可能才剛開始。建議持股不要輕易被洗出，特別是電子權值股。但也要注意，如果美股走弱，台股可能會有回檔壓力。操作上建議控制好部位，不要過度追高...",
    stockTags: [
      { code: "2330", name: "台積電", trend: "up", pattern: 5 },
      { code: "2454", name: "聯發科", trend: "up", pattern: 6 },
      { code: "2317", name: "鴻海", trend: "up", pattern: 1 },
    ],
    likes: 278,
    comments: 45,
    reactions: ["🔥", "👍", "💎"],
    hasEditHistory: true,
  },
  // 有 YouTube 影片的貼文
  {
    id: "vip-7",
    author: {
      name: "影音教學頻道",
      avatar:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop",
      subtitle: "投資YouTuber",
      memberId: "video-teacher",
    },
    time: "1d",
    title: "",
    content:
      "https://youtu.be/dQw4w9WgXcQ\n\n剛才的影片是大哥的講盤影片重播，詳細分析了近期盤勢和進場時機，片長約15分鐘。建議大家看完再決定操作策略！",
    stockTags: [],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    likes: 412,
    comments: 89,
    reactions: ["🔥", "💯", "👍"],
  },
  // 純圖片貼文（無標題、有圖片、無文字）
  {
    id: "vip-8",
    author: {
      name: "圖表達人",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      subtitle: "技術分析專家",
      memberId: "chart-master",
    },
    time: "2d",
    title: "",
    content: "今日盤勢分析圖",
    stockTags: [
      { code: "2330", name: "台積電", trend: "up", pattern: 5 },
    ],
    images: [
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMGNoYXJ0JTIwYW5hbHlzaXN8ZW58MXx8fHwxNzM5MzcxMjAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBncmFwaHxlbnwxfHx8fDE3MzkzNzEyMDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHlzaXN8ZW58MXx8fHwxNzM5MzcxMjAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    likes: 98,
    comments: 15,
    reactions: ["👍", "📊"],
  },
];

export function DiscussionPage() {
  const { discussionTab, setDiscussionTab } = useTabContext();
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [subTab, setSubTab] = useState<SubTabType>("qa");
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] =
    useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);

  // 買文列表狀態管理
  const [enruPostsList, setEnruPostsList] =
    useState<Post[]>(enruPosts);
  const [vipPostsList, setVipPostsList] =
    useState<Post[]>(vipPosts);
  const [blockedUsers, setBlockedUsers] = useState<Set<string>>(
    new Set(),
  );

  // 刪除貼文
  const handleDeletePost = (postId: string, tab: TabType) => {
    if (tab === "enru") {
      setEnruPostsList((prev) =>
        prev.filter((post) => post.id !== postId),
      );
    } else {
      setVipPostsList((prev) =>
        prev.filter((post) => post.id !== postId),
      );
    }
    toast.success("已刪除貼文");
  };

  // 封鎖用戶
  const handleBlockUser = (
    memberId: string,
    userName: string,
  ) => {
    setBlockedUsers((prev) => new Set(prev).add(memberId));
    toast.success(`已封鎖 ${userName}`);
  };

  // 過濾被封鎖用戶的貼文
  const filteredEnruPosts = enruPostsList.filter(
    (post) => !blockedUsers.has(post.author.memberId),
  );
  const filteredVipPosts = vipPostsList.filter(
    (post) => !blockedUsers.has(post.author.memberId),
  );

  const canAccessVIP = isLoggedIn && user?.isPro;
  const canAccessElite = isLoggedIn && user?.isPro;

  const tabs = [
    { id: "enru" as const, label: "恩如專區" },
    { id: "vip" as const, label: "VIP社團" },
  ];

  const subTabs = [
    {
      id: "qa" as const,
      label: "超粉QA問答區",
      requiresPro: false,
    },
    {
      id: "elite" as const,
      label: "長線菁英討論群",
      requiresPro: true,
    },
  ];

  const openSubscriptionModal = () => {
    setIsSubscriptionModalOpen(true);
  };

  const closeSubscriptionModal = () => {
    setIsSubscriptionModalOpen(false);
  };

  const handleSubTabClick = (
    tabId: SubTabType,
    requiresPro: boolean,
  ) => {
    if (requiresPro && !canAccessElite) {
      openSubscriptionModal();
    } else {
      setSubTab(tabId);
    }
  };

  // 處理發文
  const handlePublishPost = async (
    title: string,
    content: string,
    stockTags: StockTag[],
    images: string[],
  ): Promise<boolean> => {
    try {
      // 模擬API調用
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 創建新貼文
      const newPost: Post = {
        id: `vip-${Date.now()}`,
        author: {
          name: user?.name || "當前用戶",
          avatar:
            user?.avatar ||
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
          subtitle: "社團成員",
          memberId: user?.id || "current-user",
        },
        time: "剛剛",
        title,
        content,
        stockTags,
        images,
        likes: 0,
        comments: 0,
        reactions: [],
      };

      // 添加到列表最上面
      if (discussionTab === "vip") {
        setVipPostsList([newPost, ...vipPostsList]);
      } else {
        setEnruPostsList([newPost, ...enruPostsList]);
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="bg-background pb-16">
      {/* Header with Tabs */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-sm z-40">
        <div className="px-4 h-14 flex items-center ">
          <div className="flex items-center gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setDiscussionTab(tab.id)}
                className="relative pb-1 transition-colors"
              >
                <span
                  className={`text-base font-medium ${
                    discussionTab === tab.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {tab.label}
                </span>
                {discussionTab === tab.id && (
                  <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Sub-tabs - 只在VIP社團時顯示 */}
        {discussionTab === "vip" && (
          <div className="px-4  flex items-center gap-4 border-b border-border/50 ">
            {subTabs.map((tab) => {
              const isLocked =
                tab.requiresPro && !canAccessElite;
              const isActive = subTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() =>
                    handleSubTabClick(tab.id, tab.requiresPro)
                  }
                  className="relative flex items-center gap-2 py-2 transition-colors group"
                >
                  <span
                    className={`text-sm font-medium ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </span>
                  {isLocked && (
                    <Lock className="w-3 h-3 text-[#D4AF37]" />
                  )}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Posts List or Locked Content */}
      {discussionTab === "vip" &&
      subTab === "elite" &&
      !canAccessElite ? (
        <VIPLockedView
          isLoggedIn={isLoggedIn}
          onLoginClick={() => navigate("/home/more")}
        />
      ) : (
        <div className="pb-20 pt-3">
          {discussionTab === "enru"
            ? filteredEnruPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onDelete={handleDeletePost}
                  onBlock={handleBlockUser}
                  isEnruZone={true}
                />
              ))
            : filteredVipPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onDelete={handleDeletePost}
                  onBlock={handleBlockUser}
                  isEnruZone={false}
                />
              ))}
        </div>
      )}

      {/* Subscription Modal */}
      {isSubscriptionModalOpen && (
        <SubscriptionModal
          isOpen={isSubscriptionModalOpen}
          onClose={closeSubscriptionModal}
        />
      )}

      {/* Create Post Modal */}
      {showCreatePost && (
        <CreatePostModal
          isOpen={showCreatePost}
          onClose={() => setShowCreatePost(false)}
          onPublish={handlePublishPost}
        />
      )}

      {/* 右下角發文按鈕 - 僅在VIP社團時顯示 */}
      {discussionTab === "vip" && isLoggedIn && (
        <button
          onClick={() => setShowCreatePost(true)}
          className="fixed right-4 bottom-20 w-14 h-14 bg-[#4A90E2] rounded-full shadow-lg flex items-center justify-center hover:bg-[#3A80D2] transition-all z-50 active:scale-95"
        >
          <Plus className="w-6 h-6 text-white" />
        </button>
      )}
    </div>
  );
}

function PostCard({
  post,
  onDelete,
  onBlock,
  isEnruZone,
}: {
  post: Post;
  onDelete: (postId: string, tab: TabType) => void;
  onBlock: (memberId: string, userName: string) => void;
  isEnruZone: boolean;
}) {
  const [liked, setLiked] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showBlockConfirm, setShowBlockConfirm] =
    useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditHistory, setShowEditHistory] = useState(false);
  const [editedPost, setEditedPost] = useState(post);
  const navigate = useNavigate();
  const { user } = useAuth();

  // 內容展開狀態
  const [isExpanded, setIsExpanded] = useState(false);
  const CONTENT_PREVIEW_LENGTH = 100; // 預覽字數

  // 圖片查看器狀態
  const [imageViewer, setImageViewer] = useState<{
    images: string[];
    currentIndex: number;
  } | null>(null);

  // 表情反應狀態
  const [userReaction, setUserReaction] =
    useState<ReactionType | null>(null);
  const [showReactionPicker, setShowReactionPicker] =
    useState(false);
  const [reactionPickerMode, setReactionPickerMode] = useState<
    "sliding" | "clicking"
  >("sliding");
  const [reactionPickerPos, setReactionPickerPos] = useState({
    x: 0,
    y: 0,
  });
  const [showReactionDetail, setShowReactionDetail] =
    useState(false);
  const [longPressTimer, setLongPressTimer] =
    useState<NodeJS.Timeout | null>(null);

  // 模擬表情數據 (實際應從後端API獲取)
  const [reactionCounts, setReactionCounts] = useState<
    Record<ReactionType, number>
  >({
    1: 45,
    3: 12,
    4: 8,
    5: 3,
    6: 1,
    7: 2,
  });

  // 模擬反應者數據
  const mockReactions = [
    {
      userId: "1",
      userName: "投資達人",
      userAvatar:
        "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=100&h=100&fit=crop",
      reactionType: 1 as ReactionType,
    },
    {
      userId: "2",
      userName: "股市小白",
      userAvatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
      reactionType: 1 as ReactionType,
    },
    {
      userId: "3",
      userName: "王大明",
      userAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      reactionType: 1 as ReactionType,
    },
    {
      userId: "4",
      userName: "李小華",
      userAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      reactionType: 1 as ReactionType,
    },
    {
      userId: "5",
      userName: "陳美玲",
      userAvatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      reactionType: 1 as ReactionType,
    },
    {
      userId: "6",
      userName: "張志強",
      userAvatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      reactionType: 1 as ReactionType,
    },
    {
      userId: "7",
      userName: "價值投資者",
      userAvatar:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop",
      reactionType: 3 as ReactionType,
    },
    {
      userId: "8",
      userName: "短線高手",
      userAvatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      reactionType: 3 as ReactionType,
    },
    {
      userId: "9",
      userName: "技術分析師",
      userAvatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
      reactionType: 4 as ReactionType,
    },
    {
      userId: "10",
      userName: "林投資",
      userAvatar:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop",
      reactionType: 4 as ReactionType,
    },
    {
      userId: "11",
      userName: "黃先生",
      userAvatar:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop",
      reactionType: 5 as ReactionType,
    },
    {
      userId: "12",
      userName: "趙小姐",
      userAvatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
      reactionType: 6 as ReactionType,
    },
    {
      userId: "13",
      userName: "吳大哥",
      userAvatar:
        "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop",
      reactionType: 7 as ReactionType,
    },
    {
      userId: "14",
      userName: "劉經理",
      userAvatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
      reactionType: 1 as ReactionType,
    },
    {
      userId: "15",
      userName: "周投資顧問",
      userAvatar:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop",
      reactionType: 3 as ReactionType,
    },
  ];

  // 獲取前三高的表情
  const getTopReactions = () => {
    const sorted = Object.entries(reactionCounts)
      .filter(([_, count]) => count > 0)
      .sort((a, b) => {
        if (b[1] !== a[1]) return b[1] - a[1];
        return parseInt(a[0]) - parseInt(b[0]); // 相同數量時優先顯示靠左
      })
      .slice(0, 3)
      .map(([type]) => parseInt(type) as ReactionType);
    return sorted;
  };

  const totalReactions = Object.values(reactionCounts).reduce(
    (a, b) => a + b,
    0,
  );
  const topReactions = getTopReactions();

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

  const reactionLabels: Record<ReactionType, string> = {
    1: "讚",
    3: "哈",
    4: "賺",
    5: "哇",
    6: "嗚嗚",
    7: "真的嗎",
  };

  // 模擬當前用戶資訊 (實際應從 auth context 取得)
  const currentUserMemberId = user?.id || "user123";
  const currentUserRole: "author" | "admin" | "member" =
    "member"; // 可改為 "author" 或 "admin" 測試不同權限

  // 判斷是否為自己的貼文
  const isOwnPost =
    currentUserMemberId === post.author.memberId;

  // 判斷是否為作者(社長)
  const isAuthor = currentUserRole === "author";

  // 判斷發文者是否為作者
  const postAuthorIsAuthor =
    post.author.memberId === "enru" ||
    post.author.memberId === "vip";

  // 判斷是否為幹部
  const isAdmin = currentUserRole === "admin";

  // 計算顯示哪些選項
  const showDelete =
    isOwnPost ||
    (isAuthor && !isOwnPost) ||
    (isAdmin && !isOwnPost && !postAuthorIsAuthor);
  const showReport = !isOwnPost;
  const showBlock = !isOwnPost && !postAuthorIsAuthor;
  const showEdit = isOwnPost;
  const showHistory = editedPost.hasEditHistory || false;

  const handleMoreClick = () => {
    setShowMoreMenu(true);
  };

  const handleBlockClick = () => {
    setShowMoreMenu(false);
    setShowBlockConfirm(true);
  };

  const handleBlockConfirm = () => {
    onBlock(post.author.memberId, post.author.name);
    setShowBlockConfirm(false);
  };

  const handleDelete = () => {
    setShowMoreMenu(false);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(
      post.id,
      post.author.memberId === "enru" ? "enru" : "vip",
    );
    setShowDeleteConfirm(false);
  };

  const handleReportClick = () => {
    setShowMoreMenu(false);
    setShowReportModal(true);
  };

  const handleReportConfirm = (reason: string) => {
    toast.success("已檢舉此貼文");
  };

  const handleEdit = () => {
    setShowMoreMenu(false);
    setShowEditModal(true);
  };

  const handleSaveEdit = (title: string, content: string, images?: string[]) => {
    setEditedPost({
      ...editedPost,
      title,
      content,
      images: images || editedPost.images,
      hasEditHistory: true,
    });
  };

  const handleViewHistory = () => {
    setShowMoreMenu(false);
    setShowEditHistory(true);
  };

  // 模擬編輯紀錄數據
  const mockEditHistory = [
    {
      version: 2,
      timestamp: "2026/02/12 15:30",
      content: editedPost.content,
      stockTags: editedPost.stockTags.map((tag) => ({
        ...tag,
        trend: "up" as const,
      })),
      imageUrl: editedPost.imageUrl,
    },
    {
      version: 1,
      timestamp: "2026/02/12 10:15",
      content:
        "這是第一次編輯的內容。原本的分析比較簡單，後來補充了更詳細的市場觀察和技術分析。",
      stockTags: editedPost.stockTags
        .slice(0, 2)
        .map((tag) => ({ ...tag, trend: "up" as const })),
    },
    {
      version: 0,
      timestamp: "2026/02/11 18:45",
      content: "這是最原始的貼文內容，當時只是簡單分享想法。",
      stockTags: [editedPost.stockTags[0]].map((tag) => ({
        ...tag,
        trend: "up" as const,
      })),
      isOriginal: true,
    },
  ];

  // 表情反應處理函數
  const handleReactionClick = () => {
    if (userReaction === 1) {
      // 取消按讚
      setUserReaction(null);
      setReactionCounts((prev) => ({
        ...prev,
        1: Math.max(0, prev[1] - 1),
      }));
    } else {
      // 按讚
      if (userReaction) {
        setReactionCounts((prev) => ({
          ...prev,
          [userReaction]: Math.max(0, prev[userReaction] - 1),
        }));
      }
      setUserReaction(1);
      setReactionCounts((prev) => ({
        ...prev,
        1: prev[1] + 1,
      }));
    }
  };

  const handleReactionLongPressStart = (
    e: React.TouchEvent | React.MouseEvent,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setReactionPickerPos({
      x: rect.left + rect.width / 2,
      y: rect.top,
    });

    const timer = setTimeout(() => {
      setReactionPickerMode("sliding");
      setShowReactionPicker(true);
    }, 500); // 500ms 長按

    setLongPressTimer(timer);
  };

  const handleReactionLongPressEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }

    // 如果表情選擇器已經打開，改為點擊模式
    if (
      showReactionPicker &&
      reactionPickerMode === "sliding"
    ) {
      setReactionPickerMode("clicking");
    }
  };

  const handleReactionSelect = (reaction: ReactionType) => {
    if (userReaction === reaction) {
      // 取消該表情
      setUserReaction(null);
      setReactionCounts((prev) => ({
        ...prev,
        [reaction]: Math.max(0, prev[reaction] - 1),
      }));
    } else {
      // 選擇新表情
      if (userReaction) {
        setReactionCounts((prev) => ({
          ...prev,
          [userReaction]: Math.max(0, prev[userReaction] - 1),
        }));
      }
      setUserReaction(reaction);
      setReactionCounts((prev) => ({
        ...prev,
        [reaction]: prev[reaction] + 1,
      }));
    }
    setShowReactionPicker(false);
  };

  return (
    <>
      <div className="bg-background border-b-8 border-muted/30 pb-4">
        {/* Post Header */}
        <div className="flex items-start justify-between px-4 pt-4 pb-3">
          <div className="flex items-center gap-3">
            <ImageWithFallback
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-bold text-sm">
                {post.author.name}
              </h3>
              <p className="text-xs text-muted-foreground">
                {post.time}
                {editedPost.hasEditHistory && (
                  <span> · 已編輯</span>
                )}
              </p>
            </div>
          </div>
          {!isEnruZone && (
            <button
              onClick={handleMoreClick}
              className="p-2 hover:bg-muted/50 rounded-full transition-colors"
            >
              <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Post Title */}
        {editedPost.title && (
          <div className="px-4 pb-3">
            <h2 className="text-base font-normal leading-relaxed">
              {editedPost.title}
            </h2>
          </div>
        )}

        {/* 編輯紀錄標籤 */}
        {editedPost.hasEditHistory && (
          null
        )}

        {/* Stock Tags */}
        {editedPost.stockTags.length > 0 && (
          <div className="px-4 pb-3 flex gap-2 flex-wrap">
            {editedPost.stockTags.map((tag) => {
              return (
                <button
                  key={tag.code}
                  className="px-3 py-1.5 bg-card rounded border border-border hover:border-primary/50 transition-colors flex items-center gap-1.5"
                >
                  <MiniStockChart trend={tag.trend} pattern={tag.pattern} />
                  <span className="text-xs">{tag.name}</span>
                </button>
              );
            })}</div>
        )}

        {/* Post Content */}
        <div className="px-4 pb-3">
          <p className="text-sm leading-relaxed text-foreground/90">
            {isExpanded || editedPost.content.length <= CONTENT_PREVIEW_LENGTH
              ? editedPost.content
              : `${editedPost.content.slice(0, CONTENT_PREVIEW_LENGTH)}...`}
            {editedPost.content.length > CONTENT_PREVIEW_LENGTH && (
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-primary ml-1 text-sm font-medium hover:underline"
              >
                {isExpanded ? "收合" : "繼續閱讀"}
              </button>
            )}
          </p>
        </div>

        {/* Images - Twitter style layout */}
        {editedPost.images && editedPost.images.length > 0 && (
          <div className="pb-3">
            {editedPost.images.length === 1 ? (
              // 單張圖片：全寬顯示
              <div className="px-4">
                <div 
                  className="w-full rounded-2xl overflow-hidden border border-border cursor-pointer"
                  onClick={() => navigate(`/post/${post.id}`)}
                >
                  <ImageWithFallback
                    src={editedPost.images[0]}
                    alt="Post image"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            ) : (
              // 多張圖片：橫向滑動，第一張完整顯示在左邊，初始有空隙，滑動後貼邊
              <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                <div className="flex gap-2">
                  {editedPost.images.map((image, index) => (
                    <div
                      key={index}
                      onClick={() => navigate(`/post/${post.id}`)}
                      className={`flex-shrink-0 rounded-2xl overflow-hidden border border-border snap-start cursor-pointer ${
                        index === 0 ? "ms-4" : ""
                      } ${
                        index === editedPost.images.length - 1
                          ? "me-4"
                          : ""
                      }`}
                      style={{
                        width:
                          index === 0
                            ? "calc(100% - 80px)"
                            : "calc(100% - 120px)",
                      }}
                    >
                      <ImageWithFallback
                        src={image}
                        alt={`Post image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* YouTube 影片 */}
        {editedPost.videoUrl && (
          <div 
            className="px-4 pb-3 cursor-pointer"
            onClick={() => navigate(`/post/${post.id}`)}
          >
            <div className="relative w-full rounded-2xl overflow-hidden border border-border bg-black" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={editedPost.videoUrl}
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube video"
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="px-4 pt-3">
          <div className="flex items-center gap-1">
            {/* 按讚區域：包含按讚按鈕和表情反應顯示 */}
            <div className="flex items-center gap-1.5">
              {/* 按讚/表情按鈕 */}
              <button
                onClick={handleReactionClick}
                onTouchStart={handleReactionLongPressStart}
                onTouchEnd={handleReactionLongPressEnd}
                onMouseDown={handleReactionLongPressStart}
                onMouseUp={handleReactionLongPressEnd}
                onMouseLeave={handleReactionLongPressEnd}
                className={`flex items-center  rounded-full transition-all group ${
                  userReaction
                    ? "text-[#4A90E2]"
                    : "text-muted-foreground hover:bg-[#4A90E2]/10"
                }`}
              >
                {userReaction ? (
                  <span className="w-5 h-5">
                    {getReactionComponent(userReaction)}
                  </span>
                ) : (
                  <ThumbsUp
                    className={`w-[18px] h-[18px] group-hover:text-[#4A90E2]`}
                  />
                )}
              </button>

              {/* 其他人的表情反應顯示區 - 更小的尺寸 */}
              {totalReactions > 0 && (
                <button
                  onClick={() => setShowReactionDetail(true)}
                  className="flex items-center gap-1 pe-2 py-1 hover:bg-muted/50 rounded-full transition-colors"
                >
                  <div className="flex -space-x-0.5">
                    {topReactions.map((type) => (
                      <span
                        key={type}
                        className="bg-background rounded-full border border-border w-4 h-4 flex items-center justify-center"
                      >
                        {getReactionComponent(type)}
                      </span>
                    ))}
                  </div>
                  <span className="text-[12px] text-muted-foreground">
                    {totalReactions}
                  </span>
                </button>
              )}
            </div>

            {/* 留言按鈕 */}
            <button
              onClick={() => navigate(`/post/${post.id}?scrollToComments=true`)}
              className="flex items-center gap-1.5 py-1.5 px-3 rounded-full hover:bg-blue-500/10 transition-all text-muted-foreground group"
            >
              <MessageCircle className="w-[18px] h-[18px] group-hover:text-blue-500" />
              <span className="text-xs group-hover:text-blue-500">
                {post.comments}
              </span>
            </button>

            {/* 分享按鈕 */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                
                const shareUrl = `${window.location.origin}/post/${post.id}`;
                const shareTitle = post.title || `${post.author.name}的貼文`;
                const shareText = post.content.substring(0, 100) + (post.content.length > 100 ? '...' : '');

                // 直接嘗試分享，不使用 async/await
                if (navigator.share) {
                  navigator.share({
                    title: shareTitle,
                    text: shareText,
                    url: shareUrl,
                  }).catch((error) => {
                    // 用戶取消分享不提示錯誤
                    if (error.name !== 'AbortError') {
                      console.error('分享失敗:', error);
                      // 降級：複製連結
                      navigator.clipboard.writeText(shareUrl).then(() => {
                        alert('連結已複製到剪貼簿 ✓');
                      }).catch(() => {
                        // 如果複製也失敗，手動提示用戶
                        prompt('請複製此連結:', shareUrl);
                      });
                    }
                  });
                } else {
                  // 不支援原生分享，直接複製連結
                  navigator.clipboard.writeText(shareUrl).then(() => {
                    alert('連結已複製���剪貼簿 ✓');
                  }).catch(() => {
                    prompt('請複製此連結:', shareUrl);
                  });
                }
              }}
              className="flex items-center gap-1.5 py-1.5 px-3 rounded-full hover:bg-green-500/10 transition-all text-muted-foreground group"
            >
              <Share2 className="w-[18px] h-[18px] group-hover:text-green-500" />
            </button>
          </div>
        </div>
      </div>

      {/* 表情選擇器 */}
      <ReactionPicker
        isOpen={showReactionPicker}
        onClose={() => setShowReactionPicker(false)}
        onSelect={handleReactionSelect}
        position={reactionPickerPos}
        mode={reactionPickerMode}
      />

      {/* 表情明細彈窗 */}
      <ReactionDetailModal
        isOpen={showReactionDetail}
        onClose={() => setShowReactionDetail(false)}
        reactions={mockReactions}
        reactionCounts={reactionCounts}
      />

      {/* 更多選項底部彈窗 */}
      {showMoreMenu && (
        <div
          className="fixed inset-0 z-[60] bg-black/70"
          onClick={() => setShowMoreMenu(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 bg-[#212121] rounded-t-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)",
            }}
          >
            {/* 拖動指示器 */}
            <div className="flex justify-center pt-3 pb-3">
              <div className="w-10 h-1 rounded-full bg-[#7a7a7a]" />
            </div>

            {/* 選項列表 */}
            <div className="px-4 pb-4">
              <button
                onClick={handleEdit}
                className="w-full h-14 px-4 flex items-center gap-4 hover:bg-white/5 transition-colors text-left border-b border-white/10"
              >
                <Edit className="w-6 h-6 text-white flex-shrink-0" />
                <span className="text-base text-white font-medium">
                  編輯貼文
                </span>
              </button>

              <button
                onClick={handleViewHistory}
                className="w-full h-14 px-4 flex items-center gap-4 hover:bg-white/5 transition-colors text-left border-b border-white/10"
              >
                <History className="w-6 h-6 text-white flex-shrink-0" />
                <span className="text-base text-white font-medium">
                  查看編輯紀錄
                </span>
              </button>

              <button
                onClick={handleDelete}
                className="w-full h-14 px-4 flex items-center gap-4 hover:bg-white/5 transition-colors text-left border-b border-white/10"
              >
                <Trash2 className="w-6 h-6 text-white flex-shrink-0" />
                <span className="text-base text-white font-medium">
                  刪除貼文
                </span>
              </button>

              <button
                onClick={handleReportClick}
                className="w-full h-14 px-4 flex items-center gap-4 hover:bg-white/5 transition-colors text-left border-b border-white/10"
              >
                <Flag className="w-6 h-6 text-white flex-shrink-0" />
                <span className="text-base text-white font-medium">
                  檢舉貼文
                </span>
              </button>

              <button
                onClick={handleBlockClick}
                className="w-full h-14 px-4 flex items-center gap-4 hover:bg-white/5 transition-colors text-left"
              >
                <Ban className="w-6 h-6 text-white flex-shrink-0" />
                <span className="text-base text-white font-medium">
                  封鎖此用戶
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 封鎖確認彈窗 */}
      {showBlockConfirm && (
        <BlockConfirmModal
          isOpen={showBlockConfirm}
          onClose={() => setShowBlockConfirm(false)}
          onConfirm={handleBlockConfirm}
          userName={post.author.name}
        />
      )}

      {/* 編輯貼文彈窗 */}
      {showEditModal && (
        <EditPostModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          post={editedPost}
          onSave={handleSaveEdit}
        />
      )}

      {/* 檢舉彈窗 */}
      {showReportModal && (
        <ReportModal
          isOpen={showReportModal}
          onClose={() => setShowReportModal(false)}
          onConfirm={handleReportConfirm}
        />
      )}

      {/* 編輯紀錄彈窗 */}
      {showEditHistory && (
        <EditHistoryModal
          isOpen={showEditHistory}
          onClose={() => setShowEditHistory(false)}
          postTitle={editedPost.title}
          history={mockEditHistory}
        />
      )}

      {/* 刪除確認彈窗 */}
      {showDeleteConfirm && (
        <DeleteConfirmModal
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </>
  );
}

function VIPLockedView({
  isLoggedIn,
  onLoginClick,
}: {
  isLoggedIn: boolean;
  onLoginClick: () => void;
}) {
  return (
    <div className="relative min-h-[calc(100vh-60px)]">
      {/* Blurred Background Content */}
      <div className="blur-md select-none pointer-events-none pb-20">
        {vipPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Lock Overlay */}
      <div className="fixed top-[60px] left-0 right-0 bottom-[60px] flex items-center justify-center bg-background/80 backdrop-blur-sm z-50 overflow-hidden">
        <div className="text-center px-6 py-12 bg-card/95 rounded-2xl border-2 border-primary/30 max-w-md mx-4 shadow-2xl">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#4A90E2] to-[#6BB6FF] rounded-full mb-6">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-3">
            VIP 社團專屬內容
          </h2>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            升級專業版即可解鎖 VIP
            社團的所有獨家內容，包含深度市場分析、即時交流討論，以及專家投資策略。
          </p>
          <button
            onClick={onLoginClick}
            className="w-full px-6 py-3 bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF] text-white font-bold rounded-lg hover:opacity-90 transition-all shadow-lg"
          >
            升級專業版
          </button>
        </div>
      </div>
    </div>
  );
}