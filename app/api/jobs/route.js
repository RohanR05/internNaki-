import dbConnect, { collectionNames } from "@/app/lib/dbConntect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const jobCollection = await dbConnect(collectionNames.JOB);
    const jobs = await jobCollection.find({}).toArray();
    return NextResponse.json(jobs);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const jobCollection = await dbConnect(collectionNames.JOB);
    const result = await jobCollection.insertOne(data);

    return NextResponse.json({ success: true, jobId: result.insertedId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
