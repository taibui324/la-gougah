import { test, expect } from '@playwright/test';

test('navigation between homepage and CMS works correctly', async ({ page }) => {
  // Go to homepage
  await page.goto('http://localhost:3000/');
  await page.screenshot({ path: 'test-homepage.png' });
  
  // Check that menu items are displayed
  const menuItems = await page.locator('nav a').all();
  expect(menuItems.length).toBeGreaterThan(0);
  console.log(`Found ${menuItems.length} menu items`);
  
  // Go to CMS page
  await page.goto('http://localhost:3000/cms/');
  await page.screenshot({ path: 'test-cms-login.png' });
  
  // Check if login form is displayed
  const loginForm = await page.locator('form').first();
  expect(await loginForm.isVisible()).toBe(true);
  
  // Enter credentials (this will only work if the password is correct)
  await page.fill('input[name="email"]', 'admin@lagougah.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  
  // Wait a bit to see if login works
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'test-after-login.png' });
  
  // Go back to homepage
  await page.goto('http://localhost:3000/');
  await page.screenshot({ path: 'test-back-to-homepage.png' });
}); 