import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const createUser = mutation({
  args : {
    clerkId : v.string(),
    name : v.string(),
    profileImg : v.string(),
    email : v.string()
  },
  handler : async (ctx, args) => {
    const newUser = await ctx.db.insert("users", {
      clerkId : args.clerkId,
      email : args.email,
      profileImg : args.profileImg,
      createdAt : Date.now(),
      updatedAt : Date.now(),
    });
    return newUser
  },
})

export const getUserByClerkId = query({
  args : {
    clerkId : v.string(),
  },
  handler : async (ctx, args) => {
    const user = await ctx.db 
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first()

    return user || null
  } 
})

