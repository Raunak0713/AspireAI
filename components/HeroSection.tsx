'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import React, { useRef } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getUserOnboardingStatus } from '@/actions/user'

const HeroSection = () => {
  const { resolvedTheme } = useTheme()
  const imageRef = useRef<HTMLImageElement | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const response = await getUserOnboardingStatus()
        
        // If the user is not onboarded, redirect to onboarding page
        if (!response.IsOnboarded) {
          router.push('/onboarding');
        } else {
          setIsOnboarded(true);
        }
      } catch (error) {
        console.error("Error checking onboarding status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkOnboardingStatus();
  }, [router]);

  // Ensure actions are only performed once onboarding status is confirmed
  if (loading || isOnboarded === null) {
    return <div>Loading...</div>; // Or a loading spinner/indicator
  }

  // Now that onboarding status is confirmed, proceed with other actions
  return (
    <section className='px-4 md:px-0 w-full pt-36 md:pt-48 pb-10'>
      <div className='space-y-6 text-center'>
        <div className='space-y-6 mx-auto'>
          <h1 className={`text-5xl font-bold md:text-5xl lg:text-6xl xl:text-7xl ${resolvedTheme === 'dark' ? 'gradient-title-dark' : 'gradient-title-light'}`}>
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
            <Button variant={"outline"} size={"lg"}>
              Get Started
              <ChevronRight />
            </Button>
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
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
