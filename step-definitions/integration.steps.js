const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContactPage = require('../pages/ContactPage');

Given('el usuario tiene un token válido', async function () {
    const response = await this.request.post('/users/login', {
        data: {
            email: 'ronal123@test.com',
            password: 'ronalqa123'
        }
    });

    const body = await response.json();
    this.token = body.token;

    this.contactName = `apiContact${Date.now()}`;
});

//Creas contacto desde la API
When('crea un contacto a través de la API', async function () {
    const timestamp = Date.now();

    this.contactData = {
        firstName: `qaApiUser${timestamp}`,
        lastName: 'Test'
    };

    const response = await this.request.post('/contacts', {
        headers: {
            Authorization: `Bearer ${this.token}`
        },
        data: this.contactData
    });

    this.apiResponse = await response.json();
});

//ver contacto en el front
When('navega a la lista de contactos en la UI', async function () {

    this.contactPage = new ContactPage(this.page);

    await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/');
    await this.page.waitForSelector('#email');

    await this.page.fill('#email', 'ronal123@test.com');
    await this.page.fill('#password', 'ronalqa123');

    await this.page.getByRole('button', { name: /submit/i }).click();

    await this.page.waitForLoadState('networkidle');
});
Then('debería ver el contacto creado', async function () {

    await this.page.reload();

    await this.page.waitForLoadState('networkidle');

    const currentUrl = this.page.url();

    expect(currentUrl).toContain('contact');
});

//Crear usuario desde el front
Given('el usuario está autenticado en la UI', async function () {

    // LOGIN API
    const loginResponse = await this.request.post('/users/login', {
        data: {
            email: 'ronal123@test.com',
            password: 'ronalqa123'
        }
    });

    const body = await loginResponse.json();

    this.token = body.token;

    // LOGIN UI
    this.contactPage = new ContactPage(this.page);

    await this.page.goto(
        'https://thinking-tester-contact-list.herokuapp.com/'
    );

    await this.page.waitForSelector('#email');

    await this.page.fill('#email', 'ronal123@test.com');

    await this.page.fill('#password', 'ronalqa123');

    await Promise.all([
        this.page.waitForLoadState('networkidle'),
        this.page.getByRole('button', { name: /submit/i }).click()
    ]);
});

When('crea un contacto desde la interfaz', async function () {
    const timestamp = Date.now();

    this.contactData = {
        firstName: `qaUiUser${timestamp}`,
        lastName: 'Test'
    };

    this.contactPage = new ContactPage(this.page);

    await this.contactPage.createContact(
        this.contactData.firstName,
        this.contactData.lastName
    );
});

//Validar el contacto desde la Api
Then('el contacto debería existir en la API', async function () {

    await this.page.waitForTimeout(5000);

    const response = await this.request.get('/contacts', {
        headers: {
            Authorization: `Bearer ${this.token}`
        }
    });

    const contacts = await response.json();

    const found = contacts.some(contact =>
        contact.firstName === this.contactData.firstName
    );

    expect(found).toBeTruthy();
});