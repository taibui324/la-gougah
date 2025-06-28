import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";

// This makes the route compatible with static export and prevents caching
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Helper function to add CORS headers
function addCorsHeaders(response: NextResponse): NextResponse {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  return addCorsHeaders(response);
}

export async function GET(
  request: NextRequest,
  { params }: { params: { storageId: string } },
) {
  try {
    // Fix for Next.js 15: await params
    const { storageId } = await Promise.resolve(params);

    console.log(`Storage API called for storageId: ${storageId}`);

    if (!storageId) {
      console.error("Storage API Error: Storage ID is missing");
      const response = new NextResponse("Storage ID is required", { 
        status: 400,
        headers: {
          'Content-Type': 'text/plain'
        }
      });
      return addCorsHeaders(response);
    }

    // Get Convex URL
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!convexUrl) {
      console.error("Storage API Error: Convex URL is not configured");
      const response = new NextResponse("Convex URL not configured", { 
        status: 500,
        headers: {
          'Content-Type': 'text/plain'
        }
      });
      return addCorsHeaders(response);
    }

    // Create Convex client
    const client = new ConvexHttpClient(convexUrl);

    // Get the actual file URL from Convex storage
    console.log(`Fetching URL for storageId: ${storageId}`);
    let fileUrl;
    try {
      fileUrl = await client.query(api.storage.getStorageUrl, {
        storageId,
      });
    } catch (queryError) {
      console.error(`Storage API Error: Failed to query storage URL:`, queryError);
      const response = new NextResponse(`Error querying storage URL: ${queryError instanceof Error ? queryError.message : String(queryError)}`, { 
        status: 500,
        headers: {
          'Content-Type': 'text/plain'
        }
      });
      return addCorsHeaders(response);
    }

    console.log(`File URL result: ${fileUrl ? "Found" : "Not found"} for storageId: ${storageId}`);
    
    if (!fileUrl) {
      console.error(`Storage API Error: File not found for storageId: ${storageId}`);
      const response = new NextResponse("File not found in storage", { 
        status: 404,
        headers: {
          'Content-Type': 'text/plain'
        }
      });
      return addCorsHeaders(response);
    }

    console.log(`Redirecting to: ${fileUrl.substring(0, 50)}...`);
    
    // Redirect to the actual Convex storage URL with proper cache headers
    const response = NextResponse.redirect(fileUrl);
    
    // Add cache control headers to prevent caching issues
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    // Add CORS headers
    return addCorsHeaders(response);
  } catch (error) {
    console.error("Storage API Critical Error:", error);
    // Return a more detailed error response
    const response = new NextResponse(`Error accessing file: ${error instanceof Error ? error.message : String(error)}`, { 
      status: 500,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
    return addCorsHeaders(response);
  }
}
