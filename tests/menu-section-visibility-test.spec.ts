import { test, expect } from '@playwright/test';

test('Menu item visibility controls section visibility', async ({ page }) => {
  // Go to CMS login page
  await page.goto('http://localhost:3001/cms/');
  console.log('Loaded CMS login page');
  await page.screenshot({ path: 'test-cms-login.png' });

  // Login with credentials from cms.md
  await page.fill('input[name="email"]', 'test@lagougah.com');
  await page.fill('input[name="password"]', 'TestAdmin123!');
  await page.click('button[type="submit"]');
  
  // Wait for dashboard to load
  await page.waitForURL('**/cms');
  console.log('Logged in successfully');
  await page.screenshot({ path: 'test-after-login.png' });

  // Navigate to Menu Items page
  await page.click('a:has-text("Menu Items")');
  await page.waitForURL('**/cms/menu');
  console.log('Navigated to Menu Items page');
  
  // Find the News menu item and check its current visibility state
  const newsRow = await page.locator('tr', { hasText: 'News' }).first();
  const initialVisibility = await newsRow.locator('input[type="checkbox"]').isChecked();
  console.log(`Initial News visibility: ${initialVisibility ? 'Visible' : 'Hidden'}`);
  
  // Take note of the initial state
  await page.goto('http://localhost:3001/');
  await page.waitForLoadState('networkidle');
  console.log('Loaded homepage to check initial state');
  
  // Check if News section is visible initially
  const initialNewsSectionVisible = await page.locator('section#news').isVisible();
  console.log(`News section initially visible: ${initialNewsSectionVisible}`);
  
  // Go back to menu items page
  await page.goto('http://localhost:3001/cms/menu');
  await page.waitForURL('**/cms/menu');
  
  // Toggle the visibility of the News menu item
  await newsRow.locator('input[type="checkbox"]').click();
  console.log('Toggled News menu item visibility');
  
  // Wait for the change to be applied
  await page.waitForTimeout(1000);
  
  // Check the new visibility state
  const newVisibility = await newsRow.locator('input[type="checkbox"]').isChecked();
  console.log(`New News visibility: ${newVisibility ? 'Visible' : 'Hidden'}`);
  
  // Navigate to homepage to check if the News section visibility changed
  await page.goto('http://localhost:3001/');
  await page.waitForLoadState('networkidle');
  console.log('Loaded homepage to check new state');
  
  // Check if News section visibility changed accordingly
  const newNewsSectionVisible = await page.locator('section#news').isVisible();
  console.log(`News section now visible: ${newNewsSectionVisible}`);
  
  // Assert that the visibility changed as expected
  expect(newNewsSectionVisible).toBe(newVisibility);
  
  // Reset to original state
  await page.goto('http://localhost:3001/cms/menu');
  await page.waitForURL('**/cms/menu');
  
  if (newVisibility !== initialVisibility) {
    await newsRow.locator('input[type="checkbox"]').click();
    console.log('Reset News menu item visibility to original state');
    await page.waitForTimeout(1000);
  }
  
  // Verify reset worked
  const finalVisibility = await newsRow.locator('input[type="checkbox"]').isChecked();
  expect(finalVisibility).toBe(initialVisibility);
  
  console.log('Test completed: Menu item visibility controls section visibility');
}); 