import { useContext, useEffect } from "react";
import NFTBox from "./UI/NFTBox";
import { CottonCandyContext } from "../providers/ContextProvider";

export const NFTs = () => {
  const ctx = useContext(CottonCandyContext);

  useEffect(() => {
    if (ctx.myNfts.length === 0) {
      (async () => ctx.setMyNfts(await ctx.getNFTs()))();
    }
  }, []);

  return (
    <div className=" flex flex-row justify-between items-center gap-24 h-full">
      {/*left page*/}
      <div className=" h-[530px] flex-1 md:block hidden space-y-12 mb-8 pr-2 relative">
        {/* decorations */}
        <div className="bg-mint-section-book-tr bg-contain w-24 h-[92px] absolute top-0 right-0"></div>
        <div className="bg-mint-section-nfts-book bg-contain w-[342px] h-[181px] bg-no-repeat absolute bottom-0 bg-center"></div>

        <h2 className="font-patrick-hand-sc text-4xl">Your NFTs</h2>

        <div className="space-y-16">
          <div className=" flex flex-row justify-start items-start gap-2">
            {/* icon */}
            <div className=" w-2/5 grid place-content-center h-max">
              <img
                src={`./images/egg.png`}
                alt="claimable egg"
                className=" h-[70px] w-[61px]"
              />
            </div>
            {/* description */}
            <p className="font-patrick-hand text-2xl">
              Once sale is over you could summon the Eggs using your NFTs
            </p>
          </div>

          <div className=" flex flex-row justify-center items-start gap-2">
            {/* icon */}
            <div className=" w-2/5 grid place-content-center h-max">
              <img
                src={`./images/lucky-ticket.png`}
                alt="claimable egg"
                className=" w-[120px]"
              />
            </div>
            {/* description */}
            <p className="font-patrick-hand text-2xl">
              The Egg is a collectible item with the chance of winning a cash
              prize
            </p>
          </div>
        </div>
      </div>
      {/*right page  */}
      <div className=" md:h-[530px] flex-1 flex flex-col h-full w-full justify-between items-center">
        {ctx.myNfts.length > 0 && (
          <div className="grid grid-cols-3 gap-4 pr-6 overflow-y-auto h-[90%] scrollbar-thumb-teal-900">
            {ctx.myNfts.map((nft, index) => (
              <NFTBox key={index} {...nft} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
