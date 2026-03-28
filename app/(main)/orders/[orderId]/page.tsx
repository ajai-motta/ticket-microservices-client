import React from 'react'
import axios from 'axios'
import { headers } from "next/headers";
import { OrderTimer } from '@/components/timers/OrderTimer';
import PurchaseOrderBtn from '@/components/buttons/PurchaseOrderBtn'
const OrderShow = async({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) => {

const {orderId}=await params
const headersList =await headers();
try{
  const res=await axios.get(`http://orders-srv:3000/api/orders/${orderId}`, {
  headers: {
    Cookie: headersList.get("cookie") || "",
  }})
   return (
    <div><OrderTimer order={res.data}/>
    <PurchaseOrderBtn orderId={orderId}/>
    </div>
  )
}


catch(err){
  console.log(err)
  return <div>Error</div>
}

    


    
 
}

export default OrderShow