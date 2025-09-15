import dbConnect, { collectionNames } from "@/app/lib/dbConntect";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { Briefcase, MapPin, Calendar, Gift, DollarSign, User } from "lucide-react";
import ApplyForm from "./applyForm";

const JobDetails = async ({ params }) => {
  const { id } = params;

  // Connect to DB
  const jobCollection = await dbConnect(collectionNames.JOB);
  const job = await jobCollection.findOne({ _id: new ObjectId(id) });

  if (!job) {
    return <div className="text-center text-red-500 p-6">❌ Job not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto my-10 p-8 bg-accent dark:bg-accent rounded-2xl shadow-lg border">
      <h2 className="text-center font-bold text-3xl text-secondary">Job Details</h2>
      
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-primary">{job.title}</h1>
        <p className="text-lg text-secondary mt-2 flex items-center justify-center gap-2">
          <Briefcase className="w-5 h-5 text-primary" />
          {job.company}
        </p>
        <p className="text-sm text-gray-500 mt-1 flex items-center justify-center gap-1">
          <MapPin className="w-4 h-4" />
          {job.location || "Remote"}
        </p>
      </div>

      {/* Job Description */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-primary mb-2">📝 Job Description</h2>
        <p className="text-secondary leading-relaxed">{job.description}</p>
      </section>

      {/* Requirements */}
      {job.requirements?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-primary mb-2">✅ Requirements</h2>
          <ul className="list-disc list-inside space-y-1 text-secondary">
            {job.requirements.map((req, idx) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Salary & Benefits */}
      <section className="mb-8 grid sm:grid-cols-2 gap-6">
        <div className="flex items-center gap-2 text-primary">
          <DollarSign className="w-5 h-5" />
          <span>
            <span className="font-semibold text-secondary">Salary: </span>
            {job.salary_range || "Negotiable"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-primary">
          <Gift className="w-5 h-5" />
          <span>
            <span className="font-semibold text-secondary">Benefits: </span>
            {job.benefits?.length ? job.benefits.join(", ") : "Not mentioned"}
          </span>
        </div>
      </section>

      {/* Deadline */}
      {job.application_deadline && (
        <section className="mb-8 flex items-center gap-2 text-red-500 font-semibold">
          <Calendar className="w-5 h-5" />
          <span>Application Deadline: {job.application_deadline}</span>
        </section>
      )}

      {/* HR Info */}
      <section className="mb-8 border-t pt-4">
        <h2 className="text-lg font-semibold text-primary mb-2">👤 Posted by</h2>
        <p className="text-secondary flex items-center gap-2">
          <User className="w-5 h-5" /> {job.hr_name} ({job.hr_email})
        </p>
      </section>

      {/* Apply Form */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-primary mb-4">📝 Apply for this job</h2>
   <ApplyForm jobId={job._id.toString()} />

      </section>

      {/* Back Button */}
      <div className="flex justify-start mt-6">
        <Link href="/job">
          <button className="btn btn-outline">⬅ Back to Jobs</button>
        </Link>
      </div>
    </div>
  );
};

export default JobDetails;
