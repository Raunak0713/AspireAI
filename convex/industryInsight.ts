import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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

export const create = mutation({
  args : {
    industry : v.string()
  },
  handler : async(ctx, args) => {
    const industry = ctx.db.insert("industryInsights", {
      industry : args.industry,
      salaryRanges : [],
      growthRate : 0,
      demandLevel : "Medium",
      topSkills : [],
      marketOutlook : "Neutral",
      keyTrends : [],
      recommendedSkills : [],
      lastUpdated : Date.now(),
      nextUpdate : (Date.now() + (7*24*60*60*1000))
    })
    return industry
  },
})