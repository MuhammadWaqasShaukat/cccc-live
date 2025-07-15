import { useWallet } from "@solana/wallet-adapter-react";
import { motion } from "framer-motion";
import React from "react";

interface BookMarkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  children: React.ReactNode;
  disabledClasss: string;
}

const Bookmark: React.FC<BookMarkProps> = ({
  active,
  onClick,
  children,
  className,
  disabledClasss,
}) => {
  const { connected } = useWallet();

  return (
    <motion.button
      disabled={!connected}
      onClick={onClick}
      type="button"
      animate={{}}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className={`px-5 py-2.5 bg-no-repeat bg-contain w-32 h-14 ${
        active ? className : disabledClasss
      }`}
    >
      {children}
    </motion.button>
  );
};

export default Bookmark;
