# 開場介紹頁面與登入流程 - 開發文檔

## 更新日期
2026年3月3日

## 更新內容概述
本次更新簡化了登入流程設計，直接從歡迎頁面進入應用，移除了獨立的登入頁面，提供更流暢的使用者體驗。

---

## 一、頁面結構

### 1. WelcomePage.tsx
**檔案路徑：** `/pages/WelcomePage.tsx`

**功能說明：**
- App 首次啟動顯示的開場頁面
- 提供「登入」和「訪客快速體驗」兩種進入方式
- 點擊「登入」直接以專業版身份進入主應用
- 點擊「訪客快速體驗」以試用版身份進入主應用

**視覺設計特點：**
- 背景漸層：從 #2A1F1A 經 #1C1410 到黑色
- Logo：林恩如頭像 + 「長線聚寶盆」標題
- 登入按鈕：藍色漸層 (#4A90E2 到 #6BB6FF)
- 訪客體驗按鈕：半透明白色邊框設計
- 版本號顯示於底部

**核心邏輯：**
```typescript
const handleLogin = () => {
  // 直接登入為專業版用戶
  login("pro@example.com", "123456");
  navigate("/home");
};

const handleGuestTrial = () => {
  // 以訪客身份快速體驗（試用版）
  loginAsGuest();
  navigate("/home");
};
```

---

## 二、認證系統

### authContext.tsx
**檔案路徑：** `/lib/authContext.tsx`

**測試帳號列表：**
```typescript
const TEST_ACCOUNTS = [
  { email: "test@example.com", password: "123456", name: "測試用戶", isPro: false },
  { email: "vip@example.com", password: "123456", name: "VIP會員", isPro: true },
  { email: "pro@example.com", password: "123456", name: "專業版會員", isPro: true },
  { email: "demo@example.com", password: "demo123", name: "示範帳號", isPro: false }
];
```

**核心方法：**
- `login(email, password)`: 登入為指定帳號
- `loginAsGuest()`: 以試用版訪客身份登入
- `logout()`: 登出並返回歡迎頁面
- `upgradeToPro()`: 升級為專業版
- `downgradeToTrial()`: 降級為試用版

---

## 三、路由結構

### routes.ts
**檔案路徑：** `/routes.ts`

**路由配置：**
```
/ (根路徑) → WelcomePage
/home → Layout (主應用容器)
  ├─ /home (index) → HomePage
  ├─ /home/stock-picker → StockPickerPage
  ├─ /home/watchlist → WatchlistPage
  ├─ /home/discussion → DiscussionPage
  ├─ /home/content → ContentPage
  └─ /home/more → MorePage
```

**獨立頁面：**
- `/guide` - 新手教學
- `/edit-profile` - 編輯個人資料
- `/notification-settings` - 通知設定
- `/customer-service` - 客服中心
- `/help-center` - 幫助中心
- `/purchase` - 購買頁面（原生 App Store）
- `/web-purchase` - 網頁購買頁面
- `/stock/:code` - 股票詳情頁

---

## 四、導航流程

### 登入流程
```
WelcomePage (/)
├─ 點擊「登入」
│  └─ 以專業版身份登入 → /home
└─ 點擊「訪客快速體驗」
   └─ 以試用版身份登入 → /home
```

### 登出流程
```
MorePage (/home/more)
└─ 點擊「登出」
   └─ 清除用戶狀態 → WelcomePage (/)
```

---

## 五、VIP 權限功能控制

### 權限狀態定義
| 權限類型 | isPro | 說明 | 取得方式 |
|---------|-------|------|---------|
| 專業版會員 | true | 完整功能 | 「登入」按鈕 |
| 試用版用戶 | false | 部分限制 | 「訪客快速體驗」按鈕 |

### 專業版權限
- ✓ 選股頁面：完整顯示所有股票
- ✓ 恩如三部曲評分：完整 0-2 星評分
- ✓ 影音內容：無限制觀看 + 離線下載
- ✓ 社團功能：無限制發文與互動
- ✓ 自選股：無上限儲存

### 試用版限制
- ✗ 選股頁面：僅顯示前 3 支股票
- ✗ 第 4 支以後：模糊效果 + 金色鎖頭圖標
- ✗ 影音內容：前 30 秒預覽 + 每日限制 3 則
- ✗ 社團功能：每日發文限制 3 則
- ✗ 自選股：最多 10 支股票

### 鎖定視覺設計
- 高斯模糊：`blur(8px)`
- 鎖頭圖標：金色 (#D4AF37)，32px
- 升級提示：半透明黑底白字
- 升級按鈕：金色背景 (#D4AF37)

---

## 六、視覺設計規範

### 配色方案
- **主色調藍色：** #4A90E2
- **藍色漸層終點：** #6BB6FF
- **深色背景起點：** #2A1F1A
- **深色背景中點：** #1C1410
- **深色背景終點：** #000000
- **金色強調：** #D4AF37
- **白色：** #FFFFFF
- **文字淺色：** rgba(255,255,255,0.4)

### 尺寸規範
- **Logo 圖片：** 192px (h-48)
- **主標題：** 30px (text-3xl)
- **登入按鈕：** 寬度 100%, padding-y 16px
- **訪客按鈕：** 寬度 100%, padding-y 16px
- **圓角：** 12px (rounded-xl)
- **鎖頭圖標：** 32px
- **模糊效果：** 8px

---

## 七、功能限制對照表

### 選股頁面
| 用戶類型 | 可見股票數 | 視覺效果 | 升級提示 |
|---------|-----------|---------|---------|
| 專業版 | 全部 | 正常顯示 | 無 |
| 試用版 | 前3支 | 第4支後模糊 | 金色鎖頭 + 升級文字 |

### 影音內容
| 用戶類型 | 觀看權限 | 每日限制 | 特殊功能 |
|---------|---------|---------|---------|
| 專業版 | 無限制 | 無 | 離線下載 |
| 試用版 | 前30秒 | 3則 | 無 |

### 社團功能
| 用戶類型 | 發文權限 | 互動功能 | 每日限制 |
|---------|---------|---------|---------|
| 專業版 | 無限制 | 完整 | 無 |
| 試用版 | 可發文 | 部分限制 | 3則/日 |

### 自選股
| 用戶類型 | 儲存上限 | 清單數量 | 功能 |
|---------|---------|---------|------|
| 專業版 | 無限制 | 多組 | 完整 |
| 試用版 | 10支 | 1組 | 基本 |

---

## 八、開發檢查清單

### 前端開發
- [x] WelcomePage.tsx 元件實作
- [x] 登入按鈕事件處理
- [x] 訪客模式按鈕事件處理
- [x] 背景漸層效果
- [x] 按鈕漸層效果
- [x] 路由配置更新

### 認證系統
- [x] authContext.tsx 更新
- [x] login 方法實作
- [x] loginAsGuest 方法實作
- [x] logout 導航至歡迎頁
- [x] 測試帳號配置

### 導航與路由
- [x] 根路徑指向 WelcomePage
- [x] 主應用移至 /home 路徑
- [x] 所有內部導航更新
- [x] 登出返回歡迎頁

### 權限控制
- [x] VIP 狀態判斷
- [x] 功能鎖定視覺效果
- [x] 升級提示彈窗
- [x] 試用版限制實作

---

## 九、相關文件連結

- **PRD 完整文檔：** `/docs/PRD.md`
- **購買配置文檔：** `/docs/PURCHASE_CONFIG.md`
- **原生功能文檔：** `/docs/NATIVE_FEATURES.md`
- **原生轉換指南：** `/docs/NATIVE_CONVERSION_GUIDE.md`
- **開發者配置：** `/docs/DEVELOPER_CONFIG.md`

---

## 十、更新歷史

| 日期 | 版本 | 更新內容 | 負責人 |
|------|------|---------|--------|
| 2026-03-03 | 2.0 | 簡化登入流程，移除獨立登入頁面 | - |
| 2026-03-03 | 1.0 | 初版：開場介紹頁面與登入流程完整規劃 | - |

---

## 聯絡資訊

如有任何問題或需要進一步說明，請聯繫開發團隊。

**測試帳號：** queen_dtno@cmoney.com.tw / cmoney1234