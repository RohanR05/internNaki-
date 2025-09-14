import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center space-x-1">
      <h1 className="text-xl md:text-3xl font-extrabold tracking-tight transition-colors duration-300 hover:text-primary">
        <span className="text-primary">intern</span>
        <span className="text-secondary">Naki</span>
        <span>?</span>
      </h1>
    </Link>
  );
};

export default Logo;
