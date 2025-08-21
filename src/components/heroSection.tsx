import { useContext, useEffect, useRef, useState } from "react";
import { CottonCandyContext } from "../providers/ContextProvider";
import { useWallet } from "@solana/wallet-adapter-react";
import Nav from "./UI/Nav";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import TopBar from "./topbar";
import { motion } from "framer-motion";
import {
  SpriteAnimationConfig,
  useSpriteAnimation,
} from "../hooks/useSpriteAnimation";
import anchorElement from "../utils/anchorELement";
import { useSpriteAnimationSimple } from "../hooks/useAnimations";

type Dimensions = { width: number; height: number };

const HeroSection = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const catRef = useRef<HTMLImageElement | null>(null);
  const catContainerRef = useRef<HTMLDivElement>(null);
  const ctx = useContext(CottonCandyContext);

  const { connected, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  const heroesDimensions = useRef(
    new WeakMap<React.RefObject<HTMLElement>, Dimensions>()
  );

  const [boltArcherDimension, setBoltArcherDimension] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const [candleArcherDimension, setCandleArcherDimension] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const fireRef = useRef<HTMLDivElement>(null);
  const magicRef = useRef<HTMLDivElement>(null);
  const candleRef = useRef<HTMLDivElement>(null);
  const whaleRef = useRef<HTMLDivElement>(null);
  const swordmanRef = useRef<HTMLDivElement>(null);

  // anchors
  const anchor_Ref = useRef<HTMLDivElement>(null);
  const anchor_0_Ref = useRef<HTMLDivElement>(null);
  const anchor_1_Ref = useRef<HTMLDivElement>(null);
  const anchor_2_Ref = useRef<HTMLDivElement>(null);

  // menu ref
  const tombstoneRef = useRef<any>(null);

  // fired projectilrs refs

  const candleOneRef = useRef<HTMLDivElement>(null);
  const candleTwoRef = useRef<HTMLDivElement>(null);

  const arrowOneRef = useRef<HTMLDivElement>(null);
  const arrowTwoRef = useRef<HTMLDivElement>(null);

  // heroes ref

  const redCastleLightSaberRef = useRef<HTMLDivElement>(null);

  const animationConfig: SpriteAnimationConfig = {
    frameWidth: candleArcherDimension.width || 96,
    frameHeight: candleArcherDimension.height || 96,
    columns: 5,
    rows: 9,
    spriteAnimationSpeed: 50,
    bowReleasedFrame: 24,
  };

  const animationRedConfig: SpriteAnimationConfig = {
    frameWidth: boltArcherDimension.width || 96,
    frameHeight: boltArcherDimension.height || 96,
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

  // blue
  const candleFireRef = useRef<HTMLDivElement>(null);

  const blueCastleBottomRef = useRef<HTMLDivElement>(null);
  const archerBlueContainerRef = useRef<HTMLDivElement>(null);
  const blueSpriteRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const blueSvgRef = useRef<SVGSVGElement>(null);
  const blueRangeRef = useRef<HTMLDivElement>(null);
  const blueTrajectoryStartRef = useRef<HTMLDivElement>(null);

  const {
    playAnimation: playCandleArcherAnimation,
    stopAnimation: stopCandleArcherAnimation,
  } = useSpriteAnimation({
    spriteRef: blueSpriteRef,
    pathRef,
    rangeRef: blueRangeRef,
    svgRef: blueSvgRef,
    startPathRef: blueTrajectoryStartRef,
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
    projectileRef: arrowRedRef,
    config: animationRedConfig,
  });

  const positionedArcher = () => {
    const blueCastleEl = document.getElementById("blueCastleBottom");

    const redCastleEl = document.getElementById("redCastleBottom");
    // resize the archer

    if (blueCastleEl) {
      const castleRect = blueCastleEl.getBoundingClientRect();
      const archerSize = castleRect.width * 0.45;
      setBoltArcherDimension({ width: archerSize, height: archerSize });

      if (
        blueSpriteRef.current &&
        blueRangeRef.current &&
        blueTrajectoryStartRef.current
      ) {
        const archer = blueSpriteRef.current.getBoundingClientRect();
        blueRangeRef.current.style.right = `${
          window.innerWidth - archer?.left
        }px`;
        blueTrajectoryStartRef.current.style.top = `${archer.top}px`;
      }
    }

    if (redCastleEl) {
      const castleRect = redCastleEl.getBoundingClientRect();
      const archerSize = castleRect.width * 0.5;
      setCandleArcherDimension({ width: archerSize, height: archerSize });
      if (
        redSpriteRef.current &&
        redRangeRef.current &&
        redTrajectoryStartRef.current
      ) {
        const archer = redSpriteRef.current.getBoundingClientRect();
        redRangeRef.current.style.left = `${archer.right}px`;
        redTrajectoryStartRef.current.style.top = `${archer.top}px`;
      }
    }
  };

  const resizeHeroes = () => {
    // lightening heroes

    const redCastleEl = document.getElementById("redCastleBottom");
    const castleRect = redCastleEl?.getBoundingClientRect();

    if (castleRect) {
      if (magicRef.current) {
        heroesDimensions.current.set(magicRef, {
          width: castleRect.width * 0.75,
          height: castleRect.width * 0.75,
        });
      }
      if (candleRef.current) {
        heroesDimensions.current.set(candleRef, {
          width: castleRect.width * 0.5,
          height: castleRect.width * 0.5,
        });
      }
      if (whaleRef.current) {
        heroesDimensions.current.set(whaleRef, {
          width: castleRect.width * 0.75,
          height: castleRect.width * 0.75,
        });
      }
      if (fireRef.current) {
        heroesDimensions.current.set(fireRef, {
          width: castleRect.width * 0.5,
          height: (castleRect.width * 0.5) / 2,
        });
      }
    }
  };

  useEffect(() => {
    if (!ctx.assestsPreloaded) return;

    tombstoneRef.current = document.getElementById("tombstone");
    const positionElement = () => {
      anchorElement(anchor_0_Ref, tombstoneRef, { bottom: true });
      anchorElement(anchor_0_Ref, catContainerRef, { bottom: true });
      anchorElement(anchor_0_Ref, candleOneRef, { bottom: true });
      anchorElement(anchor_1_Ref, candleTwoRef, { bottom: true });
      anchorElement(anchor_0_Ref, arrowOneRef, { bottom: true });
      anchorElement(anchor_1_Ref, arrowTwoRef, { bottom: true });
      anchorElement(anchor_Ref, fireRef, { bottom: true });
      anchorElement(anchor_1_Ref, swordmanRef, { bottom: true });
      anchorElement(anchor_0_Ref, candleRef, { bottom: true });
      anchorElement(anchor_1_Ref, whaleRef, { bottom: true });
      anchorElement(anchor_2_Ref, magicRef, { bottom: true });
    };
    resizeHeroes();
    positionElement();
    positionedArcher();
    window.addEventListener("resize", positionedArcher);
    window.addEventListener("resize", positionElement);
    window.addEventListener("resize", resizeHeroes);

    return () => {
      window.removeEventListener("resize", positionedArcher);
      window.removeEventListener("resize", positionElement);
      window.removeEventListener("resize", resizeHeroes);
    };
  }, [ctx.assestsPreloaded]);

  useEffect(() => {
    ctx.setAssestsPreloaded(true);
  }, []);

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

  // sprite animations configs

  const fireAnimationConfig: SpriteAnimationConfig = {
    frameWidth: heroesDimensions.current.get(fireRef)?.width || 200,
    frameHeight: heroesDimensions.current.get(fireRef)?.height || 100,
    columns: 5,
    rows: 10,
    spriteAnimationSpeed: 100,
  };

  const candleAnimationConfig: SpriteAnimationConfig = {
    frameWidth: heroesDimensions.current.get(candleRef)?.width || 264,
    frameHeight: heroesDimensions.current.get(candleRef)?.height || 264,
    columns: 5,
    rows: 8,
    spriteAnimationSpeed: 100,
  };

  const whaleAnimationConfig: SpriteAnimationConfig = {
    frameWidth: heroesDimensions.current.get(whaleRef)?.width || 264,
    frameHeight: heroesDimensions.current.get(whaleRef)?.height || 264,
    columns: 9,
    rows: 10,
    spriteAnimationSpeed: 100,
  };

  const magicAnimationConfig: SpriteAnimationConfig = {
    frameWidth: heroesDimensions.current.get(magicRef)?.width || 300,
    frameHeight: heroesDimensions.current.get(magicRef)?.height || 300,
    columns: 5,
    rows: 10,
    spriteAnimationSpeed: 100,
  };

  const { playAnimation: playFireAnimation, stopAnimation: stopFireAnimation } =
    useSpriteAnimationSimple({
      spriteRef: fireRef,
      config: fireAnimationConfig,
    });

  const {
    playAnimation: playMagicAnimation,
    stopAnimation: stopMagicAnimation,
  } = useSpriteAnimationSimple({
    spriteRef: magicRef,
    config: magicAnimationConfig,
  });
  const {
    playAnimation: playWhaleAnimation,
    stopAnimation: stopWhaleAnimation,
  } = useSpriteAnimationSimple({
    spriteRef: whaleRef,
    config: whaleAnimationConfig,
  });

  const {
    playAnimation: playCandleAnimation,
    stopAnimation: stopCandleAnimation,
  } = useSpriteAnimationSimple({
    spriteRef: candleRef,
    config: candleAnimationConfig,
  });

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
      <div className="relative   flex flex-col w-screen h-screen overflow-hidden bg-black bg-no-repeat bg-cover bg-hero-section-upper sm:overflow-clip">
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
        <div className="block relative md:static top-[75%] md:top-auto ">
          <div className=" bg-hero-section-castle-red-1 max-w-[344px] max-h-[475px] min-h-[181px] w-[30%] h-[35.24%] min-w-[134px] bg-contain bg-no-repeat absolute z-[1] md:bottom-[40%] lg:bottom-[50%]  bottom-[11rem] bg-left-bottom  md:left-0">
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
              className="bg-hero-section-frog hidden md:block   h-[47%] w-[50%] max-w-28 bg-contain bg-no-repeat z-10 absolute  left-0  bg-left-bottom -bottom-[5%]"
            ></motion.div>

            {/* Archer: red */}
            <div
              id="archerRedContainer"
              ref={archerRedContainerRef}
              className="absolute w-[60%] max-w-[350px] -bottom-[10%] z-10 lg:right-10 sm:right-8 right-6 "
            >
              <div className="relative flex flex-col items-center justify-end h-full ">
                <div
                  data-range="lightening-range"
                  ref={redRangeRef}
                  className="fixed md:w-1/2 w-1/3  bottom-40 h-2/3  left-52 z-100"
                >
                  <div className="relative w-full h-full ">
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
                      className=" md:w-20 md:h-5 w-12 h-3"
                      style={{
                        opacity: "0",
                        position: "absolute",
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
                      ref={redTrajectoryStartRef}
                      className="absolute top-[28%] left-0 w-1 h-4"
                    ></div>
                  </div>
                </div>

                <div
                  data-archer="arrow-archer"
                  onMouseEnter={playLighteningArcherAnimation}
                  onMouseLeave={stopLighteningArcherAnimation}
                  ref={redSpriteRef}
                  className="sprite-container absolute bottom-0 max-w-48 max-h-48 z-0"
                  style={{
                    width: `${animationRedConfig.frameWidth}px`,
                    height: `${animationRedConfig.frameHeight}px`,
                    backgroundImage:
                      "url(images/animations/sprites/archer-red.png)",
                    backgroundSize: `${animationRedConfig.columns * 100}% ${
                      animationRedConfig.rows * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="max-w-[400px] lg:max-h-[600px] max-h-[380px] h-[46%] w-[37%]   bg-bottom min-h-[221px] min-w-[168px]  absolute bottom-[12%] ">
            <div
              id="redCastleBottom"
              ref={redCastleBottomRef}
              className="relative z-30 w-full h-full bg-left-bottom bg-no-repeat bg-contain pointer-events-none bg-hero-section-castle-red-2"
            ></div>
            <div className=" black-wall min-w-[120px]  -mt-1 bg-left-bottom md:w-[65%] w-[60%] xs:w-[62%] lg:w-[62.2%] md:h-[68%] lg:h-[70%] sm:w-[50%] h-[70%]   bg-contain bg-no-repeat absolute bottom-0 z-10"></div>
          </div>
          {/* Light Saber: red */}
          <div
            ref={redCastleLightSaberRef}
            className="bg-hero-section-memcoin-1 bg-left-bottom hidden md:block max-w-[164px] max-h-[319px] w-[20%] h-[24%] min-w-[70px] min-h-[78px] absolute lg:bottom-[11%] md:bottom-[11%] bottom-[5%] left-[0%] z-20 bg-contain bg-no-repeat"
          ></div>
        </div>

        <div
          ref={candleOneRef}
          className=" bg-hero-section-red-1 lg:w-[96px] lg:h-[88px] w-[50px] h-[54px]  bg-contain bg-no-repeat  absolute  bottom-[5%] lg:left-[30%] left-[5%] z-10"
        ></div>
        <div
          ref={candleTwoRef}
          className="bg-hero-section-red-2 w-[72px] h-[72px] absolute bottom-[10%] left-[28%] z-10 hidden lg:block bg-contain"
        ></div>
        <div
          ref={arrowOneRef}
          className=" bg-hero-section-shark-1 lg:w-[96px] lg:h-[96px] w-[50px] h-[50px]  bg-contain bg-no-repeat  absolute bottom-[8%] right-[25%] z-10"
        ></div>
        <div
          ref={arrowTwoRef}
          className="bg-hero-section-shark-2 w-[64px] h-[63px] absolute top-[86%] right-[20%] hidden lg:block bg-contain z-10"
        ></div>
        {/* Cavlary : red */}

        <div
          ref={catContainerRef}
          className="w-[30%] max-w-48 object-bottom h-auto absolute bottom-0  md:left-[4%]  left-[15%] z-40"
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

        <div
          onMouseEnter={playMagicAnimation}
          onMouseLeave={stopMagicAnimation}
          ref={magicRef}
          className="sprite-container absolute md:bottom-[7%] sm:bottom-[15%] md:left-[15%] lg:left-[10%] min-w-42 min-h-42 left-0 z-30"
          style={{
            width: `${magicAnimationConfig.frameWidth}px`,
            height: `${magicAnimationConfig.frameHeight}px`,
            backgroundImage: "url(images/animations/sprites/magic-sprite.png)",
            backgroundSize: `${magicAnimationConfig.columns * 100}% ${
              magicAnimationConfig.rows * 100
            }%`,
          }}
        ></div>
        <div className=" bg-hero-section-distant  lg:h-[68%] md:h-[65%] w-[100%] min-w-[300px] min-h-[200px] bg-contain sm:bg-repeat-x bg-no-repeat bg-bottom absolute sm:bottom-[16%] bottom-[18%] z-0"></div>
        {/* castle-blue */}
        <div className="block relative md:static top-[75%] md:top-auto">
          <div className="bg-hero-section-castle-blue-1 max-w-[344px] max-h-[475px] min-h-[181px] w-[30%] h-[35.24%] min-w-[134px] bg-contain bg-no-repeat absolute z-0 md:bottom-[40%]  lg:bottom-[50%] bottom-[11rem] bg-right-bottom right-0">
            <motion.div
              initial={{ y: 20 }}
              whileHover={{ y: -20 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 12,
                mass: 0.5,
              }}
              className="bg-hero-section-memcoin-4 hidden md:block  w-[50%] max-w-28 h-[47%] bg-contain bg-no-repeat z-10 absolute right-0 bg-right-bottom -bottom-[5%]"
            ></motion.div>

            <div
              id="archerContainer"
              ref={archerBlueContainerRef}
              className="candleFireRef absolute  h-full w-[60%] max-w-[350px] -bottom-[10%] lg:left-10 sm:left-8 left-6 z-0"
            >
              <div className="relative flex flex-col items-center justify-end h-full ">
                <div
                  data-range="candle-range"
                  ref={blueRangeRef}
                  className="fixed w-1/2 bottom-40 h-2/3 right-64 z-100 pointer-events-none"
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
                      className=" md:w-20 md:h-5 w-12 h-3"
                      ref={candleFireRef}
                      style={{
                        opacity: "0",
                        position: "absolute",
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
                      ref={blueTrajectoryStartRef}
                      className="absolute top-[39%] right-0 w-1 h-4"
                    ></div>
                  </div>
                </div>

                <div
                  data-archer="candle-archer"
                  onMouseEnter={playCandleArcherAnimation}
                  onMouseLeave={stopCandleArcherAnimation}
                  ref={blueSpriteRef}
                  className="sprite-container absolute bottom-0 max-w-48 max-h-48 z-100"
                  style={{
                    width: `${animationConfig.frameWidth}px`,
                    height: `${animationConfig.frameHeight}px`,
                    backgroundImage:
                      "url(/images/animations/sprites/archer-blue.png)",
                    backgroundSize: `${animationConfig.columns * 100}% ${
                      animationConfig.rows * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div
            id="blueCastleBottom"
            ref={blueCastleBottomRef}
            className="bg-hero-section-castle-blue-2  pointer-events-none  max-w-[465px] lg:max-h-[600px] max-h-[380px] h-[46%] w-[37%]  absolute min-h-[221px] min-w-[168px] bg-contain bg-no-repeat bg-right-bottom z-30 right-0 bottom-[12%]"
          ></div>
        </div>

        <div
          onMouseEnter={playWhaleAnimation}
          onMouseLeave={stopWhaleAnimation}
          ref={whaleRef}
          className="sprite-container absolute max-w-56 max-h-56 bottom-0 sm:right-[4%] right-0 z-40 "
          style={{
            width: `${whaleAnimationConfig.frameWidth}px`,
            height: `${whaleAnimationConfig.frameHeight}px`,
            backgroundImage: "url(/images/animations/sprites/whale-sprite.png)",
            backgroundSize: `${whaleAnimationConfig.columns * 100}% ${
              whaleAnimationConfig.rows * 100
            }%`,
          }}
        ></div>

        <div
          ref={swordmanRef}
          className="bg-hero-section-memcoin-7 md:block hidden max-w-24 w-[22%] h-[26%] min-w-[119px] z-30 absolute bg-contain bg-no-repeat -right-[0%] bg-right "
        ></div>

        <div
          onMouseEnter={playFireAnimation}
          onMouseLeave={stopFireAnimation}
          ref={fireRef}
          className="sprite-container absolute right-[30%] max-w-48 max-h-24 z-50 "
          style={{
            width: `${fireAnimationConfig.frameWidth}px`,
            height: `${fireAnimationConfig.frameHeight}px`,
            backgroundImage:
              "url(/images/animations/sprites/fire-spritesheet.png)",
            backgroundSize: `${fireAnimationConfig.columns * 100}% ${
              fireAnimationConfig.rows * 100
            }%`,
          }}
        ></div>

        <div
          onMouseEnter={playCandleAnimation}
          onMouseLeave={stopCandleAnimation}
          ref={candleRef}
          className="sprite-container absolute bg-bottom min-w-32 min-h-32 right-[10%] bottom-0  z-50 "
          style={{
            width: `${candleAnimationConfig.frameWidth}px`,
            height: `${candleAnimationConfig.frameHeight}px`,
            backgroundImage:
              "url(/images/animations/sprites/candle-sprite.png)",
            backgroundSize: `${candleAnimationConfig.columns * 100}% ${
              candleAnimationConfig.rows * 100
            }%`,
          }}
        ></div>

        {/*anchor-2*/}
        <div
          ref={anchor_2_Ref}
          className="w-full h-0.5 absolute sm:bottom-[10%] bottom-[15%] "
        ></div>

        {/*anchor-1*/}
        <div
          ref={anchor_1_Ref}
          className="w-full h-0.5 absolute sm:bottom-[7%] bottom-[12%]  "
        ></div>

        {/*anchor-0*/}
        <div
          ref={anchor_0_Ref}
          className="w-full h-0.5 absolute bottom-[4%]  "
        ></div>

        <div
          ref={anchor_Ref}
          className="w-full h-0.5 absolute bottom-[1%]  "
        ></div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
