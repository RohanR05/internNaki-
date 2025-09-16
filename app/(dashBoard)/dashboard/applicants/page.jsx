"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const ApplicantsList = () => {
  const [applicants, setApplicants] = useState([]);
  const searchParams = useSearchParams();
  const jobid = searchParams.get("jobid"); // Get jobid from URL query

  useEffect(() => {
    if (!jobid) return;

    const fetchApplicants = async () => {
      try {
        const res = await fetch(`/api/applicants/job/${jobid}`);
        const data = await res.json();
        setApplicants(data);
      } catch (err) {
        console.error("Error fetching applicants:", err);
      }
    };

    fetchApplicants();
  }, [jobid]);

  if (!applicants.length) {
    return <p className="text-center py-10 text-gray-500">No applicants yet.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-primary mb-6">Applicants</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {applicants.map((app) => (
          <li
            key={app._id}
            className="p-6 bg-base-100 shadow-md rounded-lg border border-secondary hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-xl font-semibold text-primary">{app.name}</h3>
            <p className="text-gray-600">{app.email}</p>
            <p className="text-gray-500">
              Applied at: {new Date(app.appliedAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicantsList;
