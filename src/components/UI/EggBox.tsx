import { useContext, useEffect, useRef, useState } from "react";
import { CottonCandyContext } from "../../providers/ContextProvider";
import useWeb3Utils from "../../hooks/useWeb3Utils";
import { FulFilledState } from "../../types/Nft";
import useProgramInstructions from "../../hooks/useProgramInstructions";
import { PublicKey } from "@solana/web3.js";
import { motion } from "framer-motion";
// import {
//   buildStyles,
//   CircularProgressbarWithChildren,
// } from "react-circular-progressbar";
import HammerStrike from "../HammerStrike";
import {
  deleteEggHammeringTime,
  getEggHammeringTime,
  setEggHammeringTime,
} from "../../utils/hammerTimers";
import EggCrackingProgress from "./EggCrackingProgress";
// import { getHoursAndMinutesBetweenTimestamps } from "../../utils/getHoursMinutesBetweenTimestamps";

const EggBox: React.FC<{ egg: any; nftMint: string }> = ({ egg, nftMint }) => {
  const ctx = useContext(CottonCandyContext);

  const { FulfillHatching } = useProgramInstructions();
  // const { getNftState, getLotteryState, connection } = useWeb3Utils();
  // const [_, setShouldCrack] = useState(false);
  // const [__, setTime] = useState<{ hours: number; minutes: number } | null>(
  //   null
  // );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const showProgress = useRef<boolean | null>(null);

  const [crackpoints, setCrackPoints] = useState(0);

  const isEggCracking = getEggHammeringTime(egg.mintAddress);

  useEffect(() => {
    if (isEggCracking && !timeoutRef.current) {
      const now = Date.now();
      const timeoutEnd = isEggCracking.timestamp + 30_000;
      if (now < timeoutEnd) {
        setCrackPoints(isEggCracking.points);
        const remaining = timeoutEnd - now;
        timeoutRef.current = setTimeout(beforeEggReviveTimeoutCB, remaining);
      } else {
        const elapsedSinceTimeout = now - timeoutEnd;
        const decayRate = 500;
        const pointsLost = Math.floor(elapsedSinceTimeout / decayRate);
        const newPoints = Math.max(isEggCracking.points - pointsLost, 0);

        setCrackPoints(newPoints);
        intervalRef.current = setInterval(afterEggReviveTimeoutCB, 500);
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (showProgress.current) showProgress.current = null;
    };
  }, []);

  const afterEggReviveTimeoutCB = () => {
    setCrackPoints((prev) => {
      if (prev <= 1) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        showProgress.current = null;
        deleteEggHammeringTime(egg.mintAddress);
        return 0;
      }
      return prev - 1;
    });
  };

  const beforeEggReviveTimeoutCB = () => {
    intervalRef.current = setInterval(afterEggReviveTimeoutCB, 500);
  };

  const handleCrackEgg = async () => {
    // handleStricking();

    if (crackpoints < 100) {
      setCrackPoints((prev: number) => {
        setEggHammeringTime(egg.mintAddress, prev + 1);
        return prev + 1;
      });

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      timeoutRef.current = setTimeout(beforeEggReviveTimeoutCB, 30000);
      return;
    }
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

  // useEffect(() => {
  //   (async () => {
  //     if (!ctx.nftMint) return;
  //     const { eggAfterHatchCooldown } = await getLotteryState();
  //     const { eggHatchedAt } = await getNftState(ctx.nftMint);
  //     const totalTime = eggHatchedAt + eggAfterHatchCooldown;

  //     const slotNumber = await connection.getSlot({ commitment: "confirmed" });
  //     const blockTime = await connection.getBlockTime(slotNumber);

  //     if (blockTime && blockTime >= totalTime) {
  //       setShouldCrack(true);
  //     } else {
  //       if (blockTime) {
  //         const { hours, minutes } = getHoursAndMinutesBetweenTimestamps(
  //           blockTime,
  //           totalTime
  //         );
  //         setTime({ hours, minutes });
  //       }
  //     }
  //   })();
  // }, [egg.mintAddress]);

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
          <motion.div
            key="won"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ opacity: { duration: 0.3 } }}
            className="absolute top-0 bottom-0 left-0 right-0 z-10 w-full h-full bg-hatch-won"
          ></motion.div>
        )}
      {/* no reward */}
      {fulfilledState?.status === "done" &&
        fulfilledState?.lotteryStatus === "none" && (
          <motion.div
            key="lost"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ opacity: { duration: 0.3 } }}
            className="absolute top-0 bottom-0 left-0 right-0 z-10 w-full h-full bg-hatch-lost"
          ></motion.div>
        )}
      {fulfilledState?.status === "pending" && (
        <div className="z-10 hidden w-full h-full transition-all duration-300 opacity-0 group-hover:block group-hover:opacity-100 hammer-bg">
          <HammerStrike />
        </div>
      )}

      {fulfilledState?.status === "pending" && crackpoints > 0 && (
        <div className="absolute z-10 block p-1 bg-black/70 group-hover:hidden">
          <EggCrackingProgress crackpoints={crackpoints} />
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
