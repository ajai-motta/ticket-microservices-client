'use client';

import Link from 'next/link';
import {useAuth} from '@/_lib/session-context'
export default function Header() {
  const { jwt, setJwt }=useAuth()
  console.log(jwt)
  return (
    <header className="border-b bg-white">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          MyApp 
        </Link>
        
        <div className="flex gap-6">
          <Link href="/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
          <Link href="/settings" className="hover:text-blue-600">
            Settings
          </Link>
        </div>
      </nav>
    </header>
  );
}
