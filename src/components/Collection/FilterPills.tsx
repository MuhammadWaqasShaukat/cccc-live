import { Filters } from "../../types/Filters";

interface Chip extends React.HTMLAttributes<HTMLDivElement> {
  filter: Filters;
  filterValue: string;
}

const FilterPills: React.FC<Chip> = ({
  filter,
  filterValue,
  className,
  children,
}) => {
  return (
    <div
      className={` ${className} flex flex-row justify-between items-center w-max rounded-full pl-3 pr-2.5 py-1 bg-[#F4E1C5]`}
    >
      <p className=" pr-4 uppercase font-patrick-hand-sc text-[#8F8473] ">
        {filter}: {filterValue}
      </p>
      {children}
    </div>
  );
};

export default FilterPills;
