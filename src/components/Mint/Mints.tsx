import Remaining from "../UI/Remaining";
import Price from "../UI/Price";
import Counter from "../UI/Counter";
import MintButton from "../UI/MintButton";
import { useGetMintState } from "../../hooks/useGetMintState";
import { CottonCandyContext } from "../../providers/ContextProvider";
import { useContext } from "react";
import SupperOffer from "./SupperOffer";

const Mints = () => {
  const ctx = useContext(CottonCandyContext);
  const { data: mintStatus } = useGetMintState();

  return (
    <>
      {mintStatus && mintStatus?.remaining > 10 && <SupperOffer />}

      <div className="flex flex-col items-center w-full justify-between h-full gap-6 overflow-auto md:hidden overflow-x-hidden overflow-y-auto">
        <div className="flex flex-row items-end justify-center w-full p-2 bg-bottom bg-cover md:hidden md:justify-start md:bg-none bg-mint-section-heading md:p-0 ">
          <img
            src="./images/letter-m-mint.webp"
            alt=""
            className="w-12 h-auto xs:w-14"
          />
          <h3 className="text-2xl uppercase font-patrick-hand-sc xs:text-3xl">
            inting is Live!
          </h3>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 w-full max-h-max">
          <div className="h-full relative xs:min-h-[320px] xs:min-w-[220px] min-h-[269px] min-w-[169px]">
            <img
              src="./images/section-mint/minting-image.webp"
              alt=""
              className="absolute bottom-3 left-0 border-[3px] border-white rounded-xl card-shadow-1"
            />
            <img
              src="./images/section-mint/nft-1.webp"
              alt=""
              className="absolute bottom-2.5 left-6 -rotate-2 border-[3px] border-white rounded-xl origin-bottom-left card-shadow-1 "
            />
            <img
              src="./images/section-mint/minting-image.webp"
              alt=""
              className="absolute top-4 left-5  rotate-2 border-[3px] border-white rounded-xl card-shadow-1 "
            />
          </div>
        </div>

        <div className="flex flex-row items-start justify-center w-full px-12 sm:justify-between">
          <Remaining
            total={mintStatus!.total}
            remaining={mintStatus!.remaining}
          />
          <Price price={mintStatus!.price} />
        </div>

        <div className="flex flex-row items-center justify-between w-full px-12">
          <div className="flex-1">
            <h2 className="text-lg text-black font-patrick-hand-sc">
              Quantity
            </h2>
          </div>
          <Counter />
        </div>

        <div className="flex flex-col items-start justify-start w-full gap-1 ">
          {/* Cost */}
          <div className="flex flex-row items-center justify-between w-full px-12">
            <div className="flex-1">
              <h2 className="text-xl text-black font-patrick-hand-sc">Cost</h2>
            </div>
            <div>
              <span className="text-xl text-black font-patrick-hand-sc">
                {ctx.estimate?.toFixed(4) ?? mintStatus!.price?.toFixed(4)} Sol
              </span>
            </div>
          </div>
          {/* Gas Fee*/}
          <div className="flex flex-row items-center justify-between w-full px-12">
            <div className="flex-1">
              <h2 className="text-xl text-black font-patrick-hand-sc">
                Gas Fee
              </h2>
            </div>
            <div>
              <span className="text-xl text-black font-patrick-hand-sc">
                {ctx.gasFee?.toFixed(4)} Sol
              </span>
            </div>
          </div>
          {/* Total */}
          <div className="flex flex-row items-center justify-between w-full px-12">
            <div className="flex-1">
              <h2 className="text-xl text-black font-patrick-hand-sc">Total</h2>
            </div>
            <div>
              <span className="text-xl text-black font-patrick-hand-sc">
                {(ctx?.gasFee + (ctx?.estimate ?? mintStatus!.price)).toFixed(
                  4
                )}{" "}
                Sol
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-start justify-center w-full mx-auto">
          <MintButton />
        </div>

        <div
          className="w-full flex text-base flex-row justify-center items-center gap-2"
          onClick={() => ctx.setBookmark("tutorial")}
        >
          <div className=" bg-help-icon size-8 bg-contain bg-no-repeat"></div>
          <span className="font-patrick-hand-sc uppercase text-[#6E5639] text-[1.5em]">
            How It Works
          </span>
        </div>
      </div>

      <div className="md:flex flex-col items-center justify-between h-full mx-auto sm:w-2/3 hidden md:flex-row md:items-start md:gap-4 md:w-full ">
        <div
          data-page="left"
          className="flex flex-col items-center justify-center flex-1 h-full -ml-2"
        >
          <div className="h-[90%] w-[90%] min-w-64 relative">
            <img
              src="./images/section-mint/minting-image.webp"
              alt=""
              className="h-[98%] min-w-[191px] aspect-[191/269]  absolute top-0 left-0 border-[3px] border-white rounded-xl card-shadow-1"
            />
            <img
              src="./images/section-mint/nft-1.webp"
              alt=""
              className="h-[96%] min-w-[191px] aspect-[191/269] absolute bottom-2.5 left-6 -rotate-2 border-[3px] border-white rounded-xl origin-bottom-left card-shadow-1 "
            />
            <img
              src="./images/section-mint/minting-image.webp"
              alt=""
              className="h-[98%] min-w-[191px] aspect-[191/269] absolute top-4 left-5  rotate-2 border-[3px] border-white rounded-xl card-shadow-1 "
            />
          </div>
        </div>
        <div
          data-page="right"
          className="flex flex-col items-center justify-start flex-1 w-full h-full gap-2 lg:gap-4 md:gap-3 xl:gap-5"
        >
          <div className="md:flex hidden flex-row md:justify-start justify-end w-[90%] md:w-full items-end md:bg-none bg-mint-section-heading bg-cover bg-bottom md:p-0 p-2 ">
            <img
              src="./images/letter-m-mint.webp"
              alt=""
              className="h-[70%] md:h-auto lg:size-10 md:size-8 xl:size-14"
            />
            <h3 className="uppercase font-patrick-hand-sc lg:text-3xl md:text-2xl xl:text-4xl">
              inting is Live!
            </h3>
          </div>

          <div className="flex flex-row items-start justify-center w-full px-12 sm:justify-between sm:p-0">
            <Remaining
              total={mintStatus!.total}
              remaining={mintStatus!.remaining}
            />
            <Price price={mintStatus!.price} />
          </div>

          <div className="flex flex-row items-center justify-between w-full px-12 sm:p-0">
            <div className="flex-1">
              <h2 className="text-lg text-black font-patrick-hand-sc sm:text-2xl xl:3xl lg:text-2xl md:text-xl ">
                Quantity
              </h2>
            </div>
            <Counter />
          </div>

          <div className="flex flex-col items-start justify-start w-full gap-1 xl:gap-2">
            {/* Cost */}
            <div className="flex flex-row items-center justify-between w-full px-12 sm:p-0">
              <div className="flex-1">
                <h2 className="text-xl black text- font-patrick-hand-sc xl:3xl lg:text-2xl md:text-xl">
                  Cost
                </h2>
              </div>
              <div>
                <span className="text-xl text-black font-patrick-hand-sc xl:text-3xl lg:text-2xl md:text-xl">
                  {ctx.estimate?.toFixed(4) ?? mintStatus!.price?.toFixed(4)}{" "}
                  Sol
                </span>
              </div>
            </div>
            {/* Gas Fee*/}
            <div className="flex flex-row items-center justify-between w-full px-12 sm:p-0">
              <div className="flex-1">
                <h2 className="text-xl black text- font-patrick-hand-sc xl:3xl lg:text-2xl md:text-xl">
                  Gas Fee
                </h2>
              </div>
              <div>
                <span className="text-xl text-black font-patrick-hand-sc xl:text-3xl lg:text-2xl md:text-xl">
                  {ctx.gasFee?.toFixed(4)} Sol
                </span>
              </div>
            </div>
            {/* Total */}
            <div className="flex flex-row items-center justify-between w-full px-12 sm:p-0">
              <div className="flex-1">
                <h2 className="text-xl black text- font-patrick-hand-sc xl:3xl lg:text-2xl md:text-xl">
                  Total
                </h2>
              </div>
              <div>
                <span className="text-xl text-black font-patrick-hand-sc xl:text-3xl lg:text-2xl md:text-xl">
                  {(ctx?.gasFee + (ctx?.estimate ?? mintStatus!.price)).toFixed(
                    4
                  )}{" "}
                  Sol
                </span>
              </div>
            </div>
          </div>

          <MintButton />
        </div>
      </div>
    </>
  );
};

export default Mints;
