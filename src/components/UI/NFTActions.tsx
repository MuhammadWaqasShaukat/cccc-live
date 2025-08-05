import { useContext } from "react";
import { CottonCandyContext } from "../../providers/ContextProvider";
import useWeb3Utils from "../../hooks/useWeb3Utils";
import useProgramInstructions from "../../hooks/useProgramInstructions";
import { getNewBoughtNftEgg } from "../../utils/getNewBoughtNft";

const NFTActions = ({
  canSummonEgg,
  isEggClaimed,
}: {
  canSummonEgg: boolean;
  isEggClaimed: boolean;
}) => {
  const {
    setCollectiable,
    collectable,
    setCurrentModal,
    setIsPortalOpen,
    myEggs,
    getEggNFTs,
    setNftMint,
    setBookmark,
    setRefreshNftState,
  } = useContext(CottonCandyContext);

  const { getNftState } = useWeb3Utils();
  const { ClaimNFT, HatchNFT } = useProgramInstructions();

  const handleSummonEgg = async () => {
    if (collectable) {
      try {
        setCurrentModal(null);
        setIsPortalOpen(true);
        await ClaimNFT(collectable.mintAddress);
        const { eggMint } = await getNftState(collectable.mintAddress);
        await HatchNFT(eggMint, collectable.mintAddress);
      } catch (error: any) {
        console.error("Error : ", error.message);
        setIsPortalOpen(false);
      } finally {
        setIsPortalOpen(false);
        setRefreshNftState(collectable.mintAddress);
        setCollectiable(null);
      }
    }

    const newEgg = await getNewBoughtNftEgg(myEggs, await getEggNFTs());
    if (newEgg && collectable) {
      setNftMint(collectable?.mintAddress);
      setCollectiable(newEgg[0]);
      setCurrentModal("crack-egg");
      setBookmark("eggs");
    }
  };

  return (
    <div className="flex flex-row items-center justify-between gap-4 sm:gap-9">
      <button
        // onClick={handleKeepNFT}
        className="bg-sell-nft-btn h-[64px] w-[196px] relative bg-contain bg-no-repeat group z-40"
      >
        <span className="absolute inset-0 z-50 transition duration-200 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20"></span>
        <span className="absolute inset-0 grid w-full h-full text-3xl leading-none text-white uppercase place-content-center font-patrick-hand z-60">
          Sell NFT
        </span>
      </button>

      <div className="flex flex-col justify-start gap-2 ">
        <button
          disabled={!canSummonEgg || isEggClaimed}
          onClick={handleSummonEgg}
          className={`${
            canSummonEgg
              ? "bg-summon-egg-btn h-16 w-[120px]"
              : "bg-summon-disabled-btn h-[75px] w-[132px]"
          }    bg-contain bg-no-repeat  group z-40 rounded-2xl relative`}
        >
          {!canSummonEgg && (
            <div className="bg-contain size-16 bg-summon-disabled-peppos-btn absolute -top-[60%] right-0"></div>
          )}
          {!canSummonEgg && (
            <span className="absolute left-0 right-0 w-full text-lg text-left text-white -bottom-14 font-patrick-hand">
              Can’t summon egg while sale is active
            </span>
          )}

          {canSummonEgg && isEggClaimed && (
            <span className="absolute left-0 right-0 w-full text-lg text-left text-white -bottom-14 font-patrick-hand">
              Egg summoned already.
            </span>
          )}

          <span className="absolute inset-0 z-50 transition duration-200 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20"></span>
          {canSummonEgg && (
            <span className="inset-0 grid w-full h-full text-4xl leading-none text-white uppercase place-content-center font-patrick-hand z-60">
              Mint
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default NFTActions;
