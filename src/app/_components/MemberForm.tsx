"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
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
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { MemberInput } from "@/types/info.schema";
import AgreeField from "./fields/AgreeField";
import ExperienceField from "./fields/ExperienceField";
import ExperienceNewField from "./fields/ExperienceNewField";
import { useEffect } from "react";
import ExperienceExpField from "./fields/ExperienceExpField";

function MemberForm() {
  const { control, unregister, setValue } = useFormContext<MemberInput>();
  const status = useWatch({
    control,
    name: "status",
  });

  const { append } = useFieldArray({
    control,
    name: "experiences",
  });

  useEffect(() => {
    if (status === "EXP") {
      unregister("graduationDate");
      append([]);
    } else if (status === "NEW") {
      unregister("experiences");
      setValue("graduationDate", "");
    }
  }, [status, unregister]);

  console.log(
    useWatch({
      control,
    }),
  );

  return (
    <Card className="mx-auto w-full max-w-125">
      <CardHeader>
        <CardTitle>멤버 추가</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <EmailField />
            <LoginField />
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
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}

export default () => (
  <MemberProvider>
    <MemberForm />
  </MemberProvider>
);
