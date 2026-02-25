import { useState } from "react";
import { ChevronLeft, Settings, Palette, Monitor, Globe, Clock, TrendingUp, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router";

export function PreferencesPage() {
  const navigate = useNavigate();
  
  const [preferences, setPreferences] = useState({
    theme: "system", // system, light, dark
    language: "zh-TW",
    currency: "TWD",
    timezone: "Asia/Taipei",
    chartType: "candlestick",
    priceDisplay: "absolute", // absolute, percentage
    autoRefresh: true,
    refreshInterval: 30, // seconds
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/more")}
            className="w-10 h-10 rounded-xl bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">偏好設定</h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-6 space-y-6">
        {/* Appearance */}
        <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-lg">
          <div className="px-5 py-4 border-b border-border/50">
            <h3 className="font-bold text-sm text-muted-foreground">外觀設定</h3>
          </div>
          <div>
            <PreferenceItem
              icon={Palette}
              label="主題"
              description="選擇應用程式外觀"
            >
              <select
                value={preferences.theme}
                onChange={(e) => setPreferences({ ...preferences, theme: e.target.value })}
                className="px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="system">跟隨系統</option>
                <option value="light">淺色模式</option>
                <option value="dark">深色模式</option>
              </select>
            </PreferenceItem>
            
            <PreferenceItem
              icon={Monitor}
              label="顯示密度"
              description="調整資訊顯示密度"
              isLast
            >
              <select
                className="px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="compact">緊湊</option>
                <option value="comfortable">舒適</option>
                <option value="spacious">寬鬆</option>
              </select>
            </PreferenceItem>
          </div>
        </div>

        {/* Language & Region */}
        <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-lg">
          <div className="px-5 py-4 border-b border-border/50">
            <h3 className="font-bold text-sm text-muted-foreground">語言與地區</h3>
          </div>
          <div>
            <PreferenceItem
              icon={Globe}
              label="語言"
              description="選擇應用程式語言"
            >
              <select
                value={preferences.language}
                onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                className="px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="zh-TW">繁體中文</option>
                <option value="zh-CN">简体中文</option>
                <option value="en">English</option>
              </select>
            </PreferenceItem>
            
            <PreferenceItem
              icon={TrendingUp}
              label="貨幣"
              description="顯示貨幣單位"
            >
              <select
                value={preferences.currency}
                onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
                className="px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="TWD">新台幣 (TWD)</option>
                <option value="USD">美元 (USD)</option>
                <option value="CNY">人民幣 (CNY)</option>
              </select>
            </PreferenceItem>
            
            <PreferenceItem
              icon={Clock}
              label="時區"
              description="選擇時區設定"
              isLast
            >
              <select
                value={preferences.timezone}
                onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                className="px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="Asia/Taipei">台北 (GMT+8)</option>
                <option value="Asia/Shanghai">上海 (GMT+8)</option>
                <option value="America/New_York">紐約 (GMT-5)</option>
              </select>
            </PreferenceItem>
          </div>
        </div>

        {/* Chart Settings */}
        <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-lg">
          <div className="px-5 py-4 border-b border-border/50">
            <h3 className="font-bold text-sm text-muted-foreground">圖表設定</h3>
          </div>
          <div>
            <PreferenceItem
              icon={BarChart3}
              label="圖表類型"
              description="預設圖表顯示方式"
            >
              <select
                value={preferences.chartType}
                onChange={(e) => setPreferences({ ...preferences, chartType: e.target.value })}
                className="px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="candlestick">K線圖</option>
                <option value="line">折線圖</option>
                <option value="area">面積圖</option>
              </select>
            </PreferenceItem>
            
            <PreferenceItem
              icon={TrendingUp}
              label="價格顯示"
              description="價格變動顯示方式"
              isLast
            >
              <select
                value={preferences.priceDisplay}
                onChange={(e) => setPreferences({ ...preferences, priceDisplay: e.target.value })}
                className="px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="absolute">絕對值</option>
                <option value="percentage">百分比</option>
                <option value="both">兩者皆顯示</option>
              </select>
            </PreferenceItem>
          </div>
        </div>

        {/* Data Refresh */}
        <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-lg">
          <div className="px-5 py-4 border-b border-border/50">
            <h3 className="font-bold text-sm text-muted-foreground">資料更新</h3>
          </div>
          <div>
            <div className="flex items-center gap-4 px-5 py-4 border-b border-border/30">
              <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center flex-shrink-0">
                <Settings className="w-5 h-5 text-foreground/70" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium">自動更新</p>
                <p className="text-xs text-muted-foreground">定時更新股價資料</p>
              </div>
              <button
                onClick={() => setPreferences({ ...preferences, autoRefresh: !preferences.autoRefresh })}
                className={`relative w-12 h-7 rounded-full transition-all flex-shrink-0 ${
                  preferences.autoRefresh ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all ${
                    preferences.autoRefresh ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>
            
            {preferences.autoRefresh && (
              <PreferenceItem
                icon={Clock}
                label="更新間隔"
                description="自動更新的時間間隔"
                isLast
              >
                <select
                  value={preferences.refreshInterval}
                  onChange={(e) => setPreferences({ ...preferences, refreshInterval: parseInt(e.target.value) })}
                  className="px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="15">15秒</option>
                  <option value="30">30秒</option>
                  <option value="60">1分鐘</option>
                  <option value="300">5分鐘</option>
                </select>
              </PreferenceItem>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4">
          <div className="flex gap-3">
            <Settings className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium mb-1">關於偏好設定</p>
              <p className="text-muted-foreground text-xs leading-relaxed">
                這些設定將影響應用程式的外觀和行為。您可以隨時調整以獲得最佳使用體驗。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PreferenceItemProps {
  icon: React.ElementType;
  label: string;
  description: string;
  children: React.ReactNode;
  isLast?: boolean;
}

function PreferenceItem({ icon: Icon, label, description, children, isLast }: PreferenceItemProps) {
  return (
    <div className={`flex items-center gap-4 px-5 py-4 ${!isLast ? 'border-b border-border/30' : ''}`}>
      <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-foreground/70" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}
