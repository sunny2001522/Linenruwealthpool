import { ChevronRight, ChevronLeft, BookOpen, Headphones, Star, Share2, Settings, User, Mail, Calendar, Crown, LogOut, Shield, HelpCircle, Sparkles } from "lucide-react";
import { useAuth } from "../lib/authContext";
import { useNavigate, useLocation } from "react-router";
import { useState, useEffect } from "react";
import enruAvatar from "figma:asset/669abba4cb1cf3bf6bffdce61f40edd799d8b2f2.png";
import { SubscriptionModal } from "../components/SubscriptionModal";
import { openAppRating, shareToFriend } from "../lib/nativeBridge";

export function MorePage() {
  const { user, isLoggedIn, logout, downgradeToTrial, upgradeToPro } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  // 檢查是否剛購買完成，如果是則確保升級
  useEffect(() => {
    const justPurchased = location.state?.justPurchased;
    if (justPurchased) {
      console.log('檢測到購買標記，確保升級為專業版');
      console.log('當前用戶狀態:', user);
      
      // 如果還不是專業版，再次調用升級
      if (user && !user.isPro) {
        console.log('用戶尚未升級，立即升級');
        upgradeToPro();
      }
      
      // 清除購買標記，避免重複升級
      window.history.replaceState({}, document.title);
    }
  }, [location.state, user, upgradeToPro]);

  // 預設用戶資訊
  const userInfo = {
    name: isLoggedIn && user ? user.name : "vausb6xb0q",
    email: isLoggedIn && user ? user.email : "sonia_chen@cmoney.com.tw",
    isPro: isLoggedIn && user ? user.isPro : false, // 未登入時預設為試用版
    subscriptionPeriod: "2026/1/1 - 2026/3/31",
    avatar: enruAvatar,
    memberSince: "2024/01/15"
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleCancelSubscription = () => {
    console.log('取消訂閱前 - user:', user, 'isPro:', user?.isPro);
    downgradeToTrial();
    console.log('取消訂閱後 - user:', user, 'isPro:', user?.isPro);
    setShowSubscriptionModal(false); // 同時關閉訂閱彈窗
  };

  const accountSettings = [
    { icon: User, label: "編輯個人資料", onClick: () => navigate("/edit-profile") },
  ];

  const supportItems = [
    { icon: BookOpen, label: "新手導覽", onClick: () => navigate("/guide") },
    { icon: Headphones, label: "線上客服", onClick: () => navigate("/customer-service") },
    { icon: Star, label: "App 評分", onClick: openAppRating },
    { icon: HelpCircle, label: "幫助中心", onClick: () => navigate("/help-center") },
    { icon: Share2, label: "分享給好友", onClick: shareToFriend },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 pb-16">
      {/* Header Section with Gradient */}
      <div className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-transparent pt-8 pb-20">
        
        <div className="relative max-w-screen-xl mx-auto px-6">
          <h1 className="text-2xl font-bold mb-8 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            個人資料
          </h1>
          
          {/* Profile Card */}
          <div className="bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-xl border border-primary/20 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-start gap-4">
              {/* Avatar with Glow */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-chart-5 rounded-2xl blur-lg opacity-50" />
                <img 
                  src={userInfo.avatar} 
                  alt={userInfo.name}
                  className="relative w-20 h-20 rounded-2xl object-cover border-2 border-primary/30 shadow-xl"
                />
                {userInfo.isPro && (
                  <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-primary to-chart-5 rounded-full p-1.5 shadow-lg">
                    <Crown className="w-4 h-4 text-black" />
                  </div>
                )}
              </div>
              
              {/* User Info */}
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold mb-1 truncate">{userInfo.name}</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Mail className="w-3.5 h-3.5" />
                  <span className="truncate">{userInfo.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>加入時間：{userInfo.memberSince}</span>
                </div>
              </div>
            </div>

            {/* Pro Badge / Trial Badge */}
            <div className="mt-4 pt-4 border-t border-border/50">
              <button
                onClick={() => setShowSubscriptionModal(true)}
                className={`w-full rounded-2xl p-4 border transition-all hover:shadow-lg group cursor-pointer ${
                  userInfo.isPro
                    ? 'bg-gradient-to-r from-[#4A90E2]/20 to-[#6BB6FF]/20 border-primary/30 hover:border-primary/50'
                    : 'bg-muted/30 border-border/50 hover:border-primary/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    
                    <Sparkles className={`w-5 h-5 ${
                      userInfo.isPro
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    }`} />
                    <span className={`font-bold ${
                      userInfo.isPro
                        ? 'bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF] bg-clip-text text-transparent'
                        : 'text-muted-foreground'
                    }`}>
                      {userInfo.isPro ? '專業版會員' : '試用版'}
                    </span>
                  </div>
                  <ChevronRight className={`w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all ${
                    userInfo.isPro ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                </div>
                {userInfo.isPro && (
                  <div className="mt-2 text-xs text-muted-foreground text-left">
                    訂閱期限：{userInfo.subscriptionPeriod}
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="max-w-screen-xl mx-auto px-6 -mt-12 space-y-6">
        {/* Account Settings */}
        <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-lg">
          <div className="px-5 py-4 border-b border-border/50">
            <h3 className="font-bold text-sm text-muted-foreground">帳戶設定</h3>
          </div>
          <div>
            {accountSettings.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="w-full flex items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-all border-b border-border/30 last:border-b-0 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-foreground/70 group-hover:text-primary transition-colors" />
                  </div>
                  <span className="flex-1 text-left font-medium">{item.label}</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Support */}
        <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-lg">
          <div className="px-5 py-4 border-b border-border/50">
            <h3 className="font-bold text-sm text-muted-foreground">支援與幫助</h3>
          </div>
          <div>
            {supportItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="w-full flex items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-all border-b border-border/30 last:border-b-0 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-foreground/70 group-hover:text-primary transition-colors" />
                  </div>
                  <span className="flex-1 text-left font-medium">{item.label}</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-lg hover:bg-destructive/10 hover:border-destructive/30 transition-all group"
        >
          <div className="flex items-center gap-4 px-5 py-4">
            <div className="w-10 h-10 rounded-xl bg-destructive/20 flex items-center justify-center group-hover:bg-destructive/30 transition-colors">
              <LogOut className="w-5 h-5 text-destructive" />
            </div>
            <span className="flex-1 text-left font-bold text-destructive">登出</span>
          </div>
        </button>

        {/* Footer Info */}
        <div className="text-center py-6 space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-chart-5 flex items-center justify-center">
              <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </div>
            <span className="text-sm font-medium text-muted-foreground">長線聚寶盆</span>
          </div>
          <p className="text-xs text-muted-foreground/70">
            CMoney 全曜財經資訊股份有限公司
          </p>
          <p className="text-xs text-muted-foreground/70">
            統編：80004909
          </p>
          <p className="text-xs text-muted-foreground/70">
            Version 1.0.11
          </p>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-card border border-border rounded-3xl max-w-sm w-full p-6 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-destructive/20 flex items-center justify-center mx-auto mb-4">
              <LogOut className="w-8 h-8 text-destructive" />
            </div>
            <h3 className="text-xl font-bold text-center mb-2">確定要登出嗎？</h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              登出後需要重新登入才能使用所有功能
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-3 bg-muted hover:bg-muted/80 rounded-xl font-medium transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-3 bg-destructive hover:bg-destructive/90 text-white rounded-xl font-bold transition-colors"
              >
                確定登出
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <SubscriptionModal
          isOpen={showSubscriptionModal}
          onClose={() => setShowSubscriptionModal(false)}
          isPro={userInfo.isPro}
          onCancelSubscription={() => handleCancelSubscription()}
        />
      )}
    </div>
  );
}