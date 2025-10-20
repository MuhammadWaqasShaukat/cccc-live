import { useContext } from "react";
import { RemoveAllFilters } from "./RemoveAllFilters";
import FilterPills from "./FilterPills";
import RemoveFilter from "./RemoveFilter";
import { CottonCandyContext } from "../../providers/ContextProvider";
import { Filters } from "../../types/Filters";

const AppliedFilters = () => {
  const { selectedOptions, setSelectedOptions } =
    useContext(CottonCandyContext);

  // 🧮 Count total number of selected filter values
  const totalFilters = Object.values(selectedOptions).reduce(
    (acc, set) => acc + set.size,
    0
  );

  const handleRemove = (filter: string, value: string) => {
    setSelectedOptions((prev) => {
      const newSet = new Set(prev[filter]);
      newSet.delete(value);
      return newSet.size
        ? { ...prev, [filter]: newSet }
        : Object.fromEntries(
            Object.entries(prev).filter(([k]) => k !== filter)
          );
    });
  };

  return (
    <div className=" flex flex-row justify-start items-center gap-1 flex-wrap">
      {totalFilters >= 2 && <RemoveAllFilters />}

      {Object.entries(selectedOptions).flatMap(([filter, values]) =>
        Array.from(values).map((value) => (
          <FilterPills
            key={`${filter}-${value}`}
            filter={filter as Filters}
            filterValue={value}
          >
            <RemoveFilter onClick={() => handleRemove(filter, value)} />
          </FilterPills>
        ))
      )}
    </div>
  );
};

export default AppliedFilters;
