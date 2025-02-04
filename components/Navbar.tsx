import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Brain, ChevronDown, FileText, GraduationCap, LayoutDashboard, PenBox, Stars } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { ModeToggle } from './ModeToggle'

const Navbar = () => {
  return (
    <header className='md:py-1 px-3 md:px-5  fixed top-0 w-full border-b backdrop-blur-md z-50 supports-[backdrop-filter]'>
      <nav className='h-16 flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <div className='hidden md:block'>
            <Brain size={38}/>
          </div>
          <div className='block md:hidden'>
            <Brain size={30}/>
          </div>
          <p className='text-xl md:text-2xl'>AspireAI</p>
        </div>
        <div className='flex items-center space-x-2.5 md:space-x-5'>
          <SignedIn>
            <Link href={"/dashboard"}>
              <Button variant={"outline"}>
                <LayoutDashboard className='h-4 w-4'/>
                <span className='hidden md:block'> Industry Insights</span>
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"}>
                  <Stars className='hidden md:block h-4 w-4'/>
                  <span className='hidden md:block'>Growth Tools</span>
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href={"/resume"} className='flex items-center gap-2'>
                    <FileText className='h-4 w-4'/>
                    <span>Build Resume</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={"/ai-cover-letter"} className='flex items-center gap-2'>
                    <PenBox className='h-4 w-4'/>
                    <span>Cover Letter</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={"/interview"} className='flex items-center gap-2'>
                    <GraduationCap className='h-4 w-4'/>
                    <span>Interview Prep</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ModeToggle />
            <UserButton />
          </SignedIn>

          <SignedOut>
            <ModeToggle />
            <SignInButton>
              <Button variant={"outline"}>Sign In</Button>
            </SignInButton>
          </SignedOut>

        </div>
      </nav>
    </header>
  )
}

export default Navbar