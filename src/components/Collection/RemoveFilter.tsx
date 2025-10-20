import React, { HTMLAttributes } from "react";

const RemoveFilter: React.FC<HTMLAttributes<HTMLButtonElement>> = ({
  onClick,
}) => {
  return (
    <button
      className="text-[#8F8473] bg-remove-filter bg-contain bg-no-repeat size-4"
      onClick={onClick}
    ></button>
  );
};

export default RemoveFilter;
