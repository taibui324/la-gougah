import { httpRouter } from "convex/server";
import { auth } from "./auth";
import { v } from "convex/values";
import { mutation } from "./_generated/server";

const http = httpRouter();

auth.addHttpRoutes(http);

// Generate a signed upload URL for file uploads
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    // Generate a signed upload URL that allows the client to upload
    // a file to Convex storage.
    return await ctx.storage.generateUploadUrl();
  },
});

export default http; 