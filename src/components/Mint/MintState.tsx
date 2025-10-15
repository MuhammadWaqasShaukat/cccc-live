import { HTMLAttributes, useMemo } from "react";
import { useQuery } from "react-query";
import { fetchData } from "../../utils/fetchData";
import { useGetLotteryState } from "../../hooks/useGetLotteryState";
import Modal from "../UI/Modal";

const TotalMintedKnights: React.FC<HTMLAttributes<HTMLDivElement>> = () => {
  const { data } = useGetLotteryState();

  const total = data?.maxPlayers ?? 0;
  const minted = data?.totalMinted ?? 0;

  const bgClass = useMemo(() => {
    if (total === 0) return "bg-total-minted-knights-1"; // safeguard

    const mintedPercent = (minted / total) * 100;

    // Percentage equivalents of your fixed thresholds
    if (mintedPercent <= 1) return "bg-total-minted-knights-1"; // 0–100
    if (mintedPercent <= 5) return "bg-total-minted-knights-2"; // 100–500
    if (mintedPercent <= 10) return "bg-total-minted-knights-3"; // 500–1000
    if (mintedPercent <= 50) return "bg-total-minted-knights-4"; // 1000–5000
    return "bg-total-minted-knights-5"; // 5000+
  }, [minted, total]);

  return (
    <div
      className={`${bgClass} col-span-2 bg-contain bg-no-repeat px-2 py-1 sm:min-h-20 transition-all duration-500`}
    >
      <h1 className="uppercase text-black font-patrick-hand-sc text-sm font-bold">
        Total Minted Knights
      </h1>
      <p className="font-heavitas text-base text-[#29272699] -tracking-[2px]">
        <span className="text-black">{minted}</span> / {total} (
        {total > 0 ? ((minted / total) * 100).toFixed(2) : 0}%)
      </p>
    </div>
  );
};

const TotalMintedEggs: React.FC<HTMLAttributes<HTMLDivElement>> = () => {
  const { data } = useGetLotteryState();

  const total = data?.totalMinted ?? 0;
  const mintedEggs = data?.totalMintedEgg ?? 0;

  const mintedPercent = total > 0 ? (mintedEggs / total) * 100 : 0;

  // map percentage ranges to bg classes
  const bgClass = useMemo(() => {
    if (mintedPercent <= 10) return "bg-minted-eggs-1";
    if (mintedPercent <= 20) return "bg-minted-eggs-2";
    if (mintedPercent <= 50) return "bg-minted-eggs-3";
    return "bg-minted-eggs-4";
  }, [mintedPercent]);

  return (
    <div
      className={`col-span-1 ${bgClass} bg-contain bg-no-repeat px-2 py-1 transition-all duration-500`}
    >
      <h1 className="uppercase text-black font-patrick-hand-sc text-sm font-bold">
        Total Minted Eggs
      </h1>
      <p className="font-heavitas text-base text-[#29272699] -tracking-[2px]">
        <span className="text-black">{mintedEggs}</span> / {total} (
        {mintedPercent.toFixed(2)}%)
      </p>
    </div>
  );
};

const TotalCrackedEggs: React.FC<HTMLAttributes<HTMLDivElement>> = () => {
  const { data } = useGetLotteryState();

  const total = data?.totalMintedEgg ?? 0;
  const crackedEggs = data?.totalCrackedEgg ?? 0;

  const crackedPercent = total > 0 ? (crackedEggs / total) * 100 : 0;

  // map percentage ranges to bg classes
  const bgClass = useMemo(() => {
    if (crackedPercent <= 10) return "bg-cracked-eggs-1";
    if (crackedPercent <= 20) return "bg-cracked-eggs-2";
    if (crackedPercent <= 50) return "bg-cracked-eggs-3";
    return "bg-cracked-eggs-4";
  }, [crackedPercent]);

  return (
    <div
      className={`col-span-1 ${bgClass} bg-contain bg-no-repeat px-2 py-1 transition-all duration-500`}
    >
      <h1 className="uppercase text-black font-patrick-hand-sc text-sm font-bold">
        Total cracked eggs
      </h1>
      <p className="font-heavitas text-base text-[#29272699] -tracking-[2px]">
        <span className="text-black">{crackedEggs}</span> / {total} (
        {crackedPercent.toFixed(2)}%)
      </p>
    </div>
  );
};

const RemainingPrizePool: React.FC<HTMLAttributes<HTMLDivElement>> = () => {
  const { data: winChance } = useQuery<any>({
    queryKey: ["win-chance"],
    queryFn: () => fetchData<any>("/lottery/winning-chance"),
  });

  const { data } = useGetLotteryState();

  const { data: remainingPrize } = useQuery<number>({
    queryKey: ["pool-prize"],
    queryFn: () => fetchData<number>("/lottery/remaining-prize"),
  });

  const total = data?.totalValueToCollect ? data.totalValueToCollect / 1e9 : 0;
  const remaining = remainingPrize ?? 0;

  const bgClass = useMemo(() => {
    const winners = winChance?.remainingWinners ?? 0;

    if (winners >= 5) return "bg-prize-pool-1";
    if (winners === 4) return "bg-prize-pool-2";
    if (winners === 3) return "bg-prize-pool-3";
    if (winners === 2) return "bg-prize-pool-4";
    if (winners === 1) return "bg-prize-pool-5";
    return "bg-prize-pool-6";
  }, [winChance?.remainingWinners]);

  return (
    <div
      className={`col-span-1 ${bgClass} bg-contain bg-no-repeat px-2 py-1 relative`}
    >
      <h1 className="uppercase text-black font-patrick-hand-sc text-sm font-bold">
        remaining prize pool
      </h1>
      <p className=" font-heavitas text-base text-[#29272699] -tracking-[2px]">
        <span className="text-black">{remaining.toFixed(2)}</span> / {total}
      </p>
      <button className="absolute top-1/2 -translate-y-1/2 -left-[3%]  bg-sol-btn bg-no-repeat bg-contain font-patrick-hand-sc text-xs uppercase w-20 h-6 text-black">
        100 sol (each)
      </button>
    </div>
  );
};

const WinChance: React.FC<HTMLAttributes<HTMLDivElement>> = () => {
  const { data } = useQuery<any>({
    queryKey: ["win-chance"],
    queryFn: () => fetchData<any>("/lottery/winning-chance"),
  });

  const { winningChance = 0, remainingWinners = 0 } = data || {};

  const bgClass = useMemo(() => {
    if (remainingWinners >= 5) return "bg-win-chance-1";
    if (remainingWinners >= 3) return "bg-win-chance-2";
    return "bg-win-chance-3";
  }, [remainingWinners]);

  return (
    <div className={`col-span-1 ${bgClass} bg-contain bg-no-repeat px-2 py-1`}>
      <h1 className="uppercase text-black font-patrick-hand-sc text-sm font-bold">
        win chance
      </h1>
      <p className=" font-heavitas text-base text-[#29272699] -tracking-[2px]">
        <span className=" text-black">{Number(winningChance).toFixed(2)}%</span>
      </p>
    </div>
  );
};

const MintState = () => {
  return (
    <>
      <div className="md:hidden block">
        <Modal onBackgroundClick={() => {}} className="">
          <div className=" flex flex-col justify-center items-center bg-cover bg-sm-mint-section-book bg-left bg-no-repeat rounded-3xl aspect-[340/508]">
            <div className="flex flex-row items-end gap-2 justify-center w-full p-2 bg-bottom bg-cover ">
              <img src="./images/stats.png" alt="" className="w-11 h-auto" />
              <h3 className="text-2xl uppercase font-patrick-hand-sc xs:text-4xl">
                Statistics
              </h3>
            </div>

            <div className="relative z-60 md:hidden p-5 h-full grid">
              <TotalMintedKnights />
              <TotalMintedEggs />
              <TotalCrackedEggs />
              <RemainingPrizePool />
              <WinChance />
            </div>
          </div>
        </Modal>
      </div>
      <div className="md:flex hidden flex-col items-center justify-between h-full mx-auto sm:w-2/3 md:flex-row md:items-start md:gap-4 md:w-full">
        <div
          data-page="left"
          className="flex flex-col items-center justify-center flex-1 h-full -ml-2"
        >
          <div className="flex flex-row items-end gap-2 justify-center w-full p-2 bg-bottom bg-cover ">
            <img src="./images/stats.png" alt="" className="w-11 h-auto" />
            <h3 className="text-2xl uppercase font-patrick-hand-sc xs:text-4xl">
              Statistics
            </h3>
          </div>

          <div className=" w-full]">
            <img src="/images/section-mint/mint-over.webp" alt="" />
          </div>
        </div>
        <div
          data-page="right"
          className="flex-1 w-full h-full gap-1 py-1 lg:gap-3 md:gap-2 xl:gap-4 grid xl:grid-rows-[140px_auto_auto] lg:grid-rows-[127px_auto_auto] md:grid-rows-[105px_auto_auto] "
        >
          <TotalMintedKnights />
          <TotalMintedEggs />
          <TotalCrackedEggs />
          <RemainingPrizePool />
          <WinChance />
        </div>
      </div>
    </>
  );
};

export default MintState;
