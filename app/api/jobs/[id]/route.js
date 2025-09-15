import dbConnect, { collectionNames } from "@/app/lib/dbConntect";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  const { id } = params;
  const jobCollection = await dbConnect(collectionNames.JOB);

  const job = await jobCollection.findOne({ _id: new ObjectId(id) });

  if (!job) {
    return new Response(JSON.stringify({ success: false, message: "Job not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(job), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(req, { params }) {
  const { id } = params;
  const jobCollection = await dbConnect(collectionNames.JOB);

  const result = await jobCollection.deleteOne({ _id: new ObjectId(id) });
  return new Response(JSON.stringify({ success: result.deletedCount === 1 }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(req, { params }) {
  const { id } = params;
  const data = await req.json();
  const jobCollection = await dbConnect(collectionNames.JOB);

  const result = await jobCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: data }
  );
  return new Response(JSON.stringify({ success: result.modifiedCount === 1 }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
