import { test as setup, expect } from '@playwright/test';
const authFile = 'playwright/.auth/user.json';

setup('authenticate user', async ({ page }) => {
    const url = process.env.BASE_URL.replace('https://', '');
    await page.goto(`https://${process.env.HTTP_USERNAME}:${process.env.HTTP_PASSWORD}@${url}`);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.locator('#signinEmail').fill('test_prod@example.com');
    await page.locator('#signinPassword').fill('6WiiW!9LTxAQBWW');
    await page.locator('button', { hasText: 'Login' }).click();

    await page.waitForURL('**/panel/garage');
    await expect(page.locator('#userNavDropdown')).toBeVisible();

    await page.context().storageState({ path: authFile });
});