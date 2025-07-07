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
      <div className=" h-[530px] flex-1 md:block hidden space-y-2 mb-8">
        <h2 className="font-patrick-hand-sc text-4xl">Your NFTs</h2>
        {ctx.myNfts.length > 0 && (
          <div className="grid grid-cols-3 gap-4 pr-6 overflow-y-auto h-[90%] scrollbar-thumb-teal-900">
            {ctx.myNfts.map((nft, index) => (
              <NFTBox key={index} {...nft} />
            ))}
          </div>
        )}
      </div>
      {/*right page  */}
      <div className=" md:h-[500px] flex-1 flex flex-col h-full w-full justify-between items-center"></div>
    </div>
  );
};
