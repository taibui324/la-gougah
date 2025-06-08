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
    
    // Fetch all banners ordered by pageType, position, and order
    const banners = await ctx.db
      .query("banners")
      .order("desc")
      .collect();
    
    return banners;
  },
});

// Get banners by page type (public)
export const getBannersByPage = query({
  args: { 
    pageType: v.union(
      v.literal("homepage"),
      v.literal("technology"),
      v.literal("story"),
      v.literal("news"),
      v.literal("general")
    )
  },
  handler: async (ctx, args) => {
    // Fetch all banners for the specified page type
    const banners = await ctx.db
      .query("banners")
      .withIndex("pageType", (q) => q.eq("pageType", args.pageType))
      .filter(q => q.eq(q.field("isActive"), true))
      .order("asc")
      .collect();
    
    return banners;
  },
});

// Get active hero banner for a specific page (public)
export const getHeroBannerByPage = query({
  args: { 
    pageType: v.union(
      v.literal("homepage"),
      v.literal("technology"),
      v.literal("story"),
      v.literal("news"),
      v.literal("general")
    )
  },
  handler: async (ctx, args) => {
    // Fetch the active hero banner for the specified page
    const banner = await ctx.db
      .query("banners")
      .withIndex("pageType", (q) => q.eq("pageType", args.pageType))
      .filter(q => q.and(
        q.eq(q.field("position"), "hero"),
        q.eq(q.field("isActive"), true)
      ))
      .order("asc")
      .first();
    
    return banner;
  },
});

// Get active banners by position (public) - Updated to support page-specific filtering
export const getActiveBannersByPosition = query({
  args: { 
    position: v.union(v.literal("hero"), v.literal("secondary"), v.literal("footer")),
    pageType: v.optional(v.union(
      v.literal("homepage"),
      v.literal("technology"),
      v.literal("story"),
      v.literal("news"),
      v.literal("general")
    ))
  },
  handler: async (ctx, args) => {
    if (args.pageType) {
      // Filter by both position and page type
      const banners = await ctx.db
        .query("banners")
        .withIndex("pageType", (q) => q.eq("pageType", args.pageType!))
        .filter(q => q.and(
          q.eq(q.field("position"), args.position),
          q.eq(q.field("isActive"), true)
        ))
        .order("asc")
        .collect();
      
      return banners;
    } else {
      // Filter by position only
      const banners = await ctx.db
        .query("banners")
        .withIndex("position", (q) => q.eq("position", args.position))
        .filter(q => q.eq(q.field("isActive"), true))
        .order("asc")
        .collect();
      
      return banners;
    }
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
    linkText: v.optional(v.string()),
    pageType: v.union(
      v.literal("homepage"),
      v.literal("technology"),
      v.literal("story"),
      v.literal("news"),
      v.literal("general")
    ),
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
    linkText: v.optional(v.string()),
    pageType: v.union(
      v.literal("homepage"),
      v.literal("technology"),
      v.literal("story"),
      v.literal("news"),
      v.literal("general")
    ),
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

// Activate a banner (admin/editor only)
export const activateBanner = mutation({
  args: { id: v.id("banners") },
  handler: async (ctx, args) => {
    // Check if user is admin or editor
    await requireAdminOrEditor(ctx);
    
    // Activate the banner
    await ctx.db.patch(args.id, {
      isActive: true,
      updatedAt: Date.now(),
    });
    
    return args.id;
  },
});

// Deactivate a banner (admin/editor only)
export const deactivateBanner = mutation({
  args: { id: v.id("banners") },
  handler: async (ctx, args) => {
    // Check if user is admin or editor
    await requireAdminOrEditor(ctx);
    
    // Deactivate the banner
    await ctx.db.patch(args.id, {
      isActive: false,
      updatedAt: Date.now(),
    });
    
    return args.id;
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

// Get banner statistics (admin/editor only)
export const getBannerStats = query({
  args: {},
  handler: async (ctx) => {
    // Check if user is admin or editor
    await requireAdminOrEditor(ctx);
    
    const allBanners = await ctx.db.query("banners").collect();
    
    const stats = {
      total: allBanners.length,
      active: allBanners.filter(b => b.isActive).length,
      inactive: allBanners.filter(b => !b.isActive).length,
      byPage: {
        homepage: allBanners.filter(b => b.pageType === "homepage").length,
        technology: allBanners.filter(b => b.pageType === "technology").length,
        story: allBanners.filter(b => b.pageType === "story").length,
        news: allBanners.filter(b => b.pageType === "news").length,
        general: allBanners.filter(b => b.pageType === "general").length,
      },
      byPosition: {
        hero: allBanners.filter(b => b.position === "hero").length,
        secondary: allBanners.filter(b => b.position === "secondary").length,
        footer: allBanners.filter(b => b.position === "footer").length,
      }
    };
    
    return stats;
  },
});


