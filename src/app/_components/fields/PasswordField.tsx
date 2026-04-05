"use client";

import RHFTextField from "@/components/RHF/RHFTextField";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { MemberInput } from "@/types/info.schema";
import { useFormContext, useFormState } from "react-hook-form";

function PasswordField() {
  const { control } = useFormContext<MemberInput>();

  const { errors } = useFormState({
    control,
    name: "password",
  });

  const errorMessage = (errors as any)["password"]?.message;

  return (
    <Field>
      <FieldLabel htmlFor="password">비밀번호</FieldLabel>
      <RHFTextField<MemberInput> name="password" id="password" />
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
    </Field>
  );
}

function PasswordConfirmField() {
  const { control } = useFormContext<MemberInput>();

  const { errors } = useFormState({
    control,
    name: "confirmPassword",
  });

  const errorMessage = (errors as any)["confirmPassword"]?.message;

  return (
    <Field>
      <FieldLabel htmlFor="confirmPassword">비밀번호 확인</FieldLabel>
      <RHFTextField<MemberInput> name="confirmPassword" id="confirmPassword" />
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
    </Field>
  );
}

export default () => (
  <>
    <PasswordField />
    <PasswordConfirmField />
  </>
);
