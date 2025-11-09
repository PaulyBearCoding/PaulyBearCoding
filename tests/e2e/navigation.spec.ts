import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to legal pages', async ({ page }) => {
    await page.goto('/');

    // Navigate to Terms
    await page.click('text=Terms');
    await expect(page).toHaveURL('/legal/terms');
    await expect(page.locator('h1')).toContainText('Terms of Service');

    // Navigate back
    await page.goto('/');

    // Navigate to Privacy
    await page.click('text=Privacy');
    await expect(page).toHaveURL('/legal/privacy');
    await expect(page.locator('h1')).toContainText('Privacy Policy');
  });

  test('should show FAQ section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Frequently asked questions')).toBeVisible();
  });

  test('should expand FAQ accordion', async ({ page }) => {
    await page.goto('/');
    const firstQuestion = page.locator('[data-state]').first();
    await firstQuestion.click();
    await expect(firstQuestion).toHaveAttribute('data-state', 'open');
  });
});
