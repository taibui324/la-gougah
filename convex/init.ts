import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { initializeContactSettings as initContactSettings } from "./contactSettings";

// Function to create the first admin user
export const createFirstAdmin = mutation({
  args: {
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if any users exist
    const existingUsers = await ctx.db.query("users").collect();
    if (existingUsers.length > 0) {
      throw new Error("Cannot create first admin: users already exist");
    }

    // Create the admin user
    const userId = await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      role: "admin",
    });

    return userId;
  },
});

// Query to list all users (for setup)
export const listUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

// Function to update menu items to Vietnamese
export const updateMenuItemsToVietnamese = mutation({
  args: {},
  handler: async (ctx) => {
    const menuItems = await ctx.db.query("menuItems").collect();
    
    const translations: Record<string, string> = {
      "Home": "Trang Chủ",
      "Our Story": "Câu Chuyện",
      "Origin": "Nguồn Gốc",
      "Our Technology": "Công Nghệ",
      "Products": "Sản Phẩm",
      "News": "Tin Tức",
      "Contact": "Liên Hệ"
    };
    
    const updates = [];
    
    for (const item of menuItems) {
      const vietnameseTitle = translations[item.title];
      if (vietnameseTitle && vietnameseTitle !== item.title) {
        await ctx.db.patch(item._id, {
          title: vietnameseTitle,
          updatedAt: Date.now(),
        });
        updates.push(`Updated "${item.title}" to "${vietnameseTitle}"`);
      }
    }
    
    return {
      message: "Menu items updated to Vietnamese",
      updates: updates
    };
  },
});

// Function to create menu items
export const initializeMenuItems = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if menu items already exist
    const existingMenuItems = await ctx.db.query("menuItems").collect();
    if (existingMenuItems.length > 0) {
      return { message: "Menu items already initialized" };
    }

    const now = Date.now();

    // Create default menu items
    await ctx.db.insert("menuItems", {
      title: "Home",
      href: "/",
      isVisible: true,
      order: 1,
      description: "Homepage",
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("menuItems", {
      title: "Our Story",
      href: "/story",
      isVisible: true,
      order: 2,
      description: "About our brand",
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("menuItems", {
      title: "Our Technology",
      href: "/technology",
      isVisible: true,
      order: 3,
      description: "Our production technology",
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("menuItems", {
      title: "News",
      href: "/news",
      isVisible: true,
      order: 4,
      description: "Latest news and updates",
      createdAt: now,
      updatedAt: now,
    });

    return { message: "Menu items initialized successfully" };
  },
});

// Create a new admin user (when some users already exist)
export const createNewAdmin = mutation({
  args: {
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    // Create the admin user
    const userId = await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      role: "admin",
    });

    return userId;
  },
});

// Initialize contact settings
export const initializeContactSettings = mutation({
  args: {
    adminUserId: v.id("users"),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // Get the admin user to verify permission
    const adminUser = await ctx.db.get(args.adminUserId);
    if (!adminUser || adminUser.role !== "admin") {
      throw new Error("Only admins can initialize contact settings");
    }
    
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
      updatedBy: args.adminUserId,
    });
    
    return settingsId;
  },
}); 