import { useWallet } from "@solana/wallet-adapter-react";
import { motion } from "framer-motion";
import React from "react";

interface BookMarkProps {
  active: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  children: React.ReactNode;
}

const Bookmark: React.FC<BookMarkProps> = ({ active, onClick, children }) => {
  const { connected } = useWallet();

  return (
    <motion.button
      disabled={!connected}
      onClick={onClick}
      type="button"
      animate={{
        backgroundColor: active ? "#FFF877" : "#ffffff",
        width: active ? "125%" : "100%",
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="px-5 py-2.5 border-2 border-black font-sans text-black text-2xl font-semibold rounded-r-xl"
    >
      {children}
    </motion.button>
  );
};

export default Bookmark;
