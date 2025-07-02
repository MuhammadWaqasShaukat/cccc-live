import { useContext, useEffect, useState } from "react";
import EggBox from "./UI/EggBox";
import { Metadata } from "@metaplex-foundation/js";
import { CottonCandyContext } from "../providers/ContextProvider";

// const EggCrackCountDown = ({
//   nextCrackAvailabilty,
// }: {
//   nextCrackAvailabilty: number;
// }) => {
//   const now = Math.floor(Date.now() / 1000);
//   const diffInSeconds = Math.abs(nextCrackAvailabilty - now);

//   const hours = Math.floor(diffInSeconds / 3600);
//   const minutes = Math.floor((diffInSeconds % 3600) / 60);

//   console.log(minutes, hours, diffInSeconds);

//   return (
//     <div className=" font-patrick-hand-sc inline-block text-2xl">
//       {hours}
//       <span className="text-lg">H</span> {minutes}
//       <span className="text-lg">M</span>
//     </div>
//   );
// };

const Eggs = () => {
  const [eggs, setEggs] = useState<Metadata[]>([]);
  const ctx = useContext(CottonCandyContext);

  async function getNFTEggs() {
    try {
      ctx.setIsLoading(true);
      const eggs = await ctx.getEggNFTs();
      setEggs(eggs);
    } catch (error: any) {
      console.error("Error", error.message);
    } finally {
      ctx.setIsLoading(false);
    }
  }

  useEffect(() => {
    if (ctx.shouldRefersh) {
      (async () => {
        await getNFTEggs();
        ctx.setShouldRefresh(false);
      })();
    }
  }, [ctx.shouldRefersh]);

  useEffect(() => {
    (async () => {
      await getNFTEggs();
    })();
  }, []);

  return (
    <div className=" flex flex-row justify-between items-center gap-24 h-full">
      {/*left page*/}
      <div className=" h-[530px] flex-1 md:block hidden space-y-2 mb-8">
        <div className=" space-y-1">
          <h2 className="font-patrick-hand-sc text-4xl uppercase font-medium">
            Your Eggs
          </h2>
          {/* <div className=" flex flex-row justify-start items-center">
            <p className="font-patrick-hand-sc text-2xl uppercase">
              next crack available in:
            </p>
            <EggCrackCountDown
              nextCrackAvailabilty={ctx.nextCrackAvailabilty}
            />
          </div> */}
        </div>
        {eggs.length > 0 && (
          <div className="grid grid-cols-3 gap-2 pr-6 overflow-y-auto h-[90%]">
            {eggs.map((egg) => {
              return (
                <EggBox
                  key={ctx.nftToEggMap[egg.mintAddress.toBase58()]}
                  egg={egg}
                  nftMint={ctx.nftToEggMap[egg.mintAddress.toBase58()]}
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
