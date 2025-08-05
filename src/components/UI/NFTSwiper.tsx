import { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import IconButton from "./IconButton";
import { A11y, Navigation } from "swiper/modules";
import { NftState } from "../../types/NFTCardTypes";
import Modal from "./Modal";
import { CottonCandyContext } from "../../providers/ContextProvider";
import { Metadata } from "../../types/Metadata";
import useWeb3Utils from "../../hooks/useWeb3Utils";
import NFTActions from "./NFTActions";

const SlideItem: React.FC<NftState> = (nftState) => {
  const { isEggClaimed } = nftState;
  // const [nftState, setNftState] = useState<NftState | null>(null);

  // const { getNftState, getLotteryState } = useWeb3Utils();

  // useEffect(() => {
  //   (async () => {
  //     if (!mintAddress) return;
  //     const { isEggClaimed, eggMint, eggHatchedAt } = await getNftState(
  //       mintAddress as any
  //     );

  //     const { totalMinted, maxPlayers } = await getLotteryState();

  //     if (totalMinted === maxPlayers) {
  //     }
  //     setNftState({ isEggClaimed, eggHatchedAt, eggMint });
  //   })();
  // }, []);

  return (
    <>
      <div className="z-50 flex flex-col items-center justify-center w-full h-full gap-6 p-4 bg-center bg-no-repeat bg-cover bg-claim-egg-bg rounded-2xl">
        <div
          className={`relative sm:w-[320px] w-[250px] rounded-2xl card-shadow`}
        >
          <img
            className="w-full h-auto rounded-2xl"
            src={`./images/section-mint/nfts/nft1.jpg`}
            alt=""
          />
          {!isEggClaimed ? (
            <div className="absolute flex flex-row items-center justify-center w-full p-4 rounded group bottom-2">
              <div className="transition-all duration-100 bg-center bg-no-repeat bg-contain bg-egg-glow group-hover:bg-egg-glow-1 size-16 md:size-20 lg:size-24"></div>
              <span className="text-5xl text-white text-outline-0 font-patrick-hand-sc">
                x 1
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

const NFTSwiper = () => {
  const ctx = useContext(CottonCandyContext);
  const { getLotteryState } = useWeb3Utils();
  const [canSummonEgg, setCanSummonEgg] = useState(false);
  const [isTutorial, setIsTutorial] = useState<string | null>(null);
  const [currentNftState, setCurrentNftState] = useState<NftState>(
    {} as NftState
  );

  const handleNFTClicked = () => {
    localStorage.setItem("tutorial", JSON.stringify(true));
    setIsTutorial(localStorage.getItem("tutorial"));
  };

  useEffect(() => {
    (async () => {
      const { totalMinted, maxPlayers } = await getLotteryState();
      if (totalMinted === maxPlayers) {
        setCanSummonEgg(true);
      }
    })();

    if (ctx.myNfts.length === 0) {
      (async () => ctx.setMyNfts(await ctx.getNFTs()))();
    }

    const isTutorial: string | null = localStorage.getItem("tutorial");

    if (isTutorial) {
      setIsTutorial(isTutorial);
    }
  }, []);

  const handleSlideChange = (slideIndex: number) => {
    ctx.setCollectiable(ctx.myNfts[slideIndex]);
    const currentNftState = ctx.nftStates[ctx.myNfts[slideIndex].mintAddress];
    setCurrentNftState(currentNftState);
  };

  return (
    <Modal
      onBackgroundClick={() => {}}
      className="z-[51] bg-swiper bg-repeat-y bg-contain justify-start "
    >
      <div className="h-screen hidden md:block fade-left-half w-[50%] absolute left-0 z-20 pointer-events-none"></div>
      <div className="h-screen hidden md:block fade-right-half w-[50%] absolute right-0 z-20 pointer-events-none"></div>
      <div className="relative flex flex-col items-center justify-start gap-6 py-4 sm:justify-center l md:gap-10">
        <div className="flex w-[100vw] flex-col justify-start relative items-center gap-4 ">
          <h1 className="w-full text-4xl text-center text-white font-patrick-hand">
            Minted {ctx.myNfts.length} NFTs:
          </h1>

          {ctx.myNfts.length > 1 && (
            <>
              <IconButton className="swiper-button-prev bg-slider-btn rounded-full size-12 bg-[#B69772] z-20  grid place-content-center">
                <span className="block -ml-1 bg-center bg-no-repeat bg-contain size-5 bg-icon-arrow-left aspect-square"></span>
              </IconButton>
              <IconButton className="swiper-button-next bg-slider-btn rounded-full size-12  bg-[#B69772] z-20  grid place-content-center">
                <span className="block -mr-1 bg-center bg-no-repeat bg-contain size-5 bg-icon-arrow-right aspect-square"></span>
              </IconButton>
            </>
          )}
          <Swiper
            initialSlide={ctx.selectedNftIndex ?? 0}
            className="w-[100vw] swiper-radial-gradient relative"
            modules={[Navigation, A11y]}
            spaceBetween={80}
            slidesPerView={3}
            centeredSlides={true}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 1.5,
                spaceBetween: 40,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 60,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 80,
              },
              1440: {
                slidesPerView: 3,
                spaceBetween: 80,
              },
              1920: {
                slidesPerView: 4,
                spaceBetween: 60,
              },
            }}
            onSlideChange={(swiper) => handleSlideChange(swiper.activeIndex)}
          >
            {ctx.myNfts.map((slide: Metadata, index: number) => {
              const nftMintAddress: string = slide.mintAddress as any;

              return (
                <SwiperSlide key={index} className="">
                  <SlideItem {...ctx.nftStates[nftMintAddress]} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="flex flex-col items-start justify-start min-h-40 max-h-40">
          {!isTutorial && (
            <div className="flex flex-col items-center gap-4">
              <div className="relative flex flex-col justify-center">
                <img
                  src="./images/tutorial-badge.png"
                  className="h-16 xs:h-20"
                />
                <span className=" text-white xs:text-lg text-base font-patrick-hand w-[70%] block absolute right-[5%] ">
                  Every minted card is eligible to summon an Egg once the sale
                  is over
                </span>
              </div>
              <button
                onClick={handleNFTClicked}
                className="relative z-40 w-32 bg-no-repeat bg-contain bg-ok-btn h-14 group"
              >
                <span className="absolute inset-0 z-50 transition duration-200 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20"></span>
                <span className="absolute inset-0 grid w-full h-full text-3xl leading-none text-white place-content-center font-patrick-hand z-60">
                  OK
                </span>
              </button>
            </div>
          )}
          {isTutorial && (
            <div className="mt-4">
              <NFTActions
                canSummonEgg={canSummonEgg}
                isEggClaimed={currentNftState.isEggClaimed}
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default NFTSwiper;
