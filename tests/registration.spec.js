import { test, expect } from '@playwright/test';

test.describe('Registration Form', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await expect(page.locator('.modal-title')).toHaveText('Registration');
  });

  test('Registration with valid data', async ({ page }) => {
    const uniqueEmail = `aqa-test${Date.now()}@test.com`;
    await page.locator('#signupName').fill('Test');
    await page.locator('#signupLastName').fill('Test');
    await page.locator('#signupEmail').fill(uniqueEmail);
    await page.locator('#signupPassword').fill('Password123');
    await page.locator('#signupRepeatPassword').fill('Password123');

    const registerBtn = page.locator('button', { hasText: 'Register' });
    await expect(registerBtn).toBeEnabled();
    await registerBtn.click();

    await page.waitForURL('**/panel/**');
    await expect(page).toHaveURL(/.*panel.*/);
  });

  test('Empty fields', async ({ page }) => {
    const nameField = page.locator('#signupName');
    const lastNameField = page.locator('#signupLastName');
    
    await nameField.focus();
    await lastNameField.focus(); 
    await nameField.focus();     
    await expect(page.locator('#signupName + .invalid-feedback')).toHaveText('Name required');
    await expect(page.locator('#signupLastName + .invalid-feedback')).toHaveText('Last name required');
    await expect(nameField).toHaveClass(/is-invalid/);
    await expect(page.locator('button', { hasText: 'Register' })).toBeDisabled();
  });

  test('Name length validation', async ({ page }) => {
    const nameField = page.locator('#signupName');
    
    await nameField.fill('A');
    await page.locator('#signupLastName').focus(); 
    await expect(page.locator('#signupName + .invalid-feedback'))
      .toHaveText('Name has to be from 2 to 20 characters long');
    await expect(nameField).toHaveClass(/is-invalid/);
  });

  test('Invalid Email', async ({ page }) => {
    const emailField = page.locator('#signupEmail');
    
    await emailField.fill('aqa-invalidemail.com');
    await page.locator('#signupName').focus(); 
    await expect(page.locator('#signupEmail + .invalid-feedback')).toHaveText('Email is incorrect');
    await expect(emailField).toHaveClass(/is-invalid/);
  });

  test('Password constraints', async ({ page }) => {
    const passwordField = page.locator('#signupPassword');
    
    await passwordField.fill('password');
    await page.locator('#signupName').focus(); 
    await expect(page.locator('#signupPassword + .invalid-feedback'))
      .toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await expect(passwordField).toHaveClass(/is-invalid/);
  });

  test('Passwords do not match', async ({ page }) => {
    await page.locator('#signupPassword').fill('Password123');
    
    const reenterPasswordField = page.locator('#signupRepeatPassword');
    await reenterPasswordField.fill('DifferentPass1');
    await page.locator('#signupName').focus(); 
    await expect(page.locator('#signupRepeatPassword + .invalid-feedback')).toHaveText('Passwords do not match');
    await expect(reenterPasswordField).toHaveClass(/is-invalid/);
    await expect(page.locator('button', { hasText: 'Register' })).toBeDisabled();
  });
});