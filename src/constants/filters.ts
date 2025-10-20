import { Filters } from "../types/Filters";

export const ICONS: Record<Filters, string> = {
  background: "/images/collection/bg-icon.png",
  transport: "/images/collection/transport-icon.png",
  shield: "/images/collection/shield-icon.png",
  armor: "/images/collection/armor-icon.png",
  type: "/images/collection/type-icon.png",
  dildopon: "/images/collection/dildopon-icon.png",
};

export const FILTERS = [
  {
    id: "type",
    name: "TYPE",
    icon: "",
    options: [
      { label: "PEPE", count: 233 },
      { label: "CHILL GUY", count: 133 },
      { label: "POP CAT", count: 143 },
      { label: "PONKE", count: 1143 },
      { label: "TURBO", count: 343 },
      { label: "FWOG", count: 343 },
      { label: "FLOKI", count: 343 },
      { label: "DOGWIFHAT", count: 343 },
      { label: "DOGE", count: 343 },
    ],
  },
  {
    id: "armor",
    name: "ARMOR",
    icon: "",
    options: [
      { label: "IRON", count: 120 },
      { label: "STEEL", count: 90 },
      { label: "GOLD", count: 45 },
    ],
  },
  {
    id: "dildopon",
    name: "DILDOPON",
    icon: "",
    options: [
      { label: "IRON", count: 120 },
      { label: "STEEL", count: 90 },
      { label: "GOLD", count: 45 },
    ],
  },
  {
    id: "shield",
    name: "SHIELD",
    icon: "",
    options: [
      { label: "IRON", count: 120 },
      { label: "STEEL", count: 90 },
      { label: "GOLD", count: 45 },
    ],
  },
  {
    id: "transport",
    name: "TRANSPORT",
    icon: "",
    options: [
      { label: "IRON", count: 120 },
      { label: "STEEL", count: 90 },
      { label: "GOLD", count: 45 },
    ],
  },
  {
    id: "background",
    name: "BACKGROUND",
    icon: "",
    options: [
      { label: "IRON", count: 120 },
      { label: "STEEL", count: 90 },
      { label: "GOLD", count: 45 },
    ],
  },
];
