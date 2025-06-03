# 404 Refresh Issue Report

## Issue Description

When navigating to the "Câu Chuyện" page (URL: `/story`) and then refreshing the browser, a 404 error page is shown instead of the actual content.

## Test Results

We created a Playwright test to reproduce and debug this issue. The test:

1. Navigated to https://www.lagougah.com/
2. Found and extracted the "Câu Chuyện" link
3. Navigated to the story page (https://www.lagougah.com/story)
4. Reloaded the page
5. Checked for 404 errors

**Test Outcome**: The test confirmed that after refreshing the story page, a 404 error is displayed:
- Current URL after refresh: https://www.lagougah.com/story
- Page shows 404 content: true
- Page title after refresh: "404 Not Found"

## Root Cause Analysis

The issue occurs because the website is built using Next.js with static export (`output: 'export'` in next.config.js), which generates static HTML files. When using static hosting:

1. Client-side navigation works fine (clicking links)
2. When the browser refreshes, it requests the page directly from the server
3. The static hosting server doesn't know how to handle these URLs unless specific configuration is provided

## Recommended Fixes

We implemented and tested several changes to address this issue:

1. **Next.js Configuration**:
   - Added `trailingSlash: true` in next.config.js to generate `/route/index.html` files

2. **Netlify Configuration**:
   - Updated netlify.toml with proper redirects for single-page application behavior:
   ```toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

3. **Custom 404 Page**:
   - Created a custom 404.html with smart redirect logic
   - Implemented App Router not-found.tsx for graceful fallback

## Implementation Status

We've committed changes to the repository that include:

1. ✅ Updated next.config.js with `trailingSlash: true`
2. ✅ Updated netlify.toml with SPA redirects
3. ✅ Added a custom 404.html page with redirect logic
4. ✅ Created a custom build script to handle CMS pages properly

## Next Steps

To fully resolve this issue:

1. Deploy the changes to Netlify
2. Verify the fix on the live site
3. Run the Playwright test against the production site to confirm the issue is resolved

## Additional Notes

This issue is common with statically exported Next.js sites. The recommended approach for Netlify hosting is to use proper redirects in netlify.toml combined with `trailingSlash: true` in Next.js configuration. 