import { useContext, useEffect, useState } from "react";
import { CottonCandyContext } from "../../providers/ContextProvider";
import useWeb3Utils from "../../hooks/useWeb3Utils";
import { FulFilledState } from "../../types/Nft";

const EggBox: React.FC<{ egg: any; nftMint: string }> = ({ egg, nftMint }) => {
  const ctx = useContext(CottonCandyContext);

  const [fulfilledState, setFulFilledState] = useState<FulFilledState | null>(
    null
  );

  const handleEggClicked = () => {
    ctx.setCollectiable(egg);
    ctx.setCurrentModal("crack-egg");
    ctx.setNftMint(nftMint);
  };

  const { getEggFulFilledState } = useWeb3Utils();

  const getEggState = async () => {
    try {
      const { status, lotteryStatus } = await getEggFulFilledState(
        egg.mintAddress
      );
      setFulFilledState({ status, lotteryStatus });
    } catch (error: any) {
      console.error("Error: ", error.message);
    }
  };

  useEffect(() => {
    (async () => await getEggState())();
  }, []);

  useEffect(() => {
    if (egg.mintAddress !== ctx.refreshNftState) return;
    (async () => {
      (async () => await getEggState())();
    })();
  }, [ctx.refreshNftState]);

  const imageSrc = "./images/section-mint/nfts/egg.png";
  // fulfilledState?.status === "pending"
  //   ? "./images/section-mint/nfts/egg.png"
  //   : fulfilledState?.lotteryStatus === "won"
  //   ? "./images/section-mint/nfts/reward.png"
  //   : "./images/section-mint/nfts/broken.png";

  console.log("fu", fulfilledState);

  return (
    <div
      data-nft-mint={nftMint}
      onClick={handleEggClicked}
      className={`aspect-square border-2 border-black rounded-xl grid place-content-center h-fit overflow-hidden  relative`}
    >
      {/* reward */}
      {fulfilledState?.status === "done" &&
        fulfilledState?.lotteryStatus === "won" && (
          <div className="bg-hatch-won h-full w-full absolute top-0 left-0 right-0 bottom-0"></div>
        )}

      {/* no reward */}
      {fulfilledState?.status === "done" &&
        fulfilledState?.lotteryStatus === "lost" && (
          <div className="bg-hatch-lost h-full w-full absolute top-0 left-0 right-0 bottom-0"></div>
        )}

      <img
        src={imageSrc ?? ""}
        alt={`Egg`}
        className="object-cover overflow-hidden"
      />
    </div>
  );
};

export default EggBox;
