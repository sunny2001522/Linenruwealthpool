import { useState } from "react";
import { useNavigate } from "react-router";
import enruAvatar from "figma:asset/2667c4f82d8bc2f45dc2b5735f4adc5c09586576.png";

export function SignupPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleNext = () => {
    // 不驗證直接進入新手導覽
    navigate("/guide");
  };

  const handleThirdPartySignup = (provider: string) => {
    // 第三方註冊也直接進入新手導覽
    navigate("/guide");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3d2817] via-[#2d1f12] to-background flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center gap-3 pt-12 pb-2">
        <img src={enruAvatar} alt="林恩如" className="h-40 w-auto object-contain" />
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF] bg-clip-text text-transparent">
          長線聚寶盆
        </h2>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-6">
        <div className="max-w-md mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">手機快速註冊 CMoney 帳號</h1>
            <p className="text-sm text-muted-foreground">
              以手機號碼註冊帳號 立即獲得100元購物金！
            </p>
          </div>

          {/* Phone Input */}
          <div className="mb-6">
            <div className="flex gap-3">
              <div className="flex items-center gap-2 px-4 py-4 bg-muted/50 border border-border rounded-xl">
                <span className="text-2xl">🇹🇼</span>
                <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="請輸入您的手機號碼"
                className="flex-1 px-4 py-4 bg-muted/50 border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="mb-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-5 h-5 mt-0.5 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm">
                您是否同意CMoney的
                <button className="text-primary hover:text-primary/80 underline">
                  服務條款
                </button>
                及
                <button className="text-primary hover:text-primary/80 underline">
                  隱私權政策
                </button>
              </span>
            </label>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={!agreeTerms}
            className="w-full py-4 bg-muted/50 hover:bg-muted text-foreground font-bold rounded-xl transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            下一步
          </button>

          {/* Already Have Account */}
          <div className="text-center mb-6">
            <span className="text-sm text-muted-foreground">已經有帳戶了？</span>
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-primary hover:text-primary/80 font-medium ml-1"
            >
              登入 ›
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-4 text-muted-foreground">我想用其他方式註冊</span>
            </div>
          </div>

          {/* Other Signup Methods */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleThirdPartySignup("email")}
              className="flex items-center justify-center gap-2 px-4 py-4 bg-destructive hover:bg-destructive/90 text-white font-medium rounded-xl transition-colors shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>電子信箱</span>
            </button>

            <button
              onClick={() => handleThirdPartySignup("google")}
              className="flex items-center justify-center gap-2 px-4 py-4 bg-white border-2 border-border hover:bg-gray-50 font-medium rounded-xl transition-colors shadow-sm text-gray-700"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-gray-700">Google</span>
            </button>

            <button
              onClick={() => handleThirdPartySignup("apple")}
              className="flex items-center justify-center gap-2 px-4 py-4 bg-black text-white hover:bg-black/90 font-medium rounded-xl transition-colors shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span>Apple</span>
            </button>

            <button
              onClick={() => handleThirdPartySignup("facebook")}
              className="flex items-center justify-center gap-2 px-4 py-4 bg-[#1877F2] text-white hover:bg-[#1877F2]/90 font-medium rounded-xl transition-colors shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-6 text-center">
        <p className="text-xs text-muted-foreground">Version 1.0.11</p>
      </div>
    </div>
  );
}