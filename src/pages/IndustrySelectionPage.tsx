import { useNavigate, useSearchParams } from "react-router";
import {
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

      {/* 左右兩欄：當期 / 前期 */}
      <div className="pb-20 px-4 py-4">
        <div className="flex gap-4">
          {/* 當期 */}
          <div className="flex-1">
            <div className="text-sm font-medium text-white/60 mb-3 text-center">當期</div>
            <div className="flex flex-col gap-2">
              {currentIndustries.map((industry, index) => {
                const isSelected = currentSelection === industry.name;
                const parts = industry.name.split("-");
                const category = parts[0] || "";
                const subCategory = parts.slice(1).join("-") || industry.name;
                return (
                  <button
                    key={`current-${index}-${industry.name}`}
                    onClick={() => handleIndustrySelect(industry.name)}
                    className={`w-full rounded-lg px-3 py-2 border text-left transition-all ${
                      isSelected
                        ? "bg-[#4A90E2] border-[#4A90E2] text-white"
                        : "bg-card border-border hover:border-primary/50 text-foreground"
                    }`}
                  >
                    <div className={`text-[10px] leading-tight ${isSelected ? "text-white/70" : "text-foreground/50"}`}>
                      {category}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`text-xs font-bold ${isSelected ? "text-white" : "text-primary"}`}>
                        {index + 1}.
                      </span>
                      <span className="text-xs font-medium">{subCategory}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 前期 */}
          <div className="flex-1">
            <div className="text-sm font-medium text-white/60 mb-3 text-center">前期</div>
            <div className="flex flex-col gap-2">
              {previousIndustries.map((industry, index) => {
                const isSelected = currentSelection === industry.name;
                const parts = industry.name.split("-");
                const category = parts[0] || "";
                const subCategory = parts.slice(1).join("-") || industry.name;
                return (
                  <button
                    key={`previous-${index}-${industry.name}`}
                    onClick={() => handleIndustrySelect(industry.name)}
                    className={`w-full rounded-lg px-3 py-2 border text-left transition-all ${
                      isSelected
                        ? "bg-[#4A90E2] border-[#4A90E2] text-white"
                        : "bg-card border-border hover:border-primary/50 text-foreground"
                    }`}
                  >
                    <div className={`text-[10px] leading-tight ${isSelected ? "text-white/70" : "text-foreground/50"}`}>
                      {category}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`text-xs font-bold ${isSelected ? "text-white" : "text-primary"}`}>
                        {index + 1}.
                      </span>
                      <span className="text-xs font-medium">{subCategory}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
