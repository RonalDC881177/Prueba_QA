class LoginPage {
    constructor(page) {
        this.page = page;
        this.email = '#email';
        this.password = '#password';
        this.btnLogin = '#submit';
    }

    async goTo() {
        await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/');
        await this.page.waitForLoadState('networkidle');
    }

    async login(user, pass) {
        await this.page.fill(this.email, user);
        await this.page.fill(this.password, pass);

        const btn = this.page.locator(this.btnLogin);

        await btn.waitFor({ state: 'visible' });
        await btn.click();
    }
}

module.exports = LoginPage;