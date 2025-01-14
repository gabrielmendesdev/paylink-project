import { nextAuthOptions } from "@/app/auth-options/auth";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
export const getServerAuthSession = () => getServerSession(nextAuthOptions);
export const GetSession = () => {
  if (typeof window === "undefined") {
    return getServerAuthSession();
  }
  return getSession();
};
