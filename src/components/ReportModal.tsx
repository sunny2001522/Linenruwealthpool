import { Flag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

const reportReasons = [
  "垃圾訊息或廣告",
  "色情或露骨內容",
  "仇恨言論或暴力內容",
  "詐騙或虛假資訊",
  "侵犯智慧財產權",
  "騷擾或霸凌",
  "其他原因",
];

export function ReportModal({
  isOpen,
  onClose,
  onConfirm,
}: ReportModalProps) {
  const [selectedReason, setSelectedReason] =
    useState<string>("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!selectedReason) {
      toast.error("請選擇檢舉原因");
      return;
    }
    onConfirm(selectedReason);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/70"
      onClick={onClose}
    >
      <div
        className="absolute bottom-0 left-0 right-0 bg-[#212121] rounded-t-xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          paddingBottom: "env(safe-area-inset-bottom, 28px)",
        }}
      >
        {/* 拖動指示器 */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-[#7a7a7a]" />
        </div>

        {/* 標題 */}
        <div className="px-4 py-3 border-b border-[#2f2f2f]">
          <h3 className="text-white text-[18px] font-medium text-center">
            檢舉原因
          </h3>
        </div>

        {/* 檢舉原因列表 */}
        <div className="px-4 py-2 max-h-[60vh] overflow-y-auto">
          {reportReasons.map((reason) => (
            <button
              key={reason}
              onClick={() => setSelectedReason(reason)}
              className="w-full py-3 px-4 flex items-center justify-between hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
            >
              <span className="text-white text-[16px]">
                {reason}
              </span>
              {selectedReason === reason && (
                <div className="w-5 h-5 rounded-full bg-[#4A90E2] flex items-center justify-center">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="white"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* 按鈕區域 */}
        <div className="px-4 py-4 border-t border-[#2f2f2f] flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-lg bg-[#2f2f2f] hover:opacity-90 text-white font-medium transition-opacity"
          >
            取消
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 rounded-lg font-medium transition-opacity hover:opacity-90 bg-[#4A90E2] text-white"
          >
            確認檢舉
          </button>
        </div>
      </div>
    </div>
  );
}