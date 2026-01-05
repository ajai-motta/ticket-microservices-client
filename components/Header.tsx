'use client';

import Link from 'next/link';
import {useAuth} from '@/_lib/session-context'
export default function Header() {
  console.log("above this//////////////1")
  const { jwt, setJwt }=useAuth()
  console.log("above this//////////////2")
  console.log(jwt,'second layout')
  console.log(!jwt?.currentUser,'second layout')
  
  return (
    <header className="border-b bg-white">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Ticket Mystro
        </Link>
        
        {!jwt?.currentUser?(<div className="flex gap-6">
          <Link href="/auth/signin" className="hover:text-blue-600">
            SignIn
          </Link>
          <Link href="/auth/signup" className="hover:text-blue-600">
            SignUP
          </Link>
        </div>): <div className="flex gap-6">
          <Link href="/auth/signout" className="hover:text-blue-600">
            SignOut
          </Link>
         
        </div>}
      </nav>
      <h1>{jwt?.currentUser?.email}</h1>
    </header>
  );
}
