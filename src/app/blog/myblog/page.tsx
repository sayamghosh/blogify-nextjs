import React from 'react'
import Navbar from '@/components/shared/navbar'
import BlogCard1 from '@/components/cards/blogCard1'
import BlogCard2 from '@/components/cards/blogCard2'
import { BlogType } from '@/helper/blogTypes'
import { getAuthToken } from '@/utils/cookie-store'

export default async function page() {

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/myblog`,
        {
          method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${await getAuthToken()}`,
            },
          next: { revalidate: 30 },
        }
      );
      const data = await res.json();
      const blog = data.blog;

  return (
    <div className="w-full h-screen">
          <Navbar />
          <div className=" w-[95%] lg:max-w-5xl h-full pt-5 mx-auto">
            {/* <BlogCard1 blog={blog[0]} /> */}
            <div className="grid lg:grid-cols-3 gap-x-6 gap-y-2 pt-2 pb-10">
              {blog.map((item:BlogType,index:number)=>(
                <BlogCard2 blog={item} key={index} />
              ))}
              
            </div>
          </div>
        </div>
  )
}
