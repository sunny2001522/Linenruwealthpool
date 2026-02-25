import svgPaths from "./svg-iksxxjcvdw";

function AssetIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="asset/icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="asset/icon">
          <path d={svgPaths.p1338ee80} fill="var(--fill-0, white)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Asset() {
  return (
    <div className="absolute bg-[#2f2f2f] content-stretch flex gap-[4px] h-[40px] items-center left-[8px] p-[8px] rounded-[4px] top-[104px]" data-name="asset/標籤/標記個股標籤">
      <p className="font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[24px] relative shrink-0 text-[18px] text-white" style={{ fontVariationSettings: "\'wght\' 400" }}>
        台積電
      </p>
      <AssetIcon />
    </div>
  );
}

function AssetIcon1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="asset/icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="asset/icon">
          <path d={svgPaths.p1338ee80} fill="var(--fill-0, white)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Asset1() {
  return (
    <div className="absolute bg-[#2f2f2f] content-stretch flex gap-[4px] h-[40px] items-center left-[114px] p-[8px] rounded-[4px] top-[104px]" data-name="asset/標籤/標記個股標籤">
      <p className="font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[24px] relative shrink-0 text-[18px] text-white" style={{ fontVariationSettings: "\'wght\' 400" }}>
        鴻海
      </p>
      <AssetIcon1 />
    </div>
  );
}

function Component1() {
  return (
    <div className="absolute contents inset-1/4" data-name="通用/線條/關閉/預設">
      <div className="absolute flex inset-1/4 items-center justify-center">
        <div className="flex-none h-[1.886px] rotate-45 w-[15.085px]">
          <div className="bg-white rounded-[2px] size-full" />
        </div>
      </div>
      <div className="absolute flex inset-1/4 items-center justify-center">
        <div className="flex-none h-[1.886px] rotate-135 w-[15.085px]">
          <div className="bg-white rounded-[2px] size-full" />
        </div>
      </div>
    </div>
  );
}

function AssetIcon2() {
  return (
    <div className="absolute left-[8px] size-[24px] top-[10px]" data-name="asset/icon">
      <Component1 />
    </div>
  );
}

function Component2() {
  return (
    <div className="absolute bg-[#ffb13b] content-stretch flex items-center justify-center px-[14px] py-[4px] right-[8px] rounded-[4px] top-[8px]" data-name="按鈕">
      <p className="font-['PingFang_TC:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-black text-center">發佈</p>
    </div>
  );
}

function Component() {
  return (
    <div className="absolute bg-[#212121] h-[44px] left-0 top-[44px] w-[390px]" data-name="導航列/建立貼文">
      <p className="absolute font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] inset-[22.73%_40.53%_22.73%_40.27%] leading-[24px] text-[18px] text-center text-white whitespace-pre-wrap" style={{ fontVariationSettings: "\'wght\' 400" }}>
        建立貼文
      </p>
      <AssetIcon2 />
      <Component2 />
    </div>
  );
}

function RightSide() {
  return (
    <div className="absolute h-[11.336px] right-[14.67px] top-[17.33px] w-[66.661px]" data-name="Right Side">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66.6614 11.336">
        <g id="Right Side">
          <g id="Battery">
            <path d={svgPaths.p28f36a80} id="Rectangle" opacity="0.35" stroke="var(--stroke-0, white)" />
            <path d={svgPaths.p22185d80} fill="var(--fill-0, white)" id="Combined Shape" opacity="0.4" />
            <path d={svgPaths.p1d2dd240} fill="var(--fill-0, white)" id="Rectangle_2" />
          </g>
          <path d={svgPaths.p2160c680} fill="var(--fill-0, white)" id="Wifi" />
          <path d={svgPaths.p36dac880} fill="var(--fill-0, white)" id="Mobile Signal" />
        </g>
      </svg>
    </div>
  );
}

function Time() {
  return (
    <div className="absolute h-[21px] left-[21px] top-[12px] w-[54px]" data-name="Time">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 54 21">
        <g id="Time">
          <g id="9:41">
            <path d={svgPaths.p24372f50} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3aa84e00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2e6b3780} fill="var(--fill-0, white)" />
            <path d={svgPaths.p12b0b900} fill="var(--fill-0, white)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function LeftSide() {
  return (
    <div className="absolute contents left-[21px] top-[12px]" data-name="Left Side">
      <Time />
    </div>
  );
}

function Component7() {
  return (
    <div className="absolute bg-[#212121] h-[44px] left-0 overflow-clip top-0 w-[375px]" data-name="狀態列/375">
      <RightSide />
      <LeftSide />
    </div>
  );
}

function Component8() {
  return (
    <div className="absolute h-[30px] left-0 top-[782px] w-[375px]" data-name="首頁指示鍵/375">
      <div className="-translate-x-1/2 absolute bg-white bottom-[8px] h-[5px] left-[calc(50%+0.5px)] rounded-[100px] w-[134px]" data-name="Home Indicator" />
    </div>
  );
}

function Return() {
  return (
    <div className="absolute inset-[58.42%_0.8%_27.15%_75.73%]" data-name="Return">
      <div className="absolute inset-[0_0_-2.38%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 43">
          <g filter="url(#filter0_d_302_5801)" id="Rectangle">
            <path clipRule="evenodd" d={svgPaths.p181faf00} fill="var(--fill-0, #ADB3BC)" fillRule="evenodd" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="43" id="filter0_d_302_5801" width="88" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.537255 0 0 0 0 0.541176 0 0 0 0 0.552941 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_302_5801" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_302_5801" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
      <p className="absolute font-['Acme:Regular',sans-serif] inset-[26.19%_0_23.81%_0] leading-[21px] not-italic text-[16px] text-black text-center tracking-[-0.32px] whitespace-pre-wrap">Go</p>
    </div>
  );
}

function Space() {
  return (
    <div className="absolute inset-[58.42%_25.87%_27.15%_25.6%]" data-name="Space">
      <div className="absolute inset-[0_0_-2.38%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 182 43">
          <g filter="url(#filter0_d_302_5742)" id="Rectangle">
            <path clipRule="evenodd" d={svgPaths.p3a2242f0} fill="var(--fill-0, white)" fillRule="evenodd" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="43" id="filter0_d_302_5742" width="182" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.537255 0 0 0 0 0.541176 0 0 0 0 0.552941 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_302_5742" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_302_5742" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
      <p className="absolute font-['Acme:Regular',sans-serif] inset-[26.19%_0_23.81%_0] leading-[21px] not-italic text-[16px] text-black text-center tracking-[-0.32px] whitespace-pre-wrap">space</p>
    </div>
  );
}

function Component6() {
  return (
    <div className="absolute inset-[58.42%_76%_27.15%_0.8%]" data-name="123">
      <div className="absolute inset-[0_0_-2.38%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 87 43">
          <g filter="url(#filter0_d_302_5781)" id="Rectangle">
            <path clipRule="evenodd" d={svgPaths.p15ab3d00} fill="var(--fill-0, #ADB3BC)" fillRule="evenodd" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="43" id="filter0_d_302_5781" width="87" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.537255 0 0 0 0 0.541176 0 0 0 0 0.552941 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_302_5781" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_302_5781" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
      <p className="absolute font-['Acme:Regular',sans-serif] inset-[26.19%_0_23.81%_0] leading-[21px] not-italic text-[16px] text-black text-center tracking-[-0.32px] whitespace-pre-wrap">123</p>
    </div>
  );
}

function KeyLight() {
  return (
    <div className="absolute inset-[39.86%_0.8%_45.7%_88%]" data-name="Key Light">
      <div className="absolute inset-[0_0_-2.38%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 42 43">
          <g filter="url(#filter0_d_302_5779)" id="Rectangle">
            <path clipRule="evenodd" d={svgPaths.p1e57ee00} fill="var(--fill-0, #ADB3BC)" fillRule="evenodd" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="43" id="filter0_d_302_5779" width="42" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.537255 0 0 0 0 0.541176 0 0 0 0 0.552941 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_302_5779" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_302_5779" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
      <p className="absolute font-['Acme:Regular',sans-serif] inset-[26.19%_0_23.81%_0] leading-[21px] not-italic text-[16px] text-black text-center tracking-[-0.32px] whitespace-pre-wrap">{` `}</p>
    </div>
  );
}

function Delete() {
  return (
    <div className="absolute contents inset-[39.86%_0.8%_45.7%_88%]" data-name="Delete">
      <KeyLight />
      <div className="absolute inset-[44.21%_3.38%_49.95%_90.58%]" data-name="Delete Button">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.66 16.9941">
          <path d={svgPaths.p127e0c00} fill="var(--fill-0, black)" id="Delete Button" />
        </svg>
      </div>
    </div>
  );
}

function KeyLight1() {
  return (
    <div className="absolute inset-[39.86%_88%_45.7%_0.8%]" data-name="Key Light">
      <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Rectangle" />
      <p className="absolute font-['Acme:Regular',sans-serif] leading-[normal] left-[48.07%] not-italic right-[51.93%] text-[22.5px] text-black text-center top-[calc(50%-13px)] tracking-[-0.5547px]">{` `}</p>
    </div>
  );
}

function Shift() {
  return (
    <div className="absolute contents inset-[39.86%_88%_45.7%_0.8%]" data-name="Shift">
      <KeyLight1 />
      <div className="absolute inset-[44.05%_91.06%_50.29%_3.91%]" data-name="Shift">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.88 16.4563">
          <path d={svgPaths.p1a2ed980} fill="var(--fill-0, black)" id="Shift" />
        </svg>
      </div>
    </div>
  );
}

function M() {
  return (
    <div className="absolute inset-[39.86%_15.47%_45.7%_76%]" data-name="M">
      <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Rectangle" />
      <p className="absolute font-['Acme:Regular',sans-serif] leading-[normal] left-1/4 not-italic right-[21.88%] text-[22.5px] text-black text-center top-[calc(50%-13px)] tracking-[-0.5547px]">M</p>
    </div>
  );
}

function N() {
  return (
    <div className="absolute inset-[39.86%_25.6%_45.7%_65.87%]" data-name="N">
      <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Rectangle" />
      <p className="absolute font-['Acme:Regular',sans-serif] leading-[normal] left-1/4 not-italic right-1/4 text-[22.5px] text-black text-center top-[calc(50%-13px)] tracking-[-0.5547px]">N</p>
    </div>
  );
}

function B() {
  return (
    <div className="absolute inset-[39.86%_35.73%_45.7%_55.73%]" data-name="B">
      <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Rectangle" />
      <p className="absolute font-['Acme:Regular',sans-serif] leading-[normal] left-[28.13%] not-italic right-[28.13%] text-[22.5px] text-black text-center top-[calc(50%-13px)] tracking-[-0.5547px]">B</p>
    </div>
  );
}

function V() {
  return (
    <div className="absolute inset-[39.86%_45.6%_45.7%_45.87%]" data-name="V">
      <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Rectangle" />
      <p className="absolute font-['Acme:Regular',sans-serif] leading-[normal] left-[28.13%] not-italic right-[28.13%] text-[22.5px] text-black text-center top-[calc(50%-13px)] tracking-[-0.5547px]">V</p>
    </div>
  );
}

function C() {
  return (
    <div className="absolute inset-[39.86%_55.73%_45.7%_35.73%]" data-name="C">
      <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Rectangle" />
      <p className="absolute font-['Acme:Regular',sans-serif] leading-[normal] left-[31.25%] not-italic right-[28.13%] text-[22.5px] text-black text-center top-[calc(50%-13px)] tracking-[-0.5547px]">C</p>
    </div>
  );
}

function X() {
  return (
    <div className="absolute inset-[39.86%_65.6%_45.7%_25.87%]" data-name="X">
      <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Rectangle" />
      <p className="absolute font-['Acme:Regular',sans-serif] leading-[normal] left-[28.13%] not-italic right-[28.13%] text-[22.5px] text-black text-center top-[calc(50%-13px)] tracking-[-0.5547px]">X</p>
    </div>
  );
}

function Z() {
  return (
    <div className="absolute inset-[39.86%_75.73%_45.7%_15.73%]" data-name="Z">
      <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Rectangle" />
      <p className="absolute font-['Acme:Regular',sans-serif] leading-[normal] left-[31.25%] not-italic right-[28.13%] text-[22.5px] text-black text-center top-[calc(50%-13px)] tracking-[-0.5547px]">Z</p>
    </div>
  );
}

function L() {
  return (
    <div className="absolute inset-[21.31%_5.6%_64.26%_85.87%]" data-name="L">
      <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Rectangle" />
      <p className="absolute font-['Acme:Regular',sans-serif] leading-[normal] left-[34.38%] not-italic right-[34.38%] text-[22.5px] text-black text-center top-[calc(50%-13px)] tracking-[-0.5547px]">L</p>
    </div>
  );
}

function K() {
  return (
    <div className="absolute inset-[21.31%_15.73%_64.26%_75.73%]" data-name="K">
      <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Rectangle" />
      <p className="absolute font-['Acme:Regular',sans-serif] leading-[normal] left-[28.13%] not-italic right-[28.13%] text-[22.5px] text-black text-center top-[calc(50%-13px)] tracking-[-0.5547px]">K</p>
    </div>
  );
}

function J() {
  return (
    <div className="absolute inset-[21.31%_25.6%_64.26%_65.87%]" data-name="J">
      <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Rectangle" />
      <p className="absolute font-['Acme:Regular',sans-serif] leading-[normal] left-[37.5%] not-italic right-[37.5%] text-[22.5px] text-black text-center top-[calc(50%-13px)] tracking-[-0.5547px]">J</p>
    </div>
  );
}

function H() {
  return (
    <div className="absolute inset-[21.31%_35.73%_64.26%_55.73%]" data-name="H">
      <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Rectangle" />
      <p className="absolute font-['Acme:Regular',sans-serif] leading-[normal] left-1/4 not-italic right-1/4 text-[22.5px] text-black text-center top-[calc(50%-13px)] tracking-[-0.5547px]">H</p>
    </div>
  );
}

function G() {
  return (
    <div className="absolute inset-[21.31%_45.6%_64.26%_45.87%]" data-name="G">
      <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Rectangle" />
      <p className="absolute font-['Acme:Regular',sans-serif] leading-[normal] left-[28.13%] not-italic right-1/4 text-[22.5px] text-black text-center top-[calc(50%-13px)] tracking-[-0.5547px]">G</p>
    </div>
  );
}

function F() {
  return (
    <div className="absolute inset-[21.31%_55.73%_64.26%_35.73%]" data-name="F">
      <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Rectangle" />
      <p className="absolute font-['Acme:Regular',sans-serif] leading-[normal] left-[34.38%] not-italic right-[34.38%] text-[22.5px] text-black text-center top-[calc(50%-13px)] tracking-[-0.5547px]">F</p>
    </div>
  );
}

function D() {
  return (
    <div className="absolute inset-[21.31%_65.6%_64.26%_25.87%]" data-name="D">
      <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Rectangle" />
      <p className="absolute font-['Acme:Regular',sans-serif] leading-[normal] left-[28.13%] not-italic right-1/4 text-[22.5px] text-black text-center top-[calc(50%-13px)] tracking-[-0.5547px]">D</p>
    </div>
  );
}

function S() {
  return (
    <div className="absolute inset-[21.31%_75.73%_64.26%_15.73%]" data-name="S">
      <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Rectangle" />
      <p className="absolute font-['Acme:Regular',sans-serif] leading-[normal] left-[31.25%] not-italic right-[31.25%] text-[22.5px] text-black text-center top-[calc(50%-13px)] tracking-[-0.5547px]">S</p>
    </div>
  );
}

function A() {
  return (
    <div className="absolute inset-[21.31%_85.6%_64.26%_5.87%]" data-name="A">
      <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Rectangle" />
      <p className="absolute font-['Acme:Regular',sans-serif] leading-[normal] left-[28.13%] not-italic right-1/4 text-[22.5px] text-black text-center top-[calc(50%-13px)] tracking-[-0.5547px]">A</p>
    </div>
  );
}

function P() {
  return (
    <div className="absolute inset-[2.75%_0.8%_82.82%_90.67%]" data-name="P">
      <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Rectangle" />
      <p className="absolute font-['Acme:Regular',sans-serif] leading-[normal] left-[31.25%] not-italic right-[31.25%] text-[22.5px] text-black text-center top-[calc(50%-13px)] tracking-[-0.5547px]">P</p>
    </div>
  );
}

function O() {
  return (
    <div className="absolute inset-[2.75%_10.67%_82.82%_80.8%]" data-name="O">
      <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Rectangle" />
      <p className="absolute font-['Acme:Regular',sans-serif] leading-[normal] left-[28.13%] not-italic right-1/4 text-[22.5px] text-black text-center top-[calc(50%-13px)] tracking-[-0.5547px]">O</p>
    </div>
  );
}

function I() {
  return (
    <div className="absolute inset-[2.75%_20.8%_82.82%_70.67%]" data-name="I">
      <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Rectangle" />
      <p className="absolute font-['Acme:Regular',sans-serif] leading-[normal] left-[40.63%] not-italic right-[37.5%] text-[22.5px] text-black text-center top-[calc(50%-13px)] tracking-[-0.5547px]">I</p>
    </div>
  );
}

function U() {
  return (
    <div className="absolute inset-[2.75%_30.67%_82.82%_60.8%]" data-name="U">
      <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Rectangle" />
      <p className="absolute font-['Acme:Regular',sans-serif] leading-[normal] left-[28.13%] not-italic right-1/4 text-[22.5px] text-black text-center top-[calc(50%-13px)] tracking-[-0.5547px]">U</p>
    </div>
  );
}

function Y() {
  return (
    <div className="absolute inset-[2.75%_40.8%_82.82%_50.67%]" data-name="Y">
      <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Rectangle" />
      <p className="absolute font-['Acme:Regular',sans-serif] leading-[normal] left-[31.25%] not-italic right-[28.13%] text-[22.5px] text-black text-center top-[calc(50%-13px)] tracking-[-0.5547px]">Y</p>
    </div>
  );
}

function T() {
  return (
    <div className="absolute inset-[2.75%_50.67%_82.82%_40.8%]" data-name="T">
      <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Rectangle" />
      <p className="absolute font-['Acme:Regular',sans-serif] leading-[normal] left-[34.38%] not-italic right-[31.25%] text-[22.5px] text-black text-center top-[calc(50%-13px)] tracking-[-0.5547px]">T</p>
    </div>
  );
}

function R() {
  return (
    <div className="absolute inset-[2.75%_60.8%_82.82%_30.67%]" data-name="R">
      <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Rectangle" />
      <p className="absolute font-['Acme:Regular',sans-serif] leading-[normal] left-[28.13%] not-italic right-[28.13%] text-[22.5px] text-black text-center top-[calc(50%-13px)] tracking-[-0.5547px]">R</p>
    </div>
  );
}

function E() {
  return (
    <div className="absolute inset-[2.75%_70.67%_82.82%_20.8%]" data-name="E">
      <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Rectangle" />
      <p className="absolute font-['Acme:Regular',sans-serif] leading-[normal] left-[31.25%] not-italic right-[31.25%] text-[22.5px] text-black text-center top-[calc(50%-13px)] tracking-[-0.5547px]">E</p>
    </div>
  );
}

function W() {
  return (
    <div className="absolute inset-[2.75%_80.8%_82.82%_10.67%]" data-name="W">
      <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Rectangle" />
      <p className="absolute font-['Acme:Regular',sans-serif] leading-[normal] left-[18.75%] not-italic right-[15.63%] text-[22.5px] text-black text-center top-[calc(50%-13px)] tracking-[-0.5547px]">W</p>
    </div>
  );
}

function Q() {
  return (
    <div className="absolute inset-[2.75%_90.67%_82.82%_0.8%]" data-name="Q">
      <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Rectangle" />
      <p className="absolute font-['Acme:Regular',sans-serif] leading-[normal] left-1/4 not-italic right-1/4 text-[22.5px] text-black text-center top-[calc(50%-13px)] tracking-[-0.5547px]">Q</p>
    </div>
  );
}

function Keys() {
  return (
    <div className="absolute contents inset-[2.75%_0.8%_8.25%_0.8%]" data-name="Keys">
      <div className="absolute inset-[82.82%_8%_8.59%_88%]" data-name="Dictation">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 25">
          <path d={svgPaths.p1ca34300} fill="var(--fill-0, #50555C)" id="Dictation" />
        </svg>
      </div>
      <div className="absolute inset-[82.47%_86.13%_8.25%_6.67%]" data-name="Emoji">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 27">
          <path clipRule="evenodd" d={svgPaths.p2cb5cac0} fill="var(--fill-0, #50555C)" fillRule="evenodd" id="Emoji" />
        </svg>
      </div>
      <Return />
      <Space />
      <Component6 />
      <Delete />
      <Shift />
      <M />
      <N />
      <B />
      <V />
      <C />
      <X />
      <Z />
      <L />
      <K />
      <J />
      <H />
      <G />
      <F />
      <D />
      <S />
      <A />
      <P />
      <O />
      <I />
      <U />
      <Y />
      <T />
      <R />
      <E />
      <W />
      <Q />
    </div>
  );
}

function Component3() {
  return (
    <div className="absolute h-[291px] left-0 top-[521px] w-[375px]" data-name="鍵盤">
      <div className="absolute backdrop-blur-[54.366px] bg-[#d1d5db] inset-0" data-name="background" />
      <Keys />
    </div>
  );
}

function Asset4() {
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

function Asset3() {
  return (
    <div className="bg-[#2f2f2f] content-stretch flex gap-[4px] items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="asset/按鈕/發文工具列">
      <Asset4 />
      <p className="font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[20px] relative shrink-0 text-[14px] text-white" style={{ fontVariationSettings: "\'wght\' 400" }}>
        標個股
      </p>
    </div>
  );
}

function Asset6() {
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

function Asset5() {
  return (
    <div className="bg-[#2f2f2f] content-stretch flex gap-[4px] items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="asset/按鈕/發文工具列">
      <Asset6 />
      <p className="font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[20px] relative shrink-0 text-[14px] text-white" style={{ fontVariationSettings: "\'wght\' 400" }}>
        加圖片
      </p>
    </div>
  );
}

function Asset8() {
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

function Asset7() {
  return (
    <div className="bg-[#2f2f2f] content-stretch flex gap-[4px] items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="asset/按鈕/發文工具列">
      <Asset8 />
      <p className="font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[20px] relative shrink-0 text-[14px] text-white" style={{ fontVariationSettings: "\'wght\' 400" }}>
        加標題
      </p>
    </div>
  );
}

function Component4() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="發文工具列">
      <Asset3 />
      <Asset5 />
      <Asset7 />
    </div>
  );
}

function Component5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-end min-h-px min-w-px relative" data-name="社群規範">
      <p className="[text-decoration-skip-ink:none] decoration-solid font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[24px] relative shrink-0 text-[#7a7a7a] text-[14px] underline" style={{ fontVariationSettings: "\'wght\' 400" }}>
        社群規範
      </p>
    </div>
  );
}

function Asset2() {
  return (
    <div className="absolute bg-[#141414] content-stretch flex gap-[16px] items-center left-0 px-[16px] py-[8px] top-[473px] w-[390px]" data-name="asset/卡片/發文工具列">
      <Component4 />
      <Component5 />
    </div>
  );
}

export default function Vip() {
  return (
    <div className="bg-[#141414] relative size-full" data-name="社團/VIP社團/發文/1圖1標籤">
      <p className="absolute font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[28px] left-[8px] text-[18px] text-white top-[156px] w-[359px] whitespace-pre-wrap" style={{ fontVariationSettings: "\'wght\' 400" }}>
        從過往的經驗，台積電一旦完成填息後，股價上攻的動能相當強勁。對於散戶來說，填息時間可作為良好的布局時機，把握時機投入資金，未來台積電的股價只有
      </p>
      <Asset />
      <Asset1 />
      <Component />
      <Component7 />
      <Component8 />
      <Component3 />
      <Asset2 />
    </div>
  );
}