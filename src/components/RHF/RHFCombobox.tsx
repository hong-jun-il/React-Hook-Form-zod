"use client";

import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

type Props<T extends FieldValues> = {
  name: Path<T>;
  items: (string | number)[];
  empty?: string;
  placeholder?: string;
};

export default function RHFCombobox<T extends FieldValues>({
  name,
  items,
  empty = "No items found.",
  placeholder,
}: Props<T>) {
  const { control } = useFormContext<T>();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Combobox
          items={items}
          value={field.value}
          onValueChange={field.onChange}
        >
          <ComboboxInput
            placeholder={placeholder}
            onChange={(e) => field.onChange(e.target.value)}
          />
          <ComboboxContent>
            <ComboboxEmpty>{empty}</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      )}
    />
  );
}
