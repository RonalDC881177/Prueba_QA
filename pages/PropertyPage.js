class PropertyPage {

    constructor(page) {
        this.page = page;
    }

    async goToPortal() {
        await this.page.goto('https://room-rent.xyz/portal/');
        await this.page.waitForLoadState('networkidle');
    }

    async goToProperties() {
        await this.page
            .getByRole('link', { name: 'Propiedades', exact: true })
            .click();

        await this.page.waitForLoadState('networkidle');
    }

    async goToLandlordPanel() {
        await this.page
            .getByText('Panel Arrendador', { exact: true })
            .click();

        await this.page.waitForLoadState('networkidle');
    }

    async goToPublishProperty() {
        await this.page
            .getByText('Publicar nuevo', { exact: true })
            .click();

        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = PropertyPage;