import dbConnect, { collectionNames } from "@/app/lib/dbConntect";
import { ObjectId } from "mongodb";

export async function GET(req) {
  const url = new URL(req.url);
  const hr_email = url.searchParams.get("hr_email");
  const jobCollection = await dbConnect(collectionNames.JOB);

  const jobs = await jobCollection.find({ hr_email }).toArray();
  return new Response(JSON.stringify(jobs), { status: 200 });
}
