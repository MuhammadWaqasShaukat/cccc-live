import { useContext } from "react";
import MintButton from "./MintButton";
import { CottonCandyContext } from "../../providers/ContextProvider";
import { useWallet } from "@solana/wallet-adapter-react";

const Counter = () => {
  const ctx = useContext(CottonCandyContext);
  const { connected } = useWallet();
  return (
    <div className="flex flex-row w-full justify-between items-center gap-[14px]">
      <div className="flex flex-row justify-between p-5 items-center bg-[#FFFFFF99] w-full md:w-[191px] rounded-[7px] box-border min-w-[8rem] md:min-w-0 h-14 md:h-auto">
        <button
          disabled={ctx.count === 1 || ctx.lotteryState.ended ? true : false}
          type="button"
          className="h-[26px] w-[26px] bg-[#B69772] hover:bg-[#9F8362] active:bg-[#816A4F]  rounded-full  flex flex-row justify-center items-center"
          onClick={() => {
            if (ctx.count === 1) return;
            ctx.setCount!(ctx.count - 1);
          }}
        >
          <span className="text-[29px] text-white font-patrick-hand-sc -mt-2">
            -
          </span>
        </button>
        <span className=" text-black text-4xl md:text-[48px] font-patrick-hand  leading-none">
          {ctx.count}
        </span>
        <button
          disabled={!connected}
          type="button"
          className="h-[26px] w-[26px] bg-[#B69772]  hover:bg-[#9F8362] active:bg-[#816A4F]    rounded-full flex flex-row justify-center items-center"
          onClick={() => {
            ctx.setCount!(ctx.count + 1);
          }}
        >
          <span className="text-[29px] text-white font-patrick-hand -mt-2">
            +
          </span>
        </button>
      </div>
      <MintButton />
    </div>
  );
};

export default Counter;
