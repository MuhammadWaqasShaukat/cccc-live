import { useContext, useEffect, useRef } from "react";
import { useHeroAnimator } from "../../hooks/useHeroAnimator";
import Modal from "../UI/Modal";
import { MultiSpriteConfig } from "../../types/animations";
import { CottonCandyContext } from "../../providers/ContextProvider";
const SummonedEggAnimation: React.FC<{ config: MultiSpriteConfig }> = ({
  config,
}) => {
  const summonedEggRef = useRef<HTMLDivElement>(null);
  const ctx = useContext(CottonCandyContext);

  const { startAnimation, isReady } = useHeroAnimator(
    summonedEggRef,
    config,
    "summoned-egg",
    onAnimtionEnd
  );

  function onAnimtionEnd() {
    if (ctx.activeMenu !== "mint") {
      ctx.setActiveMenu("mint");
    }
    ctx.setBookmark("eggs");
    ctx.setIsEggSummoned(false);
  }

  useEffect(() => {
    if (isReady) {
      startAnimation();
    }
  }, [isReady]);

  return (
    <Modal onBackgroundClick={() => {}} className="!bg-black">
      <div
        ref={summonedEggRef}
        style={{
          width: `500px`,
          height: `500px`,
          backgroundImage:
            "url('/images/animations/sprites/summon-egg/thumbnail.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundPosition: "0% 0%",
        }}
        className="  max-h-[500px] max-w-[500px] min-w-[200px] min-h-[200px] bg-no-repeat bg-contain bg-bottom absolute left-[50%] -translate-x-[50%] z-40"
      ></div>
    </Modal>
  );
};

export default SummonedEggAnimation;
