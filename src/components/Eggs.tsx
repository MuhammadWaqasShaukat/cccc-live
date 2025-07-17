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
      <div className=" h-[530px] flex-1 md:block hidden pt-4 mb-8 relative">
        {/* decorations */}
        <div className="bg-mint-section-book-tr bg-contain w-24 h-[92px] absolute top-0 right-0"></div>
        <div className="bg-mint-section-egg-book bg-contain w-[342px] h-[181px] bg-no-repeat absolute bottom-0 bg-center z-0"></div>

        <div className="flex flex-row md:justify-start justify-end w-[90%] md:w-full items-end md:bg-none   bg-cover bg-bottom md:p-0 p-2 ">
          <img
            src="./images/letter-y-eggs.png"
            alt=""
            className="h-[70%] md:h-auto"
          />
          <h3 className=" font-patrick-hand-sc  text-[34px] uppercase ">
            our <span className="text-[48px]">E</span>GGs
          </h3>
        </div>
        <div className="space-y-6 mt-9">
          <div className=" grid grid-cols-3">
            {/* icon */}
            <div className=" w-full grid place-content-center h-max col-span-1">
              <img
                src={`./images/hammer.png`}
                alt="claimable egg"
                className="w-[100px]"
              />
            </div>
            {/* description */}
            <p className="font-patrick-hand text-2xl col-span-2">
              Eggs can be cracked. Crack an egg for a chance of winning a prize.
              Click the egg to get cracking.
            </p>
          </div>

          <div className="grid grid-cols-3 z-20 relative">
            {/* icon */}
            <div className=" w-full grid place-content-center h-max">
              <img
                src={`./images/hourglass.png`}
                alt="claimable egg"
                className=" w-[80px]"
              />
            </div>
            {/* description */}
            <p className="font-patrick-hand text-2xl col-span-2">
              Cracking takes 24 hours. Multiply eggs can be cracking
              simultaneously.
            </p>
          </div>
        </div>
      </div>
      {/*right page  */}
      <div className=" md:h-[530px] flex-1 flex flex-col h-full w-full justify-between items-center">
        {ctx.myEggs.length > 0 && (
          <div className="grid grid-cols-3 gap-4 auto-rows pr-6 overflow-y-auto h-[90%]">
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
    </div>
  );
};

export default Eggs;
