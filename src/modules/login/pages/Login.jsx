import React from "react";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FF3B30]">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#FF3B30]">
          Login
        </h1>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#FF3B30]"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#FF3B30]"
            />
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
          <a href="#" className="text-[#FF3B30] font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
