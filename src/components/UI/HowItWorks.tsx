import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { CottonCandyContext } from "../../providers/ContextProvider";

const HowItWorksNav: React.FC = () => {
  const ctx = useContext(CottonCandyContext);
  const [hovered] = useState(true);

  return (
    <motion.div
      onClick={() => ctx.setBookmark("tutorial")}
      className="relative mx-auto w-[125px] h-[180px] mt-6 overflow-hidden"
      // onHoverStart={() => setHovered(true)}
      // onHoverEnd={() => setHovered(false)}
    >
      {/* Body */}
      <div className="absolute inset-0 bg-how-it-works w-[100px] h-[200px] bg-contain bg-no-repeat z-10" />

      <motion.div
        className="absolute bg-how-it-works-arm bg-contain bg-no-repeat 
                   top-[60px] left-2 w-[70%] h-[164px]"
        style={{ originX: 0, originY: 0, zIndex: 1 }}
        animate={{ rotate: hovered ? 0 : 90 }}
        transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
      />
    </motion.div>
  );
};

export default HowItWorksNav;
