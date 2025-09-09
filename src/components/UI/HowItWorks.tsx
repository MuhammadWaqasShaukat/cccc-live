import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { CottonCandyContext } from "../../providers/ContextProvider";
const HowItWorksNav: React.FC = () => {
  const ctx = useContext(CottonCandyContext);
  const [startRotate, setStartRotate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartRotate(true);
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      onClick={() => ctx.setBookmark("tutorial")}
      className="relative mx-auto w-[125px] h-[180px] mt-6 overflow-hidden"
    >
      {/* Body */}
      <div className="absolute inset-0 bg-how-it-works w-[100px] h-[200px] bg-contain bg-no-repeat z-10" />
      <motion.div
        className="absolute bg-how-it-works-arm bg-contain bg-no-repeat 
                   top-[60px] left-2 w-[70%] h-[164px]"
        style={{ originX: 0, originY: 0, zIndex: 1 }}
        initial={{ rotate: 90 }}
        animate={{ rotate: startRotate ? 0 : 90 }}
        transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
      />
    </motion.div>
  );
};

export default HowItWorksNav;
