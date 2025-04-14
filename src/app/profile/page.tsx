import React from "react";
import Navbar from "@/components/shared/navbar";
import { getAuthToken } from "@/utils/cookie-store";
import Image from "next/image";
import { formatDate } from "@/utils/formatDate";

export default async function Page() {
  const token = await getAuthToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/dashboard`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const { user } = await res.json();

  return (
    <>
      <Navbar />
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col gap-3 justify-center items-center bg-[#1A1A1A] shadow-md rounded-lg p-6">
          <Image
            src={user.profileImageURL}
            height={100}
            width={100}
            alt="profile"
            className="rounded-full"
          ></Image>
          <div className="flex flex-col gap-2 w-full">
            <span className="flex gap-2 items-center"> <p className="text-lg">Email:</p>  <p>{user.email}</p> </span>
            <span className="flex gap-2 items-center"> <p className="text-lg"> ROLE:</p> <p>{user.role}</p> </span>
            <span className="flex gap-2 items-center"> <p className="text-lg">Joined:</p>  <p>{formatDate(user.createdAt)}</p> </span>
            <span className="flex gap-2 items-center"> <p className="text-lg">Full Name:</p>  <p>{user.fullName}</p> </span>
          </div>
        </div>
      </div>
    </>
  );
}
