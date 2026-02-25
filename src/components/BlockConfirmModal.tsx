interface BlockConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

export function BlockConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  userName,
}: BlockConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-2"
      onClick={onClose}
    >
      {/* 遮罩 */}
      <div className="absolute inset-0 bg-black opacity-25" />

      {/* 彈窗內容 */}
      <div
        className="relative bg-[#212121] rounded-lg shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] w-[300px] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 留白 */}
        <div className="h-2" />

        {/* 標題 */}
        <div className="h-[52px] flex items-center justify-center w-full">
          <p className="text-white text-[18px] text-center leading-[24px]">
            確定要封鎖此用戶嗎？
          </p>
        </div>

        {/* 內容 */}
        <div className="px-4 py-3 w-full flex items-center justify-center">
          <p className="text-white text-[16px] leading-[24px] text-center">
            封鎖後即不能再看到他的文章和留言
          </p>
        </div>

        {/* 按鈕區域 */}
        <div className="px-4 pt-4 pb-5 w-full">
          <div className="flex gap-3 w-[268px] mx-auto">
            {/* 取消按鈕 */}
            <button
              onClick={onClose}
              className="flex-1 h-[44px] bg-[#2f2f2f] rounded-lg flex items-center justify-center px-5 py-3 hover:opacity-90 transition-opacity"
            >
              <p className="text-white text-[16px] leading-[24px]">取消</p>
            </button>

            {/* 確定按鈕 */}
            <button
              onClick={onConfirm}
              className="flex-1 h-[44px] bg-[#4A90E2] rounded-lg flex items-center justify-center px-5 py-3 hover:opacity-90 transition-opacity"
            >
              <p className="text-white text-[16px] leading-[24px]">確定</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}