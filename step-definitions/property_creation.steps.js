const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const PropertyPage = require('../pages/PropertyPage');

Given('el arrendador inicia sesión en RoomRent', async function () {

    this.propertyPage = new PropertyPage(this.page);

    await this.loginPage.goTo();

    const username = process.env.ARRENDADOR_USER;
    const password = process.env.ARRENDADOR_PASSWORD;

    if (!username || !password) {
        throw new Error(
            'Faltan ARRENDADOR_USER y ARRENDADOR_PASSWORD en las variables de entorno.'
        );
    }

    await this.loginPage.login(username, password);

    await expect(this.page).not.toHaveURL(/\/login/);
});

When('accede al panel de arrendador', async function () {

    await this.propertyPage.goToLandlordPanel();
});

When('selecciona la opción "Publicar nuevo"', async function () {

    await this.propertyPage.goToPublishProperty();
});

When('diligencia los datos de la propiedad', async function () {

    // Lo implementaremos después de inspeccionar
    // los campos reales del formulario.
});

When('publica el inmueble', async function () {

    // Lo implementaremos después de inspeccionar
    // el botón y las validaciones reales.
});

Then('debería visualizar la propiedad publicada', async function () {

    // Lo implementaremos después de conocer
    // el resultado real de la publicación.
});