'use server'

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { auth } from "@clerk/nextjs/server";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Insight } from "@/types/insight";
import { Salary } from "@/types/salary";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

interface AiInsightResponse {
  salaryRanges: Salary[];
  growthRate: number;
  demandLevel: "High" | "Medium" | "Low";
  topSkills: string[];
  marketOutlook: "Positive" | "Neutral" | "Negative";
  keyTrends: string[];
  recommendedSkills: string[];
}

export const generateAiInsights = async (industry: string): Promise<AiInsightResponse> => {
  const prompt = `
    Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
    {
      "salaryRanges": [
        { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
      ],
      "growthRate": number,
      "demandLevel": "High" | "Medium" | "Low",
      "topSkills": ["skill1", "skill2"],
      "marketOutlook": "Positive" | "Neutral" | "Negative",
      "keyTrends": ["trend1", "trend2"],
      "recommendedSkills": ["skill1", "skill2"]
    }
    
    IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
    Include at least 5 common roles for salary ranges.
    Growth rate should be a percentage.
    Include at least 5 skills and trends.
  `;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

  return JSON.parse(cleanedText) as AiInsightResponse;
}

export const getIndustryInsights = async (): Promise<Insight | undefined> => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await fetchQuery(api.user.getUserByClerkId, { clerkId: userId }) as Doc<"users"> | null;
  if (!user) throw new Error("No User Found");
  if (!user.industry) return undefined;

  if (!user.industryInsightId) {
    const insights = await generateAiInsights(user.industry);
    
    const now = Date.now();
    const industryInsight = await fetchMutation(api.industryInsight.create, {
      industry: user.industry,
      ...insights,
      nextUpdate: now + 7 * 24 * 60 * 60 * 1000
    });

    if (!industryInsight) return undefined;

    await fetchMutation(api.user.updateUserIndustry, { clerkId : userId , industryId : industryInsight._id})
    return industryInsight as unknown as Insight;
  }

  const existingInsight = await fetchQuery(api.industryInsight.get, { 
    insightId: user.industryInsightId 
  });

  return existingInsight as unknown as Insight;
}