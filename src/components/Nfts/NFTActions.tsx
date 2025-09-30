import { useContext } from "react";
import { CottonCandyContext } from "../../providers/ContextProvider";
import useProgramInstructions from "../../hooks/useProgramInstructions";
import { useGetAllNfts } from "../../hooks/useGetAllNFTs";
import useGetUpdatedTokenByMintAddress from "../../hooks/useGetTokenByMintAddress";
import { NftState } from "../../types/NFTCardTypes";
import { useGetAllEggs } from "../../hooks/useGetAllEggs";
import { PublicKey } from "@solana/web3.js";
import { SummonedEggAnimations } from "../../constants/animationsConfig";

const NFTActions = ({
  canSummonEgg,
  isEggClaimed,
}: {
  canSummonEgg: boolean;
  isEggClaimed: boolean;
}) => {
  const {
    collectable,
    setCurrentModal,
    setIsPortalOpen,
    setCurrentSummonedEggAnimationConfig,
    setIsEggSummoned,
  } = useContext(CottonCandyContext);

  const { ClaimNFT, HatchNFT } = useProgramInstructions();

  const { getUpdatedNft, getEggByMintAddress } =
    useGetUpdatedTokenByMintAddress();
  const { updateNftInCache } = useGetAllNfts();
  const { updateEggInCache } = useGetAllEggs();

  const updateNftAndEggCache = async (
    nft: typeof collectable,
    eggMint: string | PublicKey
  ) => {
    if (!nft) return;

    const updatedNft = await getUpdatedNft(nft);
    if (updatedNft) {
      updateNftInCache({ ...updatedNft });
    }

    const nftEgg = await getEggByMintAddress(eggMint as any);
    if (nftEgg) {
      updateEggInCache({ ...nftEgg });
    }
  };

  function hanldeEggIsSummoned() {
    const index = Math.floor(Math.random() * SummonedEggAnimations.length);
    setCurrentSummonedEggAnimationConfig(SummonedEggAnimations[index]);
    setIsEggSummoned(true);
  }

  const handleSummonEgg = async () => {
    if (!collectable?.metadata) return;

    try {
      setCurrentModal(null);
      setIsPortalOpen(true);

      const mintAddress = collectable.metadata.mintAddress;
      const currentState = collectable.state as NftState;

      if (currentState.isEggClaimed && currentState.eggHatchedAt === 0) {
        await HatchNFT(currentState.eggMint, mintAddress);
        await updateNftAndEggCache(collectable, currentState.eggMint);
        hanldeEggIsSummoned();
      } else {
        try {
          await ClaimNFT(mintAddress as any);

          const updatedNft = await getUpdatedNft(collectable);
          if (updatedNft) {
            updateNftInCache(updatedNft);

            const eggMint = (updatedNft.state as NftState).eggMint;

            await HatchNFT(eggMint, mintAddress);

            await updateNftAndEggCache(updatedNft, eggMint);
            hanldeEggIsSummoned();
          }
        } catch (err) {
          console.error("Claim failed (user rejected or tx error):", err);
          return;
        }
      }


    } catch (error: any) {
      console.error("Error in handleSummonEgg:", error.message);
    } finally {
      setIsPortalOpen(false);
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
         bg-contain bg-no-repeat group z-40  relative`}
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
          <span className="absolute whitespace-nowrap left-0 right-0 w-full text-lg text-left text-white -bottom-14 font-patrick-hand">
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
