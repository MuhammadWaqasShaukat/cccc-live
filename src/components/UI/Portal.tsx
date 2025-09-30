import Modal from "./Modal";
import { motion } from "framer-motion";

const Portal = () => {
  return (
    <Modal onBackgroundClick={() => {}}>
      <motion.img
        src={"./images/portal.webp"}
        alt="Loading..."
        className="w-[80%]"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 0.8],
          opacity: [0.5, 1, 0.2],
        }}
        transition={{
          rotate: {
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            duration: 2,
          },
          scale: {
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            duration: 1.5,
          },
          opacity: {
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            duration: 1.5,
          },
        }}
      />
    </Modal>
  );
};

export default Portal;
