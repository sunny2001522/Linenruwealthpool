import svgPaths from "./svg-9hbtdtrwdz";
import imgImage1 from "figma:asset/2551ac06701b61ebcd7bab3c571a2c9fc8f849d4.png";

function AssetIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="asset/icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="asset/icon">
          <path d={svgPaths.p1bc1c800} fill="var(--fill-0, white)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Asset() {
  return (
    <div className="absolute bg-[#ffb13b] bottom-[104px] content-stretch flex items-start p-[8px] right-[24px] rounded-[8px] shadow-[0px_2px_24px_0px_rgba(173,106,4,0.8)]" data-name="asset/按鈕/發文">
      <AssetIcon />
    </div>
  );
}

function Component1() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-center px-[24px] py-[4px] relative rounded-[14px] shrink-0 w-[76px]" data-name="頁籤">
      <p className="font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[20px] relative shrink-0 text-[#ababab] text-[14px] text-center" style={{ fontVariationSettings: "\'wght\' 400" }}>
        聊天室
      </p>
    </div>
  );
}

function Component2() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-center px-[24px] py-[4px] relative rounded-[14px] shrink-0 w-[76px]" data-name="頁籤">
      <p className="font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[0] relative shrink-0 text-[#ababab] text-[14px] text-center" style={{ fontVariationSettings: "\'wght\' 400" }}>
        <span className="font-['PingFang_TC:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[20px]" style={{ fontVariationSettings: "\'wght\' 400" }}>
          作者
        </span>
        <span className="leading-[20px]">專區</span>
      </p>
    </div>
  );
}

function Component3() {
  return (
    <div className="bg-[#ffb13b] content-stretch flex h-[24px] items-center justify-center px-[24px] py-[4px] relative rounded-[4px] shrink-0 w-[76px]" data-name="頁籤">
      <p className="font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[20px] relative shrink-0 text-[14px] text-black text-center" style={{ fontVariationSettings: "\'wght\' 400" }}>
        VIP社團
      </p>
    </div>
  );
}

function Asset1() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#141414] content-stretch flex gap-[6px] h-[28px] items-center justify-center left-[calc(50%+0.5px)] p-[2px] rounded-[6px] top-1/2" data-name="asset/社團切換">
      <Component1 />
      <Component2 />
      <Component3 />
    </div>
  );
}

function Component4() {
  return (
    <div className="-translate-y-1/2 absolute right-[16px] size-[24px] top-1/2" data-name="客服">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="å®¢æ">
          <path d={svgPaths.p19ea8700} fill="var(--fill-0, white)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Component() {
  return (
    <div className="absolute bg-[#212121] h-[44px] left-0 overflow-clip top-[44px] w-[375px]" data-name="導航列/社團">
      <Asset1 />
      <Component4 />
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

function Component72() {
  return (
    <div className="absolute bg-[#212121] h-[44px] left-0 overflow-clip top-0 w-[375px]" data-name="狀態列/375">
      <RightSide />
      <LeftSide />
    </div>
  );
}

function Component5() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.7)] content-stretch flex flex-col h-[812px] items-center justify-end left-0 top-0 w-[375px]" data-name="底部彈窗/貼文更多動作">
      <div className="bg-[#212121] h-[30px] shrink-0 w-[375px]" />
    </div>
  );
}

function Component73() {
  return (
    <div className="absolute bg-[#212121] h-[30px] left-0 top-[782px] w-[375px]" data-name="首頁指示鍵/375">
      <div className="-translate-x-1/2 absolute bg-white bottom-[8px] h-[5px] left-[calc(50%+0.5px)] rounded-[100px] w-[134px]" data-name="Home Indicator" />
    </div>
  );
}

function Component9() {
  return (
    <div className="bg-[#ababab] relative rounded-[20px] shrink-0 size-[40px]" data-name="用戶頭像">
      <div className="absolute left-0 size-[40px] top-0" data-name="image 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
    </div>
  );
}

function Component11() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="附加資訊">
      <p className="font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[16px] relative shrink-0 text-[#ababab] text-[12px]" style={{ fontVariationSettings: "\'wght\' 400" }}>
        1小時前
      </p>
    </div>
  );
}

function Component10() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="用戶名稱">
      <p className="font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[20px] relative shrink-0 text-[14px] text-white" style={{ fontVariationSettings: "\'wght\' 400" }}>
        用戶名稱
      </p>
      <Component11 />
    </div>
  );
}

function Component8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[6px] items-start min-h-px min-w-px relative" data-name="用戶資訊">
      <Component9 />
      <Component10 />
    </div>
  );
}

function Component12() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="更多">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="æ´å¤">
          <circle cx="5" cy="12" fill="var(--fill-0, white)" id="Ellipse" r="2" />
          <circle cx="12" cy="12" fill="var(--fill-0, white)" id="Ellipse_2" r="2" />
          <circle cx="19" cy="12" fill="var(--fill-0, white)" id="Ellipse_3" r="2" />
        </g>
      </svg>
    </div>
  );
}

function Component7() {
  return (
    <div className="bg-[#141414] content-stretch flex gap-[8px] items-start px-[16px] relative shrink-0 w-[375px]" data-name="卡片/用戶資訊">
      <Component8 />
      <Component12 />
    </div>
  );
}

function Component16() {
  return (
    <div className="h-[22px] relative shrink-0 w-[33px]" data-name="圖表/走勢圖/股票標籤/漲">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 22">
        <g id="åè¡¨/èµ°å¢å/è¡ç¥¨æ¨ç±¤/æ¼²">
          <path d={svgPaths.p2c8695a0} id="Vector" stroke="var(--stroke-0, #F84444)" strokeLinecap="round" />
          <path d="M1 21H33V22H0V0H1V21Z" fill="var(--fill-0, #2F2F2F)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Component15() {
  return (
    <div className="bg-[#212121] content-stretch flex gap-[8px] items-start p-[8px] relative rounded-[4px] shrink-0" data-name="標籤/貼文股票標籤">
      <Component16 />
      <p className="font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[24px] relative shrink-0 text-[16px] text-white" style={{ fontVariationSettings: "\'wght\' 400" }}>
        台積電
      </p>
    </div>
  );
}

function Component18() {
  return (
    <div className="h-[22px] relative shrink-0 w-[33px]" data-name="圖表/走勢圖/股票標籤/跌">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 22">
        <g id="åè¡¨/èµ°å¢å/è¡ç¥¨æ¨ç±¤/è·">
          <path d={svgPaths.p25bf4ac0} id="Vector" stroke="var(--stroke-0, #47AB75)" strokeLinecap="round" />
          <path d="M1 21H33V22H0V0H1V21Z" fill="var(--fill-0, #2F2F2F)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Component17() {
  return (
    <div className="bg-[#212121] content-stretch flex gap-[8px] items-start p-[8px] relative rounded-[4px] shrink-0" data-name="標籤/貼文股票標籤">
      <Component18 />
      <p className="font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[24px] relative shrink-0 text-[16px] text-white" style={{ fontVariationSettings: "\'wght\' 400" }}>
        鴻海
      </p>
    </div>
  );
}

function Component14() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="標籤/貼文股票標籤組">
      <Component15 />
      <Component17 />
    </div>
  );
}

function Component19() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="內容">
      <p className="font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[28px] relative shrink-0 text-[18px] text-white w-[343px] whitespace-pre-wrap" style={{ fontVariationSettings: "\'wght\' 400" }}>
        從過往的經驗，台積電一旦完成填息後，股價上攻的動能相當強勁。對於散戶來說，填息時間可作為良好的布局時機，把握時機投入資金，未來台積電的股價只有
      </p>
      <p className="absolute bottom-[26px] font-['Acme:Regular','Noto_Sans:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[24px] right-[88px] text-[#ffb13b] text-[16px] translate-x-full translate-y-full" style={{ fontVariationSettings: "\'CTGR\' 0, \'wdth\' 100, \'wght\' 400" }}>
        …繼續閱讀
      </p>
    </div>
  );
}

function Component13() {
  return (
    <div className="bg-[#141414] content-stretch flex flex-col gap-[8px] items-start px-[16px] py-[12px] relative shrink-0" data-name="卡片/貼文內容">
      <Component14 />
      <Component19 />
    </div>
  );
}

function Component23() {
  return (
    <div className="mr-[-4px] relative shrink-0 size-[18px] z-[3]" data-name="圖標/表情符號">
      <div className="absolute inset-[-11.11%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
          <g id="åæ¨/è¡¨æç¬¦è">
            <rect height="20" rx="10" stroke="var(--stroke-0, #141414)" strokeWidth="2" width="20" x="1" y="1" />
            <path d={svgPaths.p36d6e800} fill="url(#paint0_radial_302_4170)" id="Oval" />
            <path d={svgPaths.p1cfb2500} fill="var(--fill-0, white)" id="Path" />
            <path d={svgPaths.p1eb85080} fill="var(--fill-0, white)" id="Path_2" />
          </g>
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="translate(11.3951 4.178) scale(15.8449)" gradientUnits="userSpaceOnUse" id="paint0_radial_302_4170" r="1">
              <stop stopColor="#DC3A3F" />
              <stop offset="1" stopColor="#80171A" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Component24() {
  return (
    <div className="mr-[-4px] relative shrink-0 size-[18px] z-[2]" data-name="圖標/表情符號">
      <div className="absolute inset-[-11.11%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
          <g id="åæ¨/è¡¨æç¬¦è">
            <rect height="20" rx="10" stroke="var(--stroke-0, #141414)" strokeWidth="2" width="20" x="1" y="1" />
            <path d={svgPaths.p21639300} fill="var(--fill-0, #FED132)" id="Body 1" />
            <g id="Group">
              <path d={svgPaths.p35388d80} fill="var(--fill-0, #802D21)" id="Vector" />
              <path d={svgPaths.p165ac000} fill="var(--fill-0, white)" id="Vector_2" />
              <path d={svgPaths.p245bd000} fill="var(--fill-0, #F55151)" id="Vector_3" />
            </g>
            <g id="Group_2">
              <path d={svgPaths.p2465bf00} fill="var(--fill-0, #802D21)" id="Vector_4" />
              <path d={svgPaths.p2ec698f0} fill="var(--fill-0, #802D21)" id="Vector_5" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="absolute inset-[0_-0.1%_0_0.1%]" data-name="Body">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Body">
          <path d={svgPaths.p2402cd80} fill="var(--fill-0, #FED132)" id="Body_2" />
          <path d={svgPaths.p31d8af80} fill="var(--fill-0, #28BEEF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Eye1() {
  return (
    <div className="absolute inset-[20.83%_53.23%_45.83%_16.77%]" data-name="Eye 2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.4 5.99999">
        <g id="Eye 2">
          <path d={svgPaths.pf3d6200} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p3ba9ed00} fill="var(--fill-0, #170F02)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Eye() {
  return (
    <div className="absolute inset-[20.83%_16.53%_45.83%_53.47%]" data-name="Eye 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.40001 5.99999">
        <g id="Eye 1">
          <path d={svgPaths.p21ab7700} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p12ea3000} fill="var(--fill-0, #170F02)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Eyes() {
  return (
    <div className="absolute contents inset-[20.83%_16.54%_45.83%_16.77%]" data-name="Eyes">
      <Eye1 />
      <Eye />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[54.07%_38.58%_15.99%_38.84%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.06451 5.3895">
        <g id="Group">
          <path d={svgPaths.p6aaa300} fill="var(--fill-0, #802D21)" id="Vector" />
          <path d={svgPaths.p26a00a80} fill="var(--fill-0, #F55151)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Face() {
  return (
    <div className="absolute contents inset-[20.83%_16.54%_15.99%_16.77%]" data-name="Face">
      <Eyes />
      <Group />
    </div>
  );
}

function Component25() {
  return (
    <div className="mr-[-4px] relative rounded-[9px] shrink-0 size-[22px] z-[1]" data-name="圖標/表情符號">
      <div aria-hidden="true" className="absolute border-2 border-[#141414] border-solid inset-0 pointer-events-none rounded-[11px]" />
      <div className="bg-clip-padding border-2 border-[transparent] border-solid relative size-full">
        <Body />
        <Face />
      </div>
    </div>
  );
}

function Component22() {
  return (
    <div className="content-stretch flex isolate items-start pr-[4px] relative shrink-0" data-name="表情數量">
      <Component23 />
      <Component24 />
      <Component25 />
    </div>
  );
}

function Component21() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="表情數量">
      <Component22 />
      <p className="font-['Acme:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#ababab] text-[16px]">999</p>
    </div>
  );
}

function Component20() {
  return (
    <div className="bg-[#141414] content-stretch flex items-center justify-between px-[16px] py-[12px] relative shrink-0 w-[375px]" data-name="卡片/貼文互動資訊">
      <Component21 />
      <div className="flex flex-col font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] h-full justify-center leading-[0] relative shrink-0 text-[#ababab] text-[16px] text-right w-[68px]" style={{ fontVariationSettings: "\'wght\' 400" }}>
        <p className="leading-[24px] whitespace-pre-wrap">38則留言</p>
      </div>
    </div>
  );
}

function Component28() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="按讚">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="æè®">
          <path d={svgPaths.p2b048ac0} id="Path" stroke="var(--stroke-0, #ABABAB)" strokeWidth="1.6" />
          <path d={svgPaths.p12b66d00} id="Path_2" stroke="var(--stroke-0, #ABABAB)" strokeLinejoin="round" strokeWidth="1.60125" />
        </g>
      </svg>
    </div>
  );
}

function Component27() {
  return (
    <div className="bg-[#141414] content-stretch flex gap-[4px] items-center justify-center p-[10px] relative shrink-0 w-[125px]" data-name="按鈕/貼文互動">
      <Component28 />
      <p className="font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[20px] relative shrink-0 text-[#ababab] text-[14px]" style={{ fontVariationSettings: "\'wght\' 400" }}>
        讚
      </p>
    </div>
  );
}

function Component30() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="留言">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="çè¨">
          <path d={svgPaths.p3b336900} id="Vector" stroke="var(--stroke-0, #ABABAB)" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function Component29() {
  return (
    <div className="bg-[#141414] content-stretch flex gap-[4px] items-center justify-center p-[10px] relative shrink-0 w-[125px]" data-name="按鈕/貼文互動">
      <Component30 />
      <p className="font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[20px] relative shrink-0 text-[#ababab] text-[14px]" style={{ fontVariationSettings: "\'wght\' 400" }}>
        留言
      </p>
    </div>
  );
}

function Component32() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="分享">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="åäº«">
          <path d={svgPaths.p300e4c00} id="Vector" stroke="var(--stroke-0, #ABABAB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function Component31() {
  return (
    <div className="bg-[#141414] content-stretch flex gap-[4px] items-center justify-center p-[10px] relative shrink-0 w-[125px]" data-name="按鈕/貼文互動">
      <Component32 />
      <p className="font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[20px] relative shrink-0 text-[#ababab] text-[14px]" style={{ fontVariationSettings: "\'wght\' 400" }}>
        分享
      </p>
    </div>
  );
}

function Component26() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="卡片/貼文互動">
      <Component27 />
      <Component29 />
      <Component31 />
      <div className="-translate-x-1/2 absolute bg-[#2f2f2f] h-px left-1/2 top-0 w-[343px]" data-name="分隔線" />
    </div>
  );
}

function Component6() {
  return (
    <div className="absolute bg-[#141414] content-stretch flex flex-col items-start left-0 pt-[16px] top-[88px]" data-name="卡片/貼文">
      <Component7 />
      <Component13 />
      <Component20 />
      <Component26 />
    </div>
  );
}

function Component36() {
  return (
    <div className="bg-[#ababab] relative rounded-[20px] shrink-0 size-[40px]" data-name="用戶頭像">
      <div className="absolute left-0 size-[40px] top-0" data-name="image 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
    </div>
  );
}

function Component38() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="附加資訊">
      <p className="font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[16px] relative shrink-0 text-[#ababab] text-[12px]" style={{ fontVariationSettings: "\'wght\' 400" }}>
        1小時前
      </p>
    </div>
  );
}

function Component37() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="用戶名稱">
      <p className="font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[20px] relative shrink-0 text-[14px] text-white" style={{ fontVariationSettings: "\'wght\' 400" }}>
        用戶名稱
      </p>
      <Component38 />
    </div>
  );
}

function Component35() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[6px] items-start min-h-px min-w-px relative" data-name="用戶資訊">
      <Component36 />
      <Component37 />
    </div>
  );
}

function Component39() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="更多">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="æ´å¤">
          <circle cx="5" cy="12" fill="var(--fill-0, white)" id="Ellipse" r="2" />
          <circle cx="12" cy="12" fill="var(--fill-0, white)" id="Ellipse_2" r="2" />
          <circle cx="19" cy="12" fill="var(--fill-0, white)" id="Ellipse_3" r="2" />
        </g>
      </svg>
    </div>
  );
}

function Component34() {
  return (
    <div className="bg-[#141414] content-stretch flex gap-[8px] items-start px-[16px] relative shrink-0 w-[375px]" data-name="卡片/用戶資訊">
      <Component35 />
      <Component39 />
    </div>
  );
}

function Component43() {
  return (
    <div className="h-[22px] relative shrink-0 w-[33px]" data-name="圖表/走勢圖/股票標籤/漲">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 22">
        <g id="åè¡¨/èµ°å¢å/è¡ç¥¨æ¨ç±¤/æ¼²">
          <path d={svgPaths.p2c8695a0} id="Vector" stroke="var(--stroke-0, #F84444)" strokeLinecap="round" />
          <path d="M1 21H33V22H0V0H1V21Z" fill="var(--fill-0, #2F2F2F)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Component42() {
  return (
    <div className="bg-[#212121] content-stretch flex gap-[8px] items-start p-[8px] relative rounded-[4px] shrink-0" data-name="標籤/貼文股票標籤">
      <Component43 />
      <p className="font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[24px] relative shrink-0 text-[16px] text-white" style={{ fontVariationSettings: "\'wght\' 400" }}>
        台積電
      </p>
    </div>
  );
}

function Component45() {
  return (
    <div className="h-[22px] relative shrink-0 w-[33px]" data-name="圖表/走勢圖/股票標籤/跌">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 22">
        <g id="åè¡¨/èµ°å¢å/è¡ç¥¨æ¨ç±¤/è·">
          <path d={svgPaths.p25bf4ac0} id="Vector" stroke="var(--stroke-0, #47AB75)" strokeLinecap="round" />
          <path d="M1 21H33V22H0V0H1V21Z" fill="var(--fill-0, #2F2F2F)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Component44() {
  return (
    <div className="bg-[#212121] content-stretch flex gap-[8px] items-start p-[8px] relative rounded-[4px] shrink-0" data-name="標籤/貼文股票標籤">
      <Component45 />
      <p className="font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[24px] relative shrink-0 text-[16px] text-white" style={{ fontVariationSettings: "\'wght\' 400" }}>
        鴻海
      </p>
    </div>
  );
}

function Component41() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="標籤/貼文股票標籤組">
      <Component42 />
      <Component44 />
    </div>
  );
}

function Component46() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="內容">
      <p className="font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[28px] relative shrink-0 text-[18px] text-white w-[343px] whitespace-pre-wrap" style={{ fontVariationSettings: "\'wght\' 400" }}>
        從過往的經驗，台積電一旦完成填息後，股價上攻的動能相當強勁。對於散戶來說，填息時間可作為良好的布局時機，把握時機投入資金，未來台積電的股價只有
      </p>
      <p className="absolute bottom-[26px] font-['Acme:Regular','Noto_Sans:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[24px] right-[88px] text-[#ffb13b] text-[16px] translate-x-full translate-y-full" style={{ fontVariationSettings: "\'CTGR\' 0, \'wdth\' 100, \'wght\' 400" }}>
        …繼續閱讀
      </p>
    </div>
  );
}

function Component40() {
  return (
    <div className="bg-[#141414] content-stretch flex flex-col gap-[8px] items-start px-[16px] py-[12px] relative shrink-0" data-name="卡片/貼文內容">
      <Component41 />
      <Component46 />
    </div>
  );
}

function Component50() {
  return (
    <div className="mr-[-4px] relative shrink-0 size-[18px] z-[3]" data-name="圖標/表情符號">
      <div className="absolute inset-[-11.11%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
          <g id="åæ¨/è¡¨æç¬¦è">
            <rect height="20" rx="10" stroke="var(--stroke-0, #141414)" strokeWidth="2" width="20" x="1" y="1" />
            <path d={svgPaths.p36d6e800} fill="url(#paint0_radial_302_4170)" id="Oval" />
            <path d={svgPaths.p1cfb2500} fill="var(--fill-0, white)" id="Path" />
            <path d={svgPaths.p1eb85080} fill="var(--fill-0, white)" id="Path_2" />
          </g>
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="translate(11.3951 4.178) scale(15.8449)" gradientUnits="userSpaceOnUse" id="paint0_radial_302_4170" r="1">
              <stop stopColor="#DC3A3F" />
              <stop offset="1" stopColor="#80171A" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Component51() {
  return (
    <div className="mr-[-4px] relative shrink-0 size-[18px] z-[2]" data-name="圖標/表情符號">
      <div className="absolute inset-[-11.11%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
          <g id="åæ¨/è¡¨æç¬¦è">
            <rect height="20" rx="10" stroke="var(--stroke-0, #141414)" strokeWidth="2" width="20" x="1" y="1" />
            <path d={svgPaths.p21639300} fill="var(--fill-0, #FED132)" id="Body 1" />
            <g id="Group">
              <path d={svgPaths.p35388d80} fill="var(--fill-0, #802D21)" id="Vector" />
              <path d={svgPaths.p165ac000} fill="var(--fill-0, white)" id="Vector_2" />
              <path d={svgPaths.p245bd000} fill="var(--fill-0, #F55151)" id="Vector_3" />
            </g>
            <g id="Group_2">
              <path d={svgPaths.p2465bf00} fill="var(--fill-0, #802D21)" id="Vector_4" />
              <path d={svgPaths.p2ec698f0} fill="var(--fill-0, #802D21)" id="Vector_5" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function Body1() {
  return (
    <div className="absolute inset-[0_-0.1%_0_0.1%]" data-name="Body">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Body">
          <path d={svgPaths.p2402cd80} fill="var(--fill-0, #FED132)" id="Body_2" />
          <path d={svgPaths.p31d8af80} fill="var(--fill-0, #28BEEF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Eye2() {
  return (
    <div className="absolute inset-[20.83%_53.23%_45.83%_16.77%]" data-name="Eye 2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.4 5.99999">
        <g id="Eye 2">
          <path d={svgPaths.pf3d6200} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p3ba9ed00} fill="var(--fill-0, #170F02)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Eye3() {
  return (
    <div className="absolute inset-[20.83%_16.53%_45.83%_53.47%]" data-name="Eye 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.40001 5.99999">
        <g id="Eye 1">
          <path d={svgPaths.p21ab7700} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p12ea3000} fill="var(--fill-0, #170F02)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Eyes1() {
  return (
    <div className="absolute contents inset-[20.83%_16.54%_45.83%_16.77%]" data-name="Eyes">
      <Eye2 />
      <Eye3 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[54.07%_38.58%_15.99%_38.84%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.06451 5.3895">
        <g id="Group">
          <path d={svgPaths.p6aaa300} fill="var(--fill-0, #802D21)" id="Vector" />
          <path d={svgPaths.p26a00a80} fill="var(--fill-0, #F55151)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Face1() {
  return (
    <div className="absolute contents inset-[20.83%_16.54%_15.99%_16.77%]" data-name="Face">
      <Eyes1 />
      <Group1 />
    </div>
  );
}

function Component52() {
  return (
    <div className="mr-[-4px] relative rounded-[9px] shrink-0 size-[22px] z-[1]" data-name="圖標/表情符號">
      <div aria-hidden="true" className="absolute border-2 border-[#141414] border-solid inset-0 pointer-events-none rounded-[11px]" />
      <div className="bg-clip-padding border-2 border-[transparent] border-solid relative size-full">
        <Body1 />
        <Face1 />
      </div>
    </div>
  );
}

function Component49() {
  return (
    <div className="content-stretch flex isolate items-start pr-[4px] relative shrink-0" data-name="表情數量">
      <Component50 />
      <Component51 />
      <Component52 />
    </div>
  );
}

function Component48() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="表情數量">
      <Component49 />
      <p className="font-['Acme:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#ababab] text-[16px]">999</p>
    </div>
  );
}

function Component47() {
  return (
    <div className="bg-[#141414] content-stretch flex items-center justify-between px-[16px] py-[12px] relative shrink-0 w-[375px]" data-name="卡片/貼文互動資訊">
      <Component48 />
      <div className="flex flex-col font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] h-full justify-center leading-[0] relative shrink-0 text-[#ababab] text-[16px] text-right w-[68px]" style={{ fontVariationSettings: "\'wght\' 400" }}>
        <p className="leading-[24px] whitespace-pre-wrap">38則留言</p>
      </div>
    </div>
  );
}

function Component55() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="按讚">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="æè®">
          <path d={svgPaths.p2b048ac0} id="Path" stroke="var(--stroke-0, #ABABAB)" strokeWidth="1.6" />
          <path d={svgPaths.p12b66d00} id="Path_2" stroke="var(--stroke-0, #ABABAB)" strokeLinejoin="round" strokeWidth="1.60125" />
        </g>
      </svg>
    </div>
  );
}

function Component54() {
  return (
    <div className="bg-[#141414] content-stretch flex gap-[4px] items-center justify-center p-[10px] relative shrink-0 w-[125px]" data-name="按鈕/貼文互動">
      <Component55 />
      <p className="font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[20px] relative shrink-0 text-[#ababab] text-[14px]" style={{ fontVariationSettings: "\'wght\' 400" }}>
        讚
      </p>
    </div>
  );
}

function Component57() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="留言">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="çè¨">
          <path d={svgPaths.p3b336900} id="Vector" stroke="var(--stroke-0, #ABABAB)" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function Component56() {
  return (
    <div className="bg-[#141414] content-stretch flex gap-[4px] items-center justify-center p-[10px] relative shrink-0 w-[125px]" data-name="按鈕/貼文互動">
      <Component57 />
      <p className="font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[20px] relative shrink-0 text-[#ababab] text-[14px]" style={{ fontVariationSettings: "\'wght\' 400" }}>
        留言
      </p>
    </div>
  );
}

function Component59() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="分享">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="åäº«">
          <path d={svgPaths.p300e4c00} id="Vector" stroke="var(--stroke-0, #ABABAB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function Component58() {
  return (
    <div className="bg-[#141414] content-stretch flex gap-[4px] items-center justify-center p-[10px] relative shrink-0 w-[125px]" data-name="按鈕/貼文互動">
      <Component59 />
      <p className="font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[20px] relative shrink-0 text-[#ababab] text-[14px]" style={{ fontVariationSettings: "\'wght\' 400" }}>
        分享
      </p>
    </div>
  );
}

function Component53() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="卡片/貼文互動">
      <Component54 />
      <Component56 />
      <Component58 />
      <div className="-translate-x-1/2 absolute bg-[#2f2f2f] h-px left-1/2 top-0 w-[343px]" data-name="分隔線" />
    </div>
  );
}

function Component33() {
  return (
    <div className="absolute bg-[#141414] content-stretch flex flex-col items-start left-0 pt-[16px] top-[426px]" data-name="卡片/貼文">
      <Component34 />
      <Component40 />
      <Component47 />
      <Component53 />
    </div>
  );
}

function Component60() {
  return (
    <div className="absolute h-[8px] left-0 top-[418px] w-[375px]" data-name="分隔線/貼文分隔">
      <div className="absolute bg-[#212121] inset-0" data-name="分隔線/貼文分隔" />
    </div>
  );
}

function Component63() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="頁籤列/選股/未選中">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="é ç±¤å/é¸è¡/æªé¸ä¸­">
          <path d="M7 17L4 20" id="Vector" stroke="var(--stroke-0, #ABABAB)" strokeLinecap="round" strokeWidth="1.6" />
          <circle cx="12.5" cy="11.5" id="Ellipse" r="7.7" stroke="var(--stroke-0, #ABABAB)" strokeWidth="1.6" />
          <path d={svgPaths.p6c6b880} id="Vector_2" stroke="var(--stroke-0, #ABABAB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function Component62() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] h-full items-center justify-center min-h-px min-w-px relative" data-name="頁籤">
      <Component63 />
      <p className="font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[14px] relative shrink-0 text-[#ababab] text-[10px] text-center" style={{ fontVariationSettings: "\'wght\' 400" }}>
        選股
      </p>
    </div>
  );
}

function Component65() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="頁籤列/自選股/未選中">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="é ç±¤å/èªé¸è¡/æªé¸ä¸­">
          <path d={svgPaths.p39185000} id="Vector" stroke="var(--stroke-0, #ABABAB)" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function Component64() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] h-full items-center justify-center min-h-px min-w-px relative" data-name="頁籤">
      <Component65 />
      <p className="font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[14px] relative shrink-0 text-[#ababab] text-[10px] text-center" style={{ fontVariationSettings: "\'wght\' 400" }}>
        自選股
      </p>
    </div>
  );
}

function Component67() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="頁籤列/社團/選中">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_302_4073)" id="é ç±¤å/ç¤¾å/é¸ä¸­">
          <g filter="url(#filter0_d_302_4073)" id="Vector 197">
            <path d={svgPaths.p33df5480} fill="url(#paint0_linear_302_4073)" />
          </g>
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="22.7801" id="filter0_d_302_4073" width="27.3514" x="-1.67571" y="0.966176">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.694118 0 0 0 0 0.231373 0 0 0 0.65 0" />
            <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_302_4073" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow_302_4073" mode="normal" result="shape" />
          </filter>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_302_4073" x1="12" x2="19.1298" y1="4" y2="15.6284">
            <stop stopColor="#FFC737" />
            <stop offset="1" stopColor="#FCA729" />
          </linearGradient>
          <clipPath id="clip0_302_4073">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Component66() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] h-full items-center justify-center min-h-px min-w-px relative" data-name="頁籤">
      <Component67 />
      <p className="font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[14px] relative shrink-0 text-[#ffb13b] text-[10px] text-center" style={{ fontVariationSettings: "\'wght\' 400" }}>
        社團
      </p>
    </div>
  );
}

function Component69() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="頁籤列/內容專區/未選中">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="é ç±¤å/å§å®¹å°å/æªé¸ä¸­">
          <path d={svgPaths.p3266f900} fill="var(--fill-0, #ABABAB)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Component68() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] h-full items-center justify-center min-h-px min-w-px relative" data-name="頁籤">
      <Component69 />
      <p className="font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[14px] relative shrink-0 text-[#ababab] text-[10px] text-center" style={{ fontVariationSettings: "\'wght\' 400" }}>
        內容專區
      </p>
    </div>
  );
}

function Component71() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="頁籤列/更多/未選中">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="é ç±¤å/æ´å¤/æªé¸ä¸­">
          <path d={svgPaths.p395ac180} fill="var(--fill-0, #ABABAB)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Component70() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] h-full items-center justify-center min-h-px min-w-px relative" data-name="頁籤">
      <Component71 />
      <p className="font-['Acme:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[14px] relative shrink-0 text-[#ababab] text-[10px] text-center" style={{ fontVariationSettings: "\'wght\' 400" }}>
        更多
      </p>
    </div>
  );
}

function Component61() {
  return (
    <div className="absolute bg-[#212121] content-stretch flex h-[50px] items-start left-0 top-[732px] w-[375px]" data-name="頁籤列">
      <Component62 />
      <Component64 />
      <Component66 />
      <Component68 />
      <Component70 />
    </div>
  );
}

export default function Vip() {
  return (
    <div className="bg-[#141414] relative size-full" data-name="社團/VIP社團/貼文更多">
      <Asset />
      <Component />
      <Component72 />
      <Component5 />
      <Component73 />
      <Component6 />
      <Component33 />
      <Component60 />
      <Component61 />
    </div>
  );
}