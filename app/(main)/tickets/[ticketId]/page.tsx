// app/tickets/[ticketId]/page.tsx
//import useRequest from "@/hooks/use-request";
import axios from "axios";
import PurchaseBtn from "@/components/buttons/PurchaseBtn";
export default async function Page({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) {

  const { ticketId } = await params;
    
 
  const res = await axios.get(`http://tickets-srv:3000/api/tickets/${ticketId}`);
  console.log(res.data)
  const {ticket} = res.data;
  
  return (
    <div>
      
      <h1>{ticket.title}</h1>
      <p>{ticket.price}</p>

      
        <PurchaseBtn ticketId={ticketId}/>
      
    </div>
  );
}