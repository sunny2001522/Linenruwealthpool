/**
 * Assets Index - 圖片資源統一管理
 * 
 * 注意：此檔案為 React Native 實際開發用
 * 請將圖片檔案放置於對應平台的資源資料夾中
 * 
 * iOS: Assets.xcassets
 * Android: res/drawable
 */

// ===== React Native 圖片引用方式 =====
// 注意：實際開發時請使用 require() 或 Image.resolveAssetSource()

export const images = {
  // ===== 用戶頭像 / User Avatars =====
  avatarDefault: require('./images/avatar_default.png'),
  
  // ===== 星星圖示 / Star Icons =====
  starEmpty: require('./images/star_empty.png'),
  starHalf: require('./images/star_half.png'),
  starFull: require('./images/star_full.png'),
  
  // ===== 啟動畫面 / Launch Screen =====
  launchBackground: require('./images/launch_background.png'),
  launchLogo: require('./images/launch_logo.png'),
  
  // ===== 首頁 / Home Page =====
  homePageBanner1: require('./images/home_banner_1.png'),
  homePageBanner2: require('./images/home_banner_2.png'),
  
  // ===== 內容專區 / Content =====
  contentPlaceholder: require('./images/content_placeholder.png'),
  
  // ===== 圖示 / Icons =====
  iconLock: require('./images/icon_lock.png'),
  iconVip: require('./images/icon_vip.png'),
  iconPlay: require('./images/icon_play.png'),
};

// ===== SVG 圖示（建議使用 react-native-svg） =====
export { default as StarFullSVG } from './svg/StarFull';
export { default as StarHalfSVG } from './svg/StarHalf';
export { default as StarEmptySVG } from './svg/StarEmpty';

export default images;
