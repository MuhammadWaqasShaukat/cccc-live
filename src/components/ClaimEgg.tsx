import { useContext, useEffect, useState } from "react";
import InfoText from "./UI/InfoText";
import { CottonCandyContext } from "../providers/ContextProvider";
import Modal from "./UI/Modal";
import useProgramInstructions from "../hooks/useProgramInstructions";
import useWeb3Utils from "../hooks/useWeb3Utils";
import { NftState } from "../types/NFTCardTypes";
import { motion } from "framer-motion";
import { getNewBoughtNftEgg } from "../utils/getNewBoughtNft";

const ClaimEgg = () => {
  const {
    setCollectiable,
    collectable,
    setCurrentModal,
    setIsLoading,
    setShouldRefresh,
    getNftToEggMap,
    setMyNfts,
    getNFTs,
    myEggs,
    getEggNFTs,
    setNftMint,
    setBookmark,
  } = useContext(CottonCandyContext);
  const { ClaimNFT, HatchNFT } = useProgramInstructions();
  const { getNftState, getLotteryState, getNftByType } = useWeb3Utils();

  const [nftState, setNftState] = useState<NftState | null>(null);
  const [canSummonEgg, setCanSummonEgg] = useState(false);

  const handleKeepNFT = async () => {
    setMyNfts(await getNFTs());
    setCurrentModal(null);
    setCollectiable(null);
    setNftState(null);
    setShouldRefresh(true);
  };

  const handleSummonEgg = async () => {
    if (collectable) {
      try {
        setCurrentModal(null);
        setIsLoading(true);
        // setMyNfts(await getNFTs());
        await ClaimNFT(collectable.mintAddress);
        const { eggMint } = await getNftState(collectable.mintAddress);
        await HatchNFT(eggMint, collectable.mintAddress);
        const { nft: NFT_COLLECTION } = await getLotteryState();
        const nfts = await getNftByType("Nft", NFT_COLLECTION);
        getNftToEggMap(nfts);
      } catch (error: any) {
        console.error("Error : ", error.message);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
        setCollectiable(null);
        setShouldRefresh(true);
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

  useEffect(() => {
    (async () => {
      if (!collectable) return;
      const { isEggClaimed, eggMint, eggHatchedAt } = await getNftState(
        collectable.mintAddress
      );

      const { totalMinted, maxPlayers } = await getLotteryState();

      if (totalMinted === maxPlayers) {
        setCanSummonEgg(true);
      }

      setNftState({ isEggClaimed, eggHatchedAt, eggMint });
    })();
  }, []);

  return (
    <Modal onBackgroundClick={handleKeepNFT}>
      <div className="flex flex-col justify-center items-center  w-full h-full bg-claim-egg-bg bg-cover bg-no-repeat bg-center p-4 gap-9 z-50">
        <h1 className=" uppercase text-white  font-patrick-hand-sc text-6xl">
          Here <span className="text-5xl">is your</span> nft
        </h1>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 0.5,
          }}
          className="w-full flex justify-center"
        >
          <div
            className={`relative w-[462px] rounded-2xl ${
              !nftState?.isEggClaimed ? "card-shadow" : ""
            } `}
          >
            <img
              className="w-[462px] h-auto rounded-2xl"
              src={`./images/section-mint/nfts/nft1.jpg`}
              alt=""
            />
            {nftState && !nftState.isEggClaimed ? (
              <div className="absolute bottom-2 flex flex-row justify-center items-center w-full p-4 rounded gap-3">
                <img
                  src={`./images/section-mint/nfts/unbroken.png`}
                  alt="claimable egg"
                />
                <span className="text-outline-0 text-white font-patrick-hand-sc text-5xl">
                  x 1
                </span>{" "}
              </div>
            ) : (
              ""
            )}
          </div>
        </motion.div>

        {nftState && !nftState.isEggClaimed ? (
          <div className=" flex flex-row justify-between items-start gap-9">
            <button
              onClick={handleKeepNFT}
              className="bg-mint-section-btn w-full h-full md:h-[86px] md:w-[191px] relative bg-contain bg-no-repeat group z-40"
            >
              <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20 transition duration-200 z-50"></span>
              <span className=" absolute inset-0 w-full h-full grid place-content-center font-patrick-hand text-3xl leading-none text-white z-60">
                Keep
              </span>
            </button>
            <div className=" flex flex-col justify-start  gap-2">
              <button
                disabled={!canSummonEgg}
                onClick={handleSummonEgg}
                className={`bg-summon-egg-btn w-full h-full md:h-[86px] md:w-[237px] relative bg-contain bg-no-repeat group z-40 rounded-2xl ${
                  canSummonEgg ? " cursor-pointer" : " cursor-not-allowed"
                }`}
              >
                <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20 transition duration-200 z-50"></span>
                <span className=" absolute inset-0 w-full h-full grid place-content-center font-patrick-hand text-3xl  leading-none text-white z-60">
                  Summon Egg
                </span>
              </button>
              <InfoText text="egg charge will be used" />
              <InfoText text="summoning has a gas cost" />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </Modal>
  );
};

export default ClaimEgg;
