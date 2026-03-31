import { OptionType } from "@/components/RHF/RHFSelect";

export const POSITIONS_OPTIONS: OptionType[] = [
  { label: "프론트엔드", value: "FE" },
  { label: "백엔드", value: "BE" },
  { label: "디자인", value: "DE" },
  { label: "기획", value: "PM" },
];

export const POSITION_VALUES = POSITIONS_OPTIONS.map(
  (position) => position.value as string,
);
