import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import "@solana/wallet-adapter-react-ui/styles.css";
import { CottonCandyContextProvider } from "./ContextProvider";
import { useMemo } from "react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletModalProvider } from "./WalletModalProvider";

export const Web3ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <CottonCandyContextProvider>
          <WalletModalProvider>{children}</WalletModalProvider>
        </CottonCandyContextProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
