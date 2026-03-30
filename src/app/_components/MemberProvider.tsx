"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultValues, MemberInput, MemberSchema } from "@/types/info.schema";
import { DevTool } from "@hookform/devtools";
import { ReactNode } from "react";

type Props = { children: ReactNode };

export function MemberProvider({ children }: Props) {
  const methods = useForm<MemberInput>({
    mode: "all",
    resolver: zodResolver(MemberSchema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      {children}
      {/* <DevTool control={methods.control} /> */}
    </FormProvider>
  );
}
