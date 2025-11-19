import { Locator, Page } from "@playwright/test";

export class EventLocators {
    private page: Page;

        exhibitionTab: string;
        newButton: Locator;
        inputEventName: Locator;
        saveButton: Locator;
        eventNameTitle: string;

    constructor(page: Page) {
        this.page = page;
        this.exhibitionTab = "(//a[@class='slds-context-bar__label-action dndItem']//span)[3]";
        this.newButton = page.locator("//div[normalize-space(text())='New']");
        this.inputEventName = page.getByRole('textbox', { name: 'Exposition' });
        this.saveButton = page.locator("(//li[@class='slds-button-group-item visible']//button)[3]");
        this.eventNameTitle = "//slot[contains(@class,'slds-page-header__title slds-m-right--small')]//lightning-formatted-text[1]";
    }
}

