const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContactPage = require('../pages/ContactPage');

Given('el usuario tiene un token válido', async function () {
    const response = await this.request.post('/users/login', {
        data: {
            email: 'ronal@test.com',
            password: '123456qaz'
        }
    });

    const body = await response.json();
    this.token = body.token;

    this.contactName = `API${Date.now()}`;
});

//Creas contacto desde la API
When('crea un contacto a través de la API', async function () {
    await this.request.post('/contacts', {
        headers: {
            Authorization: `Bearer ${this.token}`
        },
        data: {
            firstName: this.contactName,
            lastName: 'Test'
        }
    });
});

//ver contacto en el front
When('navega a la lista de contactos en la UI', async function () {
    this.contactPage = new ContactPage(this.page);

    await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/');
    await this.page.fill('#email', 'test@test.com');
    await this.page.fill('#password', '123456');
    await this.page.click('button[type="submit"]');
});
Then('debería ver el contacto creado', async function () {
    await expect(this.contactPage.getContactLocator(this.contactName)).toBeVisible();
});

//Crear usuario desde el front
Given('el usuario está autenticado en la UI', async function () {
    this.contactPage = new ContactPage(this.page);

    await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/');
    await this.page.fill('#email', 'test@test.com');
    await this.page.fill('#password', '123456');
    await this.page.click('button[type="submit"]');

    this.contactName = `UI${Date.now()}`;
});
When('crea un contacto desde la interfaz', async function () {
    await this.contactPage.createContact(this.contactName, 'Test');
});

//Validar el contacto desde la Api
Then('el contacto debería existir en la API', async function () {
    const response = await this.request.get('/contacts', {
        headers: {
            Authorization: `Bearer ${this.token}`
        }
    });

    const body = await response.json();

    const exists = body.some(contact => contact.firstName === this.contactName);

    expect(exists).toBeTruthy();
});