import { Star, TrendingUp, TrendingDown } from "lucide-react";
import { Stock } from "../lib/stockData";

interface StockListProps {
  stocks: Stock[];
}

function StarRating({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill={`url(#gold-gradient-stock-list-${i})`}
            stroke="#B8860B"
            strokeWidth="0.5"
          />
          <defs>
            <linearGradient id={`gold-gradient-stock-list-${i}`} x1="12" y1="2" x2="12" y2="22">
              <stop offset="0%" stopColor="#E5C100" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#B8860B" />
            </linearGradient>
          </defs>
        </svg>
      ))}
    </div>
  );
}

export function StockList({ stocks }: StockListProps) {
  return (
    <div className="space-y-1">
      {stocks.map((stock, index) => {
        const isPositive = stock.change > 0;
        const isNegative = stock.change < 0;
        
        return (
          <div
            key={stock.code}
            className="bg-card border border-border/50 hover:border-primary/50 transition-all px-3 py-3"
          >
            <div className="flex items-center gap-2">
              {/* 排名和星星 */}
              <div className="flex flex-col items-center justify-center w-10 shrink-0">
                <div className="text-primary font-medium text-lg">{index + 1}</div>
                <StarRating count={stock.trilogyScore} />
              </div>

              {/* 股票基本資訊 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span className="font-medium">{stock.name}</span>
                  <span className="text-xs text-muted-foreground">{stock.code}</span>
                </div>
                <div className="text-xs text-muted-foreground truncate">{stock.industry}</div>
              </div>

              {/* 價格和漲跌 */}
              <div className="text-right shrink-0">
                <div className="font-medium mb-0.5">{stock.price.toFixed(2)}</div>
                <div className={`text-xs flex items-center justify-end gap-0.5 ${
                  isPositive ? "text-chart-2" : isNegative ? "text-chart-3" : "text-muted-foreground"
                }`}>
                  {isPositive && <TrendingUp className="w-3 h-3" />}
                  {isNegative && <TrendingDown className="w-3 h-3" />}
                  <span>
                    {isPositive ? "+" : ""}{stock.change.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* 漲跌幅百分比 */}
              <div className={`text-right w-16 shrink-0 font-medium ${
                isPositive ? "text-chart-2" : isNegative ? "text-chart-3" : "text-muted-foreground"
              }`}>
                {isPositive ? "+" : ""}{stock.changePercent.toFixed(2)}%
              </div>

              {/* 其他重要數據 */}
              <div className="text-right w-14 shrink-0">
                <div className={`text-sm font-medium ${
                  parseFloat(stock.territoryGap as any) > 0 ? "text-primary" : "text-muted-foreground"
                }`}>
                  {stock.territoryGap}
                </div>
              </div>
            </div>

            {/* 詳細資訊區 - 可折疊或展開 */}
            <div className="mt-2 pt-2 border-t border-border/50">
              <div className="grid grid-cols-6 gap-2 text-xs">
                <div className="text-center">
                  <div className="text-muted-foreground mb-0.5">量距三部曲</div>
                  <StarRating count={stock.trilogyScore} />
                </div>
                <div className="text-center">
                  <div className="text-muted-foreground mb-0.5">等待均線</div>
                  <StarRating count={stock.waitMaScore} />
                </div>
                <div className="text-center">
                  <div className="text-muted-foreground mb-0.5">等待轉強</div>
                  <StarRating count={stock.waitStrongScore} />
                </div>
                <div className="text-center">
                  <div className="text-muted-foreground mb-0.5">等待持續</div>
                  <StarRating count={stock.waitContinueScore} />
                </div>
                <div className="text-center">
                  <div className="text-muted-foreground mb-0.5">連站均線漲幅</div>
                  <div className={parseFloat(stock.consecutiveMaGain as any) > 0 ? "text-chart-2" : "text-chart-3"}>
                    {stock.consecutiveMaGain}%
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-muted-foreground mb-0.5">週均線</div>
                  <div>{stock.weeklyMa.toFixed(2)}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-5 gap-2 text-xs mt-2">
                <div className="text-center">
                  <div className="text-muted-foreground mb-0.5">20週乖離</div>
                  <div className={stock.weeklyDeviation > 0 ? "text-chart-2" : "text-chart-3"}>
                    {stock.weeklyDeviation.toFixed(2)}%
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-muted-foreground mb-0.5">站穩30週率</div>
                  <div>{stock.stable30WeekRate}</div>
                </div>
                <div className="text-center">
                  <div className="text-muted-foreground mb-0.5">破空交差</div>
                  <div className={parseFloat(stock.breakGap as any) > 0 ? "text-chart-2" : "text-chart-3"}>
                    {stock.breakGap}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-muted-foreground mb-0.5">地緣交差</div>
                  <div className={parseFloat(stock.territoryGap as any) > 0 ? "text-primary" : "text-muted-foreground"}>
                    {stock.territoryGap}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-muted-foreground mb-0.5">週爆量</div>
                  <div className={parseFloat(stock.volumeRatio as any) > 1.5 ? "text-primary" : ""}>
                    {stock.volumeRatio}x
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}