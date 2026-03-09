# 🏠 首頁標籤（HomePage）完整文檔

## 📋 文檔更新日期
2026年3月9日

---

## 🎯 頁面概述

**首頁**是用戶登入後看到的第一個頁面，提供台股大盤即時資訊、趨勢判斷、以及快速導航至其他功能的入口。

### 路由資訊
- **路徑**：`/home`
- **組件**：`HomePage`
- **底部導覽圖標**：🏠 Home
- **是否需要登入**：是
- **有無底部導覽列**：有

---

## 📐 頁面結構

```
┌─────────────────────────────────────────────────┐
│                  頂部標題欄                      │
│            「長線聚寶盆」+ 通知鈴鐺               │
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│              大盤指數卡片                        │
│   ┌───────────────────────────────────────┐    │
│   │ 加權指數        18,234.56  ▲ 1.25%   │    │
│   │ 台指期          18,456     ▲ 85點     │    │
│   │ 上櫃指數        234.56     ▼ -0.45%   │    │
│   └───────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│              趨勢判斷區域                        │
│   ┌───────────────────────────────────────┐    │
│   │ 🔴 多方 / 🟢 空方 / 🟡 震盪             │    │
│   │ 燈號顯示 + 說明文字                    │    │
│   └───────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│              大盤K線圖表                         │
│   ┌───────────────────────────────────────┐    │
│   │   日K / 週K / 月K 切換                 │    │
│   │                                       │    │
│   │   [K線圖表區域]                        │    │
│   │                                       │    │
│   │   MA20 / MA100 / 週20MA               │    │
│   └───────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│              快速功能導航                        │
│   ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐        │
│   │選股  │  │自選  │  │社團  │  │內容  │        │
│   └─────┘  └─────┘  └─────┘  └─────┘        │
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│              今日熱門股票                        │
│   ┌───────────────────────────────────────┐    │
│   │ 2330 台積電  780.00  ▲ 2.35%  🔥     │    │
│   │ 2317 鴻海    120.50  ▲ 1.85%  🔥     │    │
│   │ 2454 聯發科  1050.00 ▲ 3.12%  🔥     │    │
│   └───────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│              底部導覽列                          │
│   [ 首頁 ] [ 選股 ] [ 自選 ] [ 社團 ] [ 內容 ]  │
└─────────────────────────────────────────────────┘
```

---

## 🎨 視覺設計規範

### 配色方案

#### 主色調
- **背景漸層**：
  ```css
  background: linear-gradient(
    to bottom,
    var(--background) 0%,
    var(--background) 50%,
    rgba(var(--muted), 0.2) 100%
  );
  ```

#### 大盤指數顏色
- **上漲（紅色）**：`#FE6D73` - `text-chart-2`
- **下跌（綠色）**：`#9cffd9` - `text-chart-3`
- **平盤（灰色）**：`#6B7280` - `text-gray-500`

#### 趨勢燈號顏色
- **多方（紅燈）**：`#FE6D73` + 🔴 圖示
- **空方（綠燈）**：`#9cffd9` + 🟢 圖示
- **震盪（黃燈）**：`#FFD93D` + 🟡 圖示
- **未開盤（灰燈）**：`#6B7280` + ⚪ 圖示

#### 火焰圖示（強勢股）
- **顏色**：`#FF6B6B`
- **使用時機**：收盤價 > 領頭羊價
- **圖示**：🔥

---

## 📊 大盤指數卡片

### 資料結構

```typescript
interface MarketIndex {
  name: string;           // 指數名稱
  value: number;          // 當前值
  change: number;         // 漲跌點數
  changePercent: number;  // 漲跌幅 %
  trend: 'up' | 'down' | 'flat'; // 趨勢
  lastUpdateTime: Date;   // 最後更新時間
}
```

### 顯示資料

| 指數 | 說明 | 範例 |
|------|------|------|
| **加權指數** | 台灣證券交易所發行量加權股價指數 | 18,234.56 ▲ 1.25% |
| **台指期** | 台灣期貨交易所台股期貨指數 | 18,456 ▲ 85點 |
| **上櫃指數** | 櫃買中心上櫃指數 | 234.56 ▼ -0.45% |



---

## 🔴 趨勢判斷區域

### 趨勢狀態定義

| 狀態 | 燈號 | 顏色 | 判斷條件 | 說明文字 |
|------|------|------|---------|---------|
| **多方** | 🔴 | `#FE6D73` | `price > MA20 && price > MA100` | 多方走勢，突破牛角 |
| **空方** | 🟢 | `#9cffd9` | `price < MA20 && price < MA100` | 空方走勢，跌破熊掌 |
| **震盪** | 🟡 | `#FFD93D` | `MA20 < price < MA100` 或 `MA100 < price < MA20` | 盤整震盪，無明確趨勢 |
| **未開盤** | ⚪ | `#6B7280` | 交易時間外 | 等待開盤 |

### 趨勢判斷邏輯

```typescript
function determineTrend(
  price: number, 
  ma20: number, 
  ma100: number
): TrendStatus {
  // 未開盤
  if (!isMarketOpen()) {
    return {
      status: 'closed',
      icon: '⚪',
      color: '#6B7280',
      text: '未開盤'
    };
  }

  // 多方：價格 > MA20 且 > MA100
  if (price > ma20 && price > ma100) {
    return {
      status: 'bull',
      icon: '🔴',
      color: '#FE6D73',
      text: '多方走勢，突破牛角'
    };
  }

  // 空方：價格 < MA20 且 < MA100
  if (price < ma20 && price < ma100) {
    return {
      status: 'bear',
      icon: '🟢',
      color: '#9cffd9',
      text: '空方走勢，跌破熊掌'
    };
  }

  // 震盪：介於兩條均線之間
  return {
    status: 'sideways',
    icon: '🟡',
    color: '#FFD93D',
    text: '盤整震盪，無明確趨勢'
  };
}
```

### UI 組件

```tsx
<Card className="bg-card/50 backdrop-blur-sm border border-border/50">
  <CardContent className="p-6">
    <div className="flex items-center gap-4">
      {/* 燈號圖示 */}
      <div 
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ backgroundColor: `${trend.color}20` }}
      >
        <span className="text-4xl">{trend.icon}</span>
      </div>

      {/* 趨勢說明 */}
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-1" style={{ color: trend.color }}>
          {trend.status === 'bull' ? '多方市場' : 
           trend.status === 'bear' ? '空方市場' : 
           trend.status === 'sideways' ? '震盪盤整' : '未開盤'}
        </h3>
        <p className="text-sm text-muted-foreground">
          {trend.text}
        </p>
      </div>
    </div>
  </CardContent>
</Card>
```

---

## 📈 大盤K線圖表

### 週期切換

| 週期 | 值 | 顯示範圍 | 說明 |
|------|-----|---------|------|
| **日K** | `daily` | 最近 60 個交易日 | 日線圖 |
| **週K** | `weekly` | 最近 52 週 | 週線圖 |
| **月K** | `monthly` | 最近 24 個月 | 月線圖 |

### 均線設定

| 均線 | 顏色 | 週期 | 說明 |
|------|------|------|------|
| **MA20** | `#FFD93D` 黃色 | 20日均線 | 短期均線 |
| **MA100** | `#A78BFA` 紫色 | 100日均線 | 長期均線 |
| **週20MA** | `#4A90E2` 藍色 | 20週均線 | 核心策略均線 |

### 圖表組件

使用 **Recharts** 庫繪製K線圖：

```tsx
import { 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

<ResponsiveContainer width="100%" height={300}>
  <ComposedChart data={klineData}>
    <XAxis 
      dataKey="date" 
      stroke="rgba(255,255,255,0.3)"
      tick={{ fill: 'rgba(255,255,255,0.6)' }}
    />
    <YAxis 
      stroke="rgba(255,255,255,0.3)"
      tick={{ fill: 'rgba(255,255,255,0.6)' }}
    />
    <Tooltip 
      contentStyle={{
        backgroundColor: 'rgba(0,0,0,0.8)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px'
      }}
    />

    {/* K線（使用 Bar 組件） */}
    <Bar 
      dataKey="open" 
      fill="#FE6D73" 
      stackId="candle" 
    />
    <Bar 
      dataKey="close" 
      fill="#9cffd9" 
      stackId="candle" 
    />

    {/* 均線 */}
    <Line 
      type="monotone" 
      dataKey="ma20" 
      stroke="#FFD93D" 
      strokeWidth={2}
      dot={false}
    />
    <Line 
      type="monotone" 
      dataKey="ma100" 
      stroke="#A78BFA" 
      strokeWidth={2}
      dot={false}
    />
    <Line 
      type="monotone" 
      dataKey="weeklyMa" 
      stroke="#4A90E2" 
      strokeWidth={3}
      dot={false}
    />
  </ComposedChart>
</ResponsiveContainer>
```

### K線數據結構

```typescript
interface KLineData {
  date: string;       // 日期（YYYY-MM-DD）
  open: number;       // 開盤價
  high: number;       // 最高價
  low: number;        // 最低價
  close: number;      // 收盤價
  volume: number;     // 成交量
  ma20: number;       // 20日均線
  ma100: number;      // 100日均線
  weeklyMa: number;   // 20週均線
}
```

---

## 🚀 快速功能導航

### 導航卡片設計

```tsx
<div className="grid grid-cols-4 gap-4 mb-6">
  {/* 選股 */}
  <Link 
    to="/home/stock-picker"
    className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-[#4A90E2]/20 to-[#6BB6FF]/10 border border-[#4A90E2]/30 hover:border-[#4A90E2] transition-all"
  >
    <BarChart3 className="w-8 h-8 text-[#4A90E2] mb-2" />
    <span className="text-sm font-medium">選股</span>
  </Link>

  {/* 自選 */}
  <Link 
    to="/home/watchlist"
    className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#F4D03F]/10 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all"
  >
    <Eye className="w-8 h-8 text-[#D4AF37] mb-2" />
    <span className="text-sm font-medium">自選</span>
  </Link>

  {/* 社團 */}
  <Link 
    to="/home/discussion"
    className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-[#FE6D73]/20 to-[#FF9B9B]/10 border border-[#FE6D73]/30 hover:border-[#FE6D73] transition-all"
  >
    <MessageCircle className="w-8 h-8 text-[#FE6D73] mb-2" />
    <span className="text-sm font-medium">社團</span>
  </Link>

  {/* 內容 */}
  <Link 
    to="/home/content"
    className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-[#9cffd9]/20 to-[#B8FFE5]/10 border border-[#9cffd9]/30 hover:border-[#9cffd9] transition-all"
  >
    <FileText className="w-8 h-8 text-[#9cffd9] mb-2" />
    <span className="text-sm font-medium">內容</span>
  </Link>
</div>
```

---

## 🔥 今日熱門股票

### 股票卡片設計

```tsx
<Card className="bg-card/50 backdrop-blur-sm border border-border/50">
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <TrendingUp className="w-5 h-5 text-[#FE6D73]" />
      今日熱門股票
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div className="space-y-3">
      {hotStocks.map((stock) => (
        <Link 
          key={stock.code}
          to={`/stock/${stock.code}`}
          className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
        >
          {/* 股票代碼與名稱 */}
          <div className="flex items-center gap-3">
            <div className="text-sm">
              <p className="font-medium">{stock.code}</p>
              <p className="text-muted-foreground">{stock.name}</p>
            </div>
          </div>

          {/* 價格與漲跌幅 */}
          <div className="text-right">
            <p className="font-semibold">{stock.price.toFixed(2)}</p>
            <p className={cn(
              "text-sm",
              stock.changePercent > 0 ? "text-chart-2" : "text-chart-3"
            )}>
              {stock.changePercent > 0 ? "▲" : "▼"} {Math.abs(stock.changePercent).toFixed(2)}%
            </p>
          </div>

          {/* 火焰圖示（強勢股） */}
          {stock.isStrong && (
            <div className="ml-2">
              <span className="text-xl">🔥</span>
            </div>
          )}
        </Link>
      ))}
    </div>
  </CardContent>
</Card>
```

### 熱門股票判斷邏輯

```typescript
function getHotStocks(stocks: Stock[]): Stock[] {
  return stocks
    .filter(stock => 
      // 篩選條件
      stock.volume > stock.avgVolume * 1.5 &&  // 成交量 > 平均 1.5 倍
      Math.abs(stock.changePercent) > 2         // 漲跌幅 > 2%
    )
    .sort((a, b) => 
      // 排序：按成交量降序
      b.volume - a.volume
    )
    .slice(0, 10);  // 取前 10 支
}
```

---

## 🔔 頂部通知鈴鐺

### 通知類型

| 類型 | 圖標 | 顏色 | 說明 |
|------|------|------|------|
| **系統通知** | 🔔 | 藍色 | 系統更新、維護通知 |
| **社團通知** | 💬 | 紅色 | 有新回覆、提及你的貼文 |
| **選股通知** | 📊 | 金色 | 自選股觸發訊號 |
| **內容通知** | 📄 | 紫色 | 新影音、新文章上線 |

### 通知按鈕設計

```tsx
<button 
  onClick={() => setShowNotifications(true)}
  className="relative p-2 rounded-full hover:bg-muted/50 transition-colors"
>
  <Bell className="w-6 h-6 text-muted-foreground" />
  
  {/* 未讀數量徽章 */}
  {unreadCount > 0 && (
    <span className="absolute top-0 right-0 w-5 h-5 rounded-full bg-[#FE6D73] text-white text-xs flex items-center justify-center">
      {unreadCount > 99 ? '99+' : unreadCount}
    </span>
  )}
</button>
```

---

## 📱 響應式設計

### 手機版（< 768px）
- 快速功能導航：2x2 網格
- K線圖表高度：250px
- 熱門股票：顯示前 5 支

### 平板版（768px - 1024px）
- 快速功能導航：4x1 網格
- K線圖表高度：300px
- 熱門股票：顯示前 8 支

### 桌面版（> 1024px）
- 快速功能導航：4x1 網格
- K線圖表高度：400px
- 熱門股票：顯示前 10 支

---

## 🔄 數據更新機制

### 實時更新頻率

| 數據類型 | 更新頻率 | 說明 |
|---------|---------|------|
| **大盤指數** | 5 秒 | 盤中每 5 秒更新 |
| **趨勢判斷** | 10 秒 | 每 10 秒重新計算 |
| **K線圖表** | 1 分鐘 | 每分鐘更新 |
| **熱門股票** | 30 秒 | 每 30 秒重新篩選 |

### 實時更新實作

```typescript
// 使用 useEffect + setInterval
useEffect(() => {
  // 首次載入
  fetchMarketData();

  // 設定定時器
  const interval = setInterval(() => {
    if (isMarketOpen()) {
      fetchMarketData();
    }
  }, 5000); // 每 5 秒更新

  // 清除定時器
  return () => clearInterval(interval);
}, []);
```

---

## 🎯 交互行為

### 點擊大盤指數卡片
→ 導航至「市場指數詳情頁」（`/market-index`）

### 點擊趨勢燈號
→ 顯示趨勢說明彈窗

### 點擊K線圖表
→ 全屏顯示圖表，支援縮放、拖曳

### 點擊快速功能導航
→ 導航至對應頁面

### 點擊熱門股票
→ 導航至「股票詳情頁」（`/stock/:code`）

### 點擊通知鈴鐺
→ 打開通知列表抽屜

---

## 📝 注意事項

### 顏色使用
- ✅ 必須嚴格遵循台股紅漲綠跌規則
- ❌ 絕對不能使用黃藍漸層
- ✅ 僅能使用純藍色系的微漸層

### 數據更新
- 盤中（09:00 - 13:30）：實時更新
- 盤後：停止更新，顯示收盤數據
- 未開盤：顯示前一交易日收盤數據

### 性能優化
- 使用 `useMemo` 緩存計算結果
- 使用 `React.memo` 避免不必要的重渲染
- 圖表數據只保留最近 60 筆

---

## 📚 相關文檔

- **整體概覽**：`00_APP_OVERVIEW.md`
- **選股標籤**：`02_STOCK_PICKER_PAGE.md`
- **自選標籤**：`03_WATCHLIST_PAGE.md`
- **社團標籤**：`04_DISCUSSION_PAGE.md`
- **內容標籤**：`05_CONTENT_PAGE.md`
- **會員標籤**：`06_MORE_PAGE.md`
