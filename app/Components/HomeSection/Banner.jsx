'use client'
import React from "react";
import img from "../../../public/Intern.png";
import Image from "next/image";
import { useSession } from "next-auth/react";

const Banner = () => {
  return (
    <div>
      <Image src={img} alt="banner" className="shadow shadow-primary"></Image>
    </div>
  );
};

export default Banner;
