import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../lib/authContext";
import { Eye, EyeOff } from "lucide-react";
import enruAvatar from "figma:asset/2667c4f82d8bc2f45dc2b5735f4adc5c09586576.png";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 直接登入，不驗證
    login(email || "user@cmoney.com.tw", password || "123456");
    navigate("/");
  };

  const handleThirdPartyLogin = (provider: string) => {
    // 第三方登入也直接進入
    login("user@cmoney.com.tw", "123456");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2A1F1A] via-[#1C1410] to-black flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center gap-3 pt-12 pb-2">
        <img src={enruAvatar} alt="林恩如" className="h-40 w-auto object-contain" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF] bg-clip-text text-transparent">
          長線聚寶盆
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-6">
        <div className="max-w-md mx-auto">
          {/* Third Party Login Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleThirdPartyLogin("google")}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-white/20 rounded-xl hover:bg-gray-50 transition-colors shadow-lg"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="font-medium text-gray-800">以 Google 帳號登入</span>
            </button>

            <button
              onClick={() => handleThirdPartyLogin("apple")}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white text-black border-2 border-white/20 rounded-xl hover:bg-gray-50 transition-colors shadow-lg"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span className="font-medium">使用 Apple 登入</span>
            </button>

            <button
              onClick={() => handleThirdPartyLogin("facebook")}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#1877F2] text-white rounded-xl hover:bg-[#1877F2]/90 transition-colors shadow-lg"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="font-medium">以 Facebook 帳號登入</span>
            </button>
          </div>

          {/* Already Registered Link */}
          <div className="text-center mb-6">
            <button
              onClick={() => navigate("/signup")}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              - 選擇已登入帳號 -
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-transparent px-4 text-white/60">or</span>
            </div>
          </div>

          {/* Email & Password Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ailab@cmoney.com.tw"
              className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-primary transition-colors text-white placeholder:text-white/50"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-primary transition-colors pr-12 text-white placeholder:text-white/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm flex-wrap gap-2">
              <label className="flex items-center gap-2 cursor-pointer text-white/80">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-white/10 text-primary focus:ring-primary"
                />
                <span>保持登入狀態</span>
              </label>
              <div className="flex gap-4">
                <button type="button" className="text-primary hover:text-primary/80 text-xs">
                  忘記購買帳號？
                </button>
                <button type="button" className="text-primary hover:text-primary/80 text-xs">
                  忘記密碼？
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-4 bg-destructive hover:bg-destructive/90 text-white font-bold rounded-xl transition-colors shadow-lg"
            >
              登入
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <span className="text-sm text-white/60">還不是會員嗎？</span>
            <button
              onClick={() => navigate("/signup")}
              className="text-sm text-primary hover:text-primary/80 font-medium ml-1"
            >
              立即註冊 CMoney 帳號
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-6 text-center">
        <p className="text-xs text-white/40">Version 1.0.11</p>
      </div>
    </div>
  );
}