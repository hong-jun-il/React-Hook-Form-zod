import { BASE_URL } from "@/constants/base_url.const";
import { useQuery } from "@tanstack/react-query";

export function useMembers() {
  return useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/members`);

      if (!res.ok) {
        throw new Error("Get members HTTP ERROR");
      }

      return res.json();
    },
  });
}
