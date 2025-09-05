import { useContext, useEffect, useState } from "react";
import { CottonCandyContext } from "../../providers/ContextProvider";
import Modal from "../UI/Modal";
import useWeb3Utils from "../../hooks/useWeb3Utils";
import { NftState } from "../../types/NFTCardTypes";
import { motion } from "framer-motion";
import NFTActions from "./NFTActions";

const NFTPreview = () => {
  const { setCollectiable, collectable, setCurrentModal } =
    useContext(CottonCandyContext);
  const { getNftState, getLotteryState } = useWeb3Utils();

  const [nftState, setNftState] = useState<NftState | null>(null);
  const [canSummonEgg, setCanSummonEgg] = useState(false);

  const handleKeepNFT = async () => {
    setCurrentModal(null);
    setCollectiable(null);
    setNftState(null);
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

  if (nftState === null) {
    return null;
  }

  return (
    <Modal onBackgroundClick={handleKeepNFT} className="z-[51] bg-swiper ">
      <div className="z-50 flex flex-col items-center justify-center w-dvw h-dvh p-4 gap-10 bg-center bg-no-repeat bg-cover bg-claim-egg-bg overflow-hidden">
        <div className="bg-banner-claim-nft w-full bg-contain bg-no-repeat  max-w-[400px] aspect-[584/159] flex flex-col justify-center items-center">
          <h1 className=" uppercase text-[#1F1F1F] font-patrick-hand-sc lg:text-5xl md:text-4xl text-3xl mb-5">
            NFT #1341
          </h1>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 0.5,
          }}
          className="flex justify-center w-full"
        >
          <div
            className={`relative max-w-[350px] w-[70%] rounded-2xl card-shadow`}
          >
            <img
              className="w-full h-auto rounded-2xl"
              src={`./images/section-mint/nfts/nft1.jpg`}
              alt=""
            />
            {nftState && !nftState.isEggClaimed ? (
              <div className="absolute flex flex-row items-center justify-center w-full gap-3 p-4 rounded bottom-2 group">
                <div className="transition-all duration-100 bg-center bg-no-repeat bg-contain bg-egg-glow group-hover:bg-egg-glow-1 size-16 md:size-20 lg:size-24"></div>
                <span className="text-5xl text-white text-outline-0 font-patrick-hand-sc">
                  x 1
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
        </motion.div>

        {nftState && !nftState.isEggClaimed ? (
          <NFTActions
            canSummonEgg={canSummonEgg}
            isEggClaimed={nftState.isEggClaimed}
          />
        ) : (
          ""
        )}
      </div>
    </Modal>
  );
};

export default NFTPreview;
