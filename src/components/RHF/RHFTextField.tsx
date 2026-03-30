"use client";

import { ComponentProps } from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";

type Props<T extends FieldValues> = {
  name: Path<T>;
  transform?: (value: string) => string;
} & ComponentProps<"input">;

export default function RHFTextField<T extends FieldValues>({
  id,
  name,
  transform,
  ...props
}: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          id={id}
          {...field}
          {...props}
          onChange={(e) => {
            const value = transform
              ? transform(e.target.value)
              : e.target.value;

            field.onChange(value);
          }}
        />
      )}
    />
  );
}
