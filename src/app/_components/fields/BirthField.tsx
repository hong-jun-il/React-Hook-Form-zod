"use client";

import RHFSelect, { OptionType } from "@/components/RHF/RHFSelect";
import { MemberInput } from "@/types/info.schema";
import { useFormContext, useFormState, useWatch } from "react-hook-form";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { MONTH_OPTIONS, YEAR_OPTIONS } from "@/constants/day.const";

export function BirthField() {
  const { control } = useFormContext<MemberInput>();
  const { errors } = useFormState({ control, name: ["birth"] });
  const errorMessage =
    errors.birth?.year?.message ||
    errors.birth?.month?.message ||
    errors.birth?.day?.message;

  const yearValue = useWatch({
    control,
    name: "birth.year",
  });
  const monthValue = useWatch({
    control,
    name: "birth.month",
  });

  const dayOptions: OptionType[] = Array.from(
    {
      length: new Date(Number(yearValue), Number(monthValue), 0).getDate(),
    },
    (_, i) => {
      const day = String(i + 1);
      return {
        label: day.padStart(2, "0"),
        value: day.padStart(2, "0"),
      };
    },
  );

  return (
    <Field>
      <Label htmlFor="birth.year">생년월일</Label>
      <div className={cn("flex items-center gap-2")}>
        <RHFSelect<MemberInput>
          id="birth.year"
          name="birth.year"
          options={YEAR_OPTIONS}
          placeholder="연도"
        />
        <RHFSelect<MemberInput>
          id="birth.month"
          name="birth.month"
          options={MONTH_OPTIONS}
          placeholder="월"
        />
        <RHFSelect<MemberInput>
          id="birth.day"
          name="birth.day"
          options={dayOptions}
          placeholder="일"
        />
      </div>
      {errorMessage && (
        <p className="text-destructive mt-1 text-sm">{errorMessage}</p>
      )}
    </Field>
  );
}
