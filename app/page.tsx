'use client'

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser()
  return (
    <div>
      { user ? (
        <UserButton />
      ) : (
        <SignInButton>
          
        </SignInButton>
      )}
    </div>
  );
}
