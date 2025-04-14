'use client';
import React from 'react'
import Navbar from '@/components/shared/navbar'
import BlogCard2 from '@/components/cards/blogCard2'
import { BlogType } from '@/helper/blogTypes'
import { getAuthToken } from '@/utils/cookie-store'
import { useState ,useEffect} from 'react'

export default function Page() {

  const [likedBlog, setLikedBlog] = useState([]);

  async function fetchLikedBlogs() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/likedblog`,
      {
        method: "POST",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${await getAuthToken()}`,
          },
      }
    );
    const data = await res.json();
    const blog = data.blog;
    setLikedBlog(blog);
  }
    
useEffect(()=>{
    fetchLikedBlogs()
})

  return (
    <div className="w-full h-screen">
          <Navbar />
          <div className=" w-[95%] lg:max-w-5xl h-full pt-5 mx-auto">
            {/* <BlogCard1 blog={blog[0]} /> */}
            {likedBlog  && (
              <div className="grid lg:grid-cols-3 gap-x-6 gap-y-2 pt-2 pb-10">
              {likedBlog.map((item:BlogType,index:number)=>(
                <BlogCard2 blog={item} key={index} />
              ))} 
            </div>
            )}  
          </div>
        </div>
  )
}
