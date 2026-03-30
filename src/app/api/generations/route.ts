import data from "@/../db.json";

export async function GET() {
  const { generations } = data;

  return Response.json(generations);
}
