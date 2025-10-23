import { useContext } from "react";
import { WalletModalContext } from "../providers/WalletModalProvider";

export const useWalletModal = () => {
  const { visible, setVisible } = useContext(WalletModalContext);

  return { visible, setVisible };
};
