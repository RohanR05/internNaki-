import dbConnect, { collectionNames } from "@/app/lib/dbConntect";


export async function GET() {
  try {
    const jobsCollection = await dbConnect(collectionNames.JOB);
    const applicationsCollection = await dbConnect(collectionNames.APPLICATIONS);

    const totalJobs = await jobsCollection.countDocuments();
    const totalApplications = await applicationsCollection.countDocuments();

    return new Response(
      JSON.stringify({ totalJobs, totalApplications }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
