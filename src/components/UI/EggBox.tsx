import { useContext, useEffect, useRef, useState } from "react";
import { CottonCandyContext } from "../../providers/ContextProvider";
import useWeb3Utils from "../../hooks/useWeb3Utils";
import { FulFilledState } from "../../types/Nft";
import useProgramInstructions from "../../hooks/useProgramInstructions";
import { PublicKey } from "@solana/web3.js";
import { motion } from "framer-motion";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";

const EggBox: React.FC<{ egg: any; nftMint: string }> = ({ egg, nftMint }) => {
  const ctx = useContext(CottonCandyContext);

  const { FulfillHatching } = useProgramInstructions();
  const { getNftState, getLotteryState, connection } = useWeb3Utils();
  const [_, setShouldCrack] = useState(false);
  const [__, setTime] = useState<{ hours: number; minutes: number } | null>(
    null
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const showProgress = useRef<boolean | null>(null);

  const [crackpoints, setCrackPoints] = useState(0);

  const [isStriking, setIsStriking] = useState(false);

  const normalSrc = "/images/hammer-1.png";
  const strikeSrc = "/images/hammer-2.png";

  const handleStricking = () => {
    if (isStriking) return;
    setIsStriking(true);

    setTimeout(() => {
      setIsStriking(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (showProgress.current) showProgress.current = null;
    };
  }, []);

  function getHoursAndMinutesBetweenTimestamps(
    t1: number,
    t2: number
  ): { hours: number; minutes: number } {
    if (t1 < 1e11 && t2 < 1e11) {
      t1 *= 1000;
      t2 *= 1000;
    }
    const diffMs = Math.abs(t2 - t1);
    const totalMinutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
  }

  const handleCrackEgg = async () => {
    handleStricking();

    if (crackpoints < 100) {
      setCrackPoints((prev: number) => prev + 1);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      timeoutRef.current = setTimeout(() => {
        intervalRef.current = setInterval(() => {
          setCrackPoints((prev) => {
            if (prev <= 1) {
              clearInterval(intervalRef.current!);
              intervalRef.current = null;
              showProgress.current = null;
              return 0;
            }
            return prev - 1;
          });
        }, 500);
      }, 30000);
      return;
    }
    debugger;
    try {
      ctx.setCurrentModal(null);
      ctx.setIsPortalOpen(true);
      if (egg.mintAddress && nftMint) {
        await FulfillHatching(
          new PublicKey(egg.mintAddress),
          new PublicKey(nftMint)
        );
      }

      ctx.setRefreshNftState(egg.mintAddress);
    } catch (error: any) {
      console.error("Error : ", error.message);
      ctx.setIsPortalOpen(false);
    } finally {
      ctx.setIsPortalOpen(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (!ctx.nftMint) return;
      const { eggAfterHatchCooldown } = await getLotteryState();
      const { eggHatchedAt } = await getNftState(ctx.nftMint);
      const totalTime = eggHatchedAt + eggAfterHatchCooldown;

      const slotNumber = await connection.getSlot({ commitment: "confirmed" });
      const blockTime = await connection.getBlockTime(slotNumber);

      if (blockTime && blockTime >= totalTime) {
        setShouldCrack(true);
      } else {
        if (blockTime) {
          const { hours, minutes } = getHoursAndMinutesBetweenTimestamps(
            blockTime,
            totalTime
          );
          setTime({ hours, minutes });
        }
      }
    })();
  }, [egg.mintAddress]);

  const [fulfilledState, setFulFilledState] = useState<FulFilledState | null>(
    null
  );

  const { getEggFulFilledState } = useWeb3Utils();

  const getEggState = async () => {
    try {
      const { status, lotteryStatus } = await getEggFulFilledState(
        egg.mintAddress
      );
      setFulFilledState({ status, lotteryStatus });
    } catch (error: any) {
      console.error("Error: ", error.message);
    }
  };

  useEffect(() => {
    (async () => await getEggState())();
  }, []);

  useEffect(() => {
    if (egg.mintAddress !== ctx.refreshNftState) return;
    (async () => {
      (async () => await getEggState())();
    })();
  }, [ctx.refreshNftState]);

  console.log({ fulfilledState });

  const imageSrc = "./images/section-mint/nfts/egg.png";

  return (
    <div
      data-nft-mint={nftMint}
      onClick={handleCrackEgg}
      className={`aspect-square border-2 border-black rounded-xl grid place-content-center grid-cols-1 grid-rows-1 h-full w-full sm:min-w-28 xs:min-w-20 md:min-w-[72px] lg:min-w-24  overflow-hidden  relative group`}
    >
      {/* reward */}
      {fulfilledState?.status === "done" &&
        fulfilledState?.lotteryStatus === "won" && (
          <div className="absolute top-0 bottom-0 left-0 right-0 z-10 w-full h-full bg-hatch-won"></div>
        )}
      {/* no reward */}
      {fulfilledState?.status === "done" &&
        fulfilledState?.lotteryStatus === "none" && (
          <div className="absolute top-0 bottom-0 left-0 right-0 z-10 w-full h-full bg-hatch-lost"></div>
        )}
      {fulfilledState?.status === "pending" && (
        <div
          className="z-10 hidden w-full h-full transition-all duration-300 bg-cover pointer-events-none hammer-bg aspect-square group-hover:block"
          style={{ width: "inherit" }}
        >
          <div className="relative pointer-events-none">
            <motion.img
              className="absolute m-auto pointer-events-none "
              src={isStriking ? strikeSrc : normalSrc}
              animate={
                isStriking
                  ? { rotate: -45, opacity: 0.2, scale: 0.72 }
                  : { rotate: 0, opacity: 1, scale: 0.6 }
              }
              transition={{
                duration: 0.2,
                ease: [0.42, 0, 0.58, 1],
              }}
              initial={false}
              style={{
                transformOrigin: "bottom bottom",
                width: "-webkit-fill-available",
              }}
            />
          </div>
        </div>
      )}

      {crackpoints > 0 && fulfilledState?.status === "pending" && (
        <div className="absolute z-10 p-1 bg-black/70 bloack group-hover:hidden">
          <CircularProgressbarWithChildren
            value={crackpoints}
            styles={buildStyles({
              rotation: 0,
              strokeLinecap: "round",
              textSize: "16px",
              pathTransitionDuration: 0.5,
              pathColor: "#A6FF00",
              textColor: "#f88",
              trailColor: "rgba(166, 255, 0, 0.2)",
            })}
          >
            <span className="text-xl text-white font-patrick-hand text-outline-1">
              {crackpoints}/10k
            </span>
          </CircularProgressbarWithChildren>
        </div>
      )}
      <img
        src={imageSrc ?? ""}
        alt={`Egg`}
        className="object-cover overflow-hidden absolute z-0 w-[-webkit-fill-available]"
      />
    </div>
  );
};

export default EggBox;
