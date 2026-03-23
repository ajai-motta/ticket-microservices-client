import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import buildClient from '@/api/build-client'
import useRequest from '@/hooks/use-request'
const page = () => {
  const [data, setData] = useState(null);

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
        <div key={ticket.id}>{ticket.title}</div>
      ))}
    </div>
  )
}

export default page