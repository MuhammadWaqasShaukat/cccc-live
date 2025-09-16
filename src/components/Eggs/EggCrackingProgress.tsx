import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";

const EggCrackingProgress = ({ crackpoints }: { crackpoints: number }) => {
  return (
    <CircularProgressbarWithChildren
      text={`${crackpoints}/10k`}
      value={crackpoints}
      styles={buildStyles({
        rotation: 0,
        strokeLinecap: "round",
        textSize: "22px",
        pathTransitionDuration: 0.5,
        pathColor: "#A6FF00",
        textColor: "#fff",
        trailColor: "rgba(166, 255, 0, 0.2)",
      })}
    >
      {/* <span className="text-xl text-white font-patrick-hand text-outline-1">
        {crackpoints}/10k
      </span> */}
    </CircularProgressbarWithChildren>
  );
};

export default EggCrackingProgress;
