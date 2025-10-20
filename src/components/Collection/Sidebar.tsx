import Filters from "./Filters";
import { FILTERS } from "../../constants/filters";
import Search from "./Search";
import WarriorClass from "./WarriorClass";

const Sidebar = () => {
  return (
    <div className="flex flex-col justify-start items-center w-1/5 p-4 bg-[#F4E1C5] border-r-4 border-[#B39776]">
      <div className="">
        <img src="/images/section-hero/logo-lg.webp" className="" />
      </div>

      <div className=" w-full flex flex-row justify-center items-center relative">
        <div className="absolute  left-0  right-0  w-full bg-sidebar-filter h-10 bg-no-repeat  bg-cover"></div>
        <div className=" flex flex-row justify-center items-center z-40 gap-1">
          <div className="size-12 bg-sidebar-filter-icon -rotate-12 bg-no-repeat bg-contain"></div>
          <span className=" text-white font-patrick-hand-sc text-4xl">
            Filter
          </span>
        </div>
      </div>

      <Search />

      <WarriorClass />

      <div className="h-[1px] w-full bg-[#A89272] opacity-60 mt-4" />

      <Filters filters={FILTERS} />
    </div>
  );
};

export default Sidebar;
