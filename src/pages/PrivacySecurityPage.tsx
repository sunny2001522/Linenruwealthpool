import { useState } from "react";
import {
  ChevronLeft,
  Shield,
  Lock,
  Eye,
  EyeOff,
  Fingerprint,
  Smartphone,
  AlertTriangle,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router";

export function PrivacySecurityPage() {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    biometricLogin: true,
    twoFactorAuth: false,
    autoLock: true,
    hideBalance: false,
    allowScreenshots: true,
  });

  const [showPasswordModal, setShowPasswordModal] =
    useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里可以添加实际的密码更改逻辑
    setShowPasswordModal(false);
    setPasswordForm({ current: "", new: "", confirm: "" });
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
          <h1 className="text-xl font-bold">隱私與安全</h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-6 space-y-6">
        {/* Security Settings */}
        <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-lg">
          <div className="px-5 py-4 border-b border-border/50">
            <h3 className="font-bold text-sm text-muted-foreground">
              安全設定
            </h3>
          </div>
          <div>
            <SecurityToggle
              icon={Fingerprint}
              label="生物辨識登入"
              description="使用指紋或臉部辨識快速登入"
              checked={settings.biometricLogin}
              onChange={() => toggleSetting("biometricLogin")}
              badge="推薦"
            />
            <SecurityToggle
              icon={Smartphone}
              label="兩步驟驗證"
              description="額外的帳戶安全保護"
              checked={settings.twoFactorAuth}
              onChange={() => toggleSetting("twoFactorAuth")}
              badge="推薦"
            />
            <SecurityToggle
              icon={Lock}
              label="自動鎖定"
              description="閒置時自動鎖定應用程式"
              checked={settings.autoLock}
              onChange={() => toggleSetting("autoLock")}
              isLast
            />
          </div>
        </div>

        {/* Password */}
        <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-lg">
          <div className="px-5 py-4 border-b border-border/50">
            <h3 className="font-bold text-sm text-muted-foreground">
              密碼管理
            </h3>
          </div>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="w-full flex items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Lock className="w-5 h-5 text-foreground/70 group-hover:text-primary transition-colors" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium">變更密碼</p>
              <p className="text-xs text-muted-foreground">
                建議每3個月更換一次密碼
              </p>
            </div>
            <div className="text-xs text-muted-foreground">
              上次更新：2025/12/01
            </div>
          </button>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-card border border-border rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">變更密碼</h3>
            </div>

            <form
              onSubmit={handlePasswordChange}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-2">
                  目前密碼
                </label>
                <input
                  type="password"
                  value={passwordForm.current}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      current: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="請輸入目前密碼"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  新密碼
                </label>
                <input
                  type="password"
                  value={passwordForm.new}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      new: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="請輸入新密碼"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  至少8個字元，包含英文和數字
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  確認新密碼
                </label>
                <input
                  type="password"
                  value={passwordForm.confirm}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirm: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="請再次輸入新密碼"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 px-4 py-3 bg-muted hover:bg-muted/80 rounded-xl font-medium transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-primary hover:bg-primary/90 text-black rounded-xl font-bold transition-colors"
                >
                  確認變更
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

interface SecurityToggleProps {
  icon: React.ElementType;
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
  badge?: string;
  isLast?: boolean;
}

function SecurityToggle({
  icon: Icon,
  label,
  description,
  checked,
  onChange,
  badge,
  isLast,
}: SecurityToggleProps) {
  return (
    <div
      className={`flex items-center gap-4 px-5 py-4 ${!isLast ? "border-b border-border/30" : ""}`}
    >
      <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-foreground/70" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium">{label}</p>
          {badge && (
            <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-bold rounded-full">
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      </div>
      <button
        onClick={onChange}
        className={`relative w-12 h-7 rounded-full transition-all flex-shrink-0 ${
          checked ? "bg-primary" : "bg-muted"
        }`}
      >
        <div
          className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}