import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import {
  ChevronDown,
  ChevronUp,
  X,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

type PeriodType = "current" | "previous";

interface Industry {
  name: string;
  count: number;
}

interface IndustryGroup {
  groupName: string;
  industries: Industry[];
  isExpanded: boolean;
}

export function IndustrySelectionPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const marketType =
    (searchParams.get("marketType") as "bull" | "bear") ||
    "bull";
  const currentSelection = searchParams.get("selected") || null;

  // 领头羊/落水狗当期和前期前10名（Mock数据）
  const topIndustries = {
    current: [
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
    ],
    previous: [
      { name: "傳產-觀光", count: 49 },
      { name: "電子上游-被動元件", count: 42 },
      { name: "傳產-化學工業", count: 42 },
      { name: "電子上游-PCB-製造", count: 41 },
      { name: "電子中游-儀器設備工程", count: 40 },
      { name: "傳產-航運", count: 36 },
      { name: "傳產-塑膠", count: 35 },
      { name: "傳產-食品", count: 34 },
      { name: "電子中游-網通", count: 31 },
      { name: "電子中游-通訊設備", count: 30 },
    ],
  };

  // Mock data - 根据参考图片组织的产业数据
  const initialGroups: IndustryGroup[] = [
    {
      groupName: "電子上游",
      isExpanded: true,
      industries: [
        { name: "IC-設計", count: 83 },
        { name: "連接元件", count: 59 },
        { name: "被動元件", count: 42 },
        { name: "PCB-製造", count: 41 },
        { name: "PCB-材料設備", count: 30 },
        { name: "IC-封測", count: 29 },
        { name: "LED照明及光元件", count: 29 },
        { name: "IC-通路", count: 26 },
        { name: "IC-半導體設備", count: 22 },
        { name: "IC-代工", count: 11 },
        { name: "IC-製造", count: 9 },
        { name: "IP/ASIC", count: 9 },
        { name: "記憶體銷售", count: 9 },
        { name: "IC-其他", count: 10 },
        { name: "晶圓材料", count: 6 },
        { name: "IC-導線架", count: 6 },
        { name: "半導體元件", count: 5 },
        { name: "記憶體IC設計", count: 5 },
        { name: "ABF", count: 3 },
        { name: "記憶體製造", count: 1 },
      ],
    },
    {
      groupName: "電子中游",
      isExpanded: false,
      industries: [
        { name: "儀器設備工程", count: 40 },
        { name: "網通", count: 31 },
        { name: "通訊設備", count: 30 },
        { name: "電源供應器", count: 22 },
        { name: "機殼", count: 20 },
        { name: "其他", count: 19 },
        { name: "LCD-零組件", count: 16 },
        { name: "光學鏡片", count: 14 },
        { name: "LCD-STN面板", count: 13 },
        { name: "NB與手機零組件", count: 13 },
        { name: "散熱零組件", count: 10 },
        { name: "主機板", count: 9 },
        { name: "LCD-TFT面板", count: 9 },
        { name: "EMS", count: 8 },
        { name: "變壓器與UPS", count: 7 },
        { name: "二次電池", count: 5 },
        { name: "磁碟陣列", count: 3 },
        { name: "聲學元件", count: 3 },
        { name: "PC介面卡", count: 3 },
        { name: "電子元件通路", count: 2 },
        { name: "金屬製品", count: 2 },
      ],
    },
    {
      groupName: "電子下游",
      isExpanded: false,
      industries: [
        { name: "工業電腦", count: 25 },
        { name: "消費電子", count: 20 },
        { name: "資訊通路", count: 19 },
        { name: "安全監控", count: 18 },
        { name: "太陽能", count: 18 },
        { name: "其他", count: 12 },
        { name: "電腦周邊", count: 12 },
        { name: "筆記型電腦", count: 10 },
        { name: "顯示器", count: 7 },
        { name: "掃描器", count: 7 },
        { name: "商業自動化", count: 7 },
        { name: "數位相機", count: 4 },
        { name: "電信服務", count: 3 },
        { name: "手機製造", count: 3 },
      ],
    },
    {
      groupName: "傳產",
      isExpanded: false,
      industries: [
        { name: "生技", count: 161 },
        { name: "其他", count: 114 },
        { name: "營建", count: 89 },
        { name: "電機", count: 74 },
        { name: "汽車零組件", count: 59 },
        { name: "紡織纖維", count: 55 },
        { name: "鋼鐵", count: 54 },
        { name: "觀光", count: 49 },
        { name: "化學工業", count: 42 },
        { name: "航運", count: 36 },
        { name: "塑膠", count: 35 },
        { name: "食品", count: 34 },
        { name: "百貨", count: 30 },
        { name: "綠能環保", count: 21 },
        { name: "電線電纜", count: 14 },
        { name: "橡膠", count: 12 },
        { name: "文創娛樂", count: 12 },
        { name: "汽車", count: 10 },
        { name: "運動休閒", count: 10 },
        { name: "水泥", count: 9 },
        { name: "紙業", count: 7 },
        { name: "自行車", count: 6 },
        { name: "高爾夫球", count: 5 },
        { name: "玻璃陶瓷", count: 5 },
        { name: "照明", count: 3 },
      ],
    },
    {
      groupName: "軟體",
      isExpanded: false,
      industries: [
        { name: "系統整合", count: 56 },
        { name: "其他", count: 22 },
        { name: "遊戲", count: 14 },
      ],
    },
    {
      groupName: "金融",
      isExpanded: false,
      industries: [
        { name: "金控", count: 13 },
        { name: "證券", count: 11 },
        { name: "銀行", count: 9 },
        { name: "保險", count: 7 },
      ],
    },
  ];

  const [groups, setGroups] =
    useState<IndustryGroup[]>(initialGroups);
  const [period, setPeriod] = useState<PeriodType>("current");

  const currentTopIndustries =
    period === "current"
      ? topIndustries.current
      : topIndustries.previous;

  const toggleGroup = (groupName: string) => {
    setGroups(
      groups.map((group) =>
        group.groupName === groupName
          ? { ...group, isExpanded: !group.isExpanded }
          : group,
      ),
    );
  };

  const handleIndustrySelect = (industryName: string) => {
    // 返回上一页并传递选中的产业
    const paramKey =
      marketType === "bull" ? "industry" : "loserIndustry";
    navigate(
      `/home/stock-picker?tab=pick&marketType=${marketType}&${paramKey}=${encodeURIComponent(industryName)}`,
    );
  };

  const handleSave = () => {
    // 保存并返回
    navigate(`/home/stock-picker?tab=pick&marketType=${marketType}`);
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
          產業篩選
        </h1>
        <div></div>
      </div>

      {/* Industry Groups */}
      <div className="pb-20">
        {/* 领头羊/落水狗 前10 */}
        <section className="py-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-3 px-4">
            <h2 className="text-base font-bold text-white">
              {marketType === "bull" ? "領頭羊" : "落水狗"}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setPeriod("current")}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all shadow-md ${
                  period === "current"
                    ? "bg-gradient-to-r from-[#E5C100] via-[#D4AF37] to-[#B8860B] text-black"
                    : "bg-card text-muted-foreground border border-border"
                }`}
              >
                當期
              </button>
              <button
                onClick={() => setPeriod("previous")}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all shadow-md ${
                  period === "previous"
                    ? "bg-gradient-to-r from-[#E5C100] via-[#D4AF37] to-[#B8860B] text-black"
                    : "bg-card text-muted-foreground border border-border"
                }`}
              >
                前期
              </button>
            </div>
          </div>

          {/* 横向滑动卡片 */}
          <div className="flex gap-3 overflow-x-auto pb-2 px-4 scrollbar-hide">
            {currentTopIndustries.map((industry, index) => {
              const isSelected =
                currentSelection === industry.name;
              // 拆分產業名稱，例如 "傳產-生技" -> ["傳產", "生技"]
              const parts = industry.name.split("-");
              const category = parts[0] || "";
              const subCategory =
                parts.slice(1).join("-") || industry.name;

              return (
                <div
                  key={`${index}-${industry.name}`}
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
                    {/* 排名 */}
                    <div
                      className={`text-2xl font-bold mb-1.5 ${isSelected ? "text-white" : "text-primary"}`}
                    >
                      {index + 1}
                    </div>

                    {/* 類別 */}
                    <div
                      className={`text-xs mb-1 text-center leading-tight ${isSelected ? "text-white/80" : "text-foreground/70"}`}
                    >
                      {category}
                    </div>

                    {/* 子類別 */}
                    <div
                      className={`text-sm font-medium mb-2 flex-1 text-center leading-tight ${isSelected ? "text-white" : "text-primary"}`}
                    >
                      {subCategory}
                    </div>

                    {/* 箭頭 */}
                    <ChevronRight
                      className={`w-4 h-4 ${isSelected ? "text-white" : "text-primary"}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 所有产业分组 */}
        {groups.map((group) => (
          <div key={group.groupName} className="mb-2">
            {/* Group Header */}
            <button
              onClick={() => toggleGroup(group.groupName)}
              className="w-full px-4 py-3 flex items-center justify-between border-b border-white/5"
            >
              <span className="text-sm font-medium text-white/90">
                {group.groupName}
              </span>
              {group.isExpanded ? (
                <ChevronUp className="w-4 h-4 text-white/50" />
              ) : (
                <ChevronDown className="w-4 h-4 text-white/50" />
              )}
            </button>

            {/* Group Items */}
            {group.isExpanded && (
              <div>
                <div className="grid grid-cols-3 gap-2 p-3">
                  {group.industries.map((industry) => {
                    const fullName = `${group.groupName}-${industry.name}`;
                    const isSelected =
                      currentSelection === fullName;

                    return (
                      <button
                        key={industry.name}
                        onClick={() =>
                          handleIndustrySelect(fullName)
                        }
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          isSelected
                            ? "bg-[#4A90E2] text-white shadow-md"
                            : "bg-card text-white/70  hover:text-white/90"
                        }`}
                      >
                        <div className="truncate">
                          {industry.name}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}