import dbConnect, { collectionNames } from "@/app/lib/dbConntect";
import { NextResponse } from "next/server";
// import dbConnect, { collectionNames } from "../../../lib/dbConnect"; // relative path

export async function POST(req) {
  try {
    const data = await req.json();
    const jobCollection = dbConnect(collectionNames.JOB);
    const result = await jobCollection.insertOne(data);

    return NextResponse.json({ success: true, jobId: result.insertedId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
