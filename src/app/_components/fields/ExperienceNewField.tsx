"use client";

import RHFCalendar from "@/components/RHF/RHFCalendar";
import { Field, FieldLabel } from "@/components/ui/field";
import { MemberInput } from "@/types/info.schema";

export default function ExperienceNewField() {
  return (
    <Field>
      <FieldLabel htmlFor="date">신입</FieldLabel>
      <RHFCalendar<MemberInput>
        name="graduationDate"
        id="graduationDate"
        placeholder="졸업 날짜를 선택해주세요."
      />
    </Field>
  );
}
