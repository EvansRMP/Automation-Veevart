import { Page } from "@playwright/test";
import { EventLocators } from '../../ui/eventLocators';
import { stringify } from "querystring";

export class CreateEventPage {

   private page: Page;
   private locators: EventLocators;
   
    constructor(page: Page) {
        this.page = page;
        this.locators = new EventLocators(page);
    }

    async navigateToExhibitionTab() {
        await this.page.locator(this.locators.exhibitionTab).click();
    }

    async createNewEvent(eventName: string) {
        await this.locators.newButton.click();
        await this.locators.inputEventName.fill(eventName);
        await this.locators.saveButton.click();
    }

    async getEventNameTitle(): Promise<string> {
        return await this.page.locator(this.locators.eventNameTitle).innerText();
    }

    async deleteEvent() {
        await this.locators.buttonSelectOptions.click();
        await this.locators.selecOptionDelete.click();
        await this.locators.confirmDeleteButton.click();
        await this.page.waitForTimeout(5000);  
    }
            
}  