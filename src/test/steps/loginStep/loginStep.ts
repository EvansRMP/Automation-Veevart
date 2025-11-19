import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "../../utils/pageFixture";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { LoginPage } from "../../pages/loginPage/LoginPage";
import * as dotenv from "dotenv";
dotenv.config();


setDefaultTimeout(60 * 1000); // 10 segundos

let loginPage: LoginPage

Given('the user is on the login page', async function () {
    loginPage = new LoginPage(pageFixture.page!);
    await loginPage.navigate();
});

When('the user enters valid email and password', async function () {
    await loginPage.enterCredentials(process.env.USER_EMAIL || '', process.env.USER_PASS || '');
});

When('the user click in submit', async function () {
    await loginPage.submit();
});

Then('the user see the dashboard', async function () {
    await loginPage.isLoggedIn();
});

When('the user enters invalid email and password', async function () {
    await loginPage.enterCredentials("user","password");
});

Then('the user see error mesage', async function () {
    await loginPage.isErrorMessageDisplayed();
});          



