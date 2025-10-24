import { useContext } from "react";
import Modal from "../UI/Modal";
import { CottonCandyContext } from "../../providers/ContextProvider";
import { useWalletModal } from "../../hooks/useWalletModal";

const WalletConnectModal = () => {
  const { setVisible } = useWalletModal();
  const { setCurrentModal } = useContext(CottonCandyContext);

  const handleConnect = () => {
    setVisible(true);
    setCurrentModal(null);
  };

  return (
    <>
      <Modal onBackgroundClick={() => setCurrentModal(null)} className="">
        <div className="bg-sm-mint-section-book bg-cover bg-no-repeat h-max p-2 flex flex-col justify-center items-center md:gap-6 gap-4 rounded-2xl w-[350px] md:w-[400px]">
          <div className="bg-white-listing-open bg-contain w-full md:h-48 h-40 bg-center bg-no-repeat grid place-content-center">
            <h2 className=" text-3xl uppercase text-black font-patrick-hand-sc text-center leading-10">
              TO INPUT EMAIL, <br /> FIRST CONNECT WALLET
            </h2>
          </div>

          <div className="bg-white-listing-connect bg-contain bg-center bg-no-repeat h-36 w-full p-6 mx-auto"></div>
          <div className=" w-full text-center">
            <button
              onClick={handleConnect}
              className="bg-white-listing-connect-btn mt-2 md:h-20 md:w-64 h-12 w-40 relative bg-contain bg-no-repeat group z-40"
            >
              <span className="absolute inset-0 z-50 transition duration-200 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20"></span>
              <span className=" absolute inset-0 w-full h-full grid place-content-center font-patrick-hand md:text-5xl text-[22px] uppercase leading-none text-white z-60">
                Connect
              </span>
            </button>

            <span className=" block underline font-patrick-hand-sc text-base">
              DESCRIPTION OF THE CONDITION
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default WalletConnectModal;
