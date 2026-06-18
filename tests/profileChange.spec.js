import { test, expect } from '@playwright/test';

test.describe('User Profile API', () => {
    test('Should display changed user profile data', async ({ page }) => {
        const mockedProfileData = {
            "status": "ok",
            "data": {
                "userId": 999999,
                "photoFilename": "default-user.png",
                "name": "TESTQA",
                "lastName": "PLAYWRIGHTAPI"
            }
        };

        await page.route('**/api/users/profile', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockedProfileData),
            });
        });

        const username = process.env.HTTP_USERNAME;
        const password = process.env.HTTP_PASSWORD;
        await page.goto(`https://${username}:${password}@qauto.forstudy.space/panel/profile`);

        const profileNameLocator = page.locator('.profile_name'); 
        await expect(profileNameLocator).toHaveText('TESTQA PLAYWRIGHTAPI');
    });
});