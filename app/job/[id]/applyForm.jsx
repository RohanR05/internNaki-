"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react"; // Assuming you use NextAuth for session

const ApplyForm = ({ jobId }) => {
  const { data: session } = useSession(); // get logged-in user
  const [loading, setLoading] = useState(false);

  // Make sure user is logged in
  if (!session) {
    return <p className="text-red-500">Please log in to apply.</p>;
  }

  const handleApply = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId,
          name: session.user.name,
          email: session.user.email,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Applied Successfully!",
          text: data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: data.message,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong!",
      });
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-secondary">
        Applying as: <span className="font-semibold">{session.user.name}</span> (
        {session.user.email})
      </p>
      <button
        onClick={handleApply}
        className="btn btn-primary"
        disabled={loading}
      >
        {loading ? "Applying..." : "Apply Now"}
      </button>
    </div>
  );
};

export default ApplyForm;
