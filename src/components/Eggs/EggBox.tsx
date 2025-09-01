import { useContext, useEffect, useRef, useState } from "react";
import { CottonCandyContext } from "../../providers/ContextProvider";
import useWeb3Utils from "../../hooks/useWeb3Utils";
import { FulFilledState } from "../../types/Nft";
import useProgramInstructions from "../../hooks/useProgramInstructions";
import { PublicKey } from "@solana/web3.js";
import { motion } from "framer-motion";
import HammerStrike from "./HammerStrike";
import {
  deleteEggHammeringTime,
  getEggHammeringTime,
  setEggHammeringTime,
} from "../../utils/hammerTimers";
import EggCrackingProgress from "./EggCrackingProgress";

const EggBox: React.FC<{ egg: any; nftMint: string }> = ({ egg, nftMint }) => {
  const ctx = useContext(CottonCandyContext);
  const [fulfilledState, setFulFilledState] = useState<FulFilledState | null>(
    null
  );

  const { FulfillHatching } = useProgramInstructions();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const showProgress = useRef<boolean | null>(null);

  const [crackpoints, setCrackPoints] = useState(0);

  const isEggCracking = getEggHammeringTime(egg.mintAddress);

  const getCurrentEggState = async () => {
    await getEggState();
  };

  useEffect(() => {
    getCurrentEggState();

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
    if (
      !egg.mintAddress ||
      !nftMint ||
      !fulfilledState ||
      fulfilledState?.lotteryStatus !== "none"
    )
      return;

    if (crackpoints < 10) {
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
    if (egg.mintAddress !== ctx.refreshNftState) return;
    getCurrentEggState();
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
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="z-10 hidden w-full h-full group-hover:block hammer-bg"
        >
          <HammerStrike />
        </motion.div>
      )}

      {fulfilledState?.status === "pending" && crackpoints > 0 && (
        <motion.div className="absolute z-10 block p-1 bg-black/70 group-hover:hidden">
          <EggCrackingProgress crackpoints={crackpoints} />
        </motion.div>
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
