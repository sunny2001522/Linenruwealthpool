import { useState, useRef, TouchEvent } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../lib/authContext";
import { ChevronRight, Star, Flame, Sparkles, TrendingUp, TrendingDown, ArrowLeft } from "lucide-react";

const guideSteps = [
  {
    title: "個股星級評價",
    subtitle: "找股票不用再看一大堆數字，看星星數就知道",
    description: "運用大數據演算，並融合強勢股 4 大法寶：「均線、量能、型態、突破」將每檔個股做星級評價。星星數越多，這檔個股越接近『強勢股型態』",
    component: "star-rating",
    gradient: "from-[#4A90E2] to-[#6BB6FF]"
  },
  {
    title: "強勢明星股",
    subtitle: "當今強勢股不用猜，一眼就能看出",
    description: "在股市「大賺小賠」的秘訣在於「每次都選最強的標的」尤其是符合趨勢型態、帶量突破的股票，更要勇敢買進！如何判定哪一檔是強勢股？看火焰就知道！",
    component: "strong-stocks",
    gradient: "from-[#4A90E2] to-[#6BB6FF]"
  },
  {
    title: "獨創！個股強勢線",
    subtitle: "一秒判斷真假強勢股",
    description: "今天漲很兇的股票，是未來的強勢股嗎？不，大多數是今天漲明天跌...恩如利用大數據回測發現，通常股價站上「強勢線」後勢往往有一大段驚人的行情！",
    component: "trend-line",
    gradient: "from-[#4A90E2] to-[#6BB6FF]"
  },
  {
    title: "一鍵選出起漲股",
    subtitle: "4 個起漲關鍵指標，起漲股立即呈現",
    description: "哪些股票正要起漲？哪些正在轉強？要一眼辨別可不容易。恩如將4個起漲股關鍵指標寫進程式，只要輕鬆點擊「按鈕」，「起漲股」直接呈現在你眼前！",
    component: "filters",
    gradient: "from-[#4A90E2] to-[#6BB6FF]"
  },
  {
    title: "最新【強勢族群】排行榜",
    subtitle: "類股誰轉強、誰走弱，清清楚楚",
    description: "台股市場「類股輪動」越來越快，想要找到最強產業中的龍頭股，越來越難。每個月自動列出「當期強勢類股排行榜」，讓您走在市場最前端！",
    component: "industry-ranking",
    gradient: "from-[#4A90E2] to-[#6BB6FF]"
  }
];

export function GuidePage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const touchStartRef = useRef<number>(0);

  const handleNext = () => {
    if (currentStep < guideSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      login("user@cmoney.com.tw", "123456");
      navigate("/");
    }
  };

  const handleSkip = () => {
    login("user@cmoney.com.tw", "123456");
    navigate("/");
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const touchDelta = touchStartRef.current - touchEnd;

    if (touchDelta > 50) {
      handleNext();
    } else if (touchDelta < -50) {
      if (currentStep > 0) setCurrentStep(currentStep - 1);
    }
  };

  const currentGuide = guideSteps[currentStep];

  const renderComponentDemo = () => {
    switch (currentGuide.component) {
      case "star-rating":
        return (
          <div className="w-full bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
            {/* 股票信息标题 */}
            <div className="px-4 py-3 bg-gradient-to-r from-[#4A90E2]/20 to-[#6BB6FF]/20 border-b border-white/10 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-base font-bold">2330 台積電</div>
                  <div className="text-xs text-muted-foreground mt-0.5">半導體</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-destructive">685.00</div>
                  <div className="text-xs text-destructive font-medium">▲ 5.00 (+0.73%)</div>
                </div>
              </div>
            </div>
            
            {/* 总分 */}
            <div className="px-4 py-3 bg-muted/30 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-sm font-bold">總分</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-6 h-6 fill-[#D4AF37] text-[#D4AF37] drop-shadow-lg" />
                <Star className="w-6 h-6 fill-[#D4AF37] text-[#D4AF37] drop-shadow-lg" />
                <Star className="w-6 h-6 fill-[#D4AF37] text-[#D4AF37] drop-shadow-lg" />
                <Star className="w-6 h-6 fill-[#D4AF37] text-[#D4AF37] drop-shadow-lg" />
                <Star className="w-6 h-6 fill-[#D4AF37] text-[#D4AF37] drop-shadow-lg" />
                <span className="ml-2 text-lg font-bold bg-gradient-to-r from-[#E5C100] to-[#B8860B] bg-clip-text text-transparent">
                  5/6
                </span>
              </div>
            </div>
            
            {/* 三个评分项目 */}
            <div className="p-4 space-y-4">
              {[
                { name: "挑噴出/回檔", stars: 1 },
                { name: "選型態看趨勢", stars: 2 },
                { name: "看量找動能", stars: 2 }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="text-sm font-bold">{item.name}</div>
                  <div className="flex items-center gap-1.5">
                    {[...Array(2)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-7 h-7 rounded-full ${
                          i < item.stars
                            ? "bg-gradient-to-br from-[#E5C100] to-[#B8860B] shadow-lg shadow-[#D4AF37]/30"
                            : "bg-muted/30 border border-muted"
                        } flex items-center justify-center transition-all duration-300`}
                      >
                        <Star
                          className={`w-4 h-4 ${
                            i < item.stars ? "text-white fill-white" : "text-muted-foreground"
                          }`}
                        />
                      </div>
                    ))}
                    <span className="ml-2 text-sm font-bold bg-gradient-to-r from-[#E5C100] to-[#B8860B] bg-clip-text text-transparent">
                      {item.stars}/2
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "strong-stocks":
        return (
          <div className="w-full bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
            <div className="px-4 py-3 bg-gradient-to-r from-[#4A90E2]/20 to-[#6BB6FF]/20 border-b border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 justify-center">
                <Flame className="w-4 h-4 text-[#FE6D73]" />
                <span className="text-sm font-bold">強勢明星股</span>
              </div>
            </div>
            <div className="grid grid-cols-3 bg-muted/30 border-b border-white/10">
              <div className="px-3 py-3 text-xs font-bold text-center border-r border-white/10">代號</div>
              <div className="px-3 py-3 text-xs font-bold text-center border-r border-white/10">名稱</div>
              <div className="px-3 py-3 text-xs font-bold text-center">評分</div>
            </div>
            {[
              { code: "8163", name: "達方", hasFlame: false },
              { code: "8150", name: "南茂", hasFlame: false },
              { code: "8110", name: "華東", hasFlame: false },
              { code: "8101", name: "華冠", hasFlame: true },
              { code: "6269", name: "台郡", hasFlame: false },
              { code: "0251", name: "定穎", hasFlame: true }
            ].map((stock, index) => (
              <div key={index} className={`grid grid-cols-3 border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-colors ${stock.hasFlame ? 'bg-[#FE6D73]/5' : ''}`}>
                <div className="px-3 py-3 text-sm font-bold text-center border-r border-white/10 flex items-center justify-center gap-1.5">
                  {stock.hasFlame && <Flame className="w-4 h-4 fill-[#FE6D73] text-[#FE6D73] animate-pulse" />}
                  {stock.code}
                </div>
                <div className="px-3 py-3 text-sm font-medium text-center border-r border-white/10">{stock.name}</div>
                <div className="flex items-center justify-center py-3">
                  <div className="flex gap-1">
                    <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                    <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "trend-line":
        return (
          <div className="w-full bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl p-5">
            <div className="relative h-56 bg-gradient-to-br from-black/40 to-black/20 rounded-2xl overflow-hidden border border-white/10">
              <svg className="w-full h-full" viewBox="0 0 300 150" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#E5C100" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="37.5" x2="300" y2="37.5" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
                <line x1="0" y1="75" x2="300" y2="75" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
                <line x1="0" y1="112.5" x2="300" y2="112.5" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
                
                <path
                  d="M 0,120 L 50,115 L 100,105 L 150,95 L 200,90 L 250,85 L 300,80"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="3"
                  strokeDasharray="none"
                  filter="drop-shadow(0 0 8px #D4AF37)"
                />
                
                {[
                  { x: 30, high: 125, low: 135, open: 130, close: 127 },
                  { x: 60, high: 115, low: 125, open: 123, close: 118 },
                  { x: 90, high: 105, low: 115, open: 113, close: 107 },
                  { x: 120, high: 95, low: 105, open: 103, close: 97 },
                  { x: 150, high: 80, low: 95, open: 92, close: 82 },
                  { x: 180, high: 70, low: 82, open: 80, close: 72 },
                  { x: 210, high: 65, low: 75, open: 73, close: 67 },
                  { x: 240, high: 60, low: 70, open: 68, close: 62 },
                  { x: 270, high: 55, low: 65, open: 63, close: 57 }
                ].map((candle, i) => (
                  <g key={i}>
                    <line x1={candle.x} y1={candle.high} x2={candle.x} y2={candle.low} stroke="#FE6D73" strokeWidth="1.5" />
                    <rect x={candle.x - 3} y={Math.min(candle.open, candle.close)} width="6" height={Math.abs(candle.close - candle.open)} fill="#FE6D73" />
                  </g>
                ))}
              </svg>
              <div className="absolute top-3 left-3 px-3 py-1.5 bg-gradient-to-r from-[#D4AF37]/90 to-[#E5C100]/90 backdrop-blur-sm rounded-full text-xs font-bold text-white shadow-lg">
                強勢線
              </div>
            </div>
            <div className="mt-4 h-14 bg-gradient-to-br from-black/20 to-black/10 rounded-xl flex items-end justify-around px-2 gap-1 border border-white/10">
              {[20, 35, 30, 45, 60, 55, 70, 65, 75, 80, 70, 65, 60].map((height, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-[#4A90E2]/60 to-[#4A90E2]/30 rounded-t-sm" style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>
        );

      case "filters":
        return (
          <div className="w-full space-y-4">
            <div className="bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
              <div className="px-4 py-3 bg-gradient-to-r from-[#4A90E2]/20 to-[#6BB6FF]/20 border-b border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-2 justify-center">
                  <Star className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-sm font-bold">恩如特別篩選</span>
                </div>
              </div>
              <div className="p-6 flex items-center justify-center gap-4">
                <button className="px-6 py-3 bg-gradient-to-br from-muted/60 to-muted/40 hover:from-muted/80 hover:to-muted/60 border border-white/20 rounded-xl text-sm font-bold transition-all shadow-lg hover:shadow-xl">
                  211 強勢股
                </button>
                <div className="relative">
                  <button className="px-6 py-3 bg-gradient-to-br from-[#4A90E2] to-[#6BB6FF] hover:from-[#4A90E2]/90 hover:to-[#6BB6FF]/90 border-2 border-[#D4AF37] rounded-xl text-sm font-bold transition-all shadow-xl hover:shadow-2xl relative z-10">
                    210 起漲股
                  </button>
                  <div className="absolute -inset-2 bg-[#D4AF37]/20 rounded-2xl blur-xl animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        );

      case "industry-ranking":
        return (
          <div className="w-full space-y-4">
            {/* 領頭羊類股 */}
            <div className="bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
              <div className="px-4 py-3 bg-gradient-to-r from-[#4A90E2]/20 to-[#6BB6FF]/20 border-b border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-2 justify-center">
                  <TrendingUp className="w-4 h-4 text-[#4A90E2]" />
                  <span className="text-sm font-bold">領頭羊類股</span>
                </div>
              </div>
              
              {/* 領頭羊卡片 - 橫向滑動 */}
              <div className="flex gap-3 overflow-x-auto p-4 scrollbar-hide">
                {[
                  { rank: 1, industry: "傳產-生技" },
                  { rank: 2, industry: "電子上游-IC設計" },
                  { rank: 3, industry: "電子上游-PCB製造" },
                  { rank: 4, industry: "電子上游-LED及光元件" },
                  { rank: 5, industry: "電子中游-其他" }
                ].map((stock) => {
                  const parts = stock.industry.split("-");
                  const category = parts[0] || "";
                  const subCategory = parts.slice(1).join("-") || "";
                  
                  return (
                    <div
                      key={`${stock.rank}-${stock.industry}`}
                      className="flex-shrink-0 w-24 bg-gradient-to-br from-[#4A90E2]/10 to-transparent rounded-lg p-3 border border-[#4A90E2]/30 hover:border-[#4A90E2]/50 transition-colors cursor-pointer shadow-sm"
                    >
                      <div className="flex flex-col h-full items-center">
                        {/* 排名 */}
                        <div className="text-2xl font-bold mb-1.5 text-[#4A90E2]">
                          {stock.rank}
                        </div>
                        
                        {/* 類別 */}
                        <div className="text-xs text-foreground/70 mb-1 text-center leading-tight">
                          {category}
                        </div>
                        
                        {/* 子類別 */}
                        <div className="text-sm font-medium text-[#4A90E2] mb-2 flex-1 text-center leading-tight">
                          {subCategory}
                        </div>
                        
                        {/* 箭頭 */}
                        <ChevronRight className="w-4 h-4 text-[#4A90E2]" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 落水狗類股 */}
            <div className="bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
              <div className="px-4 py-3 bg-gradient-to-r from-[#10B981]/20 to-[#34D399]/20 border-b border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-2 justify-center">
                  <TrendingDown className="w-4 h-4 text-[#10B981]" />
                  <span className="text-sm font-bold">落水狗類股</span>
                </div>
              </div>
              
              {/* 落水狗卡片 - 橫向滑動 */}
              <div className="flex gap-3 overflow-x-auto p-4 scrollbar-hide">
                {[
                  { rank: 1, industry: "傳產-塑膠工業" },
                  { rank: 2, industry: "傳產-紡織纖維" },
                  { rank: 3, industry: "金融-證券" },
                  { rank: 4, industry: "傳產-航運" },
                  { rank: 5, industry: "傳產-鋼鐵工業" }
                ].map((stock) => {
                  const parts = stock.industry.split("-");
                  const category = parts[0] || "";
                  const subCategory = parts.slice(1).join("-") || "";
                  
                  return (
                    <div
                      key={`${stock.rank}-${stock.industry}`}
                      className="flex-shrink-0 w-24 bg-gradient-to-br from-[#10B981]/10 to-transparent rounded-lg p-3 border border-[#10B981]/30 hover:border-[#10B981]/50 transition-colors cursor-pointer shadow-sm"
                    >
                      <div className="flex flex-col h-full items-center">
                        {/* 排名 */}
                        <div className="text-2xl font-bold mb-1.5 text-[#10B981]">
                          {stock.rank}
                        </div>
                        
                        {/* 類別 */}
                        <div className="text-xs text-foreground/70 mb-1 text-center leading-tight">
                          {category}
                        </div>
                        
                        {/* 子類別 */}
                        <div className="text-sm font-medium text-[#10B981] mb-2 flex-1 text-center leading-tight">
                          {subCategory}
                        </div>
                        
                        {/* 箭頭 */}
                        <ChevronRight className="w-4 h-4 text-[#10B981]" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className="h-screen bg-gradient-to-br from-[#0a0e14] via-[#0f1419] to-[#0a0e14] flex flex-col overflow-hidden relative"
      onTouchStart={handleTouchStart} 
      onTouchEnd={handleTouchEnd}
    >
      {/* 动态渐层背景 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-0 w-full h-2/3 bg-gradient-to-br ${currentGuide.gradient} opacity-15 transition-all duration-1000 blur-3xl`} />
        <div className={`absolute bottom-0 right-0 w-full h-2/3 bg-gradient-to-tl ${currentGuide.gradient} opacity-10 transition-all duration-1000 blur-3xl`} />
        <div className={`absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-br ${currentGuide.gradient} opacity-20 rounded-full blur-3xl animate-pulse`} />
        <div className={`absolute bottom-1/3 left-0 w-96 h-96 bg-gradient-to-tr ${currentGuide.gradient} opacity-15 rounded-full blur-3xl`} />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-5 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/home/more")}
            className="p-2 -ml-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-1 bg-gradient-to-r ${currentGuide.gradient} rounded-full shadow-lg`} />
            <span className="text-xs font-bold text-white/90">
              {currentStep + 1} / {guideSteps.length}
            </span>
          </div>
        </div>
        
        <button
          onClick={handleSkip}
          className="px-4 py-2 text-sm text-white/80 hover:text-white transition-all font-bold backdrop-blur-xl bg-white/10 rounded-full border border-white/20 hover:bg-white/20 hover:border-white/30 shadow-lg"
        >
          略過
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center px-5 pb-6 min-h-0 overflow-y-auto">
        {/* Title */}
        <div className="text-center mb-6 shrink-0 space-y-3">
          <div className={`inline-block px-5 py-2 bg-gradient-to-r ${currentGuide.gradient} rounded-full shadow-xl`}>
            <h1 className="text-white text-xl font-black tracking-wide">{currentGuide.title}</h1>
          </div>
          <h2 className="text-base font-bold text-white/95 px-4">{currentGuide.subtitle}</h2>
          <p className="text-white/70 leading-relaxed px-6 max-w-md mx-auto text-left text-[12px] whitespace-pre-line">
            {currentGuide.description}
          </p>
        </div>

        {/* Component Demo */}
        <div className="w-full max-w-md mb-8 shrink-0">
          <div className="relative">
            <div className={`absolute -inset-4 bg-gradient-to-br ${currentGuide.gradient} opacity-20 rounded-3xl blur-2xl`} />
            <div className="relative transform hover:scale-[1.02] transition-transform duration-300">
              {renderComponentDemo()}
            </div>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex gap-2.5 mb-6 shrink-0">
          {guideSteps.map((step, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentStep
                  ? `w-10 h-2.5 bg-gradient-to-r ${step.gradient} shadow-xl`
                  : "w-2.5 h-2.5 bg-white/30 hover:bg-white/50 hover:scale-125"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Next Button - Fixed at bottom */}
      <div className="relative z-10 p-5 shrink-0">
        <button
          onClick={handleNext}
          className={`group w-full max-w-md mx-auto py-4 px-6 bg-gradient-to-r ${currentGuide.gradient} hover:opacity-90 text-white font-bold rounded-2xl transition-all shadow-2xl hover:shadow-3xl flex items-center justify-center gap-3 relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative z-10 text-lg">
            {currentStep === guideSteps.length - 1 ? "開始使用" : "下一步"}
          </span>
          <ChevronRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}