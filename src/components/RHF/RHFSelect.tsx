"use client";

import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import {
  NativeSelect,
  NativeSelectOption,
  NativeSelectProps,
} from "../ui/native-select";

export type OptionType = {
  label: string;
  value: string | number;
};

type Props<T extends FieldValues> = {
  name: Path<T>;
  options: OptionType[];
  placeholder?: string;
} & NativeSelectProps;

export default function RHFSelect<T extends FieldValues>({
  id,
  name,
  options,
  placeholder,
  ...props
}: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <NativeSelect {...field} {...props}>
          {placeholder && (
            <NativeSelectOption value="" disabled hidden>
              {placeholder}
            </NativeSelectOption>
          )}
          {options.map((option) => (
            <NativeSelectOption key={option.value} value={option.value}>
              {option.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      )}
    />
  );
}
