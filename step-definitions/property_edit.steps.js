const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const PropertyPage = require('../pages/PropertyPage');


When('selecciona la opción "Mis inmuebles"', async function () {
    await this.propertyPage.goToMyProperties();

    await expect(
        this.page.getByRole('heading', {
            name: 'Casa en Arriendo',
            exact: true
        })
    ).toBeVisible();
});

When('selecciona la vivienda {string} para editar', async function (propertyName) {

    await this.propertyPage.openPropertyForEdit(propertyName);
});

When('modifica las habitaciones a {string}', async function (bedrooms) {

    await this.propertyPage.updateBedrooms(bedrooms);
});

When('modifica el precio a {string}', async function (price) {

    await this.propertyPage.updatePrice(price);
});

When('elimina las fotografías existentes', async function () {

    await this.propertyPage.deleteExistingImages();
});

When('carga nuevas fotografías', async function () {

    await this.propertyPage.uploadImages([
        'Casa-en-Arriendo-en-Niza-norte-Bogota-1.webp',
        'Casa-en-Arriendo-en-Niza-norte-Bogota-5.webp',
        'Casa-en-Arriendo-en-Niza-norte-Bogota-7.webp',
        'Casa-en-Arriendo-en-Niza-norte-Bogota-9.webp'
    ]);
});

When('guarda los cambios', async function () {

    await this.propertyPage.saveChanges();
});

Then('la vivienda debe mostrar las habitaciones {string}', async function (bedrooms) {

    await this.propertyPage.verifyBedrooms(bedrooms);
});

Then('la vivienda debe mostrar el precio {string}', async function (price) {

    await this.propertyPage.verifyPrice(price);
});