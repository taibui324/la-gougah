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
      v.literal("story")
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
      v.literal("story")
    )
  },
  handler: async (ctx, args) => {
    console.log(`Getting hero banner for page: ${args.pageType}`);
    
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
    
    if (banner) {
      console.log(`Found hero banner for page ${args.pageType}:`, {
        id: banner._id,
        title: banner.title,
        isActive: banner.isActive,
        position: banner.position,
        hasImage: !!banner.image,
        hasStorageId: !!banner.imageStorageId,
        imageStorageId: banner.imageStorageId,
      });
    } else {
      console.log(`No hero banner found for page: ${args.pageType}`);
    }
    
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
      v.literal("story")
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

// Get active slider banners by group (public)
export const getActiveSlidersByGroup = query({
  args: { 
    pageType: v.union(
      v.literal("homepage"),
      v.literal("technology"),
      v.literal("story")
    ),
    sliderGroup: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    console.log(`Getting active sliders for page: ${args.pageType}, group: ${args.sliderGroup || "all"}`);
    
    let query = ctx.db
      .query("banners")
      .withIndex("pageType", (q) => q.eq("pageType", args.pageType))
      .filter(q => q.and(
        q.eq(q.field("isActive"), true),
        q.eq(q.field("isSlider"), true)
      ));
    
    if (args.sliderGroup) {
      // Further filter by sliderGroup if provided
      query = query.filter(q => q.eq(q.field("sliderGroup"), args.sliderGroup));
    }
    
    const banners = await query.order("asc").collect();
    console.log(`Found ${banners.length} active slider banners for page: ${args.pageType}`);
    
    // Log details of each banner for debugging
    banners.forEach((banner, index) => {
      console.log(`Banner ${index + 1}:`, {
        id: banner._id,
        title: banner.title,
        isActive: banner.isActive,
        isSlider: banner.isSlider,
        hasImage: !!banner.image,
        hasStorageId: !!banner.imageStorageId,
        order: banner.order,
      });
    });
    
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
    image: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    link: v.optional(v.string()),
    pageType: v.union(
      v.literal("homepage"),
      v.literal("technology"),
      v.literal("story")
    ),
    position: v.union(
      v.literal("hero"),
      v.literal("secondary"),
      v.literal("footer")
    ),
    isSlider: v.boolean(),
    sliderGroup: v.optional(v.string()),
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
    image: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    link: v.optional(v.string()),
    pageType: v.union(
      v.literal("homepage"),
      v.literal("technology"),
      v.literal("story")
    ),
    position: v.union(
      v.literal("hero"),
      v.literal("secondary"),
      v.literal("footer")
    ),
    isSlider: v.boolean(),
    sliderGroup: v.optional(v.string()),
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
      sliders: allBanners.filter(b => b.isSlider).length,
      byPage: {
        homepage: allBanners.filter(b => b.pageType === "homepage").length,
        technology: allBanners.filter(b => b.pageType === "technology").length,
        story: allBanners.filter(b => b.pageType === "story").length,
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


