import { useContext, useEffect, useState } from "react";
import useWeb3Utils from "../../hooks/useWeb3Utils";
import { useWallet } from "@solana/wallet-adapter-react";
import { CottonCandyContext } from "../../providers/ContextProvider";

const Remaining = () => {
  const [remainingState, setRemainingState] = useState<{
    mintedNFTs: number;
    totalNFTs: number;
  }>({ mintedNFTs: 0, totalNFTs: 0 });

  const ctx = useContext(CottonCandyContext);
  const { getLotteryState } = useWeb3Utils();
  const { connected } = useWallet();

  useEffect(() => {
    (async () => {
      const { totalMinted, maxPlayers } = await getLotteryState();

      if (totalMinted >= 0 && maxPlayers >= 0) {
        setRemainingState({ mintedNFTs: totalMinted, totalNFTs: maxPlayers });
      }
    })();
  }, [connected, ctx.lotteryState.ended]);

  return (
    <div className="flex-1 flex flex-col justify-start items-start relative before:content-[''] before:w-[6px] before:h-full before:rounded-[2px] before:bg-[#D18A27] before:absolute before:left-0 ">
      <h4 className="ml-4 text-base md:text-lg lg:text-xl xl:text-2xl font-patrick-hand-sc ">
        Remaining
      </h4>
      <div className="ml-4 font-semibold font-heavitas">
        <span className="text-lg md:text-xl lg:text-2xl xl:text-3xl  text-[#292726]">
          {remainingState.mintedNFTs}
          <span className="text-base lg:text-xl md:text-lg xl:text-2xl  text-[#29272699]">
            /{remainingState.totalNFTs}
          </span>
        </span>
      </div>
    </div>
  );
};

export default Remaining;
