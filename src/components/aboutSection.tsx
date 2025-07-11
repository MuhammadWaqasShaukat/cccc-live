import { NFTS } from "../constants/nfts";
import NFTCard from "./UI/NftCard";
import { NFTCardProps } from "../types/NFTCardTypes";

const AboutSection = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="lg:h-[1330px] h-screen w-screen relative bg-about-section bg-no-repeat bg-cover bg-center">
        <span className="bg-grass-pattern h-14 block bg-repeat-x bg-contain"></span>
        {/* statues */}
        <span className="bg-about-section-statue-left lg:h-[955px] h-[60%]  max-w-[564px] w-[50%] absolute top-[15%] lg:top-[11%] lg:left-[4%] -left-12 bg-contain bg-no-repeat"></span>
        <span className="bg-about-section-statue-left scale-x-[-1] lg:scale-x-[1] lg:bg-about-section-statue-right  lg:h-[955px] h-[60%] max-w-[564px] w-[50%]  absolute top-[15%] lg:top-[11%] lg:right-[3%] -right-12  bg-contain bg-no-repeat"></span>

        <div className="lg:mt-[160px] flex flex-col justify-center items-center gap-6">
          <div className="lg:bg-about-section-text-block bg-about-section-text-block-sm bg-contain bg-no-repeat py-8  w-[233px] h-[375px] lg:w-[925px] lg:h-[407px] flex flex-col justify-center items-center relative">
            <div className="flex flex-row justify-center items-end absolute lg:-top-[5.5rem] -top-[2rem] lg:gap-16 gap-x-2.5">
              <img
                src="./images/section-about/badge3.png"
                alt=""
                className="lg:w-[117px] lg:h-[116px] h-[47px] w-[48]"
              />
              <img
                src="./images/section-about/badge2.png"
                alt=""
                className="lg:h-[154px] lg:w-[156px] h-[64px] 2-[65px]"
              />
              <img
                src="./images/section-about/badge1.png"
                alt=""
                className="lg:w-[117px] lg:h-[116px] h-[47px] w-[48]"
              />
            </div>
            <h2 className="font-patrick-hand  text-center lg:text-4xl text-xl pb-5">
              About memenfts
            </h2>
            <p className=" font-patrick-hand  text-center lg:text-lg text-sm w-3/4 lg:px-[75px] px-4 space-y-2 text-[#0A0A0A]">
              <span className=" leading-3">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </span>

              <br />
              <span className=" leading-3">
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English.
              </span>
            </p>
          </div>
          <div className=" flex flex-row justify-center items-center gap-[14.2px] z-10 lg:mt-0 mt-[12%] sm:-mt-4">
            {NFTS.map((card: NFTCardProps, index: number) => (
              <NFTCard {...card} index={index} key={index} />
            ))}
          </div>
        </div>
      </div>
      <span className="bg-about-section-floor absolute w-screen -bottom-[155px] h-[273px] bg-cover bg-center"></span>
      {/* background layer */}
      <span className="bg-about-section-gold-l1 absolute -left-[30px] md:-left-[127px] lg:h-[500px] h-[40%] w-[108%] bg-no-repeat bg-cover md:bottom-[6%] bottom-[7%] bg-left"></span>

      {/* forground layer */}
      <span className="bg-about-section-gold-l2-mobile z-[11] md:bg-about-section-gold-l2 absolute bottom-[6%] md:-bottom-[1%] md:left-[2%]  lg:h-[300px] h-[20%] md:h-[30%]   w-screen bg-no-repeat bg-cover bg-left"></span>
    </div>
  );
};

export default AboutSection;
