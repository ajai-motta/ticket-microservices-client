"use client"
import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import buildClient from '@/api/build-client'
import useRequest from '@/hooks/use-request'
const page = () => {
  const [data, setData] = useState(null);
  const pathname=usePathname()
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/tickets"); 
      setData(res.data);
    };

    fetchData();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {data?.map((ticket: any) => (
    
    <Link key={ticket.id} href={`${pathname}/${ticket.id}`}>
      <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 h-full">
        
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {ticket.title}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-gray-600 text-sm">
            Price
          </p>
          <p className="text-xl font-bold text-gray-900">
            ₹ {ticket.price}
          </p>
        </CardContent>

      </Card>
    </Link>
    
    

  ))}
  <h4><Link href={`${pathname}/new`}>New Ticket</Link></h4>
</div>
  )
}

export default page