"use client";

import RHFCalendar from "@/components/RHF/RHFCalendar";
import RHFTextField from "@/components/RHF/RHFTextField";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { MemberInput } from "@/types/info.schema";
import {
  useFieldArray,
  useFormContext,
  useFormState,
  useWatch,
} from "react-hook-form";

function ExperiencesCard({
  index,
  onRemove,
}: {
  index: number;
  onRemove: (index: number) => void;
}) {
  const { control } = useFormContext<MemberInput>();

  const fromDate = useWatch({
    control,
    name: `experiences.${index}.from`,
  });

  const { errors } = useFormState({
    control,
    name: `experiences.${index}`,
  });

  const errorTarget = (errors as any)["experiences"]?.[index];
  const errorMessage =
    errorTarget?.from?.message ||
    errorTarget?.to?.message ||
    errorTarget?.companyName?.message;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm!">경력 세부 사항</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <RHFTextField<MemberInput>
          name={`experiences.${index}.companyName`}
          placeholder="회사명"
        />
        <div className={cn("flex items-center gap-5")}>
          <RHFCalendar<MemberInput>
            name={`experiences.${index}.from`}
            placeholder="입사 일시"
          />
          <span>~</span>
          <RHFCalendar<MemberInput>
            name={`experiences.${index}.to`}
            placeholder="퇴사 일시"
            disabled={(date: Date) => new Date(fromDate) > date}
          />
        </div>
        {errorMessage && <FieldError>{errorMessage}</FieldError>}
      </CardContent>
      <CardFooter
        className={cn("flex justify-end", "border-t-0 bg-white py-3")}
      >
        <Button
          type="button"
          onClick={() => {
            const shouldRemove = confirm("작성중인 경력을 삭제하시겠습니까?");

            if (shouldRemove) {
              onRemove(index);
            }
          }}
        >
          삭제
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function ExperienceExpField() {
  const { control } = useFormContext<MemberInput>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  return (
    <Field>
      <FieldLabel htmlFor="date">경력</FieldLabel>
      <Button
        type="button"
        onClick={() => {
          append({
            from: "",
            to: "",
            companyName: "",
          });
        }}
      >
        클릭하여 추가
      </Button>
      {fields.map((field, i) => (
        <ExperiencesCard key={field.id} index={i} onRemove={remove} />
      ))}
    </Field>
  );
}
