"use client";

import clsx from "clsx";
import { ChangeEvent, ComponentProps, forwardRef } from "react";

type Props = ComponentProps<"input">;

const Input = forwardRef<HTMLInputElement, Props>(
  ({ type = "text", onChange, id, name, className }, ref) => {
    const isNumber = type === "number";

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (isNumber) {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
      }

      onChange?.(e);
    };

    return (
      <input
        type={type === "number" ? "text" : type}
        inputMode={isNumber ? "numeric" : undefined}
        pattern={isNumber ? "[0-9]*" : undefined}
        ref={ref}
        onChange={handleChange}
        id={id}
        name={name}
        className={clsx("border rounded-md px-2", className)}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
