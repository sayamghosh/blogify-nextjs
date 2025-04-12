import React from "react";
import Image from "next/image";
import Like from "@/components/buttons/like";
import Share from "@/components/buttons/share";
import { BlogType } from "@/helper/blogTypes";
import { formatDate } from "@/utils/formatDate";

export default function BlogCard1({ blog }: { blog: BlogType }) {
  return (
    <div className="w-full flex flex-col lg:flex-row lg:gap-20 gap-1 items-center justify-center border-b border-b-gray-500 pb-4">
      <Image
        src={blog.coverImageUrl}
        width={400}
        height={400}
        alt="image"
        className="rounded-md"
       />
      <div className="w-full flex flex-col gap-4 items-start justify-start">
        <div className="text-gray-300 w-full">
          <h1 className="text-2xl font-bold mt-4 w-full text-left">
            {blog.title}
          </h1>
          <p className="text-left mt-2 text-lg w-full">{blog.content.slice(0,299)+"..."}</p>
        </div>
        <div className="grid grid-cols-3 mt-4 w-full">
          <span>
            <p>Cetegory</p>
            <p>{blog.category}</p>
          </span>
          <span>
            <p>Published</p>
            <p className="text-left">{formatDate(blog.createdAt)}</p>
          </span>
          <span>
            <p>Author</p>
            <p>{blog.author}</p>
          </span>
        </div>
        <div className="mt-6 w-full flex justify-between items-center">
          <span className="flex gap-2">
            <Like />
            <Share />
          </span>
          <button className="border px-6 py-2 rounded-lg">Read More</button>
        </div>
      </div>
    </div>
  );
}
