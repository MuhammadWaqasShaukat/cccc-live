import { useContext } from "react";
import { CottonCandyContext } from "../../providers/ContextProvider";
import { useWallet } from "@solana/wallet-adapter-react";

const Counter = () => {
  const ctx = useContext(CottonCandyContext);
  const { connected } = useWallet();
  return (
    <div className="flex flex-row justify-between py-1.5 px-3 items-center bg-[#FFFFFF99] w-full md:w-[160px] rounded-[7px] box-border min-w-[8rem] md:min-w-0 h-12 md:h-auto">
      <button
        disabled={ctx.count === 1 || ctx.lotteryState.ended ? true : false}
        type="button"
        className="size-6 bg-[#B69772] disabled:bg-[#89898866] disabled:hover:bg-[#B69772]  hover:bg-[#9F8362] active:bg-[#816A4F] rounded-full grid place-content-center"
        onClick={() => {
          if (ctx.count === 1) return;
          ctx.setCount((prev: number) => prev - 1);
        }}
      >
        <div className="bg-counter-minus bg-contain bg-no-repeat size-4 bg-center"></div>
      </button>
      <span className=" text-black text-4xl md:text-[48px] font-patrick-hand  leading-none">
        {ctx.count}
      </span>
      <button
        disabled={!connected || ctx.lotteryState.ended ? true : false}
        type="button"
        className="size-6 bg-[#B69772]  disabled:bg-[#89898866] disabled:hover:bg-[#B69772]  hover:bg-[#9F8362] active:bg-[#816A4F]    rounded-full grid place-content-center"
        onClick={() => {
          ctx.setCount!(ctx.count + 1);
        }}
      >
        <div className="bg-counter-plus bg-contain bg-no-repeat size-4 bg-center"></div>
      </button>
    </div>
  );
};

export default Counter;
