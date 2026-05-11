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

    async login(user, pass) {
        await this.page.fill(this.email, user);
        await this.page.fill(this.password, pass);
        await this.page.click(this.btnLogin);
    }
}

module.exports = LoginPage;