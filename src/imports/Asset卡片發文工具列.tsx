import svgPaths from "./svg-h4z77qqmag";

function Asset2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="asset/標個股">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="asset/æ¨åè¡">
          <path d={svgPaths.p2223a80} fill="var(--fill-0, white)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Asset1() {
  return (
    <div className="bg-[#2f2f2f] content-stretch flex gap-[4px] items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="asset/按鈕/發文工具列">
      <Asset2 />
      <p className="font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[20px] relative shrink-0 text-[14px] text-white" style={{ fontVariationSettings: "\'wght\' 400" }}>
        標個股
      </p>
    </div>
  );
}

function Asset4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="asset/加圖片">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="asset/å åç">
          <path d={svgPaths.p26542c00} fill="var(--fill-0, white)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Asset3() {
  return (
    <div className="bg-[#2f2f2f] content-stretch flex gap-[4px] items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="asset/按鈕/發文工具列">
      <Asset4 />
      <p className="font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[20px] relative shrink-0 text-[14px] text-white" style={{ fontVariationSettings: "\'wght\' 400" }}>
        加圖片
      </p>
    </div>
  );
}

function Asset6() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="asset/加標題">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="asset/å æ¨é¡">
          <path d={svgPaths.p14712f00} fill="var(--fill-0, white)" />
        </g>
      </svg>
    </div>
  );
}

function Asset5() {
  return (
    <div className="bg-[#2f2f2f] content-stretch flex gap-[4px] items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="asset/按鈕/發文工具列">
      <Asset6 />
      <p className="font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[20px] relative shrink-0 text-[14px] text-white" style={{ fontVariationSettings: "\'wght\' 400" }}>
        加標題
      </p>
    </div>
  );
}

function Component() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="發文工具列">
      <Asset1 />
      <Asset3 />
      <Asset5 />
    </div>
  );
}

function Component1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-end min-h-px min-w-px relative" data-name="社群規範">
      <p className="[text-decoration-skip-ink:none] decoration-solid font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[24px] relative shrink-0 text-[#7a7a7a] text-[14px] underline" style={{ fontVariationSettings: "\'wght\' 400" }}>
        社群規範
      </p>
    </div>
  );
}

export default function Asset() {
  return (
    <div className="bg-[#141414] content-stretch flex gap-[16px] items-center px-[16px] py-[8px] relative size-full" data-name="asset/卡片/發文工具列">
      <Component />
      <Component1 />
    </div>
  );
}