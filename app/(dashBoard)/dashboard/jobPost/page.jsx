"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { Label } from "@/app/Components/ui/label";
import { Input } from "@/app/Components/ui/input";
import { Textarea } from "@/app/Components/ui/textarea";
import { Button } from "@/app/Components/ui/button";

export default function JobPostForm() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    employment_type: "",
    description: "",
    requirements: [""],
    benefits: [""],
    application_deadline: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleArrayChange = (index, field, value) => {
    const arr = [...formData[field]];
    arr[index] = value;
    setFormData((prev) => ({ ...prev, [field]: arr }));
  };

  const addField = (field) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session?.user) {
      Swal.fire("Error", "You must be logged in to post a job", "error");
      return;
    }

    const jobData = {
      ...formData,
      hr_name: session.user.name || "Unknown HR",
      hr_email: session.user.email,
    };

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData),
    });

    if (res.ok) {
      Swal.fire("✅ Success", "Job posted successfully!", "success");
      setFormData({
        title: "",
        company: "",
        location: "",
        employment_type: "",
        description: "",
        requirements: [""],
        benefits: [""],
        application_deadline: "",
      });
    } else {
      Swal.fire("❌ Error", "Something went wrong!", "error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 max-w-2xl mx-auto bg-accent rounded-2xl"
    >
      <h2 className="text-center text-3xl font-bold text-primary">Post Job</h2>

      <div>
        <Label>Job Title</Label>
        <Input name="title" value={formData.title} onChange={handleChange} />
      </div>

      <div>
        <Label>Company</Label>
        <Input name="company" value={formData.company} onChange={handleChange} />
      </div>

      <div>
        <Label>Location</Label>
        <Input name="location" value={formData.location} onChange={handleChange} />
      </div>

      <div>
        <Label>Employment Type</Label>
        <Input
          name="employment_type"
          value={formData.employment_type}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label>Description</Label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      {/* Requirements */}
      <div>
        <Label>Requirements</Label>
        {formData.requirements.map((req, i) => (
          <Input
            key={i}
            value={req}
            onChange={(e) => handleArrayChange(i, "requirements", e.target.value)}
            className="mt-2"
          />
        ))}
        <Button type="button" onClick={() => addField("requirements")} className="mt-2">
          + Add Requirement
        </Button>
      </div>

      {/* Benefits */}
      <div>
        <Label>Benefits</Label>
        {formData.benefits.map((ben, i) => (
          <Input
            key={i}
            value={ben}
            onChange={(e) => handleArrayChange(i, "benefits", e.target.value)}
            className="mt-2"
          />
        ))}
        <Button type="button" onClick={() => addField("benefits")} className="mt-2">
          + Add Benefit
        </Button>
      </div>

      {/* Application Deadline */}
      <div>
        <Label>Application Deadline</Label>
        <Input
          type="date"
          name="application_deadline"
          value={formData.application_deadline}
          onChange={handleChange}
        />
      </div>

      {/* HR Info */}
      {session?.user && (
        <div className="mt-4 p-2 border rounded bg-gray-50">
          <p>
            <b>Posting as:</b> {session.user.name || "Unknown"} ({session.user.email})
          </p>
        </div>
      )}

      <Button type="submit" className="mt-4 w-full">
        Post Job
      </Button>
    </form>
  );
}
