interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/70 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-[#212121] rounded-lg shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] w-[300px] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 標題 */}
        <div className="h-[52px] flex items-center justify-center rounded-t-lg">
          <p className="text-[18px] text-white text-center">
            確定要刪除貼文嗎？
          </p>
        </div>

        {/* 內容 */}
        <div className="px-4 py-3">
          <p className="text-[16px] text-white text-center">
            刪除後，將無法復原
          </p>
        </div>

        {/* 按鈕 */}
        <div className="px-4 pb-5 pt-4">
          <div className="flex gap-3">
            {/* 取消按鈕 */}
            <button
              onClick={onClose}
              className="flex-1 h-11 bg-[#2f2f2f] rounded-lg flex items-center justify-center hover:bg-[#3a3a3a] transition-colors"
            >
              <span className="text-[16px] text-white">取消</span>
            </button>

            {/* 確定按鈕 */}
            <button
              onClick={handleConfirm}
              className="flex-1 h-11 rounded-lg flex items-center justify-center transition-all hover:opacity-90"
              style={{
                backgroundImage:
                  "linear-gradient(165.24deg, rgb(74, 144, 226) 21.694%, rgb(59, 130, 246) 78.306%)",
              }}
            >
              <span className="text-[16px] text-white font-medium">確定</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}