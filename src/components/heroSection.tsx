import { RefObject, useContext, useEffect, useRef, useState } from "react";
import { CottonCandyContext } from "../providers/ContextProvider";
import { useWallet } from "@solana/wallet-adapter-react";
import Nav from "./UI/Nav";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import TopBar from "./topbar";
import { motion } from "framer-motion";
import anchorElement from "../utils/anchorELement";

import * as config from "../constants/animationsConfig";
import { useHeroAnimator } from "../hooks/useHeroAnimator";
import { useArcherSpriteAnimation } from "../hooks/useArcherSpriteAnimation";
import usePopCat from "../hooks/usePopCat";
import { useSpritePreloader } from "../hooks/useSpritePreloader";

type Dimensions = { width: number; height: number };

export const updateProjectitlePath = (
  spriteRef: RefObject<HTMLDivElement>,
  startPathRef: RefObject<HTMLDivElement>,
  svgRef: RefObject<SVGSVGElement>,
  rangeRef: RefObject<HTMLDivElement>,
  pathRef: RefObject<SVGPathElement>
) => {
  if (
    !spriteRef.current ||
    !startPathRef.current ||
    !svgRef.current ||
    !rangeRef.current ||
    !pathRef.current
  )
    return;

  const rangeRect = rangeRef.current.getBoundingClientRect();
  const startEl = startPathRef.current;
  const endPos = { x: window.innerWidth / 2, y: window.innerHeight * 0.9 };

  const start = {
    x: startEl.offsetLeft + startEl.offsetWidth / 2,
    y: startEl.offsetTop + startEl.offsetHeight / 2,
  };

  const end = {
    x: endPos.x - rangeRect.left,
    y: endPos.y - rangeRect.top,
  };

  svgRef.current.setAttribute(
    "viewBox",
    `0 0 ${rangeRect.width} ${rangeRect.height}`
  );
  const midX = (start.x + end.x) / 2;
  const midY = Math.min(start.y, end.y) - 150;
  const newPath = `M ${start.x} ${start.y} Q ${midX} ${midY}, ${end.x} ${end.y}`;
  pathRef.current.setAttribute("d", newPath);
};

const positionCastleTop = (
  castleTop: RefObject<HTMLDivElement>,
  castleAnchor: RefObject<HTMLDivElement>
) => {
  if (castleTop.current && castleAnchor.current) {
    const roofRect = castleAnchor.current.getBoundingClientRect();
    const topRect = castleTop.current.getBoundingClientRect();
    const parentRect = castleTop.current.offsetParent?.getBoundingClientRect();

    if (parentRect) {
      // Distance from parent's top to roof's top
      const roofTopRelative = roofRect.top - parentRect.top;

      // Place topRed so its bottom aligns with roofRed's top
      castleTop.current.style.top = `${roofTopRelative - topRect.height}px`;
    }
  }
};

const HeroSection = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const catRef = useRef<HTMLImageElement | null>(null);
  const catContainerRef = useRef<HTMLDivElement>(null);
  const ctx = useContext(CottonCandyContext);

  useSpritePreloader();

  const { handleMouseDown, handleMouseUp } = usePopCat(catRef, audioRef);

  const { connected, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  const heroesDimensions = useRef(
    new WeakMap<React.RefObject<HTMLElement>, Dimensions>()
  );

  // roofs:

  const roofRed = useRef<HTMLDivElement>(null);
  const topRed = useRef<HTMLDivElement>(null);
  const roofBlue = useRef<HTMLDivElement>(null);
  const topBlue = useRef<HTMLDivElement>(null);

  const [, setBoltArcherDimension] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const [, setCandleArcherDimension] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const fireRef = useRef<HTMLDivElement>(null);
  const magicRef = useRef<HTMLDivElement>(null);
  const candleRef = useRef<HTMLDivElement>(null);
  const whaleRef = useRef<HTMLDivElement>(null);
  const swordmanRef = useRef<HTMLDivElement>(null);
  const sandwichmenRef = useRef<HTMLDivElement>(null);
  const kingFrogRef = useRef<HTMLDivElement>(null);

  // anchors
  const anchor_Ref = useRef<HTMLDivElement>(null);
  const anchor_0_Ref = useRef<HTMLDivElement>(null);
  const anchor_1_Ref = useRef<HTMLDivElement>(null);
  const anchor_2_Ref = useRef<HTMLDivElement>(null);

  // menu ref
  const tombstoneRef = useRef<any>(null);

  const candleOneRef = useRef<HTMLDivElement>(null);
  const candleTwoRef = useRef<HTMLDivElement>(null);

  const arrowOneRef = useRef<HTMLDivElement>(null);
  const arrowTwoRef = useRef<HTMLDivElement>(null);

  // heroes ref

  const redCastleLightSaberRef = useRef<HTMLDivElement>(null);

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
          width: castleRect.width * 0.45,
          height: castleRect.width * 0.45,
        });
      }
      if (whaleRef.current) {
        heroesDimensions.current.set(whaleRef, {
          width: castleRect.width * 0.9,
          height: castleRect.width * 0.9,
        });
      }
      if (fireRef.current) {
        heroesDimensions.current.set(fireRef, {
          width: castleRect.width * 0.3,
          height: (castleRect.width * 0.3) / 2,
        });
      }
      if (swordmanRef.current) {
        heroesDimensions.current.set(swordmanRef, {
          width: castleRect.width * 0.6,
          height: castleRect.width * 0.6,
        });
      }

      if (redCastleLightSaberRef.current) {
        heroesDimensions.current.set(redCastleLightSaberRef, {
          width: castleRect.width * 0.35,
          height: castleRect.width * 0.35,
        });
      }

      if (sandwichmenRef.current) {
        heroesDimensions.current.set(sandwichmenRef, {
          width: castleRect.width * 0.4,
          height: castleRect.width * 0.4,
        });
      }

      if (kingFrogRef.current) {
        heroesDimensions.current.set(kingFrogRef, {
          width: castleRect.width * 0.4,
          height: castleRect.width * 0.4,
        });
      }

      if (redSpriteRef.current) {
        heroesDimensions.current.set(redSpriteRef, {
          width: castleRect.width * 0.5,
          height: castleRect.width * 0.5,
        });
      }

      if (blueSpriteRef.current) {
        heroesDimensions.current.set(blueSpriteRef, {
          width: castleRect.width * 0.5,
          height: castleRect.width * 0.5,
        });
      }
    }
  };

  const positionElement = () => {
    anchorElement(anchor_0_Ref, tombstoneRef, { bottom: true });
    anchorElement(anchor_Ref, catContainerRef, { bottom: true });
    anchorElement(anchor_0_Ref, candleOneRef, { bottom: true });
    anchorElement(anchor_1_Ref, candleTwoRef, { bottom: true });
    anchorElement(anchor_0_Ref, arrowOneRef, { bottom: true });
    anchorElement(anchor_1_Ref, arrowTwoRef, { bottom: true });
    anchorElement(anchor_Ref, fireRef, { bottom: true });
    anchorElement(anchor_1_Ref, swordmanRef, { bottom: true });
    anchorElement(anchor_0_Ref, candleRef, { bottom: true });
    anchorElement(anchor_2_Ref, redCastleLightSaberRef, { bottom: true });
    anchorElement(anchor_1_Ref, whaleRef, { bottom: true });
    anchorElement(anchor_2_Ref, magicRef, { bottom: true });

    positionCastleTop(topRed, roofRed);
    positionCastleTop(topBlue, roofBlue);
  };

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
        // blueTrajectoryStartRef.current.style.top = `${archer.top}px`;
      }
      updateProjectitlePath(
        blueSpriteRef,
        blueTrajectoryStartRef,
        blueSvgRef,
        blueRangeRef,
        pathRef
      );
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
        // redTrajectoryStartRef.current.style.top = `${archer.top}px`;
      }
      updateProjectitlePath(
        redSpriteRef,
        redTrajectoryStartRef,
        redSvgRef,
        redRangeRef,
        pathRedRef
      );
    }
  };

  useEffect(() => {
    if (!ctx.assestsPreloaded) return;

    tombstoneRef.current = document.getElementById("tombstone");

    requestAnimationFrame(() => {
      resizeHeroes();

      requestAnimationFrame(() => {
        positionElement();

        requestAnimationFrame(() => {
          positionedArcher();
        });
      });
    });

    const handleResize = () => {
      requestAnimationFrame(() => {
        resizeHeroes();
        requestAnimationFrame(() => {
          positionElement();
          requestAnimationFrame(() => {
            positionedArcher();
          });
        });
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ctx.assestsPreloaded]);

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

  const {
    playAnimation: playCandleArcherAnimation,
    stopAnimation: stopCandleArcherAnimation,
  } = useArcherSpriteAnimation({
    spriteRef: blueSpriteRef,
    pathRef,
    rangeRef: blueRangeRef,
    svgRef: blueSvgRef,
    startPathRef: blueTrajectoryStartRef,
    projectileRef: candleFireRef,
    config: config.archerBlueAnimationConfig,
    spritekey: "archer-blue",
  });

  const {
    playAnimation: playLighteningArcherAnimation,
    stopAnimation: stopLighteningArcherAnimation,
  } = useArcherSpriteAnimation({
    spriteRef: redSpriteRef,
    pathRef: pathRedRef,
    rangeRef: redRangeRef,
    svgRef: redSvgRef,
    startPathRef: redTrajectoryStartRef,
    projectileRef: arrowRedRef,
    config: config.archerRedAnimationConfig,
    spritekey: "archer-red",
  });

  const {
    startAnimation: playLightSabreAnimation,
    stopAnimation: stopLightSabreAnimation,
  } = useHeroAnimator(
    redCastleLightSaberRef,
    config.lightSabreAnimationConfig,
    "light-sabre"
  );

  const {
    startAnimation: playWhaleAnimation,
    stopAnimation: stopWhaleAnimation,
  } = useHeroAnimator(whaleRef, config.whaleAnimationsConfig, "whale-monkey");

  const {
    startAnimation: playMagicAnimation,
    stopAnimation: stopMagicAnimation,
  } = useHeroAnimator(magicRef, config.magicAnimationConfig, "magic-wizard");

  const {
    startAnimation: playSowrdAnimation,
    stopAnimation: stopSowrdAnimation,
  } = useHeroAnimator(
    swordmanRef,
    config.swordsmenAnimationConfig,
    "swords-warrior"
  );

  const {
    startAnimation: playFireAnimation,
    stopAnimation: stopFireAnimation,
  } = useHeroAnimator(fireRef, config.fireAnimationConfig, "fire");

  const {
    startAnimation: playSandwichAnimation,
    stopAnimation: stopSandWichAnimation,
  } = useHeroAnimator(
    sandwichmenRef,
    config.sandwichAnimationConfig,
    "king-blue"
  );

  const {
    startAnimation: playKingFrogAnimation,
    stopAnimation: stopKingFrogAnimation,
  } = useHeroAnimator(
    kingFrogRef,
    config.kingFrogAnimationConfig,
    "archer-red"
  );

  const {
    startAnimation: playCandleAnimation,
    stopAnimation: stopCandleAnimation,
  } = useHeroAnimator(candleRef, config.candleAnimationConfig, "candle-wizard");

  useEffect(() => {
    ctx.setAssestsPreloaded(true);
  }, []);

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
          duration: 0.5,
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
        <Nav className={"flex-1 absolute bottom-[25%] z-[41]"} />
        <div className="bg-hero-section-lower  bg-no-repeat bg-cover h-[20%] bg-end absolute bottom-0 left-0 right-0"></div>
        <div className="bg-hero-section-logo max-w-[700px] max-h-[400px] min-w-[288px] h-[35%] w-[50%] min-h-[149px] bg-no-repeat bg-contain bg-bottom absolute left-[50%] -translate-x-[50%] top-[5%]"></div>

        {/* Heroes */}
        {/* casltes  red*/}
        <div className="block relative md:static top-[75%] md:top-auto ">
          <div
            ref={topRed}
            // md:bottom-[40%] lg:bottom-[50%]  bottom-[11rem]
            className=" bg-hero-section-castle-red-1 max-w-[344px] max-h-[475px] min-h-[181px] w-[30%] h-[35.24%] min-w-[134px] bg-contain bg-no-repeat absolute z-[1]  bg-left-bottom  md:left-0"
          >
            {/* Command : red */}

            <div
              onMouseEnter={playKingFrogAnimation}
              onMouseLeave={stopKingFrogAnimation}
              ref={kingFrogRef}
              style={{
                width: `${heroesDimensions.current.get(kingFrogRef)?.width}px`,
                height: `${
                  heroesDimensions.current.get(kingFrogRef)?.height
                }px`,
                backgroundImage:
                  "url('/images/animations/sprites/frog-king/thumbnail.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                backgroundPosition: "0% 0%",
              }}
              className="sprite-container  bg-no-repeat  absolute max-w-56 max-h-56 min-h-24 min-w-24 bg-left-bottom -bottom-[13%]  z-40 aspect-square -left-[10%] "
            />

            {/* Archer: red */}
            <div
              id="archerRedContainer"
              ref={archerRedContainerRef}
              className="absolute w-[60%] max-w-[350px] -bottom-[10%] z-10 lg:right-10 sm:right-8 right-0 "
            >
              <div className="relative flex flex-col items-center justify-end h-full ">
                <div
                  data-range="lightening-range"
                  ref={redRangeRef}
                  className="fixed md:w-1/2 w-1/3  bottom-40 h-[70%]  left-52 z-100"
                >
                  <div className="relative w-full h-full">
                    <svg
                      className=""
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
                      className="absolute top-[35%] left-0 w-1 h-4 "
                    ></div>
                  </div>
                </div>

                <div
                  data-archer="arrow-archer"
                  onMouseEnter={playLighteningArcherAnimation}
                  onMouseLeave={stopLighteningArcherAnimation}
                  ref={redSpriteRef}
                  className="sprite-container absolute bottom-0 max-w-40 max-h-40  z-100"
                  style={{
                    width: `${
                      heroesDimensions.current.get(redSpriteRef)?.width
                    }px`,
                    height: `${
                      heroesDimensions.current.get(redSpriteRef)?.height
                    }px`,

                    backgroundImage:
                      "url('/images/animations/sprites/archer-red/thumbnail.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                    backgroundPosition: "0% 0%",
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div
            id="redCastleBottom"
            ref={redCastleBottomRef}
            className="bg-hero-section-castle-red-2  pointer-events-none  max-w-[465px] lg:max-h-[600px] max-h-[380px] h-[46%] w-[25%] md:w-[37%]  absolute min-h-[221px] min-w-[168px] bg-contain bg-no-repeat  bg-left-bottom  z-30 left-0 bottom-[12%]"
          >
            <div className=" relative  flex flex-row justify-center z-[31] pointer-events-none ">
              <div ref={roofRed} className=" h-1 w-1 mt-[20%] "></div>
            </div>
          </div>
        </div>

        {/* Light Saber: red */}
        <div
          onMouseEnter={playLightSabreAnimation}
          onMouseLeave={stopLightSabreAnimation}
          ref={redCastleLightSaberRef}
          style={{
            width: `${
              heroesDimensions.current.get(redCastleLightSaberRef)?.width
            }px`,
            height: `${
              heroesDimensions.current.get(redCastleLightSaberRef)?.height
            }px`,

            backgroundImage:
              "url('/images/animations/sprites/light-sabre/thumbnail.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundPosition: "0% 0%",
          }}
          className=" bg-left-bottom hidden md:block absolute left-[0%] min-w-32 min-h-32 z-40 bg-contain bg-no-repeat  max-w-64 max-h-64 bottom-0  aspect-square "
        ></div>

        <div
          onMouseEnter={playMagicAnimation}
          onMouseLeave={stopMagicAnimation}
          ref={magicRef}
          style={{
            width: `${heroesDimensions.current.get(magicRef)?.width}px`,
            height: `${heroesDimensions.current.get(magicRef)?.height}px`,
            backgroundImage:
              "url('/images/animations/sprites/magic-wizard/thumbnail.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundPosition: "0% 0%",
          }}
          className=" bg-left-bottom absolute left-[5%] md:left-[15%] z-40 bg-contain bg-no-repeat  max-w-64 max-h-64 min-h-40 min-w-40 bottom-0  aspect-square "
        ></div>

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
          className="w-[25%] max-w-56 min-w-36  object-bottom h-auto absolute bottom-0  md:left-[8%]  left-[15%] z-40"
        >
          <div className="relative flex flex-col items-center justify-start mt-5">
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

        <div className=" bg-hero-section-distant  lg:h-[68%] md:h-[65%] w-[100%] min-w-[300px] min-h-[200px] bg-contain sm:bg-repeat-x bg-no-repeat bg-bottom absolute sm:bottom-[16%] bottom-[18%] z-0"></div>
        {/* castle-blue */}
        <div className="block relative md:static top-[75%] md:top-auto">
          {/* md:bottom-[40%]  lg:bottom-[50%] bottom-[11rem] */}
          <div
            ref={topBlue}
            className="bg-hero-section-castle-blue-1 max-w-[344px] max-h-[475px] min-h-[181px] w-[30%] h-[35.24%] min-w-[134px] bg-contain bg-no-repeat absolute z-0  bg-right-bottom right-0"
          >
            <div
              onMouseEnter={playSandwichAnimation}
              onMouseLeave={stopSandWichAnimation}
              ref={sandwichmenRef}
              style={{
                width: `${
                  heroesDimensions.current.get(sandwichmenRef)?.width
                }px`,
                height: `${
                  heroesDimensions.current.get(sandwichmenRef)?.height
                }px`,
                backgroundImage:
                  "url('/images/animations/sprites/sandwich/thumbnail.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                backgroundPosition: "0% 0%",
              }}
              className="sprite-container  absolute max-w-56 max-h-56 min-h-24 min-w-24 -bottom-[13%] -right-[10%]  z-40 aspect-square "
            />

            <div
              id="archerContainer"
              ref={archerBlueContainerRef}
              className="candleFireRef absolute  h-full w-[60%] max-w-[350px] -bottom-[10%] lg:left-10 sm:left-8 left-0 z-0"
            >
              <div className="relative flex flex-col items-center justify-end h-full ">
                <div
                  data-range="candle-range"
                  ref={blueRangeRef}
                  className="fixed w-1/2 bottom-40 h-2/3 right-64 z-100 pointer-events-none"
                >
                  <div className="relative w-full h-full ">
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
                      className="absolute top-[35%] right-0 w-1 h-4"
                    ></div>
                  </div>
                </div>

                <div
                  data-archer="candle-archer"
                  onMouseEnter={playCandleArcherAnimation}
                  onMouseLeave={stopCandleArcherAnimation}
                  ref={blueSpriteRef}
                  className="sprite-container absolute bottom-0 max-w-40 max-h-40 z-100"
                  style={{
                    width: `${
                      heroesDimensions.current.get(blueSpriteRef)?.width
                    }px`,
                    height: `${
                      heroesDimensions.current.get(blueSpriteRef)?.height
                    }px`,
                    backgroundImage:
                      "url('/images/animations/sprites/archer-blue/thumbnail.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                    backgroundPosition: "0% 0%",
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div
            id="blueCastleBottom"
            ref={blueCastleBottomRef}
            className="bg-hero-section-castle-blue-2  pointer-events-none  max-w-[465px] lg:max-h-[600px] max-h-[380px] h-[46%] md:w-[37%] w-[25%]  absolute min-h-[221px] min-w-[168px] bg-contain bg-no-repeat bg-right-bottom z-30 right-0 bottom-[12%]"
          >
            <div className=" relative  flex flex-row justify-center z-[31] pointer-events-none">
              <div ref={roofBlue} className=" h-1 w-1 mt-[20%] "></div>
            </div>
          </div>
        </div>

        <div
          onMouseEnter={playWhaleAnimation}
          onMouseLeave={stopWhaleAnimation}
          ref={whaleRef}
          style={{
            width: `${heroesDimensions.current.get(whaleRef)?.width}px`,
            height: `${heroesDimensions.current.get(whaleRef)?.height}px`,
            backgroundImage:
              "url('/images/animations/sprites/monkey/thumbnail.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundPosition: "0% 0%",
          }}
          className="sprite-container absolute max-w-64 max-h-64 min-w-40 min-h-40 bottom-0 sm:right-[4%] right-0 z-40 aspect-square "
        />

        <div
          ref={swordmanRef}
          onMouseEnter={playSowrdAnimation}
          onMouseLeave={stopSowrdAnimation}
          className=" md:block hidden max-w-48 max-h-48 min-w-28 min-h-28 z-40 absolute bg-contain bg-no-repeat -right-[2%] bg-right "
          style={{
            width: `${heroesDimensions.current.get(swordmanRef)?.width}px`,
            height: `${heroesDimensions.current.get(swordmanRef)?.height}px`,
            backgroundImage:
              "url('/images/animations/sprites/swordsmen/thumbnail.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundPosition: "0% 0%",
          }}
        ></div>

        <div
          onMouseEnter={playFireAnimation}
          onMouseLeave={stopFireAnimation}
          ref={fireRef}
          className="sprite-container absolute right-[30%] max-w-48 max-h-24 z-50 "
          style={{
            width: `${heroesDimensions.current.get(fireRef)?.width}px`,
            height: `${heroesDimensions.current.get(fireRef)?.height}px`,
          }}
        />

        <div
          onMouseEnter={playCandleAnimation}
          onMouseLeave={stopCandleAnimation}
          ref={candleRef}
          className="sprite-container absolute bg-bottom max-h-60 max-w-60 min-w-36 min-h-36 right-[13%] bottom-0  z-40 "
          style={{
            width: `${heroesDimensions.current.get(candleRef)?.width}px`,
            height: `${heroesDimensions.current.get(candleRef)?.height}px`,
            backgroundImage:
              "url('/images/animations/sprites/candle-wizard/thumbnail.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundPosition: "0% 0%",
          }}
        />

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
