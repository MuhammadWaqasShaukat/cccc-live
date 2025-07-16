import Modal from "./Modal";
import { motion } from "framer-motion";

const SnakeLoader = () => {
  return (
    <Modal onBackgroundClick={() => {}}>
      <motion.img
        src={"/images/snake-loader.png"}
        alt="Loading..."
        className="size-44"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          rotate: {
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            duration: 2,
          },
        }}
      />
    </Modal>
  );
};

export default SnakeLoader;
