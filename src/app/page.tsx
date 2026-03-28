"use client";

import ChevronDownIcon from "@/assets/ChevronDownIcon";
import Input from "@/components/ui/Input";
import Select, { OptionType } from "@/components/ui/Select";

export default function page() {
  const options: OptionType[] = [
    { label: "선택해주세요", value: "" },
    {
      label: "test",
      value: "test",
    },
  ];
  return (
    <div>
      <Input />
    </div>
  );
}
