import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  isPro: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  loginAsGuest: () => void;
  logout: () => void;
  upgradeToPro: () => void;
  downgradeToTrial: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 預設測試帳號
const TEST_ACCOUNTS = [
  { email: "test@example.com", password: "123456", name: "測試用戶", isPro: false },
  { email: "vip@example.com", password: "123456", name: "VIP會員", isPro: true },
  { email: "pro@example.com", password: "123456", name: "專業版會員", isPro: true },
  { email: "demo@example.com", password: "demo123", name: "示範帳號", isPro: false }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  // 預設為未登入狀態，需要透過歡迎頁面進入
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    // 檢查是否為預設帳號
    const account = TEST_ACCOUNTS.find(
      acc => acc.email === email && acc.password === password
    );
    
    if (account) {
      setUser({
        name: account.name,
        email: account.email,
        isPro: account.isPro
      });
      return true;
    }
    
    // 如果不是預設帳號，任何輸入都可以登入（測試用）
    setUser({
      name: email.split("@")[0],
      email: email,
      isPro: false
    });
    return true;
  };

  const loginAsGuest = () => {
    setUser({
      name: "試用用戶",
      email: "trial@example.com",
      isPro: false
    });
  };

  const logout = () => {
    setUser(null);
  };

  const upgradeToPro = () => {
    if (user) {
      setUser({ ...user, isPro: true });
    }
  };

  const downgradeToTrial = () => {
    if (user) {
      setUser({ ...user, isPro: false });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, loginAsGuest, logout, upgradeToPro, downgradeToTrial }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}