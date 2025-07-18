import { useContext, useEffect, useRef, useState } from "react";
import { CottonCandyContext } from "../providers/ContextProvider";
import Modal from "./UI/Modal";
import useProgramInstructions from "../hooks/useProgramInstructions";
import { PublicKey } from "@metaplex-foundation/js";
import useWeb3Utils from "../hooks/useWeb3Utils";
import { motion } from "framer-motion";

const CrackEgg = () => {
  const ctx = useContext(CottonCandyContext);
  const { FulfillHatching } = useProgramInstructions();
  const { getNftState, getLotteryState, connection } = useWeb3Utils();
  const [shouldCrack, setShouldCrack] = useState(false);
  const { mintAddress: eggMintAddress } = ctx.collectable || {};
  const [time, setTime] = useState<{ hours: number; minutes: number } | null>(
    null
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [crackpoints, setCrackPoints] = useState(0);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleKeepEgg = async () => {
    ctx.setCurrentModal(null);
    ctx.setNftMint(null);
  };

  const handleCrackEgg = async () => {
    if (crackpoints < 100000) {
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
              return 0;
            }
            return prev - 1;
          });
        }, 500);
      }, 30000);
      return;
    }

    try {
      ctx.setCurrentModal(null);
      ctx.setIsPortalOpen(true);
      if (eggMintAddress && ctx.nftMint) {
        await FulfillHatching(
          new PublicKey(eggMintAddress),
          new PublicKey(ctx.nftMint)
        );
      }

      ctx.setRefreshNftState(eggMintAddress);
    } catch (error: any) {
      console.error("Error : ", error.message);
      ctx.setIsPortalOpen(false);
    } finally {
      ctx.setIsPortalOpen(false);
    }
  };

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
  }, [eggMintAddress]);

  return (
    <Modal onBackgroundClick={handleKeepEgg}>
      <div className="flex flex-col justify-center items-center  w-full h-full bg-claim-egg-bg bg-cover bg-no-repeat bg-center p-4 gap-9 z-50">
        <h1 className=" uppercase text-white  font-patrick-hand-sc text-6xl">
          The Egg <span className="text-5xl">was summoned</span>!
        </h1>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 0.5,
          }}
          className="w-full flex justify-center"
        >
          <img
            className="w-[350px] h-auto rounded-2xl"
            src={`./images/egg.png`}
            alt=""
          />

          {
            <div className=" absolute h-1/2 z-50 flex flex-col justify-center items-center">
              <span className=" text-6xl font-patrick-hand">
                {crackpoints} / {10000}
              </span>
            </div>
          }
        </motion.div>
        <div className=" flex flex-row justify-between items-start gap-9">
          <button
            onClick={handleKeepEgg}
            className="bg-mint-section-btn w-full h-full md:h-[86px] md:w-[191px] relative bg-contain bg-no-repeat group z-40"
          >
            <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20 transition duration-200 z-50"></span>
            <span className=" absolute inset-0 w-full h-full grid place-content-center font-patrick-hand text-3xl  leading-none text-white z-60">
              Keep
            </span>
          </button>
          <div className=" flex flex-col justify-start  gap-2">
            <button
              disabled={!shouldCrack}
              onClick={handleCrackEgg}
              className={` ${
                shouldCrack
                  ? "bg-summon-egg-btn"
                  : "bg-crack-disabled-btn rounded-2xl"
              } w-full h-full md:h-[86px] md:w-[237px] relative bg-contain bg-no-repeat group z-40 rounded-2xl`}
            >
              <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20 transition duration-200 z-50"></span>
              <span className=" absolute inset-0 w-full h-full grid place-content-center font-patrick-hand text-3xl  leading-none text-white z-60">
                Crack
              </span>
              {!shouldCrack && time && (
                <div className=" absolute -bottom-2 flex flex-row justify-center items-center w-full text-white">
                  <div className=" font-patrick-hand-sc inline-block text-2xl">
                    {time && time.hours}
                    <span className="text-lg">H</span> {time && time.minutes}
                    <span className="text-lg">M</span>
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CrackEgg;
