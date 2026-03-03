import { ChevronLeft, ShoppingCart, Star } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../lib/authContext";
import { useEffect, useState } from "react";

interface SubscriptionPlan {
  id: string;
  name: string;
  days: number;
  price: number;
  originalPrice: number;
  discount: number;
}

export function PurchasePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { upgradeToPro, user } = useAuth();
  
  // 從路由參數獲取方案信息
  const plan = location.state?.plan as SubscriptionPlan;

  // 如果沒有方案信息，使用默認年訂閱
  const selectedPlan = plan || {
    id: "yearly",
    name: "年訂閱",
    days: 365,
    price: 12980,
    originalPrice: 16000,
    discount: 3020,
  };

  const handlePurchase = () => {
    console.log('購買前 - user:', user, 'isPro:', user?.isPro);
    
    // 升級為專業版
    upgradeToPro();
    
    console.log('upgradeToPro() 執行完成，立即跳轉');
    
    // 立即跳轉，並傳遞購買成功的標記
    navigate("/home/more", { state: { justPurchased: true } });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header - 模擬 CMoney 頂部導航 */}
      <div className="sticky top-0 bg-[#E13D3D] text-white shadow-md z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white"
          >
            <ChevronLeft className="w-6 h-6" />
            <span className="font-medium">升級 VIP</span>
          </button>
          <div className="flex items-center gap-4">
            <button className="p-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
            <button className="relative p-2">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-0 right-0 bg-white text-[#E13D3D] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
        
        {/* Sub Navigation - 模擬麵包屑 */}
        <div className="bg-white px-4 py-3 flex items-center gap-2 text-sm">
          <button className="text-[#666] hover:text-[#E13D3D]">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
          </button>
          <span className="text-[#999]">›</span>
          <span className="text-[#666]">林恩如</span>
          <span className="text-[#999]">›</span>
          <span className="text-[#666]">軟體</span>
          <button className="ml-auto p-1">
            <svg className="w-5 h-5 text-[#999]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Product Section */}
      <div className="px-4 py-4">
        {/* Product Info */}
        <div className="mb-4">
          <h1 className="text-[17px] font-bold leading-tight mb-2">
            林恩如-長線聚寶盆｜波段選股｜長線投資｜價值投資｜存股策略
          </h1>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-[#FF9800] text-[#FF9800]" />
            <span className="text-sm font-medium">5.0</span>
            <span className="text-xs text-[#999]">(328)</span>
          </div>
        </div>

        {/* Description */}
        <div className="bg-[#F5F5F5] rounded-lg p-4 mb-4">
          <p className="text-sm text-[#666] leading-relaxed mb-3">
            專為波段與長線投資者打造的選股工具！「長線聚寶盆」結合恩如獨家三部曲評分系統，幫助您找出具備長期成長潛力的優質股票。
          </p>
          <ul className="text-sm text-[#666] space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-[#4A90E2] font-bold">•</span>
              <span><strong>價值評估：</strong>基本面分析，找出被低估的潛力股</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#4A90E2] font-bold">•</span>
              <span><strong>技術確認：</strong>型態與量能雙重確認，提高勝率</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#4A90E2] font-bold">•</span>
              <span><strong>動能追蹤：</strong>即時監控資金流向與主力動向</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#4A90E2] font-bold">•</span>
              <span><strong>風險控管：</strong>停損停利建議，保護投資本金</span>
            </li>
          </ul>
        </div>

        {/* Plans */}
        <div className="flex gap-3 mb-6">
          {/* Year Plan - Active */}
          <div className="flex-1 border-2 border-[#4A90E2] rounded-xl p-3 bg-[#F5FAFF] relative">
            <div className="absolute top-0 right-0 bg-[#E13D3D] text-white text-[10px] px-2 py-0.5 rounded-bl-lg rounded-tr-lg font-medium">
              訂閱型
            </div>
            <div className="mb-1">
              <span className="text-xs text-[#4A90E2] font-medium">年訂閱 365天</span>
            </div>
            <div className="mb-1">
              <span className="text-xl font-bold text-[#E13D3D]">
                NT${selectedPlan.price.toLocaleString()}
              </span>
              <span className="text-xs text-[#999] line-through ml-2">
                原價NT${selectedPlan.originalPrice.toLocaleString()}
              </span>
            </div>
            <p className="text-[10px] text-[#999]">
              *此商品不可使用購物金、抵用券
            </p>
          </div>

          {/* Quarter Plan */}
          <div className="flex-1 border border-[#DDD] rounded-xl p-3 bg-white relative opacity-50">
            <div className="absolute top-0 right-0 bg-[#999] text-white text-[10px] px-2 py-0.5 rounded-bl-lg rounded-tr-lg font-medium">
              訂閱型
            </div>
            <div className="mb-1">
              <span className="text-xs text-[#666] font-medium">季訂閱 93天</span>
            </div>
            <div className="mb-1">
              <span className="text-xl font-bold text-[#666]">NT$3988</span>
            </div>
            <p className="text-[10px] text-[#999]">
              *此商品不可使
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#E0E0E0] mb-4">
          <button className="flex-1 py-3 text-sm font-medium text-[#4A90E2] border-b-2 border-[#4A90E2]">
            使用說明
          </button>
          <button className="flex-1 py-3 text-sm font-medium text-[#999]">
            作者簡介
          </button>
          <button className="flex-1 py-3 text-sm font-medium text-[#999]">
            人氣好評
          </button>
        </div>

        {/* Content Details */}
        <div className="space-y-4 mb-6">
          <div className="bg-white border border-[#E0E0E0] rounded-lg p-4">
            <h3 className="text-sm font-bold text-[#333] mb-3">💎 專業版功能</h3>
            <div className="space-y-2 text-sm text-[#666]">
              <div className="flex items-start gap-2">
                <span className="text-[#D4AF37] mt-0.5">✓</span>
                <span>無限查看「長線聚寶盆」所有選股結果</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#D4AF37] mt-0.5">✓</span>
                <span>完整恩如三部曲評分系統（挑噴出/回檔、看型態、看量找動能）</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#D4AF37] mt-0.5">✓</span>
                <span>多方與空方雙向策略選股</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#D4AF37] mt-0.5">✓</span>
                <span>自訂篩選條件，建立專屬選股組合</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#D4AF37] mt-0.5">✓</span>
                <span>VIP社團互動討論區（恩如專區）</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#D4AF37] mt-0.5">✓</span>
                <span>無限觀看所有VIP專屬影音內容</span>
              </div>
            </div>
          </div>

          <div className="bg-[#FFF9E6] border border-[#FFE7A8] rounded-lg p-4">
            <h3 className="text-sm font-bold text-[#D4AF37] mb-2">⚠️ 試用版限制</h3>
            <p className="text-xs text-[#999] leading-relaxed">
              試用版用戶僅能查看前3支股票，其餘股票將以模糊效果顯示。升級為專業版會員，即可解鎖全部功能！
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E0E0E0] p-4 shadow-lg">
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <p className="text-xs text-[#999] mb-1">{selectedPlan.name} {selectedPlan.days}天</p>
            <p className="text-[10px] text-[#999] line-through mb-0.5">
              原價NT${selectedPlan.originalPrice.toLocaleString()}
            </p>
            <p className="text-2xl font-bold text-[#E13D3D]">
              NT${selectedPlan.price.toLocaleString()}
            </p>
          </div>
          <button
            onClick={handlePurchase}
            className="bg-[#E13D3D] hover:bg-[#C83333] text-white px-8 py-3 rounded-lg font-bold text-base shadow-lg transition-colors"
          >
            立即購買
          </button>
        </div>
      </div>

      {/* Bottom Spacer */}
      <div className="h-24" />
    </div>
  );
}