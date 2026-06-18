import { test, expect } from '@playwright/test';

test.describe('Create Car - API', () => {
    test('Should create a new car', async ({ request }) => {
        const response = await request.post('/api/cars', {
            data: {
                "carBrandId": 1,
                "carModelId": 1,
                "mileage": 123
            }
        });
        expect(response.status()).toBe(201);
        
        const body = await response.json();
        expect(body.status).toBe('ok');
        expect(body.data.carBrandId).toBe(1);
        expect(body.data.carModelId).toBe(1);
        expect(body.data.mileage).toBe(123);
        expect(body.data.id).toBeDefined();
    });

    test('Should not create a car without mileage', async ({ request }) => {
        const response = await request.post('/api/cars', {
            data: {
                "carBrandId": 1,
                "carModelId": 1
            }
        });
        expect(response.status()).toBe(400);

        const body = await response.json();
        expect(body.status).toBe('error');
        expect(body.message).toBe('Mileage is required');
    });

    test('Should not create a car with invalid brand ID', async ({ request }) => {
        const response = await request.post('/api/cars', {
            data: {
                "carBrandId": 999999,
                "carModelId": 1,
                "mileage": 50
            }
        });
        expect(response.status()).toBe(404);

        const body = await response.json();
        expect(body.status).toBe('error');
        expect(body.message).toBe('Brand not found');
    });
});