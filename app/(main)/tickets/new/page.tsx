"use client";
import React, { useState } from "react";

import useRequest from "@/hooks/use-request";
import { useRouter } from "next/navigation";
const newTicket = () => {
  
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState('');
  const { doRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "post",
    body: {
      title,
      price,
     
    },
     onSuccess: ()=>{
        
        router.push('/tickets')
      }
  });
 const onblur=()=>{
  const value=parseFloat(price)
  if(isNaN(value)){
    return;
  }
  setPrice(value.toFixed(2))
  
 }
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

       
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Match1"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            type="number"
           
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            onBlur={onblur}
            placeholder="100"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        {errors}

        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 text-white py-2 font-medium hover:bg-indigo-700 transition"
        >
          confrim
        </button>
      </form>
    </div>
  );
};

export default newTicket;
