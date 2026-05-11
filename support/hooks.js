const { Before, After } = require('@cucumber/cucumber');
const { chromium, request } = require('@playwright/test');
const LoginPage = require('../pages/login.page');

Before(async function () {
    this.browser = await chromium.launch({
        headless: false,
        slowMo: 500
    });

    this.page = await this.browser.newPage();

    this.request = await request.newContext({
        baseURL: 'https://thinking-tester-contact-list.herokuapp.com'
    });

    this.loginPage = new LoginPage(this.page);
});

After(async function () {
    await this.browser.close();
});