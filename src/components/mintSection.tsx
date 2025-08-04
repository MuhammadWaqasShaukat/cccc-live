import Price from "./UI/Price";
import Counter from "./UI/Counter";
import { useContext } from "react";
import { CottonCandyContext } from "../providers/ContextProvider";
import { NFTs } from "./NFTs";
import Eggs from "./Eggs";
import { BookMark } from "../types/BookMarks";
import Bookmark from "./UI/bookmark";
import Modal from "./UI/Modal";
import Remaining from "./UI/Remaining";
import MintButton from "./UI/MintButton";

import { motion } from "framer-motion";
// import PublicMint from "./PublicMint";

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
        {ctx.bookmark === "mint" && (
          <>
            {/* <PublicMint /> */}

            <div className="flex flex-col items-center justify-between h-full gap-6 pt-20 overflow-auto">
              <div className="flex flex-row items-end justify-center w-full p-2 bg-bottom bg-cover md:hidden md:justify-start md:bg-none bg-mint-section-heading md:p-0 ">
                <img
                  src="./images/letter-m-mint.png"
                  alt=""
                  className="w-12 h-auto xs:w-14"
                />
                <h3 className="text-2xl uppercase font-patrick-hand-sc xs:text-3xl">
                  inting is Live!
                </h3>
              </div>

              <div className="flex flex-col items-center justify-center flex-1 w-full max-h-max">
                <div className="h-full relative xs:min-h-[320px] xs:min-w-[220px] min-h-[269px] min-w-[169px]">
                  <img
                    src="./images/section-mint/minting-image.png"
                    alt=""
                    className="absolute bottom-3 left-0 border-[3px] border-white rounded-xl card-shadow-1"
                  />
                  <img
                    src="./images/section-mint/nft-1.png"
                    alt=""
                    className="absolute bottom-2.5 left-6 -rotate-2 border-[3px] border-white rounded-xl origin-bottom-left card-shadow-1 "
                  />
                  <img
                    src="./images/section-mint/minting-image.png"
                    alt=""
                    className="absolute top-4 left-5  rotate-2 border-[3px] border-white rounded-xl card-shadow-1 "
                  />
                </div>
              </div>

              <div className="flex flex-row items-start justify-center w-full px-12 sm:justify-between">
                <Remaining />
                <Price />
              </div>

              <div className="flex flex-row items-center justify-between w-full px-12">
                <div className="flex-1">
                  <h2 className="text-lg text-black font-patrick-hand-sc">
                    Quantity
                  </h2>
                </div>
                <Counter />
              </div>

              <div className="flex flex-col items-start justify-start w-full gap-1 ">
                {/* Cost */}
                <div className="flex flex-row items-center justify-between w-full px-12">
                  <div className="flex-1">
                    <h2 className="text-xl text-black font-patrick-hand-sc">
                      Cost
                    </h2>
                  </div>
                  <div>
                    <span className="text-xl text-black font-patrick-hand-sc">
                      {ctx.estimate ?? ctx.price} Sol
                    </span>
                  </div>
                </div>
                {/* Gas Fee*/}
                <div className="flex flex-row items-center justify-between w-full px-12">
                  <div className="flex-1">
                    <h2 className="text-xl text-black font-patrick-hand-sc">
                      Gas Fee
                    </h2>
                  </div>
                  <div>
                    <span className="text-xl text-black font-patrick-hand-sc">
                      {ctx.gasFee} Sol
                    </span>
                  </div>
                </div>
                {/* Total */}
                <div className="flex flex-row items-center justify-between w-full px-12">
                  <div className="flex-1">
                    <h2 className="text-xl text-black font-patrick-hand-sc">
                      Total
                    </h2>
                  </div>
                  <div>
                    <span className="text-xl text-black font-patrick-hand-sc">
                      {(ctx.gasFee + (ctx.estimate ?? ctx.price)).toFixed(9)}{" "}
                      Sol
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-start justify-center w-full mx-auto">
                <MintButton />
              </div>
            </div>
          </>
        )}
        {ctx.bookmark === "nfts" && <NFTs />}
        {ctx.bookmark === "eggs" && <Eggs />}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="md:block hidden bg-mint-section-book  mt-16 w-full bg-no-repeat bg-center md:bg-contain bg-cover md:w-[720px] md:h-[470px] lg:w-[850px] lg:h-[560px] xl:w-[950px] xl:h-[620px] xl:pr-[120px] xl:pl-[136px] lg:pr-[98px] md:pr-20 md:pl-24  lg:pl-[107px] lg:pt-[75px] lg:pb-[95px] xl:max-w-[1163px] md:pt-16 md:pb-20 h-full z-50 relative"
      >
        {/* nav */}
        <div className="absolute flex-col hidden md:flex xl:-right-7 lg:-right-10 md:-right-4 gap-7 lg:gap-3 md:gap-2">
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
        </div>

        {ctx.bookmark === "mint" && (
          <>
            {/* <PublicMint /> */}

            <div className="flex flex-col items-center justify-between h-full mx-auto sm:w-2/3 md:flex-row md:items-start md:gap-4 md:w-full ">
              <div
                data-page="left"
                className="flex flex-col items-center justify-center flex-1 h-full -ml-2"
              >
                <div className="h-[90%] w-[90%] min-w-64 relative">
                  <img
                    src="./images/section-mint/minting-image.png"
                    alt=""
                    className="h-[98%] min-w-[191px] aspect-[191/269]  absolute top-0 left-0 border-[3px] border-white rounded-xl card-shadow-1"
                  />
                  <img
                    src="./images/section-mint/nft-1.png"
                    alt=""
                    className="h-[96%] min-w-[191px] aspect-[191/269] absolute bottom-2.5 left-6 -rotate-2 border-[3px] border-white rounded-xl origin-bottom-left card-shadow-1 "
                  />
                  <img
                    src="./images/section-mint/minting-image.png"
                    alt=""
                    className="h-[98%] min-w-[191px] aspect-[191/269] absolute top-4 left-5  rotate-2 border-[3px] border-white rounded-xl card-shadow-1 "
                  />
                </div>
              </div>
              <div
                data-page="right"
                className="flex flex-col items-center justify-start flex-1 w-full h-full gap-2 lg:gap-4 md:gap-3 xl:gap-5"
              >
                <div className="md:flex hidden flex-row md:justify-start justify-end w-[90%] md:w-full items-end md:bg-none bg-mint-section-heading bg-cover bg-bottom md:p-0 p-2 ">
                  <img
                    src="./images/letter-m-mint.png"
                    alt=""
                    className="h-[70%] md:h-auto lg:size-10 md:size-8 xl:size-14"
                  />
                  <h3 className="uppercase font-patrick-hand-sc lg:text-3xl md:text-2xl xl:text-4xl">
                    inting is Live!
                  </h3>
                </div>

                <div className="flex flex-row items-start justify-center w-full px-12 sm:justify-between sm:p-0">
                  <Remaining />
                  <Price />
                </div>

                <div className="flex flex-row items-center justify-between w-full px-12 sm:p-0">
                  <div className="flex-1">
                    <h2 className="text-lg text-black font-patrick-hand-sc sm:text-2xl xl:3xl lg:text-2xl md:text-xl ">
                      Quantity
                    </h2>
                  </div>
                  <Counter />
                </div>

                <div className="flex flex-col items-start justify-start w-full gap-1 xl:gap-2">
                  {/* Cost */}
                  <div className="flex flex-row items-center justify-between w-full px-12 sm:p-0">
                    <div className="flex-1">
                      <h2 className="text-xl black text- font-patrick-hand-sc xl:3xl lg:text-2xl md:text-xl">
                        Cost
                      </h2>
                    </div>
                    <div>
                      <span className="text-xl text-black font-patrick-hand-sc xl:text-3xl lg:text-2xl md:text-xl">
                        {ctx.estimate ?? ctx.price} Sol
                      </span>
                    </div>
                  </div>
                  {/* Gas Fee*/}
                  <div className="flex flex-row items-center justify-between w-full px-12 sm:p-0">
                    <div className="flex-1">
                      <h2 className="text-xl black text- font-patrick-hand-sc xl:3xl lg:text-2xl md:text-xl">
                        Gas Fee
                      </h2>
                    </div>
                    <div>
                      <span className="text-xl text-black font-patrick-hand-sc xl:text-3xl lg:text-2xl md:text-xl">
                        {ctx.gasFee} Sol
                      </span>
                    </div>
                  </div>
                  {/* Total */}
                  <div className="flex flex-row items-center justify-between w-full px-12 sm:p-0">
                    <div className="flex-1">
                      <h2 className="text-xl black text- font-patrick-hand-sc xl:3xl lg:text-2xl md:text-xl">
                        Total
                      </h2>
                    </div>
                    <div>
                      <span className="text-xl text-black font-patrick-hand-sc xl:text-3xl lg:text-2xl md:text-xl">
                        {(ctx.gasFee + (ctx.estimate ?? ctx.price)).toFixed(9)}{" "}
                        Sol
                      </span>
                    </div>
                  </div>
                </div>

                <MintButton />
              </div>
            </div>
          </>
        )}
        {ctx.bookmark === "nfts" && <NFTs />}
        {ctx.bookmark === "eggs" && <Eggs />}
      </motion.div>
    </Modal>
  );
};

export default MintSection;
