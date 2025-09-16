import { useContext, useEffect, useState } from "react";
import { CottonCandyContext } from "../../providers/ContextProvider";
import { calculatePayment } from "../../utils/calculatePayment";
import { useGetLotteryState } from "../../hooks/useGetLotteryState";

type CounterState = {
  min: boolean;
  max: boolean;
};

const defaultCounter: CounterState = {
  min: true,
  max: true,
};

const Counter = () => {
  const ctx = useContext(CottonCandyContext);
  const { data: lottery } = useGetLotteryState();

  const [disabled, setDisabled] = useState<CounterState>(defaultCounter);

  const updateDisabledState = async () => {
    if (!lottery) return;

    const { totalMinted, maxPlayers, totalValueToCollect, minPrice } = lottery;

    const remaining = maxPlayers - totalMinted;

    if (remaining > 0) {
      const _price = calculatePayment(
        totalMinted + 1,
        ctx.count,
        maxPlayers,
        totalValueToCollect,
        minPrice
      );
      ctx.setEstimate(_price);

      if (remaining === 0) {
        ctx.setCount(1);
      }
    }
    setDisabled({
      min: ctx.count <= 1,
      max: ctx.count >= remaining,
    });
  };

  useEffect(() => {
    updateDisabledState();
  }, [ctx.count, ctx.lotteryState.status]);

  const lockCounter = () => {
    setDisabled({ min: true, max: true });
  };

  useEffect(() => {
    return () => {
      ctx.setCount(1);
      ctx.setEstimate(null);
    };
  }, []);

  return (
    <div className="flex flex-row justify-between py-1.5 px-3 items-center bg-[#FFFFFF99] w-max sm:w-[160px] md:w-[128px] rounded-[7px] box-border min-w-[8rem] md:min-w-0 h-12 md:h-auto">
      <button
        disabled={disabled.min}
        type="button"
        className=" size-5 md:size-6 sm:size-7 bg-[#B69772] disabled:bg-[#89898866] disabled:hover:bg-[#89898866]  hover:bg-[#9F8362] active:bg-[#816A4F] rounded-full grid place-content-center"
        onClick={() => {
          lockCounter();
          if (ctx.count === 1) return;
          ctx.setCount((prev: number) => prev - 1);
        }}
      >
        <div className="bg-center bg-no-repeat bg-contain bg-counter-minus size-3 sm:size-4 md:size-3"></div>
      </button>
      <span className="text-2xl leading-none text-black sm:text-4xl lg:text-3xl md:text-2xl font-patrick-hand">
        {ctx.count}
      </span>
      <button
        disabled={disabled.max}
        type="button"
        className=" size-5 md:size-6 sm:size-7 bg-[#B69772]  disabled:bg-[#89898866] disabled:hover:bg-[#89898866]  hover:bg-[#9F8362] active:bg-[#816A4F]  rounded-full grid place-content-center"
        onClick={() => {
          lockCounter();
          ctx.setCount!(ctx.count + 1);
        }}
      >
        <div className="bg-center bg-no-repeat bg-contain bg-counter-plus size-3 sm:size-4 md:size-3"></div>
      </button>
    </div>
  );
};

export default Counter;
