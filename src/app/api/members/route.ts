import data from "@/../db.json";

export async function GET() {
  const members = data.members;

  return Response.json(members);
}
