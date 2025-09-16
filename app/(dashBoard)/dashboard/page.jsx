"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";



const DashBoard = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-lg text-neutral">⚠️ You are not logged in.</p>
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="max-w-screen-md mx-auto p-6">
      <div className="card bg-accent shadow-xl border border-neutral">
        <div className="card-body items-center text-center">
          {/* Profile Image */}
          {user.image ? (
            <Image
              src={user?.image}
              alt={user?.name}
              width={100}
              height={100}
              className="rounded-full border-4 border-primary"
            />
          ) : (
            <div className="avatar placeholder">
              <div className="bg-secondary text-white rounded-full w-24">
                {user.name ? user.name.charAt(0) : "U"}
              </div>
            </div>
          )}

          {/* Profile Info */}
          <h2 className="card-title text-2xl text-primary mt-4">
            {user.name || "Unknown User"}
          </h2>
          <p className="text-primary">{user.email}</p>

          {/* Role */}
          <span className="badge badge-secondary font-bold text-primary mt-2">
            {user.role || "user"}
          </span>

          {/* Extra info for credentials-based accounts */}
          {user.createdAt && (
            <p className="text-sm text-neutral/70 mt-2">
              Joined on {new Date(user.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
