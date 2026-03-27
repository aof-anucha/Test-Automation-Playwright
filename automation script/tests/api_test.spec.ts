import { test, expect } from '@playwright/test';
// import dotenv from 'dotenv';
// import path from 'path';

// dotenv.config({ path: path.resolve(__dirname, '../config/.env.local') });

test.describe('API Tests - Get user profile', () => {

    const baseUrl = process.env.API_URL!;

    test('Get user profile success', async ({ page }) => {
        const response = await page.request.get(`${baseUrl}/users/12`, {
            headers: {
                'x-api-key': process.env.API_KEY!
            },
        });

        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.data.id).toBe(12);
        expect(body.data.email).toBe('rachel.howell@reqres.in');
        expect(body.data.first_name).toBe('Rachel');
        expect(body.data.last_name).toBe('Howell');
        expect(body.data.avatar).toBe('https://reqres.in/img/faces/12-image.jpg');
    });

        test('Get user profile but user not found', async ({ page }) => {
        const response = await page.request.get(`${baseUrl}/users/1234`, {
            headers: {
                'x-api-key': process.env.API_KEY!
            },
        });

        const body = await response.json();

        expect(response.status()).toBe(404);
        expect(body).toEqual({});

    });
});