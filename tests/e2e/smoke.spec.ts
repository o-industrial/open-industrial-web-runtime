import { test, expect } from '@playwright/test';

// Basic smoke: app starts and root responds
test('home page loads', async ({ page }) => {
  await page.goto('/');
  // URL is correct and page rendered something
  await expect(page).toHaveURL(/:\/\/(localhost|127\.0\.0\.1):5411\/?$/);
  const content = await page.content();
  expect(content.length).toBeGreaterThan(0);
});
