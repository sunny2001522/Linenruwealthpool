import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { Carousel } from "../components/Carousel";
import { useAuth } from "../lib/authContext";

import guide1 from "../assets/guide1.jpg";
import guide2 from "../assets/guide2.jpg";
import guide3 from "../assets/guide3.jpg";
import guide4 from "../assets/guide4.jpg";
import guide5 from "../assets/guide5.jpg";
import guide6 from "../assets/guide6.jpg";
import guide7 from "../assets/guide7.jpg";
import guide8 from "../assets/guide8.jpg";

const carouselImages = [guide1, guide2, guide3, guide4, guide5, guide6, guide7, guide8];

export function VipPage() {
  const navigate = useNavigate();
  const { upgradeToPro } = useAuth();

  const handleSubscribe = () => {
    upgradeToPro();
    navigate("/home/more", { state: { justPurchased: true } });
  };

  return (
    <div className="h-screen bg-[#141414] text-white overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-[#141414] z-10 flex items-center px-4 py-2">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-white"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">更多</span>
        </button>
        <h1 className="flex-1 text-center text-base font-semibold pr-10">
          升級 VIP
        </h1>
      </div>

      {/* ===== First screen: Carousel + Plan button ===== */}
      {/* Carousel - full width, slight bottom crop */}
      <div className="w-full overflow-hidden h-[66vh]">
        <Carousel autoplaySpeed={3500}>
          {carouselImages.map((img, i) => (
            <div key={i} className="flex justify-center">
              <img
                src={img}
                alt={`VIP 功能介紹 ${i + 1}`}
                className="w-[80%] object-cover object-top"
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Plan Card - visible on first screen */}
      <div className="px-4 pt-2 pb-4">
        <h2 className="text-base font-bold mb-2">選擇適合您的方案</h2>
        <div className="relative rounded-xl border border-[#4A90E2]/40 bg-gradient-to-br from-[#0d1a2e] to-[#0a0a0a] p-4">
          <div className="inline-block bg-[#4A90E2] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-2">
            新戶限定｜只在今天
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-xs mb-0.5">
                月訂閱 每月現省NT$700
              </p>
              <p className="text-white/40 text-xs line-through mb-0.5">NT$3,200/月</p>
              <p className="text-2xl font-bold">NT$2,500<span className="text-sm font-normal text-white/60">/月</span></p>
            </div>
            <button
              onClick={handleSubscribe}
              className="bg-[#4A90E2] text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-[#3a7bd5] transition-colors"
            >
              立即了解
            </button>
          </div>
        </div>
      </div>

      {/* ===== Scroll down: Purchase notice ===== */}
      <div className="px-4 pb-6">
        <h3 className="text-sm font-bold mb-2">購買須知</h3>
        <ul className="space-y-1 text-xs text-white/50 leading-relaxed">
          <li className="flex items-start gap-1.5">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-white/50 flex-shrink-0" />
            <span>確定購買產品後，費用將從您的iTunes帳戶扣款。</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-white/50 flex-shrink-0" />
            <span>產品訂閱會自動續訂，除非在當前期間結束前至少24小時關閉自動續訂。</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-white/50 flex-shrink-0" />
            <span>產品到期24小時前，iTunes帳號將會自動扣款，並續訂本產品。</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-white/50 flex-shrink-0" />
            <span>如要更換購買方案，請先取消上一筆訂閱，再重新購買。</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-white/50 flex-shrink-0" />
            <span>{"取消訂閱流程：進入手機 [設定] → [iTunes與App Store] → [Apple ID] → [檢視Apple ID] → [訂閱項目]。"}</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-white/50 flex-shrink-0" />
            <span>購買手機版不支援桌機版使用。</span>
          </li>
        </ul>

        {/* Footer Links */}
        <div className="flex items-center gap-4 text-xs text-[#4A90E2] pt-4 pb-4">
          <button className="hover:underline">服務條款</button>
          <button className="hover:underline">隱私權政策</button>
          <button className="hover:underline">恢復購買</button>
        </div>
      </div>
    </div>
  );
}
