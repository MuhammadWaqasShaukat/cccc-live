import { useContext, useRef } from "react";
import { CottonCandyContext } from "../providers/ContextProvider";
import AnimatedElement from "./UI/AnimatedElement";
import { ANIMATION_WEBM_SOURCES } from "../constants/animatedElements";
import { useWallet } from "@solana/wallet-adapter-react";
import Nav from "./UI/Nav";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import TopBar from "./topbar";
import { motion } from "framer-motion";

const HeroSection = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const catRef = useRef<HTMLImageElement | null>(null);
  const ctx = useContext(CottonCandyContext);

  const { connected, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  const isMouthOpenCheck = () =>
    catRef.current?.src.includes("open") ? true : false;

  const handleMouseDown = () => {
    console.log("src", catRef.current?.src);

    if (!catRef.current) return;

    const isMouthOpen = isMouthOpenCheck();

    if (!isMouthOpen) {
      catRef.current.src = "/images/section-hero/memcoin2.open.png";

      if (!audioRef.current) {
        audioRef.current = new Audio("./sound/pop-cat.mp3");
        audioRef.current.volume = 1;
      }
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleMouseUp = () => {
    if (!catRef.current) return;

    const isMouthOpen = isMouthOpenCheck();

    if (isMouthOpen) {
      catRef.current.src = "/images/section-hero/memcoin2.png";
      // catRef.current?.classList.remove("bg-hero-section-memcoin-2-open");
      // catRef.current?.classList.add("bg-hero-section-memcoin-2");
    }
  };

  const handleGoToMintSection = async () => {
    if (!connected) {
      if (!connected) {
        setVisible(true);
        return;
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
    <div className="   h-screen w-screen relative bg-hero-section-upper bg-no-repeat bg-cover flex flex-col overflow-clip">
      <TopBar />
      <div className="  flex flex-row justify-between items-center  md:px-10 md:py-5 py-2 px-4 z-20">
        <div className="flex justify-center items-center">
          <img
            src="/images/logo-header.png"
            className="w-12 md:w-20 mr-1 md:mr-2"
          />
          <h1 className="font-impact text-sm md:text-xl lg:text-3xl uppercase text-white md:tracking-wider md:leading-8">
            Cotton Candy <br />
            Crusader Club
          </h1>
        </div>
        <button
          className={`bg-hero-connect w-28 h-16 md:w-[210px] bg-contain bg-no-repeat group relative`}
          onClick={handleGoToMintSection}
        >
          <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20 transition duration-200 z-20"></span>
          <span className="absolute inset-0 w-full h-full grid place-content-center uppercase font-patrick-hand lg:text-[1.5em] text-xl text-white leading-none  z-30">
            {connected ? "Disconnect" : "Connect"}
          </span>
        </button>
      </div>
      <Nav className={"flex-1 absolute bottom-[25%] z-40"} />
      <div className="  bg-hero-section-lower bg-no-repeat bg-cover h-[20%] bg-end absolute bottom-0 left-0 right-0"></div>
      <div className="  bg-hero-section-logo max-w-[700px] max-h-[400px] min-w-[288px] h-[25%] w-[50%] min-h-[149px] bg-no-repeat bg-contain bg-bottom absolute left-[50%] -translate-x-[50%] lg:top-[10%] top-[13%]"></div>
      {/* casltes  red*/}
      <div className="relative md:static top-[75%] md:top-auto">
        <div className=" bg-hero-section-castle-red-1 max-w-[344px] max-h-[475px] min-h-[181px] w-[30%] h-[35.24%] min-w-[134px] bg-contain bg-no-repeat absolute z-[1] md:bottom-[50%]  lg:bottom[50%]  bottom-[12rem] md:left-0"></div>

        <motion.div
          initial={{ y: 20 }}
          whileHover={{ y: -20 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 12,
            mass: 0.5,
          }}
          className="bg-hero-section-frog  max-w-[211px] max-h-[230px] h-[17%] w-[15.7%] min-h-[69px] bottom-[50%] min-w-[61px] bg-contain bg-no-repeat z-10 absolute  left-0  bg-left-bottom"
        ></motion.div>
        <div className="bg-hero-section-chillguy lg:w-[352px] max-h-[341px] h-[25.30%] w-[26%] min-w-[117px] min-h-[111px] bg-contain z-10 absolute md:bottom-[50%] bottom-[10rem] md:left-[6%] left-[9%]  bg-bottom bg-no-repeat"></div>
        <div className=" bg-hero-section-castle-red-2  pointer-events-none  max-w-[400px] max-h-[619px] min-w-[162px] min-h-[230px]  bg-left-bottom   h-[50%] w-[37%] bg-contain bg-no-repeat absolute bottom-[12%] z-30"></div>
        <div className=" bg-[#1e1e1e] md:max-w-[250px] -mt-1 first-letter:  max-w-28 max-h-[320px] md:min-w-[210px] min-w-28 min-h-[160px] md:max-h-[380px]  bg-left-bottom   h-[50%] md:w-[37%] w-[25%] bg-contain bg-no-repeat absolute bottom-[12%] z-10"></div>
        <div className="bg-hero-section-memcoin-1 max-w-[273px] max-h-[319px] w-[20%] h-[24%] min-w-[70px] min-h-[78px] absolute top-[53%] left-[0%] z-20 md:block hidden bg-contain bg-no-repeat"></div>
      </div>
      <div className="bg-hero-section-red-1 lg:w-[96px] lg:h-[88px] w-[50px] h-[54px]  bg-contain bg-no-repeat  absolute  bottom-[5%] lg:left-[30%] left-[5%] z-10"></div>
      <div className="bg-hero-section-red-2 w-[72px] h-[72px] absolute bottom-[10%] left-[28%] z-10 hidden lg:block bg-contain"></div>
      <div className="bg-hero-section-shark-1 lg:w-[96px] lg:h-[96px] w-[50px] h-[50px]  bg-contain bg-no-repeat  absolute bottom-[8%] right-[25%] z-10"></div>
      <div className="bg-hero-section-shark-2 w-[64px] h-[63px] absolute top-[86%] right-[2%] hidden lg:block bg-contain z-10"></div>

      {/* <div className="bg-hero-section-main max-w-[680px] max-h-[582px] w-[50%] h-[43%] absolute bottom-0 min-h-[304px] min-w-[400px] bg-contain bg-no-repeat left-[33%] z-[31] hidden md:block"></div> */}
      {/* <AnimatedElement
          className="max-w-[800px] max-h-[1024px] w-[48%] h-[60%] absolute -bottom-[6%] min-h-[304px] min-w-[400px] bg-contain bg-no-repeat left-[33%] z-[31] hidden md:block"
          source={ANIMATION_WEBM_SOURCES["Dog"]}
        /> */}
      {/* <div
        ref={catRef}
        className="bg-hero-section-memcoin-2 max-w-[431px]  w-[31.2%] min-w-[144px] h-full bg-contain bg-no-repeat absolute lg:bottom-[1%] bottom-[4%] bg-left-bottom z-[31] md:left-[5%] left-[15%]"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="relative h-2/3 w-2/3">
          <div className=" bg-black/50 h-full w-full absolute bottom-0 left-0"></div>
        </div>
      </div> */}
      <img
        ref={catRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        src="/images/section-hero/memcoin2.png"
        draggable={false}
        alt=""
        className="w-[31%] max-w-[331px] object-bottom h-auto pointer-events-all hover:cursor-pointer absolute bottom-0 z-[31] md:left-[5%] left-[15%]"
      ></img>
      <AnimatedElement
        className="absolute object-contain w-[50%]  md:w-[50%] h-[80.48%] max-w-[550px] max-h-[600px] min-w-[147px] min-h-[176px] lg:-bottom-[0%]  md:-bottom-[4%] -bottom-[14%] md:left-[10%] -left-[12%] z-30"
        source={ANIMATION_WEBM_SOURCES["magic"]}
      />
      {/* <div className="bg-hero-section-memcoin-3 max-w-[418px] max-h-[504px] w-[31%] h-[37.48%] min-w-[147px] min-h-[176px] bg-contain bg-no-repeat bg-bottom  absolute bottom-[14%] md:left-[15%] left-[0%] z-30"></div> */}
      <div className="bg-hero-section-distant pointer-events-none lg:h-[68%] md:h-[65%] w-[100%] min-w-[300px] min-h-[200px] bg-contain lg:bg-repeat-x bg-no-repeat bg-bottom absolute bottom-[16%] z-0"></div>
      {/* castle-blue */}
      <div className="relative md:static top-[75%] md:top-auto">
        <div className="bg-hero-section-castle-blue-1 pointer-events-none max-w-[344px] max-h-[475px] min-h-[181px] w-[30%] h-[35.24%] min-w-[134px] bg-contain bg-no-repeat absolute z-0 md:bottom-[50%]  lg:bottom[50%] bottom-[12rem] bg-right-bottom right-0"></div>
        <motion.div
          initial={{ y: 20 }}
          whileHover={{ y: -20 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 12,
            mass: 0.5,
          }}
          className="bg-hero-section-memcoin-4  max-w-[199px] maxh-[229px] min-w-[71px] w-[15%] h-[17%] min-h-[82px] bg-contain bg-no-repeat z-10 absolute bottom-[48%] right-0 bg-right-bottom"
        ></motion.div>
        <div className="bg-hero-section-memcoin-8  max-w-[401px] max-h-[403px] w-[30%] h-[30%] min-w-[133px] min-h-[131px] bg-contain bg-no-repeat bg-bottom z-10 absolute md:top-[23%] bottom-[10rem] md:right-[3%]  right-[6%]"></div>
        <div className="bg-hero-section-castle-blue-2 pointer-events-none max-w-[465px] max-h-[606px] h-[46%] w-[37%]  absolute min-h-[221px] min-w-[168px] bg-contain bg-no-repeat bg-right-bottom z-30 right-0 bottom-[12%]"></div>

        <div className="bg-hero-section-memcoin-5 max-w-[346px] max-h-[432px] w-[25.68%] h-[32%] min-w-[137px] min-h-[171px] bg-contain bg-no-repeat z-30 absolute -bottom-4 md:bottom-[10%] right-[10%] bg-right-bottom "></div>
        <div className="bg-hero-section-memcoin-6 max-w-[350px] max-h-[434px] min-w-[119px] min-h-[147px] w-[25.68%] h-[32%] bg-contain bg-no-repeat z-[31]  absolute -top-24 md:top-[68%] lg:right-[6%] bg-right-bottom  right-[0%]"></div>
        <AnimatedElement
          className="md:w-[400px] md:h-[300px] w-[250px] origin-center  h-[200px] object-contain bg-no-repeat z-[31]  absolute  md:block hidden -bottom-[10%] lg:-bottom-[6%] bg-bottom  lg:right-[10%] right-[0%]"
          source={ANIMATION_WEBM_SOURCES["fire"]}
        />
        <div className="bg-hero-section-memcoin-7 max-w-[299px] max-h-[351px] w-[22%] h-[26%] min-w-[119px] min-h-[147px] z-30 absolute top-[63%] bg-contain bg-no-repeat  -right-[0%] bg-right hidden md:block "></div>
      </div>
    </div>
  );
};

export default HeroSection;
