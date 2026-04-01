"use client";

import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import {
  NativeSelect,
  NativeSelectOption,
  NativeSelectProps,
} from "../ui/native-select";
import { ChangeEvent } from "react";

export type OptionType = {
  label: string;
  value: string | number;
};

type Props<T extends FieldValues> = {
  name: Path<T>;
  options: OptionType[];
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
} & NativeSelectProps;

export default function RHFSelect<T extends FieldValues>({
  name,
  options,
  onChange,
  placeholder,
  ...props
}: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <NativeSelect
          {...field}
          {...props}
          onChange={(e) => {
            field.onChange(e);

            onChange?.(e);
          }}
        >
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
