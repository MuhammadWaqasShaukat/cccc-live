import { useEffect, useState } from "react";
import useWeb3Utils from "../../hooks/useWeb3Utils";

const Remaining = () => {
  const [remainingState, setRemainingState] = useState<{
    balance: number;
    total: number;
  }>({ balance: 0, total: 0 });

  const { getLotteryState, getVaultState } = useWeb3Utils();
  useEffect(() => {
    (async () => {
      const balance = await getVaultState();
      const { totalValueToCollect: total } = await getLotteryState();
      if (balance && total) {
        setRemainingState({ balance, total: total / 1e9 });
      }
    })();
  }, []);

  return (
    <div className="flex-1 flex flex-col justify-start items-start relative before:content-[''] before:w-[6px] before:h-full before:rounded-[2px] before:bg-[#D18A27] before:absolute before:left-0 ">
      <h4 className="font-patrick-hand-sc text-2xl uppercase ml-4">
        Remaining
      </h4>
      <div className="font-heavitas  ml-4">
        <span className="text-[28px] text-[#292726]">
          {remainingState.balance.toFixed(4)}
          <span className="text-[20px] text-base text-[#29272699]">
            /{remainingState.total}
          </span>
        </span>
      </div>
    </div>
  );
};

export default Remaining;
