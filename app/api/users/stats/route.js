import dbConnect, { collectionNames } from "@/app/lib/dbConntect";

export async function GET() {
  const db = await dbConnect(collectionNames.REGISTER);
  const allUsers = await db.find({}).toArray();

  const total = allUsers.length;
  const hrCount = allUsers.filter((u) => u.role === "hr").length;
  const userCount = allUsers.filter((u) => u.role === "user").length;

  return Response.json({ total, hr: hrCount, user: userCount });
}
