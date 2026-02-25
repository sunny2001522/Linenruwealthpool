import { useEffect, useRef, useState } from "react";
import svgPaths from "../imports/svg-auf2pkztln";

export type ReactionType = 1 | 3 | 4 | 5 | 6 | 7;

interface ReactionPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (reaction: ReactionType) => void;
  position: { x: number; y: number };
  mode: "sliding" | "clicking"; // 滑动模式或点击模式
}

// SVG 表情組件
function ReactionAsset1() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
      <g clipPath="url(#clip0_304_3673)">
        <path d={svgPaths.p1fd92980} fill="url(#paint0_radial_304_3673)" />
        <path d={svgPaths.pdfd0680} fill="white" />
        <path d={svgPaths.p3cc7ef00} fill="white" />
      </g>
      <defs>
        <radialGradient cx="0" cy="0" gradientTransform="translate(20.878 4.84) scale(35.211)" gradientUnits="userSpaceOnUse" id="paint0_radial_304_3673" r="1">
          <stop stopColor="#DC3A3F" />
          <stop offset="1" stopColor="#80171A" />
        </radialGradient>
        <clipPath id="clip0_304_3673">
          <rect fill="white" height="40" rx="20" width="40" />
        </clipPath>
      </defs>
    </svg>
  );
}

function ReactionAsset2() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
      <g clipPath="url(#clip0_304_3682)">
        <path d={svgPaths.p18e27400} fill="#FED132" />
        <g>
          <path d={svgPaths.pd718a00} fill="#802D21" />
          <path d={svgPaths.p3f01bb00} fill="white" />
          <path d={svgPaths.p252d0300} fill="#F55151" />
        </g>
        <g>
          <path d={svgPaths.pdc79c09} fill="#802D21" />
          <path d={svgPaths.p2c18ef00} fill="#802D21" />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_304_3682">
          <rect fill="white" height="40" rx="20" width="40" />
        </clipPath>
      </defs>
    </svg>
  );
}

function ReactionAsset3() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
      <g clipPath="url(#clip0_304_3640)">
        <path d={svgPaths.p12c78d00} fill="#FED132" />
        <g>
          <path d={svgPaths.pf7099c0} fill="#802D21" />
          <g>
            <path d={svgPaths.p275f4e00} fill="#7CB463" />
          </g>
          <g>
            <path d={svgPaths.p397bd600} fill="#802D21" />
            <path d={svgPaths.p11308400} fill="#2E5E04" />
            <path d={svgPaths.pb668400} fill="#802D21" />
          </g>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_304_3640">
          <rect fill="white" height="40" rx="20" width="40" />
        </clipPath>
      </defs>
    </svg>
  );
}

function ReactionAsset4() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
      <path d={svgPaths.p11684100} fill="#FED132" />
      <path d={svgPaths.p350ad400} fill="#28BEEF" />
      <path d={svgPaths.p2569ee80} fill="white" />
      <path d={svgPaths.p1825a600} fill="#170F02" />
      <path d={svgPaths.p13b5f900} fill="white" />
      <path d={svgPaths.pf146b00} fill="#170F02" />
      <path d={svgPaths.p3e458300} fill="#802D21" />
      <path d={svgPaths.p36e62ac0} fill="#F55151" />
    </svg>
  );
}

function ReactionAsset5() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
      <g clipPath="url(#clip0_304_3696)">
        <path d={svgPaths.p18e27400} fill="#FED132" />
        <g>
          <path d={svgPaths.p2b474e80} fill="#28BEEF" />
          <g>
            <path d={svgPaths.p327d6200} fill="#802D21" />
            <path d={svgPaths.p2222c2f0} fill="#802D21" />
          </g>
          <g>
            <path d={svgPaths.p41fec00} fill="#D97818" />
            <path d={svgPaths.p371a5600} fill="#D97818" />
          </g>
          <g>
            <path d={svgPaths.p345a9b00} fill="#802D21" />
            <path d={svgPaths.p3d63ec0} fill="#F55151" />
          </g>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_304_3696">
          <rect fill="white" height="40" rx="20" width="40" />
        </clipPath>
      </defs>
    </svg>
  );
}

function ReactionAsset6() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
      <g clipPath="url(#clip0_304_3659)">
        <path d={svgPaths.p18e27400} fill="#FED132" />
        <g>
          <g>
            <path d={svgPaths.p4d16dc0} fill="#802D21" />
            <path d={svgPaths.pcf40740} fill="#802D21" />
          </g>
          <path d={svgPaths.p2a5b23c0} fill="#802D21" />
          <g>
            <path d={svgPaths.p39af5400} fill="#D97818" />
            <path d={svgPaths.pb46bc80} fill="#D97818" />
          </g>
          <g>
            <path d={svgPaths.p18c20100} fill="white" />
            <path d={svgPaths.p3340f900} fill="#9BAFBA" />
          </g>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_304_3659">
          <rect fill="white" height="40" rx="20" width="40" />
        </clipPath>
      </defs>
    </svg>
  );
}

const reactions: { id: ReactionType; component: React.ReactNode; label: string }[] = [
  { id: 1, component: <ReactionAsset1 />, label: "讚" },
  { id: 3, component: <ReactionAsset2 />, label: "哈" },
  { id: 4, component: <ReactionAsset3 />, label: "賺" },
  { id: 5, component: <ReactionAsset4 />, label: "哇" },
  { id: 6, component: <ReactionAsset5 />, label: "嗚嗚" },
  { id: 7, component: <ReactionAsset6 />, label: "真的嗎" },
];

export function ReactionPicker({
  isOpen,
  onClose,
  onSelect,
  position,
  mode,
}: ReactionPickerProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [hintText, setHintText] = useState("以手指劃過");
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOutOfBounds, setIsOutOfBounds] = useState(false);

  useEffect(() => {
    if (mode === "clicking") {
      setHintText("點按即可選擇表情");
    } else {
      setHintText("以手指劃過");
    }
  }, [mode]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedIndex(-1);
      setIsOutOfBounds(false);
    }
  }, [isOpen]);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (mode !== "sliding") return;

    const touch = e.touches[0];
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = touch.clientX - rect.left;

    // 检查是否在范围外
    if (
      touch.clientX < rect.left ||
      touch.clientX > rect.right ||
      touch.clientY < rect.top - 50 ||
      touch.clientY > rect.bottom + 50
    ) {
      setIsOutOfBounds(true);
      setHintText("放開即可取消");
      setSelectedIndex(-1);
      return;
    }

    setIsOutOfBounds(false);
    setHintText("以手指劃過");

    // 计算当前选中的表情
    const itemWidth = rect.width / reactions.length;
    const index = Math.floor(x / itemWidth);
    if (index >= 0 && index < reactions.length) {
      setSelectedIndex(index);
    }
  };

  const handleTouchEnd = () => {
    if (mode === "sliding") {
      if (!isOutOfBounds && selectedIndex >= 0) {
        onSelect(reactions[selectedIndex].id);
      }
      onClose();
    }
  };

  const handleClick = (reactionId: ReactionType) => {
    if (mode === "clicking") {
      onSelect(reactionId);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 背景遮罩 */}
      <div
        className="fixed inset-0 z-[60]"
        onClick={mode === "clicking" ? onClose : undefined}
      />

      {/* 表情选择器 */}
      <div
        ref={containerRef}
        className="fixed z-[61] bg-[#2f2f2f] rounded-[100px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.75)] p-2 border border-[#404040]"
        style={{
          left: `${Math.max(10, Math.min(position.x - 150, window.innerWidth - 310))}px`,
          top: `${position.y - 120}px`,
        }}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* 表情列表 */}
        <div className="flex gap-2">
          {reactions.map((reaction, index) => (
            <button
              key={reaction.id}
              onClick={() => handleClick(reaction.id)}
              className={`relative p-1 rounded-xl transition-all ${
                selectedIndex === index
                  ? "bg-[#404040]"
                  : "hover:bg-[#404040]/50"
              }`}
            >
              <div
                className={`w-10 h-10 transition-transform duration-200 ${
                  selectedIndex === index ? "scale-150" : ""
                }`}
              >
                {reaction.component}
              </div>
            </button>
          ))}
        </div>

       
      </div>
    </>
  );
}

// 導出表情組件供其他地方使用
export { ReactionAsset1, ReactionAsset2, ReactionAsset3, ReactionAsset4, ReactionAsset5, ReactionAsset6 };