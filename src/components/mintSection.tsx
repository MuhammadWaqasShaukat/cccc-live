import { useContext, useEffect, useState } from "react";
import { CottonCandyContext } from "../providers/ContextProvider";
import { NFTs } from "./Nfts/NFTs";
import Eggs from "./Eggs/Eggs";
import { BookMark } from "../types/BookMarks";
import Bookmark from "./UI/bookmark";
import Modal from "./UI/Modal";
import { motion } from "framer-motion";
import HowItWorksNav from "./UI/HowItWorks";
import MintingOverPage from "./Mint/MintingOver";
import Mints from "./Mint/Mints";
import HowItWorks from "./Mint/HowItWorks";
import { useWallet } from "@solana/wallet-adapter-react";
import PublicMint from "./Mint/PublicMint";
import { useSpritePreloader } from "../hooks/useSpritePreloader";
import { SPRITES_SOURCES } from "../constants/preloadingAssestList";
import SupperOffer from "./Mint/SupperOffer";

const BookmarkSM = () => {
  const { bookmark, setBookmark } = useContext(CottonCandyContext);
  const { connected } = useWallet();
  const handleBookmarkChange = (newChapter: BookMark) => {
    if (!connected && newChapter !== "mint") return;
    setBookmark(newChapter);
  };

  const { ensureSprites } = useSpritePreloader();

  useEffect(() => {
    ensureSprites("bad-egg", SPRITES_SOURCES["bad-egg"]);
    ensureSprites("good-egg", SPRITES_SOURCES["good-egg"]);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          handleBookmarkChange("mint");
        }}
        className={`w-[85px] xs:w-[112px] xs:h-[45px]  bg-no-repeat bg-contain ${
          bookmark === "mint" || bookmark === "tutorial"
            ? "bg-bm-sm-mint xs:h-[44px] h-[31px]"
            : "bg-bm-sm-1 xs:h-[43px] h-[28px]"
        }`}
      >
        <div className="flex flex-row items-center justify-center h-full gap-1 bg-no-repeat bg-contain">
          <div className="bg-no-repeat bg-contain size-4 bg-bm-mint-icon"></div>
          <p className="text-lg text-white font-patrick-hand">MINT</p>
        </div>
      </button>
      <button
        onClick={() => {
          handleBookmarkChange("nfts");
        }}
        className={`w-[85px]  xs:w-[112px] xs:h-[45px] bg-no-repeat bg-contain ${
          bookmark === "nfts"
            ? "bg-bm-sm-nfts xs:h-[44px] h-[31px]"
            : "bg-bm-sm-1 xs:h-[43px] h-[28px]"
        }`}
      >
        <div className="flex flex-row items-center justify-center h-full gap-1 bg-no-repeat bg-contain">
          <div className="bg-no-repeat bg-contain size-4 bg-bm-nft-icon "></div>
          <p className="text-lg text-white font-patrick-hand">NFTs</p>
        </div>
      </button>
      <button
        onClick={() => {
          handleBookmarkChange("eggs");
        }}
        className={`w-[85px] xs:w-[112px] xs:h-[45px] bg-no-repeat bg-contain ${
          bookmark === "eggs"
            ? "bg-bm-sm-eggs xs:h-[44px] h-[31px]"
            : "bg-bm-sm-1 xs:h-[43px] h-[28px]"
        }`}
      >
        <div className="flex flex-row items-center justify-center h-full gap-1 bg-no-repeat bg-contain">
          <div className="bg-no-repeat bg-contain size-4 bg-bm-egg-icon "></div>
          <p className="text-lg text-white font-patrick-hand">EGGs</p>
        </div>
      </button>
    </>
  );
};

const MintSection = () => {
  const ctx = useContext(CottonCandyContext);
  const { connected } = useWallet();
  const [viewOffer, setViewOffer] = useState(false);

  const handleBookmarkChange = (newChapter: BookMark) => {
    if (!connected && newChapter !== "mint") return;
    ctx.setBookmark(newChapter);
  };

  return (
    <>
      <Modal
        className="justify-start "
        onBackgroundClick={() => {
          ctx.setCurrentModal(null);
          ctx.setBookmark("mint");
          ctx.setActiveMenu("none");
        }}
      >
        {/* for sm screens  */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`h-dvh pb-4 bg-repeat-y bg-cover flex flex-col justify-start items-start  md:hidden overflow-hidden w-dvw ${
            ctx.bookmark === "tutorial"
              ? "bg-how-it-works-leaf bg-center"
              : "bg-sm-mint-section-book"
          }`}
        >
          {!viewOffer && (
            <button
              onClick={() => setViewOffer(!viewOffer)}
              className="bg-super-offer  w-24 h-20 bg-contain bg-no-repeat mx-auto z-70 absolute top-20"
            ></button>
          )}

          {viewOffer && <SupperOffer setViewOffer={setViewOffer} />}

          {/* fixed top-0 left-0 right-0  */}
          <div className="h-[70px] sticky top-0 w-full  px-5 bg-right bg-cover  md:hidden bg-bm-sm-header z-[51] ">
            <div className="flex flex-row items-center justify-start gap-3 pt-5 xs:pt-4 sm:w-2/3">
              {/* back button */}
              <button
                className=" bg-back-btn aspect-square size-8 bg-contain bg-no-repeat "
                onClick={() => ctx.setActiveMenu("none")}
              ></button>
              <div className="flex flex-row items-center justify-center gap-3 flex-1">
                <BookmarkSM />
              </div>
            </div>
          </div>

          {ctx.lotteryState.status === "ended" && ctx.bookmark === "mint" && (
            <MintingOverPage />
          )}
          {ctx.lotteryState.status == "in-progress" &&
            ctx.bookmark === "mint" && <Mints />}

          {ctx.lotteryState.status === "not-started" &&
            ctx.bookmark === "mint" && <PublicMint />}

          {ctx.bookmark === "nfts" && <NFTs />}
          {ctx.bookmark === "eggs" && <Eggs />}
          {ctx.bookmark === "tutorial" && <HowItWorks />}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`${
            ctx.lotteryState.status === "ended" && ctx.bookmark === "mint"
              ? "bg-mint-over"
              : ctx.bookmark === "tutorial"
              ? "bg-old-book"
              : "bg-mint-section-book"
          } md:block hidden mt-16 -ml-10 w-full bg-no-repeat bg-center md:bg-contain bg-cover md:w-[720px] md:h-[470px] lg:w-[850px] lg:h-[560px] xl:w-[950px] xl:h-[620px] xl:pr-[120px] xl:pl-[136px] lg:pr-[98px] md:pr-20 md:pl-24  lg:pl-[107px] lg:pt-[75px] lg:pb-[95px] xl:max-w-[1163px] md:pt-16 md:pb-20 h-full z-50 relative`}
        >
          {!viewOffer && (
            <button
              onClick={() => setViewOffer(!viewOffer)}
              className="bg-super-offer md:w-40 md:h-28 w-32 h-24 bg-contain bg-no-repeat mx-auto z-70 absolute left-1/2 -translate-x-1/2 -top-24"
            ></button>
          )}

          {viewOffer && <SupperOffer setViewOffer={setViewOffer} />}

          {/* nav */}
          <div className="absolute flex-col hidden md:flex xl:-right-11 lg:-right-14 md:-right-16 gap-7 lg:gap-3 md:gap-2">
            <Bookmark
              active={ctx.bookmark === "mint" || ctx.bookmark === "tutorial"}
              onClick={() => {
                handleBookmarkChange("mint");
              }}
              className="bg-bm-mint"
              disabledClasss="bg-bm-mint-1"
            >
              <span className="sr-only ">Mint</span>
            </Bookmark>
            <Bookmark
              active={ctx.bookmark === "nfts"}
              onClick={() => {
                handleBookmarkChange("nfts");
                return;
              }}
              className="bg-bm-nft"
              disabledClasss="bg-bm-nft-1"
              style={{ marginLeft: "-2px" }}
            >
              <span className="sr-only">NFTs</span>
            </Bookmark>
            <Bookmark
              active={ctx.bookmark === "eggs"}
              onClick={() => {
                handleBookmarkChange("eggs");
              }}
              className="bg-bm-egg"
              disabledClasss="bg-bm-egg-1"
            >
              <span className="sr-only">Eggs</span>
            </Bookmark>
            {/* How it works */}
            <HowItWorksNav />
          </div>

          {ctx.lotteryState.status === "ended" && ctx.bookmark === "mint" && (
            <MintingOverPage />
          )}
          {ctx.lotteryState.status == "in-progress" &&
            ctx.bookmark === "mint" && <Mints />}

          {ctx.lotteryState.status === "not-started" &&
            ctx.bookmark === "mint" && <PublicMint />}
          {ctx.bookmark === "nfts" && <NFTs />}
          {ctx.bookmark === "eggs" && <Eggs />}
          {ctx.bookmark === "tutorial" && <HowItWorks />}
        </motion.div>
      </Modal>
    </>
  );
};

export default MintSection;
