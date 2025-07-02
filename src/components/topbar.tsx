import Marquee from "react-fast-marquee";

const TopBar = () => {
  return (
    <Marquee>
      <div className="h-14 bg-[#F9D222] md:flex flex-col justify-center  whitespace-nowrap hidden ">
        <div className=" flex flex-row justify-center items-center">
          <p className="font-patrick-hand text-2xl flex flex-row items-center">
            <span className=" bg-top-bar-sheep-face w-[39px] h-[35px] inline-flex mx-2"></span>
            <span>
              Holy shit nobody saw that coming obviously they start killing each
              other
            </span>
          </p>
          <p className="font-patrick-hand text-2xl flex flex-row items-center">
            <span className=" bg-top-bar-cow-face w-[46px] h-[33px] inline-flex mx-2"></span>
            <span>
              Holy shit nobody saw that coming obviously they start killing each
              other.
            </span>
          </p>
          <p className="font-patrick-hand text-2xl flex flex-row items-center">
            <span className=" bg-top-bar-sheep-face w-[39px] h-[35px] inline-flex mx-2"></span>
            <span>
              Holy shit nobody saw that coming obviously they start killing each
              other
            </span>
          </p>
          <p className="font-patrick-hand text-2xl flex flex-row items-center">
            <span className=" bg-top-bar-cow-face w-[46px] h-[33px] inline-flex mx-2"></span>
            <span>
              Holy shit nobody saw that coming obviously they start killing each
              other.
            </span>
          </p>
        </div>
      </div>
    </Marquee>
  );
};

export default TopBar;
