import { ComponentProps } from "react";

type Props = ComponentProps<"svg"> & { size?: number };

export default function ChevronDownIcon({ className, size = 24 }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6"></path>
    </svg>
  );
}
