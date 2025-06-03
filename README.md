This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 404 Refresh Issue Fix

We've identified a 404 refresh issue when navigating to pages like `/story` and then refreshing the browser. This happens because the site is using static export (`output: 'export'` in next.config.js), which generates static HTML files.

### Root Cause

When using static export with Next.js, client-side navigation works fine, but when the browser refreshes, it tries to fetch the page directly from the server. With static hosting, the server doesn't know how to handle these URLs unless specific configuration is provided.

### Solution Options

1. **Netlify Configuration (Recommended)**: 
   
   Update the `netlify.toml` file to include proper redirects for SPA:

   ```toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Add index.html to all routes**:
   
   When using `output: 'export'`, ensure that `trailingSlash: true` is enabled in next.config.js, which will generate `/route/index.html` files for all routes.

3. **Use a Custom 404 Page**:
   
   Implement proper 404.html and redirect logic (already in place).

4. **Switch to Server-Side Rendering**:
   
   If possible, consider switching from static export to server-side rendering for better handling of dynamic routes and page refreshes.

### Implementation

The recommended approach for Netlify hosting is to combine solutions 1 and 2:

1. Enable `trailingSlash: true` in next.config.js
2. Properly configure redirects in netlify.toml
3. Keep the custom 404.html page for fallback

This should ensure that page refreshes work correctly on all routes.
