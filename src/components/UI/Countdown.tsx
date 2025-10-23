import { useContext } from "react";
import { CottonCandyContext } from "../../providers/ContextProvider";

const DatePart = ({
  label,
  value,
}: {
  label: "days" | "hours" | "min" | "sec";
  value: number;
}) => {
  const { lotteryPhase } = useContext(CottonCandyContext);

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <span className=" text-xl md:text-3xl font-patrick-hand-sc font-bold aspect-square bg-white rounded  grid place-content-center">
        {String(Math.floor(value)).padStart(2, "0")}
      </span>
      <span
        className={`text-sm uppercase font-patrick-hand-sc ${
          lotteryPhase === "minting-start" ? "text-white" : "text-black"
        }`}
      >
        {label}
      </span>
    </div>
  );
};

const Countdown = () => {
  const ctx = useContext(CottonCandyContext);

  const dateparts = ctx.timeRemaining;

  return (
    <div className="grid grid-cols-4 gap-1 md:gap-2.5 text-center">
      <DatePart label="days" value={dateparts.days} />
      <DatePart label="hours" value={dateparts.hours} />
      <DatePart label="min" value={dateparts.minutes} />
      <DatePart label="sec" value={dateparts.seconds} />
    </div>
  );
};

export default Countdown;
