import Link from "next/link";
import dbConnect, { collectionNames } from "../lib/dbConntect";

const page = async () => {
  const jobCollection = await dbConnect(collectionNames.JOB);
  const data = await jobCollection.find({}).toArray();

  return (
    <div>
      {/* Intro Section */}
      <div className="max-w-screen-xl mx-auto p-6 bg-accent mt-6 md:mt-12 lg:mt-16 rounded-xl shadow-sm">
        <p className="text-primary text-lg leading-relaxed">
          🌟 Finding the right job is more than just matching skills to
          requirements — it’s about discovering a role where you can grow, make
          an impact, and feel valued. At our company, we believe in creating
          opportunities that challenge you, inspire you, and help you achieve
          your career goals. Whether you’re just starting out or looking to take
          the next big step, every application is a step closer to building the
          future you deserve. 🌟
        </p>

        <p className="mt-4 text-primary text-base leading-relaxed">
          We work with top employers across industries, offering full-time,
          part-time, and remote opportunities tailored to diverse skill sets.
          Our hiring process is transparent, supportive, and designed to ensure
          you find the perfect fit. Alongside competitive salaries, you can
          expect benefits such as health insurance, flexible working options,
          paid leave, and continuous learning opportunities. 🚀
        </p>

        <p className="mt-4 text-primary text-base leading-relaxed">
          Explore the available roles below, read through the requirements, and
          apply with confidence. Your dream job might be just a click away —
          take the step today and join a workplace where your contributions
          truly matter.
        </p>
      </div>

      {/* Job Listing Section */}
      <div className="max-w-screen-xl mx-auto p-6 bg-accent my-6 md:my-12 lg:my-16 rounded-xl shadow-sm">
        <h1 className="text-3xl text-center font-bold text-primary mb-6">
          Available Jobs
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((job) => (
            <div
              key={job._id}
              className="card bg-neutral shadow-md border border-neutral"
            >
              <div className="card-body">
                <h2 className="card-title text-secondary">{job.title}</h2>
                <p className="text-primary">{job.company}</p>
                <p className="text-sm text-primary/80">
                  {job.location || "Remote"}
                </p>
                <p className="text-sm text-primary">
                  {job.application_deadline}
                </p>
                <div className="card-actions justify-end mt-4">
                  <Link href={`/jobs/${job._id}`}>
                    <button className="btn btn-primary text-neutral">
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
