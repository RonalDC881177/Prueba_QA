const { setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(60000);
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('el usuario está en la página de login', async function () {
    await this.loginPage.goTo();
});

// Login exitoso
When('ingresa email y contraseña válidos', async function () {
    await this.loginPage.login('ronal123@test.com', 'ronalqa123');
});

Then('debería ver la lista de contactos', async function () {
    await expect(this.page).toHaveURL(/contactList/);
});

// Login con contraseña incorrecta
When('ingresa email válido y contraseña incorrecta', async function () {
    await this.loginPage.login('ronal123@test.com', 'wrongpass');
});

Then('debería ver un mensaje de error', async function () {
    await expect(this.page.locator('text=Incorrect')).toBeVisible();
});

// Login con campos vacíos
When('intenta iniciar sesión sin ingresar credenciales', async function () {
    await this.page.waitForSelector('button');
    await this.page.getByRole('button', { name: /submit/i }).click();
});

Then('debería ver validaciones de campos obligatorios', async function () {
    await expect(this.page.locator('text=Incorrect username or password')).toBeVisible();
});