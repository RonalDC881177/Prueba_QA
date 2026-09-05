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
            'Debe configurar ARRENDADOR_USER y ARRENDADOR_PASSWORD'
        );
    }

    await this.loginPage.login(
        username,
        password
    );

    await expect(
        this.page.getByRole('link', {
            name: 'Panel Arrendador'
        })
    ).toBeVisible();
});

When('accede al panel de arrendador', async function () {

    await this.propertyPage.goToLandlordPanel();

    await expect(
        this.page.getByText('¿Qué quieres hacer hoy?', {
            exact: true
        })
    ).toBeVisible();
});

When('selecciona la opción "Publicar nuevo"', async function () {

    await this.propertyPage.goToPublishProperty();

    await expect(
    this.page.getByRole('heading', {
        name: 'Publicar inmueble',
        exact: true
    })
).toBeVisible();
});

When('selecciona el tipo de inmueble "Casa"', async function () {

    await this.propertyPage.selectHouse();
});

When('diligencia los datos básicos del inmueble', async function () {

    await this.propertyPage.fillBasicData();
});

When('diligencia las características del inmueble', async function () {

    await this.propertyPage.fillCharacteristics();
});

When('carga las fotografías del inmueble', async function () {

    await this.propertyPage.uploadPropertyImages();
});

When('diligencia la información de la publicación', async function () {

    await this.propertyPage.fillPublicationData();
});

When('configura las reglas del inmueble', async function () {

    await this.propertyPage.configureRules();
});

When('publica el inmueble', async function () {

    await this.propertyPage.publish();
});

Then('debería visualizar la propiedad publicada', async function () {

    await expect(
        this.page.locator('body')
    ).toContainText('Casa');

});