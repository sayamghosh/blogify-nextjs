import React, { Suspense } from "react";
import Navbar from "@/components/shared/navbar";
import BlogCard1 from "@/components/cards/blogCard1";
import BlogCard2 from "@/components/cards/blogCard2";
import { BlogType } from "@/helper/blogTypes";

export default async function Page() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/getall`,
    {
      method: "GET",
      next: { revalidate: 60 },
    }
  );
  const data = await res.json();
  const blog = data.blogs;
  return (
    <Suspense
      fallback={<div className="p-10 text-center text-lg">Loading page...</div>}
    >
      <div className="w-full h-screen">
        <Navbar />
        <div className=" w-[95%] lg:max-w-5xl h-full pt-5 mx-auto">
          <BlogCard1 blog={blog[0]} />
          <div className="grid lg:grid-cols-3 gap-x-6 gap-y-2 pt-2 pb-10">
            {blog.map((item: BlogType) => (
              <BlogCard2 blog={item} key={item._id} />
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
