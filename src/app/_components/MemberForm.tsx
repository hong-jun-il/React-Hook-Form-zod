"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { MemberProvider } from "./MemberProvider";
import { EmailField } from "./fields/EmailField";
import { LoginField } from "./fields/LoginField";
import { GenderField } from "./fields/GenderField";
import { BirthField } from "./fields/BirthField";
import { PhoneField } from "./fields/PhoneField";
import GenerationField from "./fields/GenerationField";
import TeamField from "./fields/TeamField";
import PositionField from "./fields/PositionField";
import StackField from "./fields/StackField";
import {
  SubmitHandler,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { defaultValues, MemberInput } from "@/types/info.schema";
import AgreeField from "./fields/AgreeField";
import ExperienceField from "./fields/ExperienceField";
import ExperienceNewField from "./fields/ExperienceNewField";
import { useEffect } from "react";
import ExperienceExpField from "./fields/ExperienceExpField";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import PasswordField from "./fields/PasswordField";
import { useMembers } from "@/hooks/quries";

function MemberForm() {
  const { data: members } = useMembers();
  console.log(members);

  const { control, unregister, setValue, handleSubmit, reset } =
    useFormContext<MemberInput>();
  const status = useWatch({
    control,
    name: "status",
  });

  const variant = useWatch({
    control,
    name: "variant",
  });

  const { replace } = useFieldArray({
    control,
    name: "experiences",
  });

  useEffect(() => {
    if (status === "EXP") {
      unregister("graduationDate");
      replace([]);
    } else if (status === "NEW") {
      unregister("experiences");
      setValue("graduationDate", "");
    }
  }, [status, unregister, setValue]);

  const onSubmit: SubmitHandler<MemberInput> = (data) => {
    console.log(data);

    alert("폼 데이터 제출 성공!");
  };

  const onInvalid = (errors: any) => {
    console.log("에러::::::", errors);
  };

  const onReset = () => {
    const shouldReset = confirm("폼을 초기화 하시겠습니까?");

    if (shouldReset) {
      reset(defaultValues);
    }
  };

  console.log(
    useWatch({
      control,
    }),
  );

  return (
    <Card className="mx-auto w-full max-w-125">
      <CardHeader>
        <CardTitle>멤버 추가</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="member-form" onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <FieldGroup>
            <EmailField />
            <LoginField />
            {variant === "create" && <PasswordField />}
            <GenderField />
            <BirthField />
            <PhoneField />
            <div className="flex">
              <GenerationField />
              <TeamField />
            </div>
            <div className="flex">
              <PositionField />
              <StackField />
            </div>
            <AgreeField />
            <ExperienceField />
            {status === "NEW" ? <ExperienceNewField /> : <ExperienceExpField />}
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className={cn("flex justify-end gap-2")}>
        <Button type="submit" form="member-form">
          제출
        </Button>
        <Button
          onClick={onReset}
          className="bg-red-400 transition-colors duration-200 hover:bg-red-500"
        >
          초기화
        </Button>
      </CardFooter>
    </Card>
  );
}

export default () => (
  <MemberProvider>
    <MemberForm />
  </MemberProvider>
);
