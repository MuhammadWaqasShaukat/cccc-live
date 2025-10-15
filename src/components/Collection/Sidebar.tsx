import Filters from "./Filters";
import { FILTERS } from "../../constants/filters";

const Sidebar = () => {
  return (
    <div className="flex flex-col justify-start items-center w-1/5 p-4 bg-[#F4E1C5]">
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

      <div className=" w-full flex flex-row justify-start items-center gap-2 bg-[#D9CBB7] p-2  border border-[#8B806F]">
        <div className=" bg-sidebar-search-icon bg-contain bg-no-repeat size-6 aspect-square "></div>
        <input
          type="search"
          placeholder="sort by serial"
          className=" bg-transparent text-xl text-[#8B806F] placeholder:uppercase placeholder:text-[#8B806F]  flex-1"
        />
      </div>

      <div className=" flex flex-col gap-1 w-full justify-start items-start">
        <p className="text-black  font-patrick-hand-sc text-3xl">
          warrior class:
        </p>
        <div className=" flex flex-row w-full justify-between items-center gap-4">
          <div className=" flex-1 px-1 py-3 flex-col flex justify-center items-center rounded-sm hover:bg-[#C3B29A] border border-[#6D5A40]">
            <p className=" font-patrick-hand-sc text-black text-2xl uppercase">
              Knight
            </p>
            <div className="bg-contain bg-no-repeat size-16 bg-sidebar-warrior-class"></div>
          </div>
          <div className=" flex-1 px-1 py-3 flex-col flex justify-center items-center rounded-sm hover:bg-[#C3B29A] border border-[#6D5A40]">
            <p className=" font-patrick-hand-sc text-black text-2xl uppercase">
              Archer
            </p>
            <div className="bg-contain bg-no-repeat size-16 bg-sidebar-archer-class"></div>
          </div>
          <div className=" flex-1 px-1 py-3 flex-col flex justify-center items-center rounded-sm hover:bg-[#C3B29A] border border-[#6D5A40]">
            <p className=" font-patrick-hand-sc text-black text-2xl uppercase">
              Raider
            </p>
            <div className="bg-contain bg-no-repeat size-16 bg-sidebar-raider-class"></div>
          </div>
        </div>
      </div>

      <Filters filters={FILTERS} />
    </div>
  );
};

export default Sidebar;
