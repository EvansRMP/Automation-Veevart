import { Page, BrowserContext } from '@playwright/test';  

export interface PageFixture {
  page: Page;
  context: BrowserContext;
}

export const pageFixture: PageFixture = {
  page: undefined as unknown as Page,
  context: undefined as unknown as BrowserContext
}  