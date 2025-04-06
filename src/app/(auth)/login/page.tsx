"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setAuthToken } from "@/utils/cookie-store";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
const schema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Min lenght must be 6"),
});

type FormFields = z.infer<typeof schema>;

export default function Page() {
  const router = useRouter();

  const [serverError, setServerError] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    reset,
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
          body: JSON.stringify(data),
        }
      );
      reset();
      const response = await result.json();
      setAuthToken(response.token);
      console.log(response);
      if (response.success) {
        router.push("/");
      }
      if (response.error) {
        setServerError(response.error);
      }
    } catch (error) {
      console.log({ error: error });
    }
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h2 className="text-2xl mb-2">Login</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 items-center bg-[#1A1A1A] rounded-md p-4 w-[300px] "
      >
        <div className="flex flex-col gap-4 w-full px-5 py-2">
          <span>
            <input
              {...register("email")}
              type="text"
              className="bg-white px-2 py-1 text-gray-600 rounded-md w-full"
              placeholder="example@example.com"
            />
            {errors.email && (
              <h1 className="text-white">{errors.email.message}</h1>
            )}
          </span>
          <span>
            <input
              {...register("password")}
              type="password"
              className="bg-white px-2 py-1 text-gray-600 rounded-md w-full"
              placeholder="password"
            />
            {errors.password && (
              <h1 className="text-white">{errors.password.message}</h1>
            )}
          </span>
          <button
            type="submit"
            className={`${
              isSubmitting ? "bg-yellow-500" : "bg-[#FFD11A]"
            } hover:bg-yellow-500 rounded-md py-2 text-[#141414] w-full`}
          >
            Login
          </button>
          {serverError && (
            <h1 className="text-white w-full text-center">{serverError}</h1>
          )}
          <p className="text-sm text-gray-400 w-full text-center">
            Don&apos;t have an account? <br />
            <Link href="/register" className="text-[#FFD11A] hover:underline">
              Register here
            </Link>
          </p>
          {errors.root && <h1 className="text-white">{errors.root.message}</h1>}
        </div>
      </form>
    </div>
  );
}
