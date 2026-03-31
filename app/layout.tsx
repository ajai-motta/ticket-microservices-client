import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import buildClient from '@/api/build-client';
import { headers } from 'next/headers';
import AuthProvider from '@/_lib/session-context';
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Ajai JOseph George's microsevices app : ticket mystro",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const incommingHeader = await headers();
  const header = Object.fromEntries(incommingHeader);

  const { data } = await buildClient(header).get('/api/users/currentuser');

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        <AuthProvider user={data}>
          
          <div className="min-h-screen flex flex-col">

            <div className="flex-1 mx-auto w-full">
              {children}
            </div>

            {/* Footer */}
            {/* Footer */}
<footer className="border-t bg-white text-gray-600">
  <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
    
    {/* Left */}
    <p>
      © {new Date().getFullYear()} Ticket Mystro. All rights reserved.
    </p>

    {/* Center */}
    <p className="text-center">
      Built by{" "}
      <span className="font-medium text-gray-800">
        Ajai Joseph George
      </span>
    </p>

    {/* Right */}
    <div className="flex items-center gap-4 flex-wrap justify-center">
      <a
        href="mailto:ajayjoseo8@gmail.com"
        className="hover:text-blue-600 transition"
      >
        Contact
      </a>

      <span className="hidden md:inline">|</span>

      <a
        href="https://ajaidev.xyz"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-blue-600 transition font-medium"
      >
        ajaidev.xyz
      </a>

      <span className="hidden md:inline">|</span>

      <a href="#" className="hover:text-blue-600 transition">
        Privacy
      </a>

      <a href="#" className="hover:text-blue-600 transition">
        Terms
      </a>
    </div>

  </div>
</footer>

          </div>

        </AuthProvider>
      </body>
    </html>
  );
}