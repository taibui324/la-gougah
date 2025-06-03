import { test, expect } from '@playwright/test';

test('Debug 404 refresh issue on "câu chuyện" page', async ({ page }) => {
  // Step 1: Go to the homepage
  await page.goto('https://www.lagougah.com/');
  console.log('Navigated to homepage');
  
  // Step 2: Find and click on the "câu chuyện" link
  const storyLink = await page.getByText('Câu Chuyện', { exact: true });
  console.log('Found story link:', await storyLink.isVisible());
  
  // Get the href attribute from the link
  const storyHref = await storyLink.evaluate((el) => {
    if (el instanceof HTMLAnchorElement) {
      return el.href;
    }
    return null;
  });
  
  console.log('Story link href:', storyHref);
  
  // Navigate directly to the story page URL instead of clicking
  // This is more reliable for testing
  if (storyHref) {
    await page.goto(storyHref);
  } else {
    // Fallback to directly navigating to the /story page
    await page.goto('https://www.lagougah.com/story');
  }
  
  console.log('Navigated to story page:', page.url());
  
  // Take a screenshot after navigating to the story page
  await page.screenshot({ path: 'story-page.png' });
  
  // Step 3: Reload the page
  await page.reload({ waitUntil: 'domcontentloaded' });
  console.log('Reloaded the page');
  
  // Wait for a short time to ensure the page has had a chance to load or show error
  await page.waitForTimeout(3000);
  
  // Log the URL after refresh
  console.log('Current URL after refresh:', page.url());
  
  // Take a screenshot after refresh
  await page.screenshot({ path: 'after-refresh.png' });
  
  // Check if there's a 404 error on the page
  const pageContent = await page.content();
  const has404 = pageContent.includes('404') || 
                 pageContent.includes('not found') || 
                 pageContent.includes('Not Found');
  
  console.log('Page has 404 content:', has404);
  
  // Check if we have any elements visible on the page after refresh
  const bodyContent = await page.locator('body').textContent();
  console.log('Body content length after refresh:', bodyContent?.length);
  
  // Log page title
  const pageTitle = await page.title();
  console.log('Page title after refresh:', pageTitle);
  
  // Check for specific expected elements on the story page
  const hasStoryContent = await page.locator('h1, h2, h3').count() > 0;
  console.log('Has story content headings:', hasStoryContent);
}); 