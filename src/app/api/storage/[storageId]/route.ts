import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";

// This makes the route compatible with static export
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ storageId: string }> },
) {
  try {
    // Get storageId from params - await the params Promise in Next.js 15
    const { storageId } = await params;

    if (!storageId) {
      return new NextResponse("Storage ID is required", { status: 400 });
    }

    // Get Convex URL
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!convexUrl) {
      return new NextResponse("Convex URL not configured", { status: 500 });
    }

    // Create Convex client
    const client = new ConvexHttpClient(convexUrl);

    // Get the actual file URL from Convex storage
    const fileUrl = await client.query(api.storage.getStorageUrl, {
      storageId,
    });

    if (!fileUrl) {
      return new NextResponse("File not found in storage", { status: 404 });
    }

    // Redirect to the actual Convex storage URL
    return NextResponse.redirect(fileUrl);
  } catch (error) {
    console.error("Error getting storage URL:", error);
    return new NextResponse("Error accessing file", { status: 500 });
  }
}
