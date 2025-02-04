'use client'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { ChevronRight } from 'lucide-react'

const HeroSection = () => {
  const { resolvedTheme } = useTheme()
  const imageRef = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    const handleScroll = () => {
      const imageElement = imageRef.current;

      if (imageElement) {
        const scrollPosition = window.scrollY;
        const scrollThreshold = 100;

        if (scrollPosition > scrollThreshold) {
          imageElement.classList.add("scrolled");
        } else {
          imageElement.classList.remove("scrolled");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className='px-4 md:px-0 w-full pt-36 md:pt-48 pb-10'>
      <div className='space-y-6 text-center'>
        <div className='space-y-6 mx-auto'>
          <h1 className={`text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl ${resolvedTheme === 'dark' ? 'gradient-title-dark' : 'gradient-title-light'}`}>
            Your AI Career Coach for
            <br />
            Professional Success
          </h1>
          <p className='mx-auto max-w-[600px] text-muted-foreground md:text-xl'>
            Advance your career with personalized guidance, interview prep, and
            AI-powered tools for job success.
          </p>
        </div>
        <div className='flex justify-center space-x-4'>
          <Link href={"/dashboard"}>
            <Button variant={"outline"} size={"lg"}>
              Get Started
              <ChevronRight />
            </Button>
          </Link>
          <Link href={"/dashboard"}>
            <Button variant={"outline"} size={"lg"}>Get Started</Button>
          </Link>
        </div>

        {/* hero-image-wrapper ADDD */}
        <div className='hero-image-wrapper mt-5 md:mt-0'>
          {/* hero-image ADDD */} 
          <div ref={imageRef}>
            <Image 
              src={'/testd.webp'}
              alt='Hero Image'
              width={1280}
              height={720}
              className='rounded-lg shadow-2xl border mx-auto'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection