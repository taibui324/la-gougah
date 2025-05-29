import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Function to create the first admin user
export const createFirstAdmin = mutation({
  args: {
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if any admin users already exist
    const existingAdmins = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("role"), "admin"))
      .collect();

    if (existingAdmins.length > 0) {
      throw new Error("Admin user already exists");
    }

    // Check if user with this email already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", args.email))
      .first();

    if (existingUser) {
      // Update existing user to admin
      await ctx.db.patch(existingUser._id, {
        role: "admin",
        name: args.name,
      });
      return existingUser._id;
    } else {
      // Create new admin user
      const userId = await ctx.db.insert("users", {
        email: args.email,
        name: args.name,
        role: "admin",
      });
      return userId;
    }
  },
});

// Function to check existing users (for debugging)
export const listUsers = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users.map(user => ({
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    }));
  },
});

// Function to initialize default menu items
export const initializeMenuItems = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if menu items already exist
    const existingItems = await ctx.db.query("menuItems").collect();
    if (existingItems.length > 0) {
      return { message: "Menu items already initialized" };
    }

    const defaultMenuItems = [
      {
        title: "Nguồn Gốc",
        href: "#origin",
        order: 1,
        isVisible: true,
        description: "About our water source",
      },
      {
        title: "Sản Phẩm",
        href: "#products",
        order: 2,
        isVisible: true,
        description: "Our product range",
      },
      {
        title: "Công Nghệ",
        href: "#technology",
        order: 3,
        isVisible: true,
        description: "Our technology",
      },
      {
        title: "Câu Chuyện",
        href: "/story",
        order: 4,
        isVisible: true,
        description: "Our story page",
      },
      {
        title: "Tin Tức",
        href: "/news",
        order: 5,
        isVisible: true,
        description: "News and updates",
      },
      {
        title: "Liên Hệ",
        href: "#contact",
        order: 6,
        isVisible: true,
        description: "Contact information",
      },
    ];

    const now = Date.now();
    for (const item of defaultMenuItems) {
      await ctx.db.insert("menuItems", {
        ...item,
        createdAt: now,
        updatedAt: now,
      });
    }

    return { message: "Menu items initialized successfully" };
  },
});

// Function to create a new admin user (for testing)
export const createNewAdmin = mutation({
  args: {
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user with this email already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", args.email))
      .first();

    if (existingUser) {
      // Update existing user to admin
      await ctx.db.patch(existingUser._id, {
        role: "admin",
        name: args.name,
      });
      return { 
        message: `Updated existing user ${args.email} to admin role`,
        userId: existingUser._id 
      };
    } else {
      // Create new admin user
      const userId = await ctx.db.insert("users", {
        email: args.email,
        name: args.name,
        role: "admin",
      });
      return { 
        message: `Created new admin user ${args.email}`,
        userId: userId 
      };
    }
  },
});

// Function to initialize contact settings
export const initializeContactSettings = mutation({
  args: {
    email: v.string(),
    adminUserId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Check if contact settings already exist
    const existingSettings = await ctx.db.query("contactSettings").first();
    if (existingSettings) {
      return { message: "Contact settings already initialized" };
    }

    await ctx.db.insert("contactSettings", {
      email: args.email,
      phone: "+84 123 456 789",
      address: "Lâm Đồng, Việt Nam",
      socialLinks: {
        facebook: "https://facebook.com/lagougah",
        instagram: "https://instagram.com/lagougah",
        twitter: "https://twitter.com/lagougah",
        linkedin: "https://linkedin.com/company/lagougah",
      },
      updatedAt: Date.now(),
      updatedBy: args.adminUserId,
    });

    return { message: "Contact settings initialized successfully" };
  },
}); 