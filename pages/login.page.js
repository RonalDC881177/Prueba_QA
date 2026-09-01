class LoginPage {
    constructor(page) {
        this.page = page;

        this.username = 'input[name="username"]';
        this.password = 'input[name="password"]';
        this.btnLogin = 'button[type="submit"]';
    }

    async goTo() {
        await this.page.goto('https://room-rent.xyz/portal/login');
        await this.page.waitForLoadState('networkidle');
    }

    async login(username, password) {
        await this.page.locator(this.username).fill(username);
        await this.page.locator(this.password).fill(password);
        await this.page.locator(this.btnLogin).click();
    }

    async clickLogin() {
        await this.page.locator(this.btnLogin).click();
    }
}

module.exports = LoginPage;