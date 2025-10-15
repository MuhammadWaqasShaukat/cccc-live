import { useContext, useMemo } from "react";
import Countdown from "../UI/Countdown";
import { CottonCandyContext } from "../../providers/ContextProvider";

const WhitelistCountDown = () => {
  const { lotteryPhase } = useContext(CottonCandyContext);

  const bgClass = useMemo(() => {
    if (lotteryPhase === "minting-start")
      return "bg-whitelist-countdown-whitelisted";
    else {
      return "bg-whitelist-countdown-not-whitelisted";
    }
  }, [lotteryPhase]);

  return (
    <div
      id="whitelist-countdown"
      className={`${bgClass} bg-contain bg-center bg-no-repeat  md:w-[335px] z-100 w-52  absolute flex justify-start items-center mx-auto -mt-8 `}
    >
      <div className="horns relative w-full">
        <div
          className={`flex flex-col items-center justify-center md:gap-4 gap-2 md:p-8 p-4 mx-auto`}
        >
          <h2
            className={` ${
              lotteryPhase === "minting-start" ? "text-white" : "text-black"
            }  font-patrick-hand-sc text-sm  md:text-[28px] md:mt-2 mt-4`}
          >
            {lotteryPhase === "minting-start"
              ? "Minting Starts"
              : "WHITELIST COUNTDOWN"}
          </h2>
          <Countdown />
        </div>
      </div>
    </div>
  );
};

export default WhitelistCountDown;
