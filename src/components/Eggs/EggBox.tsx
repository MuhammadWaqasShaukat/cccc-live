import { useContext, useEffect, useRef, useState } from "react";
import { CottonCandyContext } from "../../providers/ContextProvider";
import { FulFilledState, Token } from "../../types/Nft";
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
import { useGetAllEggs } from "../../hooks/useGetAllEggs";
import useGetUpdatedTokenByMintAddress from "../../hooks/useGetTokenByMintAddress";

const EGG_CRACK_LIMIT = 10;

const EggBox: React.FC<{ egg: Token; nftMint: string }> = ({
  egg,
  nftMint,
}) => {
  const ctx = useContext(CottonCandyContext);

  const { getUpdatedEgg } = useGetUpdatedTokenByMintAddress();
  const { updateEggInCache } = useGetAllEggs();

  const { FulfillHatching } = useProgramInstructions();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const showProgress = useRef<boolean | null>(null);

  const [crackpoints, setCrackPoints] = useState(0);

  const eggId = egg.metadata.mintAddress as any;

  const isEggCracking = getEggHammeringTime(eggId);
  const isHatchingRef = useRef(false);

  const resetEggcreacking = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (showProgress.current) showProgress.current = null;
  };

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

    return () => {
      resetEggcreacking();
    };
  }, []);

  const afterEggReviveTimeoutCB = () => {
    setCrackPoints((prev) => {
      if (prev <= 1) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        showProgress.current = null;
        deleteEggHammeringTime(eggId);
        return 0;
      }
      return prev - 1;
    });
  };

  const beforeEggReviveTimeoutCB = () => {
    intervalRef.current = setInterval(afterEggReviveTimeoutCB, 500);
  };

  const handleCrackEgg = () => {
    if (
      !egg.metadata.mintAddress ||
      !nftMint ||
      (egg.state as FulFilledState).lotteryStatus !== "none" ||
      isHatchingRef.current
    ) {
      return;
    }

    setCrackPoints((prev: number) => {
      const next = prev + 1;
      setEggHammeringTime(eggId, next);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      timeoutRef.current = setTimeout(beforeEggReviveTimeoutCB, 30000);

      if (next >= EGG_CRACK_LIMIT && !isHatchingRef.current) {
        isHatchingRef.current = true;
        hatchEgg();
      }

      return next;
    });
  };

  const hatchEgg = async () => {
    try {
      deleteEggHammeringTime(eggId);
      ctx.setCurrentModal(null);
      ctx.setIsPortalOpen(true);

      if (egg.metadata.mintAddress && nftMint) {
        await FulfillHatching(
          new PublicKey(egg.metadata.mintAddress),
          new PublicKey(nftMint)
        );
      }
      resetEggcreacking();

      const updatedEgg = await getUpdatedEgg(egg);
      if (updatedEgg) {
        if (updatedEgg) {
          updateEggInCache({ ...updatedEgg });
        }
      }
    } catch (error: any) {
      console.error("Error during hatching:", error.message);
      ctx.setIsPortalOpen(false);
    } finally {
      ctx.setIsPortalOpen(false);
      isHatchingRef.current = false;
    }
  };

  const imageSrc = "./images/section-mint/nfts/egg.png";

  return (
    <div
      data-nft-mint={nftMint}
      onClick={handleCrackEgg}
      className={`aspect-square border-2 border-black rounded-xl grid place-content-center grid-cols-1 grid-rows-1 h-full w-full sm:min-w-28 xs:min-w-20 md:min-w-[72px] lg:min-w-24  overflow-hidden  relative group`}
    >
      {/* reward */}
      {(egg.state as FulFilledState).status === "done" &&
        (egg.state as FulFilledState).lotteryStatus === "won" && (
          <motion.div
            key="won"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ opacity: { duration: 0.3 } }}
            className="absolute top-0 bottom-0 left-0 right-0 z-10 w-full h-full bg-hatch-won"
          ></motion.div>
        )}
      {/* no reward */}
      {(egg.state as FulFilledState).status === "done" &&
        (egg.state as FulFilledState).lotteryStatus === "lost" && (
          <motion.div
            key="lost"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ opacity: { duration: 0.3 } }}
            className="absolute top-0 bottom-0 left-0 right-0 z-10 w-full h-full bg-hatch-lost"
          ></motion.div>
        )}
      {(egg.state as FulFilledState).status === "pending" && (
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="z-10 hidden w-full h-full group-hover:block hammer-bg"
        >
          <HammerStrike />
        </motion.div>
      )}

      {(egg.state as FulFilledState).status === "pending" &&
        crackpoints > 0 && (
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
