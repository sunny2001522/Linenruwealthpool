import { MarketType, FilterType } from "../components/StockFilters";

export interface Stock {
  code: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  // 圖一的所有欄位
  temperatureLevel: number; // 溫度條等級選
  trilogyScore: number; // 量距三部曲
  waitMaScore: number; // 等待均線
  waitStrongScore: number; // 等待轉強
  waitContinueScore: number; // 等待持續
  consecutiveMaGain: number; // 連站均線漲幅%
  weeklyMa: number; // 週均線
  weeklyDeviation: number; // 20週乖離%
  stable30WeekRate: number; // 站穩30週率
  breakGap: number; // 破空交差
  territoryGap: number; // 地緣交差(倍)
  industry: string; // 產業名稱
  products?: string; // 產品項目（只在個股頁面顯示）
  
  // 新增欄位（根據圖片）
  capitalBillion: number; // 股本(億)
  weekly20MaPrice: number; // 20週均(價) - 修改欄位名
  weeklyVolume: number; // 週成交量
  weeklyVolumeMultiple: number; // 週爆量(倍) - 修改欄位名和類型
  hasFlame?: boolean; // 火焰標記（只在強勢/弱勢時顯示）
  
  // 恩如三部曲评分所需的数据
  lists: number[]; // 股票所在的列表ID
  lowPrices9Days: number[]; // 过去9天最低价
  highPrices9Days: number[]; // 过去9天最高价
  todayLow: number;
  todayHigh: number;
  yesterdayClose: number;
  leader: number; // 領头羊价格
  
  // 額外數據
  volume: number;
  volumeRatio: number;
}

// 恩如三部曲评分逻辑
export function calculateTrilogyScore(
  stock: Stock,
  marketType: MarketType,
  filterType: FilterType
): number {
  let score = 0;

  if (marketType === "bull") {
    // 多方情况
    if (filterType === "above-ma") {
      // ① 挑噴出/回檔 - 站上週 20MA
      if (stock.lists.includes(5122133)) {
        score += 2; // 蓄勢待發
      } else if (stock.lists.includes(6086866)) {
        score += 1; // 逆轉勝
      }
    } else if (filterType === "strong-ma") {
      // ① 挑噴出/回檔 - 強勢週 20MA
      const minLow9Days = Math.min(...stock.lowPrices9Days);
      const isAllAboveLeader = minLow9Days > stock.leader;
      const todayDiff = Math.abs(stock.todayLow - stock.leader) / stock.leader;
      const isCloseAboveLeader = stock.price > stock.leader;

      if (isAllAboveLeader && todayDiff < 0.02 && isCloseAboveLeader) {
        score += 2;
      } else if (
        stock.price >= stock.leader &&
        (stock.yesterdayClose <= stock.leader || stock.todayLow <= stock.leader)
      ) {
        score += 1;
      }
    }

    // ② 選型態看趨勢
    if (stock.lists.includes(6086867) || stock.lists.includes(6086869)) {
      score += 1; // 海闊天空 或 庸中佼佼
    }
    if (stock.lists.includes(6086884) || stock.lists.includes(103664275)) {
      score += 1; // 一往直前 或 直道而行
    }

    // ③ 看量找動能
    if (stock.lists.includes(6086650) || stock.lists.includes(6086870)) {
      score += 1; // 真金烈火 或 後起新秀
    }
    if (stock.lists.includes(5975178) || stock.lists.includes(6086872)) {
      score += 1; // 金玉其質 或 前程萬里
    }
  } else {
    // 空方情況
    if (filterType === "below-ma") {
      // ① 挑下殺/反轉 - 站上週 20MA (空方)
      if (stock.lists.includes(6279813)) {
        score += 2; // 蓄勢待發S
      } else if (stock.lists.includes(6279861)) {
        score += 1; // 逆轉勝S
      }
    } else if (filterType === "weak-ma") {
      // ① 挑下殺/反轉 - 強勢週 20MA (空方)
      const maxHigh9Days = Math.max(...stock.highPrices9Days);
      const isAllBelowLeader = maxHigh9Days < stock.leader;
      const todayDiff = Math.abs(stock.todayHigh - stock.leader) / stock.leader;
      const isCloseBelowLeader = stock.price < stock.leader;

      if (isAllBelowLeader && todayDiff < 0.02 && isCloseBelowLeader) {
        score += 2;
      } else if (stock.price <= stock.leader && stock.yesterdayClose >= stock.leader) {
        score += 1;
      }
    }

    // ② 選型態看趨勢
    if (stock.lists.includes(6279703) || stock.lists.includes(6279773)) {
      score += 1; // 海闊天空S 或 庸中佼佼S
    }
    if (stock.lists.includes(6279991) || stock.lists.includes(6280157)) {
      score += 1; // 一往直前S 或 直道而行S
    }

    // ③ 看量找動能
    if (stock.lists.includes(6283001) || stock.lists.includes(6283009)) {
      score += 1; // 真金烈火S 或 後起新秀S
    }
    if (stock.lists.includes(6283010) || stock.lists.includes(6283011)) {
      score += 1; // 金玉其質S 或 前程萬里S
    }
  }

  return Math.min(score, 2); // 最多2颗星
}

// 生成模擬股票數據
export function generateMockStocks(): Stock[] {
  // 產業名稱更新為「類別-名稱」格式，參考領頭羊
  const industries = [
    "電子上游-IC設計",
    "電子上游-晶圓代工",
    "電子上游-IC封測",
    "電子中游-被動元件",
    "電子中游-PCB",
    "電子中游-面板",
    "電子下游-組裝代工",
    "電子下游-網通設備",
    "電子下游-伺服器",
    "金融-銀行",
    "金融-保險",
    "金融-證券",
    "傳產-塑化",
    "傳產-鋼鐵",
    "傳產-水泥",
    "航運-貨櫃航運",
    "航運-散裝航運",
    "生技醫療-新藥",
    "生技醫療-醫材",
  ];
  const stockNames = [
    { code: "3023", name: "信邦" },
    { code: "1447", name: "力鵬" },
    { code: "6125", name: "廣運" },
    { code: "3702", name: "大聯大" },
    { code: "2375", name: "智寶" },
    { code: "1444", name: "力麗" },
    { code: "6501", name: "統一超" },
    { code: "4114", name: "健喬" },
    { code: "4118", name: "建達" },
    { code: "1905", name: "華紙" },
    { code: "1904", name: "正隆" },
    { code: "6547", name: "高端疫苗" },
    { code: "2601", name: "益航" },
    { code: "5608", name: "四維航" },
    { code: "1442", name: "名軒" },
    { code: "2801", name: "彰銀" },
    { code: "4128", name: "中天" },
    { code: "2845", name: "遠銀" },
    { code: "2609", name: "陽明" },
    { code: "2382", name: "廣達" },
    { code: "2301", name: "光寶科" },
    { code: "2330", name: "台積電" },
    { code: "2454", name: "聯發科" },
    { code: "2317", name: "鴻海" },
  ];

  const allLists = [
    5122133, 6086866, 6086867, 6086869, 6086884, 103664275, 6086650, 6086870, 5975178, 6086872,
    6279813, 6279861, 6279703, 6279773, 6279991, 6280157, 6283001, 6283009, 6283010, 6283011,
  ];

  return stockNames.map((stock, index) => {
    const basePrice = 20 + Math.random() * 500;
    const change = (Math.random() - 0.45) * 20;
    const changePercent = (change / basePrice) * 100;
    const weeklyMa = basePrice * (0.85 + Math.random() * 0.25);
    const weeklyDeviation = ((basePrice - weeklyMa) / weeklyMa) * 100;

    // 随机分配到一些列表中
    const assignedLists = allLists.filter(() => Math.random() > 0.7);

    // 生成过去9天的价格数据
    const lowPrices9Days = Array.from({ length: 9 }, () => basePrice * (0.95 + Math.random() * 0.05));
    const highPrices9Days = Array.from({ length: 9 }, () => basePrice * (1.0 + Math.random() * 0.05));

    // 生成新字段的合理数据
    const capitalBillion = parseFloat((10 + Math.random() * 300).toFixed(2)); // 股本(億) 10-310億
    const weekly20MaPrice = parseFloat(weeklyMa.toFixed(2)); // 20週均(價) - 使用週均線作為基準價格
    const weeklyVolume = Math.floor(1000 + Math.random() * 20000); // 週成交量 1000-21000
    const weeklyVolumeMultiple = parseFloat((0.5 + Math.random() * 2.5).toFixed(2)); // 週爆量(倍) 0.5-3.0倍
    const hasFlame = Math.random() > 0.6; // 40% 的股票有火焰標記

    return {
      code: stock.code,
      name: stock.name,
      price: basePrice,
      change,
      changePercent,
      
      // 圖一的欄位數據
      temperatureLevel: Math.floor(Math.random() * 3) + 1, // 1-3
      trilogyScore: Math.floor(Math.random() * 3), // 0-2顆星
      waitMaScore: Math.floor(Math.random() * 3), // 0-2顆星
      waitStrongScore: Math.floor(Math.random() * 3), // 0-2顆星
      waitContinueScore: Math.floor(Math.random() * 3), // 0-2顆星
      consecutiveMaGain: (Math.random() * 80 - 20).toFixed(2), // -20% to 60%
      weeklyMa: weeklyMa,
      weeklyDeviation: weeklyDeviation,
      stable30WeekRate: (Math.random() * 2).toFixed(2), // 0-2
      breakGap: (Math.random() * 2 - 1).toFixed(1), // -1 to 1
      territoryGap: (Math.random() * 2 - 0.5).toFixed(1), // -0.5 to 1.5倍
      industry: industries[Math.floor(Math.random() * industries.length)],
      products: "產品資訊待補充", // 個股頁面才顯示
      
      volume: Math.floor(Math.random() * 100000) + 10000,
      volumeRatio: (0.5 + Math.random() * 2).toFixed(2),
      lists: assignedLists,
      lowPrices9Days,
      highPrices9Days,
      todayLow: basePrice * 0.98,
      todayHigh: basePrice * 1.02,
      yesterdayClose: basePrice * (0.98 + Math.random() * 0.04),
      leader: weeklyMa,
      
      // 新增欄位（根據圖片）
      capitalBillion,
      weekly20MaPrice, // 修改：使用新欄位名
      weeklyVolume,
      weeklyVolumeMultiple, // 修改：使用新欄位名
      hasFlame, // 火焰標記
    };
  });
}