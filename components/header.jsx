import React from 'react'
import { SignedOut, SignedIn, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { LayoutDashboard, Link, PenBoxIcon, PenLineIcon } from 'lucide-react'
import { Button } from './ui/button'
const header = () => {
  return (
    <div className='fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b'>

      <nav className='container mx-auto px-4 flex items-centre justify-between'>

        {/* logo */}
        <a href='/'>
          <img
            src="logo.png"
            alt="SpendSense logo"
            height={120}
            width={320}
            className="h-20 w-auto object-contain"
          />
        </a>
        {/* buttons for nav bar */}
        <div className='flex  items-center space-x-2.5'>
          <SignedOut>
            <SignInButton forceRedirectUrl='/dashboard'>
              <Button variant="outline" className="mt-6">
                Login
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            {/* button after signed up  */}

            {/* for dashboard */}
            <a
              href={"/dashboard"}
              className='text-gray-600 hover:text-blue-600 flex items-center gap-2'>
              <Button variant="outline" className="mt-6">
                <LayoutDashboard size={18} />
                <span className='hidden md:inline'>Dashboard</span>
              </Button>
            </a>

            {/* for dashboard */}
            <a
              href={"/transaction/create"}
              className='flex items-center gap-2'>
              <Button className="mt-6">
                <PenBoxIcon size={18} />
                <span className='hidden md:inline'> Add Transaction</span>
              </Button>
            </a>
          </SignedIn>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  rootBox: "mt-6",
                  userButtonAvatarBox: "w-14 h-14",
                  avatarBox: "w-14 h-14",
                },
              }}
            />
          </SignedIn>


        </div>
      </nav>
    </div>
  )
}

export default header
