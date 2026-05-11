class LoginPage {
    constructor(page) {
        this.page = page;
        this.email = '#email';
        this.password = '#password';
        this.btnLogin = 'button[type="submit"]';
    }

    async goTo() {
        await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/');
    }

    async login(email, password) {
        await this.page.waitForSelector('#email');

        await this.page.click('#email');
        await this.page.fill('#email', '');
        await this.page.type('#email', email, { delay: 100 });

        await this.page.click('#password');
        await this.page.fill('#password', '');
        await this.page.type('#password', password, { delay: 100 });

        await this.page.waitForTimeout(300);

        await this.page.getByRole('button', { name: /submit/i }).click();
    }
}

module.exports = LoginPage;