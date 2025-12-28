"use client";
import React, { useState } from "react";

import useRequest from "../../../hooks/use-request";
import { useRouter } from "next/navigation";
const Signup = () => {
  
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: {
      email,
      password,
     
    },
     onSuccess: ()=>{
        
        router.push('/')
      }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await doRequest();
    
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-md"
      >
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
           
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        {errors}

        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 text-white py-2 font-medium hover:bg-indigo-700 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Signup;
