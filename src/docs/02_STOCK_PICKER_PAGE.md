# 📊 選股標籤（StockPickerPage）完整文檔

## 📋 文檔更新日期
2026年3月9日

---

## 🎯 頁面概述

**選股頁**是應用的核心功能，採用**三層級篩選系統**，支持多個信號之間的 **AND 交集篩選**，讓用戶精準選出符合條件的股票。

### 路由資訊
- **路徑**：`/home/stock-picker`
- **組件**：`StockPickerPage`
- **底部導覽圖標**：📊 BarChart3（選股）
- **是否需要登入**：是
- **有無底部導覽列**：有

---

## 📐 三層篩選系統架構

```
┌─────────────────────────────────────────────────┐
│                  第一層                          │
│            市場類型選擇（Tab）                    │
│         【多方 Bull】  【空方 Bear】             │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│                  第二層                          │
│            基礎策略篩選（Tab）                    │
│   多方: 站上週20MA / 強勢週20MA                  │
│   空方: 跌破週20MA / 弱勢週20MA                  │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│                  第三層                          │
│         高級信號篩選（Pills/Chips）              │
│ 【領頭羊】【211強勢】【爆量】【股本】【周均量】   │
│                                                 │
│   ✅ 支持多選                                    │
│   ✅ AND 交集篩選                                │
│   ✅ 點擊變藍色                                  │
│   ✅ 實時排序                                    │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│              股票結果列表                        │
│   排序：三部曲評分 + 特殊形態評分 + 漲跌幅       │
└─────────────────────────────────────────────────┘
```

---

## 🎨 第一層：市場類型選擇

### Tab 設計

```tsx
<div className="flex gap-2 mb-4">
  {/* 多方 Tab */}
  <button
    onClick={() => setMarketType('bull')}
    className={cn(
      "flex-1 py-3 rounded-t-xl font-semibold transition-all",
      marketType === 'bull'
        ? "bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF] text-white"
        : "bg-muted text-muted-foreground"
    )}
  >
    多方 Bull
  </button>

  {/* 空方 Tab */}
  <button
    onClick={() => setMarketType('bear')}
    className={cn(
      "flex-1 py-3 rounded-t-xl font-semibold transition-all",
      marketType === 'bear'
        ? "bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF] text-white"
        : "bg-muted text-muted-foreground"
    )}
  >
    空方 Bear
  </button>
</div>
```

### 切換行為
- 切換市場類型時，自動切換到對應的默認策略
- 重置高級篩選器的部分選項（211強勢/弱勢切換）
- 切換領頭羊/落水狗產業顯示

---

## 🎨 第二層：基礎策略篩選

### 多方策略（Bull Market）

| 策略名稱 | 值 | 篩選條件 | 說明 |
|---------|-----|---------|------|
| **站上週20MA** | `above-ma` | `price > weeklyMa && weeklyDeviation > -5` | 價格站上20週均線，乖離率>-5% |
| **強勢週20MA** | `strong-ma` | `price > weeklyMa && weeklyDeviation > 0` | 價格站上20週均線，且乖離率為正 |

### 空方策略（Bear Market）

| 策略名稱 | 值 | 篩選條件 | 說明 |
|---------|-----|---------|------|
| **跌破週20MA** | `below-ma` | `price < weeklyMa && weeklyDeviation < 5` | 價格跌破20週均線，乖離率<5% |
| **弱勢週20MA** | `weak-ma` | `price < weeklyMa && weeklyDeviation < 0` | 價格跌破20週均線，且乖離率為負 |

### Tab 設計

```tsx
<div className="flex gap-4 mb-4 border-b border-border">
  {/* 站上週20MA / 跌破週20MA */}
  <button
    onClick={() => setFilterType(marketType === 'bull' ? 'above-ma' : 'below-ma')}
    className={cn(
      "px-4 py-2 font-medium transition-all relative",
      filterType === (marketType === 'bull' ? 'above-ma' : 'below-ma')
        ? "text-[#4A90E2]"
        : "text-muted-foreground"
    )}
  >
    {marketType === 'bull' ? '站上週20MA' : '跌破週20MA'}
    {filterType === (marketType === 'bull' ? 'above-ma' : 'below-ma') && (
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF]" />
    )}
  </button>

  {/* 強勢週20MA / 弱勢週20MA */}
  <button
    onClick={() => setFilterType(marketType === 'bull' ? 'strong-ma' : 'weak-ma')}
    className={cn(
      "px-4 py-2 font-medium transition-all relative",
      filterType === (marketType === 'bull' ? 'strong-ma' : 'weak-ma')
        ? "text-[#4A90E2]"
        : "text-muted-foreground"
    )}
  >
    {marketType === 'bull' ? '強勢週20MA' : '弱勢週20MA'}
    {filterType === (marketType === 'bull' ? 'strong-ma' : 'weak-ma') && (
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF]" />
    )}
  </button>
</div>
```

---

## 🎨 第三層：高級信號篩選

### 1️⃣ 領頭羊產業（多方專用）

**字段名**：`leaderIndustry`
**類型**：`string | null`
**顯示時機**：僅在多方（Bull）市場顯示
**按鈕文字**：「領頭羊產業」
**排序優先級**：-1（永遠在最左邊）

**當期領頭羊產業（前10）**：
1. 電子上游-IC設計
2. 電子中游-被動元件
3. 電子上游-IC通路
4. 電子零組件-顯示面板
5. 電腦週邊-電腦系統
6. 電子上游-IC製造
7. 電子中游-連接器
8. 電子上游-記憶體
9. 電子中游-光電元件
10. 電子下游-網路通訊

**前期領頭羊產業（前10）**：
1. 電子中游-PCB-材料設備
2. 電子上游-PCB-材料設備
3. 電子上游-IC封測
4. 電子上游-配線驅動雜
5. 電子上游-連接元件
6. 電子上游-PCB-製造
7. 電子上游-配線處理設計
8. 電子上游-感測元件
9. 電子上游-IC製造
10. 電子中游-電源管理

**篩選邏輯**：
```typescript
if (filters.leaderIndustry) {
  stocks = stocks.filter(stock => 
    stock.industry === filters.leaderIndustry
  );
}
```

---

### 2️⃣ 落水狗產業（空方專用）

**字段名**：`loserIndustry`
**類型**：`string | null`
**顯示時機**：僅在空方（Bear）市場顯示
**按鈕文字**：「落水狗產業」
**排序優先級**：-1（永遠在最左邊）

**當期落水狗產業（前10）**：
1. 傳產-塑膠工業
2. 傳產-紡織纖維
3. 金融-證券
4. 傳產-航運
5. 傳產-鋼鐵工業
6. 傳產-水泥工業
7. 金融-保險
8. 傳產-化學工業
9. 傳產-營建
10. 傳產-觀光

**前期落水狗產業（前10）**：
1. 傳產-貿易百貨
2. 傳產-食品工業
3. 金融-金控
4. 傳產-汽車工業
5. 傳產-造紙工業
6. 傳產-電機機械
7. 傳產-橡膠工業
8. 傳產-玻璃陶瓷
9. 金融-其他金融
10. 傳產-其他

---

### 3️⃣ 211強勢股 / 211弱勢股

**字段名**：`specialFilter`
**值選項**：`"211" | "210" | null`
**多方文字**：「211強勢股」
**空方文字**：「211弱勢股」
**排序優先級**：0

**211形態定義**：
- **多方（強勢）**：連續2根紅K，然後1根綠K回調，顯示強勢整理形態
- **空方（弱勢）**：連續2根綠K，然後1根紅K反彈，顯示弱勢整理形態

**篩選邏輯**：
```typescript
if (filters.specialFilter === "211") {
  stocks = stocks.filter(stock => {
    if (marketType === "bull") {
      return stock.has211BullPattern === true;
    } else {
      return stock.has211BearPattern === true;
    }
  });
  
  // 選中後，按211評分排序
  stocks.sort((a, b) => b.pattern211Score - a.pattern211Score);
}
```

---

### 4️⃣ 210起漲股 / 210起跌股

**字段名**：`specialFilter`
**值選項**：`"210"`
**多方文字**：「210起漲股」
**空方文字**：「210起跌股」
**排序優先級**：0

**210形態定義**：
- **多方（起漲）**：連續2根紅K，然後1根十字星，顯示即將突破
- **空方（起跌）**：連續2根綠K，然後1根十字星，顯示即將跌破

---

### 5️⃣ 爆量篩選（多/空共用）

**字段名**：`volumePeriod`, `volumeMultiple`
**類型**：`("weekly" | "monthly" | null)`, `(1 | 2 | 4 | null)`
**按鈕默認文字**：「當週爆量1倍」
**排序優先級**：1

**下拉選項**：

**週期選擇**：
- 當週（`weekly`）
- 當月（`monthly`）

**倍數選擇**：
- 1倍（`1`）
- 2倍（`2`）
- 4倍（`4`）

**組合示例**：
- 當週爆量1倍 → `{ volumePeriod: "weekly", volumeMultiple: 1 }`
- 當週爆量2倍 → `{ volumePeriod: "weekly", volumeMultiple: 2 }`
- 當週爆量4倍 → `{ volumePeriod: "weekly", volumeMultiple: 4 }`

**篩選邏輯**：
```typescript
if (filters.volumePeriod && filters.volumeMultiple) {
  stocks = stocks.filter(stock => {
    if (filters.volumePeriod === "weekly") {
      return stock.weeklyVolumeMultiple >= filters.volumeMultiple!;
    } else {
      return stock.monthlyVolumeMultiple >= filters.volumeMultiple!;
    }
  });
}
```

---

### 6️⃣ 股本大小篩選（多/空共用）

**字段名**：`marketCap`
**類型**：`"above20B" | "below20B" | null`
**按鈕默認文字**：「股本大於20億」
**排序優先級**：2

**下拉選項**：
- 股本大於20億（`above20B`）
- 股本小於20億（`below20B`）

**篩選邏輯**：
```typescript
if (filters.marketCap) {
  stocks = stocks.filter(stock => {
    if (filters.marketCap === "above20B") {
      return stock.capitalBillion >= 20;
    } else {
      return stock.capitalBillion < 20;
    }
  });
}
```

---

### 7️⃣ 周均量大小篩選（多/空共用）

**字段名**：`avgVolume`
**類型**：`"above1000" | "below1000" | null`
**按鈕默認文字**：「周均量大於1000張」
**排序優先級**：3

**下拉選項**：
- 周均量大於1000張（`above1000`）
- 周均量小於1000張（`below1000`）

**篩選邏輯**：
```typescript
if (filters.avgVolume) {
  stocks = stocks.filter(stock => {
    if (filters.avgVolume === "above1000") {
      return stock.weeklyVolume >= 1000;
    } else {
      return stock.weeklyVolume < 1000;
    }
  });
}
```

---

## 🔗 AND 交集篩選邏輯

### 篩選執行順序

```typescript
// 1. 第一層：市場類型篩選
let stocks = allStocks;

// 2. 第二層：基礎策略篩選
stocks = stocks.filter(stock => {
  if (marketType === "bull") {
    if (filterType === "above-ma") {
      return stock.price > stock.weeklyMa && stock.weeklyDeviation > -5;
    } else if (filterType === "strong-ma") {
      return stock.price > stock.weeklyMa && stock.weeklyDeviation > 0;
    }
  } else {
    if (filterType === "below-ma") {
      return stock.price < stock.weeklyMa && stock.weeklyDeviation < 5;
    } else if (filterType === "weak-ma") {
      return stock.price < stock.weeklyMa && stock.weeklyDeviation < 0;
    }
  }
  return true;
});

// 3. 第三層：高級信號篩選（AND 交集）
// 3.1 產業篩選
if (marketType === "bull" && filters.leaderIndustry) {
  stocks = stocks.filter(stock => stock.industry === filters.leaderIndustry);
}

if (marketType === "bear" && filters.loserIndustry) {
  stocks = stocks.filter(stock => stock.industry === filters.loserIndustry);
}

// 3.2 特殊形態篩選
if (filters.specialFilter === "211") {
  stocks = stocks.filter(stock => 
    marketType === "bull" ? stock.has211BullPattern : stock.has211BearPattern
  );
}

// 3.3 爆量篩選
if (filters.volumePeriod && filters.volumeMultiple) {
  stocks = stocks.filter(stock => {
    const volumeMultiple = filters.volumePeriod === "weekly"
      ? stock.weeklyVolumeMultiple
      : stock.monthlyVolumeMultiple;
    return volumeMultiple >= filters.volumeMultiple!;
  });
}

// 3.4 股本篩選
if (filters.marketCap) {
  stocks = stocks.filter(stock => 
    filters.marketCap === "above20B" 
      ? stock.capitalBillion >= 20 
      : stock.capitalBillion < 20
  );
}

// 3.5 周均量篩選
if (filters.avgVolume) {
  stocks = stocks.filter(stock => 
    filters.avgVolume === "above1000" 
      ? stock.weeklyVolume >= 1000 
      : stock.weeklyVolume < 1000
  );
}

// 4. 計算恩如三部曲評分
stocks = stocks.map(stock => ({
  ...stock,
  trilogyScore: calculateTrilogyScore(stock, marketType, filterType)
}));

// 5. 排序
stocks.sort((a, b) => 
  b.trilogyScore - a.trilogyScore || 
  b.changePercent - a.changePercent
);
```

---

## ⭐ 恩如三部曲評分系統

### 評分結構

```typescript
interface TrilogyScore {
  total: number;        // 總分（0-6）
  trilogy1: number;     // 挑噴出/回檔（0-2星）
  trilogy2: number;     // 看型態（0-2星）
  trilogy3: number;     // 看量找動能（0-2星）
}
```

### 評分規則（多方）

#### 1️⃣ 挑噴出/回檔（最多2星）

**站上週20MA**：
- 若 5122133（蓄勢待發）內含該股 → 加 **2星**
- 否則若 6086866（逆轉勝）內含該股 → 加 **1星**

**強勢週20MA**：
- 若（過去9天最低價 > 領頭羊）且（今日最低價與領頭羊差距 < 2%）且（收盤價 > 領頭羊）→ 加 **2星**
- 否則若（收盤價 ≥ 領頭羊）且（昨日收盤 ≤ 領頭羊 或 今日最低價 ≤ 領頭羊）→ 加 **1星**

#### 2️⃣ 看型態（最多2星）

- 若 6086867（海闊天空）或 6086869（庸中佼佼）內含該股 → 加 **1星**
- 若 6086884（一往直前）或 103664275（直道而行）內含該股 → 再加 **1星**

#### 3️⃣ 看量找動能（最多2星）

- 若 6086650（真金烈火）或 6086870（後起新秀）內含該股 → 加 **1星**
- 若 5975178（金玉其質）或 6086872（前程萬里）內含該股 → 再加 **1星**

### 星星顯示設計

```tsx
<div className="flex items-center gap-1">
  {[...Array(stock.trilogyScore)].map((_, i) => (
    <Star 
      key={i} 
      className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" 
    />
  ))}
  {[...Array(6 - stock.trilogyScore)].map((_, i) => (
    <Star 
      key={i + stock.trilogyScore} 
      className="w-4 h-4 text-muted-foreground" 
    />
  ))}
  <span className="text-sm text-muted-foreground ml-1">
    {stock.trilogyScore}/6
  </span>
</div>
```

---

## 🔐 VIP 權限控制

### VIP版 vs 一般版

| 功能 | VIP版 | 一般版 |
|------|--------|--------|
| **顯示股票數** | ✅ 全部 | ⚠️ 僅前3支 |
| **第4支以後** | ✅ 正常顯示 | ⚠️ 模糊 + 金色鎖頭 |
| **篩選功能** | ✅ 完整使用 | ✅ 完整使用 |
| **恩如三部曲** | ✅ 完整顯示 | ✅ 完整顯示 |

### 鎖定視覺效果

```tsx
{/* 一般版：第4支以後模糊 */}
{!user?.isVIP && index >= 3 && (
  <div className="absolute inset-0 backdrop-blur-md bg-black/60 flex items-center justify-center rounded-lg">
    <div className="text-center space-y-2">
      {/* 金色鎖頭 */}
      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] flex items-center justify-center">
        <Lock className="w-8 h-8 text-white" />
      </div>
      
      {/* 提示文字 */}
      <p className="text-white font-semibold">升級 VIP</p>
      <p className="text-white/80 text-sm">查看更多股票</p>
      
      {/* 升級按鈕 */}
      <button 
        onClick={() => navigate('/purchase')}
        className="px-6 py-2 rounded-full bg-gradient-to-r from-[#4A90E2] to-[#D4AF37] text-white font-medium hover:shadow-lg transition-all"
      >
        立即升級
      </button>
    </div>
  </div>
)}
```

---

## 📱 響應式設計

### 手機版（< 768px）
- 篩選按鈕：橫向滾動，固定高度
- 股票列表：卡片式佈局，單欄
- 恩如三部曲：簡化顯示

### 平板版（768px - 1024px）
- 篩選按鈕：橫向滾動
- 股票列表：表格式佈局
- 恩如三部曲：完整顯示

### 桌面版（> 1024px）
- 篩選按鈕：完整顯示，自動換行
- 股票列表：表格式佈局，固定表頭
- 恩如三部曲：完整顯示 + 詳細說明

---

## 📝 注意事項

### 顏色使用
- 選中的篩選按鈕：藍金漸層
- 未選中的篩選按鈕：灰色
- 清除按鈕：紅色邊框

### 按鈕排序
- 選中的篩選器自動移到左邊
- 產業篩選（領頭羊/落水狗）永遠在最左邊

### 性能優化
- 使用 `useMemo` 緩存篩選結果
- 使用 `React.memo` 避免不必要的重渲染

---

## 📚 相關文檔

- **信號篩選邏輯**：`/SIGNAL_FILTERING_LOGIC.md`
- **整體概覽**：`00_APP_OVERVIEW.md`
- **首頁標籤**：`01_HOME_PAGE.md`
- **自選標籤**：`03_WATCHLIST_PAGE.md`