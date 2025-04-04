"use client";
import React from "react";
import {setAuthToken} from '@/utils/cookie-store'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Min lenght must be 6"),
});

type FormFields = z.infer<typeof schema>;

export default function Page() {
  const {
    handleSubmit,
    register,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormFields) {
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // ✅ Include cookies in the request
          body:JSON.stringify(data)
        }
      );
      reset();
      const response = await result.json();
      setAuthToken(response.token)
      console.log(response)
    } catch (error) {
      console.log({error:error})
    }
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h2 className="text-2xl mb-2">Login</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 items-center bg-blue-500 rounded-md p-4"
      >
        <div className="flex flex-col gap-1">
          <input
            {...register("email")}
            type="text"
            className="bg-white px-2 py-1 text-gray-600 rounded-md"
            placeholder="example@example.com"
          />
          {errors.email && (
            <h1 className="text-red-500">{errors.email.message}</h1>
          )}
          <input
            {...register("password")}
            type="password"
            className="bg-white px-2 py-1 text-gray-600 rounded-md"
            placeholder="password"
          />
          {errors.password && (
            <h1 className="text-red-500">{errors.password.message}</h1>
          )}
        </div>
        {errors.root && <h1>{errors.root.message}</h1> }
        <input type="submit" className="bg-gray-800 w-full rounded-md py-2" />
      </form>
    </div>
  );
}
