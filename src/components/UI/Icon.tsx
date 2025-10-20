import { ICONS } from "../../constants/filters";
import { Filters } from "../../types/Filters";

type IconProps = {
  name: Filters;
  size?: number;
  className?: string;
};

export default function Icon({ name, size = 32, className }: IconProps) {
  const IconSrc = ICONS[name];

  return (
    <img
      src={IconSrc}
      alt={`${name} icon`}
      width={size}
      height={size}
      className={className}
    />
  );
}
