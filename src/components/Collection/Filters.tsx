import React, { useState } from "react";

type FilterOption = {
  label: string;
  count: number;
};

type FilterSection = {
  id: string;
  name: string;
  icon: React.ReactNode;
  options: FilterOption[];
};

type FiltersProps = {
  filters: FilterSection[];
};

const Filters = ({ filters }: FiltersProps) => {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, Set<string>>
  >({});

  const toggleSection = (id: string) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleOption = (sectionId: string, optionLabel: string) => {
    setSelectedOptions((prev) => {
      const sectionSelections = new Set(prev[sectionId] || []);
      sectionSelections.has(optionLabel)
        ? sectionSelections.delete(optionLabel)
        : sectionSelections.add(optionLabel);
      return { ...prev, [sectionId]: sectionSelections };
    });
  };

  const getSelectedCount = (sectionId: string) =>
    selectedOptions[sectionId]?.size || 0;

  return (
    <div className="w-full overflow-hidden ">
      {filters.map((section: any) => {
        const isOpen = openSections.includes(section.id);
        const selectedCount = getSelectedCount(section.id);

        return (
          <div
            key={section.id}
            className="border-b border-[#d8c7a7] divide-y-2 divide-[#6D5A41]"
          >
            {/* Header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex justify-between items-center px-4 py-3 text-left font-semibold text-[#3a2f1b]"
            >
              <div className="flex items-center gap-2">
                {section.icon}
                <span>{section.name}</span>
                {selectedCount > 0 && (
                  <span className="ml-2 bg-green-600 text-white text-xs rounded-full px-2 py-0.5">
                    {selectedCount}
                  </span>
                )}
              </div>
              {isOpen ? "-" : "+"}
            </button>

            {/* Options */}
            {isOpen && (
              <div className="max-h-52 overflow-auto divide-y-2 divide-[#6D5A41] bg-[#D9CBB7]">
                {section.options.map((opt: any) => {
                  const isChecked = selectedOptions[section.id]?.has(opt.label);
                  return (
                    <label
                      key={opt.label}
                      className="flex justify-start items-center cursor-pointer text-sm px-4"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={!!isChecked}
                          onChange={() => toggleOption(section.id, opt.label)}
                          className="accent-[#5DA849]"
                        />
                        <span className="text-black font-medium text-xl font-patrick-hand-sc">
                          {opt.label}
                        </span>
                      </div>
                      <span className="text-gray-500 text-sm font-patrick-hand-sc">
                        ({opt.count})
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Filters;
