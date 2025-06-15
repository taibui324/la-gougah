import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  
  // Users table with roles
  users: defineTable({
    name: v.optional(v.string()),
    email: v.string(),
    image: v.optional(v.string()),
    role: v.union(v.literal("admin"), v.literal("editor"), v.literal("user")),
    status: v.optional(v.union(v.literal("active"), v.literal("inactive"))),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    isAnonymous: v.optional(v.boolean()),
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
  }).index("email", ["email"]),

  // Posts table for news articles with markdown support
  posts: defineTable({
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    content: v.string(),
    contentHtml: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    image: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    status: v.union(v.literal("draft"), v.literal("published"), v.literal("archived")),
    publishedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
    authorId: v.id("users"),
    wordCount: v.optional(v.number()),
    readingTime: v.optional(v.number()),
  })
    .index("slug", ["slug"])
    .index("status", ["status"])
    .index("publishedAt", ["publishedAt"])
    .index("authorId", ["authorId"]),

  // Menu items for header navigation
  menuItems: defineTable({
    title: v.string(),
    href: v.string(),
    order: v.number(),
    isVisible: v.boolean(),
    isExternal: v.optional(v.boolean()),
    description: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("order", ["order"]),

  // Banners for homepage and other sections with page-specific targeting
  banners: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    image: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    link: v.optional(v.string()),
    linkText: v.optional(v.string()), // Call-to-action button text
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
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("pageType", ["pageType"])
    .index("position", ["position"])
    .index("isActive", ["isActive"])
    .index("pageTypePosition", ["pageType", "position"])
    .index("order", ["order"]),

  // Contact settings
  contactSettings: defineTable({
    email: v.string(),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    socialLinks: v.optional(v.object({
      facebook: v.optional(v.string()),
      instagram: v.optional(v.string()),
      twitter: v.optional(v.string()),
      linkedin: v.optional(v.string()),
    })),
    updatedAt: v.number(),
    updatedBy: v.id("users"),
  }),
});

export default schema; 