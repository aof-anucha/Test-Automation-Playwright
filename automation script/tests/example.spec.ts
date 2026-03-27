import { test, expect } from '@playwright/test';
// import dotenv from 'dotenv';
// import path from 'path';

// dotenv.config({ path: path.resolve(__dirname, '../config/.env.local') });

test.describe('Login', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.BASE_URL!);
    await expect(page.getByRole('heading', { name: 'Login Page' })).toContainText('Login Page');
  });

  test('Login success', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill(process.env.SITE_AUTH_USR!);
    await page.getByRole('textbox', { name: 'Password' }).fill(process.env.SITE_AUTH_PSW!);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('You logged into a secure area')).toBeVisible();
    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');

    await page.getByRole('link', { name: 'Logout' }).click();

    await expect(page.getByRole('heading', { name: 'Login Page' })).toContainText('Login Page');
    await expect(page.getByText('You logged out of the secure area!')).toBeVisible();
    await expect(page.locator('#flash')).toContainText('You logged out of the secure area!');

  });

  test('Login failed - Password incorrect', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill(process.env.SITE_AUTH_USR!);
    await page.getByRole('textbox', { name: 'Password' }).fill('Password!');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Your password is invalid!')).toBeVisible();
    await expect(page.locator('#flash')).toContainText('Your password is invalid!');
  });

  test('Login failed - Username incorrect', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill('tomholland');
    await page.getByRole('textbox', { name: 'Password' }).fill('Password!');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Your username is invalid!')).toBeVisible();
    await expect(page.locator('#flash')).toContainText('Your username is invalid!');
  });
});