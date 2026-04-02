"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { MemberInput } from "@/types/info.schema";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function ExperienceExpField() {
  const { control } = useFormContext<MemberInput>();

  const { fields, append } = useFieldArray({
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
      {fields.map((field) => (
        <Card key={field.id}>
          <CardHeader>
            <CardTitle className="text-sm!">경력 세부 사항</CardTitle>
          </CardHeader>
          RHF
        </Card>
      ))}
    </Field>
  );
}
