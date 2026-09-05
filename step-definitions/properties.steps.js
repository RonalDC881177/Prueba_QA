const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const PropertyPage = require('../pages/PropertyPage');

Given('el usuario está en el portal de RoomRent', async function () {

    this.propertyPage = new PropertyPage(this.page);

    await this.propertyPage.goToPortal();
});

When('selecciona la opción "Propiedades"', async function () {

    await this.propertyPage.goToProperties();
});

Then('debería visualizar la página de propiedades', async function () {
    await expect(this.page).toHaveURL(
        'https://room-rent.xyz/portal/properties'
    );

    await expect(this.page.locator('body')).toContainText('Inmuebles');
    await expect(this.page.locator('body')).toContainText(
        'Explora los inmuebles disponibles'
    );
});
Then('debería visualizar el mensaje de que no existen propiedades', async function () {

    const emptyMessage = this.page.getByText(
        'No se encontraron propiedades con esos filtros.',
        { exact: true }
    );

    await expect(emptyMessage).toBeVisible();
});