'use client'
import { SessionProvider } from "next-auth/react";

const NextAuthSessionProviders = ({ children }) => {
  return (
    <div>
      <SessionProvider>{children}</SessionProvider>
    </div>
  );
};

export default NextAuthSessionProviders;
