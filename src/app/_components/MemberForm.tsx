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

function MemberForm() {
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
