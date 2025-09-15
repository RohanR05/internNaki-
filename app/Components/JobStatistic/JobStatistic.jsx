"use client";

import { useEffect, useState } from "react";
import CountUp from "react-countup";

const JobStatistic = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/JobStats"); // API route
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-40">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-10 bg-accent rounded-2xl my-6 md:my-12 lg:my-16">
      <h2 className="text-3xl font-bold text-center mb-10 text-primary">
        📊 Job Statistics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Total Job Posts */}
        <div className="bg-base-100 p-8 rounded-2xl shadow-lg shadow-primary border-2 border-secondary text-center hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-semibold mb-3 text-secondary">Job Posts</h3>
          <p className="text-5xl font-bold text-primary">
            <CountUp end={stats.totalJobs} duration={2} />
          </p>
        </div>

        {/* Total Applications */}
        <div className="bg-base-100 p-8 rounded-2xl shadow-lg shadow-secondary border-2 border-primary text-center hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-semibold mb-3 text-primary">Applications</h3>
          <p className="text-5xl font-bold text-secondary">
            <CountUp end={stats.totalApplications} duration={2} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobStatistic;
