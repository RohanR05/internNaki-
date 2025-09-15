"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

const AppliedJobsList = () => {
  const { data: session } = useSession();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    const fetchApplications = async () => {
      setLoading(true);
      const userEmail = session.user.email.toLowerCase(); // normalize email
      try {
        // 1️⃣ Fetch applications for this user
        const res = await fetch(`/api/applications?email=${userEmail}`);
        const data = await res.json();

        if (!res.ok) {
          Swal.fire("Error", data.message || "Failed to fetch applications", "error");
          setLoading(false);
          return;
        }

        if (!Array.isArray(data) || data.length === 0) {
          setApplications([]);
          setLoading(false);
          return;
        }

        // 2️⃣ Fetch job details for each application
        const appsWithJobDetails = await Promise.all(
          data.map(async (app) => {
            try {
              const jobRes = await fetch(`/api/jobs/${app.jobId}`);
              if (!jobRes.ok) return { ...app, job: null };
              const jobData = await jobRes.json();
              return { ...app, job: jobData };
            } catch {
              return { ...app, job: null };
            }
          })
        );

        setApplications(appsWithJobDetails);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to fetch applications", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [session]);

  const handleDelete = async (appId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete your application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`/api/applications/${appId}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to delete");

      Swal.fire("Deleted!", data.message, "success");
      setApplications((prev) => prev.filter((app) => app._id !== appId));
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  if (!session) return <p className="text-red-500">Please log in to see your applied jobs.</p>;
  if (loading) return <p>Loading...</p>;
  if (applications.length === 0) return <p>You haven’t applied to any jobs yet.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">📝 Jobs You Applied For</h1>
      <ul className="space-y-6">
        {applications.map((app) => (
          <li key={app._id} className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
            {app.job ? (
              <>
                <h2 className="text-xl font-semibold text-primary">{app.job.title}</h2>
                <p className="text-secondary mb-1">
                  Company: {app.job.company} | Location: {app.job.location || "Remote"}
                </p>
                {app.job.salary_range && <p className="text-secondary mb-1">Salary: {app.job.salary_range}</p>}
                {app.job.benefits?.length > 0 && (
                  <p className="text-secondary mb-1">Benefits: {app.job.benefits.join(", ")}</p>
                )}
                {app.job.requirements?.length > 0 && (
                  <ul className="list-disc list-inside mb-2 text-secondary">
                    {app.job.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                )}
                {app.job.application_deadline && (
                  <p className="text-red-500 font-semibold mb-2">
                    Deadline: {app.job.application_deadline}
                  </p>
                )}
                <p className="text-gray-500 text-sm mb-2">
                  Applied on: {new Date(app.appliedAt).toLocaleString()}
                </p>
              </>
            ) : (
              <p className="text-red-500 mb-2">Job details not found (maybe deleted)</p>
            )}

            <button
              onClick={() => handleDelete(app._id)}
              className="btn btn-outline btn-error mt-2"
            >
              Delete Application
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppliedJobsList;
