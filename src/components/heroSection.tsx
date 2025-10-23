import { RefObject, useContext, useEffect, useRef, useState } from "react";
import { CottonCandyContext } from "../providers/ContextProvider";
import { useWallet } from "@solana/wallet-adapter-react";
import Nav from "./UI/Nav";
import TopBar from "./topbar";
import { motion } from "framer-motion";
import anchorElement from "../utils/anchorELement";

import * as config from "../constants/animationsConfig";
import { useArcherSpriteAnimation } from "../hooks/useArcherSpriteAnimation";
import usePopCat from "../hooks/usePopCat";
import { useSpritePreloader } from "../hooks/useSpritePreloader";
import { useAnimationConfigs } from "../hooks/useAnimationConfigs";
import WhitelistCountDown from "./whitelist/WhitelistCountDown";
import { useWalletModal } from "../hooks/useWalletModal";

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
  const animations = useAnimationConfigs();

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
    heroesDimensions.current.set(animations.logo.ref, {
      width: window.innerWidth * 0.25,
      height: window.innerWidth * 0.25,
    });

    heroesDimensions.current.set(animations.gold.ref, {
      width: window.innerWidth * 0.65,
      height: window.innerWidth * 0.65,
    });

    const redCastleEl = document.getElementById("redCastleBottom");
    const castleRect = redCastleEl?.getBoundingClientRect();

    if (castleRect) {
      if (animations.magic.ref.current) {
        heroesDimensions.current.set(animations.magic.ref, {
          width: castleRect.width * 0.75,
          height: castleRect.width * 0.75,
        });
      }
      if (animations.candle.ref.current) {
        heroesDimensions.current.set(animations.candle.ref, {
          width: castleRect.width * 0.5,
          height: castleRect.width * 0.5,
        });
      }
      if (animations.whale.ref.current) {
        heroesDimensions.current.set(animations.whale.ref, {
          width: castleRect.width * 0.9,
          height: castleRect.width * 0.9,
        });
      }
      if (animations.fire.ref.current) {
        heroesDimensions.current.set(animations.fire.ref, {
          width: castleRect.width * 0.3,
          height: (castleRect.width * 0.3) / 2,
        });
      }
      if (animations.swordman.ref.current) {
        heroesDimensions.current.set(animations.swordman.ref, {
          width: castleRect.width * 0.6,
          height: castleRect.width * 0.6,
        });
      }

      if (animations.lightSabre.ref.current) {
        heroesDimensions.current.set(animations.lightSabre.ref, {
          width: castleRect.width * 0.4,
          height: castleRect.width * 0.4,
        });
      }

      if (animations.sandwichmen.ref.current) {
        heroesDimensions.current.set(animations.sandwichmen.ref, {
          width: castleRect.width * 0.6,
          height: castleRect.width * 0.6,
        });
      }

      if (animations.kingFrog.ref.current) {
        heroesDimensions.current.set(animations.kingFrog.ref, {
          width: castleRect.width * 0.6,
          height: castleRect.width * 0.6,
        });
      }

      if (redSpriteRef.current) {
        heroesDimensions.current.set(redSpriteRef, {
          width: castleRect.width * 0.6,
          height: castleRect.width * 0.6,
        });
      }

      if (blueSpriteRef.current) {
        heroesDimensions.current.set(blueSpriteRef, {
          width: castleRect.width * 0.6,
          height: castleRect.width * 0.6,
        });
      }

      heroesDimensions.current.set(animations.sheep.ref, {
        width: castleRect.width * 0.9,
        height: castleRect.width * 0.9,
      });
    }
  };

  const positionElement = () => {
    anchorElement(anchor_2_Ref, tombstoneRef, { bottom: true });
    anchorElement(anchor_0_Ref, candleOneRef, { bottom: true });
    anchorElement(anchor_1_Ref, candleTwoRef, { bottom: true });
    anchorElement(anchor_0_Ref, arrowOneRef, { bottom: true });
    anchorElement(anchor_1_Ref, arrowTwoRef, { bottom: true });
    anchorElement(anchor_Ref, animations.fire.ref, { bottom: true });
    anchorElement(anchor_1_Ref, animations.swordman.ref, { bottom: true });
    anchorElement(anchor_0_Ref, animations.candle.ref, { bottom: true });
    anchorElement(anchor_2_Ref, animations.lightSabre.ref, { bottom: true });
    anchorElement(anchor_1_Ref, animations.whale.ref, { bottom: true });
    anchorElement(anchor_2_Ref, animations.magic.ref, { bottom: true });
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

  useEffect(() => {
    const updatePositions = () => {
      const tombstoneEl = tombstoneRef.current;
      const logoEl = animations.logo.ref.current;
      const countdownEl = document.getElementById("whitelist-countdown");

      if (tombstoneEl && logoEl) {
        const tombstoneRect = tombstoneEl.getBoundingClientRect();
        logoEl.style.bottom = `${
          window.innerHeight - tombstoneRect.top + 20
        }px`;
      }

      if (logoEl && countdownEl) {
        const logoRect = logoEl.getBoundingClientRect();

        countdownEl.style.top = `${logoRect.bottom + 10}px`;

        countdownEl.style.left = `${
          logoRect.left + logoRect.width / 2 - countdownEl.offsetWidth / 2
        }px`;
        countdownEl.style.position = "absolute"; // ensures it sticks visually
      }
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);
    window.addEventListener("scroll", updatePositions);

    return () => {
      window.removeEventListener("resize", updatePositions);
      window.removeEventListener("scroll", updatePositions);
    };
  }, [positionElement]);

  const handleConnect = async () => {
    if (!connected) {
      setVisible(true);
      return;
    } else {
      await disconnect();
      ctx.setCollectiable(null);
      ctx.setNftToEggMap({});
      ctx.setCurrentModal(null);
      ctx.setBookmark("mint");
      // ctx.setIsWhitelisted(false);
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

  useEffect(() => {
    ctx.setAssestsPreloaded(true);
  }, []);

  useEffect(() => {
    const spriteContainers =
      document.querySelectorAll<HTMLElement>(".sprite-container");
    let activeId: string | null = null;

    function handleMouseMove(e: MouseEvent) {
      let closestEl: HTMLElement | null = null;
      let minDist = Infinity;

      spriteContainers.forEach((el) => {
        const rect = (el as HTMLElement).getBoundingClientRect();

        const inside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        if (!inside) return;

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.sqrt(
          (e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2
        );

        if (dist < minDist) {
          minDist = dist;
          closestEl = el;
        }
      });

      if (!closestEl) return;

      const closestId = (closestEl as HTMLElement).id;

      if (activeId !== closestId) {
        if (activeId) animations[activeId]?.stopAnimation();
        animations[closestId]?.startAnimation();
        activeId = closestId;
      }
    }

    function handleMouseLeave(this: HTMLElement) {
      if (activeId === this.id) {
        animations[this.id]?.stopAnimation();
        activeId = null;
      }
    }

    spriteContainers.forEach((el) => {
      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave as EventListener);
    });

    return () => {
      spriteContainers.forEach((el) => {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave as EventListener);
      });
    };
  }, []);

  useEffect(() => {
    animations.gold.startAnimation();
  }, [animations, animations.gold.startAnimation]);

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
      <div className="relative  flex flex-col w-dvw h-dvh overflow-hidden bg-black bg-no-repeat bg-cover bg-hero-section-upper sm:overflow-clip">
        <TopBar />
        <div className="z-20 flex flex-row items-center justify-between px-4 py-2 md:px-10 md:py-5">
          <div className="flex items-center justify-center">
            <img
              src="/images/logo-header.webp"
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
        <Nav className={"absolute  pointer-events-none"} style={{}} />
        <div
          ref={animations.gold.ref}
          style={{
            width: `${
              heroesDimensions.current.get(animations.gold.ref)?.width
            }px`,
            height: `${
              heroesDimensions.current.get(animations.gold.ref)?.height
            }px`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundPosition: "0% 0%",
          }}
          className="hidden md:block pointer-events-none  max-h-[400px] max-w-[400px] min-w-[200px] min-h-[200px] bg-no-repeat bg-contain bg-bottom absolute left-[50%] -translate-x-[50%] -bottom-[10%] z-40"
        ></div>
        <div className="bg-hero-section-lower bg-no-repeat bg-cover h-[20%] bg-end absolute bottom-0 left-0 right-0"></div>
        <div
          id="logo"
          ref={animations.logo.ref}
          style={{
            width: `${
              heroesDimensions.current.get(animations.logo.ref)?.width
            }px`,
            height: `${
              heroesDimensions.current.get(animations.logo.ref)?.height
            }px`,
            backgroundImage:
              "url('/images/animations/sprites/logo/thumbnail.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundPosition: "0% 0%",
          }}
          className="sprite-container max-h-[350px] max-w-[350px] md:min-h-[260px] md:min-w-[260px] min-w-[200px] min-h-[200px] bg-no-repeat bg-contain bg-bottom absolute left-[50%] -translate-x-[50%] z-40"
        ></div>
        <WhitelistCountDown />
        {/* Heroes */}
        {/* casltes  red*/}
        <div className="block relative md:static top-[75%] md:top-auto ">
          <div
            ref={topRed}
            className=" bg-hero-section-castle-red-1 max-w-[344px] max-h-[475px] min-h-[230px] sm:min-w-[200px] sm:min-h-[250px]  w-[30%] h-[35.24%] min-w-[200px] bg-contain bg-no-repeat absolute z-[1]  bg-left-bottom  xs:left-0 -left-14"
          >
            {/* Command : red */}

            <div
              id="kingFrog"
              ref={animations.kingFrog.ref}
              style={{
                width: `${
                  heroesDimensions.current.get(animations.kingFrog.ref)?.width
                }px`,
                height: `${
                  heroesDimensions.current.get(animations.kingFrog.ref)?.height
                }px`,
                backgroundImage:
                  "url('/images/animations/sprites/frog-king/thumbnail.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                backgroundPosition: "0% 0%",
              }}
              className="sprite-container  bg-no-repeat  absolute max-w-56 max-h-56 min-h-24 min-w-24 bg-left-bottom -bottom-[13%]  z-40 aspect-square sm:-left-[10%] -left-[25%] "
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
                        src="/images/arrow-lightning.webp"
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
                  className="absolute bottom-0 max-w-48 max-h-48  min-h-36 min-w-36 z-100"
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
            className="bg-hero-section-castle-red-2  pointer-events-none  max-w-[465px] lg:max-h-[600px] max-h-[380px] h-[46%] w-[25%] md:w-[37%] sm:min-w-[250px] sm:min-h-[300px]  absolute min-h-[280px] min-w-[220px] bg-contain bg-no-repeat  bg-left-bottom  z-30 xs:left-0  -left-14 bottom-[12%]"
          >
            <div className=" relative  flex flex-row justify-center z-[31] pointer-events-none ">
              <div ref={roofRed} className=" h-1 w-1 mt-[20%] "></div>
            </div>
          </div>
        </div>
        {/* Light Saber: red */}
        <div
          id="lightSabre"
          ref={animations.lightSabre.ref}
          style={{
            width: `${
              heroesDimensions.current.get(animations.lightSabre.ref)?.width
            }px`,
            height: `${
              heroesDimensions.current.get(animations.lightSabre.ref)?.height
            }px`,

            backgroundImage:
              "url('/images/animations/sprites/light-sabre/thumbnail.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundPosition: "0% 0%",
          }}
          className="sprite-container  bg-left-bottom hidden md:block absolute left-[0%] min-w-32 min-h-32 z-40 bg-contain bg-no-repeat  max-w-48 max-h-48 bottom-0  aspect-square "
        ></div>
        <div
          id="magic"
          ref={animations.magic.ref}
          style={{
            width: `${
              heroesDimensions.current.get(animations.magic.ref)?.width
            }px`,
            height: `${
              heroesDimensions.current.get(animations.magic.ref)?.height
            }px`,
            backgroundImage:
              "url('/images/animations/sprites/magic-wizard/thumbnail.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundPosition: "0% 0%",
          }}
          className="sprite-container  bg-left-bottom absolute left-[15%] md:left-[15%] z-40 bg-contain bg-no-repeat  max-w-80 max-h-80 sm:min-h-64 sm:min-w-64  min-h-52 min-w-52 bottom-0  aspect-square "
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
          id="sheep"
          ref={animations.sheep.ref}
          style={{
            width: `${
              heroesDimensions.current.get(animations.sheep.ref)?.width
            }px`,
            height: `${
              heroesDimensions.current.get(animations.sheep.ref)?.height
            }px`,
            backgroundImage:
              "url('/images/animations/sprites/sheep/thumbnail.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundPosition: "0% 0%",
          }}
          className="sprite-container  bg-left-bottom absolute left-[5%] md:left-[8%] z-40 bg-contain bg-no-repeat max-w-80 max-h-80 sm:min-h-64 sm:min-w-64  min-h-52 min-w-52 -bottom-[5%]  aspect-square "
        >
          <div className=" h-full w-full relative">
            <div ref={catContainerRef} className=" absolute -top-[35%]">
              <div className="relative flex flex-col items-center justify-start mt-5">
                <div
                  className=" absolute w-[26%] aspect-square top-[18.8%] left-[13.8%] pointer-events-auto"
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                ></div>
                <img
                  ref={catRef}
                  src="/images/section-hero/popcat.webp"
                  draggable={false}
                  alt=""
                  className=""
                ></img>
              </div>
            </div>
          </div>
        </div>
        {/* Wizard: red */}
        <div className=" bg-hero-section-distant  lg:h-[68%] md:h-[65%] w-[100%] min-w-[300px] min-h-[200px] bg-contain sm:bg-repeat-x bg-no-repeat bg-bottom absolute sm:bottom-[16%] bottom-[18%] z-0"></div>
        {/* castle-blue */}
        <div className="block relative md:static top-[75%] md:top-auto">
          <div
            ref={topBlue}
            className="bg-hero-section-castle-blue-1 max-w-[344px] max-h-[475px] sm:min-w-[200px] sm:min-h-[250px] min-h-[230px] w-[30%] h-[35.24%] min-w-[200px] bg-contain bg-no-repeat absolute z-0  bg-right-bottom xs:right-0 -right-14"
          >
            <div
              id="sandwichmen"
              ref={animations.sandwichmen.ref}
              style={{
                width: `${
                  heroesDimensions.current.get(animations.sandwichmen.ref)
                    ?.width
                }px`,
                height: `${
                  heroesDimensions.current.get(animations.sandwichmen.ref)
                    ?.height
                }px`,
                backgroundImage:
                  "url('/images/animations/sprites/sandwich/thumbnail.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                backgroundPosition: "0% 0%",
              }}
              className="sprite-container  absolute max-w-56 max-h-56 min-h-24 min-w-24 -bottom-[13%] md:-right-[10%] -right-[20%]  z-40 aspect-square "
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
                        src="/images/arrow-candle.webp"
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
                  className="absolute bottom-0  max-w-48 max-h-48 min-h-36 min-w-36 z-100"
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
            className="bg-hero-section-castle-blue-2  pointer-events-none  max-w-[465px] lg:max-h-[600px] max-h-[380px] h-[46%] md:w-[37%]  w-[25%] sm:min-w-[250px] sm:min-h-[300px]  absolute min-h-[280px] min-w-[220px] bg-contain bg-no-repeat bg-right-bottom z-30 xs:right-0 -right-14 bottom-[12%]"
          >
            <div className=" relative  flex flex-row justify-center z-[31] pointer-events-none">
              <div ref={roofBlue} className=" h-1 w-1 mt-[20%] "></div>
            </div>
          </div>
        </div>
        <div
          id="whale"
          ref={animations.whale.ref}
          style={{
            width: `${
              heroesDimensions.current.get(animations.whale.ref)?.width
            }px`,
            height: `${
              heroesDimensions.current.get(animations.whale.ref)?.height
            }px`,
            backgroundImage:
              "url('/images/animations/sprites/monkey/thumbnail.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundPosition: "0% 0%",
          }}
          className="sprite-container absolute max-w-80 max-h-80 min-w-56 min-h-56 sm:min-h-64 sm:min-w-64  bottom-0 sm:right-[4%] right-0 z-40 aspect-square "
        />
        <div
          id="swordman"
          ref={animations.swordman.ref}
          className="sprite-container  md:block hidden max-w-56 max-h-56 min-w-28 min-h-28 z-40 absolute bg-contain bg-no-repeat -right-[2%] bg-right "
          style={{
            width: `${
              heroesDimensions.current.get(animations.swordman.ref)?.width
            }px`,
            height: `${
              heroesDimensions.current.get(animations.swordman.ref)?.height
            }px`,
            backgroundImage:
              "url('/images/animations/sprites/swordsmen/thumbnail.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundPosition: "0% 0%",
          }}
        ></div>
        <div
          id="fire"
          ref={animations.fire.ref}
          className="sprite-container absolute right-[30%] max-w-48 max-h-24 min-w-24 min-h-12 z-40 "
          style={{
            width: `${
              heroesDimensions.current.get(animations.fire.ref)?.width
            }px`,
            height: `${
              heroesDimensions.current.get(animations.fire.ref)?.height
            }px`,
          }}
        />
        <div
          id="candle"
          ref={animations.candle.ref}
          className="sprite-container absolute bg-bottom max-h-64 max-w-64 sm:min-h-48 sm:min-w-48  min-w-44 min-h-44 right-[13%] bottom-0  z-40 "
          style={{
            width: `${
              heroesDimensions.current.get(animations.candle.ref)?.width
            }px`,
            height: `${
              heroesDimensions.current.get(animations.candle.ref)?.height
            }px`,
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
