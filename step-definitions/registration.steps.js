const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('el usuario se encuentra en la pantalla de login', async function () {
    await this.loginPage.goTo();
});

When('selecciona la opción "Registrarse"', async function () {
    await this.loginPage.goToRegister();
});

When('ingresa un usuario nuevo', async function () {
    this.username = `qa_user_${Date.now()}`;

    await this.loginPage.fillUsername(this.username);
});

When('ingresa un correo electrónico válido', async function () {
    this.email = `qa_${Date.now()}@example.com`;

    await this.loginPage.fillEmail(this.email);
});

When('ingresa una contraseña válida', async function () {
    this.password = 'Password123!';

    await this.loginPage.fillPassword(this.password);
});

When('selecciona "Crear cuenta"', async function () {
    await this.loginPage.clickCreateAccount();
});

Then('debería mostrarse el mensaje de registro exitoso', async function () {
    await expect(
        this.page.getByText('Cuenta creada')
    ).toBeVisible();

    await expect(
        this.page.getByText('Revisa tu correo para activarla.')
    ).toBeVisible();
});

When('ingresa un correo ya registrado', async function () {
    this.email = 'bryantgrippagamer@gmail.com';

    await this.loginPage.fillEmail(this.email);
});
Then('debería mostrarse un mensaje de error', async function () {
    await expect(
        this.page.getByText('Ese correo ya está registrado')
    ).toBeVisible();

    await expect(
        this.page.getByText(
            'Ya existe una cuenta con ese correo electrónico. Inicia sesión o usa \'¿Olvidaste tu contraseña?\' si no la recuerdas.'
        )
    ).toBeVisible();
});


