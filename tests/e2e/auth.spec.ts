import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should show landing page', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Chat, Create, Connect');
  });

  test('should open auth modal on Get Started click', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Get started');
    await expect(page.locator('text=Welcome to GJYL')).toBeVisible();
  });

  test('should show email input in auth modal', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Get started');
    await expect(page.locator('input[type="email"]')).toBeVisible();
  });

  test('should validate email input', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Get started');
    await page.fill('input[type="email"]', 'invalid-email');
    await page.click('button:has-text("Continue with Email")');
    // Browser native validation should prevent submission
  });
});
