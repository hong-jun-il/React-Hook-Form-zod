"use client";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const;

type Props<T extends FieldValues> = {
  name: Path<T>;
  items: (string | number)[];
  empty?: string;
  placeholder?: string;
};

export function RHFComboboxMultiple<T extends FieldValues>({
  name,
  items,
  empty = "No items found.",
  placeholder,
}: Props<T>) {
  const { control } = useFormContext<T>();
  const anchor = useComboboxAnchor();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Combobox
          multiple
          autoHighlight
          items={items}
          value={field.value}
          onValueChange={field.onChange}
        >
          <ComboboxChips ref={anchor} className="w-full max-w-xs">
            <ComboboxValue>
              {(values) => (
                <Fragment>
                  {values.map((value: string) => (
                    <ComboboxChip key={value}>{value}</ComboboxChip>
                  ))}
                  <ComboboxChipsInput />
                </Fragment>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxContent anchor={anchor}>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
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
