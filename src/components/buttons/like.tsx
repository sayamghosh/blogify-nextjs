"use client";
import { Heart } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

export default function Like({ id }: { id: string }) {
  const { token } = useAuth();

  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // function localLiker(){

  // }

  async function fetchLikes() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/like/count`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId: id }),
      }
    );
    const data = await res.json();
    setLikes(data.count);
  }

  async function fetchIsLiked() {
    if (!token) {
      return;
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/like/check`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ blogId: id }),
      }
    );
    const data = await res.json();
    console.log(data);
    setIsLiked(data.liked);
  }

  useEffect(() => {
    fetchIsLiked();
    fetchLikes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLike() {
    if (!token) {
      toast.dismiss();
      toast.error("Please login!", {
        icon: "👤",
      });
      return;
    }
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/like/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ blogId: id }),
      });
      fetchIsLiked();
      fetchLikes();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      onClick={handleLike}
      className="w-fit  px-3 py-1 flex gap-2 border rounded-full items-center cursor-pointer"
    >
      <Heart
        className={`${isLiked ? "text-red-500" : "text-white"}`}
        size={15}
      />
      <Toaster position="bottom-center" />
      <p className="text-white">{likes}</p>
    </div>
  );
}
