import HeroSection from "../components/heroSection";
import AboutSection from "../components/aboutSection";
import MintSection from "../components/mintSection";
import { CottonCandyContext } from "../providers/ContextProvider";
import { useContext } from "react";

import "react-circular-progressbar/dist/styles.css";
import Portal from "../components/UI/Portal";
import NFTSwiper from "../components/Nfts/NFTSwiper";
import EggRevealAnimation from "../components/Eggs/EggRevealAnimation";
import NftReveal from "../components/Nfts/NftReveal";
import NFTPreview from "../components/Nfts/NFTPreview";
// import NFTGenerator from "../components/generate-nft";

const Home = () => {
  const ctx = useContext(CottonCandyContext);

  return (
    <>
      {/* <NFTGenerator /> */}
      <HeroSection />
      {ctx.activeMenu === "about" && <AboutSection />}
      {ctx.activeMenu === "mint" && <MintSection />}
      {ctx.currentModal === "nft-preview" && <NFTPreview />}
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
