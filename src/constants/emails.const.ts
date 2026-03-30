import { OptionType } from "@/components/RHF/RHFSelect";

export const EMAIL_DOMAINS = {
  GOOGLE: "gmail.com",
  NAVER: "naver.com",
  KAKAO: "kakao.com",
  DAUM: "hanmail.net",
  OUTLOOK: "outlook.com",
  ICLOUD: "icloud.com",
} as const;

export const EMAIL_DOMAIN_LIST = Object.values(EMAIL_DOMAINS);
export const EMAIL_OPTIONS: OptionType[] = [
  {
    label: "직접 입력",
    value: "",
  },
  ...EMAIL_DOMAIN_LIST.map((domain) => ({
    label: domain,
    value: domain,
  })),
];

export type EmailDomain = (typeof EMAIL_DOMAINS)[keyof typeof EMAIL_DOMAINS];
