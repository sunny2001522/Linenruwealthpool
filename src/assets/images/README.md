# Images 資料夾

## ⚠️ 重要提醒

此資料夾用於存放實際的圖片檔案。

## 📋 需要的圖片檔案清單

請從 Figma 匯出以下圖片，並放置於此資料夾：

### 1. 用戶頭像
```
avatar_default.png       (120×120, 1x)
avatar_default@2x.png    (240×240, 2x)
avatar_default@3x.png    (360×360, 3x)
```
- **說明**：預設用戶頭像
- **格式**：PNG（支援透明背景）
- **用途**：社團、作者專區、評論區

### 2. 星星圖示（可選，建議使用 SVG）
```
star_empty.png       (48×48, 1x)
star_empty@2x.png    (96×96, 2x)
star_empty@3x.png    (144×144, 3x)

star_half.png        (48×48, 1x)
star_half@2x.png     (96×96, 2x)
star_half@3x.png     (144×144, 3x)

star_full.png        (48×48, 1x)
star_full@2x.png     (96×96, 2x)
star_full@3x.png     (144×144, 3x)
```
- **說明**：評分系統星星（建議使用 `/assets/svg/` 中的 SVG 元件）
- **顏色**：金色 #D4AF37
- **漸層**：從 #FFD700 到 #D4AF37

### 3. 啟動畫面
```
launch_background.png       (1242×2688, 1x)
launch_background@2x.png    (2484×5376, 2x)
launch_background@3x.png    (3726×8064, 3x)

launch_logo.png       (400×400, 1x)
launch_logo@2x.png    (800×800, 2x)
launch_logo@3x.png    (1200×1200, 3x)
```
- **說明**：App 啟動時顯示的背景和 Logo
- **格式**：PNG（Logo 需透明背景）

### 4. 首頁橫幅
```
home_banner_1.png       (1200×400, 1x)
home_banner_1@2x.png    (2400×800, 2x)
home_banner_1@3x.png    (3600×1200, 3x)

home_banner_2.png       (1200×400, 1x)
home_banner_2@2x.png    (2400×800, 2x)
home_banner_2@3x.png    (3600×1200, 3x)
```
- **說明**：首頁輪播橫幅
- **比例**：16:9
- **格式**：JPG 或 PNG

### 5. 圖示
```
icon_lock.png       (64×64, 1x)
icon_lock@2x.png    (128×128, 2x)
icon_lock@3x.png    (192×192, 3x)

icon_vip.png        (64×64, 1x)
icon_vip@2x.png     (128×128, 2x)
icon_vip@3x.png     (192×192, 3x)

icon_play.png       (64×64, 1x)
icon_play@2x.png    (128×128, 2x)
icon_play@3x.png    (192×192, 3x)
```
- **說明**：功能圖示
- **顏色**：
  - 鎖頭：金色 #D4AF37
  - VIP：金色 #D4AF37
  - 播放：藍色 #4A90E2 或白色
- **格式**：PNG（支援透明背景）

### 6. 內容佔位圖（可選）
```
content_placeholder.png       (800×450, 1x)
content_placeholder@2x.png    (1600×900, 2x)
content_placeholder@3x.png    (2400×1350, 3x)
```
- **說明**：內容載入時的佔位圖
- **比例**：16:9
- **格式**：PNG

## 📥 從 Figma 匯出步驟

### 步驟 1: 選取圖層
1. 在 Figma 中開啟設計檔
2. 找到對應的圖層（例如：用戶頭像圖層）
3. 點選圖層以選取

### 步驟 2: 設定匯出
1. 在右側面板找到「Export」區塊
2. 點選「+」新增匯出設定
3. 設定格式和倍率：
   - 格式：PNG 或 JPG
   - 1x（不加後綴）
   - 2x（@2x）
   - 3x（@3x）

### 步驟 3: 匯出檔案
1. 點選「Export」按鈕
2. 選擇此資料夾作為儲存位置
3. 確認檔案名稱符合上述命名規範

## 🎨 圖片處理建議

### 壓縮圖片
使用以下工具壓縮圖片（建議壓縮後再放入專案）：
- **線上工具**：https://tinypng.com/
- **Mac App**：ImageOptim
- **命令列**：
  ```bash
  # 安裝 pngquant
  brew install pngquant
  
  # 壓縮圖片
  pngquant --quality 80-90 avatar_default.png
  ```

### 目標檔案大小
- 頭像：< 50KB
- 橫幅：< 200KB
- 圖示：< 20KB
- 背景：< 500KB

### 格式選擇
| 類型 | 建議格式 | 原因 |
|------|---------|------|
| 頭像 | PNG | 支援透明、圓形顯示 |
| 橫幅 | JPG | 檔案較小 |
| 圖示 | PNG | 支援透明 |
| 背景 | JPG | 檔案較小 |

## 🔧 如何在專案中使用

### React Native
```typescript
import images from '../assets';

// 使用圖片
<Image source={images.avatarDefault} style={{ width: 40, height: 40 }} />
```

### iOS (Swift)
```swift
Image("avatar_default")
    .resizable()
    .frame(width: 40, height: 40)
```

### Android (Kotlin)
```kotlin
Image(
    painter = painterResource(R.drawable.avatar_default),
    contentDescription = "頭像"
)
```

## 📝 檢查清單

在提交給 RD 之前，請確認：

- [ ] 所有圖片都從 Figma 匯出
- [ ] 每張圖片都有 1x、2x、3x 三個版本
- [ ] 檔案命名符合規範（小寫、底線分隔）
- [ ] 圖片已壓縮到合理大小
- [ ] PNG 圖片有透明背景（如需要）
- [ ] 星星圖示使用金色漸層 (#FFD700 → #D4AF37)
- [ ] 圖示顏色符合設計規範

## 💡 臨時替代方案

如果暫時沒有 Figma 圖片，可以：

1. **使用佔位圖服務**：
   ```typescript
   // 臨時頭像
   <Image source={{ uri: 'https://via.placeholder.com/120' }} />
   ```

2. **使用 Unsplash 照片**：
   ```typescript
   // 臨時橫幅
   <Image source={{ uri: 'https://images.unsplash.com/photo-xxxxx' }} />
   ```

3. **使用純色背景**：
   ```typescript
   // 臨時頭像
   <View style={{ 
     width: 40, 
     height: 40, 
     backgroundColor: '#ABABAB', 
     borderRadius: 20 
   }} />
   ```

## 🔗 相關文件
- [Assets README](/assets/README.md) - 完整使用指南
- [SVG 星星元件](/assets/svg/) - 星星評分 SVG 實作

---

**提醒**：請設計師務必提供所有必要的圖片檔案，以確保 RD 可以順利進行開發！
