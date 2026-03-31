"use client";

import RHFSelect, { OptionType } from "@/components/RHF/RHFSelect";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { BASE_URL } from "@/constants/base_url.const";
import { cn } from "@/lib/utils";
import { MemberInput } from "@/types/info.schema";
import { Team } from "@/types/team.type";
import { useQuery } from "@tanstack/react-query";
import { useFormContext, useFormState, useWatch } from "react-hook-form";

export default function TeamField() {
  const { control } = useFormContext<MemberInput>();
  const { errors } = useFormState({ control, name: ["teamId"] });
  const errorMessage = errors.teamId?.message;

  const generation = useWatch({
    control,
    name: "generation",
  });

  const { data: teams, isPending } = useQuery({
    queryKey: ["teams", generation],
    queryFn: async (): Promise<Team[]> => {
      const res = await fetch(
        `${BASE_URL}/api/teams?generationId=${generation}`,
      );

      if (!res.ok) {
        throw new Error("Get teams Error");
      }

      return res.json();
    },
    enabled: !!generation,
  });

  const teamOptions: OptionType[] =
    teams?.map((team) => ({
      label: team.name,
      value: team.id,
    })) ?? [];

  const getPlaceholder = () => {
    if (!generation) return "기수를 먼저 선택해주세요";
    if (isPending) return "팀 목록 로딩 중...";
    if (teams?.length === 0) return "등록된 팀이 없습니다";

    return "팀을 선택해주세요";
  };

  return (
    <Field>
      <Label htmlFor="teamId">팀</Label>
      <RHFSelect<MemberInput>
        id="teamId"
        name="teamId"
        options={teamOptions}
        disabled={teamOptions.length === 0 || isPending}
        placeholder={getPlaceholder()}
      />
      {errorMessage && (
        <p className="text-destructive mt-1 text-sm">{errorMessage}</p>
      )}
    </Field>
  );
}
