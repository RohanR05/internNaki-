"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";

export default function Error({ error, reset }) {
  const router = useRouter();

  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <div className="p-6 bg-red-100 rounded-full mb-6">
        <AlertTriangle className="text-red-600 w-12 h-12" />
      </div>
      <h2 className="text-3xl font-bold text-primary mb-4">
        Oops! Something went wrong
      </h2>
      <p className="text-gray-600 mb-8 max-w-lg">
        We encountered an unexpected error. Don’t worry, you can try again or go
        back to the homepage.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="btn bg-primary text-white hover:bg-secondary transition"
        >
          Try Again
        </button>
        <button
          onClick={() => router.push("/")}
          className="btn bg-secondary text-white hover:bg-primary transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
