import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdminOrEditor, getCurrentUser } from "./lib/auth";

// Query to get all published posts (public)
export const getPublishedPosts = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db
      .query("posts")
      .withIndex("status", (q) => q.eq("status", "published"))
      .order("desc")
      .collect();
    
    return posts;
  },
});

// Query to get a post by slug (public)
export const getPostBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query("posts")
      .withIndex("slug", (q) => q.eq("slug", args.slug))
      .first();
    
    if (!post || post.status !== "published") {
      return null;
    }
    
    return post;
  },
});

// Query to get all posts for CMS (admin/editor only)
export const getAllPosts = query({
  args: {},
  handler: async (ctx) => {
    await requireAdminOrEditor(ctx);
    
    const posts = await ctx.db
      .query("posts")
      .order("desc")
      .collect();
    
    return posts;
  },
});

// Query to get posts by author (admin/editor only)
export const getPostsByAuthor = query({
  args: { authorId: v.id("users") },
  handler: async (ctx, args) => {
    await requireAdminOrEditor(ctx);
    
    const posts = await ctx.db
      .query("posts")
      .withIndex("authorId", (q) => q.eq("authorId", args.authorId))
      .order("desc")
      .collect();
    
    return posts;
  },
});

// Mutation to create a new post
export const createPost = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    content: v.string(),
    image: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    status: v.union(v.literal("draft"), v.literal("published")),
  },
  handler: async (ctx, args) => {
    const user = await requireAdminOrEditor(ctx);
    
    // Check if slug already exists
    const existingPost = await ctx.db
      .query("posts")
      .withIndex("slug", (q) => q.eq("slug", args.slug))
      .first();
    
    if (existingPost) {
      throw new Error("A post with this slug already exists");
    }
    
    const now = Date.now();
    const postId = await ctx.db.insert("posts", {
      title: args.title,
      slug: args.slug,
      description: args.description,
      content: args.content,
      image: args.image,
      imageStorageId: args.imageStorageId,
      status: args.status,
      publishedAt: args.status === "published" ? now : undefined,
      createdAt: now,
      updatedAt: now,
      authorId: user._id,
    });
    
    return postId;
  },
});

// Mutation to update a post
export const updatePost = mutation({
  args: {
    id: v.id("posts"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    description: v.optional(v.string()),
    content: v.optional(v.string()),
    image: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    status: v.optional(v.union(v.literal("draft"), v.literal("published"), v.literal("archived"))),
  },
  handler: async (ctx, args) => {
    await requireAdminOrEditor(ctx);
    
    const post = await ctx.db.get(args.id);
    if (!post) {
      throw new Error("Post not found");
    }
    
    // Check if new slug already exists (if slug is being changed)
    if (args.slug !== undefined && args.slug !== post.slug) {
      const existingPost = await ctx.db
        .query("posts")
        .withIndex("slug", (q) => q.eq("slug", args.slug!))
        .first();
      
      if (existingPost) {
        throw new Error("A post with this slug already exists");
      }
    }
    
    const now = Date.now();
    const updates: Record<string, any> = {
      updatedAt: now,
    };
    
    // Add provided fields to updates
    if (args.title !== undefined) updates.title = args.title;
    if (args.slug !== undefined) updates.slug = args.slug;
    if (args.description !== undefined) updates.description = args.description;
    if (args.content !== undefined) updates.content = args.content;
    if (args.image !== undefined) updates.image = args.image;
    if (args.imageStorageId !== undefined) updates.imageStorageId = args.imageStorageId;
    
    // Handle status change
    if (args.status !== undefined) {
      updates.status = args.status;
      if (args.status === "published" && post.status !== "published") {
        updates.publishedAt = now;
      }
    }
    
    await ctx.db.patch(args.id, updates);
    
    return args.id;
  },
});

// Mutation to delete a post
export const deletePost = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    await requireAdminOrEditor(ctx);
    
    const post = await ctx.db.get(args.id);
    if (!post) {
      throw new Error("Post not found");
    }
    
    await ctx.db.delete(args.id);
    
    return { success: true };
  },
});

// Query to get current user's posts
export const getMyPosts = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Authentication required");
    }
    
    const posts = await ctx.db
      .query("posts")
      .withIndex("authorId", (q) => q.eq("authorId", user._id))
      .order("desc")
      .collect();
    
    return posts;
  },
});

// Query to get a post by ID (admin/editor only)
export const getPostById = query({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    await requireAdminOrEditor(ctx);
    
    const post = await ctx.db.get(args.id);
    if (!post) {
      throw new Error("Post not found");
    }
    
    return post;
  },
}); 