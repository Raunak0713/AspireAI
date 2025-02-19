import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const findUnique = query({
  args : {
    industry : v.string()
  },
  handler : async(ctx, args) => {
    const industry = ctx.db
      .query("industryInsights")
      .filter((q) => q.eq(q.field("industry"), args.industry))
      .first()
    return industry || null
  }
})

export const get = query({
  args : {
    insightId : v.id("industryInsights")
  },
  handler : async(ctx, args) => {
    return ctx.db.get(args.insightId)
  }
})

export const create = mutation({
  args: {
    industry: v.string(),
    salaryRanges: v.any(),
    growthRate: v.number(),
    demandLevel: v.union(v.literal("High"), v.literal("Medium"), v.literal("Low")),
    topSkills: v.array(v.string()),
    marketOutlook: v.union(v.literal("Positive"), v.literal("Neutral"), v.literal("Negative")),
    keyTrends: v.array(v.string()),
    recommendedSkills: v.array(v.string()),
    nextUpdate: v.number(),
  },
  handler: async (ctx, args) => {
    const industryId = await ctx.db.insert("industryInsights", {
      ...args,
      lastUpdated: Date.now(),
    });
    return await ctx.db.get(industryId);
  },
});