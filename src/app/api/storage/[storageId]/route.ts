import { NextRequest, NextResponse } from "next/server";

// This makes the route compatible with static export
export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { storageId: string } }
) {
  try {
    // Get storageId from params
    const { storageId } = params;
    
    if (!storageId) {
      return new NextResponse("Storage ID is required", { status: 400 });
    }
    
    // Construct URL to Convex storage file
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!convexUrl) {
      return new NextResponse("Convex URL not configured", { status: 500 });
    }
    
    // Format: https://cheerful-beaver-403.convex.cloud/api/storage/STORAGE_ID
    const fileUrl = `${convexUrl}/api/storage/${storageId}`;
    
    // Fetch the file from Convex
    const response = await fetch(fileUrl);
    
    if (!response.ok) {
      return new NextResponse(`File not found: ${response.statusText}`, { status: response.status });
    }
    
    // Get file buffer and content type
    const buffer = await response.arrayBuffer();
    const headers = new Headers();
    
    // Set content type if available
    const contentType = response.headers.get("Content-Type");
    if (contentType) {
      headers.set("Content-Type", contentType);
    }
    
    // Set cache control for better performance
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
    
    return new NextResponse(buffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error fetching file from storage:", error);
    return new NextResponse("Error fetching file", { status: 500 });
  }
} 