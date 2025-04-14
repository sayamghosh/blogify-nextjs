'use client'
import React from 'react'
import {Heart} from 'lucide-react'
import { useState ,useEffect} from 'react';
import {getAuthToken} from '@/utils/cookie-store'

export default function Like({id}:{id:string}) {
  
  const [likes, setLikes] = useState(0);
  // const [liked, setLiked] = useState(false);

  async function fetchLikes(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/like/count`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blogId: id }),
    })
    const data = await res.json();
    setLikes(data.count);
    console.log(data.count);
  }

  useEffect(() => {
    fetchLikes();
  }, [id]);

  async function handleLike(){
    const token = getAuthToken()
    if(!token){
      return  //TODO: ADD TOAST MESSAGE
    }
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/like/toggle`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getAuthToken()}`
        },
        body: JSON.stringify({ blogId: id }),
      })
      fetchLikes()
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <div onClick={handleLike} className='w-fit px-3 py-1 flex gap-2 border rounded-full items-center cursor-pointer'><Heart size={15} /><p>{likes}</p></div>
  )
}
