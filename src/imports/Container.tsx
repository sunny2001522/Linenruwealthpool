function Paragraph() {
  return (
    <div className="h-[27.004px] relative shrink-0 w-[161.963px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[27px] left-[81.5px] not-italic text-[18px] text-center text-white top-[0.62px] tracking-[-0.4395px]">確定要刪除貼文嗎？</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex h-[51.995px] items-center justify-center left-0 rounded-tl-[10px] rounded-tr-[10px] top-0 w-[299.996px]" data-name="Container">
      <Paragraph />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[24px] left-[15.99px] top-[63.99px] w-[268.017px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[24px] left-[134.03px] not-italic text-[16px] text-center text-white top-[-1.04px] tracking-[-0.3125px]">刪除後，將無法復原</p>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[24px] relative shrink-0 w-[31.99px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[24px] left-[16px] not-italic text-[16px] text-center text-white top-[-1.04px] tracking-[-0.3125px]">取消</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#2f2f2f] flex-[1_0_0] h-[43.995px] min-h-px min-w-px relative rounded-[10px]" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
          <Text />
        </div>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[31.99px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[24px] left-[16px] not-italic text-[16px] text-center text-white top-[-1.04px] tracking-[-0.3125px]">確定</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="flex-[1_0_0] h-[43.995px] min-h-px min-w-px relative rounded-[10px]" data-name="Button" style={{ backgroundImage: "linear-gradient(174.826deg, rgb(74, 144, 226) 26.041%, rgb(59, 130, 246) 73.959%)" }}>
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex gap-[11.995px] h-[43.995px] items-start left-[15.99px] top-[115.98px] w-[268.017px]" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-[#212121] relative rounded-[10px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] size-full" data-name="Container">
      <Container1 />
      <Paragraph1 />
      <Container2 />
    </div>
  );
}