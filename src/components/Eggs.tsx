import { useContext, useEffect } from "react";
import EggBox from "./UI/EggBox";
import { CottonCandyContext } from "../providers/ContextProvider";

const Eggs = () => {
  const ctx = useContext(CottonCandyContext);

  useEffect(() => {
    if (ctx.myEggs.length === 0) {
      (async () => ctx.setMyEggs(await ctx.getEggNFTs()))();
    }
  }, []);

  return (
    <div className=" flex flex-row justify-between items-center gap-24 h-full">
      {/*left page*/}
      <div className=" h-[530px] flex-1 md:block hidden space-y-2 mb-8">
        <div className=" space-y-1">
          <h2 className="font-patrick-hand-sc text-4xl uppercase font-medium">
            Your Eggs
          </h2>
        </div>
        {ctx.myEggs.length > 0 && (
          <div className="grid grid-cols-3 gap-4 pr-6 overflow-y-auto h-[90%]">
            {ctx.myEggs.map((egg) => {
              return (
                <EggBox
                  key={ctx.nftToEggMap[egg.mintAddress as any]}
                  egg={egg}
                  nftMint={ctx.nftToEggMap[egg.mintAddress as any]}
                />
              );
            })}
          </div>
        )}
      </div>
      {/*right page  */}
      <div className=" md:h-[500px] flex-1 flex flex-col h-full w-full justify-between items-center"></div>
    </div>
  );
};

export default Eggs;
