import { useState } from "react";
import NFTBox from "./NFTBox";
import NftLoader from "../UI/NftLoader";
import NFTInstructions from "./NFTInstructions";
import { useGetAllNfts } from "../../hooks/useGetAllNFTs";

export const NFTs = () => {
  const { data: nfts, isLoading: loading } = useGetAllNfts();
  const [viewInstruction, setViewInstruction] = useState(false);

  return (
    <>
      {viewInstruction && (
        <NFTInstructions setViewInstruction={setViewInstruction} />
      )}

      <div className="flex flex-col items-start justify-start h-full gap-5 px-5 py-2 overflow-y-auto md:hidden  w-full">
        {/* top bar */}
        <div className="flex flex-row items-start justify-between w-full ">
          <div className="flex flex-row justify-start w-[90%] md:w-full items-center md:bg-none z-40 bg-cover bg-bottom md:pt-2.5 md:pl-4">
            <img src="./images/letter-y-nfts.webp" alt="" className="size-10" />
            <h3 className="text-2xl uppercase font-patrick-hand-sc">
              our <span className="text-3xl">NFT</span>s
            </h3>
          </div>
          <button
            onClick={() => setViewInstruction(true)}
            className="border-2 border-[#684D29] bg-[#BE9E74] px-2.5 py-1.5 rounded-md"
          >
            <span className="text-lg text-black uppercase">instruction</span>
          </button>
        </div>
        {loading ? (
          <NftLoader />
        ) : !loading && nfts && nfts.length > 0 ? (
          <div className="grid w-full grid-cols-3 gap-4 sm:grid-cols-4 md:pr-2 md:gap-2 ">
            {nfts.map((nft, index) => (
              <NFTBox key={index} nft={nft} nftIndex={index} />
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="flex-row items-center justify-between hidden h-full gap-16 md:flex">
        {/*left page*/}
        <div className="relative flex flex-col items-center justify-start flex-1 w-full h-full -ml-2">
          {/* decorations */}
          <div className="bg-mint-section-book-tr w-24 h-[92px] md:size-16 bg-no-repeat bg-contain absolute top-0 right-0"></div>
          <div className="bg-mint-section-nfts-book bg-contain w-[342px] h-[181px] lg:w-[275px] lg:h-[170px] md:w-[244px] md:h-[140px] bg-no-repeat absolute bottom-0 bg-center z-30"></div>

          <div className="flex flex-row md:justify-start justify-end w-[90%] md:w-full items-end md:bg-none z-40   bg-cover bg-bottom md:pt-2.5 md:pl-4">
            <img
              src="./images/letter-y-nfts.webp"
              alt=""
              className="h-[70%] md:h-auto lg:size-10 md:size-8"
            />
            <h3 className="uppercase font-patrick-hand-sc lg:text-3xl md:text-2xl">
              our <span className="lg:text-4xl md:3xl">NFT</span>s
            </h3>
          </div>
          <div className="space-y-6 mt-9">
            <div className="grid grid-cols-3 ">
              {/* icon */}
              <div className="grid w-full col-span-1 place-content-center">
                <img
                  src={`./images/egg.webp`}
                  alt="claimable egg"
                  className=" w-[78px] md:w-12 lg:w-16"
                />
              </div>
              {/* description */}
              <p className="col-span-2 text-2xl font-patrick-hand md:text-base lg:text-lg">
                Once sale is over you could summon the Eggs using your NFTs
              </p>
            </div>

            <div className="grid grid-cols-3">
              {/* icon */}
              <div className="grid w-full col-span-1 place-content-center">
                <img
                  src={`./images/lucky-ticket.webp`}
                  alt="claimable egg"
                  className=" w-[120px] md:w-14 lg:w-20"
                />
              </div>
              {/* description */}
              <p className="z-40 col-span-2 text-2xl font-patrick-hand md:text-base lg:text-lg">
                The Egg is a collectible item with the chance of winning a cash
                prize
              </p>
            </div>
          </div>
        </div>
        {/*right page  */}
        <div className="flex flex-col items-center flex-1 w-full h-full sm:justify-between md:justify-start sm:gap-7 lg:gap-4 md:gap-3">
          {loading ? (
            <NftLoader />
          ) : !loading && nfts && nfts.length > 0 ? (
            <div
              className="grid grid-cols-3 gap-4 pr-6 overflow-y-auto md:pr-2 md:gap-2 guide"
              style={{ scrollbarGutter: "stable" }}
            >
              {nfts.map((nft, index) => (
                <NFTBox key={index} nft={nft} nftIndex={index} />
              ))}
            </div>
          ) : (
            <div className="bg-no-repeat bg-contain bg-no-nfts bg-bottom w-full h-full"></div>
          )}
        </div>
      </div>
    </>
  );
};
