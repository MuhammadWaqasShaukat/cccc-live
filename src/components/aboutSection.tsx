import Modal from "./UI/Modal";
import { CottonCandyContext } from "../providers/ContextProvider";
import { useContext, useEffect, useRef } from "react";
import AnimatedElement from "./UI/AnimatedElement";
import { ANIMATION_WEBM_SOURCES } from "../constants/animatedElements";
import { motion } from "framer-motion";

const AboutVideoPlay = () => {
  const aboutRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (aboutRef.current) {
      aboutRef.current.play().catch((error) => {
        console.error("Error attempting to play", error);
      });
    }
  }, []);

  return (
    <AnimatedElement
      videoRef={aboutRef}
      className=""
      source={ANIMATION_WEBM_SOURCES["about"]}
    />
  );
};

const AboutSection = () => {
  const ctx = useContext(CottonCandyContext);

  return (
    <Modal
      onBackgroundClick={() => {
        ctx.setActiveMenu("none");
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: [0, 1],
        }}
        transition={{
          opacity: {
            duration: 0.3,
          },
        }}
        className="mt-40 sm:mt-0"
      >
        {/* for mobile screens */}
        <div className="bg-center bg-no-repeat xs:w-[350px] xs:h-[475px]  h-[435px] w-[300px] bg-contain sm:hidden bg-about-section-castle-sm relative  flex flex-col justify-center items-center">
          <div className="h-[40%] text-center w-[63%] -top-[30%] min-w-[150px] flex flex-col justify-end items-center absolute">
            <div className="relative ">
              <AboutVideoPlay />
            </div>
          </div>

          <div className="flex flex-col items-center justify-between mt-10">
            <h2 className="font-patrick-hand text-center  text-[22px] pb-2">
              About CCCC
            </h2>
            <section className="px-10 text-sm leading-6 text-center xs:px-12 font-patrick-hand md:text-base lg:text-lg ">
              <article>
                Cotton Candy Crusader Club is a degenerate club created by
                degenerates for degenerates, Why pretend otherwise? At least we
                have some giggles along the way.
              </article>
              <article>
                TL:DR - 100% of the minting SOL goes straight into 20 mystery
                eggs. Every NFT you mint gives you the right to mint one egg for
                free. Will you be one of the lucky ones to get a completely
                useless image of an eggshell ?{" "}
                <span className="block sr-only">text-block</span>
              </article>
              <article>
                Or will you (highly unlikely) get a useless image of a golden
                eggshell and some SOL ?
              </article>
            </section>
            <button
              onClick={() => ctx.setActiveMenu("none")}
              className="bg-about-ok-btn sm:hidden block h-[38px] w-[71px] relative bg-contain bg-no-repeat group z-40 mt-4"
            >
              <span className="absolute inset-0 z-50 transition duration-200 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20"></span>
              <span className=" absolute inset-0 w-full h-full grid place-content-center font-patrick-hand text-[22px] leading-none text-white z-60">
                OK
              </span>
            </button>
          </div>
        </div>
      </motion.div>
      {/* for tablets, desktops, laptop screens (sm:++++) */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: [0, 1],
        }}
        transition={{
          opacity: {
            duration: 0.3,
          },
        }}
        className={`hidden sm:bg-about-section-castle bg-about-section-castle-sm w-[650px] h-[700px] md:w-[800px] md:h-[850px] xl:w-[850px] xl:h-[900px] xl:max-w-[1163px]  bg-no-repeat sm:flex flex-col justify-end  bg-contain md:bg-center bg-bottom`}
      >
        <div className="relative h-[40%] text-center w-[47.5%] min-w-[150px] mx-auto pt-8 flex flex-col justify-end items-center sm:mb-8 mb-16">
          <AboutVideoPlay />
        </div>

        <div className=" sm:h-[55%] h-[60%] bg-no-repeat bg-center md:px-20 pr-20 px-14 pt-4 text-center lg:w-[84%] w-[90%] mx-auto sm:pt-12 ">
          <h2 className="font-patrick-hand text-center lg:text-4xl md:text-3xl sm:text-2xl text-[22px] pb-1">
            About CCCC
          </h2>
          <section className="text-sm text-center font-patrick-hand md:text-lg md:leading-7 lg:leading-9 space-y-2  justify-center">
            <article>
              Cotton Candy Crusader Club is a degenerate club created by
              degenerates for degenerates, Why pretend otherwise? At least we
              have some giggles along the way.
            </article>
            <article>
              TL:DR - 100% of the minting SOL goes straight into 20 mystery
              eggs. Every NFT you mint gives you the right to mint one egg for
              free. Will you be one of the lucky ones to get a completely
              useless image of an eggshell ?{" "}
              <span className="block sr-only">text-block</span>
            </article>
            <article>
              Or will you (highly unlikely) get a useless image of a golden
              eggshell and some SOL ?
            </article>
          </section>

          <button
            onClick={() => ctx.setActiveMenu("none")}
            className="bg-about-ok-btn h-[38px] w-[71px] relative bg-contain bg-no-repeat group z-40 mt-2"
          >
            <span className="absolute inset-0 z-50 transition duration-200 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20"></span>
            <span className=" absolute inset-0 w-full h-full grid place-content-center font-patrick-hand text-[22px] leading-none text-white z-60">
              OK
            </span>
          </button>
        </div>
      </motion.div>
    </Modal>
  );
};

export default AboutSection;
