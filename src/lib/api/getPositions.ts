import { BASE_URL } from "@/constants/base_url.const";
import { Position } from "@/types/position.type";

export async function getPositions(): Promise<Position[]> {
  const res = await fetch(`${BASE_URL}/api/positions`, {
    cache: "force-cache",
    next: {
      tags: ["positions"],
    },
  });

  if (!res.ok) {
    throw new Error("Get Positions Error!");
  }

  return res.json();
}
