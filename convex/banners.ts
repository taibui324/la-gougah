import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdminOrEditor, getCurrentUser } from "./lib/auth";
import { Id } from "./_generated/dataModel";

// Get all banners (admin/editor only)
export const getAllBanners = query({
  args: {},
  handler: async (ctx) => {
    // Check if user is admin or editor
    await requireAdminOrEditor(ctx);
    
    // Fetch all banners ordered by position and order
    const banners = await ctx.db
      .query("banners")
      .order("desc")
      .collect();
    
    return banners;
  },
});

// Get active banners by position (public)
export const getActiveBannersByPosition = query({
  args: { position: v.union(v.literal("hero"), v.literal("secondary"), v.literal("footer")) },
  handler: async (ctx, args) => {
    // Fetch only active banners for the specified position
    const banners = await ctx.db
      .query("banners")
      .withIndex("position", (q) => q.eq("position", args.position))
      .filter(q => q.eq(q.field("isActive"), true))
      .order("asc", (q) => q.field("order"))
      .collect();
    
    return banners;
  },
});

// Get a banner by ID (admin/editor only)
export const getBannerById = query({
  args: { id: v.id("banners") },
  handler: async (ctx, args) => {
    // Check if user is admin or editor
    await requireAdminOrEditor(ctx);
    
    // Fetch the banner
    const banner = await ctx.db.get(args.id);
    return banner;
  },
});

// Create a new banner (admin/editor only)
export const createBanner = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    image: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    link: v.optional(v.string()),
    position: v.union(
      v.literal("hero"),
      v.literal("secondary"),
      v.literal("footer")
    ),
    isActive: v.boolean(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    // Check if user is admin or editor
    const user = await requireAdminOrEditor(ctx);
    
    // Create the banner
    const bannerId = await ctx.db.insert("banners", {
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    
    return bannerId;
  },
});

// Update a banner (admin/editor only)
export const updateBanner = mutation({
  args: {
    id: v.id("banners"),
    title: v.string(),
    description: v.optional(v.string()),
    image: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    link: v.optional(v.string()),
    position: v.union(
      v.literal("hero"),
      v.literal("secondary"),
      v.literal("footer")
    ),
    isActive: v.boolean(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    // Check if user is admin or editor
    await requireAdminOrEditor(ctx);
    
    const { id, ...updateFields } = args;
    
    // Update the banner
    await ctx.db.patch(id, {
      ...updateFields,
      updatedAt: Date.now(),
    });
    
    return id;
  },
});

// Delete a banner (admin/editor only)
export const deleteBanner = mutation({
  args: { id: v.id("banners") },
  handler: async (ctx, args) => {
    // Check if user is admin or editor
    await requireAdminOrEditor(ctx);
    
    // Delete the banner
    await ctx.db.delete(args.id);
    
    return args.id;
  },
});
