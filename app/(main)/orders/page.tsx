import axios from 'axios'
import React from 'react'
import Link from 'next/link'
import { headers } from 'next/headers'
const Orders = async() => {
  const headersList=await headers()
  try{
  const res=await axios.get('http://orders-srv:3000/api/orders/',{
    headers: {
      Cookie: headersList.get('cookie') || ''
    }
  })
  const orders=res.data
  if(orders.length===0){
    return  <h1>NO ORDERS</h1>
  }
    return (
    <div><h1>Orders</h1>
    {orders?.map((order: any) => (
        <div key={order.id}>
          <h3>{order.status}</h3>
          <Link href={`/orders/${order.id}`} >Buy</Link> </div>
      ))}</div>
  )
  }catch(err){
    console.log(err)
    return <h1>ERROR</h1>
  }
  
}

export default Orders