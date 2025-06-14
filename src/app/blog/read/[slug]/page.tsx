import React, { Suspense } from "react";
import Navbar from "@/components/shared/navbar";
import Image from "next/image";
import Like from "@/components/buttons/like";
import Share from "@/components/buttons/share";
import { formatDate } from "@/utils/formatDate";

export default async function Page({ params }: { params: Promise<{ slug?: string}> }) {
  const slug = (await params).slug; 

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/getone`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: slug }),
      next: { revalidate: 60 },
    }
  );

  const { blog } = await res.json(); // Log the data to see the response

  return (
    <Suspense fallback={<div className="p-10 text-center text-lg">Loading page...</div>}>
    <div className="w-full h-screen">
      <Navbar />
      <div className="w-[95%] lg:max-w-5xl h-full  mx-auto mt-6 ">
        <div className="banner w-full">
          <div className="relative w-full h-56 lg:h-96 rounded-md overflow-hidden ">
            <Image
              src={blog.coverImageUrl}
              alt="cover image"
              fill
              className="object-cover rounded-md"
            />
          </div>
        </div>
        <section className="lg:flex">
          <div className="content pt-6 lg:w-8/12 flex flex-col gap-4 lg:border-r border-b lg:border-b-0 lg:border-r-gray-800 border-b-gray-800 lg:pr-4 pb-4">
            <h1 className="text-4xl font-semibold w-full">{blog.title}</h1>
            <p className="text-md text-left lg:max-w-[90%] text-gray-300">{blog.content}</p>
          </div>
          <div className="lg:w-4/12 pt-6 flex flex-col">
            <span className="flex gap-4 items-center lg:pl-10 pl-4 border-b border-b-gray-800 pb-4">
              <Like id={blog._id} />
              <Share blogid={blog._id} title={blog.title} />
            </span>
            <div className="grid grid-cols-2 gap-6 lg:pl-10 pl-4 pb-14 pt-6">
              <span className="flex flex-col">
                <p>Published</p>
                <p className="text-gray-400">{formatDate(blog.createdAt)}</p>
              </span>
              <span className="flex flex-col">
                <p>Category</p>
                <p className="text-gray-400">{blog.category}</p>
              </span>
              <span className="flex flex-col">
                <p>Reading Time</p>
                <p className="text-gray-400">5 mins</p>
              </span>
              <span className="flex flex-col">
                <p>Author</p>
                <p className="text-gray-400">{blog.author}</p>
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
    </Suspense>
  );
}
