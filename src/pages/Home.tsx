import HeroSection from "../components/heroSection";
import AboutSection from "../components/aboutSection";
import MintSection from "../components/mintSection";
import ClaimEgg from "../components/Nfts/ClaimEgg";
import { CottonCandyContext } from "../providers/ContextProvider";
import { useContext } from "react";

import "react-circular-progressbar/dist/styles.css";
import Portal from "../components/UI/Portal";
import NFTSwiper from "../components/Nfts/NFTSwiper";
import EggRevealAnimation from "../components/Eggs/EggRevealAnimation";
import NftReveal from "../components/Nfts/NftReveal";

const Home = () => {
  const ctx = useContext(CottonCandyContext);

  return (
    <>
      <HeroSection />
      {ctx.activeMenu === "about" && <AboutSection />}
      {ctx.activeMenu === "mint" && <MintSection />}
      {ctx.currentModal === "claim-egg" && <ClaimEgg />}
      {ctx.currentModal === "nfts" && <NFTSwiper />}
      {ctx.isPortalOpen === true && <Portal />}
      {ctx.isEggCracked && ctx.revealReward && (
        <EggRevealAnimation reveal={ctx.revealReward} />
      )}
      {ctx.revealNFT && <NftReveal />}
    </>
  );
};

export default Home;
