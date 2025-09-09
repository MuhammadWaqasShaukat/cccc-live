import { useContext, useEffect, useState } from "react";
import EggBox from "./EggBox";
import { CottonCandyContext } from "../../providers/ContextProvider";
import NftLoader from "../UI/NftLoader";
import EggInstruction from "./EggInstruction";

const Eggs = () => {
  const ctx = useContext(CottonCandyContext);
  const [viewInstruction, setViewInstruction] = useState(false);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (ctx.myEggs.length === 0) {
      (async () => {
        try {
          setLoading(true);
          ctx.setMyEggs(await ctx.getEggNFTs());
        } catch (error: any) {
          console.error("Error:", error.message);
        } finally {
          setLoading(false);
        }
      })();
    }

    return () => {
      setLoading(false);
      setViewInstruction(false);
    };
  }, []);

  return (
    <>
      {viewInstruction && (
        <EggInstruction setViewInstruction={setViewInstruction} />
      )}

      <div className="flex flex-col items-start justify-start w-full  h-full gap-5 px-5 py-2 overflow-y-auto md:hidden">
        {/* top bar */}
        <div className="flex flex-row items-center justify-between w-full ">
          <div className="flex flex-row justify-start w-[90%] md:w-full items-center md:bg-none z-40   bg-cover bg-bottom md:pt-2.5 md:pl-4">
            <img src="./images/letter-y-eggs.png" alt="" className="size-10" />
            <h3 className="text-2xl uppercase font-patrick-hand-sc">
              our <span className="text-3xl">EGG</span>s
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
        ) : !loading && ctx.myEggs.length > 0 ? (
          <div className="grid w-full grid-cols-3 gap-4 sm:grid-cols-4 md:pr-2 md:gap-2 ">
            {ctx.myEggs.map((egg, index) => (
              <EggBox
                key={index + "eggs"}
                egg={egg}
                nftMint={ctx.nftToEggMap[egg.mintAddress as any]}
              />
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
          <div className="bg-mint-section-egg-book bg-contain w-[342px] h-[181px] lg:w-[275px] lg:h-[170px] md:w-[244px] md:h-[140px] bg-no-repeat absolute bottom-0 bg-center z-0"></div>

          <div className="flex flex-row md:justify-start justify-end w-[90%] md:w-full items-end md:bg-none   bg-cover bg-bottom md:pt-2.5 md:pl-4">
            <img
              src="./images/letter-y-eggs.png"
              alt=""
              className="h-[70%]  md:h-auto lg:size-10 md:size-8"
            />
            <h3 className="uppercase font-patrick-hand-sc lg:text-3xl md:text-2xl">
              our <span className="lg:text-4xl md:3xl">E</span>GGs
            </h3>
          </div>
          <div className="space-y-6 mt-9">
            <div className="grid grid-cols-3 ">
              {/* icon */}
              <div className="grid w-full col-span-1 place-content-center h-max">
                <img
                  src={`./images/hammer.png`}
                  alt="claimable egg"
                  className="w-[100px] md:w-16"
                />
              </div>
              {/* description */}
              <p className="col-span-2 text-2xl font-patrick-hand md:text-base lg:text-lg">
                Eggs can be cracked. Crack an egg for a chance of winning a
                prize. Click the egg to get cracking.
              </p>
            </div>

            <div className="relative z-20 grid grid-cols-3">
              {/* icon */}
              <div className="grid w-full place-content-center h-max">
                <img
                  src={`./images/hourglass.png`}
                  alt="claimable egg"
                  className=" w-[80px] md:w-16"
                />
              </div>
              {/* description */}
              <p className="z-40 col-span-2 text-2xl font-patrick-hand md:text-base lg:text-lg">
                Cracking takes 24 hours. Multiply eggs can be cracking
                simultaneously.
              </p>
            </div>
          </div>
        </div>
        {/*right page  */}
        <div className="flex flex-col items-center flex-1 w-full h-full sm:justify-between md:justify-start sm:gap-7 lg:gap-4 md:gap-3">
          {loading ? (
            <NftLoader />
          ) : !loading && ctx.myEggs.length > 0 ? (
            <div className="grid h-full grid-cols-3 gap-4 pr-6 overflow-y-auto md:pr-2 auto-rows-[max-content] ">
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
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Eggs;
