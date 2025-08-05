import { useContext, useEffect, useRef, useState } from "react";
import { CottonCandyContext } from "../providers/ContextProvider";
import Modal from "./UI/Modal";
import useWeb3Utils from "../hooks/useWeb3Utils";
import { NftState } from "../types/NFTCardTypes";
import { motion } from "framer-motion";
import NFTActions from "./UI/NFTActions";

const ClaimEgg = () => {
  const {
    setCollectiable,
    collectable,
    setCurrentModal,
    revealNFT,
    setRevealNFT,
  } = useContext(CottonCandyContext);
  const { getNftState, getLotteryState } = useWeb3Utils();

  const [nftState, setNftState] = useState<NftState | null>(null);
  const [canSummonEgg, setCanSummonEgg] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setRevealNFT(false);
    };

    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [videoRef.current]);

  if (nftState === null) {
    return null;
  }

  return (
    <Modal onBackgroundClick={handleKeepNFT} className="z-[51] bg-black/90">
      {revealNFT ? (
        <div className="relative flex flex-row items-center justify-center bg-black ">
          <div className=" h-[65vh] absolute w-[22%] -mt-[40px] ">
            <img
              src="./images/section-mint/minting-image.png"
              alt=""
              className="absolute top-0 w-full h-full myImg overflow-clip"
            />
            {/* </div> */}
          </div>
          <video
            className="w-screen h-screen "
            ref={videoRef}
            autoPlay
            muted
            playsInline
          >
            <source
              src="./images/animations/particles.webm"
              type="video/webm"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <div className="z-50 flex flex-col items-center justify-center w-full h-full gap-12 p-4 bg-center bg-no-repeat bg-cover bg-claim-egg-bg">
          <div className="bg-banner-claim-nft w-[584px] h-[156px] flex flex-col justify-center items-center">
            <h1 className=" uppercase text-[#1F1F1F] font-patrick-hand-sc text-5xl mb-5">
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
              className={`relative w-[350px] rounded-2xl ${
                !nftState?.isEggClaimed ? "card-shadow" : ""
              } `}
            >
              <img
                className="w-full h-auto rounded-2xl"
                src={`./images/section-mint/nfts/nft1.jpg`}
                alt=""
              />
              {nftState && !nftState.isEggClaimed ? (
                <div className="absolute flex flex-row items-center justify-center w-full gap-3 p-4 rounded bottom-2">
                  <img
                    src={`./images/section-mint/nfts/unbroken.png`}
                    alt="claimable egg"
                  />
                  <span className="text-5xl text-white text-outline-0 font-patrick-hand-sc">
                    x 1
                  </span>{" "}
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
      )}
    </Modal>
  );
};

export default ClaimEgg;
