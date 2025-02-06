"use client";

import { useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Page = () => {
  const { user } = useUser();
  const router = useRouter();
  const createUser = useMutation(api.user.createUser);
  const existingUser = useQuery(api.user.getUserByClerkId, { clerkId: user?.id as string });

  useEffect(() => {
    const syncUser = async () => {
      if (!user) return;

      if (existingUser === undefined) return; 

      if (!existingUser) {
        try {
          await createUser({
            name: user.firstName || "",
            email: user.emailAddresses[0]?.emailAddress || "",
            clerkId: user.id,
            profileImg: user.imageUrl || "",
          });
          console.log("User created successfully");
        } catch (error) {
          console.error("Error creating user:", error);
        }
      } else {
        console.log("User already exists");
      }

      router.push("/");
    };

    syncUser();
  }, [user, existingUser, createUser, router]);

  return null;
};

export default Page;
