import dbConnect, { collectionNames } from "@/app/lib/dbConntect";
import { ObjectId } from "mongodb";

// POST: Apply to a job
export async function POST(req) {
  try {
    const { jobId, email, name } = await req.json();
    if (!jobId || !email || !name) {
      return new Response(JSON.stringify({ message: "Missing fields" }), {
        status: 400,
      });
    }

    const applicationCollection = await dbConnect(collectionNames.APPLICATIONS);

    // Prevent duplicate applications
    const existing = await applicationCollection.findOne({
      jobId: new ObjectId(jobId),
      email,
    });
    if (existing) {
      return new Response(
        JSON.stringify({ message: "You have already applied to this job!" }),
        { status: 400 }
      );
    }

    await applicationCollection.insertOne({
      jobId: new ObjectId(jobId),
      email,
      name,
      appliedAt: new Date(),
    });

    return new Response(
      JSON.stringify({ message: "Your application has been submitted!" }),
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}

// GET: Fetch applications
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const jobId = searchParams.get("jobId");

  if (!email && !jobId) {
    return new Response(
      JSON.stringify({ message: "Email or JobId required" }),
      { status: 400 }
    );
  }

  try {
    const applicationCollection = await dbConnect(collectionNames.APPLICATIONS);

    const query = {};
    if (email) query.email = email;
    if (jobId) query.jobId = new ObjectId(jobId);

    const applications = await applicationCollection
      .find(query)
      .sort({ appliedAt: -1 })
      .toArray();

    const result = applications.map((app) => ({
      ...app,
      _id: app._id.toString(),
      jobId: app.jobId.toString(),
    }));

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
