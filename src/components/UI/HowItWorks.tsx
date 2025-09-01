import { motion } from "framer-motion";
import { useState } from "react";

const HowItWorks: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative mx-auto w-[125px] h-[180px] mt-6 overflow-hidden"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Body */}
      <div className="absolute inset-0 bg-how-it-works w-[100px] h-[200px] bg-contain bg-no-repeat z-10" />

      {/* Left Arm */}
      <motion.div
        className="absolute bg-how-it-works-arm bg-contain bg-no-repeat 
                   top-[60px] left-2 w-[70%] h-[164px]"
        style={{ originX: 0, originY: 0, zIndex: 1 }}
        animate={{ rotate: hovered ? 0 : 90 }}
        transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
      />
    </motion.div>
    // <div className="person-body">
    //   <div className="person bg-how-it-works w-[111px] h-[304px]"></div>
    //   <div className="arm"></div>
    // </div>
  );
};

export default HowItWorks;
