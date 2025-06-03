import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./lib/auth";

// Query to get all menu items (admin only)
export const getAllMenuItems = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    
    const menuItems = await ctx.db
      .query("menuItems")
      .withIndex("order")
      .order("asc")
      .collect();
    
    return menuItems;
  },
});

// Query to get visible menu items (public)
export const getVisibleMenuItems = query({
  args: {},
  handler: async (ctx) => {
    // No authentication required for public menu items
    const menuItems = await ctx.db
      .query("menuItems")
      .withIndex("order")
      .filter((q) => q.eq(q.field("isVisible"), true))
      .order("asc")
      .collect();
    
    return menuItems;
  },
});

// Query to get a menu item by ID
export const getMenuItemById = query({
  args: { id: v.id("menuItems") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    
    const menuItem = await ctx.db.get(args.id);
    if (!menuItem) {
      throw new Error("Menu item not found");
    }
    
    return menuItem;
  },
});

// Mutation to toggle menu item visibility
export const toggleMenuItemVisibility = mutation({
  args: { 
    id: v.id("menuItems"),
    isVisible: v.boolean(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    
    const menuItem = await ctx.db.get(args.id);
    if (!menuItem) {
      throw new Error("Menu item not found");
    }
    
    await ctx.db.patch(args.id, {
      isVisible: args.isVisible,
      updatedAt: Date.now(),
    });
    
    return args.id;
  },
});

// Mutation to update a menu item
export const updateMenuItem = mutation({
  args: {
    id: v.id("menuItems"),
    title: v.optional(v.string()),
    href: v.optional(v.string()),
    order: v.optional(v.number()),
    description: v.optional(v.string()),
    isExternal: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    
    const menuItem = await ctx.db.get(args.id);
    if (!menuItem) {
      throw new Error("Menu item not found");
    }
    
    const updates: Record<string, any> = {
      updatedAt: Date.now(),
    };
    
    // Add provided fields to updates
    if (args.title !== undefined) updates.title = args.title;
    if (args.href !== undefined) updates.href = args.href;
    if (args.order !== undefined) updates.order = args.order;
    if (args.description !== undefined) updates.description = args.description;
    if (args.isExternal !== undefined) updates.isExternal = args.isExternal;
    
    await ctx.db.patch(args.id, updates);
    
    return args.id;
  },
});

// Mutation to create a new menu item
export const createMenuItem = mutation({
  args: {
    title: v.string(),
    href: v.string(),
    order: v.number(),
    isVisible: v.boolean(),
    description: v.optional(v.string()),
    isExternal: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    
    const now = Date.now();
    const menuItemId = await ctx.db.insert("menuItems", {
      title: args.title,
      href: args.href,
      order: args.order,
      isVisible: args.isVisible,
      description: args.description,
      isExternal: args.isExternal,
      createdAt: now,
      updatedAt: now,
    });
    
    return menuItemId;
  },
});

// Mutation to delete a menu item
export const deleteMenuItem = mutation({
  args: { id: v.id("menuItems") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    
    const menuItem = await ctx.db.get(args.id);
    if (!menuItem) {
      throw new Error("Menu item not found");
    }
    
    await ctx.db.delete(args.id);
    
    return { success: true };
  },
}); 