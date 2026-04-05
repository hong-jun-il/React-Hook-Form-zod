"use client";

import { RHFComboboxMultiple } from "@/components/RHF/RHFComboboxMultiple";
import { OptionType } from "@/components/RHF/RHFSelect";
import { Field, FieldLabel } from "@/components/ui/field";
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

  const { data: stacks, isPending } = useQuery({
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

  const getPlaceHolder = () => {
    if (!positionId) {
      return "직군을 먼저 선택해주세요.";
    }

    if (isPending) {
      return "기술 스택 로딩중...";
    }

    if (stackOptions.length === 0) {
      return "등록된 기술 스택이 없습니다.";
    }

    return "기술 스택을 선택해주세요.";
  };

  return (
    <Field>
      <FieldLabel htmlFor="stacks">기술 스택</FieldLabel>
      <RHFComboboxMultiple<MemberInput>
        id="stacks"
        name="stacks"
        items={stackOptions}
        disabled={!positionId || isPending}
        placeholder={getPlaceHolder()}
      />
      {errorMessage && (
        <p className="text-destructive mt-1 text-sm">{errorMessage}</p>
      )}
    </Field>
  );
}
