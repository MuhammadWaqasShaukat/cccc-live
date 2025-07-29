import Modal from "./UI/Modal";
import { CottonCandyContext } from "../providers/ContextProvider";
import { useContext, useRef } from "react";
import AnimatedElement from "./UI/AnimatedElement";
import { ANIMATION_WEBM_SOURCES } from "../constants/animatedElements";
import { motion } from "framer-motion";

const AboutSection = () => {
  const ctx = useContext(CottonCandyContext);
  const aboutRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = (videoRef: any) => {
    videoRef.current?.play();
  };

  const handleMouseLeave = (videoRef: any) => {
    videoRef.current?.pause();
  };

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
            {/* <img
              src="./images/section-about/memnft-about.png"
              alt=""
              className=""
            /> */}
            <div className="relative ">
              <div
                className=" absolute h-full w-full z-[999]"
                onMouseEnter={() => handleMouseEnter(aboutRef)}
                onMouseLeave={() => handleMouseLeave(aboutRef)}
              ></div>
              <AnimatedElement
                videoRef={aboutRef}
                className=""
                source={ANIMATION_WEBM_SOURCES["about"]}
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-between mt-10">
            <h2 className="font-patrick-hand text-center  text-[22px] pb-2">
              About memenfts
            </h2>
            <p className="px-10 text-sm leading-6 text-center xs:px-12 font-patrick-hand md:text-base lg:text-lg ">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
              <br />
              The point of using Lorem Ipsum is that it has a more-or-less
              normal distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English.
            </p>

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
        className={`hidden sm:bg-about-section-castle bg-about-section-castle-sm w-[530px] h-[580px]   md:w-[650px] md:h-[700px] xl:w-[700px] xl:h-[750px] xl:max-w-[1163px]  bg-no-repeat sm:flex flex-col justify-end  bg-contain md:bg-center bg-bottom`}
      >
        {/* <div className="  h-[40%] text-center w-[47.5%]   min-w-[150px] mx-auto pt-8 flex flex-col justify-end items-center sm:mb-8 mb-16">
          <img
            src="./images/section-about/memnft-about.png"
            alt=""
            className=""
          />
        </div> */}

        <div className="relative h-[40%] text-center w-[47.5%] min-w-[150px] mx-auto pt-8 flex flex-col justify-end items-center sm:mb-8 mb-16">
          <div
            className=" absolute h-full w-full z-[999] -ml-4"
            onMouseEnter={() => handleMouseEnter(aboutRef)}
            onMouseLeave={() => handleMouseLeave(aboutRef)}
          ></div>
          <AnimatedElement
            videoRef={aboutRef}
            className="-ml-4"
            source={ANIMATION_WEBM_SOURCES["about"]}
          />
        </div>

        <div className=" sm:h-[55%] h-[60%] bg-no-repeat bg-center md:px-16 xl:px-20 px-14 pt-4 text-center sm:w-[90%] w-[70%] mx-auto sm:pt-12">
          <h2 className="font-patrick-hand text-center lg:text-4xl md:text-3xl sm:text-2xl text-[22px] pb-4">
            About memenfts
          </h2>
          <p className="text-sm text-center font-patrick-hand md:text-base lg:text-lg md:leading-7 lg:leading-8">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
            <br />
            The point of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English.
          </p>

          <button
            onClick={() => ctx.setActiveMenu("none")}
            className="bg-about-ok-btn h-[38px] w-[71px] relative bg-contain bg-no-repeat group z-40 mt-4"
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
