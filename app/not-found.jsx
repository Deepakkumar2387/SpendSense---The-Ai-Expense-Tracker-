import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  // Custom 404 error page component
  return (
    <div className='flex flex-col items-center justify-center min-h-[100vh] px-4'>
      <h1 className="text-5xl md:text-8xl lg:text-[105px] gradient-title">
        404
      </h1>
      <h2 className="text-2xl md:text-5xl lg:text-[80px] ">
        Page Not Found
      </h2>
      <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto mt-6'>
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/">
        <Button >
          Return Home
        </Button>
      </Link>
    </div>
          
  )
}

export default NotFound
