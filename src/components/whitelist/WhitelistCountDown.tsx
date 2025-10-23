import { useContext, useMemo } from "react";
import Countdown from "../UI/Countdown";
import { CottonCandyContext } from "../../providers/ContextProvider";

const WhitelistCountDown = () => {
  const { lotteryPhase, isWhitelisted } = useContext(CottonCandyContext);

  const showMintingCountdown = useMemo(() => {
    return lotteryPhase === "whitelisting" && isWhitelisted;
  }, [lotteryPhase, isWhitelisted]);

  const bgClass = showMintingCountdown
    ? "bg-whitelist-countdown-whitelisted"
    : "bg-whitelist-countdown-not-whitelisted";

  return (
    <div
      id="whitelist-countdown"
      className={`${bgClass} bg-contain bg-center bg-no-repeat md:w-[335px] w-52 z-100 absolute flex justify-start items-center mx-auto -mt-8`}
    >
      <div className="relative w-full">
        <div className="flex flex-col items-center justify-center md:gap-4 gap-2 md:p-8 p-4 mx-auto">
          <h2
            className={`${
              showMintingCountdown ? "text-white" : "text-black"
            } font-patrick-hand-sc text-sm md:text-[28px] md:mt-2 mt-4`}
          >
            {showMintingCountdown ? "Minting Starts" : "WHITELIST COUNTDOWN"}
          </h2>
          <Countdown />
        </div>
      </div>
    </div>
  );
};

export default WhitelistCountDown;
