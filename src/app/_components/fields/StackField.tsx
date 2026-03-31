"use client";

import { RHFComboboxMultiple } from "@/components/RHF/RHFComboboxMultiple";
import { OptionType } from "@/components/RHF/RHFSelect";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { BASE_URL } from "@/constants/base_url.const";
import { MemberInput } from "@/types/info.schema";
import { Stack } from "@/types/stack.type";
import { useQuery } from "@tanstack/react-query";
import { useFormContext, useFormState, useWatch } from "react-hook-form";

export default function StackField() {
  const { control } = useFormContext<MemberInput>();
  const { errors } = useFormState({ control, name: ["stacks"] });
  const errorMessage = errors.stacks?.message;

  const positionId = useWatch({
    control,
    name: "positionId",
  });

  const { data: stacks } = useQuery({
    queryKey: ["stacks", positionId],
    queryFn: async (): Promise<Stack[]> => {
      const res = await fetch(
        `${BASE_URL}/api/stacks?positionId=${positionId}`,
      );

      if (!res.ok) {
        throw new Error("Get Stacks Error!");
      }

      return res.json();
    },
    enabled: !!positionId,
  });

  const stackOptions: OptionType[] =
    stacks?.map((stack) => {
      return {
        value: stack.id,
        label: stack.stack,
      };
    }) || [];

  return (
    <Field>
      <Label htmlFor="stacks">기술 스택</Label>
      <RHFComboboxMultiple<MemberInput>
        id="stacks"
        name="stacks"
        items={stackOptions}
      />
      {errorMessage && (
        <p className="text-destructive mt-1 text-sm">{errorMessage}</p>
      )}
    </Field>
  );
}
