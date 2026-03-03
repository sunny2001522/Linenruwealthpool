# 圖片佔位符說明

此檔案用於說明圖片資源的使用方式。

## ⚠️ 實際圖片需由設計師提供

所有實際的圖片檔案需要從 Figma 匯出並放置於此資料夾。

請參考 `/assets/images/README.md` 取得完整的圖片清單和匯出步驟。

## 臨時開發用佔位符

在開發階段，如果圖片尚未準備好，可以使用以下佔位符：

### 線上佔位圖服務
```
頭像：https://via.placeholder.com/120/ABABAB/FFFFFF?text=Avatar
橫幅：https://via.placeholder.com/1200x400/4A90E2/FFFFFF?text=Banner
圖示：https://via.placeholder.com/64/D4AF37/FFFFFF?text=Icon
```

### Unsplash 照片（僅供開發測試）
```
頭像範例：https://images.unsplash.com/photo-1771050889377-b68415885c64?w=120
橫幅範例：https://images.unsplash.com/photo-1576499162440-5e55a43278e1?w=1200
```

## 圖片準備好後

1. 將所有圖片放入 `/assets/images/` 資料夾
2. 更新 `/assets/index.ts` 中的 require 路徑
3. 刪除此佔位符說明檔案
4. 通知 RD 進行整合測試
