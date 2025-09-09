import { useContext } from "react";
import { CottonCandyContext } from "../../providers/ContextProvider";
import useProgramInstructions from "../../hooks/useProgramInstructions";

const NFTActions = ({
  canSummonEgg,
  isEggClaimed,
}: {
  canSummonEgg: boolean;
  isEggClaimed: boolean;
}) => {
  const { collectable, setCurrentModal, setIsPortalOpen, setRefreshNftState } =
    useContext(CottonCandyContext);

  const { SummonEgg } = useProgramInstructions();

  const handleSummonEgg = async () => {
    if (collectable) {
      try {
        setCurrentModal(null);
        setIsPortalOpen(true);
        await SummonEgg(collectable.mintAddress);
      } catch (error: any) {
        console.error("Error : ", error.message);
        setIsPortalOpen(false);
      } finally {
        setIsPortalOpen(false);
        setRefreshNftState(collectable.mintAddress);
      }
    }
  };

  return (
    <div className="flex flex-row items-center justify-center  gap-4 sm:gap-9">
      <a
        className="bg-sell-nft-btn h-14 w-40 relative bg-contain bg-no-repeat group z-40"
        href="https://magiceden.io/"
        target="_blank"
        rel="noreferrer"
      >
        <span className="absolute inset-0 z-50 transition duration-200 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20"></span>
        <span className="absolute inset-0 grid w-full h-full text-2xl leading-none text-white uppercase place-content-center font-patrick-hand z-60">
          Sell NFT
        </span>
      </a>

      <button
        disabled={!canSummonEgg || isEggClaimed}
        onClick={handleSummonEgg}
        className={`  bg-center 
            ${
              canSummonEgg
                ? "bg-summon-egg-btn h-16 w-24"
                : "bg-summon-disabled-btn h-14 w-24"
            } 
         bg-contain bg-no-repeat  group z-40  relative`}
      >
        {!canSummonEgg && (
          <div className="bg-contain size-12 bg-summon-disabled-peppos-btn absolute -top-[50%] right-0"></div>
        )}
        {!canSummonEgg && (
          <span className="absolute left-0 right-0 w-full text-base text-left text-white -bottom-[100%] font-patrick-hand">
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
  );
};

export default NFTActions;
