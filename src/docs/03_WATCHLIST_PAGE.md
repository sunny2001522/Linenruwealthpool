# ⭐ 自選標籤（WatchlistPage）完整文檔

## 📋 文檔更新日期
2026年3月9日

---

## 🎯 頁面概述

**自選頁**讓用戶管理個人化的自選股清單，即時追蹤關注的股票，查看恩如三部曲評分和價格變動。

### 路由資訊
- **路徑**：`/home/watchlist`
- **組件**：`WatchlistPage`
- **底部導覽圖標**：⭐ Eye（自選）
- **是否需要登入**：是
- **有無底部導覽列**：有

---

## 📐 頁面結構

```
┌─────────────────────────────────────────────────┐
│              頂部標題 + 新增按鈕                  │
│        「我的自選股」    [ + 新增股票 ]          │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│              自選股列表（可拖曳排序）             │
│   ┌───────────────────────────────────────┐    │
│   │ 2330 台積電    780.00  ▲ 2.35%  ⭐⭐  │    │
│   │ ⭐⭐⭐⭐⭐⭐  週20MA: 750.00  [刪除]  │    │
│   └───────────────────────────────────────┘    │
│   ┌───────────────────────────────────────┐    │
│   │ 2317 鴻海      120.50  ▲ 1.85%  ⭐⭐  │    │
│   │ ⭐⭐⭐⭐⭐⭐  週20MA: 115.00  [刪除]  │    │
│   └───────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│              空狀態提示                          │
│   「尚未加入任何自選股」                         │
│   [ 立即新增 ]                                  │
└─────────────────────────────────────────────────┘
```

---

## 🎨 視覺設計規範

### 配色方案
- **上漲紅色**：`#FE6D73`
- **下跌綠色**：`#9cffd9`
- **星星金色**：`#D4AF37`
- **刪除按鈕紅色**：`#FF6B6B`

### 自選股卡片設計

```tsx
<div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 mb-3">
  {/* 第一行：股票代碼、名稱、價格、漲跌幅 */}
  <div className="flex items-center justify-between mb-2">
    <div className="flex items-center gap-3">
      {/* 拖曳手柄 */}
      <GripVertical className="w-5 h-5 text-muted-foreground cursor-move" />
      
      {/* 股票代碼與名稱 */}
      <div>
        <p className="font-semibold text-lg">{stock.code}</p>
        <p className="text-sm text-muted-foreground">{stock.name}</p>
      </div>
    </div>

    {/* 價格與漲跌幅 */}
    <div className="text-right">
      <p className="text-xl font-bold">{stock.price.toFixed(2)}</p>
      <p className={cn(
        "text-sm font-semibold",
        stock.changePercent > 0 ? "text-chart-2" : "text-chart-3"
      )}>
        {stock.changePercent > 0 ? "▲" : "▼"} {Math.abs(stock.changePercent).toFixed(2)}%
      </p>
    </div>
  </div>

  {/* 第二行：恩如三部曲評分、週20MA、刪除按鈕 */}
  <div className="flex items-center justify-between">
    {/* 恩如三部曲星星 */}
    <div className="flex items-center gap-1">
      {[...Array(stock.trilogyScore)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
      ))}
      {[...Array(6 - stock.trilogyScore)].map((_, i) => (
        <Star key={i + stock.trilogyScore} className="w-4 h-4 text-muted-foreground" />
      ))}
    </div>

    {/* 週20MA */}
    <p className="text-sm text-muted-foreground">
      週20MA: {stock.weeklyMa.toFixed(2)}
    </p>

    {/* 刪除按鈕 */}
    <button
      onClick={() => removeFromWatchlist(stock.code)}
      className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  </div>
</div>
```

---

## ➕ 新增自選股功能

### 新增按鈕

```tsx
<button
  onClick={() => setShowSearchModal(true)}
  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF] text-white font-medium hover:shadow-lg transition-all flex items-center gap-2"
>
  <Plus className="w-5 h-5" />
  新增股票
</button>
```

### 搜尋彈窗（SearchStockModal）

```tsx
<Dialog open={showSearchModal} onOpenChange={setShowSearchModal}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>新增自選股</DialogTitle>
    </DialogHeader>

    {/* 搜尋框 */}
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      <input
        type="text"
        placeholder="輸入股票代碼或名稱..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border border-border focus:border-primary"
      />
    </div>

    {/* 搜尋結果列表 */}
    <div className="max-h-[400px] overflow-y-auto">
      {searchResults.map(stock => (
        <button
          key={stock.code}
          onClick={() => {
            addToWatchlist(stock.code);
            setShowSearchModal(false);
          }}
          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
        >
          <div>
            <p className="font-semibold">{stock.code}</p>
            <p className="text-sm text-muted-foreground">{stock.name}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">{stock.price.toFixed(2)}</p>
            <p className={cn(
              "text-sm",
              stock.changePercent > 0 ? "text-chart-2" : "text-chart-3"
            )}>
              {stock.changePercent > 0 ? "▲" : "▼"} {Math.abs(stock.changePercent).toFixed(2)}%
            </p>
          </div>
        </button>
      ))}
    </div>
  </DialogContent>
</Dialog>
```

---

## 🔄 拖曳排序功能

使用 `react-dnd` 實現拖曳排序：

```tsx
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const WatchlistItem = ({ stock, index, moveStock }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'WATCHLIST_ITEM',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'WATCHLIST_ITEM',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveStock(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 mb-3"
    >
      {/* 卡片內容 */}
    </div>
  );
};

export function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);

  const moveStock = (fromIndex, toIndex) => {
    const newList = [...watchlist];
    const [movedItem] = newList.splice(fromIndex, 1);
    newList.splice(toIndex, 0, movedItem);
    setWatchlist(newList);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {watchlist.map((stock, index) => (
          <WatchlistItem
            key={stock.code}
            stock={stock}
            index={index}
            moveStock={moveStock}
          />
        ))}
      </div>
    </DndProvider>
  );
}
```

---

## 🗑️ 刪除自選股功能

### 刪除確認彈窗

```tsx
<AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>確認刪除</AlertDialogTitle>
      <AlertDialogDescription>
        確定要將「{stockToDelete?.name} ({stockToDelete?.code})」從自選股中移除嗎？
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>取消</AlertDialogCancel>
      <AlertDialogAction
        onClick={confirmDelete}
        className="bg-red-500 hover:bg-red-600"
      >
        刪除
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### 刪除邏輯

```typescript
const removeFromWatchlist = (stockCode: string) => {
  // 顯示確認彈窗
  setStockToDelete(watchlist.find(s => s.code === stockCode));
  setShowDeleteConfirm(true);
};

const confirmDelete = () => {
  if (stockToDelete) {
    // 從列表中移除
    setWatchlist(prev => prev.filter(s => s.code !== stockToDelete.code));
    
    // 保存到 Local Storage
    saveWatchlistToStorage(watchlist.filter(s => s.code !== stockToDelete.code));
    
    // 顯示成功提示
    toast.success(`已從自選股中移除 ${stockToDelete.name}`);
  }
  setShowDeleteConfirm(false);
  setStockToDelete(null);
};
```

---

## 🔐 VIP 權限控制

### 專業版 vs 試用版

| 功能 | 專業版 | 試用版 |
|------|--------|--------|
| **儲存上限** | ✅ 無上限 | ⚠️ 最多 10 支 |
| **清單數量** | ✅ 多組清單 | ⚠️ 僅 1 組 |
| **拖曳排序** | ✅ 支援 | ✅ 支援 |
| **恩如三部曲** | ✅ 完整顯示 | ✅ 完整顯示 |

### 試用版限制提示

```tsx
{!user?.isPro && watchlist.length >= 10 && (
  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-4">
    <div className="flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="font-semibold text-yellow-500 mb-1">自選股已達上限</p>
        <p className="text-sm text-muted-foreground mb-3">
          試用版最多只能儲存 10 支股票，升級專業版即可無限制儲存。
        </p>
        <button
          onClick={() => navigate('/purchase')}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#4A90E2] to-[#D4AF37] text-white font-medium hover:shadow-lg transition-all text-sm"
        >
          立即升級
        </button>
      </div>
    </div>
  </div>
)}
```

---

## 📊 數據存儲

### Local Storage 存儲

```typescript
// watchlistStorage.ts
export interface WatchlistStorage {
  stocks: string[];         // 股票代碼列表
  order: string[];          // 排序順序
  lastUpdated: string;      // 最後更新時間
}

export const saveWatchlistToStorage = (stockCodes: string[]) => {
  const data: WatchlistStorage = {
    stocks: stockCodes,
    order: stockCodes,
    lastUpdated: new Date().toISOString()
  };
  localStorage.setItem('watchlist', JSON.stringify(data));
};

export const loadWatchlistFromStorage = (): string[] => {
  const data = localStorage.getItem('watchlist');
  if (data) {
    const parsed: WatchlistStorage = JSON.parse(data);
    return parsed.order;
  }
  return [];
};
```

---

## 🔄 實時更新機制

### 價格更新頻率
- **盤中（09:00 - 13:30）**：每 5 秒更新
- **盤後**：停止更新
- **未開盤**：顯示前一交易日收盤價

### 實時更新實作

```typescript
useEffect(() => {
  // 首次載入
  updateWatchlistPrices();

  // 設定定時器
  const interval = setInterval(() => {
    if (isMarketOpen()) {
      updateWatchlistPrices();
    }
  }, 5000); // 每 5 秒更新

  // 清除定時器
  return () => clearInterval(interval);
}, [watchlist]);

const updateWatchlistPrices = async () => {
  const codes = watchlist.map(s => s.code);
  const prices = await fetchStockPrices(codes);
  
  setWatchlist(prev => prev.map(stock => ({
    ...stock,
    ...prices[stock.code]
  })));
};
```

---

## 📱 響應式設計

### 手機版（< 768px）
- 卡片式佈局
- 單欄顯示
- 拖曳手柄顯示

### 平板版（768px - 1024px）
- 卡片式佈局
- 單欄顯示
- 拖曳手柄顯示

### 桌面版（> 1024px）
- 表格式佈局（可選）
- 雙欄顯示（可選）
- 拖曳手柄顯示

---

## 🎯 交互行為

### 點擊股票卡片
→ 導航至「股票詳情頁」（`/stock/:code`）

### 拖曳股票卡片
→ 重新排序自選股列表

### 點擊刪除按鈕
→ 顯示刪除確認彈窗

### 點擊新增按鈕
→ 打開搜尋彈窗

---

## 📝 注意事項

### 顏色使用
- 上漲使用紅色（`#FE6D73`）
- 下跌使用綠色（`#9cffd9`）
- 星星使用金色（`#D4AF37`）

### 數據存儲
- 使用 Local Storage 持久化
- 每次變更後立即保存
- 支持跨設備同步（未來功能）

### 性能優化
- 使用 `useMemo` 緩存計算結果
- 使用 `React.memo` 避免不必要的重渲染
- 限制實時更新頻率

---

## 📚 相關文檔

- **整體概覽**：`00_APP_OVERVIEW.md`
- **首頁標籤**：`01_HOME_PAGE.md`
- **選股標籤**：`02_STOCK_PICKER_PAGE.md`
- **社團標籤**：`04_DISCUSSION_PAGE.md`
