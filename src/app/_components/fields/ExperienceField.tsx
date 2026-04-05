"use client";

import RHFRadioGroup from "@/components/RHF/RHFRadioGroup";
import { OptionType } from "@/components/RHF/RHFSelect";
import { Field, FieldLabel } from "@/components/ui/field";
import { MemberInput } from "@/types/info.schema";
import { useFormContext, useFormState } from "react-hook-form";

export default function ExperienceField() {
  const { control } = useFormContext<MemberInput>();
  const { errors } = useFormState({ control, name: ["status"] });
  const errorMessage = errors.status?.message;

  const experienceOptions: OptionType[] = [
    {
      label: "신입",
      value: "NEW",
    },
    {
      label: "경력",
      value: "EXP",
    },
  ];

  return (
    <Field className="space-y-2">
      <FieldLabel>경력 여부</FieldLabel>
      <RHFRadioGroup<MemberInput> name="status" options={experienceOptions} />
      {errorMessage && (
        <p className="text-destructive mt-1 text-sm">{errorMessage}</p>
      )}
    </Field>
  );
}
