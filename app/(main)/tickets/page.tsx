"use client"
import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
    <div>
      <h1>Tickets</h1>
      {data?.map((ticket: any) => (
        <div key={ticket.id}><Link href={`${pathname}/${ticket.id}`} >{ticket.title} {ticket.price}</Link> </div>
      ))}
      <h4><Link href={`${pathname}/new`}>New Ticket</Link></h4>
    </div>
  )
}

export default page