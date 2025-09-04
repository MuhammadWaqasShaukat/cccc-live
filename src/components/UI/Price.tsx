import { useContext } from "react";
import { CottonCandyContext } from "../../providers/ContextProvider";
const Price: React.FC<{ price: number }> = ({ price }) => {
  const ctx = useContext(CottonCandyContext);
  return (
    <div className="flex-1 flex flex-col justify-start items-start relative before:content-[''] before:w-[6px] before:h-full before:rounded-[2px] before:bg-[#D18A27] before:absolute before:left-0 ">
      <h4 className="ml-4 text-base md:text-lg lg:text-xl xl:text-2xl font-patrick-hand-sc ">
        Price
      </h4>
      <div className="ml-4 font-heavitas">
        <span className="text-lg md:text-xl lg:text-2xl xl:text-3xl  text-[#292726] ">
          {ctx.estimate?.toFixed(3) ?? price.toFixed(3)}&nbsp;
          <span className="text-base lg:text-xl md:text-lg xl:text-2xl  text-[#29272699] ">
            SOL
          </span>
        </span>
      </div>
    </div>
  );
};

export default Price;
