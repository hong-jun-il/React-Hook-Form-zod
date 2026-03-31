import data from "@/../db.json";

export async function GET() {
  const positions = data.positions;

  return Response.json(positions);
}
