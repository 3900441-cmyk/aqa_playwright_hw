import { test, expect } from '@playwright/test';
import { WelcomePage } from '../page-objects/WelcomePage';
import { RegistrationModal } from '../page-objects/RegistrationModal';

test.describe('Registration Form with POM', () => {
    test.use({ storageState: { cookies: [], origins: [] } });
    let welcomePage;
    let regModal;

    test.beforeEach(async ({ page }) => {
        welcomePage = new WelcomePage(page);
        regModal = new RegistrationModal(page);

        await welcomePage.open();
        await welcomePage.clickSignUp();
        await expect(regModal.title).toHaveText('Registration');
    });

    test('Registration with valid data', async ({ page }) => {
        const uniqueEmail = `aqa-test${Date.now()}@test.com`;
        
        await regModal.fillForm({
            name: 'Test',
            lastName: 'Test',
            email: uniqueEmail,
            password: 'Password123',
            repeatPassword: 'Password123'
        });

        await expect(regModal.registerButton).toBeEnabled();
        await regModal.clickRegister();
        await page.waitForURL('**/panel/**');
        await expect(page).toHaveURL(/.*panel.*/);
    });

    test('Empty fields validation', async () => {
        await regModal.nameInput.focus();
        await regModal.lastNameInput.focus();
        await regModal.nameInput.focus();
        await expect(regModal.errorMessage('#signupName')).toHaveText('Name required');
        await expect(regModal.errorMessage('#signupLastName')).toHaveText('Last name required');
        await expect(regModal.nameInput).toHaveClass(/is-invalid/);
        await expect(regModal.registerButton).toBeDisabled();
    });

    test('Name length validation', async () => {
        await regModal.fillForm({ name: 'A' });
        await regModal.lastNameInput.focus();
        await expect(regModal.errorMessage('#signupName'))
            .toHaveText('Name has to be from 2 to 20 characters long');
    });

    test('Invalid Email', async () => {
        await regModal.fillForm({ email: 'invalid-email' });
        await regModal.nameInput.focus();
        await expect(regModal.errorMessage('#signupEmail')).toHaveText('Email is incorrect');
    });

    test('Password constraints', async () => {
        await regModal.fillForm({ password: '123' });
        await regModal.nameInput.focus();
        await expect(regModal.errorMessage('#signupPassword'))
            .toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });

    test('Passwords do not match', async () => {
        await regModal.fillForm({
            password: 'Password123',
            repeatPassword: 'WrongPassword1'
        });
        await regModal.nameInput.focus();
        await expect(regModal.errorMessage('#signupRepeatPassword')).toHaveText('Passwords do not match');
        await expect(regModal.registerButton).toBeDisabled();
    });
});