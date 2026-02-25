# 📺 台股應用程式 - 內容專區完整邏輯文檔

## 🎯 系統概述

內容專區採用 **YouTube 風格設計**，提供多元化的學習內容，包含影音、講座、文章、Podcast 四大類型。所有內容支援收藏功能，VIP 內容對非專業版用戶實施鎖定和模糊效果。

---

## 📐 頁面架構

### **整體結構**

```
┌─────────────────────────────────────────────────────┐
│                   頂部導航欄                         │
│              內容專區標題 + 搜尋                      │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│                  四大分頁 Tabs                       │
│    【影音】 【講座】 【文章】 【Podcast】           │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│                  篩選器區域                          │
│    分類 / 排序 / 時間範圍 / VIP篩選                 │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│                  內容卡片網格                        │
│   ┌──────┐ ┌──────┐ ┌──────┐                      │
│   │ 卡片1│ │ 卡片2│ │ 卡片3│  ← YouTube風格        │
│   └──────┘ └──────┘ └──────┘                      │
│   ┌──────┐ ┌──────┐ ┌──────┐                      │
│   │ 卡片4│ │ 卡片5│ │ 卡片6│                      │
│   └──────┘ └──────┘ └──────┘                      │
└─────────────────────────────────────────────────────┘
```

---

## 🎬 四大分頁詳細說明

### **1️⃣ 影音（Video）**

#### **內容類型：**
- 教學影片
- 市場分析
- 操作示範
- 盤後解析
- 個股解讀

#### **卡片設計（YouTube 風格）：**

```
┌─────────────────────────────────┐
│                                 │
│      影片縮圖（16:9）            │
│                                 │
│  ┌─────┐         🔒 VIP         │ ← VIP標籤
│  │時長 │                        │
│  └─────┘                        │
├─────────────────────────────────┤
│ 🔴 LIVE / 📹 影片圖標            │ ← 狀態圖標
│                                 │
│ 恩如老師：台股多頭起漲訊號解析    │ ← 標題
│                                 │
│ 👁 12.5萬次觀看 • 2天前          │ ← 觀看數 + 時間
│                                 │
│ ⏱ 25:30  📁 市場分析  ❤️ 1,234  │ ← 時長/分類/收藏數
│                                 │
│ [ 觀看影片 ]          ❤️ 收藏    │ ← 操作按鈕
└─────────────────────────────────┘
```

#### **VIP 鎖定效果（非專業版用戶）：**

```
┌─────────────────────────────────┐
│       模糊效果                   │
│  ╔═════════════════════╗        │
│  ║   🔒 VIP 專屬內容   ║        │ ← 鎖頭圖標（金色）
│  ║                     ║        │
│  ║  升級專業版即可觀看  ║        │
│  ║                     ║        │
│  ║  [ 立即升級 ]       ║        │
│  ╚═════════════════════╝        │
├─────────────────────────────────┤
│ 🔒 恩如老師：VIP選股策略大公開    │
│ （標題變灰）                     │
│ 僅限專業版會員                   │
│ [ 升級專業版 ]                  │
└─────────────────────────────────┘
```

#### **內容資訊：**

| 欄位 | 說明 | 範例 |
|------|------|------|
| **縮圖** | 16:9 高畫質封面 | 1280x720px |
| **時長** | 影片長度 | "25:30" |
| **標題** | 內容標題（最多2行） | "恩如老師：台股多頭起漲訊號解析" |
| **觀看數** | 累積觀看次數 | "12.5萬次觀看" |
| **發布時間** | 相對時間 | "2天前" / "1週前" / "3個月前" |
| **分類** | 內容分類標籤 | "市場分析" / "選股技巧" / "盤後解析" |
| **收藏數** | 被收藏次數 | "1,234" |
| **VIP標籤** | 是否為VIP專屬 | 🔒 VIP |
| **直播狀態** | 是否正在直播 | 🔴 LIVE |

---

### **2️⃣ 講座（Webinar）**

#### **內容類型：**
- 線上講座
- 研討會
- 大師課程
- 專題討論
- Q&A 問答

#### **卡片設計：**

```
┌─────────────────────────────────┐
│                                 │
│      講座海報（16:9）            │
│                                 │
│  ┌──────────┐      🔒 VIP       │
│  │ 2024/02/10│                  │
│  │ 週六 14:00│                  │
│  └──────────┘                   │
├─────────────────────────────────┤
│ 📅 即將開始 / 🎥 已結束           │ ← 講座狀態
│                                 │
│ 恩如老師：2024 Q1 台股投資策略   │ ← 標題
│                                 │
│ 👥 已報名 856 人 • 剩餘 144 名額 │ ← 報名狀態
│                                 │
│ ⏱ 2小時  📁 投資策略  ❤️ 2,156  │
│                                 │
│ [ 立即報名 ]          ❤️ 收藏    │ ← 操作按鈕
└─────────────────────────────────┘
```

#### **講座狀態標籤：**

| 狀態 | 圖標 | 顏色 | 說明 |
|------|------|------|------|
| **即將開始** | 📅 | 藍色 | 未來30天內的講座 |
| **報名中** | 🎟️ | 綠色 | 開放報名中 |
| **已額滿** | ⛔ | 紅色 | 報名人數已滿 |
| **進行中** | 🔴 LIVE | 紅色 | 正在直播 |
| **已結束** | 🎥 | 灰色 | 可觀看回放 |
| **VIP 專屬** | 🔒 | 金色 | 僅限專業版 |

#### **內容資訊：**

| 欄位 | 說明 | 範例 |
|------|------|------|
| **海報** | 講座宣傳圖 | 1280x720px |
| **日期時間** | 講座時間 | "2024/02/10 週六 14:00" |
| **講師** | 主講人 | "恩如老師" |
| **標題** | 講座主題 | "2024 Q1 台股投資策略" |
| **報名人數** | 已報名/總名額 | "已報名 856 人 • 剩餘 144 名額" |
| **時長** | 預計時長 | "2小時" |
| **分類** | 講座類型 | "投資策略" / "技術分析" / "產業趨勢" |
| **收藏數** | 被收藏次數 | "2,156" |
| **VIP標籤** | 是否為VIP專屬 | 🔒 VIP |

---

### **3️⃣ 文章（Article）**

#### **內容類型：**
- 市場評論
- 技術教學
- 產業分析
- 投資心法
- 個股研報

#### **卡片設計：**

```
┌─────────────────────────────────┐
│                                 │
│      文章封面圖（16:9）          │
│                                 │
│                     🔒 VIP       │
│  📝 深度分析                     │
│                                 │
├─────────────────────────────────┤
│                                 │
│ 台積電 Q4 財報解析：              │ ← 標題
│ AI 晶片訂單爆量，股價上看 650 元  │
│                                 │
│ 2024年第一季，台積電在AI晶片領域  │ ← 摘要（2-3行）
│ 的訂單量創下歷史新高，預估營收將   │
│ 年增 25%...                      │
│                                 │
│ 👁 8,500次閱讀 • 3天前           │ ← 閱讀數 + 時間
│                                 │
│ ⏱ 8分鐘閱讀  📁 個股分析  ❤️ 567 │
│                                 │
│ [ 閱讀全文 ]          ❤️ 收藏    │ ← 操作按鈕
└─────────────────────────────────┘
```

#### **VIP 鎖定效果（非專業版用戶）：**

```
┌─────────────────────────────────┐
│       封面圖（半透明模糊）        │
│                                 │
│  🔒 VIP 專屬文章                 │
│                                 │
├─────────────────────────────────┤
│ 🔒 恩如三部曲進階技巧：           │
│ 如何精準抓住起漲點                │
│                                 │
│ 本文深入解析恩如三部曲的進階應用   │
│ 方法，包含實戰案例和... 【僅顯示   │
│ 前100字，後續內容模糊處理】■■■■  │
│                                 │
│ 僅限專業版會員 • VIP 專屬          │
│                                 │
│ [ 升級專業版解鎖 ]               │
└─────────────────────────────────┘
```

#### **內容資訊：**

| 欄位 | 說明 | 範例 |
|------|------|------|
| **封面圖** | 文章配圖 | 1280x720px |
| **標題** | 文章標題（最多2行） | "台積電 Q4 財報解析" |
| **摘要** | 內容摘要（2-3行） | "2024年第一季，台積電在AI..." |
| **閱讀數** | 累積閱讀次數 | "8,500次閱讀" |
| **發布時間** | 相對時間 | "3天前" |
| **閱讀時長** | 預估閱讀時間 | "8分鐘閱讀" |
| **分類** | 文章類型 | "個股分析" / "市場評論" / "技術教學" |
| **收藏數** | 被收藏次數 | "567" |
| **VIP標籤** | 是否為VIP專屬 | 🔒 VIP |
| **標籤** | 文章類型標籤 | 📝 深度分析 / 💡 快訊 / 📊 數據報告 |

---

### **4️⃣ Podcast（播客）**

#### **內容類型：**
- 音頻節目
- 市場廣播
- 專家訪談
- 投資故事
- 每日解盤

#### **卡片設計：**

```
┌─────────────────────────────────┐
│                                 │
│      節目封面（正方形 1:1）       │
│                                 │
│         ▶️ 播放圖標              │
│                                 │
│            🔒 VIP               │
├─────────────────────────────────┤
│ 🎙️ EP.125                       │ ← 集數
│                                 │
│ 恩如聊股市：本週多頭選股策略      │ ← 標題
│                                 │
│ 本週恩如老師將分享如何在多頭市場   │ ← 描述（2行）
│ 中精選優質個股...                │
│                                 │
│ 👂 5.2萬次收聽 • 1天前           │ ← 收聽數 + 時間
│                                 │
│ ⏱ 35:20  📁 選股策略  ❤️ 892    │
│                                 │
│ [ ▶️ 播放 ]           ❤️ 收藏    │ ← 操作按鈕
└─────────────────────────────────┘
```

#### **播放器介面（點擊後）：**

```
┌─────────────────────────────────┐
│                                 │
│      節目封面（大圖）            │
│                                 │
│         ⏸️ 暫停中               │
│                                 │
├─────────────────────────────────┤
│ 🎙️ 恩如聊股市 EP.125             │
│ 本週多頭選股策略                  │
│                                 │
│ ━━━━━━●━━━━━━━━━━━━━━           │ ← 進度條
│ 12:35                    35:20 │
│                                 │
│     ⏮️   ⏪   ▶️   ⏩   ⏭️      │ ← 播放控制
│                                 │
│     倍速：1.0x   🔊 音量：70%    │
│                                 │
│ [ 下載音檔 ]  [ 查看逐字稿 ]     │ ← VIP功能
└─────────────────────────────────┘
```

#### **內容資訊：**

| 欄位 | 說明 | 範例 |
|------|------|------|
| **封面** | 節目封面（正方形） | 1000x1000px |
| **集數** | 節目集數 | "EP.125" |
| **標題** | 節目標題 | "本週多頭選股策略" |
| **描述** | 節目簡介（2-3行） | "本週恩如老師將分享..." |
| **收聽數** | 累積收聽次數 | "5.2萬次收聽" |
| **發布時間** | 相對時間 | "1天前" |
| **時長** | 音頻長度 | "35:20" |
| **分類** | 節目類型 | "選股策略" / "市場分析" / "專家訪談" |
| **收藏數** | 被收藏次數 | "892" |
| **VIP標籤** | 是否為VIP專屬 | 🔒 VIP |
| **音質** | 音頻品質 | 🎵 高音質 / 🎶 標準 |

---

## 🔍 篩選器系統

### **通用篩選器（四個分頁共用）**

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  [ 全部分類 ▼ ]  [ 最新發布 ▼ ]  [ 全部時間 ▼ ]    │
│                                                      │
│  [ 🔓 全部內容 ]  [ 🔒 僅 VIP 內容 ]                │
│                                                      │
│  [ ❤️ 僅顯示收藏 ]  🔍 [搜尋框]                     │
└──────────────────────────────────────────────────────┘
```

---

### **1️⃣ 分類篩選（Category Filter）**

#### **影音分類：**
```
[ 全部分類 ▼ ]
  ├─ 全部
  ├─ 市場分析
  ├─ 選股技巧
  ├─ 技術指標
  ├─ 盤後解析
  ├─ 個股解讀
  ├─ 產業趨勢
  └─ 投資心法
```

#### **講座分類：**
```
[ 全部分類 ▼ ]
  ├─ 全部
  ├─ 投資策略
  ├─ 技術分析
  ├─ 產業趨勢
  ├─ 大師課程
  ├─ Q&A 問答
  └─ 專題討論
```

#### **文章分類：**
```
[ 全部分類 ▼ ]
  ├─ 全部
  ├─ 市場評論
  ├─ 技術教學
  ├─ 產業分析
  ├─ 投資心法
  ├─ 個股研報
  ├─ 數據報告
  └─ 快訊新聞
```

#### **Podcast 分類：**
```
[ 全部分類 ▼ ]
  ├─ 全部
  ├─ 選股策略
  ├─ 市場分析
  ├─ 專家訪談
  ├─ 投資故事
  ├─ 每日解盤
  └─ 聽眾 Q&A
```

---

### **2️⃣ 排序篩選（Sort Filter）**

```
[ 最新發布 ▼ ]
  ├─ 最新發布（預設）
  ├─ 最多觀看/閱讀
  ├─ 最多收藏
  ├─ 最高評分
  └─ 時長：短到長
```

**排序邏輯：**

| 排序方式 | 欄位 | 方向 | 說明 |
|---------|------|------|------|
| **最新發布** | `publishedAt` | 降序 | 最新發布的在前面 |
| **最多觀看** | `viewCount` | 降序 | 觀看數/閱讀數最多 |
| **最多收藏** | `favoriteCount` | 降序 | 收藏數最多 |
| **最高評分** | `rating` | 降序 | 評分最高（1-5星） |
| **時長短到長** | `duration` | 升序 | 時長短的在前面 |

---

### **3️⃣ 時間範圍篩選（Time Range Filter）**

```
[ 全部時間 ▼ ]
  ├─ 全部時間（預設）
  ├─ 今天
  ├─ 本週
  ├─ 本月
  ├─ 最近3個月
  └─ 最近一年
```

**篩選邏輯：**

```typescript
const now = new Date();
const ranges = {
  today: new Date(now.setHours(0, 0, 0, 0)),
  thisWeek: new Date(now.setDate(now.getDate() - 7)),
  thisMonth: new Date(now.setMonth(now.getMonth() - 1)),
  last3Months: new Date(now.setMonth(now.getMonth() - 3)),
  lastYear: new Date(now.setFullYear(now.getFullYear() - 1))
};

const filteredContent = content.filter(item => 
  item.publishedAt >= ranges[selectedTimeRange]
);
```

---

### **4️⃣ VIP 篩選（VIP Filter）**

```
[ 🔓 全部內容 ]  [ 🔒 僅 VIP 內容 ]
    (預設)           (切換按鈕)
```

**篩選邏輯：**

```typescript
// 全部內容（預設）
const allContent = content;

// 僅 VIP 內容
const vipContent = content.filter(item => item.isVipOnly === true);
```

**按鈕樣式：**

```tsx
// 未選中
<button className="px-4 py-2 rounded-full bg-muted text-muted-foreground">
  🔓 全部內容
</button>

// 選中
<button className="px-4 py-2 rounded-full bg-gradient-to-r from-[#4A90E2] to-[#D4AF37] text-white">
  🔒 僅 VIP 內容
</button>
```

---

### **5️⃣ 收藏篩選（Favorite Filter）**

```
[ ❤️ 僅顯示收藏 ]
    (切換按鈕)
```

**篩選邏輯：**

```typescript
// 僅顯示已收藏的內容
const favoriteContent = content.filter(item => 
  user.favoriteContentIds.includes(item.id)
);
```

**按鈕樣式：**

```tsx
// 未選中
<button className="px-4 py-2 rounded-full border border-border text-muted-foreground">
  🤍 僅顯示收藏
</button>

// 選中
<button className="px-4 py-2 rounded-full bg-pink-500 text-white">
  ❤️ 僅顯示收藏
</button>
```

---

### **6️⃣ 搜尋功能（Search）**

```
┌──────────────────────────────────┐
│ 🔍  搜尋標題、關鍵字...          │
└──────────────────────────────────┘
```

**搜尋邏輯：**

```typescript
const searchResults = content.filter(item => {
  const query = searchQuery.toLowerCase();
  return (
    item.title.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query) ||
    item.category.toLowerCase().includes(query) ||
    item.tags.some(tag => tag.toLowerCase().includes(query))
  );
});
```

**搜尋範圍：**
- ✅ 標題
- ✅ 描述/摘要
- ✅ 分類
- ✅ 標籤
- ✅ 作者名稱

---

## ❤️ 收藏功能

### **收藏按鈕設計**

#### **未收藏狀態：**
```tsx
<button className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:bg-pink-50 hover:border-pink-300 transition-all">
  🤍 收藏
</button>
```

#### **已收藏狀態：**
```tsx
<button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition-all">
  ❤️ 已收藏
</button>
```

---

### **收藏動畫效果**

點擊收藏按鈕時：

```tsx
// 1. 愛心放大動畫
<motion.div
  animate={{ scale: [1, 1.3, 1] }}
  transition={{ duration: 0.3 }}
>
  ❤️
</motion.div>

// 2. 粒子特效（可選）
<motion.div
  initial={{ opacity: 1, scale: 1 }}
  animate={{ opacity: 0, scale: 2 }}
  transition={{ duration: 0.5 }}
>
  💖
</motion.div>
```

---

### **收藏數量顯示**

```tsx
<div className="flex items-center gap-1 text-sm text-muted-foreground">
  ❤️ <span>{favoriteCount.toLocaleString()}</span>
</div>
```

**數量格式化：**
- 小於 1,000：顯示實際數字（如 "567"）
- 1,000 - 9,999：顯示千位（如 "5.2千"）
- 10,000+：顯示萬位（如 "12.5萬"）

```typescript
function formatCount(count: number): string {
  if (count < 1000) return count.toString();
  if (count < 10000) return `${(count / 1000).toFixed(1)}千`;
  return `${(count / 10000).toFixed(1)}萬`;
}
```

---

### **收藏資料結構**

```typescript
interface UserFavorites {
  userId: string;
  favorites: {
    videos: string[];      // 影音ID列表
    webinars: string[];    // 講座ID列表
    articles: string[];    // 文章ID列表
    podcasts: string[];    // Podcast ID列表
  };
  totalCount: number;      // 總收藏數
  updatedAt: Date;         // 最後更新時間
}
```

---

### **收藏功能邏輯**

```typescript
const toggleFavorite = async (contentId: string, contentType: ContentType) => {
  const isFavorited = user.favorites[contentType].includes(contentId);
  
  if (isFavorited) {
    // 取消收藏
    await removeFavorite(contentId, contentType);
    showToast("已取消收藏", "success");
  } else {
    // 加入收藏
    await addFavorite(contentId, contentType);
    showToast("已加入收藏", "success");
    
    // 播放動畫
    playFavoriteAnimation();
  }
  
  // 更新本地狀態
  updateFavoritesState(contentId, contentType, !isFavorited);
};
```

---

## 🔒 VIP 鎖定功能

### **專業版 vs 試用版差異**

| 功能 | 試用版 | 專業版 |
|------|--------|--------|
| **免費內容** | ✅ 完整觀看 | ✅ 完整觀看 |
| **VIP 影音** | ❌ 鎖定+模糊 | ✅ 完整觀看 |
| **VIP 講座** | ❌ 無法報名 | ✅ 可報名參加 |
| **VIP 文章** | ⚠️ 僅前100字 | ✅ 完整閱讀 |
| **VIP Podcast** | ❌ 無法播放 | ✅ 完整收聽 |
| **下載功能** | ❌ 不可用 | ✅ 可下載 |
| **逐字稿** | ❌ 不可用 | ✅ 可查看 |

---

### **VIP 鎖定視覺效果**

#### **1️⃣ 卡片鎖定效果**

```tsx
{/* VIP 內容卡片 - 試用版用戶 */}
<div className="relative">
  {/* 模糊背景 */}
  <div className="filter blur-md opacity-50">
    <img src={thumbnail} alt={title} />
  </div>
  
  {/* 鎖頭遮罩 */}
  <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="text-center space-y-3">
      {/* 金色鎖頭圖標 */}
      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] flex items-center justify-center">
        <Lock className="w-8 h-8 text-white" />
      </div>
      
      {/* 提示文字 */}
      <div className="text-white">
        <p className="text-lg font-bold">VIP 專屬內容</p>
        <p className="text-sm text-white/80">升級專業版即可觀看</p>
      </div>
      
      {/* 升級按鈕 */}
      <button className="px-6 py-2 rounded-full bg-gradient-to-r from-[#4A90E2] to-[#D4AF37] text-white font-medium hover:shadow-lg transition-all">
        立即升級
      </button>
    </div>
  </div>
</div>
```

---

#### **2️⃣ 文章部分鎖定效果**

```tsx
{/* VIP 文章 - 試用版用戶（顯示前100字）*/}
<div className="relative">
  {/* 可見部分（前100字）*/}
  <div className="mb-4">
    <p className="text-base leading-relaxed">
      {content.substring(0, 100)}...
    </p>
  </div>
  
  {/* 模糊漸層遮罩 */}
  <div className="relative">
    {/* 模糊內容 */}
    <div className="filter blur-sm select-none pointer-events-none">
      <p className="text-base leading-relaxed text-muted-foreground">
        {content.substring(100, 300)}...
      </p>
    </div>
    
    {/* 漸層遮罩 */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
  </div>
  
  {/* 解鎖提示 */}
  <div className="mt-6 p-6 rounded-xl border-2 border-[#D4AF37] bg-gradient-to-br from-[#D4AF37]/10 to-transparent text-center">
    <Lock className="w-10 h-10 mx-auto mb-3 text-[#D4AF37]" />
    <p className="text-lg font-bold mb-2">完整內容需要專業版會員</p>
    <p className="text-sm text-muted-foreground mb-4">
      升級後即可解鎖所有 VIP 專屬文章
    </p>
    <button className="px-8 py-3 rounded-full bg-gradient-to-r from-[#4A90E2] to-[#D4AF37] text-white font-medium hover:shadow-lg transition-all">
      立即升級專業版
    </button>
  </div>
</div>
```

---

#### **3️⃣ 播放器鎖定效果**

```tsx
{/* VIP Podcast - 試用版用戶 */}
<div className="relative">
  {/* 播放器（禁用狀態）*/}
  <div className="filter grayscale opacity-50 pointer-events-none">
    <audio controls disabled>
      <source src={audioUrl} type="audio/mpeg" />
    </audio>
  </div>
  
  {/* 鎖定遮罩 */}
  <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-xl">
    <div className="text-center space-y-3 px-6">
      <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] flex items-center justify-center animate-pulse">
        <Lock className="w-10 h-10 text-white" />
      </div>
      <p className="text-white text-xl font-bold">VIP 專屬音頻</p>
      <p className="text-white/80 text-sm">升級專業版解鎖完整內容</p>
      <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#4A90E2] to-[#D4AF37] text-white font-medium hover:shadow-xl transition-all">
        立即升級
      </button>
    </div>
  </div>
</div>
```

---

### **VIP 標籤設計**

#### **卡片右上角標籤：**

```tsx
{/* 金色 VIP 標籤 */}
<div className="absolute top-2 right-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-white text-xs font-bold shadow-lg flex items-center gap-1">
  <Lock className="w-3 h-3" />
  <span>VIP</span>
</div>
```

#### **列表項標籤：**

```tsx
{/* 小型 VIP 標籤 */}
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-medium border border-[#D4AF37]/30">
  🔒 VIP
</span>
```

---

## 📊 資料結構定義

### **Content 基礎介面**

```typescript
interface BaseContent {
  id: string;                    // 唯一ID
  type: ContentType;             // 內容類型
  title: string;                 // 標題
  description: string;           // 描述/摘要
  thumbnail: string;             // 縮圖URL
  category: string;              // 分類
  tags: string[];                // 標籤
  publishedAt: Date;             // 發布時間
  viewCount: number;             // 觀看/閱讀數
  favoriteCount: number;         // 收藏數
  rating: number;                // 評分（1-5星）
  duration: number;              // 時長（秒）
  isVipOnly: boolean;            // 是否為VIP專屬
  author: {
    name: string;                // 作者名稱
    avatar: string;              // 作者頭像
  };
}

type ContentType = "video" | "webinar" | "article" | "podcast";
```

---

### **Video 影音介面**

```typescript
interface VideoContent extends BaseContent {
  type: "video";
  videoUrl: string;              // 影片URL
  quality: VideoQuality[];       // 可用畫質
  subtitles: Subtitle[];         // 字幕
  isLive: boolean;               // 是否為直播
  liveStartTime?: Date;          // 直播開始時間
  chapters: Chapter[];           // 章節標記
}

interface VideoQuality {
  label: string;                 // 畫質標籤（如 "1080p"）
  url: string;                   // 影片URL
  bitrate: number;               // 位元率
}

interface Subtitle {
  language: string;              // 語言（如 "zh-TW"）
  url: string;                   // 字幕檔URL
}

interface Chapter {
  time: number;                  // 時間點（秒）
  title: string;                 // 章節標題
}
```

---

### **Webinar 講座介面**

```typescript
interface WebinarContent extends BaseContent {
  type: "webinar";
  webinarDate: Date;             // 講座日期時間
  registrationLimit: number;     // 報名人數上限
  registeredCount: number;       // 已報名人數
  status: WebinarStatus;         // 講座狀態
  liveUrl?: string;              // 直播URL（進行中時）
  replayUrl?: string;            // 回放URL（已結束時）
  speakers: Speaker[];           // 講師資訊
  agenda: string[];              // 講座議程
}

type WebinarStatus = 
  | "upcoming"      // 即將開始
  | "registering"   // 報名中
  | "full"          // 已額滿
  | "live"          // 進行中
  | "ended"         // 已結束
  | "vip-only";     // VIP專屬

interface Speaker {
  name: string;                  // 講師名稱
  title: string;                 // 講師頭銜
  avatar: string;                // 講師頭像
  bio: string;                   // 講師簡介
}
```

---

### **Article 文章介面**

```typescript
interface ArticleContent extends BaseContent {
  type: "article";
  content: string;               // 文章內容（Markdown或HTML）
  coverImage: string;            // 封面圖
  readingTime: number;           // 閱讀時間（分鐘）
  wordCount: number;             // 字數
  relatedArticles: string[];     // 相關文章ID
  tableOfContents: TOCItem[];    // 目錄
}

interface TOCItem {
  level: number;                 // 標題層級（1-6）
  title: string;                 // 標題文字
  anchor: string;                // 錨點ID
}
```

---

### **Podcast 播客介面**

```typescript
interface PodcastContent extends BaseContent {
  type: "podcast";
  audioUrl: string;              // 音頻URL
  episodeNumber: number;         // 集數
  season?: number;               // 季數（可選）
  transcript?: string;           // 逐字稿（VIP功能）
  downloadUrl?: string;          // 下載URL（VIP功能）
  listenCount: number;           // 收聽次數
  podcastSeries: {
    id: string;                  // 系列ID
    name: string;                // 系列名稱
    coverArt: string;            // 系列封面
  };
}
```

---

### **Filter 狀態介面**

```typescript
interface ContentFilters {
  tab: ContentType;              // 當前分頁
  category: string | null;       // 分類篩選
  sortBy: SortOption;            // 排序方式
  timeRange: TimeRange;          // 時間範圍
  vipOnly: boolean;              // 僅顯示VIP內容
  favoritesOnly: boolean;        // 僅顯示收藏
  searchQuery: string;           // 搜尋關鍵字
}

type SortOption = 
  | "latest"           // 最新發布
  | "most-viewed"      // 最多觀看
  | "most-favorited"   // 最多收藏
  | "highest-rated"    // 最高評分
  | "duration-asc";    // 時長短到長

type TimeRange = 
  | "all"              // 全部時間
  | "today"            // 今天
  | "this-week"        // 本週
  | "this-month"       // 本月
  | "last-3-months"    // 最近3個月
  | "last-year";       // 最近一年
```

---

## 🎨 UI 設計規範

### **配色方案**

| 用途 | 顏色 | Tailwind 類 | 說明 |
|------|------|------------|------|
| **主色調** | #4A90E2 | `from-[#4A90E2]` | 藍色 |
| **強調色** | #D4AF37 | `to-[#D4AF37]` | 金色 |
| **VIP 標籤** | #D4AF37 | `bg-[#D4AF37]` | 金色 |
| **收藏按鈕** | #EC4899 | `bg-pink-500` | 粉紅色 |
| **直播標籤** | #EF4444 | `bg-red-500` | 紅色 |
| **已結束** | #6B7280 | `text-gray-500` | 灰色 |

---

### **卡片尺寸**

#### **桌面版（Desktop）：**
```css
.content-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* 3列 */
  gap: 24px;
}

.content-card {
  aspect-ratio: 16/9;                     /* 縮圖比例 */
  border-radius: 12px;
  overflow: hidden;
}
```

#### **平板版（Tablet）：**
```css
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: repeat(2, 1fr);  /* 2列 */
    gap: 16px;
  }
}
```

#### **手機版（Mobile）：**
```css
@media (max-width: 640px) {
  .content-grid {
    grid-template-columns: 1fr;             /* 1列 */
    gap: 12px;
  }
}
```

---

### **卡片陰影效果**

```css
/* 預設狀態 */
.content-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

/* 懸停狀態 */
.content-card:hover {
  box-shadow: 0 8px 24px rgba(74, 144, 226, 0.2);
  transform: translateY(-4px);
}

/* VIP 卡片 */
.content-card.vip {
  box-shadow: 0 4px 16px rgba(212, 175, 55, 0.3);
}
```

---

### **字體大小**

| 元素 | 大小 | Tailwind 類 | 說明 |
|------|------|------------|------|
| **標題** | 18px | `text-lg` | 2行截斷 |
| **描述** | 14px | `text-sm` | 3行截斷 |
| **元數據** | 12px | `text-xs` | 觀看數、時間等 |
| **按鈕** | 14px | `text-sm` | 操作按鈕 |
| **標籤** | 11px | `text-[11px]` | VIP、分類標籤 |

---

### **圖標尺寸**

| 用途 | 尺寸 | Tailwind 類 |
|------|------|------------|
| **大圖標** | 48px | `w-12 h-12` |
| **中圖標** | 24px | `w-6 h-6` |
| **小圖標** | 16px | `w-4 h-4` |
| **微圖標** | 12px | `w-3 h-3` |

---

## 🔄 互動流程

### **1️⃣ 觀看影音流程**

```
用戶點擊影音卡片
    ↓
檢查是否為 VIP 內容
    ↓
┌─────────────────────┬─────────────────────┐
│    是 VIP 內容      │    非 VIP 內容      │
└─────────────────────┴─────────────────────┘
    ↓                        ↓
檢查用戶是否為專業版     直接播放影片
    ↓
┌─────────────────────┬─────────────────────┐
│   是專業版會員      │   非專業版會員      │
└─────────────────────┴─────────────────────┘
    ↓                        ↓
直接播放影片            顯示鎖定遮罩
    ↓                        ↓
記錄觀看歷史            提示升級專業版
    ↓                        ↓
自動播放下一部            點擊升級按鈕
                              ↓
                         跳轉到升級頁面
```

---

### **2️⃣ 收藏流程**

```
用戶點擊收藏按鈕
    ↓
檢查登入狀態
    ↓
┌─────────────────────┬─────────────────────┐
│      已登入         │      未登入         │
└─────────────────────┴─────────────────────┘
    ↓                        ↓
檢查當前收藏狀態          顯示登入提示
    ↓                        ↓
┌─────────────────────┬─────────────────────┐
│     已收藏          │     未收藏          │
└─────────────────────┴─────────────────────┘
    ↓                        ↓
取消收藏                 加入收藏
    ↓                        ↓
播放取消動畫            播放收藏動畫
    ↓                        ↓
顯示提示：已取消收藏    顯示提示：已加入收藏
    ↓                        ↓
更新收藏數量            更新收藏數量
```

---

### **3️⃣ 報名講座流程**

```
用戶點擊報名按鈕
    ↓
檢查講座狀態
    ↓
┌──────────┬──────────┬──────────┬──────────┐
│ 報名中   │ 已額滿   │ 已結束   │VIP專屬   │
└──────────┴──────────┴──────────┴──────────┘
    ↓          ↓          ↓          ↓
檢查登入    顯示額滿   觀看回放   檢查會員
    ↓        提示                    ↓
已登入?                      ┌──────────┬──────────┐
    ↓                        │ 專業版   │ 試用版   │
┌────┬────┐                 └──────────┴──────────┘
│是  │否  │                      ↓          ↓
└────┴────┘                  允許報名    顯示升級
    ↓    ↓                                提示
報名  登入                                  ↓
表單  頁面                              跳轉升級
    ↓                                    頁面
填寫資訊
    ↓
送出報名
    ↓
發送確認信
    ↓
顯示成功提示
```

---

### **4️⃣ 閱讀文章流程（VIP文章）**

```
用戶點擊 VIP 文章
    ↓
載入文章頁面
    ↓
檢查用戶會員狀態
    ↓
┌─────────────────────┬─────────────────────┐
│    專業版會員       │    試用版會員       │
└─────────────────────┴─────────────────────┘
    ↓                        ↓
顯示完整文章            顯示前 100 字
    ↓                        ↓
提供下載 PDF 功能      後續內容模糊處理
    ↓                        ↓
記錄閱讀進度            顯示升級提示卡片
    ↓                        ↓
推薦相關文章            提供升級按鈕
    ↓                        ↓
自動儲存書籤            點擊升級 → 跳轉
```

---

### **5️⃣ 播放 Podcast 流程**

```
用戶點擊播放按鈕
    ↓
檢查是否為 VIP 內容
    ↓
┌─────────────────────┬─────────────────────┐
│    VIP 內容         │    免費內容         │
└─────────────────────┴─────────────────────┘
    ↓                        ↓
檢查會員狀態            直接開始播放
    ↓                        ↓
┌────────┬────────┐        顯示播放器控制
│專業版  │試用版  │            ↓
└────────┴────────┘        記錄收聽進度
    ↓        ↓                 ↓
開始播放  顯示鎖定          提供倍速播放
    ↓      遮罩                ↓
顯示完整  提示升級          自動播放下一集
播放器
    ↓
提供逐字稿
    ↓
提供下載功能
```

---

## 📱 響應式設計

### **桌面版（≥1280px）**

```
┌─────────────────────────────────────────────────┐
│               內容專區 🔍                        │
├─────────────────────────────────────────────────┤
│  影音  講座  文章  Podcast                       │
├─────────────────────────────────────────────────┤
│  [分類▼] [排序▼] [時間▼] [VIP] [收藏] [搜尋]   │
├─────────────────────────────────────────────────┤
│  ┌──────┐  ┌──────┐  ┌──────┐                 │
│  │卡片1 │  │卡片2 │  │卡片3 │  ← 3列網格      │
│  └──────┘  └──────┘  └──────┘                 │
│  ┌──────┐  ┌──────┐  ┌──────┐                 │
│  │卡片4 │  │卡片5 │  │卡片6 │                 │
│  └──────┘  └──────┘  └──────┘                 │
└─────────────────────────────────────────────────┘
```

---

### **平板版（768px - 1279px）**

```
┌───────────────────────────────────┐
│         內容專區 🔍               │
├───────────────────────────────────┤
│  影音  講座  文章  Podcast        │
├───────────────────────────────────┤
│  [分類▼] [排序▼] [搜尋]          │
│  [時間▼] [VIP] [收藏]            │
├───────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐       │
│  │ 卡片1   │  │ 卡片2   │  ← 2列 │
│  └─────────┘  └─────────┘       │
│  ┌─────────┐  ┌─────────┐       │
│  │ 卡片3   │  │ 卡片4   │       │
│  └─────────┘  └─────────┘       │
└───────────────────────────────────┘
```

---

### **手機版（<768px）**

```
┌─────────────────────┐
│   內容專區 🔍       │
├─────────────────────┤
│ 影音 講座 文章 🎙   │
├─────────────────────┤
│  [分類▼] [排序▼]   │
│  [🔍 搜尋...]       │
├─────────────────────┤
│  ┌───────────────┐ │
│  │   卡片1       │ │ ← 1列
│  └───────────────┘ │
│  ┌───────────────┐ │
│  │   卡片2       │ │
│  └───────────────┘ │
│  ┌───────────────┐ │
│  │   卡片3       │ │
│  └───────────────┘ │
└─────────────────────┘
```

---

## 🚀 效能最佳化

### **1️⃣ 圖片最佳化**

```typescript
// 使用 Next.js Image 組件（如果適用）
<Image
  src={thumbnail}
  alt={title}
  width={640}
  height={360}
  loading="lazy"           // 延遲載入
  placeholder="blur"       // 模糊預覽
  quality={75}             // 壓縮品質
/>
```

---

### **2️⃣ 虛擬滾動（Virtual Scrolling）**

當內容數量超過 100 項時，使用虛擬滾動：

```typescript
import { useVirtualizer } from '@tanstack/react-virtual';

const rowVirtualizer = useVirtualizer({
  count: content.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 300,          // 估計每個卡片高度
  overscan: 5                       // 預載5個卡片
});
```

---

### **3️⃣ 分頁載入（Pagination）**

```typescript
const PAGE_SIZE = 24;                // 每頁顯示24個

const [page, setPage] = useState(1);
const [hasMore, setHasMore] = useState(true);

const loadMore = async () => {
  const newContent = await fetchContent(page + 1, PAGE_SIZE);
  setContent(prev => [...prev, ...newContent]);
  setPage(page + 1);
  setHasMore(newContent.length === PAGE_SIZE);
};
```

---

### **4️⃣ 快取策略**

```typescript
// 使用 SWR 或 React Query 進行資料快取
import useSWR from 'swr';

const { data, error, isLoading } = useSWR(
  `/api/content/${contentType}?page=${page}`,
  fetcher,
  {
    revalidateOnFocus: false,     // 不在焦點時重新驗證
    revalidateOnReconnect: false, // 不在重新連線時驗證
    dedupingInterval: 60000       // 60秒內不重複請求
  }
);
```

---

## 📊 分析追蹤

### **追蹤事件**

```typescript
// 內容觀看事件
trackEvent('content_view', {
  content_id: content.id,
  content_type: content.type,
  content_title: content.title,
  is_vip: content.isVipOnly,
  user_type: user.isPro ? 'pro' : 'trial'
});

// 收藏事件
trackEvent('content_favorite', {
  content_id: content.id,
  content_type: content.type,
  action: 'add' | 'remove'
});

// VIP 升級點擊事件
trackEvent('upgrade_click', {
  source: 'content_page',
  content_id: content.id,
  content_type: content.type
});

// 搜尋事件
trackEvent('content_search', {
  query: searchQuery,
  results_count: searchResults.length
});
```

---

## ✅ 完整功能清單

| 功能 | 狀態 | 說明 |
|------|------|------|
| **四大分頁** | ✅ | 影音、講座、文章、Podcast |
| **YouTube 風格** | ✅ | 卡片網格布局 |
| **篩選器系統** | ✅ | 分類/排序/時間/VIP |
| **搜尋功能** | ✅ | 標題、描述、標籤 |
| **收藏功能** | ✅ | 愛心按鈕 + 動畫 |
| **VIP 鎖定** | ✅ | 模糊 + 金色鎖頭 |
| **響應式設計** | ✅ | 桌面/平板/手機 |
| **虛擬滾動** | ✅ | 效能最佳化 |
| **分頁載入** | ✅ | 無限捲動 |
| **快取策略** | ✅ | SWR/React Query |
| **分析追蹤** | ✅ | 觀看/收藏/升級事件 |

---

## 📚 總結

### **核心特色：**

1. **YouTube 風格設計** - 直覺的卡片布局
2. **四大內容類型** - 影音、講座、文章、Podcast
3. **完整篩選系統** - 多維度篩選
4. **收藏功能** - 愛心按鈕 + 動畫效果
5. **VIP 鎖定機制** - 模糊 + 金色鎖頭
6. **響應式設計** - 適配各種螢幕
7. **效能最佳化** - 虛擬滾動 + 快取

---

### **使用者體驗重點：**

- ✅ 清晰的視覺層級
- ✅ 流暢的互動動畫
- ✅ 明確的 VIP 身份識別
- ✅ 便利的收藏管理
- ✅ 快速的內容載入
- ✅ 精準的搜尋結果

---

這就是完整的內容頁面邏輯文檔！🎬📚🎙️✨
