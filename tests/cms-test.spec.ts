import { test, expect } from '@playwright/test';

test('CMS functionality test', async ({ page }) => {
  // Go to homepage first to check if it loads properly
  await page.goto('http://localhost:3000/');
  console.log('Loaded homepage');
  await page.screenshot({ path: 'homepage-before-cms.png' });

  // Go to CMS page
  await page.goto('http://localhost:3000/cms/');
  console.log('Loaded CMS login page');
  await page.screenshot({ path: 'cms-login-page.png' });

  // Login with credentials from cms.md
  await page.fill('input[name="email"]', 'test@lagougah.com');
  await page.fill('input[name="password"]', 'TestAdmin123!');
  await page.click('button[type="submit"]');

  // Wait for login to complete
  await page.waitForTimeout(3000);
  console.log('Attempted login');
  await page.screenshot({ path: 'cms-after-login.png' });

  // Check if dashboard is loaded (this will help verify if login was successful)
  const dashboardTitle = await page.locator('h1').first();
  console.log('Dashboard title:', await dashboardTitle.textContent());

  // Navigate to Menu section - use more specific selector
  await page.getByRole('link', { name: 'Menu Items', exact: true }).click();
  await page.waitForTimeout(1000);
  console.log('Navigated to Menu section');
  await page.screenshot({ path: 'cms-menu-section.png' });

  // Return to homepage to check if menu items are displayed
  await page.goto('http://localhost:3000/');
  console.log('Returned to homepage');
  await page.screenshot({ path: 'homepage-after-cms.png' });
}); 