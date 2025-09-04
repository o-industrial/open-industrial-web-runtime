import { test, expect } from '@playwright/test';

// Visual baseline is opt-in to avoid flakiness until baselines are set.
const visualEnabled = !!process.env.VISUAL;

test.skip(!visualEnabled, 'Visual tests disabled unless VISUAL=1 is set');

test('home visual @visual', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('home.png');
});

