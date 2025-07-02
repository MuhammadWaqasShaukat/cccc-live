import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const RewardReveal = () => {
  const step1Controls = useAnimation();
  const crack1Controls = useAnimation();

  const [currentStep, setCurrentStep] = useState<"step1" | "crack1" | "final">(
    "step1"
  );

  // Step 1: Tilt Right
  useEffect(() => {
    if (currentStep === "step1") {
      step1Controls
        .start({
          rotate: 20,
          transition: { duration: 0.6, ease: "easeInOut" },
        })
        .then(() => {
          setCurrentStep("crack1");
        });
    }

    if (currentStep === "crack1") {
      crack1Controls
        .start({
          rotate: -20,
          transition: { duration: 0.6, ease: "easeInOut" },
        })
        .then(() => {
          setCurrentStep("final");
        });
    }
  }, [currentStep, step1Controls, crack1Controls]);

  return (
    <div className="relative h-full w-full grid place-content-center m-96">
      {currentStep === "step1" && (
        <motion.img
          src="./images/animations/results/step-1.png"
          alt="egg-upperpart"
          className="absolute object-contain"
          initial={{ rotate: 0 }}
          animate={step1Controls}
        />
      )}

      {currentStep === "crack1" && (
        <motion.img
          src="./images/animations/results/crack-1.png"
          alt="egg-crack-1"
          className="absolute object-contain"
          initial={{ rotate: 20 }} // carry over from previous
          animate={crack1Controls}
        />
      )}

      {currentStep === "final" && (
        <img
          src="./images/animations/results/crack-1.png"
          alt="egg-crack-2"
          className="absolute object-contain"
        />
      )}
    </div>
  );
};

export default RewardReveal;
