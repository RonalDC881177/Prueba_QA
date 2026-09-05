const { setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(60000);
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('el usuario está en la página de login', async function () {
    await this.loginPage.goTo();
});

// Login exitoso
When('ingresa email y contraseña válidos', async function () {
    await this.loginPage.login('admin', 'admin');
});

Then('debería acceder al dashboard del administrador', async function () {
    await expect(this.page).toHaveURL(/\/admin\//);
});

// Login con contraseña incorrecta
When('ingresa email válido y contraseña incorrecta', async function () {
    await this.loginPage.login('admin', 'wrongpass');
});

Then('debería ver un mensaje de error', async function () {
    await expect(this.page.locator('text=Incorrect')).toBeVisible();
});

// Login con campos vacíos
When('intenta iniciar sesión sin ingresar credenciales', async function () {
    //await this.page.waitForSelector('button');
    await this.loginPage.clickLogin();
});

Then('debería ver validaciones de campos obligatorios', async function () {
    const username = this.page.locator('input[name="username"]');
    const password = this.page.locator('input[name="password"]');

    await expect(username).toHaveAttribute('required', '');
    await expect(password).toHaveAttribute('required', '');
});