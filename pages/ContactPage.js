class ContactPage {
    constructor(page) {
        this.page = page;
        this.addBtn = "text=Add a New Contact";
        this.firstName = "#firstName";
        this.lastName = "#lastName";
        this.saveBtn = 'button[type="submit"]';
    }

    async createContact(name, last) {
        await this.page.click(this.addBtn);
        await this.page.fill(this.firstName, name);
        await this.page.fill(this.lastName, last);
        await this.page.click(this.saveBtn);
    }

    async verifyContact(name) {
        return this.page.locator(`text=${name}`);
    }
}

module.exports = ContactPage;
