import { BASE_URL } from "@/constants/base_url.const";
import { Generation } from "@/types/generation.type";

export async function getGenerations(): Promise<Generation[]> {
  const res = await fetch(`${BASE_URL}/api/generations`, {
    next: {
      tags: ["generations"],
    },
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Get generations Error");
  }

  return res.json();
}
