import { useContext } from "react";
import { CottonCandyContext } from "../../providers/ContextProvider";

const WARRIOR_CLASSES = [
  { name: "Knight", bgClass: "bg-sidebar-warrior-class" },
  { name: "Archer", bgClass: "bg-sidebar-archer-class" },
  { name: "Raider", bgClass: "bg-sidebar-raider-class" },
];

const WarriorClassFilter = () => {
  const { selectedOptions, setSelectedOptions } =
    useContext(CottonCandyContext);

  const toggleClass = (className: string) => {
    setSelectedOptions((prev) => {
      const newSet = new Set(prev.class || []);
      if (newSet.has(className)) newSet.delete(className);
      else newSet.add(className);

      return { ...prev, class: newSet };
    });
  };

  const isSelected = (className: string) =>
    selectedOptions.class?.has(className);

  return (
    <div className="flex flex-col gap-1 w-full justify-start items-start mt-2">
      <p className="text-black font-patrick-hand-sc lg:text-3xl md:xl: sm:lg">
        Warrior Class:
      </p>

      <div className="flex flex-row w-full justify-between items-center gap-6">
        {WARRIOR_CLASSES.map(({ name, bgClass }) => {
          const selected = isSelected(name);
          return (
            <button
              key={name}
              onClick={() => toggleClass(name)}
              className={`flex-1 px-1 py-3 flex flex-col justify-center items-center rounded-sm border border-[#6D5A40] transition-all duration-200
                ${
                  selected
                    ? "bg-[#C3B29A] scale-105"
                    : "hover:bg-[#C3B29A] bg-transparent"
                }`}
            >
              <p className="font-patrick-hand-sc text-black text-2xl uppercase">
                {name}
              </p>
              <div
                className={`bg-contain bg-no-repeat size-16 ${bgClass}`}
              ></div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WarriorClassFilter;
