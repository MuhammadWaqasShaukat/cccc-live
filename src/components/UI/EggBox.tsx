import { useContext, useEffect, useState } from "react";
import { CottonCandyContext } from "../../providers/ContextProvider";
import { Metadata, PublicKey } from "@metaplex-foundation/js";
import useWeb3Utils from "../../hooks/useWeb3Utils";
import { FulFilledState } from "../../types/Nft";

const EggBox: React.FC<{ egg: Metadata; nftMint: string }> = ({
  egg,
  nftMint,
}) => {
  const ctx = useContext(CottonCandyContext);

  const [fulfilledState, setFulFilledState] = useState<FulFilledState | null>(
    null
  );

  const handleEggClicked = () => {
    ctx.setCollectiable(egg);
    ctx.setCurrentModal("crack-egg");
    ctx.setNftMint(new PublicKey(nftMint));
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
    (async () => await getEggState())();
  }, [egg]);

  const imageSrc =
    fulfilledState?.status === "pending"
      ? "./images/section-mint/nfts/unbroken.png"
      : fulfilledState?.lotteryStatus === "won"
      ? "./images/section-mint/nfts/reward.png"
      : "./images/section-mint/nfts/broken.png";

  return (
    <div
      data-nft-mint={nftMint}
      onClick={fulfilledState?.status !== "done" ? handleEggClicked : () => {}}
      className={`aspect-square border-2 border-black grid place-content-center h-fit  ${
        fulfilledState?.status !== "done"
          ? "bg-white/40 cursor-pointer"
          : "bg-white/10"
      }`}
    >
      <img src={imageSrc ?? ""} alt={`Egg`} className="object-cover" />
    </div>
  );
};

export default EggBox;
