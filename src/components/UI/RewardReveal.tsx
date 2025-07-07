import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";
import { CottonCandyContext } from "../../providers/ContextProvider";

const RewardReveal = () => {
  const { crackedEggStatus, setCrackedEggStatus } =
    useContext(CottonCandyContext);

  const imgSrc =
    crackedEggStatus && crackedEggStatus.lotteryStatus == "won"
      ? "./images/animations/results/win.png"
      : "./images/animations/results/lost.png";

  const handleClose = () => {
    setCrackedEggStatus(null);
  };

  useEffect(() => {
    return () => handleClose();
  }, []);

  return (
    <Modal onBackgroundClick={() => {}}>
      <div className="flex flex-col justify-center items-center  w-full h-full bg-claim-egg-bg bg-cover bg-no-repeat bg-center p-4 gap-9 z-50">
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
          <img className="w-[400px] h-auto rounded-2xl" src={imgSrc} alt="" />
        </motion.div>

        <div className=" flex flex-row justify-between items-start gap-9">
          <button
            onClick={handleClose}
            className="bg-mint-section-btn w-full h-full md:h-[86px] md:w-[191px] relative bg-contain bg-no-repeat group z-40"
          >
            <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20 transition duration-200 z-50"></span>
            <span className=" absolute inset-0 w-full h-full grid place-content-center font-patrick-hand text-3xl leading-none text-white z-60">
              Close
            </span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RewardReveal;
