import { useContext, useEffect } from "react";
import Modal from "../UI/Modal";
import Countdown from "../UI/Countdown";
import { CottonCandyContext } from "../../providers/ContextProvider";

export type WhiteListTypes = "whitelist" | "not-whitelist";

const WhiteListedSuccess = () => {
  return (
    <div className="bg-whitelisted-success bg-cover bg-no-repeat bg-center md:w-[400px] w-[350px] flex flex-col items-center p-6 gap-9 rounded-3xl">
      <div>
        <h2 className=" text-black font-patrick-hand-sc md:text-5xl text-[28px] text-center font-medium">
          YOU’RE IN!
        </h2>
        <p className=" text-[22px] font-patrick-hand-sc text-black px-7 text-center leading-6">
          WELCOME TO THE FAMILY, CRUSADER
        </p>
      </div>
      <div className="w-full">
        <img
          src="./images/whitelist/whitelisted.webp"
          alt=""
          className=" w-[100%]"
        />

        <div className="bg-white-listing-blue -mt-11 bg-contain w-full h-48 bg-center bg-no-repeat grid place-content-center">
          <h2 className=" text-3xl uppercase text-white font-patrick-hand-sc text-center leading-10">
            Mining Starts
          </h2>
          <Countdown />
        </div>
      </div>
    </div>
  );
};

const WhiteListedFailed: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="bg-whitelisted-failed bg-cover bg-no-repeat bg-center max-w-[350px] flex flex-col items-center p-4 gap-9 rounded-3xl guide">
      <h2 className=" text-black font-patrick-hand-sc text-5xl text-center font-medium leading-none">
        Sorry, <br />
        not whitelisted
      </h2>
      <img
        src="./images/whitelist/not-whitelisted.webp"
        alt=""
        className=" w-[70%]"
      />
      <button
        onClick={onClose}
        className="bg-notify-me-btn ml-2 h-20 w-60 relative bg-contain bg-no-repeat group z-40"
      >
        <span className="absolute inset-0 z-50 transition duration-200 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20"></span>
        <span className=" absolute inset-0 w-full h-full grid place-content-center font-patrick-hand text-3xl uppercase leading-none text-white z-60">
          Change Wallet
        </span>
      </button>
    </div>
  );
};

const WhiteListed: React.FC<{
  status: WhiteListTypes | null;
  setStatus: React.Dispatch<React.SetStateAction<WhiteListTypes | null>>;
}> = ({ status, setStatus }) => {
  const {
    setTimeRemaining,
    calculateRemaining,
    saleCountdown,
    setCurrentModal,
  } = useContext(CottonCandyContext);

  useEffect(() => {
    if (saleCountdown && status == "whitelist") {
      setTimeRemaining(calculateRemaining(saleCountdown));
    }

    return () => setStatus(null);
  }, []);

  return (
    <Modal onBackgroundClick={() => setCurrentModal(null)} className="">
      {status === "whitelist" ? (
        <WhiteListedSuccess />
      ) : (
        <WhiteListedFailed onClose={() => setCurrentModal(null)} />
      )}
    </Modal>
  );
};

export default WhiteListed;
