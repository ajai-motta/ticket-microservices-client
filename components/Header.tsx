'use client';

import Link from 'next/link';
import { useAuth } from '@/_lib/session-context';

export default function Header() {
  const { jwt } = useAuth();

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
        {!jwt?.currentUser ? (
          <div className="flex items-center gap-4">
            <Link
              href="/auth/signin"
              className="text-gray-600 hover:text-blue-600 transition font-medium"
            >
              Sign In
            </Link>

            <Link
              href="/auth/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              href="/tickets"
              className="text-gray-600 hover:text-blue-600 transition font-medium"
            >
              Tickets
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
              Sign Out
            </Link>
          </div>
        )}
      </nav>

      {/* User info */}
      {jwt?.currentUser && (
        <div className="max-w-7xl mx-auto px-6 pb-3 text-sm text-gray-500">
          Logged in as:{" "}
          <span className="font-medium text-gray-700">
            {jwt.currentUser.email}
          </span>
        </div>
      )}
    </header>
  );
}