import TopBar from "../components/topbar";
import HeroSection from "../components/heroSection";
import AboutSection from "../components/aboutSection";
import MintSection from "../components/mintSection";
import SocialSection from "../components/socialSection";
import ClaimEgg from "../components/ClaimEgg";
import { CottonCandyContext } from "../providers/ContextProvider";
import { useContext } from "react";
import CrackEgg from "../components/CrackEgg";
import Loader from "../components/UI/Loader";

const Home = () => {
  const ctx = useContext(CottonCandyContext);

  return (
    <>
      <TopBar />
      <HeroSection />
      <AboutSection />
      <MintSection />
      <SocialSection />
      {ctx.currentModal === "claim-egg" && <ClaimEgg />}
      {ctx.currentModal === "crack-egg" && <CrackEgg />}
      {ctx.isLoading === true && <Loader />}
    </>
  );
};

export default Home;
