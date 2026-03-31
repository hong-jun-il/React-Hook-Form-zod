import { NextRequest } from "next/server";
import data from "@/../db.json";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const genId = searchParams.get("generationId");

  const filteredTeams = data.teams.filter(
    (t) => t.generationId === Number(genId),
  );

  return Response.json(filteredTeams || []);
}
