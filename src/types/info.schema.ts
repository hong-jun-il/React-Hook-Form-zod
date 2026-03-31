import z from "zod";

const GENDER_VALUES = ["MAN", "WOMAN"] as const;

const BaseSchema = z.object({
  email: z
    .object({
      id: z.string().min(1, "이메일을 입력하세요"),
      domain: z.string().min(1, "도메인을 선택하세요"),
    })
    .refine(
      (data) => {
        const full = `${data.id}@${data.domain}`;
        return z.email().safeParse(full).success;
      },
      {
        message: "올바른 이메일 형식이 아닙니다.",
        path: ["id"],
      },
    ),
  loginId: z.string().trim().min(1, { error: "아이디를 입력해주세요." }),
  gender: z
    .union([
      z.literal(""),
      z.enum(GENDER_VALUES, { error: "성별을 선택해주세요." }),
    ])
    .refine((val) => val !== "", {
      error: "성별을 선택해주세요.",
    }),
  birth: z.object({
    year: z.string().min(1, { error: "연도를 선택하세요." }),
    month: z.string().min(1, { error: "월을 선택하세요." }),
    day: z.string().min(1, { error: "날짜를 선택하세요." }),
  }),
  phone: z.object({
    prefix: z.string().min(1, { error: "전화번호 앞자리를 선택해주세요." }),
    number: z.string().min(1, { error: "전화번호를 입력해주세요." }),
  }),
  generation: z.coerce.number({ error: "기수를 선택해주세요." }),
  teamId: z.preprocess(
    (val) => (val === "" || val === undefined ? null : val),
    z.coerce.number({ error: "올바른 팀의 형식이 아닙니다." }),
  ),
  positionId: z.coerce.number({ error: "직무를 선택해주세요." }),
  stacks: z.array(z.string().trim()),
  isAgreed: z.boolean(),
});

const ModeSchema = z.discriminatedUnion("variant", [
  z
    .object({
      variant: z.literal("create"),
      password: z
        .string()
        .trim()
        .min(8, { error: "비밀번호는 8자리 이상이어야 합니다." }),
      confirmPassword: z
        .string()
        .trim()
        .min(1, { error: "비밀번호 확인을 입력해주세요." }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      error: "비밀번호가 일치하지 않습니다.",
      path: ["confirmPassword"],
    }),

  z.object({
    variant: z.literal("edit"),
    id: z.string().min(1, { error: "수정할 아이디가 없습니다." }),
  }),
]);

const StatusSchema = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("NEW"),
    graduationDate: z.coerce.date({ error: "졸업일을 선택하세요." }),
  }),

  z.object({
    status: z.literal("EXP"),
    experiences: z.array(
      z
        .object({
          from: z.coerce.date({ error: "시작일을 선택해주세요." }),
          to: z.coerce.date({ error: "종료일을 선택해주세요." }),
          companyName: z.string().min(1, { error: "회사명을 입력해주세요" }),
        })
        .refine((data) => data.to >= data.from, {
          error: "종료일은 시작일보다 빠를 수 없습니다.",
          path: ["to"],
        }),
    ),
  }),
]);

export const MemberSchema = BaseSchema.and(ModeSchema).and(StatusSchema);

export type MemberInput = z.input<typeof MemberSchema>;
export type MemberOutput = z.output<typeof MemberSchema>;

export const defaultValues: MemberInput = {
  variant: "create",
  status: "NEW",
  email: {
    id: "",
    domain: "",
  },
  loginId: "",
  password: "",
  confirmPassword: "",
  gender: "",
  birth: {
    year: "",
    month: "",
    day: "",
  },
  phone: {
    prefix: "010",
    number: "",
  },
  generation: "",
  teamId: "",
  positionId: "",
  stacks: [],
  isAgreed: false,
  graduationDate: "",
};
