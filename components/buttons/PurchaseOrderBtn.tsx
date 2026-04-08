"use client"
import React,{useEffect,useState} from 'react'
import useRequest from '@/hooks/use-request'
import Router from 'next/router'
import { useRouter } from 'next/navigation'
import {loadRazorpayScript} from '@/_lib/razorpay'
import { redirect } from 'next/navigation'
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
  const [paymentStatus, setPaymentStatus] = useState<{
  success?: boolean;
  message?: string;
}>({})
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
      razorpay_signature:response.razorpay_signature,
      orderId})
      console.log(res)
      setPaymentStatus({
      success: res.data.success,
      message: res.data.message || "Payment successful"
    });
      }catch(err){
        console.log(err)
         setPaymentStatus({
      success: false,
      message: err?.response?.data?.message || "Payment verification failed"
    });
       setTimeout(()=>{
        redirect(`/orders/${orderId}`)
       },5000) 
      }
    },
   
  };

  const rzp = new window.Razorpay(options);

  rzp.on("payment.failed", (err) => {
    console.error("Payment failed:", err);
    setPaymentStatus({
    success: false,
    message: "Payment failed. Try again."
  });
  });

  rzp.open();

  
      
       
     }})
  return (
    <div><button onClick={doRequest}>Purchase</button>
    {errors?? (
    <div
    className={`mt-2 text-sm font-medium ${
      paymentStatus.success ? 'text-green-600' : 'text-red-600'
    }`}
  >
    {errors}
  </div>
  )}
    {paymentStatus.message && (
    <div
    className={`mt-2 text-sm font-medium ${
      paymentStatus.success ? 'text-green-600' : 'text-red-600'
    }`}
  >
    {paymentStatus.message}
  </div>
  )}

  </div>
  )
}

export default PurchaseOrderBtn