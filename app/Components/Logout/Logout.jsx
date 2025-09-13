"use client";

import React from "react";
import { signOut } from "next-auth/react";
import Swal from "sweetalert2";

const Logout = () => {
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#127957", // primary color
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut({ callbackUrl: "/" }); // redirect after logout
      }
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="btn btn-secondary text-primary px-4 py-2"
    >
      Logout
    </button>
  );
};

export default Logout;
