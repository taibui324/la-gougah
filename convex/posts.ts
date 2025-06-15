import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdminOrEditor, getCurrentUser } from "./lib/auth";

// Helper function to calculate word count
function calculateWordCount(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

// Helper function to calculate reading time (average 200 words per minute)
function calculateReadingTime(wordCount: number): number {
  return Math.ceil(wordCount / 200);
}

// Helper function to generate excerpt from markdown content
function generateExcerpt(content: string, maxLength: number = 160): string {
  // Remove markdown syntax for excerpt
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links, keep text
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  return plainText.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

// Helper function to process markdown content
function processMarkdownContent(content: string) {
  const wordCount = calculateWordCount(content);
  const readingTime = calculateReadingTime(wordCount);
  const excerpt = generateExcerpt(content);
  
  return {
    wordCount,
    readingTime,
    excerpt,
  };
}

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

// Mutation to create a new post with markdown support
export const createPost = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    content: v.string(), // Markdown content
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
    
    // Process markdown content
    const { wordCount, readingTime, excerpt } = processMarkdownContent(args.content);
    
    const now = Date.now();
    const postId = await ctx.db.insert("posts", {
      title: args.title,
      slug: args.slug,
      description: args.description,
      content: args.content,
      excerpt,
      wordCount,
      readingTime,
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

// Mutation to update a post with markdown support
export const updatePost = mutation({
  args: {
    id: v.id("posts"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    description: v.optional(v.string()),
    content: v.optional(v.string()), // Markdown content
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
    if (args.image !== undefined) updates.image = args.image;
    if (args.imageStorageId !== undefined) updates.imageStorageId = args.imageStorageId;
    
    // Process markdown content if it's being updated
    if (args.content !== undefined) {
      const { wordCount, readingTime, excerpt } = processMarkdownContent(args.content);
      updates.content = args.content;
      updates.excerpt = excerpt;
      updates.wordCount = wordCount;
      updates.readingTime = readingTime;
    }
    
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

// Query to get post statistics
export const getPostStats = query({
  args: {},
  handler: async (ctx) => {
    await requireAdminOrEditor(ctx);
    
    const allPosts = await ctx.db.query("posts").collect();
    
    const stats = {
      total: allPosts.length,
      published: allPosts.filter(p => p.status === "published").length,
      draft: allPosts.filter(p => p.status === "draft").length,
      archived: allPosts.filter(p => p.status === "archived").length,
      totalWordCount: allPosts.reduce((sum, post) => sum + (post.wordCount || 0), 0),
      averageReadingTime: allPosts.length > 0 
        ? Math.round(allPosts.reduce((sum, post) => sum + (post.readingTime || 0), 0) / allPosts.length)
        : 0,
    };
    
    return stats;
  },
});

 