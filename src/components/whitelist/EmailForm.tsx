import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import { CottonCandyContext } from "../../providers/ContextProvider";
import { useMutation } from "react-query";
import { useWalletModal } from "../../hooks/useWalletModal";
import { useWallet } from "@solana/wallet-adapter-react";

const apiUrl = import.meta.env.VITE_API_URL;

const EmailForm = () => {
  const [email, setEmail] = useState("");

  const { publicKey } = useWallet();

  const { visible } = useWalletModal();

  const ctx = useContext(CottonCandyContext);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const notifyMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${apiUrl}/whitelist/notify-me`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          notifyFor: ctx.lotteryPhase,
          walletAddress: publicKey?.toBase58(),
        }),
      });
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to send notification request");
      }
      return response.json();
    },
    onSuccess: (data) => {
      console.log("Successfully notified:", data);
      ctx?.setShallBeNotified(true);
      ctx?.setMintBtnTxt("You are on the list");
      setEmail("");
      ctx.setCurrentModal(null);
    },
    onError: (err: any) => {
      console.error("Error notifying:", err);
      ctx?.setShallBeNotified(false);
      ctx.setCurrentModal(null);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    notifyMutation.mutate();
  };

  if (visible) return;

  return (
    <Modal onBackgroundClick={() => ctx.setCurrentModal(null)} className="">
      <div className="bg-sm-mint-section-book bg-cover bg-no-repeat h-max p-6 flex  md:w-[350px] w-[300px] rounded-3xl relative pepe-write">
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col justify-center items-center md:gap-7 gap-5"
        >
          <div className=" w-full text-center space-y-2">
            <label
              htmlFor="email"
              className=" font-patrick-hand-sc md:text-2xl text-lg text-black uppercase "
            >
              Enter your email address
            </label>
            <input
              id="email"
              type="email"
              className="p-2.5 rounded-md w-full font-patrick-hand-sc text-2xl"
              value={email}
              onChange={handleOnChange}
            />
          </div>
          <button
            onClick={() => {}}
            className="bg-notify-me-btn  md:h-20 md:w-60 h-12 w-36 relative bg-contain bg-no-repeat group z-40"
          >
            <span className="absolute inset-0 z-50 transition duration-200 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20"></span>
            <span className=" absolute inset-0 w-full h-full grid place-content-center font-patrick-hand md:text-5xl text-[22px] uppercase leading-none text-white z-60">
              Notify Me
            </span>
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default EmailForm;
