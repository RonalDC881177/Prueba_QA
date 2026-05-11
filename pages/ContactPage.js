class ContactPage {
    constructor(page) {
        this.page = page;

        this.addBtn = page.locator('#add-contact');

        this.firstName = page.locator('#firstName');
        this.lastName = page.locator('#lastName');

        this.submitBtn = page.getByRole('button', {
            name: /submit/i
        });

        this.editBtn = page.getByRole('button', {
            name: /edit/i
        });

        this.deleteBtn = page.getByRole('button', {
            name: /delete/i
        });
    }

    async waitForPageReady() {
        await this.page.waitForLoadState('networkidle');

        await this.addBtn.waitFor({
            state: 'visible',
            timeout: 15000
        });
    }
    async createContact(name, lastName) {
    await this.waitForPageReady();

    await this.addBtn.click();

    await this.firstName.fill(name);
    await this.lastName.fill(lastName);

    await this.submitBtn.click();

    await this.page.waitForLoadState('networkidle');

    await this.page.reload();

    await this.page.waitForLoadState('networkidle');
}
    async openContact(name) {

    await this.page.reload();

    await this.page.waitForLoadState('networkidle');

    const contact = this.page.getByText(name, {
        exact: true
    });

    await contact.first().waitFor({
        state: 'visible',
        timeout: 20000
    });

    await contact.first().click();
}

    async clickEdit() {
        await this.editBtn.waitFor({ state: 'visible' });
        await this.editBtn.click();
    }

    async editContact(newName, newLastName) {
        await this.firstName.fill(newName);
        await this.lastName.fill(newLastName);

        await this.submitBtn.click();

        await this.page
            .getByText(newName, { exact: true })
            .waitFor({ state: 'visible' });
    }

    async deleteContact() {
        await this.deleteBtn.waitFor({ state: 'visible' });
        await this.deleteBtn.click();
    }

    getContactLocator(name) {
        return this.page.getByText(name, { exact: true });
    }

    async goBackToList() {
        await this.page.goBack();
        await this.waitForPageReady();
    }
}

module.exports = ContactPage;