import { useEffect, useState } from "react";
import useWeb3Utils from "../../hooks/useWeb3Utils";

const Remaining = () => {
  const [remainingState, setRemainingState] = useState<{
    mintedNFTs: number;
    totalNFTs: number;
  }>({ mintedNFTs: 0, totalNFTs: 0 });

  const { getLotteryState } = useWeb3Utils();
  useEffect(() => {
    (async () => {
      const { totalMinted, maxPlayers } = await getLotteryState();
      if (totalMinted && maxPlayers) {
        setRemainingState({ mintedNFTs: totalMinted, totalNFTs: maxPlayers });
      }
    })();
  }, []);

  return (
    <div className="flex-1 flex flex-col justify-start items-start relative before:content-[''] before:w-[6px] before:h-full before:rounded-[2px] before:bg-[#D18A27] before:absolute before:left-0 ">
      <h4 className="font-patrick-hand-sc text-2xl uppercase ml-4">
        Remaining
      </h4>
      <div className="font-heavitas  ml-4">
        <span className="text-[28px] text-[#292726]">
          {remainingState.mintedNFTs}
          <span className="text-[20px] text-base text-[#29272699]">
            /{remainingState.totalNFTs}
          </span>
        </span>
      </div>
    </div>
  );
};

export default Remaining;
