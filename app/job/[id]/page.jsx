import dbConnect, { collectionNames } from "@/app/lib/dbConntect";
import { ObjectId } from "mongodb";
import Link from "next/link";

// This is a Server Component
const JobDetails = async ({ params }) => {
  const { id } = params;

  // connect DB
  const jobCollection = await dbConnect(collectionNames.JOB);
  const job = await jobCollection.findOne({ _id: new ObjectId(id) });

  if (!job) {
    return (
      <div className="max-w-screen-md mx-auto p-6 text-center text-red-500">
        ❌ Job not found
      </div>
    );
  }

  return (
    <div className="max-w-screen-md mx-auto p-6 bg-accent rounded-xl shadow-md shadow-primary my-6 md:my-12 lg:my-16">
      <h1 className="text-3xl font-bold text-primary mb-4">{job.title}</h1>
      <p className="text-lg text-secondary mb-2">{job.company}</p>
      <p className="text-primary/80 mb-4">{job.location || "Remote"}</p>

      {/* Job Description */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-primary mb-2">
          Job Description
        </h2>
        <p className="text-secondary font-medium leading-relaxed">
          {job.description}
        </p>
      </div>

      {/* Requirements */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-primary mb-2">
          Requirements
        </h2>
        <ul className="list-disc list-inside space-y-1 text-secondary">
          {job.requirements?.map((req, idx) => (
            <li key={idx}>{req}</li>
          ))}
        </ul>
      </div>

      {/* Salary & Benefits */}
      <div className="mb-6">
        <p className="text-primary">
          <span className="font-semibold text-secondary">💰 Salary: </span>
          {job.salary_range || "Negotiable"}
        </p>
        <p className="text-primary mt-2">
          <span className="font-semibold text-secondary">🎁 Benefits: </span>
          {job.benefits?.join(", ")}
        </p>
      </div>

      {/* Deadline */}
      <div className="mb-6">
        <p className="text-red-500 font-semibold">
          📅 Application Deadline: {job.application_deadline}
        </p>
      </div>

      {/* Apply Button */}
      <div className="mt-6 text-center">
        <button className="btn btn-primary">Apply Now</button>
      </div>
      <div className="mb-4">
        <Link href="/job">
          <button className="btn btn-primary">⬅ Back to Jobs</button>
        </Link>
      </div>
    </div>
  );
};

export default JobDetails;
