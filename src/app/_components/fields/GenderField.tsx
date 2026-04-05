"use client";

import { OptionType } from "@/components/RHF/RHFSelect";
import { MemberInput } from "@/types/info.schema";
import { useFormContext, useFormState } from "react-hook-form";
import { Field, FieldLabel } from "@/components/ui/field";
import RHFRadioGroup from "@/components/RHF/RHFRadioGroup";

export function GenderField() {
  const { control } = useFormContext<MemberInput>();
  const { errors } = useFormState({ control, name: ["gender"] });
  const errorMessage = errors.gender?.message;

  const genderOptions: OptionType[] = [
    { value: "MAN", label: "남성" },
    { value: "WOMAN", label: "여성" },
  ];

  return (
    <Field>
      <FieldLabel>성별</FieldLabel>
      <RHFRadioGroup<MemberInput> name="gender" options={genderOptions} />
      {errorMessage && (
        <p className="text-destructive mt-1 text-sm">{errorMessage}</p>
      )}
    </Field>
  );
}
