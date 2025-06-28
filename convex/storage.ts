import { query } from "./_generated/server";
import { v } from "convex/values";

// Get storage URL for a given storage ID
export const getStorageUrl = query({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    try {
      console.log(`Getting storage URL for ID: ${args.storageId}`);
      
      // Validate the storage ID format
      if (!args.storageId || args.storageId.trim() === "") {
        console.error("Invalid storage ID provided: empty or undefined");
        return null;
      }
      
      // Get the storage URL from Convex
      const url = await ctx.storage.getUrl(args.storageId as any);
      
      if (!url) {
        console.error(`No URL found for storage ID: ${args.storageId}`);
        return null;
      }
      
      console.log(`Successfully retrieved URL for storage ID: ${args.storageId}`);
      return url;
    } catch (error) {
      console.error(`Error getting storage URL for ID ${args.storageId}:`, error);
      // Log detailed error information
      if (error instanceof Error) {
        console.error(`Error name: ${error.name}, message: ${error.message}`);
        console.error(`Stack trace: ${error.stack}`);
      }
      return null;
    }
  },
}); 