import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin, getCurrentUser } from "./lib/auth";

// Query to get current user info
export const getCurrentUserInfo = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    return user;
  },
});

// Query to get all users (admin only)
export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    
    const users = await ctx.db
      .query("users")
      .order("desc")
      .collect();
    
    return users;
  },
});

// Mutation to update user role (admin only)
export const updateUserRole = mutation({
  args: {
    userId: v.id("users"),
    role: v.union(v.literal("admin"), v.literal("editor"), v.literal("user")),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    
    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("User not found");
    }
    
    await ctx.db.patch(args.userId, {
      role: args.role,
    });
    
    return { success: true };
  },
});

// Mutation to update user profile
export const updateProfile = mutation({
  args: {
    name: v.optional(v.string()),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Authentication required");
    }
    
    const updates: Record<string, any> = {};
    if (args.name !== undefined) updates.name = args.name;
    if (args.phone !== undefined) updates.phone = args.phone;
    
    if (Object.keys(updates).length > 0) {
      await ctx.db.patch(user._id, updates);
    }
    
    return { success: true };
  },
});

// Query to get user by ID (admin only)
export const getUserById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    
    const user = await ctx.db.get(args.userId);
    return user;
  },
}); 