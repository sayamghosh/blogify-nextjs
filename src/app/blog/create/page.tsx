"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { getAuthToken } from "@/utils/cookie-store";
import { useRouter } from "next/navigation";
import Navbar from "@/components/shared/navbar";

export default function Page() {
  const router = useRouter();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  type FormDataType = {
    title: string;
    content: string;
    image: FileList;
    category: string; // file input returns an array
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormDataType>();

  const onSubmit = async (data: FormDataType) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("category", data.category);
    formData.append("image", data.image[0]); // file input returns an array

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${await getAuthToken()}`,
          },
          body: formData, // No need to set Content-Type, browser sets it automatically
        }
      );

      const result = await res.json();
      console.log(result);
      reset(); // clear form
      setImagePreview(null); // clear image preview
      if (result.success) {
        router.push("/"); // redirect to home page
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4">Create Blog</h1>
          {imagePreview && (
            <Image
              src={imagePreview}
              alt="Image Preview"
              width={200}
              height={200}
              className="object-cover mb-4"
            />
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 flex flex-col w-80 mx-auto gap-1 bg-[#1A1A1A] rounded-md"
          >
            <input
              {...register("image", { required: "Image is required" })}
              onChange={(e) => {
                handleImageChange(e);
                register("image").onChange(e);
              }}
              className="w-full bg-slate-600 px-2 py-1 rounded-md"
              type="file"
              accept="image/*"
            />
            {errors.image && (
              <span className="text-red-500">
                {String(errors.image?.message)}
              </span>
            )}{" "}
            {/* ❌ TypeScript doesn’t know it's a string */}
            <label htmlFor="title">Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              id="title"
              className="bg-white px-2 py-1 text-gray-600 rounded-md"
            />
            {errors.title && (
              <span className="text-red-500">
                {String(errors.title?.message)}
              </span>
            )}
            <label htmlFor="Category">Category</label>
            <input
              {...register("category", { required: "Category is required" })}
              type="text"
              id="category"
              className="bg-white px-2 py-1 text-gray-600 rounded-md"
            />
            {errors.category && (
              <span className="text-red-500">
                {String(errors.category?.message)}
              </span>
            )}
            <label htmlFor="content">Content</label>
            <textarea
              {...register("content", { required: "Content is required" })}
              id="content"
              className="bg-white px-2 py-1 text-gray-600 rounded-md"
            />
            {errors.content && (
              <span className="text-red-500">
                {String(errors.content?.message)}
              </span>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${
                isSubmitting ? "bg-yellow-500" : "bg-[#FFD11A]"
              } hover:bg-yellow-500 rounded-md py-2 text-[#141414] w-full mt-2`}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
