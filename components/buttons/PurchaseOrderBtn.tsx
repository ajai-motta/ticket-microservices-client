"use client"
import React,{useEffect} from 'react'
import useRequest from '@/hooks/use-request'
import Router from 'next/router'
import { useRouter } from 'next/navigation'
import {loadRazorpayScript} from '@/_lib/razorpay'
import axios from 'axios'
interface RazorpayOptions {
  key: string | undefined;
  amount: number;
  currency: string;
  order_id: string;
  name?: string;
  description?: string;
  handler?: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, callback: (response: any) => void) => void;
}
///
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}
const PurchaseOrderBtn = ({orderId}) => {
  const router=useRouter()
     const {doRequest,errors}=useRequest({url: '/api/payments',method:'post',body:{orderId},onSuccess:async(payment)=>{console.log(payment);
     if(payment.order.id===undefined){
      console.log('No payment body')
     }
       if (!window.Razorpay) {
    const loaded = await loadRazorpayScript();

    if (!loaded) {
      alert("Failed to load Razorpay SDK");
      return;
    }
  }
    const options: RazorpayOptions = {
    key: payment.order.notes.key1,
    amount: payment.order.amount,
    currency: "INR",
    order_id: payment.order.id,
   theme: {
  color: "#3399cc"
},modal: {
  ondismiss: function () {
    console.log("Checkout closed");
  }
},
    handler: async (response) => {
      console.log("Payment success:", response);
      try{
        const res=await axios.post('/api/payments/verify-payment',{razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id:response.razorpay_payment_id,
      razorpay_signature:response.razorpay_signature})
      }catch(err){
        console.log(err)
      }
    },
   
  };

  const rzp = new window.Razorpay(options);

  rzp.on("payment.failed", (err) => {
    console.error("Payment failed:", err);
  });

  rzp.open();

  
      
       
     }})
  return (
    <div><button onClick={doRequest}>Purchase</button>
    {errors}
  </div>
  )
}

export default PurchaseOrderBtn