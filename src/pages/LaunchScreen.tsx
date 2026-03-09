import { useEffect } from "react";
import { useNavigate } from "react-router";

export function LaunchScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // 模擬 Auto Login API 調用
    const autoLoginTimeout = setTimeout(() => {
      // 3 秒後如果 API 沒有回應，視為未登入，跳轉到登入頁面
      navigate("/login");
    }, 3000);

    // 模擬 API 調用
    const simulateAutoLogin = async () => {
      try {
        // TODO: 實際調用 Auto Login API
        // const response = await autoLoginAPI();
        
        // 模擬 API 回應時間 (1-2 秒)
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 1000));
        
        // 清除 3 秒超時
        clearTimeout(autoLoginTimeout);
        
        // 根據 API 回應決定跳轉
        const isLoggedIn = Math.random() > 0.5; // 模擬登入狀態
        
        if (isLoggedIn) {
          // Auto Login 成功，跳轉到主頁面
          navigate("/home");
        } else {
          // Auto Login 失敗，跳轉到登入頁
          navigate("/login");
        }
      } catch (error) {
        // API 錯誤，清除超時並跳轉到登入頁
        clearTimeout(autoLoginTimeout);
        navigate("/login");
      }
    };

    simulateAutoLogin();

    // 清理函數
    return () => {
      clearTimeout(autoLoginTimeout);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2A1F1A] via-[#1C1410] to-black flex flex-col items-center justify-center px-6">
      {/* Brand Title */}
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF] bg-clip-text text-transparent">
          長線聚寶盆
        </h1>
        
        {/* Loading Circle */}
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>

      {/* App Version */}
      <div className="absolute bottom-6">
        <p className="text-xs text-white/40">Version 1.0.11</p>
      </div>
    </div>
  );
}