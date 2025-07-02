import { useContext } from "react";
import { CottonCandyContext } from "../../providers/ContextProvider";
const Price = () => {
  const ctx = useContext(CottonCandyContext);
  return (
    <div className=" flex flex-col justify-start items-start relative before:content-[''] before:w-[6px] before:h-full before:rounded-[2px] before:bg-[#D18A27] before:absolute before:left-0 ">
      <h4 className="font-patrick-hand-sc text-[32px]  ml-4">Price</h4>
      <span className="font-patrick-hand-sc md:text-[48px] text-[36px]  leading-9 ml-4">
        {ctx.price} SOL
      </span>
      <span className="font-patrick-hand-sc md:text-[20px] text-base  ml-4">
        {/* ~${(ctx.count * ctx.price).toFixed(4)} ETH */}
      </span>
    </div>
  );
};

export default Price;
