import { expect, Page } from '@playwright/test';
import * as dotenv from "dotenv";
dotenv.config();


export class LoginPage {
    
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private email = "#username";
    private password = "#password";
    private btnLogin = "#Login";
    private dashboardIndicator = "//p[normalize-space(text())='UAT']";
    private errorMessage = "#error";

    async navigate() {
        await this.page.goto('https://login.salesforce.com/',{ waitUntil: 'domcontentloaded' });
    }

    async enterCredentials(email: string, password: string) {
        await this.page.fill(this.email, email);
        await this.page.fill(this.password, password);
    }

    async submit() {
        await this.page.click(this.btnLogin);
    }
    
    async isLoggedIn() {
        await this.page.waitForSelector(this.dashboardIndicator);
        expect(this.page.url()).toContain('/home');
        expect(this.page.isVisible(this.dashboardIndicator));
    }

    async isErrorMessageDisplayed() {
        const errorMessage = this.page.locator(this.errorMessage);
        expect(errorMessage).toBeVisible();
    }

}