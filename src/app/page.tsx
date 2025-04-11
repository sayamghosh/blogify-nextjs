import React from "react";
import Navbar from "@/components/shared/navbar";
import BlogCard1 from "@/components/cards/blogCard1";

export default async function Page() {
  
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/getall`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    const blog = data.blogs;
  
  
  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="w-full h-full pt-5">
        <BlogCard1 blog={blog[0]} />
      </div>
    </div>
  );
}
