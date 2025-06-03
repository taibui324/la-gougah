import { test, expect } from '@playwright/test';

test('Post management functionality test', async ({ page }) => {
  const testPostTitle = `Test Post ${Date.now()}`;
  const testPostSlug = `test-post-${Date.now()}`;
  const testPostDescription = 'This is a test post description for Playwright testing';
  const testPostContent = '<p>This is a test post content. It is created automatically using Playwright testing.</p><p>This post is used to verify the CMS post management functionality.</p>';

  // Go to CMS login page
  await page.goto('http://localhost:3001/cms/');
  console.log('Loaded CMS login page');
  await page.screenshot({ path: 'test-cms-login.png' });

  // Login with credentials from cms.md
  await page.fill('input[name="email"]', 'test@lagougah.com');
  await page.fill('input[name="password"]', 'TestAdmin123!');
  await page.click('button[type="submit"]');

  // Wait for login to complete
  await page.waitForTimeout(3000);
  console.log('Logged into CMS');
  await page.screenshot({ path: 'test-cms-dashboard.png' });

  // Navigate to Posts section
  await page.getByRole('link', { name: 'Posts', exact: true }).click();
  await page.waitForTimeout(1000);
  console.log('Navigated to Posts section');
  await page.screenshot({ path: 'test-posts-list.png' });

  // Click on New Post button
  await page.getByRole('link', { name: 'New Post' }).first().click();
  await page.waitForTimeout(1000);
  console.log('Navigated to New Post page');
  await page.screenshot({ path: 'test-new-post-page.png' });

  // Fill in post details
  await page.fill('input[name="title"]', testPostTitle);
  await page.fill('input[name="slug"]', testPostSlug);
  await page.fill('textarea[name="description"]', testPostDescription);

  // Fill in content (using contenteditable iframe if it exists, otherwise regular textarea)
  try {
    // Try to locate the content editor frame (if using a rich text editor)
    const frame = page.frameLocator('iframe.tox-edit-area__iframe').first();
    await frame.locator('body').fill(testPostContent);
  } catch (error) {
    // Fallback to regular textarea if iframe doesn't exist
    await page.fill('textarea[name="content"]', testPostContent);
  }

  // Set status to published
  await page.click('[aria-label="Select status"]');
  await page.getByRole('option', { name: 'Published' }).click();

  // Submit the form
  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);
  console.log('Submitted new post form');
  await page.screenshot({ path: 'test-post-submitted.png' });

  // Verify post is listed in the posts list
  await page.goto('http://localhost:3001/cms/posts');
  await page.waitForTimeout(2000);
  const postTitle = await page.getByText(testPostTitle).first();
  expect(postTitle).toBeTruthy();
  console.log('Verified post appears in CMS posts list');
  await page.screenshot({ path: 'test-post-in-list.png' });

  // Check if post appears on public news page
  await page.goto('http://localhost:3001/news');
  await page.waitForTimeout(2000);
  console.log('Navigated to public news page');
  await page.screenshot({ path: 'test-news-page.png' });

  const publicPostTitle = await page.getByText(testPostTitle).first();
  expect(publicPostTitle).toBeTruthy();
  console.log('Verified post appears on public news page');

  // Check the post detail page
  await page.getByText(testPostTitle).first().click();
  await page.waitForTimeout(2000);
  console.log('Navigated to post detail page');
  await page.screenshot({ path: 'test-post-detail.png' });

  // Verify post content on detail page
  const contentElement = await page.locator('.prose');
  const contentHtml = await contentElement.innerHTML();
  expect(contentHtml).toContain('This is a test post content');
  console.log('Verified post content on detail page');

  // Go back to CMS to delete the test post
  await page.goto('http://localhost:3001/cms/posts');
  await page.waitForTimeout(2000);

  // Find the test post and delete it
  const postRow = await page.getByText(testPostTitle).first();
  await postRow.scrollIntoViewIfNeeded();
  
  // Click the delete button in the same row as the post title
  const deleteButton = await page.getByText(testPostTitle)
    .locator('..')
    .locator('..')
    .getByRole('button', { name: 'Delete' });
  
  await deleteButton.click();
  
  // Confirm deletion in the dialog
  await page.waitForTimeout(500);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000);
  console.log('Deleted test post');
  await page.screenshot({ path: 'test-post-deleted.png' });
}); 