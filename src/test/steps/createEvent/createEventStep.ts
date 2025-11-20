import { Then, When } from "@cucumber/cucumber";
import { LoginPage } from "../../pages/loginPage/LoginPage";
import { pageFixture } from "../../utils/pageFixture";
import { CreateEventPage } from "../../pages/events/CreateEventPage";

import { TestDataGenerator } from "../../utils/testDatagenerator";
import { create } from "domain";
import { expect } from "@playwright/test";

    let createEventPage: CreateEventPage;
    let eventNameTitle: string;
    
    When('A user click on Exhibitions & Events', async function () {
        createEventPage = new CreateEventPage(pageFixture.page!);
        await createEventPage.navigateToExhibitionTab();
    });

    When('user create new event', async function () {
        eventNameTitle = TestDataGenerator.generateEventName();
        await createEventPage.createNewEvent(eventNameTitle);
    });

    Then('user should see the event title', async function () {
        const displayedName = await createEventPage.getEventNameTitle();
        await pageFixture.page.waitForTimeout(5000);
        expect(displayedName).toBe(eventNameTitle);
        console.log("Created Event Name: " + displayedName);
    });

    Then('user delete the created event', async function () {
        await createEventPage.deleteEvent();
        console.log("Deleted Event Name: " + eventNameTitle);
    });