'use client'
import { useEffect } from "react";
import useRequest from "@/hooks/use-request";
import { useRouter } from "next/navigation";
const Signout=()=>{
    const router = useRouter();
    const {doRequest}=useRequest({
        url: '/api/users/signout',
        method: 'post',
        body: {},
        onSuccess:()=>{
            router.push('/')
        }
    })
    useEffect(()=>{
        doRequest()
    },[])
    return( <div>
        <h1>You are signing out</h1>
    </div>)
}
export default Signout;