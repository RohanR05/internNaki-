"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Logo from "@/app/Components/Logo/Logo";

const DashBoardLayout = ({ children }) => {
  const { data: session } = useSession();
  const role = session?.user?.role || "user";
  const pathname = usePathname();

  const roleLinks = {
    user: [
      { href: "/", label: "Home", emoji: "🏠" },
      { href: "/dashboard/appliedJobPost", label: "Applied Jobs", emoji: "📄" },
    ],
    hr: [
      { href: "/", label: "Home", emoji: "🏠" },
      { href: "/dashboard/jobPost", label: "Job Posts", emoji: "💼" },
      { href: "/dashboard/postedByHR", label: "Posted By HR", emoji: "👤" },
      { href: "/dashboard/applicants", label: "Applicants", emoji: "🧑‍💼" },
    ],
  };

  const links = roleLinks[role] || [];

  return (
    <div className="drawer lg:drawer-open max-w-screen-xl mx-auto">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-primary text-white w-full lg:hidden">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost text-white hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-6 w-6 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 font-semibold">Dashboard</div>
          <div className="bg-accent/70 px-3 rounded-2xl">
            <Logo />
          </div>
        </div>

        <main className="p-6">{children}</main>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu min-h-full w-80 p-4 bg-primary text-white space-y-2">
          <div className="bg-accent/70 px-3 rounded-2xl flex justify-center">
            <Logo />
          </div>
          <h2 className="text-lg font-bold mb-4">📊 Dashboard</h2>

          {links.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-transform duration-200 hover:scale-105
                  ${pathname === link.href ? "bg-secondary text-white" : "text-neutral hover:text-secondary"}`}
              >
                <span>{link.emoji}</span> {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;
