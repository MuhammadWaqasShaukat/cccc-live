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
  style,
}) => {
  return (
    <motion.button
      onClick={onClick}
      type="button"
      animate={{}}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className={`px-5 py-2.5 bg-no-repeat bg-contain w-32 h-14 lg:w-28 lg:h-14 md:w-20 md:h-10 ${
        active ? className : disabledClasss
      }`}
      style={style}
    >
      {children}
    </motion.button>
  );
};

export default Bookmark;
