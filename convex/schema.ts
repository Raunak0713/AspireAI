import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  users: defineTable({
    clerkUserId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    industry: v.optional(v.string()),
    industryInsightId: v.optional(v.id("industryInsights")),
    bio: v.optional(v.string()),
    experience: v.optional(v.number()),
    skills: v.optional(v.array(v.string())),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerkUserId", ["clerkUserId"])
    .index("by_email", ["email"])
    .index("by_industry", ["industry"]),

  industryInsights: defineTable({
    industry: v.string(),
    salaryRanges: v.any(),
    growthRate: v.number(),
    demandLevel: v.union(v.literal("High"), v.literal("Medium"), v.literal("Low")),
    topSkills: v.array(v.string()),
    marketOutlook: v.union(v.literal("Positive"), v.literal("Neutral"), v.literal("Negative")),
    keyTrends: v.array(v.string()),
    recommendedSkills: v.array(v.string()),
    lastUpdated: v.number(),
    nextUpdate: v.number(),
  })
    .index("by_industry", ["industry"]),

  coverLetters: defineTable({
    userId: v.id("users"),
    content: v.string(),
    jobDescription: v.optional(v.string()),
    companyName: v.string(),
    jobTitle: v.string(),
    status: v.union(v.literal("draft"), v.literal("completed")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"]),

  resumes: defineTable({
    userId: v.id("users"),
    content: v.string(),
    atsScore: v.optional(v.number()),
    feedback: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"]),

  assessments: defineTable({
    userId: v.id("users"),
    quizScore: v.number(),
    questions: v.any(),
    category: v.string(),
    improvementTip: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"]),

})