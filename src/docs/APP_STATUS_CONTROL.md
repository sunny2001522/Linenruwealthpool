# 應用狀態控制系統 - PRD

## 更新日期
2026年3月3日

---

## 一、功能概述

應用狀態控制系統用於管理應用的可用狀態，包括審查模式、正常使用、系統維護、強制更新和建議更新等狀態。此系統在應用啟動時（WelcomePage）進行檢查，確保用戶使用的是最新且可用的版本。

---

## 二、狀態碼定義

### 狀態碼表

| 狀態碼 | 狀態名稱 | 說明 | 用戶體驗 | 是否可取消 |
|-------|---------|------|---------|-----------|
| 2 | 審查模式 | App Store 審查期間使用的特殊模式 | 正常使用，但購買功能導向原生 App Store | N/A |
| 1 | 正常使用 | 應用正常運作狀態 | 正常使用所有功能 | N/A |
| 0 | 系統維護中 | 後端系統維護或升級 | 顯示維護公告，無法使用應用 | 否 |
| -1 | 需要更新 | 強制更新到最新版本 | 顯示強制更新彈窗，必須更新才能使用 | 否 |
| -2 | 建議更新 | 建議更新但非強制 | 顯示建議更新彈窗，可選擇稍後 | 是 |

---

## 三、狀態檢查流程

### 3.1 檢查時機

**主要檢查點：**
1. **應用啟動時** - WelcomePage 載入時
2. **從背景恢復時** - 應用從背景切回前景時
3. **定期檢查** - 應用運行時每 30 分鐘檢查一次

### 3.2 檢查流程圖

```
應用啟動
    ↓
獲取應用狀態 (API)
    ↓
判斷狀態碼
    ├─ 狀態碼 = 2  → 啟用審查模式 → 繼續進入應用
    ├─ 狀態碼 = 1  → 正常模式 → 繼續進入應用
    ├─ 狀態碼 = 0  → 顯示維護頁面 → 無法進入
    ├─ 狀態碼 = -1 → 顯示強制更新彈窗 → 導向 App Store
    └─ 狀態碼 = -2 → 顯示建議更新彈窗 → 可選擇稍後
```

---

## 四、各狀態詳細說明

### 4.1 審查模式 (狀態碼 2)

**使用場景：**
- 提交 App Store 審查時
- Apple 審查期間

**功能特點：**
1. 購買功能導向原生 IAP（In-App Purchase）
2. 不顯示外部連結或網頁購買選項
3. 所有其他功能正常運作
4. 內容審核更嚴格

**開發實作：**
```typescript
if (appStatus === 2) {
  // 啟用審查模式
  enableReviewMode();
  // 購買功能使用原生 IAP
  usePurchaseMethod('native');
}
```

**判斷方式：**
- 後端 API 返回狀態碼
- 工程師在提交審查前手動切換後端設定

---

### 4.2 正常使用 (狀態碼 1)

**使用場景：**
- 應用正式上線後的日常使用

**功能特點：**
1. 所有功能完全開放
2. 購買可導向內部網頁或原生 IAP（根據配置）
3. 正常的分析追蹤和數據收集

**開發實作：**
```typescript
if (appStatus === 1) {
  // 正常模式
  enableNormalMode();
  // 購買功能使用配置的方式（網頁或原生）
  usePurchaseMethod(config.purchaseMethod);
}
```

---

### 4.3 系統維護中 (狀態碼 0)

**使用場景：**
- 後端系統升級
- 重大功能更新部署
- 緊急維護

**功能特點：**
1. 顯示維護公告頁面
2. 無法進入應用主功能
3. 顯示預計恢復時間
4. 提供客服聯絡方式

**視覺設計：**
- 背景：深色漸層
- 主圖示：維護工具圖標（扳手或齒輪）
- 標題：「系統維護中」
- 說明文字：維護原因和預計時間
- 按鈕：「重新整理」檢查狀態

**開發實作：**
```typescript
if (appStatus === 0) {
  showMaintenanceScreen({
    title: "系統維護中",
    message: maintenanceInfo.message,
    estimatedTime: maintenanceInfo.estimatedTime,
    onRefresh: checkAppStatus
  });
}
```

**API 回應範例：**
```json
{
  "statusCode": 0,
  "message": "系統維護升級中，預計 2 小時後恢復",
  "estimatedEndTime": "2026-03-03T18:00:00Z",
  "contactEmail": "support@cmoney.com.tw"
}
```

---

### 4.4 需要更新 / 強制更新 (狀態碼 -1)

**使用場景：**
1. 發現重大安全漏洞
2. 舊版本無法正常運作
3. API 版本不相容
4. 重大功能變更

**功能特點：**
1. **彈窗無法關閉** - 無「取消」或「X」按鈕
2. **唯一操作** - 只能點擊「立即更新」
3. **阻擋應用使用** - 無法繞過進入應用
4. **自動導向** - 直接開啟 App Store 更新頁面

**視覺設計：**
- 彈窗尺寸：最大寬度 360px
- 背景遮罩：黑色半透明 (opacity: 0.8)
- 卡片背景：深色卡片 (#1C1410)
- 圖標：警告圖示（橘紅色 #FF6B6B）
- 標題：「需要更新」(text-xl, font-bold)
- 說明文字：更新原因 (text-sm, text-muted-foreground)
- 按鈕：金色漸層按鈕 (#D4AF37)
- 按鈕文字：「立即更新」(font-bold)

**開發實作：**
```typescript
if (appStatus === -1) {
  showForceUpdateDialog({
    title: "需要更新",
    message: updateInfo.message || "為了提供更好的服務，請更新到最新版本",
    version: updateInfo.latestVersion,
    dismissible: false, // 不可關閉
    onUpdate: () => {
      openAppStore();
    }
  });
}
```

**原生橋接實作：**

**iOS (Swift):**
```swift
func openAppStore() {
    let appStoreURL = "https://apps.apple.com/app/id你的AppID"
    if let url = URL(string: appStoreURL) {
        UIApplication.shared.open(url)
    }
}
```

**Android (Kotlin):**
```kotlin
fun openAppStore() {
    val appPackageName = applicationContext.packageName
    try {
        startActivity(Intent(Intent.ACTION_VIEW, Uri.parse("market://details?id=$appPackageName")))
    } catch (e: ActivityNotFoundException) {
        startActivity(Intent(Intent.ACTION_VIEW, Uri.parse("https://play.google.com/store/apps/details?id=$appPackageName")))
    }
}
```

**API 回應範例：**
```json
{
  "statusCode": -1,
  "message": "發現重要安全性更新，請立即更新到最新版本",
  "latestVersion": "1.2.0",
  "currentVersion": "1.0.11",
  "updateUrl": {
    "ios": "https://apps.apple.com/app/id你的AppID",
    "android": "https://play.google.com/store/apps/details?id=com.cmoney.enru"
  }
}
```

---

### 4.5 建議更新 (狀態碼 -2)

**使用場景：**
1. 新功能發布
2. 效能優化
3. UI/UX 改進
4. 非關鍵性 bug 修復

**功能特點：**
1. **可關閉彈窗** - 提供「X」關閉按鈕或「稍後」按鈕
2. **雙選項** - 「立即更新」和「稍後提醒」
3. **可繼續使用** - 選擇稍後後可正常使用應用
4. **再次提醒** - 下次啟動時再次顯示（可設定提醒頻率）

**視覺設計：**
- 彈窗尺寸：最大寬度 360px
- 背景遮罩：黑色半透明 (opacity: 0.6)
- 卡片背景：深色卡片 (#1C1410)
- 圖標：通知圖示（藍色 #4A90E2）
- 標題：「發現新版本」(text-xl, font-bold)
- 說明文字：更新內容亮點 (text-sm, text-muted-foreground)
- 主按鈕：藍色漸層按鈕 (#4A90E2)
- 次要按鈕：灰色邊框按鈕
- 關閉按鈕：右上角 X 圖標

**開發實作：**
```typescript
if (appStatus === -2) {
  showSuggestUpdateDialog({
    title: "發現新版本",
    message: updateInfo.message || "新版本已發布，建議更新以獲得更好的體驗",
    version: updateInfo.latestVersion,
    features: updateInfo.features, // 更新亮點
    dismissible: true, // 可關閉
    onUpdate: () => {
      openAppStore();
    },
    onLater: () => {
      // 記錄稍後提醒
      setUpdateReminderLater();
    }
  });
}
```

**再次提醒邏輯：**
```typescript
// 提醒頻率設定
const REMINDER_INTERVAL = {
  firstTime: 0,        // 首次立即顯示
  secondTime: 1,       // 1天後再次顯示
  thirdTime: 3,        // 3天後再次顯示
  afterThat: 7         // 之後每7天顯示一次
};

function shouldShowUpdateReminder(): boolean {
  const lastDismissTime = getLastUpdateDismissTime();
  const dismissCount = getUpdateDismissCount();
  
  if (!lastDismissTime) return true; // 首次顯示
  
  const daysSinceDismiss = getDaysSince(lastDismissTime);
  
  if (dismissCount === 1 && daysSinceDismiss >= 1) return true;
  if (dismissCount === 2 && daysSinceDismiss >= 3) return true;
  if (dismissCount >= 3 && daysSinceDismiss >= 7) return true;
  
  return false;
}
```

**API 回應範例：**
```json
{
  "statusCode": -2,
  "message": "新版本 v1.2.0 已發布",
  "latestVersion": "1.2.0",
  "currentVersion": "1.0.11",
  "features": [
    "新增股票對比功能",
    "優化選股頁面載入速度",
    "修復已知問題"
  ],
  "updateUrl": {
    "ios": "https://apps.apple.com/app/id你的AppID",
    "android": "https://play.google.com/store/apps/details?id=com.cmoney.enru"
  }
}
```

---

## 五、API 規格

### 5.1 狀態檢查 API

**端點：** `GET /api/v1/app/status`

**請求參數：**
```typescript
{
  "appVersion": "1.0.11",    // 當前應用版本
  "platform": "ios",          // 平台：ios / android
  "deviceId": "uuid-string"   // 設備唯一識別碼
}
```

**回應格式：**
```typescript
{
  "statusCode": number,       // 狀態碼：2, 1, 0, -1, -2
  "message": string,          // 給用戶看的訊息
  "data": {
    "latestVersion"?: string,      // 最新版本號（更新時需要）
    "estimatedEndTime"?: string,   // 維護預計結束時間（維護時需要）
    "features"?: string[],         // 更新亮點（建議更新時）
    "updateUrl"?: {
      "ios": string,
      "android": string
    }
  },
  "timestamp": string         // 伺服器時間戳
}
```

**回應範例 - 正常狀態：**
```json
{
  "statusCode": 1,
  "message": "應用運作正常",
  "data": {},
  "timestamp": "2026-03-03T10:30:00Z"
}
```

**回應範例 - 強制更新：**
```json
{
  "statusCode": -1,
  "message": "為了提供更好的服務，請更新到最新版本",
  "data": {
    "latestVersion": "1.2.0",
    "updateUrl": {
      "ios": "https://apps.apple.com/app/id123456789",
      "android": "https://play.google.com/store/apps/details?id=com.cmoney.enru"
    }
  },
  "timestamp": "2026-03-03T10:30:00Z"
}
```

---

## 六、本地配置與測試

### 6.1 開發環境配置

在開發和測試階段，可以使用本地配置來模擬不同的狀態：

**配置檔案：** `/lib/appConfig.ts`

```typescript
export const APP_CONFIG = {
  // 開發模式：true = 使用本地配置, false = 使用 API
  isDevelopment: true,
  
  // 本地測試用的狀態碼
  mockStatusCode: 1, // 可改為 2, 1, 0, -1, -2 進行測試
  
  // API 端點
  statusCheckEndpoint: "https://api.cmoney.com.tw/app/status",
  
  // App Store 連結
  appStoreUrl: {
    ios: "https://apps.apple.com/app/id123456789",
    android: "https://play.google.com/store/apps/details?id=com.cmoney.enru"
  },
  
  // 當前版本
  currentVersion: "1.0.11"
};
```

### 6.2 測試場景

**測試檢查清單：**
- [ ] 狀態碼 2 - 審查模式正常運作
- [ ] 狀態碼 1 - 正常使用狀態
- [ ] 狀態碼 0 - 維護頁面顯示正確
- [ ] 狀態碼 -1 - 強制更新彈窗無法關閉
- [ ] 狀態碼 -1 - 點擊更新正確導向 App Store
- [ ] 狀態碼 -2 - 建議更新彈窗可關閉
- [ ] 狀態碼 -2 - 點擊稍後可正常使用應用
- [ ] 狀態碼 -2 - 再次提醒邏輯正確
- [ ] API 錯誤時的容錯處理
- [ ] 網路斷線時的處理

---

## 七、錯誤處理與容錯

### 7.1 API 失敗處理

**原則：**
- **失敗默認策略** - API 檢查失敗時，默認為「正常使用」狀態
- **不阻擋用戶** - 網路問題不應影響應用使用
- **本地快取** - 快取上次成功的狀態，網路失敗時使用快取

**實作：**
```typescript
async function checkAppStatus(): Promise<AppStatus> {
  try {
    const response = await fetch(API_ENDPOINT, { timeout: 5000 });
    const data = await response.json();
    
    // 快取成功的回應
    await cacheAppStatus(data);
    
    return data;
  } catch (error) {
    console.error('狀態檢查失敗:', error);
    
    // 嘗試使用快取
    const cached = await getCachedAppStatus();
    if (cached && !isExpired(cached)) {
      return cached;
    }
    
    // 默認為正常狀態
    return {
      statusCode: 1,
      message: "應用運作正常",
      data: {}
    };
  }
}
```

### 7.2 用戶體驗考量

1. **Loading 狀態** - 檢查時顯示載入動畫
2. **逾時處理** - 5 秒逾時，自動使用快取或默認狀態
3. **重試機制** - 失敗後提供「重試」選項
4. **離線模式** - 完全離線時允許使用應用

---

## 八、開發實作指南

### 8.1 原生橋接模組

**檔案位置：** `/lib/nativeBridge.ts`

需要新增：
```typescript
export async function openAppStore(): Promise<void> {
  if (window.NativeBridge && window.NativeBridge.openAppStore) {
    return window.NativeBridge.openAppStore();
  } else {
    // Web fallback - 在瀏覽器中打開
    const platform = detectPlatform();
    const url = APP_CONFIG.appStoreUrl[platform];
    window.open(url, '_blank');
  }
}

export async function checkAppStatus(): Promise<AppStatusResponse> {
  if (window.NativeBridge && window.NativeBridge.checkAppStatus) {
    return window.NativeBridge.checkAppStatus();
  } else {
    // Web fallback - 調用 API
    return fetchAppStatus();
  }
}
```

### 8.2 狀態管理

建議使用 Context 管理應用狀態：

```typescript
// lib/appStatusContext.tsx
interface AppStatusContextType {
  status: AppStatus | null;
  isLoading: boolean;
  checkStatus: () => Promise<void>;
  isReviewMode: boolean;
}

export function AppStatusProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AppStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const checkStatus = async () => {
    setIsLoading(true);
    const result = await checkAppStatus();
    setStatus(result);
    setIsLoading(false);
  };
  
  useEffect(() => {
    checkStatus();
  }, []);
  
  return (
    <AppStatusContext.Provider value={{
      status,
      isLoading,
      checkStatus,
      isReviewMode: status?.statusCode === 2
    }}>
      {children}
    </AppStatusContext.Provider>
  );
}
```

---

## 九、上線部署流程

### 9.1 審查期間設定

**步驟：**
1. 後端將狀態碼設為 `2`
2. 提交應用到 App Store / Play Store
3. 等待審查通過
4. 審查通過後，後端改回狀態碼 `1`

### 9.2 強制更新流程

**觸發條件：**
- 發現重大安全漏洞
- 舊版本無法正常運作
- API 重大變更

**執行步驟：**
1. 發布新版本到 App Store / Play Store
2. 確認新版本上架成功
3. 後端將狀態碼改為 `-1`
4. 所有舊版本用戶將看到強制更新提示

### 9.3 系統維護流程

**執行步驟：**
1. 提前公告維護時間
2. 維護開始前 10 分鐘，後端改為狀態碼 `0`
3. 執行維護作業
4. 維護完成後，改回狀態碼 `1`
5. 通知用戶系統已恢復

---

## 十、監控與分析

### 10.1 數據追蹤

**建議追蹤指標：**
1. 各狀態碼的觸發次數
2. 強制更新的完成率
3. 建議更新的採用率
4. 用戶更新所需時間
5. 不同版本的用戶分布

### 10.2 A/B 測試

可針對「建議更新」進行 A/B 測試：
- 不同的文案說明
- 不同的提醒頻率
- 不同的視覺設計

---

## 十一、常見問題

### Q1: 用戶一直不更新怎麼辦？
**A:** 建議更新狀態（-2）會逐漸增加提醒頻率。如果確實需要強制更新，可將狀態改為 -1。

### Q2: 審查期間如何測試購買功能？
**A:** 使用狀態碼 2 進入審查模式，此時購買功能會自動切換為原生 IAP。

### Q3: API 失敗會影響用戶使用嗎？
**A:** 不會。API 失敗時會使用快取或默認為正常狀態（狀態碼 1）。

### Q4: 如何在開發環境測試不同狀態？
**A:** 修改 `/lib/appConfig.ts` 中的 `mockStatusCode` 值。

---

## 十二、相關文件

- **購買配置文檔：** `/docs/PURCHASE_CONFIG.md`
- **原生功能文檔：** `/docs/NATIVE_FEATURES.md`
- **開發者配置：** `/docs/DEVELOPER_CONFIG.md`
- **歡迎登入流程：** `/docs/WELCOME_LOGIN_FLOW.md`

---

## 十三、更新歷史

| 日期 | 版本 | 更新內容 | 負責人 |
|------|------|---------|--------|
| 2026-03-03 | 1.0 | 初版：應用狀態控制系統完整規劃 | - |
