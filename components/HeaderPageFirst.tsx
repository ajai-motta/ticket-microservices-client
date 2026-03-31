'use client';

import Link from 'next/link';

export default function Header(jwt) {
  console.log("above this//////////////1")
  
  console.log("above this//////////////2")
 
  console.log(jwt.jwt.currentUser,'first page header Header direct acces')
  
  return (
    <header className="border-b bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition"
        >
          Ticket Mystro
        </Link>
        
        {/* Navigation */}
        {!jwt?.jwt?.currentUser ? (
          <div className="flex items-center gap-4">
            <Link
              href="/auth/signin"
              className="text-gray-600 hover:text-blue-600 transition font-medium"
            >
              SignIn
            </Link>

            <Link
              href="/auth/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              SignUP
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              href="/tickets"
              className="text-gray-600 hover:text-blue-600 transition font-medium"
            >
              tickets
            </Link>

            <Link
              href="/orders"
              className="text-gray-600 hover:text-blue-600 transition font-medium"
            >
              Orders
            </Link>

            <Link
              href="/auth/signout"
              className="text-red-500 hover:text-red-600 transition font-medium"
            >
              SignOut
            </Link>
          </div>
        )}
      </nav>

      {/* User email */}
      <div className="max-w-7xl mx-auto px-6 pb-3 text-sm text-gray-500">
        <span className="font-medium text-gray-700">
          {jwt?.currentUser?.email}
        </span>
      </div>
    </header>
  );
}