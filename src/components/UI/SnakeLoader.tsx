import Modal from "./Modal";
import { motion } from "framer-motion";

const SnakeLoader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
}) => {
  return (
    <Modal onBackgroundClick={() => {}} className={className}>
      <motion.img
        src={"/images/snake-loader.png"}
        alt="Loading..."
        className={`size-44 z-100`}
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
