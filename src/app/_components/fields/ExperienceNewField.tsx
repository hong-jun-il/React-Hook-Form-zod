"use client";

import RHFCalendar from "@/components/RHF/RHFCalendar";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { MemberInput } from "@/types/info.schema";
import { useFormContext, useFormState } from "react-hook-form";

export default function ExperienceNewField() {
  const { control } = useFormContext<MemberInput>();
  const { errors } = useFormState({
    control,
    name: "graduationDate",
  });

  const erorrMessage = (errors as any)?.["graduationDate"]?.message;

  return (
    <Field>
      <FieldLabel htmlFor="graduationDate">신입</FieldLabel>
      <RHFCalendar<MemberInput>
        name="graduationDate"
        id="graduationDate"
        placeholder="졸업 날짜를 선택해주세요."
      />
      {erorrMessage && <FieldError>{erorrMessage}</FieldError>}
    </Field>
  );
}
