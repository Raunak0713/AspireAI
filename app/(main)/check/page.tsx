"use client";

import { useEffect, useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { getUserOnboardingStatus } from "@/actions/user";

const Page = () => {
  const { user, isLoaded: isUserLoaded } = useUser();
  const router = useRouter();
  const createUser = useMutation(api.user.createUser);
  const existingUser = useQuery(api.user.getUserByClerkId, {
    clerkId: user?.id as string,
  });
  

  const hasSyncedUser = useRef(false); // Prevent multiple syncs

  useEffect(() => {
    if (!isUserLoaded || existingUser === undefined || hasSyncedUser.current) return;

    if (!user) return;

    const syncUser = async () => {
      try {
        hasSyncedUser.current = true; // Mark sync as done
        if (!existingUser) {
          await createUser({
            name: user.firstName || "",
            email: user.emailAddresses[0]?.emailAddress || "",
            clerkId: user.id,
            profileImg: user.imageUrl || "",
          });
          console.log("User created successfully");
          router.push("/onboarding");
        } else {
          console.log("User already exists");
          const { IsOnboarded } = await getUserOnboardingStatus()
          if(IsOnboarded) router.push("/");
          else router.push("/onboarding")
        }
      } catch (error) {
        console.error("Error creating user:", error);
      }
    };

    syncUser();
  }, [isUserLoaded, user, existingUser, createUser, router]);

  return null;
};

export default Page;
