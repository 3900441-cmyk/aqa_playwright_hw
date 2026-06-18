import { test, expect } from '../fixtures/userGarage';

test.describe('Garage Page Tests with Custom Fixture', () => {
    test('Should successfully open garage and see Add Car button', async ({ userGaragePage }) => {
        await expect(userGaragePage.addCarButton).toBeVisible();
        await expect(userGaragePage.profileButton).toBeVisible();
    });
});