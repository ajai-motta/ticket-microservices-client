import type { Metadata } from 'next';
import Header from '@/components/Header';


export const metadata: Metadata = {
  title: {
    default: 'MyApp',
    template: '%s | MyApp',
  },
  description: 'A modern Next.js app',
};

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   
  return (
    <>
    <Header/>
        
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {children}
      </main>
      

      <footer className="border-t bg-white text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} MyApp
      </footer>
    </>
  );
}
