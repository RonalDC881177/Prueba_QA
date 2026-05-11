const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContactPage = require('../pages/ContactPage');

Given('el usuario está autenticado', async function () {
    await this.page.goto('/');
    await this.page.fill('#email', 'test@test.com');
    await this.page.fill('#password', '123456');
    await this.page.click('button[type="submit"]');
});

When('crea un contacto', async function () {
    this.contactPage = new ContactPage(this.page);
    await this.contactPage.createContact('Juan', 'Perez');
});

Then('el contacto debería existir', async function () {
    await expect(await this.contactPage.verifyContact('Juan')).toBeVisible();
});