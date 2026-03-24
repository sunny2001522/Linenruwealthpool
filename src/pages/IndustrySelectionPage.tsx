import { useNavigate, useSearchParams } from "react-router";
import {
  ChevronRight,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";

export function IndustrySelectionPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const marketType =
    (searchParams.get("marketType") as "bull" | "bear") ||
    "bull";
  const currentSelection = searchParams.get("selected") || null;

  // 當期前10名
  const currentIndustries = [
    { name: "傳產-生技", count: 161 },
    { name: "傳產-其他", count: 114 },
    { name: "傳產-營建", count: 89 },
    { name: "電子上游-IC-設計", count: 83 },
    { name: "傳產-電機", count: 74 },
    { name: "傳產-汽車零組件", count: 59 },
    { name: "電子上游-連接元件", count: 59 },
    { name: "軟體-系統整合", count: 56 },
    { name: "傳產-紡織纖維", count: 55 },
    { name: "傳產-鋼鐵", count: 54 },
  ];

  // 前期前10名
  const previousIndustries = [
    { name: "電子中游-PCB-材料設備", count: 142 },
    { name: "電子上游-PCB-材料設備", count: 128 },
    { name: "電子上游-IC封測", count: 95 },
    { name: "電子上游-配線驅動雜", count: 87 },
    { name: "電子上游-連接元件", count: 76 },
    { name: "電子上游-PCB-製造", count: 68 },
    { name: "電子上游-配線處理設計", count: 62 },
    { name: "電子上游-感測元件", count: 58 },
    { name: "電子上游-IC製造", count: 53 },
    { name: "電子中游-電源管理", count: 49 },
  ];

  const handleIndustrySelect = (industryName: string) => {
    const paramKey =
      marketType === "bull" ? "industry" : "loserIndustry";
    navigate(
      `/home/stock-picker?tab=pick&marketType=${marketType}&${paramKey}=${encodeURIComponent(industryName)}`,
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="sticky top-0 z-10  border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-medium text-white">
          {marketType === "bull" ? "領頭羊類股" : "落水狗類股"}
        </h1>
        <button
          onClick={() => {
            const paramKey = marketType === "bull" ? "industry" : "loserIndustry";
            navigate(`/home/stock-picker?tab=pick&marketType=${marketType}`);
          }}
          className="p-2 -mr-2 text-white/70 hover:text-white transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* 领头羊/落水狗 前10 */}
      <div className="pb-20">
        <section className="py-4">
          <div className="flex items-center justify-between mb-3 px-4">
            <h2 className="text-base font-bold text-white">
              {marketType === "bull" ? "領頭羊" : "落水狗"}
            </h2>
          </div>

          {/* 當期 */}
          <div className="mb-4">
            <div className="text-sm font-medium text-white/60 mb-2 px-4">當期</div>
            <div className="flex gap-3 overflow-x-auto pb-2 px-4 scrollbar-hide">
              {currentIndustries.map((industry, index) => {
                const isSelected =
                  currentSelection === industry.name;
                const parts = industry.name.split("-");
                const category = parts[0] || "";
                const subCategory =
                  parts.slice(1).join("-") || industry.name;

                return (
                  <div
                    key={`current-${index}-${industry.name}`}
                    onClick={() =>
                      handleIndustrySelect(industry.name)
                    }
                    className={`flex-shrink-0 w-24 rounded-lg p-3 border transition-all cursor-pointer shadow-sm ${
                      isSelected
                        ? "bg-[#4A90E2] border-[#4A90E2]"
                        : "bg-card border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col h-full items-center">
                      <div
                        className={`text-2xl font-bold mb-1.5 ${isSelected ? "text-white" : "text-primary"}`}
                      >
                        {index + 1}
                      </div>
                      <div
                        className={`text-xs mb-1 text-center leading-tight ${isSelected ? "text-white/80" : "text-foreground/70"}`}
                      >
                        {category}
                      </div>
                      <div
                        className={`text-sm font-medium mb-2 flex-1 text-center leading-tight ${isSelected ? "text-white" : "text-primary"}`}
                      >
                        {subCategory}
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 ${isSelected ? "text-white" : "text-primary"}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 前期 */}
          <div>
            <div className="text-sm font-medium text-white/60 mb-2 px-4">前期</div>
            <div className="flex gap-3 overflow-x-auto pb-2 px-4 scrollbar-hide">
              {previousIndustries.map((industry, index) => {
                const isSelected =
                  currentSelection === industry.name;
                const parts = industry.name.split("-");
                const category = parts[0] || "";
                const subCategory =
                  parts.slice(1).join("-") || industry.name;

                return (
                  <div
                    key={`previous-${index}-${industry.name}`}
                    onClick={() =>
                      handleIndustrySelect(industry.name)
                    }
                    className={`flex-shrink-0 w-24 rounded-lg p-3 border transition-all cursor-pointer shadow-sm ${
                      isSelected
                        ? "bg-[#4A90E2] border-[#4A90E2]"
                        : "bg-card border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col h-full items-center">
                      <div
                        className={`text-2xl font-bold mb-1.5 ${isSelected ? "text-white" : "text-primary"}`}
                      >
                        {index + 1}
                      </div>
                      <div
                        className={`text-xs mb-1 text-center leading-tight ${isSelected ? "text-white/80" : "text-foreground/70"}`}
                      >
                        {category}
                      </div>
                      <div
                        className={`text-sm font-medium mb-2 flex-1 text-center leading-tight ${isSelected ? "text-white" : "text-primary"}`}
                      >
                        {subCategory}
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 ${isSelected ? "text-white" : "text-primary"}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
