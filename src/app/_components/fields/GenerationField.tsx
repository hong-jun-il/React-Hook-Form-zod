"use client";

import RHFSelect, { OptionType } from "@/components/RHF/RHFSelect";
import { Field, FieldLabel } from "@/components/ui/field";
import { getGenerations } from "@/lib/api/getGenarations";
import { MemberInput } from "@/types/info.schema";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useFormContext, useFormState } from "react-hook-form";

export default function GenerationField() {
  const { data: generations } = useSuspenseQuery({
    queryKey: ["generations"],
    queryFn: getGenerations,
  });

  const generationOptions: OptionType[] = generations.map((generation) => ({
    label: String(generation.generation),
    value: generation.id,
  }));

  const { control } = useFormContext<MemberInput>();
  const { errors } = useFormState({ control, name: ["generation"] });
  const errorMessage = errors.generation?.message;

  return (
    <Field>
      <FieldLabel htmlFor="generation">기수</FieldLabel>
      <RHFSelect<MemberInput>
        id="generation"
        name="generation"
        options={generationOptions}
        placeholder="기수"
      />
      {errorMessage && (
        <p className="text-destructive mt-1 text-sm">{errorMessage}</p>
      )}
    </Field>
  );
}
