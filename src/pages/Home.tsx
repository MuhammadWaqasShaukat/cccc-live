import HeroSection from "../components/heroSection";
import AboutSection from "../components/aboutSection";
import MintSection from "../components/mintSection";
import ClaimEgg from "../components/ClaimEgg";
import { CottonCandyContext } from "../providers/ContextProvider";
import { useContext, useEffect } from "react";
import CrackEgg from "../components/CrackEgg";
import RewardReveal from "../components/UI/RewardReveal";
import NFTSwiper from "../components/UI/NFTSwiper";

import "react-circular-progressbar/dist/styles.css";
import Portal from "../components/UI/Portal";
import { motion } from "framer-motion";

const Home = () => {
  const ctx = useContext(CottonCandyContext);

  useEffect(() => {
    if (!ctx.crackedEggStatus) return;
    ctx.setCurrentModal("reward-reveal");
  }, [ctx.crackedEggStatus]);

  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          opacity: {
            duration: 0.5,
          },
        }}
      >
        <HeroSection />
      </motion.div>

      {/* pages  */}
      {ctx.activeMenu === "about" && <AboutSection />}
      {ctx.activeMenu === "mint" && <MintSection />}
      {ctx.currentModal === "claim-egg" && <ClaimEgg />}
      {ctx.currentModal === "crack-egg" && <CrackEgg />}
      {ctx.currentModal === "reward-reveal" && <RewardReveal />}
      {ctx.currentModal === "nfts" && <NFTSwiper />}
      {ctx.isPortalOpen === true && <Portal />}
    </>
  );
};

export default Home;
