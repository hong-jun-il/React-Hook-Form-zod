import { OptionType } from "@/components/RHF/RHFSelect";

const now = new Date();

export const CURRENT_YEAR = now.getFullYear();
export const START_YEAR = CURRENT_YEAR - 130;

export const YEAR_OPTIONS: OptionType[] = Array.from(
  { length: CURRENT_YEAR - START_YEAR + 1 },
  (_, i) => {
    const year = String(START_YEAR + i);
    return {
      label: year,
      value: year,
    };
  },
);

export const MONTH_OPTIONS: OptionType[] = Array.from(
  { length: 12 },
  (_, i) => {
    return {
      label: `${i + 1}`.padStart(2, "0"),
      value: `${i + 1}`.padStart(2, "0"),
    };
  },
);
