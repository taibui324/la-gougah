import { test, expect } from '@playwright/test';

test('Combined menu and CMS functionality test', async ({ page }) => {
  // Part 1: Check menu items on homepage
  await page.goto('http://localhost:3000/');
  console.log('Loaded homepage');
  await page.screenshot({ path: 'test-homepage.png' });

  // Get all menu items from the navigation
  const menuItems = await page.locator('nav a').all();
  console.log(`Found ${menuItems.length} menu items on the homepage`);
  
  // We should have menu items displayed
  expect(menuItems.length).toBeGreaterThan(0);
  
  // Get the text of each menu item to verify
  const menuTexts = await Promise.all(
    menuItems.map(item => item.textContent())
  );
  
  console.log('Menu items displayed:', menuTexts.filter(Boolean).join(', '));
  
  // Check for expected menu items
  const expectedItems = ['Nguồn Gốc', 'Sản Phẩm', 'Câu Chuyện', 'Tin Tức', 'Liên Hệ'];
  for (const expected of expectedItems) {
    const hasItem = menuTexts.some(text => text && text.includes(expected));
    console.log(`Menu contains "${expected}": ${hasItem}`);
    expect(hasItem).toBeTruthy();
  }
  
  // Part 2: Check CMS functionality
  await page.goto('http://localhost:3000/cms/');
  console.log('Loaded CMS login page');
  await page.screenshot({ path: 'test-cms-login.png' });

  // Login with credentials from cms.md
  await page.fill('input[name="email"]', 'test@lagougah.com');
  await page.fill('input[name="password"]', 'TestAdmin123!');
  await page.click('button[type="submit"]');

  // Wait for login to complete
  await page.waitForTimeout(3000);
  console.log('Attempted login');
  await page.screenshot({ path: 'test-after-login.png' });

  // Check if dashboard is loaded
  const dashboardTitle = await page.locator('h1').first();
  console.log('Dashboard title:', await dashboardTitle.textContent());
  
  // Navigate to Menu section
  await page.getByRole('link', { name: 'Menu Items', exact: true }).click();
  await page.waitForTimeout(1000);
  console.log('Navigated to Menu section');
  
  // Go back to homepage to verify the connection works
  await page.goto('http://localhost:3000/');
  console.log('Returned to homepage');
  await page.screenshot({ path: 'test-back-to-homepage.png' });

  // Verify menu items are still displayed
  const menuItemsAfter = await page.locator('nav a').all();
  expect(menuItemsAfter.length).toBeGreaterThan(0);
  console.log(`Found ${menuItemsAfter.length} menu items after CMS visit`);
}); 