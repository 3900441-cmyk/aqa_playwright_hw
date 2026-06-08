import { expect } from '@playwright/test';

export class RegistrationModal {
    constructor(page) {
        this.page = page;
        this.title = page.locator('.modal-title');
        this.nameInput = page.locator('#signupName');
        this.lastNameInput = page.locator('#signupLastName');
        this.emailInput = page.locator('#signupEmail');
        this.passwordInput = page.locator('#signupPassword');
        this.repeatPasswordInput = page.locator('#signupRepeatPassword');
        this.registerButton = page.locator('button', { hasText: 'Register' });
        this.errorMessage = (selector) => this.page.locator(`${selector} + .invalid-feedback`);
    }

    async fillForm(userData) {
        if (userData.name !== undefined) await this.nameInput.fill(userData.name);
        if (userData.lastName !== undefined) await this.lastNameInput.fill(userData.lastName);
        if (userData.email !== undefined) await this.emailInput.fill(userData.email);
        if (userData.password !== undefined) await this.passwordInput.fill(userData.password);
        if (userData.repeatPassword !== undefined) await this.repeatPasswordInput.fill(userData.repeatPassword);
    }

    async clickRegister() {
        await this.registerButton.click();
    }
}