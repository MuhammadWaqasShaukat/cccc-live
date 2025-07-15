import Price from "./UI/Price";
import Counter from "./UI/Counter";
import { MouseEvent, useContext } from "react";
import { CottonCandyContext } from "../providers/ContextProvider";
import AnimatedElement from "./UI/AnimatedElement";
import { ANIMATION_WEBM_SOURCES } from "../constants/animatedElements";
import { NFTs } from "./NFTs";
import Eggs from "./Eggs";
import { BookMark } from "../types/BookMarks";
import Bookmark from "./UI/bookmark";
import Modal from "./UI/Modal";
import Remaining from "./UI/Remaining";
import MintButton from "./UI/MintButton";

const MintSection = () => {
  const ctx = useContext(CottonCandyContext);

  const handleBookmarkChange = (newChapter: BookMark) => {
    ctx.setBookmark(newChapter);
  };

  return (
    <Modal
      onBackgroundClick={() => {
        ctx.setCurrentModal(null);
        ctx.setBookmark("mint");
        ctx.setActiveMenu("none");
      }}
    >
      {/* <div className=" relative" id="mint-section" ref={ctx.mintSectionRef}> */}
      {/* <span className="bg-mint-section-stripe-pattern h-8 block bg-repeat-x bg-cover z-10 -m-[2px]"></span> */}
      {/* <div className=" lg:h-[1348px] h-screen w-screen relative bg-mint-section bg-no-repeat bg-cover flex flex-col md:justify-center justify-start items-center"> */}
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="md:bg-mint-section-book  md:h-[768px] w-full md:w-[1163px] md:pl-[170px] md:pr-[150px] md:py-[100px] h-full z-50 relative"
      >
        {/* nav */}

        <div className=" flex flex-col absolute -right-7 gap-7">
          <Bookmark
            active={ctx.bookmark === "mint"}
            onClick={(e: MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
              handleBookmarkChange("mint");
            }}
            className="bg-bm-mint "
            disabledClasss="bg-bm-mint-1"
          >
            <span className="sr-only ">Mint</span>
          </Bookmark>
          <Bookmark
            active={ctx.bookmark === "nfts"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleBookmarkChange("nfts");
              return;
            }}
            className="bg-bm-nft"
            disabledClasss="bg-bm-nft-1"
          >
            <span className="sr-only">NFTs</span>
          </Bookmark>
          <Bookmark
            active={ctx.bookmark === "eggs"}
            onClick={(e: MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
              handleBookmarkChange("eggs");
            }}
            className="bg-bm-egg"
            disabledClasss="bg-bm-egg-1"
          >
            <span className="sr-only">Eggs</span>
          </Bookmark>
        </div>

        {ctx.bookmark === "mint" && (
          <div className=" flex flex-row justify-between items-start gap-20 h-full ">
            {/*left page*/}
            <div className=" h-[530px] flex-1 md:block hidden ">
              <AnimatedElement
                className=" h-[500px] flex-1 md:block hidden"
                source={ANIMATION_WEBM_SOURCES["HorseAnimation"]}
              />
            </div>

            {/*right page  */}
            <div className=" md:h-[530px]  flex-1 flex flex-col h-full w-full justify-between items-center gap-7">
              <div className="flex  flex-row md:justify-start justify-end w-[90%] md:w-full items-end md:bg-none bg-mint-section-heading bg-cover bg-bottom md:p-0 p-2 ">
                <img
                  src="./images/letter-m-mint.png"
                  alt=""
                  className="h-[70%] md:h-auto"
                />
                <h3 className=" font-patrick-hand-sc md:text-[40px] text-[34px] uppercase ">
                  inting is Live!
                </h3>
              </div>

              {/* <AnimatedElement
                className="md:hidden flex flex-row justify-center w-[60%]"
                source={ANIMATION_WEBM_SOURCES["HorseAnimation"]}
              /> */}

              <div className=" flex flex-row justify-between items-start w-full">
                <Remaining />
                <Price />
              </div>

              <div className="flex flex-row justify-between items-center w-full">
                <div className="flex-1">
                  <h2 className="font-patrick-hand-sc text-2xl text-black  ">
                    Quantity
                  </h2>
                </div>
                <Counter />
              </div>

              <div className=" flex flex-col justify-start items-start w-full gap-4">
                {/* Cost */}
                <div className="flex flex-row justify-between items-center w-full">
                  <div className="flex-1">
                    <h2 className="font-patrick-hand-sc text-3xl text-black  ">
                      Cost
                    </h2>
                  </div>
                  <div>
                    <span className="font-patrick-hand-sc text-3xl text-black  ">
                      0.0012 Sol
                    </span>
                  </div>
                </div>
                {/* Gas Fee*/}
                <div className="flex flex-row justify-between items-center w-full">
                  <div className="flex-1">
                    <h2 className="font-patrick-hand-sc text-3xl text-black  ">
                      Gas Fee
                    </h2>
                  </div>
                  <div>
                    <span className="font-patrick-hand-sc text-3xl text-black  ">
                      0.000021 Sol
                    </span>
                  </div>
                </div>
                {/* Total */}
                <div className="flex flex-row justify-between items-center w-full">
                  <div className="flex-1">
                    <h2 className="font-patrick-hand-sc text-3xl text-black  ">
                      Total
                    </h2>
                  </div>
                  <div>
                    <span className="font-patrick-hand-sc text-3xl text-black  ">
                      0.001221 Sol
                    </span>
                  </div>
                </div>
              </div>

              <MintButton />

              {/* {ctx.lotteryState.ended ? (
                  <div className="p-5 md:p-0 flex flex-col gap-6 justify-center items-start h-full">
                    <p className="font-patrick-hand-sc text-center uppercase text-2xl">
                      All your NFTs have been minted!{" "}
                      {ctx.lotteryState.clamable &&
                        ctx.lotteryState.myClaimedNfts > 0
                        ? "you can claim them now!"
                        : "You might have claimed them already!"}
                      .
                    </p>
                    {ctx.lotteryState.clamable &&
                      ctx.lotteryState.myClaimedNfts > 0 ? (
                      <button className=" bg-[#51C947] w-full px-16 py-3">
                        <span className=" w-full h-full grid place-content-center font-patrick-hand text-xl leading-none text-white z-30">
                          Claim
                        </span>
                      </button>
                    ) : (
                      <span className="text-center font-patrick-hand-sc text-black/80 block text-xl"></span>
                    )}
                  </div>
                ) : ( */}
              {/* <div className="md:bg-none bg-mint-controls bg-cover p-5 md:p-0 flex flex-col justify-around items-start h-[40%] md:h-full w-[90%] md:w-auto">
                <Expiration />
              </div> */}
              {/* )} */}
            </div>
          </div>
        )}
        {ctx.bookmark === "nfts" && <NFTs />}
        {ctx.bookmark === "eggs" && <Eggs />}
      </div>
      {/* </div> */}
      {/* bg-iamges  */}
      {/* <div className="bg-mint-section-coins-2 bg-no-repeat bg-contain  w-[239px] h-[262px] absolute top-12 md:block hidden"></div>
      <div className=" bg-mint-section-ipods bg-no-repeat bg-contain w-44 md:w-[337px] h-[257px] absolute top-20 md:top-12 md:left-[342px] -right-16 md:-right-10 z-[11]"></div>
      <div className=" bg-mint-section-cannabis bg-no-repeat bg-contain  w-[327px] h-[252px] absolute top-12 left-[35%] md:block hidden"></div>
      <div className=" bg-mint-section-coins-1 bg-no-repeat bg-contain w-44 md:w-[361px] h-[286px] absolute top-20 md:top-12 md:!right-[25%] right-[75%] z-[11]"></div>
      <div className=" bg-mint-section-paper bg-no-repeat bg-[40%] z-0  w-[548px] h-[468px] absolute -top-[2.2%] -right-20 md:block hidden"></div>
      <div className=" bg-mint-section-donat bg-no-repeat bg-contain w-44 md:w-[308px] h-[282px] absolute top-60 md:top-[25%] md:!left-0 -left-[20%]"></div>
      <div className=" bg-mint-section-keys bg-no-repeat bg-contain  w-[295px] h-[341px] absolute top-[45%] left-0 md:block hidden"></div>
      <div className=" bg-mint-section-feather bg-no-repeat bg-contain w-32 md:w-[243px] h-[610px] absolute top-[27%] md:top-[31%] md:right-[5%] -right-20 -rotate-[19deg] md:-rotate-[25deg] z-0"></div>
      <div className=" bg-mint-section-potato bg-no-repeat bg-contain  w-[517px] h-[476px] absolute bottom-[0.5%] -left-[2%] md:block hidden"></div>
      <div className=" bg-mint-section-coins-3 bg-no-repeat bg-contain z-[11] w-44 md:w-[330px] h-[186px] absolute md:!bottom-[5%] bottom-[26%] md:!left-[25%] -left-[25%]"></div>
      <div className=" bg-mint-section-letter bg-no-repeat bg-contain  w-[593px] h-[397px] absolute -bottom-[5.5%] left-[50%] md:block hidden"></div>
      <div className=" bg-mint-section-coins-2-2 bg-no-repeat bg-contain  w-[261px] h-[288px] absolute bottom-[5%] right-[0px] md:block hidden"></div>
      <span className="bg-mint-section-stripe-pattern h-8 block bg-repeat-x bg-cover"></span> */}
      {/* </div> */}
    </Modal>
  );
};

export default MintSection;
