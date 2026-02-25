import { X } from "lucide-react";
import { useNavigate } from "react-router";
import { IS_REVIEW_MODE } from "../lib/appConfig";

interface SubscriptionPlan {
  id: string;
  name: string;
  days: number;
  price: number;
  originalPrice: number;
  discount: number;
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "yearly",
    name: "年訂閱",
    days: 365,
    price: 26999,
    originalPrice: 34000,
    discount: 7001,
  },
  {
    id: "quarterly",
    name: "季訂閱",
    days: 93,
    price: 6888,
    originalPrice: 8500,
    discount: 1612,
  },
  {
    id: "monthly",
    name: "月訂閱",
    days: 31,
    price: 2500,
    originalPrice: 3200,
    discount: 700,
  },
];

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPro?: boolean;
  onCancelSubscription?: () => void;
}

export function SubscriptionModal({
  isOpen,
  onClose,
  isPro,
  onCancelSubscription,
}: SubscriptionModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handlePurchase = (plan: SubscriptionPlan) => {
    if (IS_REVIEW_MODE) {
      // 審查模式：使用原生 App Store 購買
      // 跳轉到購買頁面（模擬 App Store 購買流程）
      navigate("/purchase", {
        state: { plan, isReviewMode: true },
      });
    } else {
      // 正式模式：導向內部網頁購買
      navigate("/web-purchase");
    }
    onClose(); // 關閉彈窗
  };

  return (
    <>
      {/* 背景遮罩 */}
      <div
        className="fixed inset-0 bg-black/60 z-[60] animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-0 bottom-0 z-[60] animate-in slide-in-from-bottom duration-300">
        <div className="bg-background rounded-t-2xl max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  訂閱專業版
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  解鎖全部VIP專屬內容
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Plans */}
          <div className="px-4 py-6 flex gap-3 overflow-x-auto">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-card border border-border rounded-xl p-3 hover:border-primary/50 transition-colors flex-1 min-w-[110px]"
              >
                {/* Plan Header */}
                <div className="mb-2">
                  <h3 className="font-semibold text-sm mb-0.5">
                    {plan.name}
                  </h3>
                  <span className="text-[10px] text-muted-foreground block mb-2">
                    {plan.days}天訂閱型
                  </span>
                  <div className="mb-1">
                    <span className="text-lg font-bold bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF] bg-clip-text text-transparent block">
                      NT${plan.price.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-muted-foreground line-through block">
                      原價{plan.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[10px] text-green-500">
                    省{plan.discount.toLocaleString()}
                  </p>
                </div>

                {/* Purchase Button */}
                <button
                  onClick={() => handlePurchase(plan)}
                  className="w-full py-2 bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF] text-white text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  立即購買
                </button>

                {/* Notice */}
                <p className="text-[9px] text-muted-foreground mt-2 text-center leading-tight">
                  *不可使用購物金
                </p>
              </div>
            ))}
          </div>

          {/* Footer Info */}
          <div className="px-4 pb-20 space-y-4">
            <div className="bg-muted/30 rounded-lg p-4 space-y-2">
              <h4 className="text-sm font-medium">
                專業版權益
              </h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• 無限觀看所有VIP專屬影音內容</li>
                <li>• 專屬恩如選股策略與教學</li>
                <li>• VIP社團互動討論區</li>
                <li>• 優先報名付費講座優惠</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}