"use client";

import registerUser from "@/app/actions/auth/registerUser";
import React, { useState } from "react";

const Register = () => {
  const [status, setStatus] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const payload = { name, email, password };
    const result = await registerUser(payload);

    setStatus(result.message);
    if (result.success) {
      form.reset();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-full max-w-md shadow-lg bg-base-100">
        <form onSubmit={handleRegister} className="card-body">
          <h2 className="text-2xl font-bold text-center text-primary">
            Create Account
          </h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-secondary">Full Name</span>
            </label>
            <br />
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-secondary">Email</span>
            </label>
            <br />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-secondary">Password</span>
            </label>
            <br />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Register
            </button>
          </div>

          {status && (
            <p className="text-center mt-3 text-sm text-secondary">{status}</p>
          )}

          <p className="text-center text-sm mt-3">
            Already have an account?{" "}
            <a href="/login" className="text-primary font-semibold">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
