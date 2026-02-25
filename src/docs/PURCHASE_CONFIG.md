# 購買流程配置說明

## 概述

應用程式支援兩種購買模式：
1. **審查模式（Review Mode）**：用於 App Store 審查，使用原生購買流程
2. **正式模式（Normal Mode）**：上架後使用，導向內部網頁購買

同時支援網頁內嵌功能：
- **購買頁面**：根據審查狀態切換
- **線上客服**：內嵌 CMoney 客服網頁

## 配置方式

### 修改審查狀態

編輯文件：`/lib/appConfig.ts`

```typescript
// 審查模式：設為 true
export const IS_REVIEW_MODE = true;

// 正式模式：設為 false
export const IS_REVIEW_MODE = false;

// 網頁購買連結
export const WEB_PURCHASE_URL = "https://www.cmoney.tw/app/itemcontent.aspx?id=3627";

// 線上客服連結
export const CUSTOMER_SERVICE_URL = "https://www.cmoney.tw/app/customer-service";
```

### 何時修改

| 情況 | IS_REVIEW_MODE | 說明 |
|------|----------------|------|
| 提交 App Store 審查 | `true` | 使用原生 App Store 購買流程 |
| 審查通過後正式版本 | `false` | 使用內部網頁購買 |
| 開發測試 | `false` | 使用網頁購買方便測試 |

## 流程說明

### 審查模式 (IS_REVIEW_MODE = true)

```
用戶點擊購買
  ↓
SubscriptionModal 彈窗
  ↓
選擇訂閱方案
  ↓
跳轉到 /purchase 頁面
  ↓
使用原生 App Store 購買
```

### 正式模式 (IS_REVIEW_MODE = false)

```
用戶點擊購買
  ↓
SubscriptionModal 彈窗
  ↓
選擇訂閱方案（任一方案）
  ↓
跳轉到 /web-purchase 頁面
  ↓
顯示內嵌網頁：https://www.cmoney.tw/app/itemcontent.aspx?id=3627
  ↓
可點擊返回按鈕回到前一頁
```

### 線上客服流程

```
用戶點擊線上客服
  ↓
跳轉到 /customer-service 頁面
  ↓
顯示內嵌網頁：配置的客服網址
  ↓
可點擊返回按鈕回到前一頁
```

## 相關文件

- `/lib/appConfig.ts` - 配置文件
- `/components/SubscriptionModal.tsx` - 購買彈窗
- `/pages/PurchasePage.tsx` - 原生購買頁面（審查模式）
- `/pages/WebPurchasePage.tsx` - 網頁購買頁面（正式模式）
- `/pages/CustomerServicePage.tsx` - 線上客服頁面（網頁內嵌）
- `/routes.ts` - 路由配置

## 測試檢查清單

### 審查模式測試
- [ ] 點擊購買按鈕能正確跳轉到 `/purchase` 頁面
- [ ] 顯示原生購買流程
- [ ] 購買完成後能正確升級為專業版

### 正式模式測試
- [ ] 點擊購買按鈕能正確跳轉到 `/web-purchase` 頁面
- [ ] 網頁正確載入 CMoney 購買頁面
- [ ] 返回按鈕能正確回到前一頁
- [ ] 購買完成後能正確升級為專業版

### 線上客服測試
- [ ] 點擊線上客服按鈕能正確跳轉到 `/customer-service` 頁面
- [ ] 網頁正確載入 CMoney 客服頁面
- [ ] 返回按鈕能正確回到前一頁

## 注意事項

1. **發布前檢查**：確認 `IS_REVIEW_MODE` 設定正確
2. **網頁連結**：若購買或客服網址變更，請修改 `appConfig.ts` 中的對應配置
3. **測試環境**：開發時建議使用正式模式（false）方便測試
4. **版本控制**：提交審查時記得修改配置並標記版本