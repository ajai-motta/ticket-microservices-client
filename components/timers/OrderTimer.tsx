"use client";

import React, { useEffect, useState } from "react";



export const OrderTimer = ({ order }) => {
  const expiresAt=order?.expiresAt
  const calculateTimeLeft = () => {
    const msLeft = new Date(expiresAt).getTime() - new Date().getTime();
    console.log(msLeft)
    return Math.max(Math.floor(msLeft / 1000), 0);
  };

  const [secondsLeft, setSecondsLeft] = useState<number>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // cleanup
  }, [expiresAt]);
 console.log(secondsLeft)
  if (secondsLeft <= 0) {
    return <div>⛔ Order expired</div>;
  }

  return <div>⏳ Time left: {secondsLeft} seconds</div>;
};