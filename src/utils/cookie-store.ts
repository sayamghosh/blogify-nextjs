"use server";

import { cookies } from "next/headers";

export const getCookie = async (key: string) => {
  return (await cookies()).get(key)?.value;
};

export const setAuthToken = async (token: string) => {
  try {
    const status = (await cookies()).set("token", token);
    if (status) return;
    throw new Error("Failed to set token");
  } catch {
    throw new Error("Failed to set token");
  }
};

export const getAuthToken = async () => {
  return await getCookie("token");
};

export const removeAuthToken = async () => {
  try {
    const status = (await cookies()).delete("token");
    if (status) return;
    throw new Error("Failed to remove token");
  } catch {
    throw new Error("Failed to remove token");
  }
};
