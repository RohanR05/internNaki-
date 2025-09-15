"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const PostedByHR = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["hrJobs", session?.user?.email],
    queryFn: async () => {
      const res = await fetch(`/api/jobs/hr?hr_email=${session.user.email}`);
      return res.json();
    },
    enabled: !!session?.user?.email,
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the job.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        Swal.fire("Deleted!", "Job has been deleted.", "success");
        queryClient.invalidateQueries(["hrJobs", session.user.email]);
      }
    }
  };

  const handleUpdate = async (job) => {
    const { value: formValues } = await Swal.fire({
      title: "Update Job",
      html:
        `<input id="swal-title" class="swal2-input" placeholder="Job Title" value="${job.title}">` +
        `<input id="swal-company" class="swal2-input" placeholder="Company" value="${job.company}">` +
        `<input id="swal-location" class="swal2-input" placeholder="Location" value="${job.location}">` +
        `<input id="swal-employment" class="swal2-input" placeholder="Employment Type" value="${job.employment_type}">` +
        `<input id="swal-deadline" type="date" class="swal2-input" placeholder="Deadline" value="${job.application_deadline}">` +
        `<textarea id="swal-description" class="swal2-textarea" placeholder="Description">${job.description}</textarea>`,
      preConfirm: () => {
        return {
          title: document.getElementById("swal-title").value,
          company: document.getElementById("swal-company").value,
          location: document.getElementById("swal-location").value,
          employment_type: document.getElementById("swal-employment").value,
          application_deadline: document.getElementById("swal-deadline").value,
          description: document.getElementById("swal-description").value,
        };
      },
    });

    if (formValues) {
      const res = await fetch(`/api/jobs/${job._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });
      const data = await res.json();
      if (data.success) {
        Swal.fire("Updated!", "Job has been updated.", "success");
        queryClient.invalidateQueries(["hrJobs", session.user.email]);
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!jobs?.length) return <p>No jobs posted yet.</p>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {jobs.map((job) => (
        <div key={job._id} className="p-6 bg-accent rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-primary">{job.title}</h2>
          <p className="text-secondary font-medium">{job.company}</p>
          <p className="text-primary/80">{job.location}</p>
          <p className="text-primary mt-1">
            <strong>Employment Type:</strong> {job.employment_type}
          </p>
          <p className="text-primary mt-1">
            <strong>Deadline:</strong> {job.application_deadline}
          </p>

          <div className="mt-4">
            <h3 className="text-lg font-semibold text-primary">Description</h3>
            <p className="text-secondary">{job.description}</p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold text-primary">Requirements</h3>
            <ul className="list-disc list-inside text-secondary">
              {job.requirements?.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold text-primary">Benefits</h3>
            <ul className="list-disc list-inside text-secondary">
              {job.benefits?.map((ben, i) => (
                <li key={i}>{ben}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4 text-sm text-primary/80">
            <p>
              <strong>Posted by:</strong> {job.hr_name} ({job.hr_email})
            </p>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              className="btn btn-primary"
              onClick={() => handleUpdate(job)}
            >
              Update
            </button>
            <button
              className="btn btn-destructive"
              onClick={() => handleDelete(job._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostedByHR;
