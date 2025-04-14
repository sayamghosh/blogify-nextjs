"use client";
import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { getAuthToken, setAuthToken } from "@/utils/cookie-store";
import { useRouter } from "next/navigation";
import { House, User, BookHeart, SwatchBook } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const auth = await getAuthToken();
      setToken(auth);
    };
    fetchToken();
  }, []);

  async function handleLogout() {
    await setAuthToken("");
    setToken(null); // clear state on logout
    router.push("/"); // redirect to login page
  }

  return (
    <nav className="w-full bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-2 px-4 md:px-0">
        <Link href={"/"}>
          <Image src={"/logo.svg"} width={30} height={30} alt="logo"></Image>
        </Link>
        <ul className="hidden md:flex gap-10">
          <Link href={"/"}>Home</Link>
          <Link href={"/profile"}>Profile</Link>
          <Link href={"/blog/liked"}>Liked</Link>
          <Link href={"/blog/myblog"}>My blogs</Link>
        </ul>
        <ul className="md:hidden fixed bottom-0 left-0 w-full bg-[#1A1A1A] flex justify-around items-center py-2 z-50">
          <Link href={"/"}>
            <House />
          </Link>
          <Link href={"/profile"}>
            <User />
          </Link>
          <Link href={"/blog/liked"}>
            <BookHeart />
          </Link>
          <Link href={"/blog/myblog"}>
            <SwatchBook />
          </Link>
        </ul>

        <span className="flex gap-2 items-center">
          <Link
            href={token ? "/blog/create" : "/login"}
            className="py-1 px-3 bg-[#FFD11A] rounded-md text-black text-xs"
          >
            {token ? "Create" : "Login"}
          </Link>
          {token && (
            <LogOut
              size={20}
              className="cursor-pointer"
              onClick={() => {
                handleLogout();
              }}
            />
          )}
        </span>
      </div>
    </nav>
  );
}
