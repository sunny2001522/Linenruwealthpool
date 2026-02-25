import svgPaths from "./svg-rayrm2prny";
import imgImage from "figma:asset/d20ba1880b93234408a79ed7a95dd69f77384350.png";
import imgHomePage from "figma:asset/481bd66216aed098ddf5065664bd1aa8a65f2aac.png";
import imgHomePage1 from "figma:asset/453b5cbdadb7f3040eee3fdfe4737f36d805c5ef.png";
import imgImageWithFallback from "figma:asset/c69c2ea99c76f347c5d5aa9866acdd854ca87cc2.png";
import imgImageWithFallback1 from "figma:asset/64246edcfe064938a0efe3062b3148a53977d42e.png";
import imgImageWithFallback2 from "figma:asset/f80e0c429e776836cdc8839276a7550a8d448592.png";
import imgImageWithFallback3 from "figma:asset/caf01e3833451d66d08d2a38006fbbc2683ce204.png";
import imgImageWithFallback4 from "figma:asset/1e309324f8ffe20e94e6ff889dd15a15b1f04b0c.png";
import imgImageWithFallback5 from "figma:asset/974d6c944ca3b124b1d25e4123ba24c215550467.png";
import imgImageWithFallback6 from "figma:asset/4ff1dda7351285b136fd96bf0e52f468d7c05ebb.png";

function Image() {
  return (
    <div className="h-[111.99px] relative shrink-0 w-[85.354px]" data-name="Image (長線聚寶盆)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[35.995px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute bg-clip-text font-['Tinos:Bold','Noto_Sans_JP:Bold',sans-serif] leading-[36px] left-0 text-[30px] text-[rgba(0,0,0,0)] top-[-0.35px]" style={{ fontVariationSettings: "\'wght\' 700", backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(rgb(229, 193, 0) 0%, rgb(212, 175, 55) 50%, rgb(184, 134, 11) 100%)", WebkitTextFillColor: "transparent" }}>
        長線聚寶盆
      </p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[19.995px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#999] text-[14px] top-[0.31px] tracking-[-0.1504px]">選股可以更快、更好、更簡單</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[87.97px] relative shrink-0 w-[182.009px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7.99px] items-start relative size-full">
        <Heading />
        <Paragraph />
      </div>
    </div>
  );
}

function HomePage1() {
  return (
    <div className="h-[139.996px] relative shrink-0 w-[393.647px]" data-name="HomePage" style={{ backgroundImage: "linear-gradient(160.423deg, rgb(10, 10, 10) 0%, rgb(10, 10, 10) 50%, rgba(74, 144, 226, 0.05) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-end justify-between px-[31.571px] relative size-full">
        <Image />
        <Container1 />
      </div>
    </div>
  );
}

function HomePage2() {
  return (
    <div className="h-[139.996px] relative shrink-0 w-[393.647px]" data-name="HomePage">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHomePage} />
    </div>
  );
}

function HomePage3() {
  return (
    <div className="h-[139.996px] relative shrink-0 w-[393.647px]" data-name="HomePage">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHomePage1} />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex h-[139.996px] items-start left-[-787.29px] top-0 w-[393.647px]" data-name="Container">
      <HomePage1 />
      <HomePage2 />
      <HomePage3 />
    </div>
  );
}

function Button() {
  return <div className="bg-white opacity-40 rounded-[21941200px] shrink-0 size-[7.99px]" data-name="Button" />;
}

function Button1() {
  return <div className="bg-white opacity-40 rounded-[21941200px] shrink-0 size-[7.99px]" data-name="Button" />;
}

function Button2() {
  return <div className="bg-white rounded-[21941200px] shrink-0 size-[9.987px]" data-name="Button" />;
}

function Container2() {
  return (
    <div className="absolute content-stretch flex gap-[7.99px] h-[7.99px] items-start justify-center left-0 pl-[0.999px] pt-[-0.999px] top-[124.02px] w-[393.647px]" data-name="Container">
      <Button />
      <Button1 />
      <Button2 />
    </div>
  );
}

function Carousel() {
  return (
    <div className="h-[139.996px] overflow-clip relative shrink-0 w-full" data-name="Carousel">
      <Container />
      <Container2 />
    </div>
  );
}

function Section() {
  return (
    <div className="h-[139.996px] relative shrink-0 w-full" data-name="Section" style={{ backgroundImage: "linear-gradient(160.423deg, rgb(10, 10, 10) 0%, rgb(10, 10, 10) 50%, rgba(74, 144, 226, 0.05) 100%)" }}>
      <div className="content-stretch flex flex-col items-start overflow-clip pb-[0.654px] relative rounded-[inherit] size-full">
        <Carousel />
      </div>
      <div aria-hidden="true" className="absolute border-b-[0.654px] border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[27.995px] relative shrink-0 w-[107.975px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[18px] text-white top-[-0.38px] tracking-[-0.4395px]">熱門焦點股票</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[60px] size-[15.99px] top-[2px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9899 15.9899">
        <g id="Icon">
          <path d={svgPaths.p15a59a80} id="Vector" stroke="var(--stroke-0, #4A90E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33249" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[19.995px] relative shrink-0 w-[75.985px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_SC:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[20px] left-[28px] not-italic text-[#4a90e2] text-[14px] text-center top-[0.31px] tracking-[-0.1504px]">查看更多</p>
        <Icon />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[27.995px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[15.99px] relative size-full">
          <Heading1 />
          <Button3 />
        </div>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[14.999px] left-[13.53px] top-[20.5px] w-[4.925px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[#d4af37] text-[10px] top-[0.31px] tracking-[0.1172px]">1</p>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[0_0_4.89%_0]" data-name="Group">
      <div className="absolute inset-[0_0_4.89%_0]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.995 26.6248">
          <path d={svgPaths.p23bb9600} fill="var(--fill-0, #F5E0A4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[37.84%] left-0 right-1/2 top-[36.33%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9975 7.23142">
          <path d={svgPaths.p2abd6580} fill="url(#paint0_linear_304_852)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_304_852" x1="-1.38364e-07" x2="13.5601" y1="0.080678" y2="4.4549">
              <stop stopColor="#EFD78F" />
              <stop offset="1" stopColor="#C8923B" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-[4.9%] left-[19.1%] right-1/2 top-[52.57%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.65184 11.9063">
          <path d={svgPaths.p16370a70} fill="url(#paint0_linear_304_854)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_304_854" x1="4.2776" x2="8.65182" y1="6.71075" y2="4.08622">
              <stop stopColor="#EFD78F" />
              <stop offset="1" stopColor="#B37D30" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-[4.89%] left-1/2 right-[19.1%] top-[52.57%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.65094 11.907">
          <path d={svgPaths.p30d7b0c0} fill="url(#paint0_linear_304_824)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_304_824" x1="-0.437439" x2="3.49934" y1="8.02302" y2="3.6488">
              <stop offset="0.269179" stopColor="#F5E4A9" />
              <stop offset="0.828457" stopColor="#CBA65D" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-[37.84%] left-1/2 right-0 top-[36.33%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9975 7.23142">
          <path d={svgPaths.p24d11900} fill="url(#paint0_linear_304_856)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_304_856" x1="7.73413" x2="3.88621" y1="2.46223" y2="5.81104">
              <stop stopColor="#EFD78F" />
              <stop offset="1" stopColor="#B37D30" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-[47.43%] left-1/2 right-[31.77%] top-0" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.10398 14.7178">
          <path d={svgPaths.p1b4c6100} fill="url(#paint0_linear_304_850)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_304_850" x1="2.18709" x2="1.74967" y1="5.68129" y2="13.5549">
              <stop stopColor="#EFD78F" />
              <stop offset="1" stopColor="#B37D30" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-[47.43%] left-[31.76%] right-1/2 top-0" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.1051 14.7178">
          <path d={svgPaths.p26ebd070} fill="url(#paint0_linear_304_870)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_304_870" x1="1.1683" x2="4.66768" y1="10.9304" y2="4.36904">
              <stop stopColor="#EFD78F" />
              <stop offset="1" stopColor="#C8923B" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[27.995px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Group />
    </div>
  );
}

function StarIcon2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[1.99px] size-[27.995px] top-[-3.5px]" data-name="StarIcon3">
      <Icon1 />
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 size-[31.99px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text />
        <StarIcon2 />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[31.714px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[16px] text-white top-[-1.04px] tracking-[-0.3125px]">685</p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[19.995px] relative shrink-0 w-[90.565px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#fb2c36] text-[14px] top-[0.31px] tracking-[-0.1504px] w-[91px] whitespace-pre-wrap">+15 (+2.24%)</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[24px] relative shrink-0 w-[130.269px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.99px] items-center relative size-full">
        <Text1 />
        <Text2 />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[14.999px] relative shrink-0 w-[25.921px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[#999] text-[10px] top-[0.31px] tracking-[0.1172px]">2330</p>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="flex-[1_0_0] h-[19.494px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_JP:Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[13px] text-white top-[0.96px] tracking-[-0.0762px]">台積電</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[19.494px] relative shrink-0 w-[70.917px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[5.997px] items-center relative size-full">
        <Text3 />
        <Text4 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[47.479px] relative shrink-0 w-[130.269px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.985px] items-start justify-center relative size-full">
        <Container9 />
        <Container10 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[47.479px] relative shrink-0 w-[174.254px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.995px] items-center relative size-full">
        <Container7 />
        <Container8 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[19.995px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.995 19.995">
        <g clipPath="url(#clip0_304_882)" id="Icon">
          <path d={svgPaths.p37973a0} id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66625" />
          <path d={svgPaths.p240b3f48} id="Vector_2" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66625" />
        </g>
        <defs>
          <clipPath id="clip0_304_882">
            <rect fill="white" height="19.995" width="19.995" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[#1a1a1a] h-[72.777px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.654px] border-[rgba(74,144,226,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12.649px] py-[0.654px] relative size-full">
          <Container6 />
          <Icon2 />
        </div>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute h-[14.999px] left-[12.85px] top-[20.5px] w-[6.284px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[#f5e0a4] text-[10px] top-[0.31px] tracking-[0.1172px]">2</p>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-[0_0_4.89%_0]" data-name="Group">
      <div className="absolute inset-[0_0_4.89%_0] mix-blend-color" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.995 26.6248">
          <g id="Vector" style={{ mixBlendMode: "color" }}>
            <path d={svgPaths.p23bb9600} fill="var(--fill-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[0_0_4.89%_0]" data-name="Group">
      <div className="absolute inset-[0_0_4.89%_0]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.995 26.6248">
          <path d={svgPaths.p23bb9600} fill="var(--fill-0, #F5E0A4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[37.84%] left-0 right-1/2 top-[36.33%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9975 7.23142">
          <path d={svgPaths.p2abd6580} fill="url(#paint0_linear_304_852)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_304_852" x1="-1.38364e-07" x2="13.5601" y1="0.080678" y2="4.4549">
              <stop stopColor="#EFD78F" />
              <stop offset="1" stopColor="#C8923B" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-[4.9%] left-[19.1%] right-1/2 top-[52.57%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.65184 11.9063">
          <path d={svgPaths.p16370a70} fill="url(#paint0_linear_304_854)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_304_854" x1="4.2776" x2="8.65182" y1="6.71075" y2="4.08622">
              <stop stopColor="#EFD78F" />
              <stop offset="1" stopColor="#B37D30" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-[4.89%] left-1/2 right-[19.1%] top-[52.57%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.65094 11.907">
          <path d={svgPaths.p30d7b0c0} fill="url(#paint0_linear_304_824)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_304_824" x1="-0.437439" x2="3.49934" y1="8.02302" y2="3.6488">
              <stop offset="0.269179" stopColor="#F5E4A9" />
              <stop offset="0.828457" stopColor="#CBA65D" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-[37.84%] left-1/2 right-0 top-[36.33%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9975 7.23142">
          <path d={svgPaths.p24d11900} fill="url(#paint0_linear_304_856)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_304_856" x1="7.73413" x2="3.88621" y1="2.46223" y2="5.81104">
              <stop stopColor="#EFD78F" />
              <stop offset="1" stopColor="#B37D30" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-[47.43%] left-1/2 right-[31.77%] top-0" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.10398 14.7178">
          <path d={svgPaths.p1b4c6100} fill="url(#paint0_linear_304_850)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_304_850" x1="2.18709" x2="1.74967" y1="5.68129" y2="13.5549">
              <stop stopColor="#EFD78F" />
              <stop offset="1" stopColor="#B37D30" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-[47.43%] left-[31.76%] right-1/2 top-0" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.1051 14.7178">
          <path d={svgPaths.p26ebd070} fill="url(#paint0_linear_304_870)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_304_870" x1="1.1683" x2="4.66768" y1="10.9304" y2="4.36904">
              <stop stopColor="#EFD78F" />
              <stop offset="1" stopColor="#C8923B" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <Group2 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[27.995px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Group1 />
    </div>
  );
}

function StarIcon() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[1.99px] size-[27.995px] top-[-3.5px]" data-name="StarIcon1">
      <Icon3 />
    </div>
  );
}

function Container13() {
  return (
    <div className="relative shrink-0 size-[31.99px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text5 />
        <StarIcon />
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[24px] relative shrink-0 w-[38.713px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[16px] text-white top-[-1.04px] tracking-[-0.3125px]">1245</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="flex-[1_0_0] h-[19.995px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#fb2c36] text-[14px] top-[0.31px] tracking-[-0.1504px] w-[94px] whitespace-pre-wrap">+35 (+2.89%)</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[24px] relative shrink-0 w-[139.873px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.99px] items-center relative size-full">
        <Text6 />
        <Text7 />
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[14.999px] relative shrink-0 w-[26.013px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[#999] text-[10px] top-[0.31px] tracking-[0.1172px]">2454</p>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[19.494px] relative shrink-0 w-[38.999px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_JP:Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[13px] text-white top-[0.96px] tracking-[-0.0762px]">聯發科</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[19.494px] relative shrink-0 w-[71.009px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[5.997px] items-center relative size-full">
        <Text8 />
        <Text9 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[47.479px] relative shrink-0 w-[139.873px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.985px] items-start justify-center relative size-full">
        <Container15 />
        <Container16 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[47.479px] relative shrink-0 w-[183.858px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.995px] items-center relative size-full">
        <Container13 />
        <Container14 />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[19.995px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.995 19.995">
        <g clipPath="url(#clip0_304_882)" id="Icon">
          <path d={svgPaths.p37973a0} id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66625" />
          <path d={svgPaths.p240b3f48} id="Vector_2" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66625" />
        </g>
        <defs>
          <clipPath id="clip0_304_882">
            <rect fill="white" height="19.995" width="19.995" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-[#1a1a1a] h-[72.777px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.654px] border-[rgba(74,144,226,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12.649px] py-[0.654px] relative size-full">
          <Container12 />
          <Icon4 />
        </div>
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute h-[14.999px] left-[12.73px] top-[20.5px] w-[6.529px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[#8b4513] text-[10px] top-[0.31px] tracking-[0.1172px]">3</p>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents inset-[0_0_4.89%_0]" data-name="Group">
      <div className="absolute inset-[0_0_4.89%_0] mix-blend-color" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.995 26.6248">
          <g id="Vector" style={{ mixBlendMode: "color" }}>
            <path d={svgPaths.p23bb9600} fill="var(--fill-0, #742C05)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[0_0_4.89%_0]" data-name="Group">
      <div className="absolute inset-[0_0_4.89%_0]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.995 26.6248">
          <path d={svgPaths.p23bb9600} fill="var(--fill-0, #F5E0A4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[37.84%] left-0 right-1/2 top-[36.33%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9975 7.23142">
          <path d={svgPaths.p2abd6580} fill="url(#paint0_linear_304_852)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_304_852" x1="-1.38364e-07" x2="13.5601" y1="0.080678" y2="4.4549">
              <stop stopColor="#EFD78F" />
              <stop offset="1" stopColor="#C8923B" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-[4.9%] left-[19.1%] right-1/2 top-[52.57%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.65184 11.9063">
          <path d={svgPaths.p16370a70} fill="url(#paint0_linear_304_854)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_304_854" x1="4.2776" x2="8.65182" y1="6.71075" y2="4.08622">
              <stop stopColor="#EFD78F" />
              <stop offset="1" stopColor="#B37D30" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-[4.89%] left-1/2 right-[19.1%] top-[52.57%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.65094 11.907">
          <path d={svgPaths.p30d7b0c0} fill="url(#paint0_linear_304_824)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_304_824" x1="-0.437439" x2="3.49934" y1="8.02302" y2="3.6488">
              <stop offset="0.269179" stopColor="#F5E4A9" />
              <stop offset="0.828457" stopColor="#CBA65D" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-[37.84%] left-1/2 right-0 top-[36.33%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9975 7.23142">
          <path d={svgPaths.p24d11900} fill="url(#paint0_linear_304_856)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_304_856" x1="7.73413" x2="3.88621" y1="2.46223" y2="5.81104">
              <stop stopColor="#EFD78F" />
              <stop offset="1" stopColor="#B37D30" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-[47.43%] left-1/2 right-[31.77%] top-0" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.10398 14.7178">
          <path d={svgPaths.p1b4c6100} fill="url(#paint0_linear_304_850)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_304_850" x1="2.18709" x2="1.74967" y1="5.68129" y2="13.5549">
              <stop stopColor="#EFD78F" />
              <stop offset="1" stopColor="#B37D30" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-[47.43%] left-[31.76%] right-1/2 top-0" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.1051 14.7178">
          <path d={svgPaths.p26ebd070} fill="url(#paint0_linear_304_870)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_304_870" x1="1.1683" x2="4.66768" y1="10.9304" y2="4.36904">
              <stop stopColor="#EFD78F" />
              <stop offset="1" stopColor="#C8923B" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <Group4 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="h-[27.995px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Group3 />
    </div>
  );
}

function StarIcon1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[1.99px] size-[27.995px] top-[-3.5px]" data-name="StarIcon2">
      <Icon5 />
    </div>
  );
}

function Container19() {
  return (
    <div className="relative shrink-0 size-[31.99px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text10 />
        <StarIcon1 />
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[24px] relative shrink-0 w-[45.824px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[16px] text-white top-[-1.04px] tracking-[-0.3125px]">298.5</p>
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="flex-[1_0_0] h-[19.995px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#fb2c36] text-[14px] top-[0.31px] tracking-[-0.1504px] w-[103px] whitespace-pre-wrap">+12.5 (+4.37%)</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[24px] relative shrink-0 w-[156.098px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.99px] items-center relative size-full">
        <Text11 />
        <Text12 />
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[14.999px] relative shrink-0 w-[25.788px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[#999] text-[10px] top-[0.31px] tracking-[0.1172px]">2382</p>
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[19.494px] relative shrink-0 w-[26.003px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_JP:Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[13px] text-white top-[0.96px] tracking-[-0.0762px]">廣達</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[19.494px] relative shrink-0 w-[57.788px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[5.997px] items-center relative size-full">
        <Text13 />
        <Text14 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[47.479px] relative shrink-0 w-[156.098px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.985px] items-start justify-center relative size-full">
        <Container21 />
        <Container22 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[47.479px] relative shrink-0 w-[200.083px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.995px] items-center relative size-full">
        <Container19 />
        <Container20 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[19.995px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.995 19.995">
        <g clipPath="url(#clip0_304_882)" id="Icon">
          <path d={svgPaths.p37973a0} id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66625" />
          <path d={svgPaths.p240b3f48} id="Vector_2" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66625" />
        </g>
        <defs>
          <clipPath id="clip0_304_882">
            <rect fill="white" height="19.995" width="19.995" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container17() {
  return (
    <div className="bg-[#1a1a1a] h-[72.777px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.654px] border-[rgba(74,144,226,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12.649px] py-[0.654px] relative size-full">
          <Container18 />
          <Icon6 />
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[7.99px] h-[234.31px] items-start relative shrink-0 w-full" data-name="Container">
      <Container5 />
      <Container11 />
      <Container17 />
    </div>
  );
}

function Section1() {
  return (
    <div className="h-[306.934px] relative shrink-0 w-full" data-name="Section">
      <div aria-hidden="true" className="absolute border-[rgba(74,144,226,0.06)] border-b-[0.654px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[11.995px] items-start pb-[0.654px] pt-[15.99px] px-[15.99px] relative size-full">
        <Container3 />
        <Container4 />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[27.995px] relative shrink-0 w-[89.983px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[18px] text-white top-[-0.38px] tracking-[-0.4395px]">領頭羊類股</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-gradient-to-b from-[#e5c100] h-[29.293px] relative rounded-[10px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] shrink-0 to-[#b8860b] via-1/2 via-[#d4af37] w-[51.995px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[20px] left-[25.99px] not-italic text-[14px] text-black text-center top-[4.96px] tracking-[-0.1504px]">當期</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#1a1a1a] h-[29.293px] relative rounded-[10px] shrink-0 w-[53.303px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[0.654px] border-[rgba(74,144,226,0.2)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[20px] left-[26.65px] not-italic text-[#999] text-[14px] text-center top-[4.96px] tracking-[-0.1504px]">前期</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[29.293px] relative shrink-0 w-[113.288px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.99px] items-start relative size-full">
        <Button4 />
        <Button5 />
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex h-[29.293px] items-center justify-between left-[15.99px] top-[15.99px] w-[361.667px]" data-name="Container">
      <Heading2 />
      <Container24 />
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute h-[32px] left-[29.48px] top-0 w-[11.74px]" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[#4a90e2] text-[24px] top-[-0.69px] tracking-[0.0703px]">1</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute content-stretch flex h-[14.989px] items-start left-[11.34px] top-[38px] w-[48px]" data-name="Container">
      <p className="font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.7)] text-center">電子上游</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute content-stretch flex h-[17.492px] items-start left-[14.43px] top-[56.98px] w-[41.829px]" data-name="Container">
      <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[17.5px] not-italic relative shrink-0 text-[#4a90e2] text-[14px] text-center tracking-[-0.1504px]">IC設計</p>
    </div>
  );
}

function Icon7() {
  return (
    <div className="absolute left-[27.35px] size-[15.99px] top-[82.46px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9899 15.9899">
        <g id="Icon">
          <path d={svgPaths.p15a59a80} id="Vector" stroke="var(--stroke-0, #4A90E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33249" />
        </g>
      </svg>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[98.453px] relative shrink-0 w-full" data-name="Container">
      <Container28 />
      <Container29 />
      <Container30 />
      <Icon7 />
    </div>
  );
}

function Container26() {
  return (
    <div className="bg-[#1a1a1a] h-[123.75px] relative rounded-[10px] shrink-0 w-[95.99px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.654px] border-[rgba(74,144,226,0.2)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.654px] pt-[12.649px] px-[12.649px] relative size-full">
        <Container27 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute h-[32px] left-[27.98px] top-0 w-[14.723px]" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[#4a90e2] text-[24px] top-[-0.69px] tracking-[0.0703px]">2</p>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute content-stretch flex h-[14.989px] items-start left-[11.34px] top-[38px] w-[48px]" data-name="Container">
      <p className="font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.7)] text-center">電子中游</p>
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute content-stretch flex h-[17.492px] items-start left-[7.35px] top-[56.98px] w-[56px]" data-name="Container">
      <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[17.5px] not-italic relative shrink-0 text-[#4a90e2] text-[14px] text-center tracking-[-0.1504px]">被動元件</p>
    </div>
  );
}

function Icon8() {
  return (
    <div className="absolute left-[27.35px] size-[15.99px] top-[82.46px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9899 15.9899">
        <g id="Icon">
          <path d={svgPaths.p15a59a80} id="Vector" stroke="var(--stroke-0, #4A90E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33249" />
        </g>
      </svg>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[98.453px] relative shrink-0 w-full" data-name="Container">
      <Container33 />
      <Container34 />
      <Container35 />
      <Icon8 />
    </div>
  );
}

function Container31() {
  return (
    <div className="bg-[#1a1a1a] h-[123.75px] relative rounded-[10px] shrink-0 w-[95.99px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.654px] border-[rgba(74,144,226,0.2)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.654px] pt-[12.649px] px-[12.649px] relative size-full">
        <Container32 />
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute h-[32px] left-[27.67px] top-0 w-[15.356px]" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[#4a90e2] text-[24px] top-[-0.69px] tracking-[0.0703px]">3</p>
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute content-stretch flex h-[14.989px] items-start left-[11.34px] top-[38px] w-[48px]" data-name="Container">
      <p className="font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.7)] text-center">電子上游</p>
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute content-stretch flex h-[17.492px] items-start left-[14.43px] top-[56.98px] w-[41.829px]" data-name="Container">
      <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[17.5px] not-italic relative shrink-0 text-[#4a90e2] text-[14px] text-center tracking-[-0.1504px]">IC通路</p>
    </div>
  );
}

function Icon9() {
  return (
    <div className="absolute left-[27.35px] size-[15.99px] top-[82.46px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9899 15.9899">
        <g id="Icon">
          <path d={svgPaths.p15a59a80} id="Vector" stroke="var(--stroke-0, #4A90E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33249" />
        </g>
      </svg>
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[98.453px] relative shrink-0 w-full" data-name="Container">
      <Container38 />
      <Container39 />
      <Container40 />
      <Icon9 />
    </div>
  );
}

function Container36() {
  return (
    <div className="bg-[#1a1a1a] h-[123.75px] relative rounded-[10px] shrink-0 w-[95.99px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.654px] border-[rgba(74,144,226,0.2)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.654px] pt-[12.649px] px-[12.649px] relative size-full">
        <Container37 />
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute h-[32px] left-[27.45px] top-0 w-[15.786px]" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[#4a90e2] text-[24px] top-[-0.69px] tracking-[0.0703px]">4</p>
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute content-stretch flex h-[14.989px] items-start left-[5.34px] top-[38px] w-[59.995px]" data-name="Container">
      <p className="font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.7)] text-center">電子零組件</p>
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute content-stretch flex h-[17.492px] items-start left-[7.35px] top-[56.98px] w-[56px]" data-name="Container">
      <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[17.5px] not-italic relative shrink-0 text-[#4a90e2] text-[14px] text-center tracking-[-0.1504px]">顯示面板</p>
    </div>
  );
}

function Icon10() {
  return (
    <div className="absolute left-[27.35px] size-[15.99px] top-[82.46px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9899 15.9899">
        <g id="Icon">
          <path d={svgPaths.p15a59a80} id="Vector" stroke="var(--stroke-0, #4A90E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33249" />
        </g>
      </svg>
    </div>
  );
}

function Container42() {
  return (
    <div className="h-[98.453px] relative shrink-0 w-full" data-name="Container">
      <Container43 />
      <Container44 />
      <Container45 />
      <Icon10 />
    </div>
  );
}

function Container41() {
  return (
    <div className="bg-[#1a1a1a] h-[123.75px] relative rounded-[10px] shrink-0 w-[95.99px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.654px] border-[rgba(74,144,226,0.2)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.654px] pt-[12.649px] px-[12.649px] relative size-full">
        <Container42 />
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute h-[32px] left-[27.73px] top-0 w-[15.234px]" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[#4a90e2] text-[24px] top-[-0.69px] tracking-[0.0703px]">5</p>
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute content-stretch flex h-[14.989px] items-start left-[11.34px] top-[38px] w-[48px]" data-name="Container">
      <p className="font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.7)] text-center">電腦週邊</p>
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute content-stretch flex h-[17.492px] items-start left-[7.35px] top-[56.98px] w-[56px]" data-name="Container">
      <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[17.5px] not-italic relative shrink-0 text-[#4a90e2] text-[14px] text-center tracking-[-0.1504px]">電腦系統</p>
    </div>
  );
}

function Icon11() {
  return (
    <div className="absolute left-[27.35px] size-[15.99px] top-[82.46px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9899 15.9899">
        <g id="Icon">
          <path d={svgPaths.p15a59a80} id="Vector" stroke="var(--stroke-0, #4A90E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33249" />
        </g>
      </svg>
    </div>
  );
}

function Container47() {
  return (
    <div className="h-[98.453px] relative shrink-0 w-full" data-name="Container">
      <Container48 />
      <Container49 />
      <Container50 />
      <Icon11 />
    </div>
  );
}

function Container46() {
  return (
    <div className="bg-[#1a1a1a] h-[123.75px] relative rounded-[10px] shrink-0 w-[95.99px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.654px] border-[rgba(74,144,226,0.2)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.654px] pt-[12.649px] px-[12.649px] relative size-full">
        <Container47 />
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="absolute h-[32px] left-[27.41px] top-0 w-[15.857px]" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[#4a90e2] text-[24px] top-[-0.69px] tracking-[0.0703px]">6</p>
    </div>
  );
}

function Container54() {
  return (
    <div className="absolute content-stretch flex h-[14.989px] items-start left-[11.34px] top-[38px] w-[48px]" data-name="Container">
      <p className="font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.7)] text-center">電子上游</p>
    </div>
  );
}

function Container55() {
  return (
    <div className="absolute content-stretch flex h-[17.492px] items-start left-[14.43px] top-[56.98px] w-[41.829px]" data-name="Container">
      <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[17.5px] not-italic relative shrink-0 text-[#4a90e2] text-[14px] text-center tracking-[-0.1504px]">IC製造</p>
    </div>
  );
}

function Icon12() {
  return (
    <div className="absolute left-[27.35px] size-[15.99px] top-[82.46px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9899 15.9899">
        <g id="Icon">
          <path d={svgPaths.p15a59a80} id="Vector" stroke="var(--stroke-0, #4A90E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33249" />
        </g>
      </svg>
    </div>
  );
}

function Container52() {
  return (
    <div className="h-[98.453px] relative shrink-0 w-full" data-name="Container">
      <Container53 />
      <Container54 />
      <Container55 />
      <Icon12 />
    </div>
  );
}

function Container51() {
  return (
    <div className="bg-[#1a1a1a] h-[123.75px] relative rounded-[10px] shrink-0 w-[95.99px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.654px] border-[rgba(74,144,226,0.2)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.654px] pt-[12.649px] px-[12.649px] relative size-full">
        <Container52 />
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="absolute h-[32px] left-[28.37px] top-0 w-[13.946px]" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[#4a90e2] text-[24px] top-[-0.69px] tracking-[0.0703px]">7</p>
    </div>
  );
}

function Container59() {
  return (
    <div className="absolute content-stretch flex h-[14.989px] items-start left-[11.34px] top-[38px] w-[48px]" data-name="Container">
      <p className="font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.7)] text-center">電子中游</p>
    </div>
  );
}

function Container60() {
  return (
    <div className="absolute content-stretch flex h-[17.492px] items-start left-[14.34px] top-[56.98px] w-[42.003px]" data-name="Container">
      <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[17.5px] not-italic relative shrink-0 text-[#4a90e2] text-[14px] text-center tracking-[-0.1504px]">連接器</p>
    </div>
  );
}

function Icon13() {
  return (
    <div className="absolute left-[27.35px] size-[15.99px] top-[82.46px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9899 15.9899">
        <g id="Icon">
          <path d={svgPaths.p15a59a80} id="Vector" stroke="var(--stroke-0, #4A90E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33249" />
        </g>
      </svg>
    </div>
  );
}

function Container57() {
  return (
    <div className="h-[98.453px] relative shrink-0 w-full" data-name="Container">
      <Container58 />
      <Container59 />
      <Container60 />
      <Icon13 />
    </div>
  );
}

function Container56() {
  return (
    <div className="bg-[#1a1a1a] h-[123.75px] relative rounded-[10px] shrink-0 w-[95.99px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.654px] border-[rgba(74,144,226,0.2)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.654px] pt-[12.649px] px-[12.649px] relative size-full">
        <Container57 />
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="absolute h-[32px] left-[27.42px] top-0 w-[15.847px]" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[#4a90e2] text-[24px] top-[-0.69px] tracking-[0.0703px]">8</p>
    </div>
  );
}

function Container64() {
  return (
    <div className="absolute content-stretch flex h-[14.989px] items-start left-[11.34px] top-[38px] w-[48px]" data-name="Container">
      <p className="font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.7)] text-center">電子上游</p>
    </div>
  );
}

function Container65() {
  return (
    <div className="absolute content-stretch flex h-[17.492px] items-start left-[14.34px] top-[56.98px] w-[42.003px]" data-name="Container">
      <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[17.5px] not-italic relative shrink-0 text-[#4a90e2] text-[14px] text-center tracking-[-0.1504px]">記憶體</p>
    </div>
  );
}

function Icon14() {
  return (
    <div className="absolute left-[27.35px] size-[15.99px] top-[82.46px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9899 15.9899">
        <g id="Icon">
          <path d={svgPaths.p15a59a80} id="Vector" stroke="var(--stroke-0, #4A90E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33249" />
        </g>
      </svg>
    </div>
  );
}

function Container62() {
  return (
    <div className="h-[98.453px] relative shrink-0 w-full" data-name="Container">
      <Container63 />
      <Container64 />
      <Container65 />
      <Icon14 />
    </div>
  );
}

function Container61() {
  return (
    <div className="bg-[#1a1a1a] h-[123.75px] relative rounded-[10px] shrink-0 w-[95.99px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.654px] border-[rgba(74,144,226,0.2)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.654px] pt-[12.649px] px-[12.649px] relative size-full">
        <Container62 />
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="absolute h-[32px] left-[27.41px] top-0 w-[15.857px]" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[#4a90e2] text-[24px] top-[-0.69px] tracking-[0.0703px]">9</p>
    </div>
  );
}

function Container69() {
  return (
    <div className="absolute content-stretch flex h-[14.989px] items-start left-[11.34px] top-[38px] w-[48px]" data-name="Container">
      <p className="font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.7)] text-center">電子中游</p>
    </div>
  );
}

function Container70() {
  return (
    <div className="absolute content-stretch flex h-[17.492px] items-start left-[7.35px] top-[56.98px] w-[56px]" data-name="Container">
      <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[17.5px] not-italic relative shrink-0 text-[#4a90e2] text-[14px] text-center tracking-[-0.1504px]">光電元件</p>
    </div>
  );
}

function Icon15() {
  return (
    <div className="absolute left-[27.35px] size-[15.99px] top-[82.46px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9899 15.9899">
        <g id="Icon">
          <path d={svgPaths.p15a59a80} id="Vector" stroke="var(--stroke-0, #4A90E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33249" />
        </g>
      </svg>
    </div>
  );
}

function Container67() {
  return (
    <div className="h-[98.453px] relative shrink-0 w-full" data-name="Container">
      <Container68 />
      <Container69 />
      <Container70 />
      <Icon15 />
    </div>
  );
}

function Container66() {
  return (
    <div className="bg-[#1a1a1a] h-[123.75px] relative rounded-[10px] shrink-0 w-[95.99px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.654px] border-[rgba(74,144,226,0.2)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.654px] pt-[12.649px] px-[12.649px] relative size-full">
        <Container67 />
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="absolute h-[32px] left-[21.51px] top-0 w-[27.668px]" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[#4a90e2] text-[24px] top-[-0.69px] tracking-[0.0703px]">10</p>
    </div>
  );
}

function Container74() {
  return (
    <div className="absolute content-stretch flex h-[14.989px] items-start left-[11.34px] top-[38px] w-[48px]" data-name="Container">
      <p className="font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.7)] text-center">電子下游</p>
    </div>
  );
}

function Container75() {
  return (
    <div className="absolute content-stretch flex h-[17.492px] items-start left-[7.35px] top-[56.98px] w-[56px]" data-name="Container">
      <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[17.5px] not-italic relative shrink-0 text-[#4a90e2] text-[14px] text-center tracking-[-0.1504px]">網路通訊</p>
    </div>
  );
}

function Icon16() {
  return (
    <div className="absolute left-[27.35px] size-[15.99px] top-[82.46px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9899 15.9899">
        <g id="Icon">
          <path d={svgPaths.p15a59a80} id="Vector" stroke="var(--stroke-0, #4A90E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33249" />
        </g>
      </svg>
    </div>
  );
}

function Container72() {
  return (
    <div className="h-[98.453px] relative shrink-0 w-full" data-name="Container">
      <Container73 />
      <Container74 />
      <Container75 />
      <Icon16 />
    </div>
  );
}

function Container71() {
  return (
    <div className="bg-[#1a1a1a] h-[123.75px] relative rounded-[10px] shrink-0 w-[95.99px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.654px] border-[rgba(74,144,226,0.2)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.654px] pt-[12.649px] px-[12.649px] relative size-full">
        <Container72 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex gap-[11.995px] h-[131.74px] items-start left-0 overflow-clip pl-[15.99px] top-[57.28px] w-[393.647px]" data-name="Container">
      <Container26 />
      <Container31 />
      <Container36 />
      <Container41 />
      <Container46 />
      <Container51 />
      <Container56 />
      <Container61 />
      <Container66 />
      <Container71 />
    </div>
  );
}

function Section2() {
  return (
    <div className="h-[205.661px] relative shrink-0 w-full" data-name="Section">
      <div aria-hidden="true" className="absolute border-[rgba(74,144,226,0.06)] border-b-[0.654px] border-solid inset-0 pointer-events-none" />
      <Container23 />
      <Container25 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[27.995px] relative shrink-0 w-[89.983px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[18px] text-white top-[-0.38px] tracking-[-0.4395px]">落水狗類股</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-gradient-to-b from-[#e5c100] h-[29.293px] relative rounded-[10px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] shrink-0 to-[#b8860b] via-1/2 via-[#d4af37] w-[51.995px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[20px] left-[25.99px] not-italic text-[14px] text-black text-center top-[4.96px] tracking-[-0.1504px]">當期</p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#1a1a1a] h-[29.293px] relative rounded-[10px] shrink-0 w-[53.303px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[0.654px] border-[rgba(74,144,226,0.2)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[20px] left-[26.65px] not-italic text-[#999] text-[14px] text-center top-[4.96px] tracking-[-0.1504px]">前期</p>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="h-[29.293px] relative shrink-0 w-[113.288px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.99px] items-start relative size-full">
        <Button6 />
        <Button7 />
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="absolute content-stretch flex h-[29.293px] items-center justify-between left-[15.99px] top-[15.99px] w-[361.667px]" data-name="Container">
      <Heading3 />
      <Container77 />
    </div>
  );
}

function Container81() {
  return (
    <div className="absolute h-[32px] left-[29.48px] top-0 w-[11.74px]" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[#4a90e2] text-[24px] top-[-0.69px] tracking-[0.0703px]">1</p>
    </div>
  );
}

function Container82() {
  return (
    <div className="absolute content-stretch flex h-[14.989px] items-start left-[23.35px] top-[38px] w-[24px]" data-name="Container">
      <p className="font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.7)] text-center">傳產</p>
    </div>
  );
}

function Container83() {
  return (
    <div className="absolute content-stretch flex h-[17.492px] items-start left-[7.35px] top-[56.98px] w-[56px]" data-name="Container">
      <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[17.5px] not-italic relative shrink-0 text-[#4a90e2] text-[14px] text-center tracking-[-0.1504px]">塑膠工業</p>
    </div>
  );
}

function Icon17() {
  return (
    <div className="absolute left-[27.35px] size-[15.99px] top-[82.46px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9899 15.9899">
        <g id="Icon">
          <path d={svgPaths.p15a59a80} id="Vector" stroke="var(--stroke-0, #4A90E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33249" />
        </g>
      </svg>
    </div>
  );
}

function Container80() {
  return (
    <div className="h-[98.453px] relative shrink-0 w-full" data-name="Container">
      <Container81 />
      <Container82 />
      <Container83 />
      <Icon17 />
    </div>
  );
}

function Container79() {
  return (
    <div className="bg-[#1a1a1a] h-[123.75px] relative rounded-[10px] shrink-0 w-[95.99px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.654px] border-[rgba(74,144,226,0.2)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.654px] pt-[12.649px] px-[12.649px] relative size-full">
        <Container80 />
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="absolute h-[32px] left-[27.98px] top-0 w-[14.723px]" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[#4a90e2] text-[24px] top-[-0.69px] tracking-[0.0703px]">2</p>
    </div>
  );
}

function Container87() {
  return (
    <div className="absolute content-stretch flex h-[14.989px] items-start left-[23.35px] top-[38px] w-[24px]" data-name="Container">
      <p className="font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.7)] text-center">傳產</p>
    </div>
  );
}

function Container88() {
  return (
    <div className="absolute content-stretch flex h-[17.492px] items-start left-[7.35px] top-[56.98px] w-[56px]" data-name="Container">
      <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[17.5px] not-italic relative shrink-0 text-[#4a90e2] text-[14px] text-center tracking-[-0.1504px]">紡織纖維</p>
    </div>
  );
}

function Icon18() {
  return (
    <div className="absolute left-[27.35px] size-[15.99px] top-[82.46px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9899 15.9899">
        <g id="Icon">
          <path d={svgPaths.p15a59a80} id="Vector" stroke="var(--stroke-0, #4A90E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33249" />
        </g>
      </svg>
    </div>
  );
}

function Container85() {
  return (
    <div className="h-[98.453px] relative shrink-0 w-full" data-name="Container">
      <Container86 />
      <Container87 />
      <Container88 />
      <Icon18 />
    </div>
  );
}

function Container84() {
  return (
    <div className="bg-[#1a1a1a] h-[123.75px] relative rounded-[10px] shrink-0 w-[95.99px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.654px] border-[rgba(74,144,226,0.2)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.654px] pt-[12.649px] px-[12.649px] relative size-full">
        <Container85 />
      </div>
    </div>
  );
}

function Container91() {
  return (
    <div className="absolute h-[32px] left-[27.67px] top-0 w-[15.356px]" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[#4a90e2] text-[24px] top-[-0.69px] tracking-[0.0703px]">3</p>
    </div>
  );
}

function Container92() {
  return (
    <div className="absolute content-stretch flex h-[14.989px] items-start left-[23.35px] top-[38px] w-[24px]" data-name="Container">
      <p className="font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.7)] text-center">金融</p>
    </div>
  );
}

function Container93() {
  return (
    <div className="absolute content-stretch flex h-[17.492px] items-start left-[21.34px] top-[56.98px] w-[28.005px]" data-name="Container">
      <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[17.5px] not-italic relative shrink-0 text-[#4a90e2] text-[14px] text-center tracking-[-0.1504px]">證券</p>
    </div>
  );
}

function Icon19() {
  return (
    <div className="absolute left-[27.35px] size-[15.99px] top-[82.46px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9899 15.9899">
        <g id="Icon">
          <path d={svgPaths.p15a59a80} id="Vector" stroke="var(--stroke-0, #4A90E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33249" />
        </g>
      </svg>
    </div>
  );
}

function Container90() {
  return (
    <div className="h-[98.453px] relative shrink-0 w-full" data-name="Container">
      <Container91 />
      <Container92 />
      <Container93 />
      <Icon19 />
    </div>
  );
}

function Container89() {
  return (
    <div className="bg-[#1a1a1a] h-[123.75px] relative rounded-[10px] shrink-0 w-[95.99px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.654px] border-[rgba(74,144,226,0.2)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.654px] pt-[12.649px] px-[12.649px] relative size-full">
        <Container90 />
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="absolute h-[32px] left-[27.45px] top-0 w-[15.786px]" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[#4a90e2] text-[24px] top-[-0.69px] tracking-[0.0703px]">4</p>
    </div>
  );
}

function Container97() {
  return (
    <div className="absolute content-stretch flex h-[14.989px] items-start left-[23.35px] top-[38px] w-[24px]" data-name="Container">
      <p className="font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.7)] text-center">傳產</p>
    </div>
  );
}

function Container98() {
  return (
    <div className="absolute content-stretch flex h-[17.492px] items-start left-[21.34px] top-[56.98px] w-[28.005px]" data-name="Container">
      <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[17.5px] not-italic relative shrink-0 text-[#4a90e2] text-[14px] text-center tracking-[-0.1504px]">航運</p>
    </div>
  );
}

function Icon20() {
  return (
    <div className="absolute left-[27.35px] size-[15.99px] top-[82.46px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9899 15.9899">
        <g id="Icon">
          <path d={svgPaths.p15a59a80} id="Vector" stroke="var(--stroke-0, #4A90E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33249" />
        </g>
      </svg>
    </div>
  );
}

function Container95() {
  return (
    <div className="h-[98.453px] relative shrink-0 w-full" data-name="Container">
      <Container96 />
      <Container97 />
      <Container98 />
      <Icon20 />
    </div>
  );
}

function Container94() {
  return (
    <div className="bg-[#1a1a1a] h-[123.75px] relative rounded-[10px] shrink-0 w-[95.99px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.654px] border-[rgba(74,144,226,0.2)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.654px] pt-[12.649px] px-[12.649px] relative size-full">
        <Container95 />
      </div>
    </div>
  );
}

function Container101() {
  return (
    <div className="absolute h-[32px] left-[27.73px] top-0 w-[15.234px]" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[#4a90e2] text-[24px] top-[-0.69px] tracking-[0.0703px]">5</p>
    </div>
  );
}

function Container102() {
  return (
    <div className="absolute content-stretch flex h-[14.989px] items-start left-[23.35px] top-[38px] w-[24px]" data-name="Container">
      <p className="font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.7)] text-center">傳產</p>
    </div>
  );
}

function Container103() {
  return (
    <div className="absolute content-stretch flex h-[17.492px] items-start left-[7.35px] top-[56.98px] w-[56px]" data-name="Container">
      <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[17.5px] not-italic relative shrink-0 text-[#4a90e2] text-[14px] text-center tracking-[-0.1504px]">鋼鐵工業</p>
    </div>
  );
}

function Icon21() {
  return (
    <div className="absolute left-[27.35px] size-[15.99px] top-[82.46px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9899 15.9899">
        <g id="Icon">
          <path d={svgPaths.p15a59a80} id="Vector" stroke="var(--stroke-0, #4A90E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33249" />
        </g>
      </svg>
    </div>
  );
}

function Container100() {
  return (
    <div className="h-[98.453px] relative shrink-0 w-full" data-name="Container">
      <Container101 />
      <Container102 />
      <Container103 />
      <Icon21 />
    </div>
  );
}

function Container99() {
  return (
    <div className="bg-[#1a1a1a] h-[123.75px] relative rounded-[10px] shrink-0 w-[95.99px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.654px] border-[rgba(74,144,226,0.2)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.654px] pt-[12.649px] px-[12.649px] relative size-full">
        <Container100 />
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="absolute h-[32px] left-[27.41px] top-0 w-[15.857px]" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[#4a90e2] text-[24px] top-[-0.69px] tracking-[0.0703px]">6</p>
    </div>
  );
}

function Container107() {
  return (
    <div className="absolute content-stretch flex h-[14.989px] items-start left-[23.35px] top-[38px] w-[24px]" data-name="Container">
      <p className="font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.7)] text-center">傳產</p>
    </div>
  );
}

function Container108() {
  return (
    <div className="absolute content-stretch flex h-[17.492px] items-start left-[7.35px] top-[56.98px] w-[56px]" data-name="Container">
      <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[17.5px] not-italic relative shrink-0 text-[#4a90e2] text-[14px] text-center tracking-[-0.1504px]">水泥工業</p>
    </div>
  );
}

function Icon22() {
  return (
    <div className="absolute left-[27.35px] size-[15.99px] top-[82.46px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9899 15.9899">
        <g id="Icon">
          <path d={svgPaths.p15a59a80} id="Vector" stroke="var(--stroke-0, #4A90E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33249" />
        </g>
      </svg>
    </div>
  );
}

function Container105() {
  return (
    <div className="h-[98.453px] relative shrink-0 w-full" data-name="Container">
      <Container106 />
      <Container107 />
      <Container108 />
      <Icon22 />
    </div>
  );
}

function Container104() {
  return (
    <div className="bg-[#1a1a1a] h-[123.75px] relative rounded-[10px] shrink-0 w-[95.99px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.654px] border-[rgba(74,144,226,0.2)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.654px] pt-[12.649px] px-[12.649px] relative size-full">
        <Container105 />
      </div>
    </div>
  );
}

function Container111() {
  return (
    <div className="absolute h-[32px] left-[28.37px] top-0 w-[13.946px]" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[#4a90e2] text-[24px] top-[-0.69px] tracking-[0.0703px]">7</p>
    </div>
  );
}

function Container112() {
  return (
    <div className="absolute content-stretch flex h-[14.989px] items-start left-[23.35px] top-[38px] w-[24px]" data-name="Container">
      <p className="font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.7)] text-center">金融</p>
    </div>
  );
}

function Container113() {
  return (
    <div className="absolute content-stretch flex h-[17.492px] items-start left-[21.34px] top-[56.98px] w-[28.005px]" data-name="Container">
      <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[17.5px] not-italic relative shrink-0 text-[#4a90e2] text-[14px] text-center tracking-[-0.1504px]">保險</p>
    </div>
  );
}

function Icon23() {
  return (
    <div className="absolute left-[27.35px] size-[15.99px] top-[82.46px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9899 15.9899">
        <g id="Icon">
          <path d={svgPaths.p15a59a80} id="Vector" stroke="var(--stroke-0, #4A90E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33249" />
        </g>
      </svg>
    </div>
  );
}

function Container110() {
  return (
    <div className="h-[98.453px] relative shrink-0 w-full" data-name="Container">
      <Container111 />
      <Container112 />
      <Container113 />
      <Icon23 />
    </div>
  );
}

function Container109() {
  return (
    <div className="bg-[#1a1a1a] h-[123.75px] relative rounded-[10px] shrink-0 w-[95.99px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.654px] border-[rgba(74,144,226,0.2)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.654px] pt-[12.649px] px-[12.649px] relative size-full">
        <Container110 />
      </div>
    </div>
  );
}

function Container116() {
  return (
    <div className="absolute h-[32px] left-[27.42px] top-0 w-[15.847px]" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[#4a90e2] text-[24px] top-[-0.69px] tracking-[0.0703px]">8</p>
    </div>
  );
}

function Container117() {
  return (
    <div className="absolute content-stretch flex h-[14.989px] items-start left-[23.35px] top-[38px] w-[24px]" data-name="Container">
      <p className="font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.7)] text-center">傳產</p>
    </div>
  );
}

function Container118() {
  return (
    <div className="absolute content-stretch flex h-[17.492px] items-start left-[7.35px] top-[56.98px] w-[56px]" data-name="Container">
      <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[17.5px] not-italic relative shrink-0 text-[#4a90e2] text-[14px] text-center tracking-[-0.1504px]">化學工業</p>
    </div>
  );
}

function Icon24() {
  return (
    <div className="absolute left-[27.35px] size-[15.99px] top-[82.46px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9899 15.9899">
        <g id="Icon">
          <path d={svgPaths.p15a59a80} id="Vector" stroke="var(--stroke-0, #4A90E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33249" />
        </g>
      </svg>
    </div>
  );
}

function Container115() {
  return (
    <div className="h-[98.453px] relative shrink-0 w-full" data-name="Container">
      <Container116 />
      <Container117 />
      <Container118 />
      <Icon24 />
    </div>
  );
}

function Container114() {
  return (
    <div className="bg-[#1a1a1a] h-[123.75px] relative rounded-[10px] shrink-0 w-[95.99px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.654px] border-[rgba(74,144,226,0.2)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.654px] pt-[12.649px] px-[12.649px] relative size-full">
        <Container115 />
      </div>
    </div>
  );
}

function Container121() {
  return (
    <div className="absolute h-[32px] left-[27.41px] top-0 w-[15.857px]" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[#4a90e2] text-[24px] top-[-0.69px] tracking-[0.0703px]">9</p>
    </div>
  );
}

function Container122() {
  return (
    <div className="absolute content-stretch flex h-[14.989px] items-start left-[23.35px] top-[38px] w-[24px]" data-name="Container">
      <p className="font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.7)] text-center">傳產</p>
    </div>
  );
}

function Container123() {
  return (
    <div className="absolute content-stretch flex h-[17.492px] items-start left-[21.34px] top-[56.98px] w-[28.005px]" data-name="Container">
      <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[17.5px] not-italic relative shrink-0 text-[#4a90e2] text-[14px] text-center tracking-[-0.1504px]">營建</p>
    </div>
  );
}

function Icon25() {
  return (
    <div className="absolute left-[27.35px] size-[15.99px] top-[82.46px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9899 15.9899">
        <g id="Icon">
          <path d={svgPaths.p15a59a80} id="Vector" stroke="var(--stroke-0, #4A90E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33249" />
        </g>
      </svg>
    </div>
  );
}

function Container120() {
  return (
    <div className="h-[98.453px] relative shrink-0 w-full" data-name="Container">
      <Container121 />
      <Container122 />
      <Container123 />
      <Icon25 />
    </div>
  );
}

function Container119() {
  return (
    <div className="bg-[#1a1a1a] h-[123.75px] relative rounded-[10px] shrink-0 w-[95.99px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.654px] border-[rgba(74,144,226,0.2)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.654px] pt-[12.649px] px-[12.649px] relative size-full">
        <Container120 />
      </div>
    </div>
  );
}

function Container126() {
  return (
    <div className="absolute h-[32px] left-[21.51px] top-0 w-[27.668px]" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[#4a90e2] text-[24px] top-[-0.69px] tracking-[0.0703px]">10</p>
    </div>
  );
}

function Container127() {
  return (
    <div className="absolute content-stretch flex h-[14.989px] items-start left-[23.35px] top-[38px] w-[24px]" data-name="Container">
      <p className="font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.7)] text-center">傳產</p>
    </div>
  );
}

function Container128() {
  return (
    <div className="absolute content-stretch flex h-[17.492px] items-start left-[21.34px] top-[56.98px] w-[28.005px]" data-name="Container">
      <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[17.5px] not-italic relative shrink-0 text-[#4a90e2] text-[14px] text-center tracking-[-0.1504px]">觀光</p>
    </div>
  );
}

function Icon26() {
  return (
    <div className="absolute left-[27.35px] size-[15.99px] top-[82.46px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9899 15.9899">
        <g id="Icon">
          <path d={svgPaths.p15a59a80} id="Vector" stroke="var(--stroke-0, #4A90E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33249" />
        </g>
      </svg>
    </div>
  );
}

function Container125() {
  return (
    <div className="h-[98.453px] relative shrink-0 w-full" data-name="Container">
      <Container126 />
      <Container127 />
      <Container128 />
      <Icon26 />
    </div>
  );
}

function Container124() {
  return (
    <div className="bg-[#1a1a1a] h-[123.75px] relative rounded-[10px] shrink-0 w-[95.99px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.654px] border-[rgba(74,144,226,0.2)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.654px] pt-[12.649px] px-[12.649px] relative size-full">
        <Container125 />
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="absolute content-stretch flex gap-[11.995px] h-[131.74px] items-start left-0 overflow-clip pl-[15.99px] top-[57.28px] w-[393.647px]" data-name="Container">
      <Container79 />
      <Container84 />
      <Container89 />
      <Container94 />
      <Container99 />
      <Container104 />
      <Container109 />
      <Container114 />
      <Container119 />
      <Container124 />
    </div>
  );
}

function Section3() {
  return (
    <div className="h-[205.661px] relative shrink-0 w-full" data-name="Section">
      <div aria-hidden="true" className="absolute border-[rgba(74,144,226,0.06)] border-b-[0.654px] border-solid inset-0 pointer-events-none" />
      <Container76 />
      <Container78 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[16px] text-white top-[-1.04px] tracking-[-0.3125px]">大盤趨勢</p>
    </div>
  );
}

function Container133() {
  return (
    <div className="h-[15.99px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.6)] top-[0.65px]">台灣加權指數</p>
    </div>
  );
}

function Container134() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[24px] text-white top-[-0.69px] tracking-[0.0703px]">24,320</p>
    </div>
  );
}

function Container132() {
  return (
    <div className="h-[49.982px] relative shrink-0 w-[82.126px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[1.992px] items-start relative size-full">
        <Container133 />
        <Container134 />
      </div>
    </div>
  );
}

function Container136() {
  return (
    <div className="absolute h-[27.985px] left-0 top-0 w-[65.4px]" data-name="Container">
      <p className="-translate-x-full absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-[66px] not-italic text-[#ef4444] text-[20px] text-right top-[-0.04px] tracking-[-0.4492px] w-[66px] whitespace-pre-wrap">+1,520</p>
    </div>
  );
}

function Container137() {
  return (
    <div className="absolute h-[19.995px] left-0 top-[27.98px] w-[65.4px]" data-name="Container">
      <p className="-translate-x-full absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[66.09px] not-italic text-[#ef4444] text-[14px] text-right top-[0.31px] tracking-[-0.1504px] w-[52px] whitespace-pre-wrap">+6.67%</p>
    </div>
  );
}

function Container135() {
  return (
    <div className="h-[47.98px] relative shrink-0 w-[65.4px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container136 />
        <Container137 />
      </div>
    </div>
  );
}

function Container131() {
  return (
    <div className="h-[49.982px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Container132 />
          <Container135 />
        </div>
      </div>
    </div>
  );
}

function Container130() {
  return (
    <div className="h-[74.626px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(74,144,226,0.2)] border-b-[0.654px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[0.654px] pt-[11.995px] px-[11.995px] relative size-full">
        <Container131 />
      </div>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute inset-[3.13%_1.49%_21.88%_19.35%]" data-name="Group">
      <div className="absolute inset-[-0.42%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 265.993 120.993">
          <g id="Group">
            <path d="M0 120.493H265.993" id="Vector" opacity="0.2" stroke="var(--stroke-0, black)" strokeDasharray="3 3" strokeWidth="0.999942" />
            <path d="M0 89.2449H265.993" id="Vector_2" opacity="0.2" stroke="var(--stroke-0, black)" strokeDasharray="3 3" strokeWidth="0.999942" />
            <path d="M0 57.9967H265.993" id="Vector_3" opacity="0.2" stroke="var(--stroke-0, black)" strokeDasharray="3 3" strokeWidth="0.999942" />
            <path d="M0 26.7484H265.993" id="Vector_4" opacity="0.2" stroke="var(--stroke-0, black)" strokeDasharray="3 3" strokeWidth="0.999942" />
            <path d={svgPaths.p2212f000} id="Vector_5" opacity="0.2" stroke="var(--stroke-0, black)" strokeDasharray="3 3" strokeWidth="0.999942" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute inset-[3.13%_1.49%_21.88%_19.35%]" data-name="Group">
      <div className="absolute inset-[0_-0.19%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 266.993 119.993">
          <g id="Group">
            <path d="M0.499971 0V119.993" id="Vector" opacity="0.2" stroke="var(--stroke-0, black)" strokeDasharray="3 3" strokeWidth="0.999942" />
            <path d="M56.4986 1.28746e-05V119.993" id="Vector_2" opacity="0.2" stroke="var(--stroke-0, black)" strokeDasharray="3 3" strokeWidth="0.999942" />
            <path d="M112.497 1.28746e-05V119.993" id="Vector_3" opacity="0.2" stroke="var(--stroke-0, black)" strokeDasharray="3 3" strokeWidth="0.999942" />
            <path d="M168.496 1.28746e-05V119.993" id="Vector_4" opacity="0.2" stroke="var(--stroke-0, black)" strokeDasharray="3 3" strokeWidth="0.999942" />
            <path d="M224.494 1.28746e-05V119.993" id="Vector_5" opacity="0.2" stroke="var(--stroke-0, black)" strokeDasharray="3 3" strokeWidth="0.999942" />
            <path d="M266.493 1.28746e-05V119.993" id="Vector_6" opacity="0.2" stroke="var(--stroke-0, black)" strokeDasharray="3 3" strokeWidth="0.999942" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents inset-[3.13%_1.49%_21.88%_19.35%]" data-name="Group">
      <Group6 />
      <Group7 />
    </div>
  );
}

function RechartsZindex100Rd() {
  return (
    <div className="absolute contents inset-[3.13%_1.49%_21.88%_19.35%]" data-name="recharts-zindex--100-:rd:">
      <Group5 />
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute inset-[10.94%_1.49%_29.69%_19.35%]" data-name="Group">
      <div className="absolute inset-[-1.11%_-0.25%_-0.93%_-0.33%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 267.55 96.931">
          <g id="Group">
            <path d={svgPaths.pbf7ea00} id="recharts-line-:rf:" stroke="var(--stroke-0, #EF4444)" strokeWidth="2.49985" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function RechartsZindex400Rj() {
  return (
    <div className="absolute contents inset-[10.94%_1.49%_29.69%_19.35%]" data-name="recharts-zindex-400-:rj:">
      <Group8 />
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute inset-[78.13%_1.49%_21.87%_19.35%]" data-name="Group">
      <div className="absolute inset-[-0.5px_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 265.993 0.999942">
          <g id="Group">
            <path d="M0 0.499971H265.993" id="Vector" stroke="var(--stroke-0, black)" strokeWidth="0.999942" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute inset-[3.13%_80.65%_21.88%_19.35%]" data-name="Group">
      <div className="absolute inset-[0_-0.5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.999942 119.993">
          <g id="Group">
            <path d="M0.499971 0V119.993" id="Vector" stroke="var(--stroke-0, black)" strokeWidth="0.999942" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function RechartsZindex500Rk() {
  return (
    <div className="absolute contents inset-[3.13%_1.49%_21.87%_19.35%]" data-name="recharts-zindex-500-:rk:">
      <Group9 />
      <Group10 />
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents inset-[81.31%_76.64%_11.19%_15.33%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[81.31%_76.64%_11.19%_15.33%] leading-[normal] not-italic text-[9.999px] text-black text-center">12/29</p>
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute contents inset-[81.31%_61.01%_11.19%_33.04%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[81.31%_61.01%_11.19%_33.04%] leading-[normal] not-italic text-[9.999px] text-black text-center">1/07</p>
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute contents inset-[81.31%_44.35%_11.19%_49.7%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[81.31%_44.35%_11.19%_49.7%] leading-[normal] not-italic text-[9.999px] text-black text-center">1/13</p>
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute contents inset-[81.31%_27.83%_11.19%_66.52%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[81.31%_27.83%_11.19%_66.52%] leading-[normal] not-italic text-[9.999px] text-black text-center">1/17</p>
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute contents inset-[81.31%_10.86%_11.19%_82.89%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[81.31%_10.86%_11.19%_82.89%] leading-[normal] not-italic text-[9.999px] text-black text-center">1/23</p>
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents inset-[81.31%_10.86%_11.19%_15.33%]" data-name="Group">
      <Group12 />
      <Group13 />
      <Group14 />
      <Group15 />
      <Group16 />
    </div>
  );
}

function Group18() {
  return (
    <div className="absolute contents inset-[74.09%_83.04%_18.41%_6.85%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[74.09%_83.04%_18.41%_6.85%] leading-[normal] not-italic text-[9.999px] text-black text-right whitespace-pre-wrap">22,600</p>
    </div>
  );
}

function Group19() {
  return (
    <div className="absolute contents inset-[54.56%_83.04%_37.94%_7.44%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[54.56%_83.04%_37.94%_7.44%] leading-[normal] not-italic text-[9.999px] text-black text-right whitespace-pre-wrap">23,100</p>
    </div>
  );
}

function Group20() {
  return (
    <div className="absolute contents inset-[35.03%_83.04%_57.47%_6.85%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[35.03%_83.04%_57.47%_6.85%] leading-[normal] not-italic text-[9.999px] text-black text-right whitespace-pre-wrap">23,600</p>
    </div>
  );
}

function Group21() {
  return (
    <div className="absolute contents inset-[15.5%_83.04%_77%_7.44%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[15.5%_83.04%_77%_7.44%] leading-[normal] not-italic text-[9.999px] text-black text-right whitespace-pre-wrap">24,100</p>
    </div>
  );
}

function Group22() {
  return (
    <div className="absolute contents inset-[0.66%_83.04%_91.84%_6.85%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[0.66%_83.04%_91.84%_6.85%] leading-[normal] not-italic text-[9.999px] text-black text-right whitespace-pre-wrap">24,520</p>
    </div>
  );
}

function Group17() {
  return (
    <div className="absolute contents inset-[0.66%_83.04%_18.41%_6.85%]" data-name="Group">
      <Group18 />
      <Group19 />
      <Group20 />
      <Group21 />
      <Group22 />
    </div>
  );
}

function RechartsZindex2000Rp() {
  return (
    <div className="absolute contents inset-[0.66%_10.86%_11.19%_6.85%]" data-name="recharts-zindex-2000-:rp:">
      <Group11 />
      <Group17 />
    </div>
  );
}

function Icon27() {
  return (
    <div className="absolute h-[159.991px] left-0 overflow-clip top-0 w-[335.992px]" data-name="Icon">
      <RechartsZindex100Rd />
      <RechartsZindex400Rj />
      <RechartsZindex500Rk />
      <RechartsZindex2000Rp />
    </div>
  );
}

function Container139() {
  return (
    <div className="h-[159.991px] relative shrink-0 w-full" data-name="Container">
      <Icon27 />
    </div>
  );
}

function Container140() {
  return (
    <div className="h-[15.99px] relative shrink-0 w-full" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[16px] left-[168.28px] not-italic text-[12px] text-[rgba(255,255,255,0.5)] text-center top-[0.65px]">近20個交易日走勢</p>
    </div>
  );
}

function Container138() {
  return (
    <div className="h-[205.968px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[5.997px] items-start pl-[11.995px] pr-[12.373px] pt-[11.995px] relative size-full">
        <Container139 />
        <Container140 />
      </div>
    </div>
  );
}

function Container129() {
  return (
    <div className="bg-[#1a1a1a] h-[281.902px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[0.654px] relative size-full">
          <Container130 />
          <Container138 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[0.654px] border-[rgba(74,144,226,0.2)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Section4() {
  return (
    <div className="h-[338.536px] relative shrink-0 w-full" data-name="Section">
      <div aria-hidden="true" className="absolute border-[rgba(74,144,226,0.06)] border-b-[0.654px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[7.99px] items-start pb-[0.654px] pt-[11.995px] px-[15.99px] relative size-full">
        <Heading4 />
        <Container129 />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[27.995px] relative shrink-0 w-[71.99px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[18px] text-white top-[-0.38px] tracking-[-0.4395px]">社團貼文</p>
      </div>
    </div>
  );
}

function Icon28() {
  return (
    <div className="absolute left-[60px] size-[15.99px] top-[2px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9899 15.9899">
        <g id="Icon">
          <path d={svgPaths.p15a59a80} id="Vector" stroke="var(--stroke-0, #4A90E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33249" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="h-[19.995px] relative shrink-0 w-[75.985px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_SC:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[20px] left-[28px] not-italic text-[#4a90e2] text-[14px] text-center top-[0.31px] tracking-[-0.1504px]">查看更多</p>
        <Icon28 />
      </div>
    </div>
  );
}

function Container141() {
  return (
    <div className="h-[27.995px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[15.99px] relative size-full">
          <Heading5 />
          <Button8 />
        </div>
      </div>
    </div>
  );
}

function ImageWithFallback() {
  return (
    <div className="relative rounded-[21941200px] shrink-0 size-[31.99px]" data-name="ImageWithFallback">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none rounded-[21941200px] size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Container146() {
  return (
    <div className="h-[15.99px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[12px] text-white top-[0.65px]">林恩如-超簡單投資法</p>
    </div>
  );
}

function Container147() {
  return (
    <div className="h-[15.99px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#999] text-[12px] top-[0.65px]">6小時前</p>
    </div>
  );
}

function Container145() {
  return (
    <div className="flex-[1_0_0] h-[31.98px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container146 />
        <Container147 />
      </div>
    </div>
  );
}

function Container144() {
  return (
    <div className="content-stretch flex gap-[7.99px] h-[31.99px] items-center relative shrink-0 w-full" data-name="Container">
      <ImageWithFallback />
      <Container145 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[39.99px] overflow-clip relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[14px] text-white top-[0.31px] tracking-[-0.1504px] w-[246px] whitespace-pre-wrap">為什麼你買股票總是在「領息」，而不是「賺價差」？</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[31.98px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#999] text-[12px] top-[0.65px] w-[258px] whitespace-pre-wrap">很多人買了股票套牢，就開始安慰自己：「沒關係啦，這間公司很穩，我改領股息當存股。」別再騙自己了...</p>
    </div>
  );
}

function Container143() {
  return (
    <div className="bg-[#1a1a1a] h-[141.242px] relative rounded-[10px] shrink-0 w-[287.991px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.654px] border-[rgba(74,144,226,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7.99px] items-start pb-[0.654px] pt-[12.649px] px-[12.649px] relative size-full">
        <Container144 />
        <Heading6 />
        <Paragraph1 />
      </div>
    </div>
  );
}

function ImageWithFallback1() {
  return (
    <div className="relative rounded-[21941200px] shrink-0 size-[31.99px]" data-name="ImageWithFallback">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none rounded-[21941200px] size-full" src={imgImageWithFallback1} />
    </div>
  );
}

function Container151() {
  return (
    <div className="h-[15.99px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[12px] text-white top-[0.65px]">VIP投資團隊</p>
    </div>
  );
}

function Container152() {
  return (
    <div className="h-[15.99px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#999] text-[12px] top-[0.65px]">12小時前</p>
    </div>
  );
}

function Container150() {
  return (
    <div className="flex-[1_0_0] h-[31.98px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container151 />
        <Container152 />
      </div>
    </div>
  );
}

function Container149() {
  return (
    <div className="content-stretch flex gap-[7.99px] h-[31.99px] items-center relative shrink-0 w-full" data-name="Container">
      <ImageWithFallback1 />
      <Container150 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[19.995px] overflow-clip relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[14px] text-white top-[0.31px] tracking-[-0.1504px]">【獨家】AI伺服器供應鏈深度解析</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[31.98px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#999] text-[12px] top-[0.65px] w-[252px] whitespace-pre-wrap">根據我們的內部消息和供應鏈調查，AI伺服器的訂單能見度已經延伸到2026年Q2...</p>
    </div>
  );
}

function Container148() {
  return (
    <div className="bg-[#1a1a1a] h-[141.242px] relative rounded-[10px] shrink-0 w-[287.991px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.654px] border-[rgba(74,144,226,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7.99px] items-start pb-[0.654px] pt-[12.649px] px-[12.649px] relative size-full">
        <Container149 />
        <Heading7 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function ImageWithFallback2() {
  return (
    <div className="relative rounded-[21941200px] shrink-0 size-[31.99px]" data-name="ImageWithFallback">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none rounded-[21941200px] size-full" src={imgImageWithFallback2} />
    </div>
  );
}

function Container156() {
  return (
    <div className="h-[15.99px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[12px] text-white top-[0.65px]">金融股達人</p>
    </div>
  );
}

function Container157() {
  return (
    <div className="h-[15.99px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#999] text-[12px] top-[0.65px]">1天前</p>
    </div>
  );
}

function Container155() {
  return (
    <div className="flex-[1_0_0] h-[31.98px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container156 />
        <Container157 />
      </div>
    </div>
  );
}

function Container154() {
  return (
    <div className="content-stretch flex gap-[7.99px] h-[31.99px] items-center relative shrink-0 w-full" data-name="Container">
      <ImageWithFallback2 />
      <Container155 />
    </div>
  );
}

function Heading8() {
  return (
    <div className="h-[19.995px] overflow-clip relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[14px] text-white top-[0.31px] tracking-[-0.1504px]">主力佈局曝光：這5檔電子股籌碼已經集中</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[31.98px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#999] text-[12px] top-[0.65px] w-[252px] whitespace-pre-wrap">經過三個月的底部整理，這幾檔電子股的籌碼結構已經非常乾淨...</p>
    </div>
  );
}

function Container153() {
  return (
    <div className="bg-[#1a1a1a] h-[141.242px] relative rounded-[10px] shrink-0 w-[287.991px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.654px] border-[rgba(74,144,226,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7.99px] items-start pb-[0.654px] pt-[12.649px] px-[12.649px] relative size-full">
        <Container154 />
        <Heading8 />
        <Paragraph3 />
      </div>
    </div>
  );
}

function Container142() {
  return (
    <div className="h-[149.232px] relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[11.995px] items-start pl-[15.99px] relative size-full">
          <Container143 />
          <Container148 />
          <Container153 />
        </div>
      </div>
    </div>
  );
}

function Section5() {
  return (
    <div className="content-stretch flex flex-col gap-[11.995px] h-[221.856px] items-start pb-[0.654px] pt-[15.99px] relative shrink-0 w-full" data-name="Section">
      <div aria-hidden="true" className="absolute border-[rgba(74,144,226,0.06)] border-b-[0.654px] border-solid inset-0 pointer-events-none" />
      <Container141 />
      <Container142 />
    </div>
  );
}

function Heading9() {
  return (
    <div className="h-[27.995px] relative shrink-0 w-[71.99px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[18px] text-white top-[-0.38px] tracking-[-0.4395px]">精選內容</p>
      </div>
    </div>
  );
}

function Icon29() {
  return (
    <div className="absolute left-[60px] size-[15.99px] top-[2px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9899 15.9899">
        <g id="Icon">
          <path d={svgPaths.p15a59a80} id="Vector" stroke="var(--stroke-0, #4A90E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33249" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="h-[19.995px] relative shrink-0 w-[75.985px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_SC:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[20px] left-[28px] not-italic text-[#4a90e2] text-[14px] text-center top-[0.31px] tracking-[-0.1504px]">查看更多</p>
        <Icon29 />
      </div>
    </div>
  );
}

function Container158() {
  return (
    <div className="h-[27.995px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[15.99px] relative size-full">
          <Heading9 />
          <Button9 />
        </div>
      </div>
    </div>
  );
}

function ImageWithFallback3() {
  return (
    <div className="absolute h-[107.995px] left-0 top-0 w-[191.991px]" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback3} />
    </div>
  );
}

function Container162() {
  return (
    <div className="absolute bg-[#4a90e2] h-[19.975px] left-[7.99px] rounded-[4px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] top-[7.99px] w-[39.98px]" data-name="Container">
      <p className="absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[16px] left-[7.99px] not-italic text-[12px] text-white top-[2.65px]">影音</p>
    </div>
  );
}

function Container161() {
  return (
    <div className="h-[107.995px] overflow-clip relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <ImageWithFallback3 />
      <Container162 />
    </div>
  );
}

function Heading10() {
  return (
    <div className="h-[38.478px] overflow-clip relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[19.25px] left-0 not-italic text-[14px] text-white top-[-0.35px] tracking-[-0.1504px] w-[184px] whitespace-pre-wrap">【林恩如】市場修正我🔥強勢股</p>
    </div>
  );
}

function Container160() {
  return (
    <div className="h-[154.463px] relative shrink-0 w-[191.991px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7.99px] items-start relative size-full">
        <Container161 />
        <Heading10 />
      </div>
    </div>
  );
}

function ImageWithFallback4() {
  return (
    <div className="absolute h-[107.995px] left-0 top-0 w-[191.991px]" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback4} />
    </div>
  );
}

function Container165() {
  return (
    <div className="absolute bg-[#4a90e2] h-[19.975px] left-[7.99px] rounded-[4px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] top-[7.99px] w-[39.98px]" data-name="Container">
      <p className="absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[16px] left-[7.99px] not-italic text-[12px] text-white top-[2.65px]">講座</p>
    </div>
  );
}

function Container164() {
  return (
    <div className="h-[107.995px] overflow-clip relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <ImageWithFallback4 />
      <Container165 />
    </div>
  );
}

function Heading11() {
  return (
    <div className="h-[19.239px] overflow-clip relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[19.25px] left-0 not-italic text-[14px] text-white top-[-0.35px] tracking-[-0.1504px]">恩如三部曲完整教學</p>
    </div>
  );
}

function Container163() {
  return (
    <div className="h-[154.463px] relative shrink-0 w-[191.991px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7.99px] items-start relative size-full">
        <Container164 />
        <Heading11 />
      </div>
    </div>
  );
}

function ImageWithFallback5() {
  return (
    <div className="absolute h-[107.995px] left-0 top-0 w-[191.991px]" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback5} />
    </div>
  );
}

function Container168() {
  return (
    <div className="absolute bg-[#4a90e2] h-[19.975px] left-[7.99px] rounded-[4px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] top-[7.99px] w-[39.98px]" data-name="Container">
      <p className="absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[16px] left-[7.99px] not-italic text-[12px] text-white top-[2.65px]">文章</p>
    </div>
  );
}

function Container167() {
  return (
    <div className="h-[107.995px] overflow-clip relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <ImageWithFallback5 />
      <Container168 />
    </div>
  );
}

function Heading12() {
  return (
    <div className="h-[19.239px] overflow-clip relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[19.25px] left-0 not-italic text-[14px] text-white top-[-0.35px] tracking-[-0.1504px]">2026年第一季投資策略全解析</p>
    </div>
  );
}

function Container166() {
  return (
    <div className="h-[154.463px] relative shrink-0 w-[191.991px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7.99px] items-start relative size-full">
        <Container167 />
        <Heading12 />
      </div>
    </div>
  );
}

function ImageWithFallback6() {
  return (
    <div className="absolute h-[107.995px] left-0 top-0 w-[191.991px]" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback6} />
    </div>
  );
}

function Container171() {
  return (
    <div className="absolute bg-[#4a90e2] h-[19.975px] left-[7.99px] rounded-[4px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] top-[7.99px] w-[39.98px]" data-name="Container">
      <p className="absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[16px] left-[7.99px] not-italic text-[12px] text-white top-[2.65px]">講座</p>
    </div>
  );
}

function Container170() {
  return (
    <div className="h-[107.995px] overflow-clip relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <ImageWithFallback6 />
      <Container171 />
    </div>
  );
}

function Heading13() {
  return (
    <div className="h-[19.239px] overflow-clip relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[19.25px] left-0 not-italic text-[14px] text-white top-[-0.35px] tracking-[-0.1504px]">技術分析進階課程</p>
    </div>
  );
}

function Container169() {
  return (
    <div className="h-[154.463px] relative shrink-0 w-[191.991px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7.99px] items-start relative size-full">
        <Container170 />
        <Heading13 />
      </div>
    </div>
  );
}

function Container159() {
  return (
    <div className="h-[162.453px] relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[11.995px] items-start pl-[15.99px] relative size-full">
          <Container160 />
          <Container163 />
          <Container166 />
          <Container169 />
        </div>
      </div>
    </div>
  );
}

function Section6() {
  return (
    <div className="content-stretch flex flex-col gap-[11.995px] h-[235.077px] items-start pb-[0.654px] pt-[15.99px] relative shrink-0 w-full" data-name="Section">
      <div aria-hidden="true" className="absolute border-[rgba(74,144,226,0.06)] border-b-[0.654px] border-solid inset-0 pointer-events-none" />
      <Container158 />
      <Container159 />
    </div>
  );
}

function Heading14() {
  return (
    <div className="h-[27.995px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[18px] text-white top-[-0.38px] tracking-[-0.4395px]">追蹤我們</p>
    </div>
  );
}

function Icon30() {
  return (
    <div className="relative shrink-0 size-[27.995px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.995 27.995">
        <g id="Icon">
          <path d={svgPaths.p15b3fd00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33292" />
        </g>
      </svg>
    </div>
  );
}

function Container173() {
  return (
    <div className="bg-[#06c755] relative rounded-[21941200px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] shrink-0 size-[55.99px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon30 />
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[15.99px] relative shrink-0 w-[26.084px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#999] text-[12px] top-[0.65px]">LINE</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="h-[79.97px] relative shrink-0 w-[55.99px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7.99px] items-center relative size-full">
        <Container173 />
        <Text15 />
      </div>
    </div>
  );
}

function Icon31() {
  return (
    <div className="relative shrink-0 size-[27.995px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.995 27.995">
        <g id="Icon">
          <path d={svgPaths.p8a9f400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33292" />
        </g>
      </svg>
    </div>
  );
}

function Container174() {
  return (
    <div className="bg-[#1877f2] relative rounded-[21941200px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] shrink-0 size-[55.99px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon31 />
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[15.99px] relative shrink-0 w-[54.713px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#999] text-[12px] top-[0.65px]">Facebook</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="h-[79.97px] relative shrink-0 w-[55.99px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7.99px] items-center relative size-full">
        <Container174 />
        <Text16 />
      </div>
    </div>
  );
}

function Icon32() {
  return (
    <div className="relative shrink-0 size-[27.995px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.995 27.995">
        <g id="Icon">
          <path d={svgPaths.p1b14ba00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33292" />
          <path d={svgPaths.p129e5b00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33292" />
          <path d="M20.4131 7.58199H20.4247" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33292" />
        </g>
      </svg>
    </div>
  );
}

function Container175() {
  return (
    <div className="bg-gradient-to-b from-[#f58529] relative rounded-[21941200px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] shrink-0 size-[55.99px] to-[#515bd4] via-1/2 via-[#dd2a7b]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon32 />
      </div>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[15.99px] relative shrink-0 w-[56.358px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#999] text-[12px] top-[0.65px]">Instagram</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="h-[79.97px] relative shrink-0 w-[56.358px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7.99px] items-center relative size-full">
        <Container175 />
        <Text17 />
      </div>
    </div>
  );
}

function Container172() {
  return (
    <div className="content-stretch flex gap-[23.99px] h-[79.97px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Link />
      <Link1 />
      <Link2 />
    </div>
  );
}

function Section7() {
  return (
    <div className="h-[151.94px] relative shrink-0 w-full" data-name="Section">
      <div className="content-stretch flex flex-col gap-[11.995px] items-start pt-[15.99px] px-[15.99px] relative size-full">
        <Heading14 />
        <Container172 />
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <div className="bg-[#0a0a0a] content-stretch flex flex-col gap-[0.654px] items-start relative shrink-0 w-full" data-name="HomePage">
      <Section />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />
    </div>
  );
}

function MainContent() {
  return (
    <div className="relative shrink-0 w-[393.647px]" data-name="Main Content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <HomePage />
      </div>
    </div>
  );
}

function Layout() {
  return (
    <div className="bg-[#0a0a0a] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Layout">
      <MainContent />
    </div>
  );
}

function Icon33() {
  return (
    <div className="relative shrink-0 size-[19.995px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.995 19.995">
        <g id="Icon">
          <path d={svgPaths.pb8dcf2a} id="Vector" stroke="var(--stroke-0, #4A90E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66625" />
          <path d={svgPaths.p17c3c400} id="Vector_2" stroke="var(--stroke-0, #4A90E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66625" />
        </g>
      </svg>
    </div>
  );
}

function Layout2() {
  return (
    <div className="h-[15.99px] relative shrink-0 w-[24px]" data-name="Layout">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#4a90e2] text-[12px] top-[0.65px]">首頁</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="flex-[1_0_0] h-[63.99px] min-h-px min-w-px relative" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.995px] items-center justify-center relative size-full">
        <Icon33 />
        <Layout2 />
      </div>
    </div>
  );
}

function Icon34() {
  return (
    <div className="relative shrink-0 size-[19.995px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.995 19.995">
        <g id="Icon">
          <path d={svgPaths.p1afd9280} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66625" />
          <path d="M14.9962 14.1631V7.49812" id="Vector_2" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66625" />
          <path d="M10.8306 14.1631V4.16562" id="Vector_3" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66625" />
          <path d="M6.665 14.1631V11.6637" id="Vector_4" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66625" />
        </g>
      </svg>
    </div>
  );
}

function Layout3() {
  return (
    <div className="h-[15.99px] relative shrink-0 w-[24px]" data-name="Layout">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#999] text-[12px] top-[0.65px]">選股</p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="flex-[1_0_0] h-[63.99px] min-h-px min-w-px relative" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.995px] items-center justify-center relative size-full">
        <Icon34 />
        <Layout3 />
      </div>
    </div>
  );
}

function Icon35() {
  return (
    <div className="relative shrink-0 size-[19.995px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.995 19.995">
        <g clipPath="url(#clip0_304_810)" id="Icon">
          <path d={svgPaths.pa32d900} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66625" />
          <path d={svgPaths.p3f065f00} id="Vector_2" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66625" />
        </g>
        <defs>
          <clipPath id="clip0_304_810">
            <rect fill="white" height="19.995" width="19.995" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Layout4() {
  return (
    <div className="h-[15.99px] relative shrink-0 w-[24px]" data-name="Layout">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#999] text-[12px] top-[0.65px]">自選</p>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="flex-[1_0_0] h-[63.99px] min-h-px min-w-px relative" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.995px] items-center justify-center relative size-full">
        <Icon35 />
        <Layout4 />
      </div>
    </div>
  );
}

function Icon36() {
  return (
    <div className="relative shrink-0 size-[19.995px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.995 19.995">
        <g clipPath="url(#clip0_304_807)" id="Icon">
          <path d={svgPaths.p2c804000} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66625" />
        </g>
        <defs>
          <clipPath id="clip0_304_807">
            <rect fill="white" height="19.995" width="19.995" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Layout5() {
  return (
    <div className="h-[15.99px] relative shrink-0 w-[24px]" data-name="Layout">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#999] text-[12px] top-[0.65px]">社團</p>
      </div>
    </div>
  );
}

function Link6() {
  return (
    <div className="flex-[1_0_0] h-[63.99px] min-h-px min-w-px relative" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.995px] items-center justify-center relative size-full">
        <Icon36 />
        <Layout5 />
      </div>
    </div>
  );
}

function Icon37() {
  return (
    <div className="relative shrink-0 size-[19.995px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.995 19.995">
        <g clipPath="url(#clip0_304_800)" id="Icon">
          <path d={svgPaths.p2faf1800} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66625" />
          <path d={svgPaths.p5f58300} id="Vector_2" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66625" />
          <path d="M8.33125 7.49812H6.665" id="Vector_3" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66625" />
          <path d="M13.33 10.8306H6.665" id="Vector_4" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66625" />
          <path d="M13.33 14.1631H6.665" id="Vector_5" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66625" />
        </g>
        <defs>
          <clipPath id="clip0_304_800">
            <rect fill="white" height="19.995" width="19.995" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Layout6() {
  return (
    <div className="h-[15.99px] relative shrink-0 w-[24px]" data-name="Layout">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#999] text-[12px] top-[0.65px]">內容</p>
      </div>
    </div>
  );
}

function Link7() {
  return (
    <div className="flex-[1_0_0] h-[63.99px] min-h-px min-w-px relative" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.995px] items-center justify-center relative size-full">
        <Icon37 />
        <Layout6 />
      </div>
    </div>
  );
}

function Icon38() {
  return (
    <div className="relative shrink-0 size-[19.995px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.995 19.995">
        <g id="Icon">
          <path d={svgPaths.p3ff39100} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66625" />
          <path d={svgPaths.p1893ce00} id="Vector_2" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66625" />
        </g>
      </svg>
    </div>
  );
}

function Layout7() {
  return (
    <div className="h-[15.99px] relative shrink-0 w-[24px]" data-name="Layout">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#999] text-[12px] top-[0.65px]">會員</p>
      </div>
    </div>
  );
}

function Link8() {
  return (
    <div className="flex-[1_0_0] h-[63.99px] min-h-px min-w-px relative" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.995px] items-center justify-center relative size-full">
        <Icon38 />
        <Layout7 />
      </div>
    </div>
  );
}

function Layout1() {
  return (
    <div className="bg-[#1a1a1a] content-stretch flex h-[63.99px] items-center justify-between pt-[0.654px] px-[7.99px] relative shrink-0 w-[393.647px]" data-name="Layout">
      <div aria-hidden="true" className="absolute border-black border-solid border-t-[0.654px] inset-0 pointer-events-none" />
      <Link3 />
      <Link4 />
      <Link5 />
      <Link6 />
      <Link7 />
      <Link8 />
    </div>
  );
}

export default function app() {
  return (
    <div className="bg-[#0a0a0a] content-stretch flex flex-col items-start relative size-full" data-name="林恩如- 長線聚寶盆APP">
      <Layout />
      <Layout1 />
    </div>
  );
}