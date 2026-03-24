// app/tickets/[ticketId]/page.tsx
import useRequest from "@/hooks/use-request";
import axios from "axios";

export default async function Page({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) {
  
  const { ticketId } = await params;
  const {doRequest,errors}=useRequest({url: '/api/orders',method:'post',body:{ticketId},onSuccess:(order)=>{console.log(order)}})
  const res = await axios.get(`http://tickets-srv:3000/api/tickets/${ticketId}`);
  console.log(res.data)
  const {ticket} = res.data;
  
  return (
    <div>
      
      <h1>{ticket.title}</h1>
      <p>{ticket.price}</p>

      
        <button onClick={doRequest}>Purchase</button>
      
    </div>
  );
}