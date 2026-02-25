/**
 * 台股應用程式 - 產品需求規格書 (PRD)
 * 
 * 完整的PRD文檔請參考：/docs/PRD.md
 * 
 * === 核心策略 ===
 * 
 * 1. 恩如三部曲評分系統（0-2顆星）：
 *    - 挑噴出/回檔：一星為剛噴出，二星為突破後回檔有支撐
 *    - 看型態：星星越多，越容易同時符合破切W底
 *    - 看量找動能：星星越多，大戶越看重
 * 
 * 2. 主要策略：
 *    多方策略：
 *    - 站上週20MA（波段股）：低成本且好防守，但需要較長時間等待
 *    - 強勢週20MA之上（210策略）：等待時間較少，風險較高，波動大
 *    - 強勢週20MA之上（211策略）：等待時間較少，風險較高，波動大
 *    
 *    空方策略：
 *    - 跌破週20MA
 *    - 弱勢週20MA之下
 * 
 * 3. 強勢判斷：
 *    - 強勢股（火焰）：收盤價 > 領頭羊價
 *    - 領頭羊類股：每月第一個交易日更新
 *    - 強勢線：日K線在強勢線上
 * 
 * 4. 風險評估：
 *    - 週20MA乖離：以%數顯示股價與週20MA距離，作為最大風險參考
 * 
 * === 配色方案 ===
 * 
 * - 主色調：藍色 #4A90E2
 * - 強調色：金色 #D4AF37
 * - 上漲：#FE6D73（紅色，台股規則）
 * - 下跌：#9cffd9（綠色，台股規則）
 * - 星星評分：金色漸層
 * 
 * === 會員權限 ===
 * 
 * - 專業版：完整使用選股和影音功能
 * - 試用版：選股頁面只能看到前3支股票（其餘模糊效果+金色鎖頭圖標）
 * - 免費版：功能受限
 * 
 * === 技術指標 ===
 * 
 * - 週20MA：核心均線策略
 * - 日20MA、100MA：輔助均線
 * - 強勢線：超級強勢股判斷標準
 * - 火焰標記：強勢股標記（收盤價 > 領頭羊價）
 * - 領頭羊類股：目前盤勢最強類股
 * 
 * === 自訂報表 ===
 * 
 * 帳號：queen_dtno@cmoney.com.tw
 * 
 * 主要策略報表（共35個）：
 * - 4697915：主表(基本表)
 * - 4702283：60日漲幅Top100
 * - 4716263：領頭股_多
 * - 5893528：強勢週二十之上
 * - 6038991：站上20ma
 * - 6279677：跌破20ma
 * - 6279696：弱勢週二十之下
 * ... 等（詳見PRD.md）
 * 
 * K線圖報表：
 * - 4459112：大盤圖、日K圖
 * - 4097388：週K圖
 * - 4698058：月K圖
 * - 5227：大盤指數日K
 * 
 * === 產品目標 ===
 * 
 * 「林恩如-長線聚寶盆Plus」將林恩如老師在台股的經驗與技術分析，
 * 透過程式工具提供給學員，使用週20MA策略與四大法寶「均線」、「趨勢線」、
 * 「型態」、「成交量」量化為簡單明瞭的「星等」策略，使學員能夠用最簡單
 * 的方式參與股市行情。
 * 
 * === 版本歷史 ===
 * 
 * - v1.21.222.1 (2021/3/3)：火焰獨立排序功能
 * - v1.21.316.1 (2021/3/19)：修正領頭羊類股顯示問題
 * - v1.21.331.1 (2021/3/31)：更改周K圖20MA線顏色
 * - v1.21.419.1 (2021/4/23)：查價線開關、畫線功能升級、週K圖資料至少10年
 * 
 * @author Dennis Hsu
 * @version 1.21.419.1
 * @platform PC端
 */

// ============================================
// 產品核心常數定義
// ============================================

/**
 * 配色方案
 */
export const COLORS = {
  PRIMARY: '#4A90E2',        // 主色調（藍色）
  ACCENT: '#D4AF37',         // 強調色（金色）
  UP: '#FE6D73',             // 上漲（紅色）
  DOWN: '#9cffd9',           // 下跌（綠色）
} as const;

/**
 * 恩如三部曲評分範圍
 */
export const RANK_RANGE = {
  MIN: 0,   // 最小星數
  MAX: 2,   // 最大星數（限制為2顆星）
} as const;

/**
 * 策略類型
 */
export const STRATEGY_TYPES = {
  BULL: 'bull',   // 多方策略
  BEAR: 'bear',   // 空方策略
} as const;

/**
 * 多方篩選條件
 */
export const BULL_FILTERS = {
  ABOVE_MA: 'above-ma',       // 站上週20MA（波段股）
  STRONG_MA: 'strong-ma',     // 強勢週20MA之上
} as const;

/**
 * 空方篩選條件
 */
export const BEAR_FILTERS = {
  BELOW_MA: 'below-ma',       // 跌破週20MA
  WEAK_MA: 'weak-ma',         // 弱勢週20MA之下
} as const;

/**
 * 會員類型
 */
export const MEMBER_TYPES = {
  PREMIUM: 'premium',   // 專業版
  TRIAL: 'trial',       // 試用版
  FREE: 'free',         // 免費版
} as const;

/**
 * 試用版限制
 */
export const TRIAL_LIMITS = {
  VISIBLE_STOCKS: 3,    // 試用版可見股票數
} as const;

/**
 * 自訂報表編號
 */
export const CUSTOM_REPORTS = {
  // 主要策略
  MAIN_TABLE: 4697915,           // 主表(基本表)
  TOP_60D: 4702283,              // 60日漲幅Top100
  LEADER_BULL: 4716263,          // 領頭股_多
  STRONG_MA20: 5893528,          // 強勢週二十之上
  ABOVE_20MA: 6038991,           // 站上20ma
  BELOW_20MA: 6279677,           // 跌破20ma
  WEAK_MA20: 6279696,            // 弱勢週二十之下
  
  // K線圖
  MARKET_CHART: 4459112,         // 大盤圖、日K圖
  WEEKLY_CHART: 4097388,         // 週K圖
  MONTHLY_CHART: 4698058,        // 月K圖
  INDEX_DAILY: 5227,             // 大盤指數日K
} as const;

/**
 * 領頭羊產業（當期）
 */
export const LEADER_INDUSTRIES_CURRENT = [
  '電子上游-IC設計',
  '電子中游-被動元件',
  '電子上游-IC通路',
  '電子零組件-顯示面板',
  '電腦週邊-電腦系統',
  '電子上游-IC製造',
  '電子中游-連接器',
  '電子上游-記憶體',
  '電子中游-光電元件',
  '電子下游-網路通訊',
] as const;

/**
 * 領頭羊產業（前期）
 */
export const LEADER_INDUSTRIES_PREVIOUS = [
  '電子中游-PCB-材料設備',
  '電子上游-PCB-材料設備',
  '電子上游-IC封測',
  '電子上游-配線驅動雜',
  '電子上游-連接元件',
  '電子上游-PCB-製造',
  '電子上游-配線處理設計',
  '電子上游-感測元件',
  '電子上游-IC製造',
  '電子中游-電源管理',
] as const;

/**
 * 落水狗產業（當期）
 */
export const LOSER_INDUSTRIES_CURRENT = [
  '傳產-塑膠工業',
  '傳產-紡織纖維',
  '金融-證券',
  '傳產-航運',
  '傳產-鋼鐵工業',
  '傳產-水泥工業',
  '金融-保險',
  '傳產-化學工業',
  '傳產-營建',
  '傳產-觀光',
] as const;

/**
 * 落水狗產業（前期）
 */
export const LOSER_INDUSTRIES_PREVIOUS = [
  '傳產-貿易百貨',
  '傳產-食品工業',
  '金融-金控',
  '傳產-汽車工業',
  '傳產-造紙工業',
  '傳產-電機機械',
  '傳產-橡膠工業',
  '傳產-玻璃陶瓷',
  '金融-其他金融',
  '傳產-其他',
] as const;

// ============================================
// 類型定義
// ============================================

/**
 * 恩如三部曲評分
 */
export interface RankScores {
  momentum: number;      // 看量找動能（0-2星）
  pattern: number;       // 看型態（0-2星）
  pullback: number;      // 挑噴出/回檔（0-2星）
}

/**
 * 股票數據
 */
export interface StockData {
  code: string;          // 股票代號
  name: string;          // 股票名稱
  price: number;         // 收盤價
  change: number;        // 漲跌幅
  volume: number;        // 成交量
  rank: RankScores;      // 恩如三部曲評分
  isStrong: boolean;     // 是否為強勢股（火焰標記）
  ma20Diff: number;      // 週20MA乖離率（%）
  industry?: string;     // 所屬產業
}

/**
 * 篩選條件
 */
export interface FilterOptions {
  marketType: 'bull' | 'bear';                    // 多方/空方
  filterType: string;                             // 篩選類型
  leaderIndustry: string | null;                  // 領頭羊產業
  loserIndustry: string | null;                   // 落水狗產業
  specialFilter: '211' | '210' | null;            // 211/210策略
  volumePeriod: 'weekly' | 'monthly' | null;      // 爆量週期
  volumeMultiple: 1 | 2 | 4 | null;               // 爆量倍數
  marketCap: 'above20B' | 'above100B' | 'below20B' | null;  // 股本
  avgVolume: 'above1000' | 'above5000' | 'above10000' | null; // 周均量
}

/**
 * 會員資訊
 */
export interface MemberInfo {
  type: 'premium' | 'trial' | 'free';  // 會員類型
  expiryDate?: Date;                   // 到期日
}

// ============================================
// 工具函數
// ============================================

/**
 * 計算恩如三部曲總分
 * @param scores 三部曲評分
 * @returns 總分（0-6）
 */
export function calculateTotalRank(scores: RankScores): number {
  return scores.momentum + scores.pattern + scores.pullback;
}

/**
 * 判斷是否為強勢股
 * @param price 收盤價
 * @param leaderPrice 領頭羊價
 * @returns 是否為強勢股
 */
export function isStrongStock(price: number, leaderPrice: number): boolean {
  return price > leaderPrice;
}

/**
 * 計算週20MA乖離率
 * @param price 當前價格
 * @param ma20 週20MA
 * @returns 乖離率（%）
 */
export function calculateMA20Deviation(price: number, ma20: number): number {
  return ((price - ma20) / ma20) * 100;
}

/**
 * 判斷用戶是否可查看完整數據
 * @param memberType 會員類型
 * @param stockIndex 股票索引
 * @returns 是否可查看
 */
export function canViewStock(
  memberType: 'premium' | 'trial' | 'free',
  stockIndex: number
): boolean {
  if (memberType === 'premium') return true;
  if (memberType === 'trial') return stockIndex < TRIAL_LIMITS.VISIBLE_STOCKS;
  return false;
}

// ============================================
// 預設配置
// ============================================

/**
 * 預設篩選條件
 */
export const DEFAULT_FILTERS: FilterOptions = {
  marketType: 'bull',
  filterType: 'above-ma',
  leaderIndustry: null,
  loserIndustry: null,
  specialFilter: null,
  volumePeriod: null,
  volumeMultiple: null,
  marketCap: 'above20B',    // 預設 > 20億
  avgVolume: 'above1000',   // 預設 > 1000張
};

/**
 * 產品配置
 */
export const PRODUCT_CONFIG = {
  name: '林恩如-長線聚寶盆Plus',
  version: '1.21.419.1',
  platform: 'PC端',
  author: 'Dennis Hsu',
  reportAccount: 'queen_dtno@cmoney.com.tw',
  
  // 功能開關
  features: {
    chartCrosshair: true,        // 查價線
    drawingTools: true,          // 畫線工具
    strongStockMarker: true,     // 強勢股標記
    industryFilter: true,        // 產業篩選
    volumeFilter: true,          // 爆量篩選
  },
  
  // 數據配置
  data: {
    weeklyChartYears: 10,        // 週K圖資料年數
    updateFrequency: 'daily',    // 更新頻率
    industryUpdateDay: 1,        // 領頭羊類股更新日（每月第1天）
  },
} as const;

export default PRODUCT_CONFIG;
