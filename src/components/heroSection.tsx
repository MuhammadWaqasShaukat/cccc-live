import { useContext, useRef } from "react";
import { CottonCandyContext } from "../providers/ContextProvider";
import AnimatedElement from "./UI/AnimatedElement";
import { ANIMATION_WEBM_SOURCES } from "../constants/animatedElements";
import { useWallet } from "@solana/wallet-adapter-react";

const HeroSection = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const catRef = useRef<HTMLDivElement | null>(null);
  const ctx = useContext(CottonCandyContext);

  const { connected, disconnect } = useWallet();

  const handleMouseDown = () => {
    const isMouthOpen = catRef.current?.classList.contains(
      "bg-hero-section-memcoin-2-open"
    );
    if (!isMouthOpen) {
      catRef.current?.classList.remove("bg-hero-section-memcoin-2");
      catRef.current?.classList.add("bg-hero-section-memcoin-2-open");
      if (!audioRef.current) {
        audioRef.current = new Audio("./sound/pop-cat.mp3");
        audioRef.current.volume = 1;
      }
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleMouseUp = () => {
    const isMouthOpen = catRef.current?.classList.contains(
      "bg-hero-section-memcoin-2-open"
    );
    if (isMouthOpen) {
      catRef.current?.classList.remove("bg-hero-section-memcoin-2-open");
      catRef.current?.classList.add("bg-hero-section-memcoin-2");
    }
  };

  const handleGoToMintSection = async () => {
    if (!connected) {
      if (ctx.mintSectionRef?.current) {
        ctx.mintSectionRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      await disconnect();
      ctx.setCollectiable(null);
      ctx.setMyEggs([]);
      ctx.setMyNfts([]);
      ctx.setNftToEggMap({});
      ctx.setCurrentModal(null);
      ctx.setNftMint(null);
      ctx.setRefreshNftState("");
      ctx.setBookmark("mint");
    }
  };

  return (
    <div>
      <div className=" lg:h-[1348px] h-screen w-screen relative bg-hero-section-upper bg-no-repeat bg-cover">
        <div className=" flex flex-row justify-between items-center  md:px-10 md:py-5 py-2 px-4">
          <div className="flex justify-center items-center">
            <img
              src="/images/logo-header.png"
              className="w-12 md:w-20 mr-1 md:mr-2"
            />
            <h1 className="font-impact text-sm md:text-xl lg:text-[32px] uppercase text-white md:tracking-wider md:leading-8">
              Cotton Candy <br />
              Crusader Club
            </h1>
          </div>
          <button
            className={`${
              connected
                ? "bg-social-section-button-x h-16"
                : "bg-mint-section-btn h-12"
            }  md:h-[86px] w-28 md:w-[191px] bg-contain bg-no-repeat group relative `}
            onClick={handleGoToMintSection}
          >
            <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20 transition duration-200 z-20"></span>
            <span className="absolute inset-0 w-full h-full grid place-content-center uppercase font-patrick-hand lg:text-3xl text-xl text-white leading-none  z-30">
              {connected ? "Disconnect" : "Connect"}
            </span>
          </button>
        </div>

        <div className="bg-hero-section-lower bg-no-repeat bg-cover h-[20%] bg-end absolute bottom-0 left-0 right-0"></div>

        <div className="bg-hero-section-logo max-w-[891px] max-h-[462px] min-w-[288px] h-[34.3%] w-[66%] min-h-[149px] bg-no-repeat bg-contain absolute left-[50%] -translate-x-[50%] lg:top-[10%] top-[13%]"></div>

        {/* casltes  red*/}
        <div className="relative md:static top-[75%] md:top-auto">
          <div className="bg-hero-section-castle-red-1 max-w-[344px] max-h-[435px] min-w-[132px] min-h-[166px] w-[25.52%] h-[32.27%] bg-bottom bg-contain bg-no-repeat absolute z-0 md:bottom-[53.5%] lg:bottom[55%] bottom-[12rem]"></div>
          <div className="bg-hero-section-frog max-w-[211px] max-h-[230px] h-[17%] w-[15.7%] min-h-[69px] min-w-[61px] bg-bottom bg-contain bg-no-repeat z-10 absolute lg:bottom-[56%] md:bottom-[53%]  bottom-[12rem] lg:left-0 -left-2"></div>
          <div className="bg-hero-section-chillguy lg:w-[352px] max-h-[341px] h-[25.30%] w-[26%] min-w-[117px] min-h-[111px] bg-contain z-10 absolute md:bottom-[50%] bottom-[10rem] left-[9%] md:left-[11%] 2xl:left-[7%] bg-bottom bg-no-repeat"></div>
          <div className="bg-hero-section-castle-red-2 max-w-[478px] max-h-[619px] min-w-[162px] min-h-[230px]  h-[45.92%] w-[33.83%] bg-bottom bg-contain bg-no-repeat absolute bottom-[16%] z-30"></div>
          <div className="bg-hero-section-memcoin-1 max-w-[273px] max-h-[319px] w-[20%] h-[24%] min-w-[70px] min-h-[78px]   absolute top-[58%] z-30 md:block hidden bg-contain bg-no-repeat"></div>
        </div>

        <div className="bg-hero-section-red-1 lg:w-[116px] lg:h-[128px] w-[50px] h-[54px]  bg-contain bg-no-repeat  absolute lg:top-[90%] top-[85%] lg:left-[30%] left-[5%] z-10"></div>
        <div className="bg-hero-section-red-2 w-[96px] h-[108px] absolute top-[87%] z-10 hidden lg:block"></div>

        <div className="bg-hero-section-shark-1 lg:w-[104px] lg:h-[114px] w-[52px] h-[57px]  bg-contain bg-no-repeat  absolute top-[85%] right-[25%] z-10"></div>
        <div className="bg-hero-section-shark-2 w-[104px] h-[114px] absolute top-[90%] right-[2%] hidden lg:block z-10"></div>

        {/* <div className="bg-hero-section-main max-w-[680px] max-h-[582px] w-[50%] h-[43%] absolute bottom-0 min-h-[304px] min-w-[400px] bg-contain bg-no-repeat left-[33%] z-[31] hidden md:block"></div> */}

        <AnimatedElement
          className="max-w-[800px] max-h-[1024px] w-[48%] h-[60%] absolute -bottom-[6%] min-h-[304px] min-w-[400px] bg-contain bg-no-repeat left-[33%] z-[31] hidden md:block"
          source={ANIMATION_WEBM_SOURCES["Dog"]}
        />

        <div
          ref={catRef}
          className="bg-hero-section-memcoin-2 max-w-[431px] w-[31.2%] h-[40.43%] max-h-[545px] min-w-[144px] min-h-[180px] bg-contain bg-no-repeat absolute lg:bottom-[2%] bottom-[8%] bg-bottom z-[31] md:left-[3%] left-[15%]"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        ></div>

        <AnimatedElement
          className="absolute object-contain w-[50%] md:w-[50%] h-[80.48%] max-w-[550px] max-h-[980px] min-w-[147px] min-h-[176px] md:-bottom-[6%] -bottom-[14%] md:left-[12%] -left-[14%] z-30"
          source={ANIMATION_WEBM_SOURCES["magic"]}
        />

        {/* <div className="bg-hero-section-memcoin-3 max-w-[418px] max-h-[504px] w-[31%] h-[37.48%] min-w-[147px] min-h-[176px] bg-contain bg-no-repeat bg-bottom  absolute bottom-[14%] md:left-[15%] left-[0%] z-30"></div> */}
        <div className="bg-hero-section-distant max-w-[1208px] max-h-[608px] h-[45%] w-[90%] min-w-[300px] min-h-[105px] bg-contain bg-no-repeat bg-bottom absolute bottom-[16%] left-[19%] z-0"></div>

        {/* castle-blue */}
        <div className="relative md:static top-[75%] md:top-auto">
          <div className="bg-hero-section-castle-blue-1 max-w-[344px] max-h-[475px] min-h-[181px] w-[25.52%] h-[35.24%] min-w-[134px] bg-contain  bg-no-repeat absolute z-0 md:bottom-[53.5%] lg:bottom[55%] bottom-[12rem] bg-bottom right-0"></div>
          <div className="bg-hero-section-memcoin-4 max-w-[199px] maxh-[229px] min-w-[71px] w-[15%] h-[17%] min-h-[82px] bg-contain bg-no-repeat bg-bottom z-10 absolute md:top-[30%] bottom-[11.5rem] lg:right-0 -right-4"></div>
          <div className="bg-hero-section-memcoin-8 max-w-[401px] max-h-[403px] w-[30%] h-[30%] min-w-[133px] min-h-[131px] bg-contain bg-no-repeat bg-bottom z-10 absolute md:top-[23%] bottom-[10rem]  right-[6%]"></div>
          <div className="bg-hero-section-castle-blue-2 max-w-[465px] max-h-[606px] h-[46%] w-[33%] absolute min-h-[221px] min-w-[168px] bg-contain bg-no-repeat bg-bottom z-30 right-0 bottom-[16%]"></div>

          <div className="bg-hero-section-memcoin-5 max-w-[346px] max-h-[432px] w-[25.68%] h-[32%] min-w-[137px] min-h-[171px] bg-contain bg-no-repeat z-30 absolute bg-bottom -bottom-4 md:bottom-[14%] right-[15%]"></div>
          <div className="bg-hero-section-memcoin-6 max-w-[350px] max-h-[434px] min-w-[119px] min-h-[147px] w-[25.68%] h-[32%] bg-contain bg-no-repeat z-[31]  absolute -top-24 md:top-[68%] lg:right-[6%] right-[0%]"></div>
          <AnimatedElement
            className="md:w-[500px] md:h-[400px] w-[250px] origin-center  h-[200px] object-contain bg-no-repeat z-[31]  absolute  md:top-[50%] top-[10%] lg:top-[70%] lg:right-[10%] right-[0%]"
            source={ANIMATION_WEBM_SOURCES["fire"]}
          />
          <div className="bg-hero-section-memcoin-7 max-w-[299px] max-h-[351px] w-[22%] h-[26%] min-w-[119px] min-h-[147px] z-30 absolute top-[63%] bg-contain bg-no-repeat  -right-[0%] bg-right hidden md:block "></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
