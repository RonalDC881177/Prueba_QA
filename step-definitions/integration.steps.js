const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('el usuario tiene token', async function () {
    const res = await this.request.post('/users/login', {
        data: { email: 'test@test.com', password: '123456' }
    });

    const body = await res.json();
    this.token = body.token;
});

When('crea contacto por API', async function () {
    await this.request.post('/contacts', {
        headers: { Authorization: `Bearer ${this.token}` },
        data: { firstName: 'API', lastName: 'Test' }
    });
});

Then('lo visualiza en UI', async function () {
    await this.page.goto('/contactList');
    await expect(this.page.locator('text=API')).toBeVisible();
});