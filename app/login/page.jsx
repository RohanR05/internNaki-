"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // live error message

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // reset error

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      setError(result.error); // live message
    } else {
      // successful login → redirect
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center">
      <div className="card w-full max-w-md shadow-lg bg-base-100 p-6">
        <h2 className="text-2xl font-bold text-center text-primary mb-4">
          Login
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {" "}
          <label className="label">
            <span className="label-text text-secondary">Email</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />{" "}
          <label className="label">
            <span className="label-text text-secondary">Password</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <div className="alert alert-error shadow-lg text-center">
              {error}
            </div>
          )}
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-primary font-semibold">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
