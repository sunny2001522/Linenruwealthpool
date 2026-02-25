import { useState } from "react";
import { ChevronLeft, Bell, Volume2, MessageSquare, TrendingUp, Calendar, Mail } from "lucide-react";
import { useNavigate } from "react-router";

export function NotificationSettingsPage() {
  const navigate = useNavigate();
  
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    soundEnabled: true,
    vibrationEnabled: true,
    stockAlerts: true,
    priceAlerts: true,
    newsAlerts: true,
    communityReplies: true,
    systemAnnouncements: true,
    weeklyReport: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

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
          <h1 className="text-xl font-bold">通知設定</h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-6 space-y-6">
        {/* General Notifications */}
        <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-lg">
          <div className="px-5 py-4 border-b border-border/50">
            <h3 className="font-bold text-sm text-muted-foreground">通知方式</h3>
          </div>
          <div>
            <NotificationToggle
              icon={Bell}
              label="推播通知"
              description="接收應用程式推播通知"
              checked={settings.pushNotifications}
              onChange={() => toggleSetting('pushNotifications')}
            />
            <NotificationToggle
              icon={Mail}
              label="電子郵件通知"
              description="接收電子郵件通知"
              checked={settings.emailNotifications}
              onChange={() => toggleSetting('emailNotifications')}
            />
            <NotificationToggle
              icon={Volume2}
              label="聲音"
              description="通知時播放提示音"
              checked={settings.soundEnabled}
              onChange={() => toggleSetting('soundEnabled')}
              isLast
            />
          </div>
        </div>

        {/* Stock Alerts */}
        <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-lg">
          <div className="px-5 py-4 border-b border-border/50">
            <h3 className="font-bold text-sm text-muted-foreground">股票提醒</h3>
          </div>
          <div>
            <NotificationToggle
              icon={TrendingUp}
              label="自選股動態"
              description="自選股價格變動提醒"
              checked={settings.stockAlerts}
              onChange={() => toggleSetting('stockAlerts')}
            />
            <NotificationToggle
              icon={TrendingUp}
              label="價格提醒"
              description="股票到價提醒"
              checked={settings.priceAlerts}
              onChange={() => toggleSetting('priceAlerts')}
            />
            <NotificationToggle
              icon={MessageSquare}
              label="重要新聞"
              description="相關股票重要新聞"
              checked={settings.newsAlerts}
              onChange={() => toggleSetting('newsAlerts')}
              isLast
            />
          </div>
        </div>

        {/* Community & System */}
        <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-lg">
          <div className="px-5 py-4 border-b border-border/50">
            <h3 className="font-bold text-sm text-muted-foreground">社群與系統</h3>
          </div>
          <div>
            <NotificationToggle
              icon={MessageSquare}
              label="社團回覆"
              description="有人回覆我的貼文"
              checked={settings.communityReplies}
              onChange={() => toggleSetting('communityReplies')}
            />
            <NotificationToggle
              icon={Bell}
              label="系統公告"
              description="重要系統公告與更新"
              checked={settings.systemAnnouncements}
              onChange={() => toggleSetting('systemAnnouncements')}
            />
            <NotificationToggle
              icon={Calendar}
              label="每週報告"
              description="每週投資分析報告"
              checked={settings.weeklyReport}
              onChange={() => toggleSetting('weeklyReport')}
              isLast
            />
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4">
          <div className="flex gap-3">
            <Bell className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium mb-1">關於通知設定</p>
              <p className="text-muted-foreground text-xs leading-relaxed">
                您可以隨時調整通知設定。部分通知可能受系統設定影響，請確保已在裝置設定中允許應用程式發送通知。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface NotificationToggleProps {
  icon: React.ElementType;
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
  isLast?: boolean;
}

function NotificationToggle({ icon: Icon, label, description, checked, onChange, isLast }: NotificationToggleProps) {
  return (
    <div className={`flex items-center gap-4 px-5 py-4 ${!isLast ? 'border-b border-border/30' : ''}`}>
      <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-foreground/70" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative w-12 h-7 rounded-full transition-all flex-shrink-0 ${
          checked ? 'bg-primary' : 'bg-muted'
        }`}
      >
        <div
          className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all ${
            checked ? 'left-6' : 'left-1'
          }`}
        />
      </button>
    </div>
  );
}
