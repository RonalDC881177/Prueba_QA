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

    async login(email, password) {
        const emailInput = this.page.locator(this.email);
        const passwordInput = this.page.locator(this.password);

        await emailInput.fill(email);
        await passwordInput.fill(password);

        await this.page.getByRole('button', { name: /submit/i }).click();
    }
}

module.exports = LoginPage;