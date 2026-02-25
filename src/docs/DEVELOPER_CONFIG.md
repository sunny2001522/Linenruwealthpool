# 工程師配置總覽

此文件提供所有需要工程師實現的原生功能和配置項目的快速參考。

## 📋 配置檢查清單

### 1. 購買流程配置 ✅

**配置文件：** `/lib/appConfig.ts`

```typescript
// 審查模式開關（工程師需根據發布階段修改）
export const IS_REVIEW_MODE = false; // true=審查模式, false=正式模式

// 網頁購買連結
export const WEB_PURCHASE_URL = "https://www.cmoney.tw/app/itemcontent.aspx?id=3627";

// 線上客服連結
export const CUSTOMER_SERVICE_URL = "https://www.cmoney.tw/app/customer-service";
```

**何時修改：**
- 📤 提交 App Store/Play Store 審查：`IS_REVIEW_MODE = true`
- ✅ 審查通過上架後：`IS_REVIEW_MODE = false`

**詳細文件：** `/docs/PURCHASE_CONFIG.md`

---

### 2. 原生功能橋接 🔌

**橋接文件：** `/lib/nativeBridge.ts`

#### App 評分功能

**Web 端調用：**
```typescript
import { openAppRating } from '../lib/nativeBridge';
openAppRating(); // 打開 App Store/Play Store 評分
```

**原生端需實現：**

**iOS (Swift):**
```swift
// 消息名稱：rateApp
userContentController.add(self, name: "rateApp")

// 實現：使用 SKStoreReviewController
func requestReview() {
    if let scene = UIApplication.shared.connectedScenes.first as? UIWindowScene {
        SKStoreReviewController.requestReview(in: scene)
    }
}
```

**Android (Kotlin):**
```kotlin
// Interface 名稱：Android.rateApp()
webView.addJavascriptInterface(WebAppInterface(this), "Android")

@JavascriptInterface
fun rateApp() {
    // 使用 In-App Review API
    val reviewManager = ReviewManagerFactory.create(activity)
    // ...
}
```

---

#### 分享給好友功能

**Web 端調用：**
```typescript
import { shareToFriend } from '../lib/nativeBridge';

// 使用預設內容
shareToFriend();

// 自訂分享內容
shareToFriend({
  title: '長線聚寶盆',
  text: '推薦你使用這個 App！',
  url: 'https://www.cmoney.tw/...'
});
```

**原生端需實現：**

**iOS (Swift):**
```swift
// 消息名稱：share
userContentController.add(self, name: "share")

// 實現：使用 UIActivityViewController
func presentShareSheet(title: String, text: String, url: String) {
    let activityVC = UIActivityViewController(
        activityItems: [text, URL(string: url)!],
        applicationActivities: nil
    )
    present(activityVC, animated: true)
}
```

**Android (Kotlin):**
```kotlin
// Interface 名稱：Android.share(title, text, url)
@JavascriptInterface
fun share(title: String, text: String, url: String) {
    val shareIntent = Intent().apply {
        action = Intent.ACTION_SEND
        type = "text/plain"
        putExtra(Intent.EXTRA_TEXT, "$text\n\n$url")
    }
    startActivity(Intent.createChooser(shareIntent, title))
}
```

**詳細文件：** `/docs/NATIVE_FEATURES.md`

---

## 🗂️ 文件結構

```
/lib/
  ├── appConfig.ts          # 應用配置（購買模式、URL 等）
  └── nativeBridge.ts       # 原生功能橋接（評分、分享）

/docs/
  ├── PURCHASE_CONFIG.md    # 購買流程配置說明
  ├── NATIVE_FEATURES.md    # 原生功能開發指南
  └── DEVELOPER_CONFIG.md   # 本文件（配置總覽）

/pages/
  ├── WebPurchasePage.tsx      # 網頁購買頁面（正式模式）
  ├── PurchasePage.tsx         # 原生購買頁面（審查模式）
  └── CustomerServicePage.tsx  # 線上客服頁面（網頁內嵌）

/components/
  └── SubscriptionModal.tsx # 購買彈窗（根據模式跳轉）
```

---

## 🚀 快速開始

### Step 1: 配置購買模式

根據發布階段編輯 `/lib/appConfig.ts`：

```typescript
// 審查階段
export const IS_REVIEW_MODE = true;

// 正式上架
export const IS_REVIEW_MODE = false;
```

### Step 2: 實現原生橋接

#### iOS 設定

1. 在 ViewController 中設置 WKWebView 橋接
2. 實現兩個消息處理：`rateApp` 和 `share`
3. 測試功能是否正常

#### Android 設定

1. 在 WebView 添加 JavascriptInterface：`Android`
2. 實現兩個方法：`rateApp()` 和 `share()`
3. 測試功能是否正常

### Step 3: 測試驗證

- [ ] 購買流程測試（審查模式 + 正式模式）
- [ ] App 評分測試（iOS + Android）
- [ ] 分享功能測試（iOS + Android）
- [ ] 線上客服測試（網頁載入）

---

## ⚙️ 開發模式

### 查看當前模式

開發環境下，購買彈窗底部會顯示當前模式指示器：

- 🟢 **綠色**：正式模式（使用網頁購買）
- 🟡 **黃色**：審查模式（使用原生購買）

### 測試降級方案

Web 端已實現降級方案，當原生功能未實現時：

- **App 評分**：
  - 開發環境：顯示 Alert 提示
  - 生產環境：跳轉應用商店網頁

- **分享功能**：
  - 支援 Web Share API（現代瀏覽器）
  - 降級為複製到剪貼簿

---

## 📞 需要支援？

### 查看詳細文件

- 購買流程問題 → `/docs/PURCHASE_CONFIG.md`
- 原生功能問題 → `/docs/NATIVE_FEATURES.md`
- 配置總覽 → `/docs/DEVELOPER_CONFIG.md`（本文件）

### 程式碼位置

- 配置文件 → `/lib/appConfig.ts`
- 橋接文件 → `/lib/nativeBridge.ts`
- 購買彈窗 → `/components/SubscriptionModal.tsx`
- 更多頁面 → `/pages/MorePage.tsx`

---

## ✅ 發布前檢查

### 提交審查前

- [ ] 設定 `IS_REVIEW_MODE = true`
- [ ] 測試原生購買流程
- [ ] 測試 App 評分功能
- [ ] 測試分享功能
- [ ] 提交審查

### 審查通過後

- [ ] 設定 `IS_REVIEW_MODE = false`
- [ ] 測試網頁購買流程
- [ ] 測試線上客服
- [ ] 再次測試評分和分享
- [ ] 正式上架

---

## 📝 版本記錄

- **1.0.0** - 初始版本
  - ✅ 購買流程雙模式支援
  - ✅ 線上客服網頁內嵌
  - ✅ App 評分原生橋接
  - ✅ 分享功能原生橋接
