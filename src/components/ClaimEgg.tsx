import { useContext, useEffect, useRef, useState } from "react";
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
    myEggs,
    getEggNFTs,
    setNftMint,
    setBookmark,
    setRefreshNftState,
  } = useContext(CottonCandyContext);
  const { ClaimNFT, HatchNFT } = useProgramInstructions();
  const { getNftState, getLotteryState } = useWeb3Utils();

  const [nftState, setNftState] = useState<NftState | null>(null);
  const [canSummonEgg, setCanSummonEgg] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playAnimation, setPlayAnimation] = useState(true);

  const handleKeepNFT = async () => {
    setCurrentModal(null);
    setCollectiable(null);
    setNftState(null);
  };

  const handleSummonEgg = async () => {
    if (collectable) {
      try {
        setCurrentModal(null);
        setIsLoading(true);
        await ClaimNFT(collectable.mintAddress);
        const { eggMint } = await getNftState(collectable.mintAddress);
        await HatchNFT(eggMint, collectable.mintAddress);
      } catch (error: any) {
        console.error("Error : ", error.message);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
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
      setPlayAnimation(false);
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
      {playAnimation ? (
        <div className="bg-black relative flex flex-row justify-center items-center ">
          <div className=" h-[65vh] absolute w-[22%] -mt-[40px] ">
            <img
              src="./images/section-mint/minting-image.png"
              alt=""
              className="myImg w-full h-full absolute top-0  overflow-clip"
            />
            {/* </div> */}
          </div>
          <video
            className=" w-screen h-screen"
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
        <div className="flex flex-col justify-center items-center   w-full h-full bg-claim-egg-bg bg-cover bg-no-repeat bg-center p-4 gap-12 z-50">
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
            className="w-full flex justify-center"
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
            <div className=" flex flex-row justify-between items-center gap-9">
              <button
                onClick={handleKeepNFT}
                className="bg-sell-nft-btn w-full h-full md:h-[64px] md:w-[196px] relative bg-contain bg-no-repeat group z-40"
              >
                <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20 transition duration-200 z-50"></span>
                <span className=" absolute inset-0 w-full h-full grid place-content-center uppercase font-patrick-hand text-3xl leading-none text-white z-60">
                  Sell NFT
                </span>
              </button>

              <div className=" flex flex-col justify-start  gap-2">
                <button
                  disabled={!canSummonEgg}
                  onClick={handleSummonEgg}
                  className={`${
                    canSummonEgg
                      ? "bg-summon-egg-btn h-[64px] w-[350px]"
                      : "bg-summon-disabled-btn h-[86px] w-[350px]"
                  }    bg-contain bg-no-repeat  group z-40 rounded-2xl relative cursor-default`}
                >
                  {!canSummonEgg && (
                    <div className="bg-contain size-20 bg-summon-disabled-peppos-btn absolute -top-[60%] right-0"></div>
                  )}
                  {!canSummonEgg && (
                    <span className=" text-white text-center text-lg absolute -bottom-6 font-patrick-hand w-full left-0 right-0">
                      Can’t summon egg while sale is active
                    </span>
                  )}

                  <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20 transition duration-200 z-50"></span>
                  {canSummonEgg && (
                    <span className=" uppercase inset-0 w-full h-full grid place-content-center font-patrick-hand text-4xl  leading-none text-white z-60">
                      Summon the Egg
                    </span>
                  )}
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </Modal>
  );
};

export default ClaimEgg;
