'use client'

import { useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const CheckUserPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const createUser = useMutation(api.user.createUser);
  const existingUser = useQuery(api.user.existingUserByClerkID, { clerkUserId: user?.id as string });

  useEffect(() => {
    const syncUser = async () => {
      if (!user || existingUser === undefined) return;

      if (!existingUser) {
        await createUser({
          name: user.firstName || "",
          email: user.emailAddresses[0]?.emailAddress || "",
          clerkUserId: user.id,
          imageUrl: user.imageUrl || "",
        });
      }
      router.push("/");
    };

    syncUser();
  }, [user, existingUser, createUser, router]);

  return null;
};

export default CheckUserPage;
