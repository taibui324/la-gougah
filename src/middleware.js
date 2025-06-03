/*
 * This middleware is disabled for compatibility with static export.
 * If you need middleware functionality, you'll need to switch from 'output: export'
 * to a dynamic deployment method.
 */

/*
export function middleware(request) {
  // This middleware blocks access to the CMS routes during build time
  // but allows them during development
  return Response.next();
}

export const config = {
  // Skip all paths that should not be statically generated
  // This helps with the ToastProvider error during build
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|news|cms).*)',
  ],
};
*/
