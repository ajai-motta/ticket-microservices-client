"use client"
import React from 'react'
import useRequest from '@/hooks/use-request'
import Router from 'next/router'
import { useRouter } from 'next/navigation'
const PurchaseBtn = ({ticketId}) => {
  const router=useRouter()
     const {doRequest,errors}=useRequest({url: '/api/orders',method:'post',body:{ticketId},onSuccess:(order)=>{console.log(order);
      router.push(`/orders/${order.id}`)
     }})
  return (
    <div><button onClick={doRequest}>Purchase</button>
    {errors}
  </div>
  )
}

export default PurchaseBtn