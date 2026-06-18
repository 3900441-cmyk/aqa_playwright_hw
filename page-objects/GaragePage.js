import { expect } from '@playwright/test';

export class GaragePage {
    constructor(page) {
        this.page = page;
        this.profileButton = page.locator('#userNavDropdown');
        this.addCarButton = page.locator('button', { hasText: 'Add car' });
    }

    async open() {
        const username = process.env.HTTP_USERNAME;
        const password = process.env.HTTP_PASSWORD;
        await this.page.goto(`https://${username}:${password}@qauto.forstudy.space/panel/garage`);
    }
}