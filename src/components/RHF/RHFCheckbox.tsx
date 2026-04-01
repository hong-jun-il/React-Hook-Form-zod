"use client";

import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";

type Props<T extends FieldValues> = {
  name: Path<T>;
  id?: string;
  label?: string;
};

export default function RHFCheckbox<T extends FieldValues>({
  name,
  id,
}: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <Checkbox id={id} {...field} />}
    />
  );
}
