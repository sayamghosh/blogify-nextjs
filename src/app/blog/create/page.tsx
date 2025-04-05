"use client";
import React from "react";
import { useForm } from "react-hook-form";
import {getAuthToken} from '@/utils/cookie-store'

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data:any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("image", data.image[0]); // file input returns an array

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/create`, {
        method: "POST",
        headers:{
          "Authorization": `Bearer ${await getAuthToken()}`
        },
        body: formData, // No need to set Content-Type, browser sets it automatically
      });

      const result = await res.json();
      console.log(result);
      reset(); // clear form
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div>
        <h1 className="text-3xl font-bold mb-4">Create Blog</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 flex flex-col w-80 mx-auto gap-1 bg-blue-400 rounded-md">
          <input
            {...register("image", { required: "Image is required" })}
            className="w-full"
            type="file"
            accept="image/*"
          />
          <label htmlFor="title">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            id="title"
            className="bg-white px-2 py-1 text-gray-600 rounded-md"
          />
          <label htmlFor="content">Content</label>
          <textarea
            {...register("content", { required: "Content is required" })}
            id="content"
            className="bg-white px-2 py-1 text-gray-600 rounded-md"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
