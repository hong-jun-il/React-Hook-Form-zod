"use client";

import { MemberInput } from "@/types/info.schema";
import { useFormContext, useFormState } from "react-hook-form";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import RHFSelect from "@/components/RHF/RHFSelect";
import { PHONE_PREFIX_OPTIONS } from "@/constants/phone.const";
import { cn } from "@/lib/utils";
import RHFTextField from "@/components/RHF/RHFTextField";

export function PhoneField() {
  const { control } = useFormContext<MemberInput>();
  const { errors } = useFormState({ control, name: ["phone"] });
  const errorMessage =
    errors.phone?.prefix?.message || errors.phone?.number?.message;

  const preventString = (value: string) => {
    return value.replace(/[^0-9]/g, "");
  };

  return (
    <Field>
      <Label htmlFor="phone.number">핸드폰</Label>
      <div className={cn("flex items-center gap-2")}>
        <RHFSelect<MemberInput>
          id="phone.prefix"
          name="phone.prefix"
          options={PHONE_PREFIX_OPTIONS}
        />
        <RHFTextField<MemberInput>
          id="phone.number"
          name="phone.number"
          placeholder="-없이 숫자만 입력"
          maxLength={8}
          inputMode="numeric"
          transform={preventString}
        />
      </div>
      {errorMessage && (
        <p className="text-destructive mt-1 text-sm">{errorMessage}</p>
      )}
    </Field>
  );
}
