import { memo, useCallback, useEffect, useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import Modal from "./Modal";
import { WalletName } from "@solana/wallet-adapter-base";
import { useWalletModal } from "../../hooks/useWalletModal";

const ALLOWED_WALLETS = [
  "Phantom",
  "MetaMask",
  "Sollet Extension",
  "Sollet",
  "Solflare",
  "Slope",
  "Torus",
  "Ledger",
];

const WALLETS_ICONS = {
  Phantom: "images/wallets/phantom.png",
  MetaMask: "images/wallets/metamask.png",
  "Sollet Extension": "images/wallets/sollet-ext.png",
  Sollet: "images/wallets/sollet.png",
  Solflare: "images/wallets/solfare.png",
  Slope: "images/wallets/slope.png",
  Torus: "images/wallets/torus.png",
  Ledger: "images/wallets/ledger.png",
};

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
      wallets
        .filter((wallet) => ALLOWED_WALLETS.includes(wallet.adapter.name))
        .map((wallet, i) => {
          const icon =
            wallet.adapter.name in WALLETS_ICONS
              ? WALLETS_ICONS[wallet.adapter.name as keyof typeof WALLETS_ICONS]
              : wallet.adapter.icon;

          return (
            <button
              key={`${wallet.adapter.name}-${i}`}
              onClick={() => handleConnect(wallet.adapter.name)}
              className="flex flex-row justify-between items-center gap-3 w-full pl-5 pr-4 py-4 max-h-[107px] max-w-[310px] rounded-xl transition  bg-white/40 hover:bg-white"
            >
              <span className="text-2xl font-medium uppercase font-patrick-hand-sc">
                {wallet.adapter.name}
              </span>

              <img
                src={icon}
                alt={wallet.adapter.name}
                className="size-20 rounded-xl"
              />
            </button>
          );
        }),
    [wallets, handleConnect]
  );
  if (!visible) return null;

  return (
    <Modal onBackgroundClick={() => setVisible(false)}>
      <div className="bg-sm-mint-section-book bg-cover bg-no-repeat h-max p-2 flex flex-col justify-center items-center md:gap-6 gap-4 rounded-2xl w-[350px] md:w-[355px]">
        <h2 className="text-[28px]  uppercase text-black font-patrick-hand-sc text-center leading-[52px]">
          Connect Wallet
        </h2>
        <div className="space-y-4 px-2.5  flex flex-col w-full min-h-40 max-h-96 overflow-scroll filter-list">
          {walletButtons}
        </div>

        <div className="bg-white-listing-connect bg-contain bg-center bg-no-repeat h-28 w-[226px] p-6 mx-auto"></div>
        <div className="w-full text-center">
          <span className="block underline font-patrick-hand-sc text-base px-4">
            &nbsp; &nbsp; &nbsp; &nbsp; Terms And Conditions &nbsp; &nbsp;
            &nbsp; &nbsp;
          </span>
        </div>
      </div>
    </Modal>
  );
});

WalletModal.displayName = "WalletModal";
export default WalletModal;
