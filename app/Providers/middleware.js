import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import React from "react";

const middleware = async (req) => {
  const token = await getToken({ req });
  if (token) console.log(token, 111);
  return NextResponse.next();
};

export default middleware;
