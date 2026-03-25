import React from 'react'
import axios from 'axios'
import { OrderTimer } from '@/components/timers/OrderTimer';
const OrderShow = async({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) => {
    const {orderId}=await params
    const res = await fetch(`http://orders-srv:3000/api/orders/${orderId}`, {
  cache: "no-store", // important for dynamic data
});

const data = await res.json();
    
  return (
    <div><OrderTimer order={data}/></div>
  )
}

export default OrderShow