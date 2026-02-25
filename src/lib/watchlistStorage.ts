// 自選股存儲管理

export interface WatchlistItem {
  code: string;
  name: string;
  addedAt: number;
}

export interface WatchlistData {
  [key: number]: WatchlistItem[]; // 1-6
}

export interface WatchlistNames {
  [key: number]: string; // 1-6
}

const WATCHLIST_DATA_KEY = "watchlist_data";
const WATCHLIST_NAMES_KEY = "watchlist_names";

// 獲取默認名稱
export const getDefaultWatchlistName = (index: number): string => {
  return `自選${index}`;
};

// 獲取所有自選股清單名稱
export const getWatchlistNames = (): WatchlistNames => {
  try {
    const stored = localStorage.getItem(WATCHLIST_NAMES_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to load watchlist names", e);
  }
  
  // 返回默認名稱
  return {
    1: getDefaultWatchlistName(1),
    2: getDefaultWatchlistName(2),
    3: getDefaultWatchlistName(3),
    4: getDefaultWatchlistName(4),
    5: getDefaultWatchlistName(5),
    6: getDefaultWatchlistName(6),
  };
};

// 保存自選股清單名稱
export const saveWatchlistNames = (names: WatchlistNames): void => {
  try {
    localStorage.setItem(WATCHLIST_NAMES_KEY, JSON.stringify(names));
  } catch (e) {
    console.error("Failed to save watchlist names", e);
  }
};

// 更新單個自選股清單名稱
export const updateWatchlistName = (index: number, name: string): void => {
  const names = getWatchlistNames();
  names[index] = name;
  saveWatchlistNames(names);
};

// 獲取所有自選股數據
export const getWatchlistData = (): WatchlistData => {
  try {
    const stored = localStorage.getItem(WATCHLIST_DATA_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to load watchlist data", e);
  }
  
  // 返回默认数据 - 预设一些示例股票
  const defaultData = {
    1: [
      { code: "2330", name: "台積電", addedAt: Date.now() - 86400000 * 5 },
      { code: "2317", name: "鴻海", addedAt: Date.now() - 86400000 * 3 },
      { code: "2454", name: "聯發科", addedAt: Date.now() - 86400000 * 2 },
      { code: "2308", name: "台達電", addedAt: Date.now() - 86400000 * 1 },
    ],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  };
  
  // 保存默认数据到 localStorage
  saveWatchlistData(defaultData);
  
  return defaultData;
};

// 保存所有自選股數據
export const saveWatchlistData = (data: WatchlistData): void => {
  try {
    localStorage.setItem(WATCHLIST_DATA_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save watchlist data", e);
  }
};

// 添加股票到指定清單
export const addToWatchlist = (
  listIndex: number,
  code: string,
  name: string
): boolean => {
  const data = getWatchlistData();
  const list = data[listIndex] || [];
  
  // 檢查是否已存在
  if (list.some(item => item.code === code)) {
    return false; // 已存在
  }
  
  // 添加股票
  data[listIndex] = [
    ...list,
    {
      code,
      name,
      addedAt: Date.now(),
    },
  ];
  
  saveWatchlistData(data);
  return true;
};

// 從指定清單移除股票
export const removeFromWatchlist = (
  listIndex: number,
  code: string
): boolean => {
  const data = getWatchlistData();
  const list = data[listIndex] || [];
  
  data[listIndex] = list.filter(item => item.code !== code);
  saveWatchlistData(data);
  return true;
};

// 檢查股票是否在任何清單中
export const isInAnyWatchlist = (code: string): number[] => {
  const data = getWatchlistData();
  const lists: number[] = [];
  
  // 检查所有存在的群组
  Object.keys(data).forEach((key) => {
    const index = parseInt(key);
    if (data[index]?.some(item => item.code === code)) {
      lists.push(index);
    }
  });
  
  return lists;
};

// 獲取指定清單的股票
export const getWatchlist = (listIndex: number): WatchlistItem[] => {
  const data = getWatchlistData();
  return data[listIndex] || [];
};