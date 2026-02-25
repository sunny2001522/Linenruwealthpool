/**
 * 應用程式配置
 * 
 * IS_REVIEW_MODE:
 * - true: 審查模式（App Store 審查時使用）
 *   使用原生 App Store 購買流程，跳轉到 /purchase 頁面
 * 
 * - false: 正式模式（上架後使用）
 *   使用內部網頁購買，導向 https://www.cmoney.tw/app/itemcontent.aspx?id=3627
 * 
 * 工程師發布時請修改此值：
 * - 提交 App Store 審查時：設為 true
 * - 審查通過後正式版本：設為 false
 */

export const IS_REVIEW_MODE = false;

// 網頁購買連結
export const WEB_PURCHASE_URL = "https://www.cmoney.tw/app/itemcontent.aspx?id=3627";

// 線上客服連結
export const CUSTOMER_SERVICE_URL = "https://www.cmoney.tw/app/customer-service";