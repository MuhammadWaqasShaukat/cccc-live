import { createContext, useState, ReactNode } from "react";
import { StateSetter } from "../types/CottonCandyContext";

type WalletModalContextType = {
  visible: boolean;
  setVisible: StateSetter<boolean>;
};

// ✅ Create context
export const WalletModalContext = createContext<WalletModalContextType>(
  {} as WalletModalContextType
);

// ✅ Provider component
export const WalletModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <WalletModalContext.Provider value={{ visible, setVisible }}>
      {children}
    </WalletModalContext.Provider>
  );
};
