"use client";

import RHFTextField from "@/components/RHF/RHFTextField";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { MemberInput } from "@/types/info.schema";
import { useFormContext, useFormState } from "react-hook-form";

export function LoginField() {
  const { control } = useFormContext<MemberInput>();
  const { errors } = useFormState({ control, name: ["loginId"] });
  const errorMessage = errors.loginId?.message;

  return (
    <Field>
      <Label htmlFor="loginId">아이디</Label>
      <RHFTextField<MemberInput> id="loginId" name="loginId" />
      {errorMessage && (
        <p className="text-destructive mt-1 text-sm">{errorMessage}</p>
      )}
    </Field>
  );
}
