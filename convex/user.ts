import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { api } from "./_generated/api"
import { Doc } from "./_generated/dataModel";

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

export const updateUserDetails = mutation({
  args : {
    clerkId : v.string(),
    industry : v.string(),
    experience : v.number(),
    bio : v.string(),
    skills : v.array(v.string())
  },
  handler : async (ctx, args) : Promise<Doc<"users">> => {
    const user : Doc<"users"> | null = await ctx.runQuery(api.user.getUserByClerkId, { clerkId : args.clerkId })
    if(!user) throw new Error("User not found")

    await ctx.db.patch(user._id, {
      industry: args.industry,
      experience: args.experience,
      bio: args.bio,
      skills: args.skills,
      updatedAt: Date.now()
    });

    return user
  },
})

export const updateOldUser = mutation({
  args : {},
  handler : async (ctx, args) => {}
})
