import { APP_CONFIG, AppStatusResponse, detectPlatform } from './appConfig';

const CACHE_KEY = 'app_status_cache';
const UPDATE_DISMISS_KEY = 'update_dismiss_info';

/**
 * 從 API 獲取應用狀態
 */
async function fetchAppStatus(): Promise<AppStatusResponse> {
  const platform = detectPlatform();
  
  const response = await fetch(APP_CONFIG.apiEndpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    signal: AbortSignal.timeout(APP_CONFIG.apiTimeout),
  });
  
  if (!response.ok) {
    throw new Error(`API 請求失敗: ${response.status}`);
  }
  
  return response.json();
}

/**
 * 從本地快取獲取狀態
 */
function getCachedStatus(): AppStatusResponse | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    const { data, timestamp } = JSON.parse(cached);
    const now = Date.now();
    
    // 檢查是否過期
    if (now - timestamp > APP_CONFIG.cacheExpireTime) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('讀取快取失敗:', error);
    return null;
  }
}

/**
 * 儲存狀態到快取
 */
function cacheStatus(status: AppStatusResponse): void {
  try {
    const cacheData = {
      data: status,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error('儲存快取失敗:', error);
  }
}

/**
 * 檢查應用狀態
 * 優先使用 API，失敗時使用快取，都失敗時返回正常狀態
 */
export async function checkAppStatus(): Promise<AppStatusResponse> {
  // 開發模式：使用本地配置
  if (APP_CONFIG.isDevelopment) {
    return {
      statusCode: APP_CONFIG.mockStatusCode as AppStatusResponse['statusCode'],
      message: getStatusMessage(APP_CONFIG.mockStatusCode),
      data: getMockData(APP_CONFIG.mockStatusCode),
    };
  }
  
  try {
    // 嘗試從 API 獲取
    const status = await fetchAppStatus();
    
    // 快取成功的回應
    cacheStatus(status);
    
    return status;
  } catch (error) {
    console.error('狀態檢查失敗:', error);
    
    // 嘗試使用快取
    const cached = getCachedStatus();
    if (cached) {
      console.log('使用快取的狀態');
      return cached;
    }
    
    // 都失敗：返回正常狀態（不阻擋用戶使用）
    console.log('使用默認正常狀態');
    return {
      statusCode: 1,
      message: '應用運作正常',
      data: {},
    };
  }
}

/**
 * 獲取狀態訊息（用於本地開發）
 */
function getStatusMessage(statusCode: number): string {
  switch (statusCode) {
    case 2:
      return '審查模式啟用';
    case 1:
      return '應用運作正常';
    case 0:
      return '系統維護中，預計 2 小時後恢復';
    case -1:
      return '為了提供更好的服務，請更新到最新版本';
    case -2:
      return '新版本已發布，建議更新以獲得更好的體驗';
    default:
      return '未知狀態';
  }
}

/**
 * 獲取模擬數據（用於本地開發）
 */
function getMockData(statusCode: number): AppStatusResponse['data'] {
  switch (statusCode) {
    case 0:
      return {
        estimatedEndTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      };
    case -1:
    case -2:
      return {
        latestVersion: '1.2.0',
        features: [
          '新增股票對比功能',
          '優化選股頁面載入速度',
          '修復已知問題',
        ],
        updateUrl: APP_CONFIG.appStoreUrl,
      };
    default:
      return {};
  }
}

/**
 * 更新提醒相關
 */

interface UpdateDismissInfo {
  count: number;
  lastDismissTime: number;
}

/**
 * 獲取更新提醒忽略資訊
 */
function getUpdateDismissInfo(): UpdateDismissInfo {
  try {
    const info = localStorage.getItem(UPDATE_DISMISS_KEY);
    if (!info) {
      return { count: 0, lastDismissTime: 0 };
    }
    return JSON.parse(info);
  } catch (error) {
    return { count: 0, lastDismissTime: 0 };
  }
}

/**
 * 記錄用戶忽略更新提醒
 */
export function recordUpdateDismiss(): void {
  const info = getUpdateDismissInfo();
  const newInfo: UpdateDismissInfo = {
    count: info.count + 1,
    lastDismissTime: Date.now(),
  };
  localStorage.setItem(UPDATE_DISMISS_KEY, JSON.stringify(newInfo));
}

/**
 * 清除更新提醒記錄（用戶完成更新後）
 */
export function clearUpdateDismiss(): void {
  localStorage.removeItem(UPDATE_DISMISS_KEY);
}

/**
 * 檢查是否應該顯示更新提醒
 */
export function shouldShowUpdateReminder(): boolean {
  const info = getUpdateDismissInfo();
  
  // 首次顯示
  if (info.count === 0) {
    return true;
  }
  
  const daysSinceDismiss = Math.floor(
    (Date.now() - info.lastDismissTime) / (1000 * 60 * 60 * 24)
  );
  
  const intervals = APP_CONFIG.updateReminderInterval;
  
  // 根據忽略次數決定提醒間隔
  if (info.count === 1 && daysSinceDismiss >= intervals.secondTime) {
    return true;
  }
  if (info.count === 2 && daysSinceDismiss >= intervals.thirdTime) {
    return true;
  }
  if (info.count >= 3 && daysSinceDismiss >= intervals.afterThat) {
    return true;
  }
  
  return false;
}
