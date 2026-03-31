import { NextRequest } from "next/server";
import data from "@/../db.json";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const positionId = Number(searchParams.get("positionId"));

  const stacks = data.stacks.filter((stack) => stack.positionId === positionId);

  return Response.json(stacks);
}
