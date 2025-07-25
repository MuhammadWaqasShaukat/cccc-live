import { motion } from "framer-motion";

const NftLoader = () => {
  return (
    <div className="grid w-full h-full -ml-6 place-content-center">
      <motion.img
        src={"/images/snake-loader.png"}
        alt="Loading..."
        className={`size-24`}
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
    </div>
  );
};

export default NftLoader;
