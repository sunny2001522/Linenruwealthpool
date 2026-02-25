# 📊 台股选股系统 - 完整信号筛选逻辑文档

## 🎯 系统概述

台股选股应用程序采用**多层级筛选架构**，支持多个信号（Signal）之间的 **AND 交集筛选**。用户可以同时选择多个筛选条件，系统会返回同时满足所有条件的股票。

---

## 📐 系统架构

### **1. 三层筛选系统**

```
┌─────────────────────────────────────────────────────┐
│                    第一层                            │
│              市场类型选择（Tab）                      │
│         【多方 Bull】    【空方 Bear】               │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│                    第二层                            │
│              基础策略筛选（Tab）                      │
│   多方: 站上週20MA / 強勢週20MA                      │
│   空方: 跌破週20MA / 弱勢週20MA                      │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│                    第三层                            │
│           高级信号筛选（Pills/Chips）                │
│   【领头羊】【211强势】【爆量】【股本】【周均量】      │
│                                                      │
│   ✅ 支持多选                                        │
│   ✅ AND 交集筛选                                    │
│   ✅ 点击变蓝色                                      │
│   ✅ 实时排序                                        │
└─────────────────────────────────────────────────────┘
```

---

## 🔍 筛选器详细说明

### **第一层：市场类型（Market Type）**

| 类型 | 值 | 说明 | 默认策略 |
|------|-----|------|---------|
| **多方** | `bull` | 看涨市场，红涨绿跌 | 站上週20MA |
| **空方** | `bear` | 看跌市场，做空策略 | 跌破週20MA |

**切换行为：**
- 切换市场类型时，自动切换到对应的默认策略
- 重置高级筛选器的部分选项（211强势/弱势切换）
- 切换领头羊/落水狗产业显示

---

### **第二层：基础策略筛选（Filter Type）**

#### **多方策略（Bull Market）**

| 策略名称 | 值 | 筛选条件 | 说明 |
|---------|-----|---------|------|
| **站上週20MA** | `above-ma` | `price > weeklyMa && weeklyDeviation > -5` | 价格站上20周均线，乖离率>-5% |
| **強勢週20MA** | `strong-ma` | `price > weeklyMa && weeklyDeviation > 0` | 价格站上20周均线，且乖离率为正 |

#### **空方策略（Bear Market）**

| 策略名称 | 值 | 筛选条件 | 说明 |
|---------|-----|---------|------|
| **跌破週20MA** | `below-ma` | `price < weeklyMa && weeklyDeviation < 5` | 价格跌破20周均线，乖离率<5% |
| **弱勢週20MA** | `weak-ma` | `price < weeklyMa && weeklyDeviation < 0` | 价格跌破20周均线，且乖离率为负 |

---

### **第三层：高级信号筛选（Advanced Filters）**

所有高级筛选都支持：
- ✅ **多选功能**：可以同时选择多个筛选器
- ✅ **AND 交集**：同时满足所有选中的条件
- ✅ **实时更新**：选择后立即更新股票列表
- ✅ **视觉反馈**：选中后按钮变蓝色渐层
- ✅ **自动排序**：选中的筛选器自动移到左边

---

## 📋 所有筛选器配置表

### **1. 产业筛选（Industry Filters）**

#### **1.1 领头羊产业（多方专用）**

| 属性 | 值 |
|------|-----|
| **字段名** | `leaderIndustry` |
| **类型** | `string \| null` |
| **显示时机** | 仅在多方（Bull）市场显示 |
| **按钮文字** | "領頭羊產業" |
| **选中样式** | 蓝金渐层 `bg-gradient-to-r from-[#4A90E2] via-[#5BA3F5] to-[#D4AF37]` |
| **排序优先级** | -1（永远在最左边） |

**下拉选项：**

**当期领头羊（前10）：**
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

**前期领头羊（前10）：**
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

**筛选逻辑：**
```typescript
if (filters.leaderIndustry) {
  stocks = stocks.filter(stock => 
    stock.industry === filters.leaderIndustry
  );
}
```

---

#### **1.2 落水狗产业（空方专用）**

| 属性 | 值 |
|------|-----|
| **字段名** | `loserIndustry` |
| **类型** | `string \| null` |
| **显示时机** | 仅在空方（Bear）市场显示 |
| **按钮文字** | "落水狗產業" |
| **选中样式** | 蓝金渐层 |
| **排序优先级** | -1（永远在最左边） |

**下拉选项：**

**当期落水狗（前10）：**
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

**前期落水狗（前10）：**
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

**筛选逻辑：**
```typescript
if (filters.loserIndustry) {
  stocks = stocks.filter(stock => 
    stock.industry === filters.loserIndustry
  );
}
```

---

### **2. 特殊形态筛选（Special Pattern Filters）**

#### **2.1 211强势股 / 211弱势股**

| 属性 | 值 |
|------|-----|
| **字段名** | `specialFilter` |
| **类型** | `"211" \| "210" \| null` |
| **值选项** | `211` - 211形态 |
| **多方文字** | "211強勢股" |
| **空方文字** | "211弱勢股" |
| **按钮默认文字** | 多方："211強勢" / 空方："211弱勢" |
| **选中样式** | 蓝金渐层 |
| **排序优先级** | 0 |
| **特殊行为** | ✅ 选中后结果自动排序往左 |

**211形态定义：**
- **多方（强势）**：连续2根红K，然后1根绿K回调，显示强势整理形态
- **空方（弱势）**：连续2根绿K，然后1根红K反弹，显示弱势整理形态

**筛选逻辑：**
```typescript
if (filters.specialFilter === "211") {
  stocks = stocks.filter(stock => {
    if (marketType === "bull") {
      // 多方211强势：检查K线形态
      return stock.has211BullPattern === true;
    } else {
      // 空方211弱势：检查K线形态
      return stock.has211BearPattern === true;
    }
  });
  
  // 选中后，按211评分排序
  stocks.sort((a, b) => b.pattern211Score - a.pattern211Score);
}
```

---

#### **2.2 210起涨股 / 210起跌股**

| 属性 | 值 |
|------|-----|
| **字段名** | `specialFilter` |
| **类型** | `"211" \| "210" \| null` |
| **值选项** | `210` - 210形态 |
| **多方文字** | "210起漲股" |
| **空方文字** | "210起跌股" |
| **选中样式** | 蓝金渐层 |
| **排序优先级** | 0 |
| **特殊行为** | ✅ 选中后结果自动排序往左 |

**210形态定义：**
- **多方（起涨）**：连续2根红K，然后1根十字星，显示即将突破
- **空方（起跌）**：连续2根绿K，然后1根十字星，显示即将跌破

**筛选逻辑：**
```typescript
if (filters.specialFilter === "210") {
  stocks = stocks.filter(stock => {
    if (marketType === "bull") {
      // 多方210起涨：检查K线形态
      return stock.has210BullPattern === true;
    } else {
      // 空方210起跌：检查K线形态
      return stock.has210BearPattern === true;
    }
  });
  
  // 选中后，按210评分排序
  stocks.sort((a, b) => b.pattern210Score - a.pattern210Score);
}
```

---

### **3. 成交量筛选（Volume Filters）**

#### **3.1 爆量筛选（多/空共用）**

| 属性 | 值 |
|------|-----|
| **字段名** | `volumePeriod`, `volumeMultiple` |
| **类型** | `("weekly" \| "monthly" \| null)`, `(1 \| 2 \| 4 \| null)` |
| **按钮默认文字** | "當週爆量1倍" |
| **选中样式** | 蓝金渐层 |
| **排序优先级** | 1 |
| **显示时机** | 多方和空方都显示 |

**下拉选项：**

**周期选择：**
- 當週（`weekly`）
- 當月（`monthly`）

**倍数选择：**
- 1倍（`1`）
- 2倍（`2`）
- 4倍（`4`）

**组合示例：**
- 當週爆量1倍 → `{ volumePeriod: "weekly", volumeMultiple: 1 }`
- 當週爆量2倍 → `{ volumePeriod: "weekly", volumeMultiple: 2 }`
- 當週爆量4倍 → `{ volumePeriod: "weekly", volumeMultiple: 4 }`
- 當月爆量1倍 → `{ volumePeriod: "monthly", volumeMultiple: 1 }`
- 當月爆量2倍 → `{ volumePeriod: "monthly", volumeMultiple: 2 }`
- 當月爆量4倍 → `{ volumePeriod: "monthly", volumeMultiple: 4 }`

**筛选逻辑：**
```typescript
if (filters.volumePeriod && filters.volumeMultiple) {
  stocks = stocks.filter(stock => {
    if (filters.volumePeriod === "weekly") {
      // 当周成交量倍数
      return stock.weeklyVolumeMultiple >= filters.volumeMultiple!;
    } else {
      // 当月成交量倍数
      return stock.monthlyVolumeMultiple >= filters.volumeMultiple!;
    }
  });
}
```

---

### **4. 股本筛选（Market Cap Filters）**

#### **4.1 股本大小筛选（多/空共用）**

| 属性 | 值 |
|------|-----|
| **字段名** | `marketCap` |
| **类型** | `"above20B" \| "below20B" \| null` |
| **按钮默认文字** | "股本大於20億" |
| **选中样式** | 蓝金渐层 |
| **排序优先级** | 2 |
| **显示时机** | 多方和空方都显示 |

**下拉选项：**
- 股本大於20億（`above20B`）
- 股本小於20億（`below20B`）

**筛选逻辑：**
```typescript
if (filters.marketCap) {
  stocks = stocks.filter(stock => {
    if (filters.marketCap === "above20B") {
      // 股本大于20亿新台币
      return stock.capitalBillion >= 20;
    } else {
      // 股本小于20亿新台币
      return stock.capitalBillion < 20;
    }
  });
}
```

---

### **5. 周均量筛选（Average Volume Filters）**

#### **5.1 周均量大小筛选（多/空共用）**

| 属性 | 值 |
|------|-----|
| **字段名** | `avgVolume` |
| **类型** | `"above1000" \| "below1000" \| null` |
| **按钮默认文字** | "周均量大於1000張" |
| **选中样式** | 蓝金渐层 |
| **排序优先级** | 3 |
| **显示时机** | 多方和空方都显示 |

**下拉选项：**
- 周均量大於1000張（`above1000`）
- 周均量小於1000張（`below1000`）

**筛选逻辑：**
```typescript
if (filters.avgVolume) {
  stocks = stocks.filter(stock => {
    if (filters.avgVolume === "above1000") {
      // 周均量大于1000张
      return stock.weeklyVolume >= 1000;
    } else {
      // 周均量小于1000张
      return stock.weeklyVolume < 1000;
    }
  });
}
```

---

## 🔗 AND 交集筛选逻辑

### **筛选执行顺序**

```typescript
// 1. 第一层：市场类型筛选（多方/空方）
let stocks = allStocks;

// 2. 第二层：基础策略筛选
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

// 3. 第三层：高级信号筛选（AND 交集）

// 3.1 产业筛选
if (marketType === "bull" && filters.leaderIndustry) {
  stocks = stocks.filter(stock => stock.industry === filters.leaderIndustry);
}

if (marketType === "bear" && filters.loserIndustry) {
  stocks = stocks.filter(stock => stock.industry === filters.loserIndustry);
}

// 3.2 特殊形态筛选（211 或 210）
if (filters.specialFilter === "211") {
  stocks = stocks.filter(stock => {
    return marketType === "bull" 
      ? stock.has211BullPattern 
      : stock.has211BearPattern;
  });
}

if (filters.specialFilter === "210") {
  stocks = stocks.filter(stock => {
    return marketType === "bull" 
      ? stock.has210BullPattern 
      : stock.has210BearPattern;
  });
}

// 3.3 爆量筛选
if (filters.volumePeriod && filters.volumeMultiple) {
  stocks = stocks.filter(stock => {
    const volumeMultiple = filters.volumePeriod === "weekly"
      ? stock.weeklyVolumeMultiple
      : stock.monthlyVolumeMultiple;
    return volumeMultiple >= filters.volumeMultiple!;
  });
}

// 3.4 股本筛选
if (filters.marketCap) {
  stocks = stocks.filter(stock => {
    return filters.marketCap === "above20B"
      ? stock.capitalBillion >= 20
      : stock.capitalBillion < 20;
  });
}

// 3.5 周均量筛选
if (filters.avgVolume) {
  stocks = stocks.filter(stock => {
    return filters.avgVolume === "above1000"
      ? stock.weeklyVolume >= 1000
      : stock.weeklyVolume < 1000;
  });
}

// 4. 计算恩如三部曲评分
stocks = stocks.map(stock => ({
  ...stock,
  trilogyScore: calculateTrilogyScore(stock, marketType, filterType)
}));

// 5. 排序
stocks.sort((a, b) => {
  // 根据 sortField 和 sortDirection 排序
  // 默认：先按三部曲评分，再按涨跌幅
  return b.trilogyScore - a.trilogyScore || b.changePercent - a.changePercent;
});
```

---

## 🎨 UI 交互行为

### **按钮状态设计**

#### **未选中状态：**
```tsx
className="bg-muted text-muted-foreground hover:bg-muted/80"
```
- 灰色背景
- 灰色文字
- 悬停时背景变深

#### **选中状态：**
```tsx
className="bg-gradient-to-r from-[#4A90E2] via-[#5BA3F5] to-[#D4AF37] text-white shadow-md"
```
- 蓝色到金色的渐层背景
- 白色文字
- 添加阴影效果

---

### **按钮排序逻辑**

选中的筛选器自动移动到左边：

```typescript
const sortedFilterButtons = filterButtons.sort((a, b) => {
  // 1. 选中的优先
  if (a.isActive && !b.isActive) return -1;
  if (!a.isActive && b.isActive) return 1;
  
  // 2. 相同状态下，按 order 排序
  return a.order - b.order;
});
```

**排序优先级（order 值）：**
- `-1`: 产业筛选（领头羊/落水狗）- 永远在最左边
- `0`: 特殊形态（211/210）
- `1`: 爆量筛选
- `2`: 股本筛选
- `3`: 周均量筛选

**示例：**

**未选中任何筛选时：**
```
[ 領頭羊產業 ] [ 211強勢 ] [ 當週爆量1倍 ] [ 股本大於20億 ] [ 周均量大於1000張 ]
```

**选中"當週爆量2倍"和"股本小於20億"后：**
```
[ 領頭羊產業 ] [ 當週爆量2倍 ] [ 股本小於20億 ] [ 211強勢 ] [ 周均量大於1000張 ]
     (未选)         (已选)           (已选)         (未选)         (未选)
```

---

### **清除所有筛选**

当有任何高级筛选被选中时，显示"清除"按钮：

```tsx
{hasActiveFilters && (
  <button onClick={clearAllFilters}>
    <X className="w-3 h-3" />
    <span>清除</span>
  </button>
)}
```

**hasActiveFilters 判断：**
```typescript
const hasActiveFilters = 
  filters.leaderIndustry !== null ||
  filters.loserIndustry !== null ||
  filters.specialFilter !== null ||
  (filters.volumePeriod !== null && filters.volumeMultiple !== null) ||
  filters.marketCap !== null ||
  filters.avgVolume !== null;
```

---

## 📊 数据结构定义

### **AdvancedFilterOptions 接口**

```typescript
export interface AdvancedFilterOptions {
  // 产业筛选
  leaderIndustry: string | null;      // 领头羊产业（多方）
  loserIndustry: string | null;       // 落水狗产业（空方）
  
  // 特殊形态筛选
  specialFilter: "211" | "210" | null;
  
  // 爆量筛选
  volumePeriod: "weekly" | "monthly" | null;
  volumeMultiple: 1 | 2 | 4 | null;
  
  // 股本筛选
  marketCap: "above20B" | "below20B" | null;
  
  // 周均量筛选
  avgVolume: "above1000" | "below1000" | null;
}
```

---

### **Stock 数据结构**

```typescript
interface Stock {
  // 基础信息
  code: string;                    // 股票代码
  name: string;                    // 股票名称
  industry: string;                // 产业分类
  
  // 价格信息
  price: number;                   // 当前价格
  changePercent: number;           // 涨跌幅 %
  
  // 均线信息
  weeklyMa: number;                // 20周均线价格
  weeklyDeviation: number;         // 乖离率 %
  weekly20MaPrice: number;         // 20周均线价格（用于排序）
  
  // 成交量信息
  weeklyVolume: number;            // 周均量（张）
  weeklyVolumeMultiple: number;    // 周爆量倍数
  monthlyVolumeMultiple: number;   // 月爆量倍数
  
  // 股本信息
  capitalBillion: number;          // 股本（亿新台币）
  
  // 形态信息
  has211BullPattern: boolean;      // 是否有211多方形态
  has211BearPattern: boolean;      // 是否有211空方形态
  has210BullPattern: boolean;      // 是否有210多方形态
  has210BearPattern: boolean;      // 是否有210起跌形态
  pattern211Score: number;         // 211形态评分（0-100）
  pattern210Score: number;         // 210形态评分（0-100）
  
  // 恩如三部曲评分
  trilogyScore: number;            // 总分（0-6）
  trilogy1: number;                // 挑噴出/回檔（0-2）
  trilogy2: number;                // 看型態（0-2）
  trilogy3: number;                // 看量找動能（0-2）
}
```

---

## 🔄 完整工作流程示例

### **示例1：多方 + 领头羊产业 + 211强势股 + 当周爆量2倍**

#### **1. 用户操作：**
1. 选择"多方"Tab
2. 选择"站上週20MA"策略
3. 点击"領頭羊產業" → 选择"電子上游-IC設計"
4. 点击"211強勢" → 选择"211強勢股"
5. 点击"當週爆量1倍" → 选择"當週" + "2倍"

#### **2. 筛选器状态：**
```typescript
{
  marketType: "bull",
  filterType: "above-ma",
  advancedFilters: {
    leaderIndustry: "電子上游-IC設計",
    loserIndustry: null,
    specialFilter: "211",
    volumePeriod: "weekly",
    volumeMultiple: 2,
    marketCap: null,
    avgVolume: null
  }
}
```

#### **3. UI 显示：**
```
多方 Tab（选中）  空方 Tab

站上週20MA（选中，蓝色下划线）  強勢週20MA

[ 電子上游-IC設計 ] [ 211強勢股 ] [ 當週爆量2倍 ] [ 股本大於20億 ] [ 周均量大於1000張 ] [X 清除]
   (蓝金渐层)        (蓝金渐层)      (蓝金渐层)         (灰色)           (灰色)
```

#### **4. 筛选执行：**
```typescript
// 第一层：多方市场
let stocks = allStocks;

// 第二层：站上週20MA
stocks = stocks.filter(stock => 
  stock.price > stock.weeklyMa && stock.weeklyDeviation > -5
);
// 结果：1000支 → 300支

// 第三层：领头羊产业
stocks = stocks.filter(stock => 
  stock.industry === "電子上游-IC設計"
);
// 结果：300支 → 25支

// 第三层：211强势股
stocks = stocks.filter(stock => 
  stock.has211BullPattern === true
);
// 结果：25支 → 8支

// 第三层：当周爆量2倍
stocks = stocks.filter(stock => 
  stock.weeklyVolumeMultiple >= 2
);
// 结果：8支 → 3支

// 计算三部曲评分
stocks = stocks.map(stock => ({
  ...stock,
  trilogyScore: calculateTrilogyScore(stock, "bull", "above-ma")
}));

// 排序：按211评分 + 三部曲评分
stocks.sort((a, b) => 
  b.pattern211Score - a.pattern211Score || 
  b.trilogyScore - a.trilogyScore ||
  b.changePercent - a.changePercent
);
```

#### **5. 最终结果：**
显示 **3支股票**，同时满足：
- ✅ 多方市场
- ✅ 价格站上20周均线
- ✅ 属于"電子上游-IC設計"产业
- ✅ 有211强势形态
- ✅ 当周成交量≥2倍

---

### **示例2：空方 + 落水狗产业 + 股本小于20亿**

#### **1. 用户操作：**
1. 选择"空方"Tab
2. 选择"跌破週20MA"策略
3. 点击"落水狗產業" → 选择"傳產-航運"
4. 点击"股本大於20億" → 选择"股本小於20億"

#### **2. 筛选器状态：**
```typescript
{
  marketType: "bear",
  filterType: "below-ma",
  advancedFilters: {
    leaderIndustry: null,
    loserIndustry: "傳產-航運",
    specialFilter: null,
    volumePeriod: null,
    volumeMultiple: null,
    marketCap: "below20B",
    avgVolume: null
  }
}
```

#### **3. UI 显示：**
```
多方 Tab   空方 Tab（选中）

跌破週20MA（选中，绿色下划线）  弱勢週20MA

[ 傳產-航運 ] [ 股本小於20億 ] [ 211弱勢 ] [ 當週爆量1倍 ] [ 周均量大於1000張 ] [X 清除]
  (蓝金渐层)     (蓝金渐层)        (灰色)        (灰色)            (灰色)
```

#### **4. 筛选执行：**
```typescript
// 第一层：空方市场
let stocks = allStocks;

// 第二层：跌破週20MA
stocks = stocks.filter(stock => 
  stock.price < stock.weeklyMa && stock.weeklyDeviation < 5
);
// 结果：1000支 → 400支

// 第三层：落水狗产业
stocks = stocks.filter(stock => 
  stock.industry === "傳產-航運"
);
// 结果：400支 → 15支

// 第三层：股本小于20亿
stocks = stocks.filter(stock => 
  stock.capitalBillion < 20
);
// 结果：15支 → 6支

// 计算三部曲评分
stocks = stocks.map(stock => ({
  ...stock,
  trilogyScore: calculateTrilogyScore(stock, "bear", "below-ma")
}));

// 排序：按三部曲评分 + 跌幅
stocks.sort((a, b) => 
  b.trilogyScore - a.trilogyScore ||
  a.changePercent - b.changePercent  // 空方：跌幅大的优先
);
```

#### **5. 最终结果：**
显示 **6支股票**，同时满足：
- ✅ 空方市场
- ✅ 价格跌破20周均线
- ✅ 属于"傳產-航運"产业
- ✅ 股本小于20亿新台币

---

## 🎯 特殊排序规则

### **默认排序（无211/210筛选）**

```typescript
stocks.sort((a, b) => {
  // 1. 先按三部曲总分降序
  if (b.trilogyScore !== a.trilogyScore) {
    return b.trilogyScore - a.trilogyScore;
  }
  
  // 2. 再按涨跌幅降序（多方）或升序（空方）
  if (marketType === "bull") {
    return b.changePercent - a.changePercent;  // 涨幅大的优先
  } else {
    return a.changePercent - b.changePercent;  // 跌幅大的优先
  }
});
```

---

### **211筛选后的排序**

当选择211强势/弱势时：

```typescript
if (filters.specialFilter === "211") {
  stocks.sort((a, b) => {
    // 1. 先按211形态评分降序
    if (b.pattern211Score !== a.pattern211Score) {
      return b.pattern211Score - a.pattern211Score;
    }
    
    // 2. 再按三部曲总分降序
    if (b.trilogyScore !== a.trilogyScore) {
      return b.trilogyScore - a.trilogyScore;
    }
    
    // 3. 最后按涨跌幅
    if (marketType === "bull") {
      return b.changePercent - a.changePercent;
    } else {
      return a.changePercent - b.changePercent;
    }
  });
}
```

---

### **210筛选后的排序**

当选择210起涨/起跌时：

```typescript
if (filters.specialFilter === "210") {
  stocks.sort((a, b) => {
    // 1. 先按210形态评分降序
    if (b.pattern210Score !== a.pattern210Score) {
      return b.pattern210Score - a.pattern210Score;
    }
    
    // 2. 再按三部曲总分降序
    if (b.trilogyScore !== a.trilogyScore) {
      return b.trilogyScore - a.trilogyScore;
    }
    
    // 3. 最后按涨跌幅
    if (marketType === "bull") {
      return b.changePercent - a.changePercent;
    } else {
      return a.changePercent - b.changePercent;
    }
  });
}
```

---

## 🔧 实现要点

### **1. 组件结构**

```
StockPickerPage / StockPicker2Page
├── StockFilters（市场类型 + 基础策略）
├── AdvancedFilters（高级信号筛选）
│   ├── 领头羊产业下拉
│   ├── 落水狗产业下拉
│   ├── 211/210筛选下拉
│   ├── 爆量筛选下拉
│   ├── 股本筛选下拉
│   └── 周均量筛选下拉
├── StockTable / StockCard（股票列表）
└── 清除按钮
```

---

### **2. 状态管理**

```typescript
// 页面组件状态
const [marketType, setMarketType] = useState<MarketType>("bull");
const [filterType, setFilterType] = useState<FilterType>("above-ma");
const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilterOptions>({
  leaderIndustry: null,
  loserIndustry: null,
  specialFilter: null,
  volumePeriod: null,
  volumeMultiple: null,
  marketCap: null,
  avgVolume: null
});

// 计算结果（useMemo）
const filteredAndSortedStocks = useMemo(() => {
  return applyAllFilters(allStocks, marketType, filterType, advancedFilters);
}, [allStocks, marketType, filterType, advancedFilters]);
```

---

### **3. 性能优化**

#### **使用 useMemo 缓存计算结果：**
```typescript
const filteredAndSortedStocks = useMemo(() => {
  // 只在依赖变化时重新计算
  return applyAllFilters(...);
}, [allStocks, marketType, filterType, advancedFilters]);
```

#### **避免不必要的渲染：**
```typescript
// AdvancedFilters 组件
export const AdvancedFilters = React.memo(({ 
  filters, 
  onChange, 
  marketType 
}: AdvancedFiltersProps) => {
  // ...
});
```

---

### **4. Toggle 功能**

点击已选中的筛选器会取消选择：

```typescript
const handleSpecialFilterClick = (value: "211" | "210") => {
  if (filters.specialFilter === value) {
    // 点击已选中的，取消选择
    onChange({ ...filters, specialFilter: null });
  } else {
    // 选择新的
    onChange({ ...filters, specialFilter: value });
  }
  setShowSpecialFilter(false);
};
```

---

## 📱 响应式设计

### **筛选器栏横向滚动**

```tsx
<div className="overflow-x-auto">
  <div className="flex gap-2 min-w-max pb-2">
    {/* 筛选器按钮 */}
  </div>
</div>
```

- `overflow-x-auto`：横向滚动
- `min-w-max`：防止按钮换行
- `pb-2`：底部留白，避免滚动条遮挡

---

### **下拉菜单定位**

使用 `fixed` + `getBoundingClientRect()`：

```typescript
useEffect(() => {
  if (showSpecialFilter && specialFilterRef.current) {
    const rect = specialFilterRef.current.getBoundingClientRect();
    setSpecialFilterPos({
      top: rect.bottom + 4,  // 按钮下方4px
      left: rect.left         // 左对齐
    });
  }
}, [showSpecialFilter]);
```

```tsx
<div
  ref={specialFilterDropdownRef}
  className="fixed ..."
  style={{
    top: specialFilterPos.top,
    left: specialFilterPos.left
  }}
>
  {/* 下拉内容 */}
</div>
```

---

## 🎨 样式系统

### **Tailwind 配色方案**

#### **主色调（蓝色）：**
- `#4A90E2` - 主蓝色
- `#5BA3F5` - 浅蓝色
- `#6BB6FF` - 亮蓝色

#### **强调色（金色）：**
- `#D4AF37` - 金色

#### **涨跌颜色（台股规则）：**
- 红色（涨）：`text-chart-2`
- 绿色（跌）：`text-chart-3`

---

### **渐层按钮样式**

#### **选中状态渐层：**
```css
bg-gradient-to-r from-[#4A90E2] via-[#5BA3F5] to-[#D4AF37]
```
- 从蓝色渐变到金色
- 视觉效果：✨ 高级感

#### **Tab 下划线渐层：**
```css
bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF]
```
- 蓝色渐变
- 视觉效果：🌊 流动感

---

### **下拉菜单毛玻璃效果**

```css
backdrop-blur-2xl bg-black/40 border border-white/10 rounded-2xl shadow-2xl
```
- `backdrop-blur-2xl`：强毛玻璃效果
- `bg-black/40`：40%透明黑色背景
- `border-white/10`：10%透明白色边框
- 视觉效果：💎 磨砂玻璃质感

---

## 🚀 未来扩展

### **1. 更多筛选器**

可以添加的筛选器：
- ✅ KD指标（K值 > D值）
- ✅ RSI指标（超买/超卖）
- ✅ MACD指标（金叉/死叉）
- ✅ 布林通道（突破上轨/下轨）
- ✅ 外资持股比例
- ✅ 融资融券比例

---

### **2. 自定义筛选组合**

允许用户保存常用的筛选组合：

```typescript
interface SavedFilter {
  id: string;
  name: string;
  marketType: MarketType;
  filterType: FilterType;
  advancedFilters: AdvancedFilterOptions;
  createdAt: Date;
}

// 示例：
const myFavoriteFilter: SavedFilter = {
  id: "abc123",
  name: "我的強勢股組合",
  marketType: "bull",
  filterType: "strong-ma",
  advancedFilters: {
    leaderIndustry: "電子上游-IC設計",
    specialFilter: "211",
    volumePeriod: "weekly",
    volumeMultiple: 2,
    marketCap: "above20B",
    avgVolume: "above1000"
  },
  createdAt: new Date()
};
```

---

### **3. 筛选结果统计**

显示筛选结果的统计信息：

```tsx
<div className="stats">
  <div>符合條件：{filteredStocks.length} 支</div>
  <div>平均漲跌：{avgChangePercent.toFixed(2)}%</div>
  <div>平均三部曲：{avgTrilogyScore.toFixed(1)} 分</div>
  <div>平均市值：{avgMarketCap.toFixed(1)} 億</div>
</div>
```

---

### **4. 导出功能**

导出筛选结果为 CSV 或 Excel：

```typescript
function exportToCSV(stocks: Stock[]) {
  const csv = [
    // 表头
    "股票代碼,股票名稱,產業,價格,漲跌幅,三部曲總分",
    // 数据行
    ...stocks.map(stock => 
      `${stock.code},${stock.name},${stock.industry},${stock.price},${stock.changePercent},${stock.trilogyScore}`
    )
  ].join("\n");
  
  // 触发下载
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `選股結果_${new Date().toISOString()}.csv`;
  link.click();
}
```

---

## 📚 总结

### **核心特性：**

| 特性 | 说明 |
|------|------|
| **三层筛选** | 市场类型 → 基础策略 → 高级信号 |
| **AND 交集** | 所有选中的筛选器同时生效 |
| **实时更新** | 选择后立即更新结果 |
| **视觉反馈** | 选中后按钮变蓝金渐层 |
| **自动排序** | 选中的筛选器移到左边 |
| **Toggle 功能** | 点击已选中的可取消 |
| **清除按钮** | 一键清除所有筛选 |
| **响应式设计** | 横向滚动，适配移动端 |

---

### **筛选器总览：**

| 筛选器 | 多方 | 空方 | 可多选 | 排序 |
|--------|------|------|--------|------|
| 领头羊产业 | ✅ | ❌ | ❌ | -1 |
| 落水狗产业 | ❌ | ✅ | ❌ | -1 |
| 211强势/弱势 | ✅ | ✅ | ❌ | 0 |
| 210起涨/起跌 | ✅ | ✅ | ❌ | 0 |
| 当周/月爆量 | ✅ | ✅ | ❌ | 1 |
| 股本大小 | ✅ | ✅ | ❌ | 2 |
| 周均量大小 | ✅ | ✅ | ❌ | 3 |

---

### **AND 交集示例：**

**选择：多方 + 站上週20MA + 電子上游-IC設計 + 211強勢股 + 當週爆量2倍 + 股本大於20億**

**结果：** 同时满足所有6个条件的股票

---

这就是完整的信号筛选系统逻辑！🎯✨📊
