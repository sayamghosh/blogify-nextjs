import React from "react";
import Image from "next/image";
import Like from "@/components/buttons/like";
import Share from "@/components/buttons/share";
import { BlogType } from "@/helper/blogTypes";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";

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
      <div className="w-full flex flex-col gap-8 items-start justify-start">
        <div className="text-gray-300 w-full">
          <h1 className="text-2xl font-bold mt-4 w-full text-left">
            {blog.title}
          </h1>
          <p className="text-left mt-2 text-lg w-full">{blog.content.length>299 ?  blog.content.slice(0,299)+"..." : blog.content}</p>
        </div>
        <div className="grid grid-cols-3 mt-4 w-full">
          <span>
            <p>Cetegory</p>
            <p className="text-gray-400">{blog.category}</p>
          </span>
          <span>
            <p>Published</p>
            <p className="text-left text-gray-400">{formatDate(blog.createdAt)}</p>
          </span>
          <span>
            <p>Author</p>
            <p className="text-gray-400">{blog.author}</p>
          </span>
        </div>
        <div className="mt-6 w-full flex justify-between items-center">
          <span className="flex gap-2">
            <Like />
            <Share />
          </span>
          <Link href={`/blog/read/${blog._id}`} >
            <button className="border px-6 py-2 rounded-lg cursor-pointer">Read More</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
