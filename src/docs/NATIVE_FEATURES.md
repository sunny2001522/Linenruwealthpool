# 原生功能開發指南

## 概述

此文件提供 App 評分和分享功能的原生實現指南，包含 iOS 和 Android 平台的具體實現方法。

## 架構說明

```
Web (React) ←→ nativeBridge.ts ←→ 原生 App (iOS/Android)
```

- **Web 層**：使用 `/lib/nativeBridge.ts` 提供的函數
- **橋接層**：透過 WebView 橋接通訊
- **原生層**：iOS/Android 實現具體功能

---

## 1. App 評分功能

### 功能說明
用戶點擊「App 評分」後，應該打開原生的應用商店評分功能。

### Web 端使用方式

```typescript
import { openAppRating } from '../lib/nativeBridge';

// 直接調用
<button onClick={openAppRating}>App 評分</button>
```

---

### iOS 實現

#### 方法一：使用 StoreKit (推薦)

**Swift 實現：**

```swift
import StoreKit

// 在 WebView 設置橋接
let configuration = WKWebViewConfiguration()
let userContentController = WKUserContentController()
userContentController.add(self, name: "rateApp")
configuration.userContentController = userContentController

// 實現消息處理
extension YourViewController: WKScriptMessageHandler {
    func userContentController(_ userContentController: WKUserContentController, 
                              didReceive message: WKScriptMessage) {
        if message.name == "rateApp" {
            requestReview()
        }
    }
    
    func requestReview() {
        if let scene = UIApplication.shared.connectedScenes.first as? UIWindowScene {
            SKStoreReviewController.requestReview(in: scene)
        }
    }
}
```

**注意事項：**
- iOS 10.3+ 支援
- 系統會自動控制顯示頻率（一年最多 3 次）
- 用戶可能看不到彈窗（系統決定）

#### 方法二：直接跳轉 App Store

```swift
func openAppStore() {
    let appID = "YOUR_APP_ID" // 替換為實際的 App ID
    if let url = URL(string: "itms-apps://itunes.apple.com/app/id\(appID)?action=write-review") {
        UIApplication.shared.open(url)
    }
}
```

**獲取 App ID：**
1. 登入 [App Store Connect](https://appstoreconnect.apple.com/)
2. 選擇您的 App
3. 在「App 資訊」中找到「Apple ID」

---

### Android 實現

#### 方法一：使用 In-App Review API (推薦)

**Gradle 依賴：**

```gradle
dependencies {
    implementation 'com.google.android.play:review:2.0.1'
    implementation 'com.google.android.play:review-ktx:2.0.1'
}
```

**Kotlin 實現：**

```kotlin
import com.google.android.play.core.review.ReviewManagerFactory

// 在 WebView 設置橋接
webView.addJavascriptInterface(WebAppInterface(this), "Android")

class WebAppInterface(private val context: Context) {
    @JavascriptInterface
    fun rateApp() {
        (context as? Activity)?.runOnUiThread {
            requestReview(context as Activity)
        }
    }
    
    private fun requestReview(activity: Activity) {
        val reviewManager = ReviewManagerFactory.create(activity)
        val request = reviewManager.requestReviewFlow()
        
        request.addOnCompleteListener { task ->
            if (task.isSuccessful) {
                val reviewInfo = task.result
                val flow = reviewManager.launchReviewFlow(activity, reviewInfo)
                flow.addOnCompleteListener {
                    // 評分流程完成（無論用戶是否實際評分）
                }
            }
        }
    }
}
```

#### 方法二：直接跳轉 Google Play

```kotlin
fun openPlayStore() {
    val packageName = context.packageName
    try {
        // 嘗試打開 Play Store App
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse("market://details?id=$packageName"))
        context.startActivity(intent)
    } catch (e: ActivityNotFoundException) {
        // 降級到瀏覽器
        val intent = Intent(Intent.ACTION_VIEW, 
            Uri.parse("https://play.google.com/store/apps/details?id=$packageName"))
        context.startActivity(intent)
    }
}
```

---

## 2. 分享給好友功能

### 功能說明
用戶點擊「分享給好友」後，應該打開原生的分享面板，可以分享到各種社交平台。

### Web 端使用方式

```typescript
import { shareToFriend } from '../lib/nativeBridge';

// 使用預設內容
<button onClick={() => shareToFriend()}>分享給好友</button>

// 自訂分享內容
<button onClick={() => shareToFriend({
  title: '自訂標題',
  text: '自訂描述文字',
  url: 'https://example.com'
})}>分享</button>
```

---

### iOS 實現

**Swift 實現：**

```swift
import UIKit

// 在 WebView 設置橋接
userContentController.add(self, name: "share")

// 實現消息處理
extension YourViewController: WKScriptMessageHandler {
    func userContentController(_ userContentController: WKUserContentController, 
                              didReceive message: WKScriptMessage) {
        if message.name == "share" {
            if let body = message.body as? [String: String] {
                let title = body["title"] ?? ""
                let text = body["text"] ?? ""
                let urlString = body["url"] ?? ""
                
                presentShareSheet(title: title, text: text, url: urlString)
            }
        }
    }
    
    func presentShareSheet(title: String, text: String, url: String) {
        var items: [Any] = []
        
        // 添加文字內容
        if !text.isEmpty {
            items.append(text)
        }
        
        // 添加 URL
        if let shareURL = URL(string: url) {
            items.append(shareURL)
        }
        
        let activityViewController = UIActivityViewController(
            activityItems: items,
            applicationActivities: nil
        )
        
        // iPad 支援
        if let popover = activityViewController.popoverPresentationController {
            popover.sourceView = self.view
            popover.sourceRect = CGRect(x: self.view.bounds.midX, 
                                       y: self.view.bounds.midY, 
                                       width: 0, height: 0)
            popover.permittedArrowDirections = []
        }
        
        self.present(activityViewController, animated: true)
    }
}
```

**支援的分享選項：**
- 訊息（Messages）
- 郵件（Mail）
- 複製
- AirDrop
- 社交平台（Twitter, Facebook 等，需安裝對應 App）

---

### Android 實現

**Kotlin 實現：**

```kotlin
class WebAppInterface(private val context: Context) {
    @JavascriptInterface
    fun share(title: String, text: String, url: String) {
        (context as? Activity)?.runOnUiThread {
            presentShareSheet(title, text, url)
        }
    }
    
    private fun presentShareSheet(title: String, text: String, url: String) {
        val shareText = buildString {
            if (text.isNotEmpty()) {
                append(text)
                append("\n\n")
            }
            if (url.isNotEmpty()) {
                append(url)
            }
        }
        
        val shareIntent = Intent().apply {
            action = Intent.ACTION_SEND
            type = "text/plain"
            putExtra(Intent.EXTRA_SUBJECT, title)
            putExtra(Intent.EXTRA_TEXT, shareText)
        }
        
        val chooser = Intent.createChooser(shareIntent, title.ifEmpty { "分享" })
        context.startActivity(chooser)
    }
}
```

**進階：分享圖片**

```kotlin
private fun shareWithImage(text: String, imageUri: Uri) {
    val shareIntent = Intent().apply {
        action = Intent.ACTION_SEND
        type = "image/*"
        putExtra(Intent.EXTRA_TEXT, text)
        putExtra(Intent.EXTRA_STREAM, imageUri)
        addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
    }
    
    context.startActivity(Intent.createChooser(shareIntent, "分享"))
}
```

---

## 3. 配置清單

### iOS 配置

**Info.plist 設定（如需跳轉外部 App）：**

```xml
<key>LSApplicationQueriesSchemes</key>
<array>
    <string>itms-apps</string>
</array>
```

### Android 配置

**AndroidManifest.xml：**

```xml
<!-- 網路權限（如需載入遠程內容） -->
<uses-permission android:name="android.permission.INTERNET" />

<!-- WebView 設定 -->
<application>
    <activity
        android:name=".MainActivity"
        android:exported="true">
        <!-- 允許其他 App 開啟連結 -->
    </activity>
</application>
```

---

## 4. 測試指南

### 測試 App 評分

**iOS：**
- ✅ 在實機上測試（模擬器可能不顯示）
- ✅ 確認彈窗正確顯示
- ✅ 確認頻率限制（連續測試可能看不到彈窗）
- ✅ 測試降級方案（直接跳轉 App Store）

**Android：**
- ✅ 在實機上測試
- ✅ 確認 In-App Review 彈窗顯示
- ✅ 測試降級方案（跳轉 Play Store）

### 測試分享功能

**iOS：**
- ✅ 點擊後顯示 UIActivityViewController
- ✅ 可以選擇不同的分享方式
- ✅ iPad 上 Popover 正確顯示
- ✅ 分享內容正確（文字、連結）

**Android：**
- ✅ 點擊後顯示分享選單
- ✅ 可以選擇不同的 App
- ✅ 分享內容正確傳遞

---

## 5. 常見問題

### Q1: iOS 的評分彈窗不顯示？
**A:** 
- 系統限制一年最多顯示 3 次
- 清除 App 重新安裝可重置計數器
- 使用降級方案直接跳轉 App Store

### Q2: Android In-App Review 失敗？
**A:**
- 確認已添加正確的依賴
- 檢查是否在正式版本（測試版可能不支援）
- 使用降級方案跳轉 Play Store

### Q3: 如何在開發環境測試？
**A:**
- Web 端已實現降級方案（開發模式會顯示 Alert）
- 可以在實機上安裝開發版本測試
- 檢查瀏覽器 Console 的日誌訊息

### Q4: 分享功能沒有反應？
**A:**
- 確認 WebView 橋接已正確設定
- 檢查 JavaScript Interface 名稱是否正確
- 在原生端添加日誌確認是否收到訊息

---

## 6. 相關資源

### iOS
- [SKStoreReviewController 文件](https://developer.apple.com/documentation/storekit/skstorereviewcontroller)
- [UIActivityViewController 文件](https://developer.apple.com/documentation/uikit/uiactivityviewcontroller)
- [WKWebView JavaScript Bridge](https://developer.apple.com/documentation/webkit/wkscriptmessagehandler)

### Android
- [In-App Review API](https://developer.android.com/guide/playcore/in-app-review)
- [Android Share Intent](https://developer.android.com/training/sharing/send)
- [WebView JavaScript Interface](https://developer.android.com/guide/webapps/webview#BindingJavaScript)

### Web
- [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share)
- [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)

---

## 7. 快速檢查清單

### 開發前
- [ ] 閱讀本文件
- [ ] 確認平台需求（iOS 版本、Android API Level）
- [ ] 添加必要的依賴和權限

### iOS 實現
- [ ] 設置 WKScriptMessageHandler
- [ ] 實現 `rateApp` 消息處理
- [ ] 實現 `share` 消息處理
- [ ] 測試評分功能
- [ ] 測試分享功能

### Android 實現
- [ ] 添加 JavascriptInterface
- [ ] 實現 `rateApp()` 方法
- [ ] 實現 `share()` 方法
- [ ] 測試評分功能
- [ ] 測試分享功能

### 測試驗證
- [ ] 實機測試評分功能
- [ ] 實機測試分享功能
- [ ] 確認降級方案正常運作
- [ ] 跨平台測試（iOS + Android）

---

## 聯絡資訊

如有問題，請聯絡：
- 前端團隊：處理 Web 層邏輯
- iOS 團隊：處理 iOS 原生實現
- Android 團隊：處理 Android 原生實現
