"use client";

import RHFCombobox from "@/components/RHF/RHFCombobox";
import RHFTextField from "@/components/RHF/RHFTextField";
import { Field, FieldLabel } from "@/components/ui/field";
import { EMAIL_DOMAIN_LIST } from "@/constants/emails.const";
import { cn } from "@/lib/utils";
import { MemberInput } from "@/types/info.schema";
import { useFormContext, useFormState } from "react-hook-form";

export function EmailField() {
  const { control } = useFormContext<MemberInput>();
  const { errors } = useFormState({
    control,
    name: ["email"],
  });

  const errorMessage = errors.email?.message;

  return (
    <Field>
      <FieldLabel htmlFor="emailId">이메일</FieldLabel>
      <div className={cn("flex items-center gap-2")}>
        <RHFTextField<MemberInput> id="emailId" name="email.id" />
        <span>@</span>
        <RHFCombobox<MemberInput>
          name="email.domain"
          items={EMAIL_DOMAIN_LIST}
          placeholder="직접 입력"
        />
      </div>
      {errorMessage && (
        <p className="text-destructive mt-1 text-sm">{errorMessage}</p>
      )}
    </Field>
  );
}
