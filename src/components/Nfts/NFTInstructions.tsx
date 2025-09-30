import React, { useEffect } from "react";
import Modal from "../UI/Modal";

const NFTInstructions = ({
  setViewInstruction,
}: {
  setViewInstruction: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    return () => setViewInstruction(false);
  }, []);

  return (
    <Modal onBackgroundClick={() => {}} className="grid md:hidden">
      <div className="bg-no-repeat relative z-60 bg-cover bg-sm-mint-section-book md:hidden  h-max bg-left w-[80%] rounded-3xl p-5 flex flex-col justify-start items-center gap-12">
        <div className="bg-mint-section-nfts-book bg-contain w-full h-[150px] bg-no-repeat absolute bottom-0 bg-center z-30"></div>

        <div>
          <h2 className="w-full text-3xl text-center uppercase font-patrick-hand">
            INSTRUCTION
          </h2>
        </div>

        <div className="space-y-8">
          <div className="grid items-start grid-cols-3">
            {/* icon */}
            <div className="grid w-full col-span-1 place-content-center">
              <img
                src={`./images/egg.webp`}
                alt="claimable egg"
                className="w-16"
              />
            </div>
            {/* description */}
            <p className="col-span-2 px-4 text-xl font-patrick-hand ">
              Once sale is over you could summon the Eggs using your NFTs
            </p>
          </div>

          <div className="grid items-start grid-cols-3 ">
            {/* icon */}
            <div className="grid w-full col-span-1 place-content-center">
              <img
                src={`./images/lucky-ticket.webp
                  `}
                alt="claimable egg"
                className="w-20"
              />
            </div>
            {/* description */}
            <p className="z-40 col-span-2 px-4 text-xl font-patrick-hand">
              The Egg is a collectible item with the chance of winning a cash
              prize
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

export default NFTInstructions;
