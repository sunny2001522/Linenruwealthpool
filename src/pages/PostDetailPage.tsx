import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router";
import { 
  ArrowLeft, 
  MoreHorizontal, 
  ThumbsUp, 
  MessageCircle, 
  Share2,
  Send,
  TrendingUp,
  Image as ImageIcon,
  Copy,
  Flag,
  Trash2,
  Reply,
  X,
  ChevronDown,
  Download
} from "lucide-react";
import enruImage from "figma:asset/095f4405cde9352f659086e40b9cb6883546f0c4.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { toast } from "sonner";

interface StockTag {
  code: string;
  name: string;
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
  };
  time: string;
  title: string;
  content: string;
  fullContent?: string;
  stockTags: StockTag[];
  stockData?: StockData[];
  images?: string[];
  videoUrl?: string;
  likes: number;
  comments: number;
  reactions: string[];
  hasEditHistory?: boolean;
}

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  time: string;
  content: string;
  likes: number;
  liked?: boolean;
  replyTo?: string; // 回覆對象的名字
  images?: string[]; // 留言圖片
  reactions?: { type: string; count: number }[]; // 表情符號反應
  myReaction?: string; // 我的反應
  repliesCount?: number; // 回覆數量
}

// 模擬貼文數據
const postsData: Record<string, Post> = {
  "enru-1": {
    id: "enru-1",
    author: {
      name: "林恩如-超簡單投資法",
      avatar: enruImage,
      subtitle: "專業投資顧問"
    },
    time: "6h",
    title: "為什麼你買股票總是在「領股息」，而不是「賺價差」？",
    content: "很多人買了股票套牢，就開始自己：「沒關係啦，這間公司很穩，我改領股息當存股。」別再騙自己了！這叫「被迫長期投資」。真正的投資應該是主動選擇，而不是被套牢後才說要領股息...",
    fullContent: `很多人買了股票套牢，就開始自己：「沒關係啦，這間公司很穩，我改領股息當存股。」別再騙自己了！這叫「被迫長期投資」。真正的投資應該是主動選擇，而不是被套牢後才說要領股息。

📌 什麼是真正的存股？

存股不是「買了不賣」，而是有計畫地挑選穩定配息的公司，並長期持有。重點是：你一開始就是為了領股息而買，而不是套牢後才改口說要存股。

🔴 被迫長期投資的三大特徵：

1️⃣ 買的時候想賺價差，結果被套牢
2️⃣ 套牢後才開始研究公司基本面
3️⃣ 自我安慰「反正可以領股息」

如果你符合以上三點，那就是被迫長期投資，不是真正的存股。

💡 恩如的建議：

投資前要先想清楚自己的目標：
• 如果是要賺價差 → 用技術分析，設好停損停利
• 如果是要領股息 → 挑選穩定配息的公司，長期持有

不要套牢後才改變策略，這樣只會讓你的投資越來越亂。記住：投資要有紀律，不要被市場牽著鼻子走！

以下是一些近期表現不錯的個股，大家可以參考：`,
    stockTags: [
      { code: "2303", name: "聯電" },
      { code: "2344", name: "華邦電" },
      { code: "3064", name: "煒華" },
      { code: "3037", name: "欣興" },
      { code: "3322", name: "一詮" }
    ],
    stockData: [
      { code: "2344", name: "華邦電", price: 115.5, change: 2.21, changePercent: 2.21, volume: 102601, amount: 278448 },
      { code: "2367", name: "煒華", price: 50.1, change: 3.3, changePercent: 3.3, volume: 185974, amount: 267602 },
      { code: "1301", name: "台塑", price: 51.0, change: 4.51, changePercent: 4.51, volume: 75920, amount: 190664 },
      { code: "1326", name: "台化", price: 40.55, change: 4.11, changePercent: 4.11, volume: 43711, amount: 116193 },
      { code: "3037", name: "欣興", price: 354.0, change: 6.31, changePercent: 6.31, volume: 59824, amount: 67702 },
      { code: "2486", name: "一詮", price: 127.5, change: 2.01, changePercent: 2.01, volume: 26171, amount: 11204 }
    ],
    images: [
      "https://images.unsplash.com/photo-1766218329569-53c9270bb305?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMG1hcmtldCUyMHRyYWRpbmclMjBjaGFydHxlbnwxfHx8fDE3NzA4NjA1ODV8MA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    likes: 59,
    comments: 2,
    reactions: ["👍", "😮"]
  },
  "enru-2": {
    id: "enru-2",
    author: {
      name: "林恩如-超簡單投資法",
      avatar: enruImage,
      subtitle: "專業投資顧問"
    },
    time: "12h",
    title: "恩如三部曲教學：如何用溫度條挑出噴出回檔股",
    content: "今天來跟大家分享恩如三部曲的第一步：挑噴出/回檔。很多學員問我，溫度條要怎麼看？其實很簡單，溫度條越高，代表股價離均線越遠，回檔機率越大。但反過來說，溫度條從高降下來，就是進場時機...",
    stockTags: [
      { code: "2330", name: "台積電" },
      { code: "2454", name: "聯發科" },
      { code: "3711", name: "日月光投控" }
    ],
    images: [
      "https://images.unsplash.com/photo-1763038311036-6d18805537e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBidXNpbmVzcyUyMGRhdGF8ZW58MXx8fHwxNzcwODYwNTg1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1734856080638-71e78b3d8d5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlc3RtZW50JTIwYW5hbHlzaXMlMjBncmFwaHxlbnwxfHx8fDE3NzA4NjA1ODV8MA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    likes: 125,
    comments: 18,
    reactions: ["👍", "🔥", "💯"],
    hasEditHistory: true
  },
  "enru-3": {
    id: "enru-3",
    author: {
      name: "林恩如-超簡單投資法",
      avatar: enruImage,
      subtitle: "專業投資顧問"
    },
    time: "1d",
    title: "本週教學重點：型態判斷與趨勢確認",
    content: "這週的課程重點在於如何判斷股票的型態。很多人以為股票漲就是好，跌就是壞，但其實型態比漲跌更重要。一支股票如果是在整理型態，即使漲幅不大，也可能是好的進場點...",
    stockTags: [
      { code: "2308", name: "台達電" },
      { code: "2382", name: "廣達" },
      { code: "2317", name: "鴻海" }
    ],
    likes: 89,
    comments: 12,
    reactions: ["👍", "❤️"]
  },
  "enru-4": {
    id: "enru-4",
    author: {
      name: "林恩如-超簡單投資法",
      avatar: enruImage,
      subtitle: "專業投資顧問"
    },
    time: "2d",
    title: "",
    content: "https://youtu.be/dQw4w9WgXcQ\n\n今天的教學影片來了！這次詳細講解恩如三部曲的實戰應用，包含如何用溫度條、型態和量能來選股。影片中有完整的案例分析，建議大家認真看完，對選股會很有幫助！",
    stockTags: [],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    likes: 523,
    comments: 127,
    reactions: ["🔥", "💯", "👍"]
  },
  "enru-5": {
    id: "enru-5",
    author: {
      name: "林恩如-超簡單投資法",
      avatar: enruImage,
      subtitle: "專業投資顧問"
    },
    time: "3d",
    title: "",
    content: "今天要跟大家分享一個重要觀念：不要追高！很多學員看到股票漲就想買，結果買在高點。記住，恩如三部曲的第一步就是要等回檔。像台積電和聯發科這種大型權值股，一定要等溫度條降下來再進場，不要FOMO（錯失恐懼症）。耐心等待，才能買在好價位！",
    stockTags: [
      { code: "2330", name: "台積電" },
      { code: "2454", name: "聯發科" }
    ],
    likes: 234,
    comments: 45,
    reactions: ["👍", "💪"]
  },
  "enru-6": {
    id: "enru-6",
    author: {
      name: "林恩如-超簡單投資法",
      avatar: enruImage,
      subtitle: "專業投資顧問"
    },
    time: "4d",
    title: "",
    content: "本週選股結果分享！這三支都是用恩如三部曲選出來的，型態和量能都很漂亮 📈",
    stockTags: [
      { code: "2308", name: "台達電" },
      { code: "3034", name: "聯詠" },
      { code: "2454", name: "聯發科" }
    ],
    images: [
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMGNoYXJ0JTIwYW5hbHlzaXN8ZW58MXx8fHwxNzM5MzcxMjAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBncmFwaHxlbnwxfHx8fDE3MzkzNzEyMDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHlzaXN8ZW58MXx8fHwxNzM5MzcxMjAwfDA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    likes: 167,
    comments: 28,
    reactions: ["🔥", "👍"]
  },
  "enru-7": {
    id: "enru-7",
    author: {
      name: "林恩如-超簡單投資法",
      avatar: enruImage,
      subtitle: "專業投資顧問"
    },
    time: "5d",
    title: "重要公告：下週課程調整通知",
    content: "各位學員好！因為下週二（2/18）有重要會議，所以當天的直播課程會提前到晚上7點開始。課程內容不變，一樣會教大家如何用恩如三部曲選股。另外，下週四會加開一場Q&A時間，讓大家問問題。請大家記得調整時間喔！",
    stockTags: [],
    likes: 312,
    comments: 67,
    reactions: ["👍", "❤️"],
    hasEditHistory: true
  },
  "vip-1": {
    id: "vip-1",
    author: {
      name: "VIP投資團隊",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
      subtitle: "資深分析師"
    },
    time: "2h",
    title: "【獨家】AI伺服器供應鏈深度解析：下一波主升段即將啟動",
    content: "根據我們的內部消息和供應鏈調查，AI伺服器的訂單能見度已經延伸到2026年Q2。這波不是炒作，是真實的訂單成長。重點標的包括：散熱模組、機殼、連接器等相關供應鏈...",
    stockTags: [
      { code: "2382", name: "廣達" },
      { code: "2317", name: "鴻海" },
      { code: "6669", name: "緯穎" },
      { code: "3450", name: "聯鈞" },
      { code: "2393", name: "億光" }
    ],
    images: [
      "https://images.unsplash.com/photo-1599709702874-a8ac2e25c538?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwZWxlY3Ryb25pY3MlMjBjaXJjdWl0fGVufDF8fHx8MTc3MDg2MDU4NXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzcwNzY1NDYwfDA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    likes: 256,
    comments: 47,
    reactions: ["🔥", "💎", "🚀"]
  },
  "vip-2": {
    id: "vip-2",
    author: {
      name: "金融股達人",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      subtitle: "VIP專屬分析師"
    },
    time: "5h",
    title: "【VIP限定】主力佈局曝光：這5檔電子股籌碼已經集中完畢",
    content: "經過三個月的底部整理，這幾檔電子股的籌碼結構已經非常乾淨。我們追蹤的大戶持股比例持續增加，散戶持股則在減少。這是典型的主力吃貨訊號。預計下週開始會有一波突破行情...",
    stockTags: [
      { code: "3034", name: "聯詠" },
      { code: "2454", name: "聯發科" },
      { code: "2449", name: "京元電子" },
      { code: "3443", name: "創意" },
      { code: "3661", name: "世芯-KY" }
    ],
    images: [
      "https://images.unsplash.com/photo-1758518731706-be5d5230e5a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBkaXNjdXNzaW9ufGVufDF8fHx8MTc3MDg1Nzk5Mnww&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    likes: 312,
    comments: 68,
    reactions: ["💎", "🚀", "💰"]
  },
  "vip-3": {
    id: "vip-3",
    author: {
      name: "短線狙擊手",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      subtitle: "當沖專家"
    },
    time: "8h",
    title: "明日盤前佈局策略：三檔強勢股進場點位分析",
    content: "今天盤後分析了整體技術面和籌碼面，明天有三檔股票值得關注。第一檔是航運股的陽明，技術面已經突破下降趨勢線；第二檔是塑化股的台塑，基本面轉佳且法人持續買超...",
    stockTags: [
      { code: "2609", name: "陽明" },
      { code: "1301", name: "台塑" },
      { code: "2603", name: "長榮" },
      { code: "1303", name: "南亞" }
    ],
    likes: 189,
    comments: 35,
    reactions: ["🔥", "👍", "💪"]
  },
  "vip-4": {
    id: "vip-4",
    author: {
      name: "價值投資者",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop",
      subtitle: "長線投資顧問"
    },
    time: "1d",
    title: "【深度研究】2026 生技醫療產業趨勢與投資機會",
    content: "經過我們團隊長達兩個月的研究，整理出生技醫療產業的三大投資主軸：新藥研發、醫材出口、健康照護。特別是新藥研發領域，有幾家公司的臨床進度超乎預期...",
    stockTags: [
      { code: "4123", name: "晟德" },
      { code: "6446", name: "藥華藥" },
      { code: "4103", name: "百略" },
      { code: "1789", name: "神隆" }
    ],
    images: [
      "https://images.unsplash.com/photo-1766218329569-53c9270bb305?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMG1hcmtldCUyMHRyYWRpbmclMjBjaGFydHxlbnwxfHx8fDE3NzA4NjA1ODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1734856080638-71e78b3d8d5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlc3RtZW50JTIwYW5hbHlzaXMlMjBncmFwaHxlbnwxfHx8fDE3NzA4NjA1ODV8MA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    likes: 234,
    comments: 52,
    reactions: ["💎", "📈", "🏆"]
  },
  "vip-5": {
    id: "vip-5",
    author: {
      name: "技術分析師",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
      subtitle: "專業分析師"
    },
    time: "3h",
    title: "",
    content: "位這樣的布局，台達電和廣達都是AI產業鏈的受惠者，最近觀察到法人持續佈局。從技術面來看，雙雙突破前高，量能也穩定放大。建議可以逢低佈局，目標價往上看10%。這週要特別注意美股動向和台幣匯率變化，會影響外資進出。",
    stockTags: [
      { code: "2308", name: "台達電" },
      { code: "2382", name: "廣達" }
    ],
    likes: 156,
    comments: 23,
    reactions: ["👍", "💪"]
  },
  "vip-6": {
    id: "vip-6",
    author: {
      name: "市場觀察員",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop",
      subtitle: "市場分析專家"
    },
    time: "5h",
    title: "台股盤中觀察：外資大買超，資金行情啟動？",
    content: "今天外資大買超150億，主要集中在權值股。從籌碼面觀察，這波資金行情可能才剛開始。建議持股不要輕易被洗出，特別是電子權值股。但也要注意，如果美股走弱，台股可能會有回檔壓力。操作上建議控制好部位，不要過度追高...",
    stockTags: [
      { code: "2330", name: "台積電" },
      { code: "2454", name: "聯發科" },
      { code: "2317", name: "鴻海" }
    ],
    likes: 278,
    comments: 45,
    reactions: ["🔥", "👍", "💎"],
    hasEditHistory: true
  },
  "vip-7": {
    id: "vip-7",
    author: {
      name: "影音教學頻道",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop",
      subtitle: "投資YouTuber"
    },
    time: "1d",
    title: "",
    content: "https://youtu.be/dQw4w9WgXcQ\n\n剛才的影片是大哥的講盤影片重播，詳細分析了近期盤勢和進場時機，片長約15分鐘。建議大家看完再決定操作策略！",
    stockTags: [],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    likes: 412,
    comments: 89,
    reactions: ["🔥", "💯", "👍"]
  },
  "vip-8": {
    id: "vip-8",
    author: {
      name: "圖表達人",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      subtitle: "技術分析專家"
    },
    time: "2d",
    title: "",
    content: "今日盤勢分析圖",
    stockTags: [
      { code: "2330", name: "台積電" }
    ],
    images: [
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMGNoYXJ0JTIwYW5hbHlzaXN8ZW58MXx8fHwxNzM5MzcxMjAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBncmFwaHxlbnwxfHx8fDE3MzkzNzEyMDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHlzaXN8ZW58MXx8fHwxNzM5MzcxMjAwfDA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    likes: 98,
    comments: 15,
    reactions: ["👍", "📊"]
  }
};

// 模擬留言數據
const commentsData: Record<string, Comment[]> = {
  "enru-1": [
    {
      id: "c1",
      author: {
        name: "投資小白",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
      },
      time: "3h",
      content: "恩如老師說得太對了！我就是套牢後才說要領股息的那種人😅 現在終於懂了，投資前一定要先想清楚目標！",
      likes: 12,
      reactions: [
        { type: "❤️", count: 5 },
        { type: "😄", count: 4 },
        { type: "😮", count: 3 }
      ],
      repliesCount: 2
    },
    {
      id: "c2",
      author: {
        name: "股市老手",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop"
      },
      time: "2h",
      content: "很實用的分享！我也是經歷過被套牢的痛苦，後來才學會設停損。投資真的要有紀律，不能感情用事。",
      likes: 8,
      replyTo: "投資小白",
      reactions: [
        { type: "👍", count: 5 },
        { type: "💪", count: 3 }
      ]
    }
  ],
  "enru-4": [
    {
      id: "c1",
      author: {
        name: "學習中",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
      },
      time: "1d",
      content: "影片內容太棒了！老師講解得很清楚，我已經開始用恩如三部曲選股了 🔥",
      likes: 71,
      reactions: [
        { type: "❤️", count: 30 },
        { type: "😄", count: 25 },
        { type: "😮", count: 16 }
      ],
      repliesCount: 5
    }
  ]
};

// 表情符號列表
const emojis = ["😀", "😂", "❤️", "👍", "🔥", "💯", "😮", "😢", "😡", "👏", "🙏", "💪", "🚀", "💎", "📈", "📉"];

// @提及建議列表
const mentionSuggestions = [
  { id: "1", name: "林恩如-超簡單投資法", avatar: enruImage },
  { id: "2", name: "投資小白", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" },
  { id: "3", name: "股市老手", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" }
];

export function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyingTo, setReplyingTo] = useState<{ id: string; name: string } | null>(null);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [showCommentMenu, setShowCommentMenu] = useState(false);
  const [commentImages, setCommentImages] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"hot" | "new">("hot");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMentionSuggestions, setShowMentionSuggestions] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState<string | null>(null); // 正在選擇表情的留言ID
  const [reactionPickerTimer, setReactionPickerTimer] = useState<NodeJS.Timeout | null>(null);
  const [imageViewer, setImageViewer] = useState<{ images: string[]; currentIndex: number } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageScrollRef = useRef<HTMLDivElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);

  const post = id ? postsData[id] : null;

  // 載入留言
  useEffect(() => {
    if (id && commentsData[id]) {
      setComments(commentsData[id]);
    }
  }, [id]);

  // 檢查是否需要滾動到留言區並聚焦輸入框
  useEffect(() => {
    const scrollToComments = searchParams.get('scrollToComments');
    if (scrollToComments === 'true' && commentsRef.current && inputRef.current) {
      // 延遲執行，確保頁面渲染完成
      setTimeout(() => {
        commentsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // 再延遲一下聚焦輸入框，確保滾動完成
        setTimeout(() => {
          inputRef.current?.focus();
        }, 500);
      }, 100);
    }
  }, [searchParams]);

  // 排序留言
  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === "hot") {
      return b.likes - a.likes;
    } else {
      // 新的在前面
      return parseInt(b.id.slice(1)) - parseInt(a.id.slice(1));
    }
  });

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">找不到貼文</h2>
          <button
            onClick={() => navigate("/discussion")}
            className="text-primary hover:underline"
          >
            返回社團
          </button>
        </div>
      </div>
    );
  }

  const handleSendComment = () => {
    if (commentText.trim() || commentImages.length > 0) {
      const newComment: Comment = {
        id: `c${Date.now()}`,
        author: {
          name: "我",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
        },
        time: "剛剛",
        content: commentText,
        likes: 0,
        replyTo: replyingTo?.name,
        images: commentImages.length > 0 ? commentImages : undefined
      };
      setComments([...comments, newComment]);
      setCommentText("");
      setCommentImages([]);
      setReplyingTo(null);
      toast.success("留言已發送");
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
            if (newImages.length === files.length) {
              setCommentImages([...commentImages, ...newImages].slice(0, 3)); // 最多3張
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setCommentImages(commentImages.filter((_, i) => i !== index));
  };

  const handleReply = (comment: Comment) => {
    setReplyingTo({ id: comment.id, name: comment.author.name });
    inputRef.current?.focus();
    setShowCommentMenu(false);
  };

  const handleCommentLike = (commentId: string) => {
    setComments(comments.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          liked: !c.liked,
          likes: c.liked ? c.likes - 1 : c.likes + 1
        };
      }
      return c;
    }));
  };

  const handleLongPress = (comment: Comment) => {
    setSelectedComment(comment);
    setShowCommentMenu(true);
  };

  const handleCopyComment = () => {
    if (selectedComment) {
      navigator.clipboard.writeText(selectedComment.content);
      toast.success("已複製留言");
      setShowCommentMenu(false);
    }
  };

  const handleDeleteComment = () => {
    if (selectedComment) {
      setComments(comments.filter(c => c.id !== selectedComment.id));
      toast.success("已刪除留言");
      setShowCommentMenu(false);
    }
  };

  const handleReportComment = () => {
    toast.success("已檢舉留言");
    setShowCommentMenu(false);
  };

  const handleEmojiSelect = (emoji: string) => {
    setCommentText(commentText + emoji);
    setShowEmojiPicker(false);
  };

  const handleMentionSelect = (name: string) => {
    setCommentText(commentText + `@${name} `);
    setShowMentionSuggestions(false);
  };

  // 處理留言表情反應
  const handleCommentReaction = (commentId: string, emoji: string) => {
    setComments(comments.map(c => {
      if (c.id === commentId) {
        const reactions = c.reactions || [];
        const existingReaction = reactions.find(r => r.type === emoji);
        
        // 如果已經按過這個表情，就取消
        if (c.myReaction === emoji) {
          return {
            ...c,
            myReaction: undefined,
            likes: c.likes - 1,
            reactions: existingReaction && existingReaction.count > 1
              ? reactions.map(r => r.type === emoji ? { ...r, count: r.count - 1 } : r)
              : reactions.filter(r => r.type !== emoji)
          };
        }
        
        // 如果之前按過其他表情，先取消
        let updatedReactions = reactions;
        let updatedLikes = c.likes;
        
        if (c.myReaction) {
          const oldReaction = reactions.find(r => r.type === c.myReaction);
          updatedReactions = oldReaction && oldReaction.count > 1
            ? reactions.map(r => r.type === c.myReaction ? { ...r, count: r.count - 1 } : r)
            : reactions.filter(r => r.type !== c.myReaction);
          updatedLikes -= 1;
        }
        
        // 添加新表情
        if (existingReaction) {
          updatedReactions = updatedReactions.map(r => 
            r.type === emoji ? { ...r, count: r.count + 1 } : r
          );
        } else {
          updatedReactions = [...updatedReactions, { type: emoji, count: 1 }];
        }
        
        return {
          ...c,
          myReaction: emoji,
          likes: updatedLikes + 1,
          reactions: updatedReactions
        };
      }
      return c;
    }));
    setShowReactionPicker(null);
  };

  // 長按讚按鈕顯示表情選擇器
  const handleLikePress = (commentId: string) => {
    const comment = comments.find(c => c.id === commentId);
    if (!comment?.myReaction) {
      // 如果沒有反應，直接按讚
      handleCommentReaction(commentId, "👍");
    } else {
      // 如果有反應，取消反應
      handleCommentReaction(commentId, comment.myReaction);
    }
  };

  const handleLikeLongPress = (commentId: string) => {
    setShowReactionPicker(commentId);
  };

  // 圖片查看器處理函數
  const handleImageClick = (images: string[], index: number) => {
    setImageViewer({ images, currentIndex: index });
    setCurrentImageIndex(index);
  };

  const handleImageDownload = async () => {
    if (!imageViewer) return;
    const imageUrl = imageViewer.images[imageViewer.currentIndex];
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `image-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("已下載圖片");
    } catch (error) {
      toast.error("圖片下載失敗");
    }
  };

  const handleImageShare = async () => {
    if (!imageViewer) return;
    const imageUrl = imageViewer.images[imageViewer.currentIndex];
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: '分享圖片',
          url: imageUrl
        });
      } catch (error) {
        // 用戶取消分享
      }
    } else {
      // 複製連結到剪貼簿
      navigator.clipboard.writeText(imageUrl);
      toast.success("圖片連結已複製");
    }
  };

  // 處理圖片滾動，更新當前索引
  const handleImageScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.offsetWidth;
    const newIndex = Math.round(scrollLeft / width);
    if (imageViewer && newIndex !== imageViewer.currentIndex) {
      setImageViewer({ ...imageViewer, currentIndex: newIndex });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-sm z-40 border-b border-border">
        <div className="px-4 h-14 flex items-center gap-3">
          <button
            onClick={() => navigate("/discussion")}
            className="p-2 -ml-2 hover:bg-muted/50 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-base">貼文詳情</h1>
        </div>
      </header>

      {/* Post Content */}
      <div className="bg-background pb-[120px]">
        {/* Post Header */}
        <div className="flex items-start justify-between px-4 pt-4 pb-3">
          <div className="flex items-center gap-3">
            <ImageWithFallback
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-bold text-sm">{post.author.name}</h3>
              <p className="text-xs text-muted-foreground">{post.time}</p>
            </div>
          </div>
          <button className="p-2 hover:bg-muted/50 rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Post Title */}
        {post.title && (
          <div className="px-4 pb-3">
            <h2 className="text-base font-normal leading-relaxed">{post.title}</h2>
          </div>
        )}

        {/* Stock Tags */}
        {post.stockTags && post.stockTags.length > 0 && (
          <div className="px-4 pb-3 flex gap-2 flex-wrap">
            {post.stockTags.map((tag) => (
              <button
                key={tag.code}
                className="px-3 py-1 bg-card rounded border border-border hover:border-primary/50 transition-colors flex items-center gap-1.5"
              >
                <TrendingUp className="w-3 h-3 text-red-500" />
                <span className="text-xs">{tag.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Full Post Content */}
        <div className="px-4 pb-3">
          <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line">
            {post.fullContent || post.content}
          </p>
        </div>

        {/* YouTube 影片 */}
        {post.videoUrl && (
          <div className="px-4 pb-3">
            <div className="relative w-full rounded-2xl overflow-hidden border border-border bg-black" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={post.videoUrl}
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube video"
              />
            </div>
          </div>
        )}

        {/* Post Images */}
        {post.images && post.images.length > 0 && (
          <div className="pb-3">
            <div className="flex gap-2 overflow-x-auto px-4 snap-x snap-mandatory scrollbar-hide" ref={imageScrollRef} onScroll={handleImageScroll}>
              {post.images.map((image, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 w-[85vw] snap-center"
                  onClick={() => handleImageClick(post.images || [], index)}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`post-image-${index}`}
                    className="w-full h-[280px] rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  />
                </div>
              ))}
            </div>
            {/* 滾動指示器 */}
            {post.images.length > 1 && (
              <div className="flex justify-center gap-1.5 mt-3">
                {post.images.map((_, index) => (
                  <div
                    key={index}
                    className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30"
                  />
                ))}
              </div>
            )}
          </div>
        )}

        

        {/* Action Buttons */}
        <div className="px-4 pt-3 pb-4 flex items-center gap-1 border-b-8 border-muted/30">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-1.5 py-1.5 px-3 rounded-full hover:bg-red-500/10 transition-all group ${
              liked ? "text-red-500" : "text-muted-foreground"
            }`}
          >
            <ThumbsUp className={`w-[18px] h-[18px] ${liked ? "fill-red-500" : ""} group-hover:text-red-500`} />
            <span className="text-xs">{post.likes}</span>
          </button>
          <button className="flex items-center gap-1.5 py-1.5 px-3 rounded-full hover:bg-blue-500/10 transition-all text-muted-foreground group">
            <MessageCircle className="w-[18px] h-[18px] group-hover:text-blue-500" />
            <span className="text-xs group-hover:text-blue-500">{comments.length}</span>
          </button>
          <button className="flex items-center gap-1.5 py-1.5 px-3 rounded-full hover:bg-green-500/10 transition-all text-muted-foreground group">
            <Share2 className="w-[18px] h-[18px] group-hover:text-green-500" />
          </button>
        </div>

        {/* Comments Section */}
        <div className="px-4 pt-4" ref={commentsRef}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base">留言 {comments.length}</h3>
            
            {/* Sort Menu */}
            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <span className="text-xs text-muted-foreground">
                  {sortBy === "hot" ? "最熱門" : "最新"}
                </span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>
              
              {showSortMenu && (
                <div className="absolute right-0 top-full mt-2 bg-background border border-border rounded-lg shadow-lg overflow-hidden z-10 min-w-[100px]">
                  <button
                    onClick={() => {
                      setSortBy("hot");
                      setShowSortMenu(false);
                    }}
                    className={`w-full px-4 py-2.5 text-sm text-left hover:bg-muted/50 transition-colors ${
                      sortBy === "hot" ? "text-primary font-medium" : ""
                    }`}
                  >
                    最熱門
                  </button>
                  <button
                    onClick={() => {
                      setSortBy("new");
                      setShowSortMenu(false);
                    }}
                    className={`w-full px-4 py-2.5 text-sm text-left hover:bg-muted/50 transition-colors ${
                      sortBy === "new" ? "text-primary font-medium" : ""
                    }`}
                  >
                    最新
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Comments List */}
          <div className="space-y-4 mb-4">
            {sortedComments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <ImageWithFallback
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div 
                    className="bg-muted/30 rounded-2xl px-4 py-3 cursor-pointer active:bg-muted/50 transition-colors"
                    onTouchStart={(e) => {
                      const timer = setTimeout(() => handleLongPress(comment), 500);
                      (e.currentTarget as any).longPressTimer = timer;
                    }}
                    onTouchEnd={(e) => {
                      const timer = (e.currentTarget as any).longPressTimer;
                      if (timer) clearTimeout(timer);
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm">{comment.author.name}</span>
                      <span className="text-xs text-muted-foreground">{comment.time}</span>
                    </div>
                    {comment.replyTo && (
                      <div className="text-xs text-primary mb-1">
                        回覆 @{comment.replyTo}
                      </div>
                    )}
                    <p className="text-sm leading-relaxed">{comment.content}</p>
                    {comment.images && comment.images.length > 0 && (
                      <div className="mt-2">
                        {comment.images.map((image, index) => (
                          <ImageWithFallback
                            key={index}
                            src={image}
                            alt={`comment-image-${index}`}
                            className="w-20 h-20 rounded-md object-cover mr-2"
                            onClick={() => handleImageClick(comment.images, index)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* 互動按鈕 - 讚 + 表情符號 + 回覆 */}
                  <div className="flex items-center gap-4 mt-2 ml-1">
                    {/* 讚 Icon */}
                    <button
                      onClick={() => handleLikePress(comment.id)}
                      onTouchStart={(e) => {
                        const timer = setTimeout(() => handleLikeLongPress(comment.id), 500);
                        (e.currentTarget as any).reactionTimer = timer;
                      }}
                      onTouchEnd={(e) => {
                        const timer = (e.currentTarget as any).reactionTimer;
                        if (timer) clearTimeout(timer);
                      }}
                      className={`transition-colors ${
                        comment.myReaction ? "text-primary" : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      <ThumbsUp className={`w-5 h-5 ${comment.myReaction ? "fill-primary" : ""}`} />
                    </button>
                    
                    {/* 表情符號反應顯示 */}
                    {comment.reactions && comment.reactions.length > 0 && (
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center">
                          {comment.reactions.slice(0, 3).map((reaction, index) => (
                            <span key={index} className="text-base">
                              {reaction.type}
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">{comment.likes}</span>
                      </div>
                    )}
                    
                    {/* 回覆 Icon + 數量 */}
                    <button 
                      onClick={() => handleReply(comment)}
                      className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      {comment.repliesCount && comment.repliesCount > 0 && (
                        <span className="text-sm">{comment.repliesCount}</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comment Input - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-30">
        {/* Reply indicator */}
        {replyingTo && (
          <div className="px-4 py-2 bg-muted/20 border-b border-border flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              回覆 <span className="text-primary font-medium">@{replyingTo.name}</span>
            </span>
            <button
              onClick={() => {
                setReplyingTo(null);
                setCommentText("");
              }}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              取消
            </button>
          </div>
        )}

        {/* Image Preview */}
        {commentImages.length > 0 && (
          <div className="px-4 py-2 border-b border-border bg-muted/10">
            <div className="flex gap-2">
              {commentImages.map((image, index) => (
                <div key={index} className="relative w-20 h-20">
                  <ImageWithFallback
                    src={image}
                    alt={`preview-${index}`}
                    className="w-full h-full rounded-md object-cover"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-1 -right-1 bg-black/70 rounded-full p-0.5 hover:bg-black transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="px-4 py-3">
          <div className="flex items-center gap-2">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
              alt="我"
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 flex items-center gap-2 bg-muted/30 rounded-full px-3 py-2">
              <input
                ref={inputRef}
                type="text"
                placeholder="說點什麼吧..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendComment();
                  }
                }}
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-1 hover:bg-muted/50 rounded-full transition-colors"
              >
                <ImageIcon className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <button
              onClick={handleSendComment}
              disabled={!commentText.trim() && commentImages.length === 0}
              className={`p-2.5 rounded-full transition-all ${ commentText.trim() || commentImages.length > 0 ? "bg-[#FF8A3C] hover:opacity-90" : "bg-muted/50" } bg-[#4a90e2]`}
            >
              <Send className={`w-5 h-5 ${commentText.trim() || commentImages.length > 0 ? "text-white" : "text-muted-foreground"}`} />
            </button>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageSelect}
          className="hidden"
        />
      </div>

      {/* Comment Menu Modal */}
      {showCommentMenu && selectedComment && (
        <div
          className="fixed inset-0 z-[60] bg-black/70"
          onClick={() => setShowCommentMenu(false)}
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
                onClick={() => {
                  handleReply(selectedComment);
                  setShowCommentMenu(false);
                }}
                className="w-full h-14 px-4 flex items-center gap-4 hover:bg-white/5 transition-colors text-left border-b border-white/10"
              >
                <Reply className="w-6 h-6 text-white flex-shrink-0" />
                <span className="text-base text-white font-medium">回覆</span>
              </button>

              <button
                onClick={handleCopyComment}
                className="w-full h-14 px-4 flex items-center gap-4 hover:bg-white/5 transition-colors text-left border-b border-white/10"
              >
                <Copy className="w-6 h-6 text-white flex-shrink-0" />
                <span className="text-base text-white font-medium">複製</span>
              </button>

              <button
                onClick={handleReportComment}
                className="w-full h-14 px-4 flex items-center gap-4 hover:bg-white/5 transition-colors text-left border-b border-white/10"
              >
                <Flag className="w-6 h-6 text-white flex-shrink-0" />
                <span className="text-base text-white font-medium">檢舉</span>
              </button>

              <button
                onClick={handleDeleteComment}
                className="w-full h-14 px-4 flex items-center gap-4 hover:bg-white/5 transition-colors text-left"
              >
                <Trash2 className="w-6 h-6 text-white flex-shrink-0" />
                <span className="text-base text-white font-medium">刪除</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reaction Picker Modal */}
      {showReactionPicker && (
        <div
          className="fixed inset-0 z-[60] bg-black/50"
          onClick={() => setShowReactionPicker(null)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 bg-background border-t border-border rounded-t-2xl pb-safe"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="flex justify-center mb-2">
                <div className="w-10 h-1 rounded-full bg-muted" />
              </div>
              <h3 className="text-sm font-medium mb-3 text-center">選擇表情符號</h3>
              <div className="grid grid-cols-8 gap-2">
                {emojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => handleCommentReaction(showReactionPicker, emoji)}
                    className="w-full aspect-square flex items-center justify-center text-2xl hover:bg-muted/50 rounded-lg transition-colors active:scale-95"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Viewer Modal */}
      {imageViewer && (
        <div
          className="fixed inset-0 z-[70] bg-black"
        >
          {/* 頂部關閉按鈕 */}
          <div className="absolute top-0 left-0 right-0 z-10 pt-safe">
            <div className="flex items-center justify-between px-4 py-3">
              <button
                onClick={() => setImageViewer(null)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* 圖片滾動容器 */}
          <div 
            className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            onScroll={handleImageScroll}
          >
            {imageViewer.images.map((image, index) => (
              <div
                key={index}
                className="w-full h-full flex-shrink-0 flex items-center justify-center snap-center px-4"
              >
                <ImageWithFallback
                  src={image}
                  alt={`image-${index}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>

          {/* 底部操作欄 */}
          <div className="absolute bottom-0 left-0 right-0 z-10 pb-safe">
            <div className="px-4 py-4">
              {/* 圖片指示器 */}
              {imageViewer.images.length > 1 && (
                <div className="flex justify-center mb-4">
                  <div className="px-3 py-1 bg-black/50 rounded-full">
                    <span className="text-sm text-white">
                      {imageViewer.currentIndex + 1} / {imageViewer.images.length}
                    </span>
                  </div>
                </div>
              )}
              
              {/* 操作按鈕 */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handleImageShare}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
                >
                  <Share2 className="w-5 h-5 text-white" />
                  <span className="text-sm text-white font-medium">分享</span>
                </button>
                <button
                  onClick={handleImageDownload}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
                >
                  <Download className="w-5 h-5 text-white" />
                  <span className="text-sm text-white font-medium">下載</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}