'use server'

import { api } from "@/convex/_generated/api"
import { auth } from "@clerk/nextjs/server"
import { fetchMutation, fetchQuery } from 'convex/nextjs'

interface updateUserProps {
  data: {
    industry: string;
    experience: number;
    bio: string;
    skills: string[];
  }
}


const updateUser = async ({ data }: updateUserProps) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await fetchQuery(api.user.getUserByClerkId, { clerkId: userId });
  if (!user) throw new Error("No user found");

  try {

    console.log(data)
    if (!data.industry) {
      throw new Error("Industry is required.");
    }

    let industryInsights = await fetchQuery(api.industryInsight.findUnique, { industry: data.industry });
    if (!industryInsights) {
      await fetchMutation(api.industryInsight.create, { industry: data.industry });
    }

    const updatedUser = await fetchMutation(api.user.updateUserDetails, {
      clerkId: user.clerkId,
      bio: data.bio,
      experience: data.experience,
      industry: data.industry,
      skills: data.skills,
    });

    return { updatedUser, industryInsights, success: true };
  } catch (error) {
    console.error("Error updating the user:", error);
    throw new Error("Error updating the user");
  }
};

const getUserOnboardingStatus = async () => {
  const { userId } = await auth();
  if (!userId)  return { IsOnboarded: false };
  

  const user = await fetchQuery(api.user.getUserByClerkId, { clerkId: userId });
  if (!user) throw new Error("No user found");

  return { IsOnboarded: !!user.industry };
}

export { updateUser, getUserOnboardingStatus };
