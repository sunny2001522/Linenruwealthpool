import svgPaths from "./svg-aplpa49o78";

function Frame() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame 1">
          <path d={svgPaths.pfe5ef80} fill="var(--fill-0, #F5E0A4)" id="Star 1" />
          <path d={svgPaths.p326c5480} fill="url(#paint0_linear_43_151)" id="Star 2" />
          <path d={svgPaths.p1e0b3470} fill="url(#paint1_linear_43_151)" id="Star 3" />
          <path d={svgPaths.p378cf000} fill="url(#paint2_linear_43_151)" id="Star 4" />
          <path d={svgPaths.p2862b300} fill="url(#paint3_linear_43_151)" id="Star 7" />
          <path d={svgPaths.p18139e00} fill="url(#paint4_linear_43_151)" id="Star 8" />
          <path d={svgPaths.p2885b500} fill="url(#paint5_linear_43_151)" id="Star 6" />
          <g id="Star 9">
            <path d={svgPaths.pfe5ef80} fill="var(--fill-0, white)" style={{ mixBlendMode: "color" }} />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_43_151" x1="-8.79943e-08" x2="7.75" y1="5.85845" y2="8.35845">
            <stop stopColor="#EFD78F" />
            <stop offset="1" stopColor="#C8923B" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_43_151" x1="5.5" x2="8" y1="12.2471" y2="10.7471">
            <stop stopColor="#EFD78F" />
            <stop offset="1" stopColor="#B37D30" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_43_151" x1="7.75001" x2="10" y1="12.9971" y2="10.4971">
            <stop offset="0.269179" stopColor="#F5E4A9" />
            <stop offset="0.828457" stopColor="#CBA65D" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint3_linear_43_151" x1="12.4203" x2="10.2211" y1="7.21959" y2="9.13354">
            <stop stopColor="#EFD78F" />
            <stop offset="1" stopColor="#B37D30" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint4_linear_43_151" x1="9.25001" x2="9.00001" y1="3.24704" y2="7.74704">
            <stop stopColor="#EFD78F" />
            <stop offset="1" stopColor="#B37D30" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint5_linear_43_151" x1="5.75001" x2="7.75001" y1="6.24704" y2="2.49704">
            <stop stopColor="#EFD78F" />
            <stop offset="1" stopColor="#C8923B" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function Frame1() {
  return (
    <div className="content-stretch flex items-start relative size-full">
      <Frame />
    </div>
  );
}