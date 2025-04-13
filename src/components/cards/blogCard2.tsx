import React from "react";
import Image from "next/image";
import ReadMore from "@/components/buttons/readMore";
import Like from "@/components/buttons/like";
import Share from "@/components/buttons/share";
import Link from "next/link";

import { BlogType } from "@/helper/blogTypes";



export default function BlogCard2({blog}: {blog: BlogType}) {

  return (
    <div className="border-b border-b-gray-500 pb-4">
      <div className="relative w-full  h-44 rounded-md overflow-hidden my-2 ">
        <Image
          src={blog.coverImageUrl}
          alt="cover image"
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="w-full flex flex-col gap-1 my-2">
        <h1>{blog.title}</h1>
        <p className="text-gray-400">{blog.category}</p>
      </div>
      <div className="flex items-center justify-between">
        <span className="flex gap-2 items-center">
          <Like />
          <Share />
        </span>
        <Link href={`/blog/read/${blog._id}`} className="cursor-pointer" >
          <ReadMore />
        </Link>
      </div>
    </div>
  );
}
