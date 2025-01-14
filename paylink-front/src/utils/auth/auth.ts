/* eslint-disable @typescript-eslint/no-explicit-any */
import { nextAuthOptions } from "@/app/auth-options/auth";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

export const getServerAuthSession = () => getServerSession(nextAuthOptions);

export const GetSession = (): any => {
  if (typeof window === "undefined") return getServerAuthSession();
  return getSession();
};

export const createRequestAuthObj = async () => {
  const session = await GetSession();
  if (!session) return {};
  return {
    headers: {
      Authorization: `Bearer ${session.user.token ?? session.user?.token}`,
    },
  };
};
