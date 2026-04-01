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
import { OptionType } from "./RHFSelect";
import { cn } from "@/lib/utils";

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const;

type Props<T extends FieldValues> = {
  name: Path<T>;
  items: OptionType[];
  id?: string;
  empty?: string;
  placeholder?: string;
  disabled?: boolean;
};

export function RHFComboboxMultiple<T extends FieldValues>({
  name,
  items,
  id,
  empty = "No items found.",
  placeholder,
  disabled,
}: Props<T>) {
  const { control } = useFormContext<T>();
  const anchor = useComboboxAnchor();

  const idMap = items.reduce((acc, cur) => {
    acc.set(cur.value, cur.label);

    return acc;
  }, new Map());

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Combobox
          id={id}
          multiple
          autoHighlight
          items={items}
          value={field.value}
          onValueChange={field.onChange}
          disabled={disabled}
        >
          <ComboboxChips
            ref={anchor}
            className={cn("w-full max-w-xs", disabled && "")}
          >
            <ComboboxValue>
              {(values) => (
                <Fragment>
                  {values.map((value: string) => (
                    <ComboboxChip key={value}>{idMap.get(value)}</ComboboxChip>
                  ))}
                  <ComboboxChipsInput placeholder={placeholder} />
                </Fragment>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxContent anchor={anchor}>
            <ComboboxEmpty>{empty}</ComboboxEmpty>
            <ComboboxList>
              {(item: OptionType) => (
                <ComboboxItem key={item.value} value={item.value}>
                  {item.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      )}
    />
  );
}
