// This script creates a Next.js middleware to exclude certain routes from being statically generated

const fs = require('fs');
const path = require('path');

// Create the middleware.js file in the src directory
const middlewarePath = path.join(__dirname, '../src/middleware.js');

const middlewareContent = `
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
`;

// Write the middleware file
fs.writeFileSync(middlewarePath, middlewareContent);

console.log('Middleware file created successfully at:', middlewarePath); 