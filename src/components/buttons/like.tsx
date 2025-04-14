"use client";
import React from "react";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { getAuthToken } from "@/utils/cookie-store";

export default function Like({ id }: { id: string }) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  async function fetchLikes() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/like/count`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ blogId: id }),
      }
    );
    const data = await res.json();
    setLikes(data.count);
  }

  async function fetchIsLiked() {
    const token = await getAuthToken();
    if(!token) {
      return;
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/like/check`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
         },
        body: JSON.stringify({ blogId: id}),
      }
    );
    const data = await res.json();
    setIsLiked(data.liked);
  }

  useEffect(() => {
    fetchIsLiked();
    fetchLikes();
  });



  async function handleLike() {
    const token = getAuthToken();
    if (!token) {
      return; //TODO: ADD TOAST MESSAGE
    }
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/like/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getAuthToken()}`,
        },
        body: JSON.stringify({ blogId: id }),
      });
      fetchLikes();
      fetchIsLiked();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      onClick={handleLike}
      className="w-fit  px-3 py-1 flex gap-2 border rounded-full items-center cursor-pointer">
      <Heart className={`${isLiked ? "text-red-500":"text-white"}`} size={15} />
      <p className="text-white">{likes}</p>
    </div>
  );
}
