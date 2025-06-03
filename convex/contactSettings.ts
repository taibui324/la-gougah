import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin, getCurrentUser } from "./lib/auth";

// Query to get contact settings (admin only)
export const getContactSettings = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const settings = await ctx.db.query("contactSettings").first();
    return settings;
  },
});

// Public query to get contact settings for public website
export const getPublicContactInfo = query({
  args: {},
  handler: async (ctx) => {
    const settings = await ctx.db.query("contactSettings").first();
    if (!settings) {
      return {
        email: "contact@lagougah.com", // Default fallback
      };
    }
    
    return {
      email: settings.email,
      phone: settings.phone,
      address: settings.address,
      socialLinks: settings.socialLinks,
    };
  },
});

// Mutation to update contact settings
export const updateContactSettings = mutation({
  args: {
    email: v.string(),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    socialLinks: v.optional(
      v.object({
        facebook: v.optional(v.string()),
        instagram: v.optional(v.string()),
        twitter: v.optional(v.string()),
        linkedin: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    // Check if user is admin
    const user = await requireAdmin(ctx);
    
    // Get existing settings
    const existingSettings = await ctx.db.query("contactSettings").first();
    
    const now = Date.now();
    
    if (existingSettings) {
      // Update existing settings
      await ctx.db.patch(existingSettings._id, {
        ...args,
        updatedAt: now,
        updatedBy: user._id,
      });
      
      return existingSettings._id;
    } else {
      // Create new settings
      const settingsId = await ctx.db.insert("contactSettings", {
        ...args,
        updatedAt: now,
        updatedBy: user._id,
      });
      
      return settingsId;
    }
  },
});

// Initialize contact settings if they don't exist
export const initializeContactSettings = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user is admin
    const user = await requireAdmin(ctx);
    
    // Check if settings already exist
    const existingSettings = await ctx.db.query("contactSettings").first();
    
    if (existingSettings) {
      return existingSettings._id;
    }
    
    // Create new settings
    const now = Date.now();
    const settingsId = await ctx.db.insert("contactSettings", {
      email: args.email,
      updatedAt: now,
      updatedBy: user._id,
    });
    
    return settingsId;
  },
}); 