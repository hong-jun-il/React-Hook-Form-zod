"use client";

import RHFTextField from "@/components/RHF/RHFTextField";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { MemberInput } from "@/types/info.schema";
import { useFormContext, useFormState } from "react-hook-form";

export function LoginField() {
  const { control } = useFormContext<MemberInput>();
  const { errors } = useFormState({ control, name: ["loginId"] });
  const errorMessage = errors.loginId?.message;

  return (
    <Field>
      <FieldLabel htmlFor="loginId">아이디</FieldLabel>
      <RHFTextField<MemberInput> id="loginId" name="loginId" />
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
    </Field>
  );
}
