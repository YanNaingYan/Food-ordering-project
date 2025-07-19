import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { login, signup } from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { User, UserPen } from "lucide-react";

const loginSchema = z
  .object({
    profilePicture: z.any(),
    email: z.email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    name: z.string().min(1, { message: "Name is required" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Signup() {
  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const nav = useNavigate();
  const { mutate } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      nav("/");
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);

    if (data.profilePicture && data.profilePicture[0]) {
      formData.append("profilePicture", data.profilePicture[0]);
    }

    mutate(formData);
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-[#FF3B30]">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6 text-[#FF3B30]">
            Create an account
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col items-center">
              <input
                type="file"
                id="profilePicture"
                {...register("profilePicture")}
                accept="image/*"
                className="hidden"
              />
              <label htmlFor="profilePicture" className="cursor-pointer">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile preview"
                    className="w-20 h-20 rounded-full object-cover border"
                  />
                ) : (
                  <User className="bg-gray-100 border border-b w-20 h-20 p-4 rounded-full" />
                )}
              </label>

              {errors.profilePicture && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.profilePicture.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("name")}
                className="border px-2 py-1 w-full"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
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
              <label className="block text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
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
            <div>
              <label className="block text-gray-700 mb-1">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                {...register("confirmPassword")}
                className="border px-2 py-1 w-full"
                placeholder="******"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-[#FF3B30] text-white font-semibold py-2 rounded-xl hover:bg-red-600 transition"
            >
              Sign up
            </button>
          </form>
          <p className="text-center text-gray-500 text-sm mt-4">
            Already have an account?{" "}
            <button className="text-[#FF3B30] font-medium">Login</button>
          </p>
        </div>
      </div>
    </div>
  );
}
