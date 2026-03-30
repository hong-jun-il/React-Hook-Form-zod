"use client";

import RHFSelect, { OptionType } from "@/components/RHF/RHFSelect";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { getGenerations } from "@/lib/api/getGenarations";
import { cn } from "@/lib/utils";
import { MemberInput } from "@/types/info.schema";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useFormContext, useFormState } from "react-hook-form";

export default function GenerationField() {
  const { data: generations } = useSuspenseQuery({
    queryKey: ["generations"],
    queryFn: getGenerations,
  });

  const generationOptions: OptionType[] = [
    { label: "기수", value: "" },
    ...generations.map((generation) => ({
      label: String(generation.generation),
      value: generation.id,
    })),
  ];

  const { control } = useFormContext<MemberInput>();
  const { errors } = useFormState({ control, name: ["generation"] });
  const errorMessage = errors.generation?.message;
  return (
    <Field>
      <Label htmlFor="generation">기수</Label>
      <div className={cn("flex items-center gap-2")}>
        <RHFSelect<MemberInput>
          id="generation"
          name="generation"
          options={generationOptions}
        />
      </div>
      {errorMessage && (
        <p className="text-destructive mt-1 text-sm">{errorMessage}</p>
      )}
    </Field>
  );
}
