import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const createUser = mutation({
  args : {
    clerkUserId : v.string(),
    name : v.string(),
    imageUrl : v.string(),
    email : v.string()
  },
  handler : async (ctx, args) => {
    const newUser = await ctx.db.insert("users", {
      clerkUserId : args.clerkUserId,
      email : args.email,
      imageUrl : args.imageUrl,
      createdAt : Date.now(),
      updatedAt : Date.now(),
    });
    return newUser
  },
})

export const existingUserByClerkID = query({
  args : {
    clerkUserId : v.string(),
  },
  handler : async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkUserId"), args.clerkUserId))
      .first()
    if(user) return true
    return false
  }
})