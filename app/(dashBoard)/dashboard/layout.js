import Link from "next/link";
import { Home, Briefcase, User, Settings } from "lucide-react";
import Logo from "@/app/Components/Logo/Logo";


const DashBoardLayout = ({ children }) => {
  const links = (
    <>
      <li>
        <Link
          href="/"
          className="flex items-center gap-2 text-white hover:text-secondary"
        >
          <Home size={18} /> Home
        </Link>
      </li>
      <li>
        <Link
          href="/dashboard/jobPost"
          className="flex items-center gap-2 text-white hover:text-secondary"
        >
          <Briefcase size={18} /> Job Poste
        </Link>
      </li>
      <li>
        <Link
          href="/dashboard/postedByHR"
          className="flex items-center gap-2 text-white hover:text-secondary"
        >
          <User size={18} /> Posted By HR
        </Link>
      </li>
      <li>
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-2 text-white hover:text-secondary"
        >
          <Settings size={18} /> Settings
        </Link>
      </li>
    </>
  );

  return (
    <div className="drawer lg:drawer-open max-w-screen-xl mx-auto">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar for mobile */}
        <div className="navbar bg-primary text-white w-full lg:hidden">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 font-semibold">Dashboard</div>
          <div className="bg-accent/70 px-3 rounded-2xl">
            <Logo></Logo>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu min-h-full w-80 p-4 bg-primary text-white space-y-2">
          <div className="bg-accent/70 px-3 rounded-2xl flex justify-center">
            <Logo></Logo>
          </div>
          <h2 className="text-lg font-bold mb-4">📊 Dashboard</h2>
          {links}
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;
