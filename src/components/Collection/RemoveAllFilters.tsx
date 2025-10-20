import { useContext } from "react";
import { CottonCandyContext } from "../../providers/ContextProvider";

export const RemoveAllFilters = () => {
  const { setSelectedOptions } = useContext(CottonCandyContext);

  const handleRemoveAllFilters = () => {
    setSelectedOptions({});
  };

  return (
    <div
      className={`flex flex-row justify-between items-center w-max rounded-full px-4 py-1 bg-[#7F7260]`}
    >
      <p className=" pr-4 uppercase font-patrick-hand-sc text-[#F4E1C5] ">
        Remove All Filters
      </p>
      <button
        onClick={handleRemoveAllFilters}
        className="size-4 bg-[#F4E1C5] rounded-full grid place-content-center"
      >
        <div className=" w-2 h-0.5 rounded-full bg-[#7F7260]"></div>
      </button>
    </div>
  );
};
