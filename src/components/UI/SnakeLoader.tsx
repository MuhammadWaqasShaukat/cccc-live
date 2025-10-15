import Modal from "./Modal";
import { motion } from "framer-motion";

type SnakeLoaderProps = {
  message?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const SnakeLoader: React.FC<SnakeLoaderProps> = ({ className, message }) => {
  return (
    <Modal onBackgroundClick={() => {}} className={className}>
      <motion.img
        src={"/images/snake-loader.webp"}
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
      <span className=" text-white font-patrick-hand-sc text-3xl uppercase">
        {message}
      </span>
    </Modal>
  );
};

export default SnakeLoader;
