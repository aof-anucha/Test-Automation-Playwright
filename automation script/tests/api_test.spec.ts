import { test, expect } from '@playwright/test';
// import dotenv from 'dotenv';
// import path from 'path';

// dotenv.config({ path: path.resolve(__dirname, '../config/.env.local') });

test.describe('API Tests - Get user profile', () => {

    const baseUrl = process.env.API_URL!;
    test('Get all user', async ({ page }) => {
        const response = await page.request.get(`${baseUrl}/users`, {
            headers: {
                'x-api-key': process.env.API_KEY!
            },
        });

        const body = await response.json();
        console.log(body);

        expect(response.status()).toBe(200);
        expect(body.total).toBe(12);
    });

    test('Get all user with mock API', async ({ page }) => {
        // จำลอง (Mock) API Response กลับมาตามที่เราต้องการ
        await page.route(`${baseUrl}/users`, async route => {
            const mockResponse = {
                total: 99,
                data: [
                    { id: 999, email: 'mock@playwright.com', first_name: 'Mocking', last_name: 'Playwright' }
                ]
            };
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                json: mockResponse
            });
        });

        // หมายเหตุ: page.request.get() จะไม่ถูกดักจับด้วย page.route() 
        // ดังนั้นเพื่อให้เห็นผลของการดักจับ request ในฝั่ง Browser จึงใช้ page.evaluate() หรืออาจจะเปิดหน้าเว็บที่มีการยิง API นี้
        const response = await page.evaluate(async (url) => {
            const res = await fetch(url);
            return res.json();
        }, `${baseUrl}/users`);

        console.log(response);

        expect(response.total).toBe(99);
        expect(response.data[0].first_name).toBe('Mocking');
    });

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