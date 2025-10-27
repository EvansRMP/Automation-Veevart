import { chromium, Page, Browser, BrowserContext, firefox } from 'playwright';  
import { Before, After, BeforeAll, AfterAll, Status, AfterStep } from '@cucumber/cucumber';  
import { pageFixture } from '../utils/pageFixture';
 

let browser: Browser;
let context: BrowserContext;
let page: Page;

BeforeAll( async function() {
        browser = await chromium.launch({ headless: false, slowMo: 100, args:[
        '--disable-blink-features=AutomationControlled',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
        '--no-sandbox', 
        '--disable-setuid-sandbox'
     ] 
    });
});

Before( async function() {
    context = await browser.newContext({ viewport: null});
    page = await context.newPage();
    pageFixture.page = page;  
});

AfterStep( async function({ pickle }) {
    //Screenshot on steps
    if (pageFixture.page) {
        const img = await pageFixture.page.screenshot({ path: `./test/results/screenshots/${pickle.name}.png`, type: "png" });
        this.attach(img, 'image/png');
    }
});

After( async function({ pickle, result }) {
    //Screenshot on failure
    if (result?.status === Status.FAILED) {
        if (pageFixture.page) {
            const img = await pageFixture.page.screenshot({ path: `./test/results/screenshots/${pickle.name}.png`, type: "png" });
            this.attach(img, 'image/png');
        }
    }

    await pageFixture.page?.close();
    
});

AfterAll(async function() {
    await context.close();
});

