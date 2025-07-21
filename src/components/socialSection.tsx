const SocialSection = () => {
  return (
    <div>
      <div className="h-screen lg:h-[1400px] relative bg-social-section  justify-center items-center bg-no-repeat bg-cover lg:pt-[151px] pt-6 md:pt-12">
        <div className="flex flex-col justify-center items-center gap-4 w-full absolute top-1/4 -translate-y-1/4 z-50">
          <div className=" flex flex-row items-center gap-4 flex-wrap justify-center">
            <button className=" bg-social-section-button-secondary lg:h-[207px] lg:w-[515px] w-[156px] h-[64px] bg-contain bg-no-repeat group relative">
              {/* button state overlay */}
              <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20 transition duration-200 z-20"></span>

              <span className="uppercase absolute inset-0 w-full h-full grid place-content-center  font-patrick-hand-sc lg:text-[60px] text-lg leading-none lg:tracking-[3px] text-white z-30">
                merchandise
              </span>
            </button>
            <button className=" bg-social-section-button-secondary lg:h-[207px] lg:w-[515px] w-[156px] h-[64px] bg-contain bg-no-repeat group relative">
              {/* button state overlay */}
              <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20 transition duration-200 z-20"></span>

              <span className=" uppercase absolute inset-0 w-full h-full grid place-content-center  font-patrick-hand-sc lg:text-[60px] text-lg leading-none lg:tracking-[3px] text-white z-30">
                10K memesnfts
              </span>
            </button>
          </div>
          <div className=" flex flex-row justify-center items-center flex-wrap gap-4">
            <button className=" bg-social-section-button-telegram lg:w-[340px] lg:h-[135px] w-[156px] h-[64px] bg-contain bg-no-repeat flex flex-row justify-center items-center gap-2 group relative">
              <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20 transition duration-200 z-20"></span>

              <div className="absolute inset-0 w-full h-full flex flex-row justify-center items-center z-30 gap-2.5">
                <img
                  src="./images/tel.svg"
                  alt=""
                  height={44}
                  width={44}
                  className=" h-[30%] lg:h-full inline-block"
                />
                <span className="uppercase font-patrick-hand-sc lg:text-[40px] text-lg  leading-none lg:tracking-[3px] text-white">
                  telegram
                </span>
              </div>
            </button>
            <button className=" bg-social-section-button-instagram lg:w-[340px] lg:h-[135px] w-[156px] h-[64px] bg-contain bg-no-repeat flex flex-row justify-center items-center gap-2 group relative">
              <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20 transition duration-200 z-20"></span>

              <div className="absolute inset-0 w-full h-full flex flex-row justify-center items-center z-30 gap-2.5">
                <img
                  src="./images/inst.svg"
                  alt=""
                  height={44}
                  width={44}
                  className=" h-[30%] lg:h-full "
                />
                <span className="uppercase font-patrick-hand-sc lg:text-[40px] text-lg  leading-none lg:tracking-[3px] text-white">
                  Instagram
                </span>
              </div>
            </button>
            <button className=" bg-social-section-button-x lg:w-[340px] lg:h-[135px] w-[156px] h-[64px] bg-contain bg-no-repeat flex flex-row justify-center items-center group relative">
              <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20 transition duration-200 z-20"></span>
              <div className="absolute inset-0 w-full h-full flex flex-row justify-center items-center z-30 gap-2.5">
                <img
                  src="./images/x.svg"
                  height={44}
                  width={44}
                  alt=""
                  className=" h-[30%] lg:h-full "
                />
              </div>
            </button>
          </div>
        </div>
        <div className="relative h-full w-full">
          {/* <AnimatedElement
            className="w-full h-[430px] sm:h-[500px] md:h-[60%] object-cover absolute bottom-[9%]  md:bottom-[12%] z-20"
            source={ANIMATION_WEBM_SOURCES["warriors"]}
          /> */}
          <img
            src="./images/section-social/distant-bg.png"
            className="w-full h-[430px] sm:h-[500px] md:h-[60%] object-contain absolute bottom-[9%]  md:bottom-[4%] z-0"
            alt="distant-bg"
          />
          <img
            src="./images/section-social/bg-lower.png"
            className="w-full h-[300px] sm:h-[350px] md:h-[40%] object-cover absolute bottom-0 z-30"
          />

          <div className="w-screen absolute bottom-0 md:bottom-[2%] lg:bottom-[8%] z-40 flex flex-col  items-center  lg:gap-6 gap-3 h-[230px] md:h-[240px] lg:h-[287px]">
            <img
              src="./images/logo.png"
              alt=""
              className="h-[50%] sm:h-[60%] md:h-[70%] lg:h-[100%]"
            />
            <p className="font-impact lg:text-[50px] text-2xl text-white text-outline outline-8 uppercase">
              Cotton Candy Crusader Club
            </p>
            <span className=" font-patrick-hand lg:text-base text-xs text-white ">
              Copyright © 2025. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialSection;
