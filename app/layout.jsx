import { Inter } from "next/font/google"
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "sonner"; 



const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "SpendSense",
  description: "One stop shop for all your wealth management needs ",
};

export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      <body
        className={`${inter.className}`}
      >
        <ClerkProvider>
        {/*header*/}
        <header>
          <Header />
        </header>
        <main className="min-h-screen">{children}</main>
        
         <Toaster richColors/>

        {/*footer*/}
        <footer className="bg-blue-50 py-12">
          <div className="container mx-auto px-4 text-centre text-gray-600">
            <p className="text-center">
              SpendSense © 2025. All rights reserved.
              by Deepak Kumar 
            </p>
          </div>
        </footer>
        </ClerkProvider>
      </body>
    </html>
    
  );
}
