"use client";

import RHFCheckbox from "@/components/RHF/RHFCheckbox";
import { Field, FieldLabel } from "@/components/ui/field";
import { MemberInput } from "@/types/info.schema";
import { useFormContext, useFormState } from "react-hook-form";

export default function AgreeField() {
  const { control } = useFormContext<MemberInput>();
  const { errors } = useFormState({ control, name: ["isAgreed"] });
  const errorMessage = errors.isAgreed?.message;

  return (
    <Field orientation="horizontal">
      <FieldLabel htmlFor="isAgreed">조건 동의 여부</FieldLabel>
      <RHFCheckbox<MemberInput> id="isAgreed" name="isAgreed" />
      {errorMessage && (
        <p className="text-destructive mt-1 text-sm">{errorMessage}</p>
      )}
    </Field>
  );
}
