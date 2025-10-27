import { Given, When, Then } from "@cucumber/cucumber";
import * as dotenv from "dotenv";
import { pageFixture } from "../../utils/pageFixture";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { LoginPage } from "../../pages/loginPage/LoginPage";
dotenv.config();


setDefaultTimeout(60 * 1000); // 10 segundos

let loginPage: LoginPage

Given('the user is on the login page', async function () {
    loginPage = new LoginPage(pageFixture.page!);
    await loginPage.navigate();
});

When('the user enters valid email and password', async function () {
    loginPage = new LoginPage(pageFixture.page!);
    await loginPage.enterCredentials(process.env.USER_EMAIL || '', process.env.USER_PASS || '');
});

When('the user click in submit', async function () {
    loginPage = new LoginPage(pageFixture.page!);
    await loginPage.submit();
});

Then('the user see the dashboard', async function () {
    loginPage = new LoginPage(pageFixture.page!);
    await loginPage.isLoggedIn();
});



