"use client";

import React, { useEffect, useState } from "react";



export const OrderTimer = ({ order }) => {
 
  const [timeleft,setTimeleft]=useState(3000)
  useEffect(()=>{
    function findTimeleft(){
      const msleft=new Date(order.expiresAt).getTime()-new Date().getTime()
      setTimeleft(Math.round(msleft))
      
      
    }
    findTimeleft()
    const timeintervel=setInterval(()=>{findTimeleft()},1000)
    return ()=>{
      clearInterval(timeintervel)
    }
  },[order.expiresAt])
  if(timeleft<=0){
    return(<div>Order Expired</div>)
  }

  return <div>⏳ Time left: {Math.floor(timeleft/1000)} seconds</div>;
};