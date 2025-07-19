import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../api/api";
import { useNavigate } from "react-router-dom";
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "user@restaurant.com",
      password: "user123",
    },
  });
  const nav = useNavigate();
  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      nav("/");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };
  const handleSignup = () => {
    nav("/signup");
  };
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-[#FF3B30]">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6 text-[#FF3B30]">
            Login
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                {...register("email")}
                className="border px-2 py-1 w-full"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                {...register("password")}
                className="border px-2 py-1 w-full"
                placeholder="******"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-[#FF3B30] text-white font-semibold py-2 rounded-xl hover:bg-red-600 transition"
            >
              Login
            </button>
          </form>
          <p className="text-center text-gray-500 text-sm mt-4">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={handleSignup}
              className="text-[#FF3B30] font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
