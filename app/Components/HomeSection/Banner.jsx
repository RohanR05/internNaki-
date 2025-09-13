'use client'
import React from "react";
import img from "../../../public/Intern.png";
import Image from "next/image";
import { useSession } from "next-auth/react";

const Banner = () => {
  const session = useSession();
  return (
    <div>
      <Image src={img} alt="banner" className="shadow shadow-primary"></Image>
      {JSON.stringify(session)}
    </div>
  );
};

export default Banner;
