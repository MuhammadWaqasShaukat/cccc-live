import { useContext, useEffect, useRef } from "react";
import { CottonCandyContext } from "../providers/ContextProvider";
import AnimatedElement from "./UI/AnimatedElement";
import { ANIMATION_WEBM_SOURCES } from "../constants/animatedElements";
import { useWallet } from "@solana/wallet-adapter-react";
import Nav from "./UI/Nav";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import TopBar from "./topbar";
import { motion } from "framer-motion";
import {
  SpriteAnimationConfig,
  useSpriteAnimation,
} from "../hooks/useSpriteAnimation";
import copyStyles from "../utils/copyStyles";

const HeroSection = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const catRef = useRef<HTMLImageElement | null>(null);
  const catContainerRef = useRef<HTMLDivElement>(null);
  const ctx = useContext(CottonCandyContext);

  const { connected, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  const fireRef = useRef<HTMLVideoElement>(null);
  const magicRef = useRef<HTMLVideoElement>(null);
  const candleRef = useRef<HTMLVideoElement>(null);
  const whaleRef = useRef<HTMLVideoElement>(null);

  // anchors

  const anchor_0_Ref = useRef<HTMLDivElement>(null);

  // menu ref
  const tombstoneRef = useRef<any>(null);

  const animationConfig: SpriteAnimationConfig = {
    frameWidth: 164,
    frameHeight: 164,
    columns: 5,
    rows: 9,
    spriteAnimationSpeed: 50,
    bowReleasedFrame: 24,
  };

  const animationRedConfig: SpriteAnimationConfig = {
    frameWidth: 164,
    frameHeight: 164,
    columns: 5,
    rows: 10,
    spriteAnimationSpeed: 50,
    bowReleasedFrame: 7,
  };

  // red

  const arrowRedRef = useRef<HTMLDivElement>(null);

  const redCastleBottomRef = useRef<HTMLDivElement>(null);
  const archerRedContainerRef = useRef<HTMLDivElement>(null);
  const redSpriteRef = useRef<HTMLDivElement>(null);
  const pathRedRef = useRef<SVGPathElement>(null);
  const redSvgRef = useRef<SVGSVGElement>(null);
  const redRangeRef = useRef<HTMLDivElement>(null);
  const redTrajectoryStartRef = useRef<HTMLDivElement>(null);
  const redTrajectoryEndRef = useRef<HTMLDivElement>(null);

  // blue
  const candleFireRef = useRef<HTMLDivElement>(null);

  const blueCastleBottomRef = useRef<HTMLDivElement>(null);
  const archerBlueContainerRef = useRef<HTMLDivElement>(null);
  const blueSpriteRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const blueSvgRef = useRef<SVGSVGElement>(null);
  const blueRangeRef = useRef<HTMLDivElement>(null);
  const BlueTrajectoryStartRef = useRef<HTMLDivElement>(null);
  const BlueTrajectoryEndRef = useRef<HTMLDivElement>(null);

  const {
    playAnimation: playCandleArcherAnimation,
    stopAnimation: stopCandleArcherAnimation,
  } = useSpriteAnimation({
    spriteRef: blueSpriteRef,
    pathRef,
    rangeRef: blueRangeRef,
    svgRef: blueSvgRef,
    startPathRef: BlueTrajectoryStartRef,
    endPathRef: BlueTrajectoryEndRef,
    projectileRef: candleFireRef,
    config: animationConfig,
  });
  const {
    playAnimation: playLighteningArcherAnimation,
    stopAnimation: stopLighteningArcherAnimation,
  } = useSpriteAnimation({
    spriteRef: redSpriteRef,
    pathRef: pathRedRef,
    rangeRef: redRangeRef,
    svgRef: redSvgRef,
    startPathRef: redTrajectoryStartRef,
    endPathRef: redTrajectoryEndRef,
    projectileRef: arrowRedRef,
    config: animationRedConfig,
  });

  const setArcherPosition = (
    anchor: HTMLElement,
    archer: HTMLElement,
    offset: number
  ) => {
    const rect = anchor.getBoundingClientRect();
    archer.style.top = `${rect.top - offset}px`;
    archer.style.opacity = "1";
  };

  const positionedArcher = () => {
    const blueCastleEl = document.getElementById("blueCastleBottom");
    const archerEl = document.getElementById("archerContainer");

    const redCastleEl = document.getElementById("redCastleBottom");
    const archerRedEl = document.getElementById("archerRedContainer");

    if (blueCastleEl && archerEl && redCastleEl && archerRedEl) {
      setTimeout(() => {
        setArcherPosition(blueCastleEl, archerEl, 50);
        setArcherPosition(redCastleEl, archerRedEl, 80);
      }, 10);
    }
  };

  useEffect(() => {
    if (!ctx.assestsPreloaded) return;

    tombstoneRef.current = document.getElementById("tombstone");
    const positionElement = () => {
      copyStyles(anchor_0_Ref, tombstoneRef, { bottom: true });
      copyStyles(anchor_0_Ref, catContainerRef, { bottom: true });
    };

    positionedArcher();
    window.addEventListener("resize", positionedArcher);
    window.addEventListener("resize", positionElement);

    return () => {
      window.removeEventListener("resize", positionedArcher);
      window.removeEventListener("resize", positionElement);
    };
  }, [ctx.assestsPreloaded]);

  useEffect(() => {
    const refs = [fireRef, magicRef, candleRef];
    const CHECK_INTERVAL = 100;

    let intervalId: number;

    const areAllVideosReady = () => {
      return refs.every((ref) => {
        const video = ref.current;
        return video && video.readyState >= 3;
      });
    };

    const checkReadyStates = () => {
      if (areAllVideosReady()) {
        console.count("ready videos");

        clearInterval(intervalId);
        ctx.setAssestsPreloaded(true);
      }
    };

    refs.forEach((ref) => {
      ref.current?.load();
    });

    intervalId = window.setInterval(checkReadyStates, CHECK_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  const handleMouseEnter = (videoRef: any) => {
    videoRef.current?.play();
  };

  const handleMouseLeave = (videoRef: any) => {
    videoRef.current.currentTime = 0;
    videoRef.current?.pause();
  };

  const isMouthOpenCheck = () =>
    catRef.current?.src.includes("open") ? true : false;

  const handleMouseDown = () => {
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
    }
  };

  const handleConnect = async () => {
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
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: ctx.assestsPreloaded ? 1 : 0,
      }}
      transition={{
        opacity: {
          duration: 0.3,
        },
      }}
    >
      <div className="relative  flex flex-col w-screen h-screen overflow-hidden bg-black bg-no-repeat bg-cover bg-hero-section-upper sm:overflow-clip">
        <TopBar />
        <div className="z-20 flex flex-row items-center justify-between px-4 py-2 md:px-10 md:py-5">
          <div className="flex items-center justify-center">
            <img
              src="/images/logo-header.png"
              className="w-12 mr-1 md:w-20 md:mr-2"
            />
            <h1 className="text-sm text-white uppercase font-impact md:text-xl lg:text-3xl md:tracking-wider md:leading-8">
              Cotton Candy <br />
              Crusader Club
            </h1>
          </div>
          <button
            className={`bg-hero-connect sm:min-w-52 sm:min-h-16 min-h-12 min-w-40 md:w-[210px] bg-contain bg-no-repeat group relative `}
            onClick={handleConnect}
          >
            <span className="absolute inset-0 z-20 transition duration-200 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20"></span>
            <span className="absolute inset-0 w-full h-full grid place-content-center uppercase font-patrick-hand lg:text-[1.5em] text-xl text-white leading-none  z-30">
              {connected ? "Disconnect" : "Connect"}
            </span>
          </button>
        </div>
        <Nav className={"flex-1 absolute bottom-[25%] z-40"} />
        <div className="bg-hero-section-lower  bg-no-repeat bg-cover h-[20%] bg-end absolute bottom-0 left-0 right-0"></div>
        <div className="bg-hero-section-logo max-w-[700px] max-h-[400px] min-w-[288px] h-[35%] w-[50%] min-h-[149px] bg-no-repeat bg-contain bg-bottom absolute left-[50%] -translate-x-[50%] top-[5%]"></div>

        {/* Heroes */}
        {/* casltes  red*/}
        <div className="block relative md:static top-[75%] md:top-auto">
          <div className=" bg-hero-section-castle-red-1 max-w-[344px] max-h-[475px] min-h-[181px] w-[30%] h-[35.24%] min-w-[134px] bg-contain bg-no-repeat absolute z-[1] md:bottom-[46%] lg:bottom-[50%]  bottom-[11rem] bg-left-bottom  md:left-0"></div>

          {/* Command : red */}
          <motion.div
            initial={{ y: 20 }}
            whileHover={{ y: -20 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 12,
              mass: 0.5,
            }}
            className="bg-hero-section-frog hidden md:block  max-w-[211px] max-h-[230px] h-[17%] w-[15.7%] min-h-[69px] md:bottom-[42%] lg:bottom-[50%] min-w-[61px] bg-contain bg-no-repeat z-10 absolute  left-0  bg-left-bottom"
          ></motion.div>

          {/* Archer: red */}
          <div
            id="archerRedContainer"
            ref={archerRedContainerRef}
            className="candleFireRef lg:w-[60%] md:w-[75%] h-fit  w-[85%] max-w-[370px] md:max-w-[550px] top-[30%] z-10 -left-24 absolute candleFireRef "
          >
            <div className="relative flex flex-col items-center justify-end h-full ">
              <div className=" absolute h-full w-[20%] left-8 z-[999]"></div>

              <div
                ref={redRangeRef}
                className="fixed w-1/2 bottom-40 h-2/3 left-64 z-100"
              >
                <div className="relative w-full h-full">
                  <svg
                    ref={redSvgRef}
                    style={{ position: "absolute", top: 0, left: 0 }}
                  >
                    <path
                      ref={pathRedRef}
                      stroke="none"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>

                  <motion.div
                    ref={arrowRedRef}
                    style={{
                      opacity: "0",
                      position: "absolute",
                      width: "80px",
                      height: "20px",
                      transformOrigin: "center center",
                      pointerEvents: "none",
                    }}
                  >
                    <img
                      src="/images/arrow-lightning.png"
                      alt="arrow"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </motion.div>
                  <div
                    ref={redTrajectoryEndRef}
                    className="absolute bottom-0 right-0 h-1  w-[300px] "
                  ></div>

                  <div
                    ref={redTrajectoryStartRef}
                    className="absolute top-[28%] left-0 w-1 h-4"
                  ></div>
                </div>
              </div>

              <div
                onMouseEnter={playLighteningArcherAnimation}
                onMouseLeave={stopLighteningArcherAnimation}
                ref={redSpriteRef}
                className="sprite-container absolute top-0  z-0"
                style={{
                  width: `${animationRedConfig.frameWidth}px`,
                  height: `${animationRedConfig.frameHeight}px`,
                  backgroundImage:
                    "url(images/archer-red-ezgif.com-gif-to-sprite-converter.png)",
                  backgroundSize: `${animationRedConfig.columns * 100}% ${
                    animationRedConfig.rows * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>

          <div className=" max-w-[400px] max-h-[435px] min-w-[162px] min-h-[230px] h-[50%] w-[37%] absolute bottom-[12%] ">
            <div
              id="redCastleBottom"
              ref={redCastleBottomRef}
              className="relative z-30 w-full h-full bg-left-bottom bg-no-repeat bg-contain pointer-events-none bg-hero-section-castle-red-2"
            ></div>
            <div className=" black-wall min-w-[120px] -mt-1 bg-left-bottom md:w-[65%] w-[60%] xs:w-[62%] lg:w-[62.2%] md:h-[68%] lg:h-[70%] sm:w-[50%] h-[70%]   bg-contain bg-no-repeat absolute bottom-0 z-10"></div>
          </div>
          {/* Light Saber: red */}
          <div className="bg-hero-section-memcoin-1 bg-left-bottom hidden md:block max-w-[273px] max-h-[319px] w-[20%] h-[24%] min-w-[70px] min-h-[78px] absolute lg:bottom-[11%] md:bottom-[11%] bottom-[5%] left-[0%] z-20 bg-contain bg-no-repeat"></div>
        </div>

        <div className=" bg-hero-section-red-1 lg:w-[96px] lg:h-[88px] w-[50px] h-[54px]  bg-contain bg-no-repeat  absolute  bottom-[5%] lg:left-[30%] left-[5%] z-10"></div>
        <div className="bg-hero-section-red-2 w-[72px] h-[72px] absolute bottom-[10%] left-[28%] z-10 hidden lg:block bg-contain"></div>
        <div className=" bg-hero-section-shark-1 lg:w-[96px] lg:h-[96px] w-[50px] h-[50px]  bg-contain bg-no-repeat  absolute bottom-[8%] right-[25%] z-10"></div>
        <div className="bg-hero-section-shark-2 w-[64px] h-[63px] absolute top-[86%] right-[2%] hidden lg:block bg-contain z-10"></div>
        {/* Cavlary : red */}

        <div
          ref={catContainerRef}
          className=" xs:w-[31%] w-[40%]  max-w-[275px] object-bottom h-auto guide  absolute bottom-0  md:left-[5%]  left-[15%] z-40"
        >
          <div className="relative flex flex-col items-center justify-start ">
            <div
              className=" absolute h-28 w-28 top-[15%] -ml-9 pointer-events-auto"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            ></div>
            <img
              ref={catRef}
              src="/images/section-hero/memcoin2.png"
              draggable={false}
              alt=""
              className=""
            ></img>
          </div>
        </div>
        {/* Wizard: red */}
        <div className=" absolute object-contain w-[40%] lg:w-[26%] bottom-[5%] lg:min-w-[400px] max-w-[500px]  max-h-[600px] min-w-[230px] min-h-[176px]   md:bottom-[7%] sm:bottom-[9%] md:left-[12%] lg:left-[8%] -left-[12%] z-30">
          <div className="relative flex flex-col items-center justify-end ">
            <div
              className=" absolute  md:h-48 lg:h-56 md:w-32 sm:h-48 sm:w-28 w-16 h-[50%] top-24 sm:-ml-28 -ml-16 sm:mb-2 md:top-40 sm:top-24  z-[999]"
              onMouseEnter={() => handleMouseEnter(magicRef)}
              onMouseLeave={() => handleMouseLeave(magicRef)}
            ></div>
            <AnimatedElement
              videoRef={magicRef}
              className=""
              source={ANIMATION_WEBM_SOURCES["magic"]}
            />
          </div>
        </div>
        <div className=" bg-hero-section-distant  lg:h-[68%] md:h-[65%] w-[100%] min-w-[300px] min-h-[200px] bg-contain sm:bg-repeat-x bg-no-repeat bg-bottom absolute sm:bottom-[16%] bottom-[18%] z-0"></div>
        {/* castle-blue */}
        <div className=" relative md:static top-[75%] md:top-auto">
          <div className="bg-hero-section-castle-blue-1  max-w-[344px] max-h-[475px] min-h-[181px] w-[30%] h-[35.24%] min-w-[134px] bg-contain bg-no-repeat absolute z-0 md:bottom-[44%]  lg:bottom-[50%] bottom-[11rem] bg-right-bottom right-0"></div>
          <motion.div
            initial={{ y: 20 }}
            whileHover={{ y: -20 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 12,
              mass: 0.5,
            }}
            className="bg-hero-section-memcoin-4 hidden md:block  max-w-[140px] max-h-[229px] min-w-[71px] w-[15%] h-[17%] min-h-[82px] bg-contain bg-no-repeat z-10 absolute md:bottom-[42%] lg:bottom-[48%] right-0 bg-right-bottom"
          ></motion.div>

          <div
            id="archerContainer"
            ref={archerBlueContainerRef}
            className="fixed candleFireRef lg:w-[60%] opacity-0 md:w-[75%] h-fit w-[85%] max-w-[370px] md:max-w-[550px] lg:max-w-[650px] top-[30%]  -right-24 z-0"
          >
            <div className="relative flex flex-col items-center justify-end h-full ">
              <div
                ref={blueRangeRef}
                className="fixed w-1/2 bottom-40 h-2/3 right-64 z-100"
              >
                <div className="relative w-full h-full">
                  <svg
                    ref={blueSvgRef}
                    style={{ position: "absolute", top: 0, left: 0 }}
                  >
                    <path
                      ref={pathRef}
                      stroke="none"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>

                  <motion.div
                    ref={candleFireRef}
                    style={{
                      opacity: "0",
                      position: "absolute",
                      width: "80px",
                      height: "20px",
                      transformOrigin: "center center",
                      pointerEvents: "none",
                    }}
                  >
                    <img
                      src="/images/arrow-candle.png"
                      alt="arrow"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </motion.div>
                  <div
                    ref={BlueTrajectoryEndRef}
                    className="absolute bottom-0 left-0 h-1 w-[300px]"
                  ></div>

                  <div
                    ref={BlueTrajectoryStartRef}
                    className="absolute top-[39%] right-0 w-1 h-4"
                  ></div>
                </div>
              </div>

              <div
                onMouseEnter={playCandleArcherAnimation}
                onMouseLeave={stopCandleArcherAnimation}
                ref={blueSpriteRef}
                className="sprite-container absolute top-0 z-0"
                style={{
                  width: `${animationConfig.frameWidth}px`,
                  height: `${animationConfig.frameHeight}px`,
                  backgroundImage:
                    "url(/images/archer-blue-ezgif.com-gif-to-sprite-converter.png)",
                  backgroundSize: `${animationConfig.columns * 100}% ${
                    animationConfig.rows * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>

          <div
            id="blueCastleBottom"
            ref={blueCastleBottomRef}
            className="bg-hero-section-castle-blue-2   pointer-events-none  max-w-[465px] lg:max-h-[600px] max-h-[380px] h-[46%] w-[37%]  absolute min-h-[221px] min-w-[168px] bg-contain bg-no-repeat bg-right-bottom z-30 right-0 bottom-[12%]"
          ></div>
          {/* whale */}
          <div className=" absolute  object-contain pointer-events-none  xl:w-[18%] xl:min-w-[240px] md:min-w-[220px] max-w-[350px] max-h-[434px] min-w-[150px] min-h-[147px] lg:w-[20%] md:w-[24%] w-[26%]  h-[32%] xl:bottom-[9%]  md:bottom-[5%]  lg:right-[10%]  sm:right-[10%] right-[6%] z-40">
            <div className="relative flex flex-col items-center justify-end ">
              <div
                className=" absolute  md:h-64 md:w-24 sm:h-48 sm:w-28 w-16 h-[70%]  ml-4 sm:mb-2 pointer-events-auto   z-[999]"
                onMouseEnter={() => handleMouseEnter(whaleRef)}
                onMouseLeave={() => handleMouseLeave(whaleRef)}
              ></div>
              <AnimatedElement
                videoRef={whaleRef}
                className=""
                source={ANIMATION_WEBM_SOURCES["whale"]}
              />
            </div>
          </div>

          {/* <div className="bg-hero-section-memcoin-5 max-w-[346px] max-h-[432px] sm:w-[25.68%] w-[30%] h-[32%] min-w-[200px] min-h-[171px] bg-contain bg-no-repeat z-30 absolute -bottom-4 md:bottom-[10%] right-[10%] bg-right-bottom "></div> */}

          {/* candle wizard */}

          <div className=" absolute object-contain  xl:w-[13%] xl:min-w-[240px] pointer-events-none  md:min-w-[220px] max-w-[350px] max-h-[434px] min-w-[150px] min-h-[147px] lg:w-[14%] md:w-[21%] w-[25%]  h-[32%] xl:bottom-[6%]  md:bottom-[2%]  lg:right-[5%] bg-right-bottom -bottom-8 sm:right-[5%] right-[3%] z-40">
            <div className="relative flex flex-col items-center justify-end ">
              <div
                className=" absolute  md:h-64 md:w-24 sm:h-48 sm:w-28 w-16 h-[70%] pointer-events-auto  ml-4 sm:mb-2   z-[999]"
                onMouseEnter={() => handleMouseEnter(candleRef)}
                onMouseLeave={() => handleMouseLeave(candleRef)}
              ></div>
              <AnimatedElement
                videoRef={candleRef}
                className=""
                source={ANIMATION_WEBM_SOURCES["candle"]}
              />
            </div>
          </div>

          <div className="hidden lg:block  md:w-[400px] md:h-[300px] w-[250px] origin-center  h-[200px] bg-no-repeat z-[31]  absolute -bottom-[10%] lg:bottom-[4%] bg-bottom  lg:right-[18%] right-[0%]">
            <div className="relative flex flex-col items-center justify-end ">
              <div
                className=" absolute h-28 w-24 -ml-2 top-52 z-[999]"
                onMouseEnter={() => handleMouseEnter(fireRef)}
                onMouseLeave={() => handleMouseLeave(fireRef)}
              ></div>
              <AnimatedElement
                videoRef={fireRef}
                className="object-contain "
                source={ANIMATION_WEBM_SOURCES["fire"]}
              />
            </div>
          </div>
          <div className="bg-hero-section-memcoin-7 md:block hidden max-w-[299px] max-h-[351px] w-[22%] h-[26%] min-w-[119px] min-h-[147px] z-30 absolute top-[63%] bg-contain bg-no-repeat  -right-[0%] bg-right "></div>
        </div>

        {/*anchor-2*/}
        <div className="w-full h-0.5 absolute bottom-[15%] guide"></div>

        {/*anchor-1*/}
        <div className="w-full h-0.5 absolute bottom-[12%] guide"></div>

        {/*anchor-0*/}
        <div
          ref={anchor_0_Ref}
          className="w-full h-0.5 absolute bottom-[5%] guide"
        ></div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
