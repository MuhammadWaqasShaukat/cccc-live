import { memo, useCallback, useEffect, useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import Modal from "./Modal";
import { WalletName } from "@solana/wallet-adapter-base";
import { useWalletModal } from "../../hooks/useWalletModal";

const WalletModal = memo(() => {
  const { visible, setVisible } = useWalletModal();
  const { wallets, select, connected, publicKey } = useWallet();

  // Connect to selected wallet
  const handleConnect = useCallback(
    async (walletName: WalletName) => {
      try {
        // ✅ Only call select — it handles the connection internally
        select(walletName);
      } catch (err) {
        console.error("Wallet connection failed:", err);
      }
    },
    [select]
  );

  // ✅ Automatically close modal when wallet connects
  useEffect(() => {
    if (connected || publicKey) {
      setVisible(false);
    }
  }, [connected, publicKey, setVisible]);

  // Wallet buttons list
  const walletButtons = useMemo(
    () =>
      wallets.map((wallet, i) => (
        <button
          key={`${wallet.adapter.name}-${i}`}
          onClick={() => handleConnect(wallet.adapter.name)}
          className="flex items-center gap-3 w-full px-2 py-2 rounded-xl transition border-2 border-black"
        >
          <img
            src={wallet.adapter.icon}
            alt={wallet.adapter.name}
            className="size-8 rounded-full"
          />
          <span className="text-2xl font-medium font-patrick-hand-sc">
            {wallet.adapter.name}
          </span>
        </button>
      )),
    [wallets, handleConnect]
  );

  if (!visible) return null;

  return (
    <Modal onBackgroundClick={() => setVisible(false)}>
      <div className="bg-sm-mint-section-book bg-cover bg-no-repeat h-max p-2 flex flex-col justify-center items-center md:gap-6 gap-4 rounded-2xl w-[350px] md:w-[400px]">
        <div className="bg-white-listing-open bg-contain w-full md:h-48 h-40 bg-center bg-no-repeat grid place-content-center">
          <h2 className="text-3xl uppercase text-black font-patrick-hand-sc text-center leading-10">
            Connect Wallet
          </h2>
        </div>

        <div className="space-y-3 px-4 flex flex-col w-full min-h-40 max-h-60 overflow-scroll filter-list">
          {walletButtons}
        </div>

        <div className="bg-white-listing-connect bg-contain bg-center bg-no-repeat h-36 w-full p-6 mx-auto"></div>
        <div className="w-full text-center">
          <span className="block underline font-patrick-hand-sc text-base">
            DESCRIPTION OF THE CONDITION
          </span>
        </div>
      </div>
    </Modal>
  );
});

WalletModal.displayName = "WalletModal";
export default WalletModal;
