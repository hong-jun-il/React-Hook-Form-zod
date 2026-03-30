"use client";

import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { OptionType } from "./RHFSelect";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options: OptionType[];
};

export default function RHFRadioGroup<T extends FieldValues>({
  name,
  options,
}: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <RadioGroup
          className="flex gap-3"
          name={field.name}
          value={field.value}
          onValueChange={field.onChange}
          aria-invalid={fieldState.invalid}
        >
          {options.map((option) => (
            <div key={String(option.value)} className="flex items-center gap-3">
              <RadioGroupItem
                value={String(option.value)}
                id={String(option.value)}
                aria-invalid={fieldState.invalid}
              />
              <Label htmlFor={String(option.value)}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      )}
    />
  );
}
