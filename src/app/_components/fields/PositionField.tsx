"use client";

import RHFSelect, { OptionType } from "@/components/RHF/RHFSelect";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { BASE_URL } from "@/constants/base_url.const";
import { POSITIONS_OPTIONS } from "@/constants/position.const";
import { cn } from "@/lib/utils";
import { MemberInput } from "@/types/info.schema";
import { useFormContext, useFormState } from "react-hook-form";

export default function PositionField() {
  const { control } = useFormContext<MemberInput>();
  const { errors } = useFormState({ control, name: ["position"] });
  const errorMessage = errors.position?.message;

  return (
    <Field>
      <Label htmlFor="position">직무</Label>
      <div className={cn("flex items-center gap-2")}>
        <RHFSelect<MemberInput>
          id="position"
          name="position"
          options={POSITIONS_OPTIONS}
        />
      </div>
      {errorMessage && (
        <p className="text-destructive mt-1 text-sm">{errorMessage}</p>
      )}
    </Field>
  );
}
