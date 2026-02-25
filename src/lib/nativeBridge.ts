/**
 * 原生功能橋接工具
 * 
 * 此文件提供 Web 與原生 App (iOS/Android) 之間的橋接功能
 * 工程師需要在原生端實現對應的功能
 */

/**
 * App 評分功能
 * 
 * iOS 實現：
 * - 使用 StoreKit 的 SKStoreReviewController.requestReview()
 * - 在 iOS 10.3+ 可使用原生評分彈窗
 * - URL Scheme: itms-apps://itunes.apple.com/app/id{APP_ID}?action=write-review
 * 
 * Android 實現：
 * - 使用 Google Play In-App Review API
 * - 或跳轉到 Play Store: market://details?id={PACKAGE_NAME}
 * - 網頁版: https://play.google.com/store/apps/details?id={PACKAGE_NAME}
 * 
 * 範例呼叫：
 * - iOS: window.webkit.messageHandlers.rateApp.postMessage({})
 * - Android: Android.rateApp()
 */
export function openAppRating() {
  // TODO: 工程師實現原生橋接
  
  // iOS 實現範例
  if (window.webkit?.messageHandlers?.rateApp) {
    window.webkit.messageHandlers.rateApp.postMessage({});
    return;
  }
  
  // Android 實現範例
  if (window.Android?.rateApp) {
    window.Android.rateApp();
    return;
  }
  
  // 開發/測試環境降級處理
  if (import.meta.env.DEV) {
    console.log('📱 [開發模式] App 評分功能');
    console.log('原生實現說明：');
    console.log('iOS: 使用 SKStoreReviewController.requestReview()');
    console.log('Android: 使用 Google Play In-App Review API');
    alert('🌟 App 評分功能\n\n此功能需要原生實現：\niOS: StoreKit\nAndroid: In-App Review API');
  } else {
    // 生產環境：跳轉到應用商店（作為降級方案）
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);
    
    if (isIOS) {
      // 替換為實際的 App Store ID
      window.location.href = 'itms-apps://itunes.apple.com/app/id{YOUR_APP_ID}?action=write-review';
    } else if (isAndroid) {
      // 替換為實際的 Package Name
      window.location.href = 'market://details?id={YOUR_PACKAGE_NAME}';
    }
  }
}

/**
 * 分享功能
 * 
 * iOS 實現：
 * - 使用 UIActivityViewController 顯示原生分享面板
 * - 支援分享文字、圖片、URL 等
 * 
 * Android 實現：
 * - 使用 Intent.ACTION_SEND 顯示原生分享選單
 * - 支援分享文字、圖片、URL 等
 * 
 * Web API 降級：
 * - 使用 Web Share API (navigator.share)
 * - 支援度：iOS Safari 12.2+, Android Chrome 89+
 * 
 * 範例呼叫：
 * - iOS: window.webkit.messageHandlers.share.postMessage({title, text, url})
 * - Android: Android.share(title, text, url)
 */
export interface ShareOptions {
  title?: string;
  text?: string;
  url?: string;
}

export async function shareToFriend(options: ShareOptions = {}) {
  const defaultOptions: ShareOptions = {
    title: '長線聚寶盆 - 台股選股神器',
    text: '推薦你使用長線聚寶盆，專業的台股選股應用！',
    url: 'https://www.cmoney.tw/app/itemcontent.aspx?id=3627',
    ...options
  };
  
  // TODO: 工程師實現原生橋接
  
  // iOS 實現範例
  if (window.webkit?.messageHandlers?.share) {
    window.webkit.messageHandlers.share.postMessage(defaultOptions);
    return;
  }
  
  // Android 實現範例
  if (window.Android?.share) {
    window.Android.share(
      defaultOptions.title || '',
      defaultOptions.text || '',
      defaultOptions.url || ''
    );
    return;
  }
  
  // Web Share API 降級方案（支援行動裝置）
  if (navigator.share) {
    try {
      await navigator.share(defaultOptions);
      console.log('✅ 分享成功');
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('❌ 分享失敗:', error);
        fallbackShare(defaultOptions);
      }
    }
    return;
  }
  
  // 開發/測試環境
  if (import.meta.env.DEV) {
    console.log('📱 [開發模式] 分享功能');
    console.log('分享內容:', defaultOptions);
    console.log('原生實現說明：');
    console.log('iOS: 使用 UIActivityViewController');
    console.log('Android: 使用 Intent.ACTION_SEND');
    alert(`📤 分享功能\n\n${defaultOptions.title}\n${defaultOptions.text}\n${defaultOptions.url}\n\n此功能需要原生實現：\niOS: UIActivityViewController\nAndroid: Intent.ACTION_SEND`);
  } else {
    // 最終降級方案：複製連結
    fallbackShare(defaultOptions);
  }
}

/**
 * 降級分享方案：複製連結到剪貼簿
 */
function fallbackShare(options: ShareOptions) {
  const shareText = `${options.title}\n${options.text}\n${options.url}`;
  
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(shareText)
      .then(() => {
        alert('📋 連結已複製到剪貼簿！');
      })
      .catch(() => {
        // 使用舊版複製方法
        legacyCopyToClipboard(shareText);
      });
  } else {
    legacyCopyToClipboard(shareText);
  }
}

/**
 * 舊版瀏覽器複製方法
 */
function legacyCopyToClipboard(text: string) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    document.execCommand('copy');
    alert('📋 連結已複製到剪貼簿！');
  } catch (err) {
    console.error('複製失敗:', err);
    alert('❌ 複製失敗，請手動複製連結');
  }
  
  document.body.removeChild(textarea);
}

/**
 * TypeScript 類型聲明：原生橋接接口
 */
declare global {
  interface Window {
    webkit?: {
      messageHandlers?: {
        rateApp?: {
          postMessage: (message: any) => void;
        };
        share?: {
          postMessage: (message: ShareOptions) => void;
        };
      };
    };
    Android?: {
      rateApp: () => void;
      share: (title: string, text: string, url: string) => void;
    };
  }
}

export {};
