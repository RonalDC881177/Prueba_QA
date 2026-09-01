class LoginPage {
    constructor(page) {
        this.page = page;

        // Campos
        this.username = 'input[name="username"]';
        this.email = 'input[name="email"]';
        this.password = 'input[name="password"]';

        // Botones
        this.btnLogin = 'button[type="submit"]';
        this.btnRegisterTab = 'button:has-text("Registrarse")';
        this.btnCreateAccount = 'button:has-text("Crear cuenta")';

        // Mensajes
        this.successMessage = 'text=Cuenta creada. Revisa tu correo para activarla.';
    }

    async goTo() {
        await this.page.goto('https://room-rent.xyz/portal/login');
        await this.page.waitForLoadState('networkidle');
    }

    async login(username, password) {
        await this.page.locator(this.username).fill(username);
        await this.page.locator(this.password).fill(password);
        await this.btnLogin.click();
    }

    async clickLogin() {
        await this.btnLogin.click();
    }

    async goToRegister() {
        await this.page.locator(this.btnRegisterTab).click();
    }

    async register(username, email, password) {
        await this.page.locator(this.username).fill(username);
        await this.page.locator(this.email).fill(email);
        await this.page.locator(this.password).fill(password);
        await this.btnCreateAccount.click();
    }

    async isRegistrationSuccessful() {
        return await this.page
            .locator(this.successMessage)
            .isVisible();
    }
}

module.exports = LoginPage;
