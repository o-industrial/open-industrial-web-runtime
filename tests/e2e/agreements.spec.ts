import { test, expect } from '@playwright/test';

// Agreements flow: redirected from /workspace, accept all, return to /workspace
test('agreements flow: accept all and continue', async ({ page }) => {
  await page.goto('/workspace');

  // Redirected to agreements page with returnUrl
  await expect(page).toHaveURL(/\/workspace\/agreements\?returnUrl=.*/);

  // Check all agreement checkboxes
  const checks = page.getByLabel('I have read and agree to these terms');
  const count = await checks.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    await checks.nth(i).check();
  }

  // Button should be enabled once all are checked
  const acceptBtn = page.getByRole('button', { name: 'Accept and Continue' });
  await expect(acceptBtn).toBeEnabled();
  await acceptBtn.click();

  // Lands on returnUrl (defaults to /workspace)
  await expect(page).toHaveURL(/\/workspace(\?|$)/);
});

