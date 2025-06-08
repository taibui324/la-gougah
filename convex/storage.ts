import { query } from "./_generated/server";
import { v } from "convex/values";

// Get storage URL for a given storage ID
export const getStorageUrl = query({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    try {
      // Get the storage URL from Convex
      const url = await ctx.storage.getUrl(args.storageId as any);
      return url;
    } catch (error) {
      console.error("Error getting storage URL:", error);
      return null;
    }
  },
}); 