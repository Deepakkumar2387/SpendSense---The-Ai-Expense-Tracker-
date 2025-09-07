"use client";
import { Bitter } from 'next/font/google';
import React, { useEffect ,useRef } from 'react'
import { Button } from './ui/button';
import Link from "next/link";
import Image from 'next/image';


const HeroSection = () => {
    const imageRef = useRef();

    useEffect(() => {
        const imageElement = imageRef.current;
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const scrollThreshold = 100;

            if (scrollPosition > scrollThreshold) {
                imageElement.classList.add("scrolled")
            } else {
                imageElement.classList.remove("scrolled")
            }
        };
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])
    return (
        <div className='pb-20 px -4'>

            {/* banner  text */}
            <div className='container mx-auto text-center'>
                <h1 className="text-5xl md:text-8xl lg:text-[105px] gradient-title">
                    Manage your Finances <br /> with Intelligence
                </h1>
                <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>
                    SpendSense makes money management simple.
                    Track expenses, analyze spending, and save smarter — all with AI.
                </p>


                {/* button for get staerted */}
                <div className="flex justify-center space-x-4"> <Link href="/dashboard">
                    <Button size="lg" className="px-8">
                        Get Started
                    </Button>
                </Link>

                    {/* button for get demo  */}
                    <Link href="/dashboard">
                        <Button size="lg" variant="outline" className="px-8">
                            Watch Demo
                        </Button>
                    </Link></div>

            </div>
            {/* banner image */}
            <div className='hero-image-wrapper'>
                <div ref={imageRef} className='hero-image'>
                    <Image src="/banner.png"
                        width={1280}
                        height={720}
                        alt='Dashboard Preview'
                        className='rounded-lg shawdow-2xl border mx-auto'
                        priority

                    />
                </div>
            </div>

            

        </div>
    )
}

export default HeroSection
