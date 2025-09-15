"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        setJobs(data.slice(0, 6)); // Take first 6 jobs
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  if (jobs.length === 0) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="max-w-screen-xl mx-auto px-6 py-16 bg-accent rounded-2xl">
      <h2 className="text-4xl font-bold text-primary text-center mb-12">
        🔥 Featured Jobs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job, idx) => (
          <motion.div
            key={job._id}
            className="bg-base-100 p-6 rounded-2xl shadow-xl border border-secondary transition-transform duration-500 flex flex-col justify-between hover:scale-115 hover:shadow-2xl hover:shadow-primary"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
          >
            <div>
              <h3 className="text-xl text-primary font-bold mb-2">{job.title}</h3>
              <p className="text-secondary mb-1">{job.company}</p>
              <p className="text-secondary mb-1">{job.location}</p>
              <span className="badge  badge-primary text-accent">{job.employment_type}</span>
            </div>

            <Link
              href="/job"
              className="mt-4 inline-block text-neutral bg-primary hover:bg-secondary px-4 py-2 rounded-lg font-semibold text-center transition-colors duration-300"
            >
              View Job
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedJobs;
