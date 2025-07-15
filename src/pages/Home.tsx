import HeroSection from "../components/heroSection";
import AboutSection from "../components/aboutSection";
import MintSection from "../components/mintSection";
// import SocialSection from "../components/socialSection";
import ClaimEgg from "../components/ClaimEgg";
import { CottonCandyContext } from "../providers/ContextProvider";
import { useContext, useEffect } from "react";
import CrackEgg from "../components/CrackEgg";
import Loader from "../components/UI/Loader";
import RewardReveal from "../components/UI/RewardReveal";
import NFTSwiper from "../components/UI/NFTSwiper";
// import NftReveal from "../components/UI/NftReveal";

const Home = () => {
  const ctx = useContext(CottonCandyContext);

  useEffect(() => {
    if (!ctx.crackedEggStatus) return;
    ctx.setCurrentModal("reward-reveal");
  }, [ctx.crackedEggStatus]);

  return (
    <>
      {/* <NftReveal /> */}
      <HeroSection />
      {/* <AboutSection /> */}
      {/* <MintSection /> */}
      {/* <SocialSection /> */}
      {/* pages  */}
      {ctx.activeMenu === "about" && <AboutSection />}
      {ctx.activeMenu === "mint" && <MintSection />}
      {ctx.currentModal === "claim-egg" && <ClaimEgg />}
      {ctx.currentModal === "crack-egg" && <CrackEgg />}
      {ctx.currentModal === "reward-reveal" && <RewardReveal />}
      {ctx.currentModal === "nfts" && <NFTSwiper />}
      {ctx.isLoading === true && <Loader />}
    </>
  );
};

export default Home;
