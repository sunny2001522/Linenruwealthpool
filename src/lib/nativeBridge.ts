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

interface ShareOptions {
  title: string;
  text: string;
  url: string;
}

/**
 * 分享給好友功能
 */
export function shareToFriend() {
  const shareOptions: ShareOptions = {
    title: '恩如選股 App',
    text: '推薦你使用恩如選股 App，精準選股，輕鬆投資！',
    url: 'https://www.cmoney.tw/app/itemcontent.aspx?id=3627'
  };

  // iOS 實現
  if (window.webkit?.messageHandlers?.share) {
    window.webkit.messageHandlers.share.postMessage(shareOptions);
    return;
  }
  
  // Android 實現
  if (window.Android?.share) {
    window.Android.share(
      shareOptions.title,
      shareOptions.text,
      shareOptions.url
    );
    return;
  }
  
  // Web Share API (現代瀏覽器)
  if (navigator.share) {
    navigator.share(shareOptions)
      .catch((error) => {
        if (error.name !== 'AbortError') {
          console.error('分享失敗:', error);
          fallbackShare(shareOptions);
        }
      });
  } else {
    // 降級方案：複製到剪貼簿
    fallbackShare(shareOptions);
  }
}

/**
 * 開啟 App 評分功能
 * 
 * iOS 實現：
 * - 使用 SKStoreReviewController 請求評分
 * - 或打開 App Store 評分頁面
 * 
 * Android 實現：
 * - 使用 In-App Review API
 * - 或打開 Google Play 評分頁面
 */
export function openAppRating() {
  // iOS 實現
  if (window.webkit?.messageHandlers?.openAppRating) {
    window.webkit.messageHandlers.openAppRating.postMessage({});
    return;
  }
  
  // Android 實現
  if (window.Android?.openAppRating) {
    window.Android.openAppRating();
    return;
  }
  
  // 開發/測試環境
  if (import.meta.env.DEV) {
    console.log('⭐ [開發模式] 打開 App 評分');
    alert('⭐ App 評分\n\n此功能需要原生實現：\niOS: SKStoreReviewController\nAndroid: In-App Review API');
  } else {
    // 生產環境降級：使用 URL 打開評分頁面
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);
    
    if (isIOS) {
      // iOS App Store 評分頁面
      window.location.href = 'itms-apps://itunes.apple.com/app/id123456789?action=write-review';
    } else if (isAndroid) {
      // Google Play 評分頁面
      window.location.href = 'market://details?id=com.cmoney.enru';
    }
  }
}

/**
 * 開啟 App Store 更新頁面
 * 
 * iOS 實現：
 * - 使用 URL Scheme 打開 App Store
 * - URL: itms-apps://itunes.apple.com/app/id{APP_ID}
 * 
 * Android 實現：
 * - 使用 Intent 打開 Google Play
 * - URL: market://details?id={PACKAGE_NAME}
 * 
 * 範例呼叫：
 * - iOS: window.webkit.messageHandlers.openAppStore.postMessage({})
 * - Android: Android.openAppStore()
 */
export function openAppStore() {
  // iOS 實現
  if (window.webkit?.messageHandlers?.openAppStore) {
    window.webkit.messageHandlers.openAppStore.postMessage({});
    return;
  }
  
  // Android 實現
  if (window.Android?.openAppStore) {
    window.Android.openAppStore();
    return;
  }
  
  // 開發/測試環境
  if (import.meta.env.DEV) {
    console.log('📱 [開發模式] 打開 App Store');
    alert('🏪 App Store 更新\n\n此功能需要原生實現：\niOS: 打開 App Store\nAndroid: 打開 Google Play');
  } else {
    // 生產環境降級：使用 URL 打開
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);
    
    if (isIOS) {
      // iOS App Store URL
      window.location.href = 'itms-apps://itunes.apple.com/app/id123456789';
    } else if (isAndroid) {
      // Google Play URL
      window.location.href = 'market://details?id=com.cmoney.enru';
    }
  }
}