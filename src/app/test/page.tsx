"use client";

import RHFTextField from "@/components/RHF/RHFTextField";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  FieldValues,
  FormProvider,
  Path,
  useForm,
  useFormContext,
} from "react-hook-form";
import z from "zod";

const schema = z.object({
  test1: z.string().min(1, { error: "test1 필드는 최소 한 글자 입력을 요함" }),
  test2: z.string().min(1, { error: "test2 필드는 최소 한 글자 입력을 요함" }),
  test3: z.string().min(1, { error: "test3 필드는 최소 한 글자 입력을 요함" }),
});

type Schema = z.infer<typeof schema>;

const defaultValues: Schema = {
  test1: "",
  test2: "",
  test3: "",
};

function RHFTest<T extends FieldValues>({ name }: { name: Path<T> }) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <Input {...field} />}
    />
  );
}

function Test1Field() {
  const {
    register,
    formState: { errors },
  } = useFormContext<Schema>();
  const test1ErrorMsg = errors.test1?.message;

  return (
    <div>
      <input type="text" {...register("test1")} />
      {test1ErrorMsg && <p>{test1ErrorMsg}</p>}
    </div>
  );
}

function Test2Field() {
  const { control } = useFormContext<Schema>();

  return (
    <div>
      <Controller
        control={control}
        name="test2"
        render={({ field, fieldState: { error } }) => (
          <>
            <Input {...field} />
            {error?.message && <p>{error?.message}</p>}
          </>
        )}
      />
    </div>
  );
}

function Test3Field() {
  const {
    formState: { errors },
  } = useFormContext<Schema>();
  const errorMessage = errors.test3?.message;
  console.log(errors, "fdgkfkklmdsgdf");

  return (
    <Field>
      <FieldLabel htmlFor="test3">test3 필드</FieldLabel>
      <RHFTextField<Schema> id="test3" name="test3" />
      {errorMessage && <p>{errorMessage}</p>}
    </Field>
  );
}

function Page() {
  return (
    <div>
      <Test1Field />
      <Test2Field />
      <Test3Field />
    </div>
  );
}

export default () => {
  const method = useForm({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <FormProvider {...method}>
      <Page />
    </FormProvider>
  );
};
