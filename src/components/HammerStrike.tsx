import { useState } from "react";
import { motion } from "framer-motion";

export default function HammerStrike() {
    const [isStriking, setIsStriking] = useState(false);

    const normalSrc = "/images/hammer-1.png";
    const strikeSrc = "/images/hammer-2.png";

    const handleClick = () => {
        if (isStriking) return;
        setIsStriking(true);

        setTimeout(() => {
            setIsStriking(false);
        }, 200); // match animation duration
    };

    return (
        <motion.img
            src={isStriking ? strikeSrc : normalSrc}
            onClick={handleClick}
            animate={isStriking
                ? { rotate: -45, opacity: 0.2, scale: 0.72 }
                : { rotate: 0, opacity: 1, scale: 0.7 }}
            transition={{
                duration: 0.2,
                ease: [0.42, 0, 0.58, 1], // matches cubic-bezier(0.42, 0, 0.58, 1)
            }}
            initial={false}
            style={{
                transformOrigin: "top center",
                width: "150px",
                height: "auto",
                cursor: "pointer",
            }}
        />
    );
}
