import { test, expect } from '@playwright/test';

test('page has loaded', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveScreenshot({
    animations: 'disabled'
  });
});