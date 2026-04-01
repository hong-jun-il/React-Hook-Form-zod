"use client";

import RHFSelect, { OptionType } from "@/components/RHF/RHFSelect";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { getPositions } from "@/lib/api/getPositions";
import { MemberInput } from "@/types/info.schema";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useFormContext, useFormState } from "react-hook-form";

export default function PositionField() {
  const { control, setValue } = useFormContext<MemberInput>();
  const { errors } = useFormState({ control, name: ["positionId"] });
  const errorMessage = errors.positionId?.message;

  const { data: positions } = useSuspenseQuery({
    queryKey: ["positions"],
    queryFn: getPositions,
  });

  const positionOptions: OptionType[] = positions.map((position) => {
    return {
      value: position.id,
      label: position.position,
    };
  });

  return (
    <Field>
      <Label htmlFor="positionId">직무</Label>
      <RHFSelect<MemberInput>
        id="positionId"
        name="positionId"
        options={positionOptions}
        placeholder="직무"
        onChange={() => setValue("stacks", [])}
      />
      {errorMessage && (
        <p className="text-destructive mt-1 text-sm">{errorMessage}</p>
      )}
    </Field>
  );
}
