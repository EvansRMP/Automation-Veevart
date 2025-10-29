import { expect, Page } from '@playwright/test';
import * as dotenv from "dotenv";
dotenv.config();


export class LoginPage {
    
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    readonly email = "(//input[contains(@class,'input r4')])[1]";
    readonly password = "(//input[contains(@class,'input r4')])[2]";
    private btnLogin = "#Login";
    private dashboardIndicator = "//p[normalize-space(text())='UAT']";
    private errorMessage = "#error";
    private textError = "Error: Please check your username and password. If you still can't log in, contact your Salesforce administrator.";

    async navigate() {
        await this.page.goto(process.env.BASE_URL || 'https://veevartmuseumdemo--uat.sandbox.my.salesforce.com/',  { waitUntil: 'domcontentloaded' });
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
        expect(this.dashboardIndicator.match(/UAT/));
    }

    async isErrorMessageDisplayed() {
        const errorMessage = this.page.locator(this.errorMessage);
        expect(errorMessage).toBeVisible();
        expect(await errorMessage.textContent()).toBe(this.textError);
    }

}