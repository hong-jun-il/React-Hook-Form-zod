"use client";

import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { date } from "zod";

type Props<T extends FieldValues> = {
  name: Path<T>;
  placeholder: string;
  id?: string;
};

export default function RHFCalendar<T extends FieldValues>({
  name,
  placeholder,
  id,
}: Props<T>) {
  const [open, setOpen] = useState<boolean>(false);

  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id={id}
              className="justify-start font-normal"
            >
              {field.value ? (
                format(field.value, "PPP", { locale: ko })
              ) : (
                <span className="text-gray-500">{placeholder}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value}
              captionLayout="dropdown"
              onSelect={(date) => {
                if (date) {
                  const formattedDate = format(date, "yyyy-MM-dd");

                  if (formattedDate) field.onChange(formattedDate);
                }
                setOpen(false);
              }}
              disabled={(date) => date > new Date()}
              defaultMonth={field.value}
            />
          </PopoverContent>
        </Popover>
      )}
    />
  );
}
