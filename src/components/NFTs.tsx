import { useContext, useEffect, useState } from "react";
import NFTBox from "./UI/NFTBox";
import { CottonCandyContext } from "../providers/ContextProvider";
import SnakeLoader from "./UI/SnakeLoader";

export const NFTs = () => {
  const ctx = useContext(CottonCandyContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ctx.myNfts.length === 0) {
      (async () => {
        try {
          setLoading(true);
          ctx.setMyNfts(await ctx.getNFTs());
        } catch (error: any) {
          console.error("Error:", error.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, []);

  return (
    <>
      <div className=" flex flex-row justify-between items-center gap-24 h-full">
        {/*left page*/}
        <div className=" h-[530px] flex-1 md:block hidden mb-8 pt-4 pr-2 relative ">
          {/* decorations */}
          <div className="bg-mint-section-book-tr bg-contain w-24 h-[92px] absolute top-0 right-0"></div>
          <div className="bg-mint-section-nfts-book bg-contain w-[342px] h-[181px] bg-no-repeat absolute bottom-0 bg-center z-30"></div>

          <div className="flex flex-row md:justify-start justify-end w-[90%] md:w-full items-end md:bg-none z-40   bg-cover bg-bottom md:p-0 p-2 ">
            <img
              src="./images/letter-y-nfts.png"
              alt=""
              className="h-[70%] md:h-auto"
            />
            <h3 className=" font-patrick-hand-sc text-[34px] uppercase ">
              our <span className="text-[48px]">NFT</span>s
            </h3>
          </div>
          <div className="space-y-6 mt-9">
            <div className=" grid grid-cols-3">
              {/* icon */}
              <div className="w-full grid place-content-center  col-span-1">
                <img
                  src={`./images/egg.png`}
                  alt="claimable egg"
                  className=" w-[78px]"
                />
              </div>
              {/* description */}
              <p className="font-patrick-hand text-2xl col-span-2">
                Once sale is over you could summon the Eggs using your NFTs
              </p>
            </div>

            <div className="grid grid-cols-3">
              {/* icon */}
              <div className="  w-full grid place-content-center col-span-1">
                <img
                  src={`./images/lucky-ticket.png`}
                  alt="claimable egg"
                  className=" w-[120px]"
                />
              </div>
              {/* description */}
              <p className="font-patrick-hand text-2xl col-span-2 z-40">
                The Egg is a collectible item with the chance of winning a cash
                prize
              </p>
            </div>
          </div>
        </div>
        {/*right page  */}
        <div className=" md:h-[530px] flex-1 flex flex-col h-full w-full justify-between items-center">
          {loading ? (
            <SnakeLoader className="bg-transparent" />
          ) : ctx.myNfts.length > 0 ? (
            <div className="grid grid-cols-3 gap-4 pr-6 grid-rows-[137px] overflow-y-auto h-[90%]">
              {ctx.myNfts.map((nft, index) => (
                <NFTBox key={index} nft={nft} nftIndex={index} />
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
