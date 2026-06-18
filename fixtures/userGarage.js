import { test as base } from '@playwright/test';
import { GaragePage } from '../page-objects/GaragePage';

export const test = base.extend({
    userGaragePage: async ({ page }, use) => {
        const garagePage = new GaragePage(page);
        await garagePage.open();
        await use(garagePage);
    },
});

export { expect } from '@playwright/test';