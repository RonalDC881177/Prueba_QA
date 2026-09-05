const path = require('path');
const { expect } = require('@playwright/test');

class PropertyPage {

    constructor(page) {
        this.page = page;

        // Navegación
        this.panelArrendador = page.getByRole('link', {
            name: 'Panel Arrendador'
        });

        this.publicarNuevo = page.getByRole('button', {
            name: '➕ Publicar nuevo Crea una'
        });

        // Tipo de inmueble
        this.tipoCasa = page.getByRole('button', {
            name: '🏠 Casa'
        });

        // Datos básicos
        this.nombreInmueble = page.getByRole('textbox', {
            name: 'Ej. Apartamento luminoso en'
        });

        this.ciudad = page.getByRole('textbox', {
            name: 'Bogotá'
        });

        this.localidad = page.getByRole('textbox', {
            name: 'Chapinero',
            exact: true
        });

        this.barrio = page.getByRole('textbox', {
            name: 'Chapinero Central'
        });

        this.direccion = page.getByRole('textbox', {
            name: 'Calle 67 #4-50 Apto'
        });

        // Características
        this.area = page.getByPlaceholder('75');

        this.estrato = page.getByPlaceholder('4', {
            exact: true
        });

        // Información de publicación
        this.tituloPublicacion = page.getByRole('textbox', {
            name: 'Hermoso apartamento con vista'
        });

        this.descripcion = page.getByRole('textbox', {
            name: 'Describe las características'
        });

        this.canon = page.getByPlaceholder('1500000');

        this.deposito = page.getByPlaceholder('3000000');

        this.fechaDisponible = page.locator('input[type="date"]');

        this.estado = page.getByRole('combobox');

        // Botón publicar
        this.btnPublicar = page.getByRole('button', {
            name: 'Publicar inmueble'
        });
    }

    async goToMyProperties() {
        await this.page.getByRole('button', {
            name: /Mis inmuebles/
        }).click();
    }

    async goToPortal() {
        await this.page.goto(
            'https://room-rent.xyz/portal/'
        );

        await this.page.waitForLoadState('networkidle');
    }

    async goToProperties() {
        await this.page.goto(
            'https://room-rent.xyz/portal/properties'
        );

        await this.page.waitForLoadState('networkidle');
    }

    async goToLandlordPanel() {
        await this.panelArrendador.click();

        await this.page.waitForLoadState('networkidle');
    }

    async goToPublishProperty() {
        await this.publicarNuevo.click();

        await this.page.waitForLoadState('networkidle');
    }

    async selectHouse() {
        await this.tipoCasa.click();
    }

    async fillBasicData() {

        await this.nombreInmueble.fill(
            'Casa en Arriendo'
        );

        await this.ciudad.fill(
            'BOGOTA'
        );

        await this.localidad.fill(
            'CHAPINERO'
        );

        await this.barrio.fill(
            'CHAPINERO'
        );

        await this.direccion.fill(
            'CALLE 45 # 7-50'
        );
    }

    async fillCharacteristics() {

        // Habitaciones
        await this.page
            .getByRole('button', { name: '+' })
            .first()
            .click();

        // Baños
        await this.page
            .getByRole('button', { name: '+' })
            .nth(1)
            .click();

        // Parqueaderos
        await this.page
            .getByRole('button', { name: '+' })
            .nth(2)
            .click();

        await this.area.fill('227');

        await this.estrato.fill('4');
    }

    async uploadPropertyImages() {
        const images = [
            'Casa-en-Arriendo-en-Chapinero-Bogota-1.webp',
            'Casa-en-Arriendo-en-Chapinero-Bogota-5.webp',
            'Casa-en-Arriendo-en-Chapinero-Bogota-6.webp',
            'Casa-en-Arriendo-en-Chapinero-Bogota-10.webp',
            'Casa-en-Arriendo-en-Chapinero-Bogota-11.webp'
        ].map(file =>
            path.join(
                __dirname,
                '..',
                'test-data',
                'images',
                file
            )
        );

        await this.page
            .locator('input[type="file"]')
            .setInputFiles(images);
    }

    async fillPublicationData() {

        await this.tituloPublicacion.fill(
            'CASA GRANDE'
        );

        await this.descripcion.fill(
            'CASA GRANDE EN CHAPINERO'
        );

        await this.canon.fill('2600000');

        await this.deposito.fill('1000000');

        await this.fechaDisponible.fill(
            '2026-10-01'
        );

        await this.estado.selectOption(
            'PUBLICADA'
        );
    }

    async configureRules() {

        await this.page
            .locator('label:nth-child(2) > .relative')
            .first()
            .click();

        await this.page
            .locator('.relative.w-10')
            .first()
            .click();

        await this.page
            .locator(
                '.relative.w-10.h-5.rounded-full.transition-colors.duration-200.bg-stone-300'
            )
            .first()
            .click();

        await this.page
            .locator('label:nth-child(3) > .relative')
            .click();
    }

    async publish() {
        await this.btnPublicar.click();

        await this.page.waitForLoadState('networkidle');
    }

    async openPropertyForEdit(propertyName) {
    const property = this.page
        .getByRole('heading', {
            name: propertyName,
            exact: true
        })
        .first();

    await expect(property).toBeVisible();

    const propertyCard = property.locator('xpath=ancestor::article');

    await propertyCard
        .getByRole('button', { name: 'Editar' })
        .click();
}

    async updateBedrooms(bedrooms) {
        const bedroomsInput = this.page.getByPlaceholder('75');

        await bedroomsInput.fill(bedrooms);
    }

    async updatePrice(price) {
        const priceInput = this.page.getByPlaceholder('1500000');

        await priceInput.fill(price);
    }

    async deleteExistingImages() {
        await this.page.getByRole('button', {
            name: 'Eliminar'
        }).first().click();

        await this.page.getByRole('button', {
            name: 'Eliminar'
        }).first().click();
    }

    async uploadImages(images) {
        const imagePaths = images.map(image =>
            path.resolve(
                __dirname,
                '..',
                'test-data',
                'images',
                image
            )
        );

        console.log('IMÁGENES A CARGAR:');
        console.log(imagePaths);

        await this.page.locator('input[type="file"]').setInputFiles(imagePaths);
    }

    async saveChanges() {
        await this.page.getByRole('button', {
            name: 'Guardar cambios'
        }).click();
    }

    async verifyBedrooms(bedrooms) {
        const value = await this.page
            .getByPlaceholder('75')
            .inputValue();

        if (value !== bedrooms) {
            throw new Error(
                `Se esperaba habitaciones "${bedrooms}", pero se encontró "${value}"`
            );
        }
    }

    async verifyPrice(price) {
        const value = await this.page
            .getByPlaceholder('1500000')
            .inputValue();

        if (value !== price) {
            throw new Error(
                `Se esperaba precio "${price}", pero se encontró "${value}"`
            );
        }
    }
}

module.exports = PropertyPage;