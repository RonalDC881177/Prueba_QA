class ContactPage {
    constructor(page) {
        this.page = page;

        this.addBtn = 'text=Add a New Contact';
        this.firstName = '#firstName';
        this.lastName = '#lastName';
        this.editBtn = 'text=Edit Contact';
        this.deleteBtn = 'text=Delete Contact';
    }

    async createContact(name, lastName) {
        await this.page.waitForSelector(this.addBtn);
        await this.page.click(this.addBtn);

        await this.page.fill(this.firstName, name);
        await this.page.fill(this.lastName, lastName);

        await this.page.getByRole('button', { name: /submit/i }).click();

        await this.page.waitForLoadState('networkidle');
    }
    async openContact(name) {
        await this.page.locator(`text=${name}`).first().click();
    }

    async clickEdit() {
        await this.page.click(this.editBtn);
    }

    async editContact(newName, newLastName) {
    await this.page.fill(this.firstName, newName);
    await this.page.fill(this.lastName, newLastName);

    await this.page.getByRole('button', { name: /submit/i }).click();
}

    async deleteContact() {
    await this.page.click(this.deleteBtn);
}

    getContactLocator(name) {
        return this.page.locator(`text=${name}`);
    }

    async goBackToList() {
        await this.page.goBack();
    }
}

module.exports = ContactPage;