import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin, getCurrentUser, requireAuth } from "./lib/auth";

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

// Query to get users by role (admin only)
export const getUsersByRole = query({
  args: {
    role: v.union(v.literal("admin"), v.literal("editor"), v.literal("user")),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    
    const users = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("role"), args.role))
      .order("desc")
      .collect();
    
    return users;
  },
});

// Mutation to create a new user (admin only)
export const createUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    role: v.union(v.literal("admin"), v.literal("editor"), v.literal("user")),
    status: v.optional(v.union(v.literal("active"), v.literal("inactive"))),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", args.email))
      .first();
    
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    
    const now = Date.now();
    
    const userId = await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      role: args.role,
      status: args.status || "active",
      createdAt: now,
      updatedAt: now,
    });
    
    return userId;
  },
});

// Mutation to update user (admin only)
export const updateUser = mutation({
  args: {
    userId: v.id("users"),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    role: v.optional(v.union(v.literal("admin"), v.literal("editor"), v.literal("user"))),
    status: v.optional(v.union(v.literal("active"), v.literal("inactive"))),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    
    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("User not found");
    }
    
    // If email is being updated, check for conflicts
    if (args.email && args.email !== user.email) {
      const existingUser = await ctx.db
        .query("users")
        .withIndex("email", (q) => q.eq("email", args.email!))
        .first();
      
      if (existingUser && existingUser._id !== args.userId) {
        throw new Error("User with this email already exists");
      }
    }
    
    const updates: Record<string, any> = {
      updatedAt: Date.now(),
    };
    
    if (args.name !== undefined) updates.name = args.name;
    if (args.email !== undefined) updates.email = args.email;
    if (args.role !== undefined) updates.role = args.role;
    if (args.status !== undefined) updates.status = args.status;
    
    await ctx.db.patch(args.userId, updates);
    
    return { success: true };
  },
});

// Mutation to delete user (admin only)
export const deleteUser = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    
    const currentUser = await getCurrentUser(ctx);
    if (!currentUser) {
      throw new Error("Authentication required");
    }
    
    // Prevent admin from deleting themselves
    if (currentUser._id === args.userId) {
      throw new Error("You cannot delete your own account");
    }
    
    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("User not found");
    }
    
    await ctx.db.delete(args.userId);
    
    return { success: true };
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
      updatedAt: Date.now(),
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
    
    const updates: Record<string, any> = {
      updatedAt: Date.now(),
    };
    if (args.name !== undefined) updates.name = args.name;
    if (args.phone !== undefined) updates.phone = args.phone;
    
    if (Object.keys(updates).length > 1) { // More than just updatedAt
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

// Query to get user statistics (admin only)
export const getUserStats = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    
    const allUsers = await ctx.db.query("users").collect();
    
    const stats = {
      total: allUsers.length,
      active: allUsers.filter(u => (u.status === "active" || !u.status)).length,
      inactive: allUsers.filter(u => u.status === "inactive").length,
      byRole: {
        admin: allUsers.filter(u => u.role === "admin").length,
        editor: allUsers.filter(u => u.role === "editor").length,
        user: allUsers.filter(u => u.role === "user").length,
      }
    };
    
    return stats;
  },
}); 