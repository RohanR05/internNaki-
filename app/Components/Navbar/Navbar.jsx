"use client";

import Link from "next/link";
import React from "react";
import Logo from "../Logo/Logo";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession(); // useSession hook

  const links = (
    <>
      <li className="font-medium text-lg ">
        <Link href={"/"}>Home</Link>
      </li>
      <li className="font-medium text-lg ">
        <Link href={"/job"}>Job Post</Link>
      </li>
      <li className="font-medium text-lg">
        <Link href="/dashboard">Dashboard</Link>
      </li>
      <li className="font-medium text-lg">
        <Link href="/aboutUs">About Us</Link>
      </li>
      <li className="font-medium text-lg">
        <Link href="/contactUs">Contact Us</Link>
      </li>
    </>
  );

  const pathName = usePathname();
  if (!pathName.includes("dashboard")) {
    return (
      <div className="navbar bg-accent text-primary shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Logo />
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        <div className="navbar-end gap-2">
          <ThemeToggle />
          {session?.user ? <Logout /> : <Login />}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Navbar;
