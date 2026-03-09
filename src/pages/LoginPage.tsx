import { useNavigate } from "react-router";
import { useAuth } from "../lib/authContext";
import { useEffect, useState } from "react";
import { checkAppStatus, recordUpdateDismiss, shouldShowUpdateReminder } from "../lib/appStatusService";
import { openAppStore, openCMoneyLogin } from "../lib/nativeBridge";
import { AppStatusResponse } from "../lib/appConfig";
import { AlertTriangle, RefreshCw, Bell, X } from "lucide-react";
import { motion } from "motion/react";
import enruAvatar from "figma:asset/2667c4f82d8bc2f45dc2b5735f4adc5c09586576.png";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [appStatus, setAppStatus] = useState<AppStatusResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuggestUpdate, setShowSuggestUpdate] = useState(false);

  useEffect(() => {
    checkStatus();
    
    // 監聽 CMoney 登入成功事件
    const handleLoginSuccess = (event: CustomEvent) => {
      const { token, userInfo, isVIP } = event.detail;
      
      // 使用 authContext 的 login 函數
      login(userInfo.email || "cmoney@user.com", token);
      
      // 跳轉到主頁
      navigate("/home");
    };
    
    window.addEventListener('cmoney-login-success', handleLoginSuccess as EventListener);
    
    return () => {
      window.removeEventListener('cmoney-login-success', handleLoginSuccess as EventListener);
    };
  }, [navigate, login]);

  const checkStatus = async () => {
    setIsLoading(true);
    try {
      const status = await checkAppStatus();
      setAppStatus(status);
      
      // 如果是建議更新，檢查是否應該顯示
      if (status.statusCode === -2 && shouldShowUpdateReminder()) {
        setShowSuggestUpdate(true);
      }
    } catch (error) {
      console.error('狀態檢查失敗:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    // 檢查狀態是否允許進入
    if (appStatus?.statusCode === 0) {
      return; // 維護中不允許進入
    }
    if (appStatus?.statusCode === -1) {
      return; // 強制更新不允許進入
    }

    // 打開 CMoney 登入網頁
    openCMoneyLogin();
  };

  const handleUpdate = () => {
    openAppStore();
  };

  const handleLaterUpdate = () => {
    recordUpdateDismiss();
    setShowSuggestUpdate(false);
  };

  // Loading 狀態
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2A1F1A] via-[#1C1410] to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60 text-sm">載入中...</p>
        </div>
      </div>
    );
  }

  // 系統維護中 (狀態碼 0)
  if (appStatus?.statusCode === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2A1F1A] via-[#1C1410] to-black flex flex-col items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-12 h-12 text-yellow-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">系統維護中</h1>
          <p className="text-white/60 mb-2">{appStatus.message}</p>
          {appStatus.data?.estimatedEndTime && (
            <p className="text-sm text-white/40 mb-8">
              預計恢復時間：{new Date(appStatus.data.estimatedEndTime).toLocaleString('zh-TW')}
            </p>
          )}
          <button
            onClick={checkStatus}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl mx-auto hover:bg-white/20 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            重新整理
          </button>
        </div>
        
        <div className="absolute bottom-6">
          <p className="text-xs text-white/40">Version 1.0.11</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
        {/* 內容層 */}
        <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="flex flex-col items-center gap-6 mb-12">
            <img 
              src={enruAvatar} 
              alt="林恩如" 
              className="h-32 w-auto object-contain"
            />
            <h1 className="text-4xl font-bold text-white">
              長線聚寶盆
            </h1>
            <p className="text-white/60 text-lg">專業選股 · 智慧投資</p>
          </div>

          {/* Action Buttons */}
          <div className="w-full space-y-4">
            {/* 登入按鈕 */}
            <button
              onClick={handleLogin}
              disabled={appStatus?.statusCode === 0 || appStatus?.statusCode === -1}
              className="w-full py-4 bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF] text-white font-bold rounded-xl transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              立即登入
            </button>

            {/* 訪客快速體驗按鈕 */}
            <button
              onClick={() => navigate("/home")}
              className="w-full py-4 bg-transparent border-2 border-white/40 text-white font-semibold rounded-xl transition-all hover:bg-white/10 hover:border-white/60"
            >
              訪客快速體驗
            </button>
          </div>

          {/* 提示文字 */}
          <p className="text-center text-white/40 text-sm mt-6">
            登入後可使用完整功能
          </p>
        </div>

        {/* Footer */}
        <div className="absolute bottom-6">
          <p className="text-xs text-white/40">Version 1.0.11</p>
        </div>
      </div>

      {/* 強制更新彈窗 (狀態碼 -1) */}
      {appStatus?.statusCode === -1 && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-[#1C1410] border border-border rounded-3xl max-w-sm w-full p-6">
            <div className="w-16 h-16 rounded-2xl bg-[#FF6B6B]/20 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-[#FF6B6B]" />
            </div>
            
            <h3 className="text-xl font-bold text-center mb-2">需要更新</h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              {appStatus.message}
            </p>
            
            {appStatus.data?.latestVersion && (
              <div className="bg-muted/50 rounded-lg p-3 mb-6 text-center">
                <p className="text-xs text-muted-foreground mb-1">最新版本</p>
                <p className="text-lg font-bold text-[#D4AF37]">
                  v{appStatus.data.latestVersion}
                </p>
              </div>
            )}
            
            <button
              onClick={handleUpdate}
              className="w-full py-4 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black font-bold rounded-xl transition-colors"
            >
              立即更新
            </button>
          </div>
        </div>
      )}

      {/* 建議更新彈窗 (狀態碼 -2) */}
      {appStatus?.statusCode === -2 && showSuggestUpdate && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-[#1C1410] border border-border rounded-3xl max-w-sm w-full p-6 relative">
            <button
              onClick={handleLaterUpdate}
              className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
            
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-primary" />
            </div>
            
            <h3 className="text-xl font-bold text-center mb-2">發現新版本</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              {appStatus.message}
            </p>
            
            {appStatus.data?.features && appStatus.data.features.length > 0 && (
              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <p className="text-xs text-muted-foreground mb-2">更新亮點</p>
                <ul className="space-y-1">
                  {appStatus.data.features.map((feature, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {appStatus.data?.latestVersion && (
              <div className="text-center mb-6">
                <p className="text-xs text-muted-foreground mb-1">最新版本</p>
                <p className="text-lg font-bold text-primary">
                  v{appStatus.data.latestVersion}
                </p>
              </div>
            )}
            
            <div className="flex gap-3">
              <button
                onClick={handleLaterUpdate}
                className="flex-1 px-4 py-3 bg-muted hover:bg-muted/80 rounded-xl font-medium transition-colors"
              >
                稍後提醒
              </button>
              <button
                onClick={handleUpdate}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF] hover:opacity-90 text-white rounded-xl font-bold transition-all"
              >
                立即更新
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}