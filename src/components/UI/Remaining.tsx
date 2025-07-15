// import { useContext } from "react";
// import { CottonCandyContext } from "../../providers/ContextProvider";
const Remaining = () => {
  // const ctx = useContext(CottonCandyContext);
  return (
    <div className="flex-1 flex flex-col justify-start items-start relative before:content-[''] before:w-[6px] before:h-full before:rounded-[2px] before:bg-[#D18A27] before:absolute before:left-0 ">
      <h4 className="font-patrick-hand-sc text-2xl uppercase ml-4">
        Remaining
      </h4>
      <div className="font-heavitas  ml-4">
        <span className="text-[28px] text-[#292726]">
          7,432
          <span className="text-[20px] text-base text-[#29272699]">
            /10,000
          </span>
        </span>
      </div>
    </div>
  );
};

export default Remaining;
