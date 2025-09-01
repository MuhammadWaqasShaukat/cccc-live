import { useContext } from "react";
import { CottonCandyContext } from "../providers/ContextProvider";
import { NFTs } from "./Nfts/NFTs";
import Eggs from "./Eggs/Eggs";
import { BookMark } from "../types/BookMarks";
import Bookmark from "./UI/bookmark";
import Modal from "./UI/Modal";
import { motion } from "framer-motion";
import HowItWorks from "./UI/HowItWorks";
import MintingOverPage from "./Mint/MintingOver";
import Mints from "./Mint/Mints";

const BookmarkSM = () => {
  const { bookmark, setBookmark } = useContext(CottonCandyContext);

  const handleBookmarkChange = (newChapter: BookMark) => {
    setBookmark(newChapter);
  };

  return (
    <>
      <button
        onClick={() => {
          handleBookmarkChange("mint");
        }}
        className={`w-[85px] xs:w-[112px] xs:h-[45px]  bg-no-repeat bg-contain ${
          bookmark === "mint"
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

      <button
        className={`h-[38px] w-[35px] bg-no-repeat bg-contain bg-bm-help`}
      >
        <div className="flex flex-row items-center justify-center h-full gap-1 bg-no-repeat bg-contain">
          <p className="text-2xl text-white font-patrick-hand">?</p>
        </div>
      </button>
    </>
  );
};

const MintSection = () => {
  const ctx = useContext(CottonCandyContext);

  const handleBookmarkChange = (newChapter: BookMark) => {
    ctx.setBookmark(newChapter);
  };

  return (
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
        className="block h-screen pb-4 bg-repeat-y bg-cover bg-sm-mint-section-book md:hidden w-dvw"
      >
        <div className="fixed top-0 left-0 right-0 h-[70px] px-5 bg-right bg-cover  md:hidden bg-bm-sm-header z-[51] ">
          <div className="flex flex-row items-center justify-start gap-3 pt-5 xs:pt-4 sm:w-2/3">
            <BookmarkSM />
          </div>
        </div>

        {ctx.lotteryState.ended && ctx.bookmark === "mint" && (
          <MintingOverPage />
        )}
        {!ctx.lotteryState.ended && ctx.bookmark === "mint" && <Mints />}
        {ctx.bookmark === "nfts" && <NFTs />}
        {ctx.bookmark === "eggs" && <Eggs />}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`${
          ctx.lotteryState.ended && ctx.bookmark === "mint"
            ? "bg-mint-over"
            : "bg-mint-section-book"
        } md:block hidden mt-16 -ml-10 w-full bg-no-repeat bg-center md:bg-contain bg-cover md:w-[720px] md:h-[470px] lg:w-[850px] lg:h-[560px] xl:w-[950px] xl:h-[620px] xl:pr-[120px] xl:pl-[136px] lg:pr-[98px] md:pr-20 md:pl-24  lg:pl-[107px] lg:pt-[75px] lg:pb-[95px] xl:max-w-[1163px] md:pt-16 md:pb-20 h-full z-50 relative`}
      >
        {/* nav */}
        <div className="absolute flex-col hidden md:flex xl:-right-11 lg:-right-14 md:-right-16 gap-7 lg:gap-3 md:gap-2">
          <Bookmark
            active={ctx.bookmark === "mint"}
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
          <HowItWorks />
        </div>

        {!ctx.lotteryState.ended && ctx.bookmark === "mint" && <Mints />}
        {ctx.lotteryState.ended && ctx.bookmark === "mint" && (
          <MintingOverPage />
        )}
        {ctx.bookmark === "nfts" && <NFTs />}
        {ctx.bookmark === "eggs" && <Eggs />}
      </motion.div>
    </Modal>
  );
};

export default MintSection;
