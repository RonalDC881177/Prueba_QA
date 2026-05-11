const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ContactPage = require('../pages/ContactPage');


Given('el usuario está autenticado', async function () {
    this.loginPage = new LoginPage(this.page);

    await this.loginPage.goTo();
    await this.loginPage.login('ronal123@test.com', 'ronalqa123');

    this.contactPage = new ContactPage(this.page);
});

//Crear contacto
When('crea un nuevo contacto con datos válidos', async function () {
    this.contactName = `qaUser${Date.now()}`;

    await this.contactPage.createContact(this.contactName, 'Test');
});

Then('el contacto debería aparecer en la lista', async function () {
    await this.page.reload();

    await expect(this.contactPage.getContactLocator(this.contactName))
        .toBeVisible({ timeout: 10000 });
});

//Editar el contacto
Given('existe un contacto creado', async function () {
    this.contactName = `qaUser${Date.now()}`;

    await this.contactPage.createContact(this.contactName, 'Test');
});
When('el usuario edita el contacto', async function () {
    this.updatedName = `contactEdit${Date.now()}`;
    this.updatedLastName = 'Updated';

    await this.contactPage.openContact(this.contactName);
    await this.contactPage.clickEdit();
    await this.contactPage.editContact(this.updatedName, this.updatedLastName);
    await this.contactPage.goBackToList();
});

Then('los cambios deberían guardarse correctamente', async function () {
    await this.page.reload();

    const fullName = `${this.updatedName} ${this.updatedLastName}`;

    await expect(this.page.locator(`text=${fullName}`))
        .toBeVisible({ timeout: 10000 });
});

//Eliminar el contacto
When('el usuario elimina el contacto', async function () {

    await this.contactPage.openContact(this.contactName);

    this.page.once('dialog', async dialog => {
        await dialog.accept();
    });

    await this.contactPage.deleteContact();
});

Then('el contacto no debería aparecer en la lista', async function () {
    await this.page.reload();

    await expect(this.contactPage.getContactLocator(this.contactName))
        .not.toBeVisible();
});

//Prueba de excepcion.
When('intenta crear un contacto sin nombre', async function () {
    await this.contactPage.createContact('', 'Test');
});
Then('debería ver un mensaje de validación', async function () {
    await expect(this.page.locator('text=required')).toBeVisible();
});
