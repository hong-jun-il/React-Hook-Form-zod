"use client";

import { ComponentProps, forwardRef } from "react";
import clsx from "clsx";

export type OptionType = {
  label: string;
  value: string | number;
};

type Props = ComponentProps<"select"> & { options: OptionType[] };

const Select = forwardRef<HTMLSelectElement, Props>(
  ({ name, id, options, className, ...props }, ref) => {
    return (
      <select
        ref={ref}
        name={name}
        id={id}
        className={clsx("border rounded-md px-2", className)}
        {...props}
      >
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    );
  },
);

Select.displayName = "Select";

export default Select;
