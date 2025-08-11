import React, { useEffect } from "react";
import Modal from "../UI/Modal";

const EggInstruction = ({
  setViewInstruction,
}: {
  setViewInstruction: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    return () => setViewInstruction(false);
  }, []);

  return (
    <Modal onBackgroundClick={() => {}} className="grid md:hidden">
      <div className="bg-no-repeat bg-cover bg-sm-mint-section-book md:hidden  h-max bg-left w-[80%] rounded-3xl p-5 flex flex-col justify-start items-center gap-12 relative">
        <div className="bg-mint-section-egg-book bg-contain w-full h-[150px]  bg-no-repeat absolute bottom-0 bg-center z-0"></div>
        <div>
          <h2 className="w-full text-3xl text-center uppercase font-patrick-hand">
            INSTRUCTION
          </h2>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-3 ">
            {/* icon */}
            <div className="grid w-full col-span-1 place-content-center h-max">
              <img
                src={`./images/hammer.png`}
                alt="claimable egg"
                className="w-16"
              />
            </div>
            {/* description */}
            <p className="col-span-2 text-xl font-patrick-hand">
              Eggs can be cracked. Crack an egg for a chance of winning a prize.
              Click the egg to get cracking.
            </p>
          </div>

          <div className="relative z-20 grid grid-cols-3">
            {/* icon */}
            <div className="grid w-full place-content-center h-max">
              <img
                src={`./images/hourglass.png`}
                alt="claimable egg"
                className="w-16"
              />
            </div>
            {/* description */}
            <p className="z-40 col-span-2 text-xl font-patrick-hand">
              Cracking takes 24 hours. Multiply eggs can be cracking
              simultaneously.
            </p>
          </div>
        </div>

        <button
          onClick={() => setViewInstruction(false)}
          className="bg-about-ok-btn  h-[38px] w-[71px] relative bg-contain bg-no-repeat group z-40 mt-auto"
        >
          <span className="absolute inset-0 z-50 transition duration-200 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20"></span>
          <span className=" absolute inset-0 w-full h-full grid place-content-center font-patrick-hand text-[22px] leading-none text-white z-60">
            OK
          </span>
        </button>
      </div>
    </Modal>
  );
};

export default EggInstruction;
