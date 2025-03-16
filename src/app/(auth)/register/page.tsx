"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Page() {
  const schema = z.object({
    fullName: z.string().min(3, "Min length is 3").max(50, "max length is 50"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Min length should be 6"),
  });

  type FormFields = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormFields) {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ✅ Important! Tells server it's JSON
        },
        body: JSON.stringify(data),
      }
    );
    const responseData = await result.json();
    console.log(responseData);
    reset();
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Register</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className=" p-4 flex flex-col w-80 mx-auto gap-1 bg-blue-400 rounded-md "
      >
        <label htmlFor="fullName">Full Name</label>
        <input
          {...register("fullName")}
          type="text"
          id="fullName"
          name="fullName"
          className="bg-white py-1 px-3 rounded-md text-gray-800"
        />
        {errors.fullName && (
          <h1 className="text-red-500">{errors.fullName.message}</h1>
        )}
        <label htmlFor="email">Email</label>
        <input
          {...register("email")}
          type="email"
          id="email"
          name="email"
          className="bg-white py-1 px-3 rounded-md text-gray-800"
        />
        {errors.email && (
          <h1 className="text-red-500">{errors.email.message}</h1>
        )}
        <label htmlFor="password">Password</label>
        <input
          {...register("password")}
          type="password"
          id="password"
          name="password"
          className="bg-white py-1 px-3 rounded-md text-gray-800"
        />
        {errors.password && (
          <h1 className="text-red-500">{errors.password.message}</h1>
        )}
        <button
          disabled={isSubmitting}
          type="submit"
          className="py-2 px-3 bg-gray-900 mt-2"
        >
          Register
        </button>
      </form>
    </div>
  );
}
