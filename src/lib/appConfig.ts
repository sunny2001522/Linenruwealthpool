/**
 * 應用配置
 * 用於管理應用狀態、版本資訊和 App Store 連結
 */

// 審查模式開關（工程師需根據發布階段修改）
// true = 審查模式（使用原生 App Store 購買）
// false = 正式模式（使用網頁購買連結）
export const IS_REVIEW_MODE = false;

// 網頁購買連結
export const WEB_PURCHASE_URL = "https://www.cmoney.tw/app/itemcontent.aspx?id=3627";

// 線上客服連結
export const CUSTOMER_SERVICE_URL = "https://www.cmoney.tw/app/customer-service";

export const APP_CONFIG = {
  // 開發模式：true = 使用本地配置測試, false = 使用 API
  isDevelopment: true,
  
  /**
   * 本地測試用的狀態碼
   * 2: 審查模式 - App Store 審查期間
   * 1: 正常使用 - 應用正常運作
   * 0: 系統維護中 - 後端維護
   * -1: 需要更新 - 強制更新（不可取消）
   * -2: 建議更新 - 可選更新（可取消）
   */
  mockStatusCode: 1,
  
  // 當前應用版本
  currentVersion: "1.0.11",
  
  // API 端點
  apiEndpoint: "https://api.cmoney.com.tw/app/status",
  
  // API 請求逾時時間（毫秒）
  apiTimeout: 5000,
  
  // App Store 連結
  appStoreUrl: {
    ios: "https://apps.apple.com/app/id123456789",
    android: "https://play.google.com/store/apps/details?id=com.cmoney.enru"
  },
  
  // 快取時間（毫秒）- 30 分鐘
  cacheExpireTime: 30 * 60 * 1000,
  
  // 建議更新提醒頻率（天）
  updateReminderInterval: {
    firstTime: 0,      // 首次立即顯示
    secondTime: 1,     // 1天後再次顯示
    thirdTime: 3,      // 3天後再次顯示
    afterThat: 7       // 之後每7天顯示一次
  }
};

/**
 * 應用狀態回應介面
 */
export interface AppStatusResponse {
  statusCode: 2 | 1 | 0 | -1 | -2;
  message: string;
  data?: {
    latestVersion?: string;
    estimatedEndTime?: string;
    features?: string[];
    updateUrl?: {
      ios: string;
      android: string;
    };
  };
  timestamp?: string;
}

/**
 * 檢測平台
 */
export function detectPlatform(): 'ios' | 'android' | 'web' {
  const userAgent = navigator.userAgent.toLowerCase();
  
  if (/iphone|ipad|ipod/.test(userAgent)) {
    return 'ios';
  } else if (/android/.test(userAgent)) {
    return 'android';
  } else {
    return 'web';
  }
}

/**
 * 獲取 App Store URL
 */
export function getAppStoreUrl(): string {
  const platform = detectPlatform();
  return APP_CONFIG.appStoreUrl[platform === 'web' ? 'ios' : platform];
}