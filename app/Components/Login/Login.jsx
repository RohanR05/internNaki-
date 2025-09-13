"use client";

import React from "react";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div className="">
      <button
        onClick={() => signIn()} 
        className="btn btn-secondary text-primary px-6 py-2 text-lg font-semibold"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
