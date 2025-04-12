import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-2 px-4 md:px-0">
        <Link href={"/"}>
        <Image src={'/logo.svg'} width={30} height={30} alt="logo"></Image>
        </Link>
        <ul className="hidden md:flex gap-10">
          <Link href={"/"}>Home</Link>
          <Link href={"/profile"}>Profile</Link>
          <Link href={"/"}>Liked</Link>
          <li href={"/"}>My blogs</li>
        </ul>
        <Link href={"/blog/create"} className="py-1 px-3 bg-[#FFD11A] rounded-md text-black text-xs">Create</Link>
      </div>
    </nav>
  );
}
