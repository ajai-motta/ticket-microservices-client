import React, { useState } from "react";
import buildClient from '../api/build-client'
import { headers, cookies } from 'next/headers';
import Header from '@/components/HeaderPageFirst'
const LandingPage = async () => {
  
  const incommingHeader=await headers()
  const header=Object.fromEntries(incommingHeader)
  const {data}=await buildClient(header).get('/api/users/currentuser')//currentuser for urlcurrentUser for object returned
  console.log('app page data')
  

  return (
    <div>
      <Header jwt={data}/>
      <h1>Landing Page</h1>
      <h1>{data?.currentUser?.email}</h1>
      {data.currentUser? (<h1>You are signed in</h1>):(<h1>You are NOT signed in</h1>)}
    </div>
  );
};

export default LandingPage;
