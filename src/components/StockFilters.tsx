import { TrendingUp, TrendingDown, ChevronDown } from "lucide-react";

export type MarketType = "bull" | "bear";
export type FilterType = "above-ma" | "strong-ma" | "below-ma" | "weak-ma";

interface StockFiltersProps {
  marketType: MarketType;
  filterType: FilterType;
  onMarketTypeChange: (type: MarketType) => void;
  onFilterTypeChange: (type: FilterType) => void;
}

export function StockFilters({
  marketType,
  filterType,
  onMarketTypeChange,
  onFilterTypeChange,
}: StockFiltersProps) {
  return (
    <div className="space-y-3">
      {/* Market Type Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => onMarketTypeChange("bull")}
          className={`flex-1 py-2.5 px-4 rounded-lg border transition-all flex items-center justify-center gap-2 ${
            marketType === "bull"
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-card text-muted-foreground border-border hover:border-primary/50"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span className="font-medium">多方</span>
        </button>
        <button
          onClick={() => onMarketTypeChange("bear")}
          className={`flex-1 py-2.5 px-4 rounded-lg border transition-all flex items-center justify-center gap-2 ${
            marketType === "bear"
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-card text-muted-foreground border-border hover:border-primary/50"
          }`}
        >
          <TrendingDown className="w-4 h-4" />
          <span className="font-medium">空方</span>
        </button>
      </div>

      {/* Filter Type Tabs */}
      <div className="bg-card rounded-lg border border-border p-1">
        <div className="grid grid-cols-2 gap-1">
          {marketType === "bull" ? (
            <>
              <button
                onClick={() => onFilterTypeChange("above-ma")}
                className={`py-2 px-3 rounded-md text-sm transition-all ${
                  filterType === "above-ma"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                站上週20MA
              </button>
              <button
                onClick={() => onFilterTypeChange("strong-ma")}
                className={`py-2 px-3 rounded-md text-sm transition-all ${
                  filterType === "strong-ma"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                強勢週20MA
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onFilterTypeChange("below-ma")}
                className={`py-2 px-3 rounded-md text-sm transition-all ${
                  filterType === "below-ma"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                跌破週20MA
              </button>
              <button
                onClick={() => onFilterTypeChange("weak-ma")}
                className={`py-2 px-3 rounded-md text-sm transition-all ${
                  filterType === "weak-ma"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                弱勢週20MA
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
