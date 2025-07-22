import { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import IconButton from "./IconButton";
import { A11y, Navigation } from "swiper/modules";
import { NftState } from "../../types/NFTCardTypes";
import Modal from "./Modal";
import { CottonCandyContext } from "../../providers/ContextProvider";
import { Metadata } from "../../types/Metadata";
import useWeb3Utils from "../../hooks/useWeb3Utils";

const SlideItem: React.FC<Metadata> = ({ mintAddress }) => {
  const [nftState, setNftState] = useState<NftState | null>(null);
  const { getNftState } = useWeb3Utils();

  useEffect(() => {
    (async () => {
      if (!mintAddress) return;
      const { isEggClaimed, eggMint, eggHatchedAt } = await getNftState(
        mintAddress as any
      );
      setNftState({ isEggClaimed, eggHatchedAt, eggMint });
    })();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full bg-claim-egg-bg bg-cover bg-no-repeat bg-center p-4 gap-6 z-50 rounded-2xl">
      <div className={`relative w-[325px] rounded-2xl card-shadow`}>
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
    </div>
  );
};

const NFTSwiper = () => {
  const ctx = useContext(CottonCandyContext);

  const handleNFTClicked = () => {
    // ctx.setCurrentModal("claim-egg");
    ctx.setCurrentModal(null);
  };

  useEffect(() => {
    if (ctx.myNfts.length === 0) {
      (async () => ctx.setMyNfts(await ctx.getNFTs()))();
    }
  }, []);

  return (
    <Modal onBackgroundClick={() => {}} className="bg-black/90 z-[51] ">
      <div className="relative h-full  flex flex-col  justify-center items-center gap-10 my-auto w-[100vw]">
        <h1 className=" text-white font-patrick-hand text-4xl w-full text-center">
          Minted {ctx.myNfts.length} NFTs:
        </h1>

        {ctx.myNfts.length > 1 && (
          <>
            <IconButton className="swiper-button-prev bg-slider-btn rounded-full size-12 bg-[#B69772] z-20  grid place-content-center">
              <span className="size-5 block bg-no-repeat bg-contain bg-center bg-icon-arrow-left -ml-1 aspect-square"></span>
            </IconButton>
            <IconButton className="swiper-button-next bg-slider-btn rounded-full size-12  bg-[#B69772] z-20  grid place-content-center">
              <span className="size-5 block bg-no-repeat bg-contain bg-center bg-icon-arrow-right -mr-1 aspect-square"></span>
            </IconButton>
          </>
        )}
        <Swiper
          initialSlide={ctx.selectedNftIndex ?? 0}
          className="w-[100vw] swiper-radial-gradient"
          modules={[Navigation, A11y]}
          spaceBetween={80}
          slidesPerView={3}
          centeredSlides={true}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          onSlideChange={(swiper) =>
            ctx.setCollectiable(ctx.myNfts[swiper.activeIndex])
          }
        >
          {ctx.myNfts.map((slide: Metadata, index: number) => {
            return (
              <SwiperSlide key={index} className="">
                <SlideItem {...slide} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className=" space-y-10 flex flex-col items-center">
          <div className="relative flex flex-col justify-center">
            <img src="./images/tutorial-badge.png" className=" h-20" />
            <span className=" text-white text-lg font-patrick-hand w-[70%] block absolute right-[5%] ">
              Every minted card is eligible to summon an Egg once the sale is
              over
            </span>
          </div>
          <button
            onClick={handleNFTClicked}
            className="bg-ok-btn  h-14 w-32 relative bg-contain bg-no-repeat group z-40"
          >
            <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20 transition duration-200 z-50"></span>
            <span className=" absolute inset-0 w-full h-full grid place-content-center font-patrick-hand text-3xl leading-none text-white z-60">
              OK
            </span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NFTSwiper;
