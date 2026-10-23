import { test, expect } from '@playwright/test';

test('opens the employee application', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('ClientAppBase');
  await expect(page.getByRole('link', { name: 'New employee' })).toBeVisible();
});
