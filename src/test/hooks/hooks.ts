import { chromium, Page, Browser, BrowserContext, firefox, webkit } from 'playwright';  
import { Before, After, BeforeAll, AfterAll, Status, AfterStep } from '@cucumber/cucumber';  
import { pageFixture } from '../utils/pageFixture';
 

let browser: Browser;
let context: BrowserContext;
let page: Page;

BeforeAll( async function() {
        browser = await chromium.launch(
            { headless: false, slowMo: 100,  
                args:[
                    '--disable-blink-features=AutomationControlled',
                    '--disable-web-security',
                    '--disable-features=IsolateOrigins,site-per-process',
                    '--disable-setuid-sandbox',
                    '--no-sandbox',
                    '--disable-gpu',
                    '--use-angle=metal',
                    // ✅ Específico para Salesforce - Performance
                    '--disable-application-cache',
                    '--disable-cache',
                    '--disable-offline-load-stale-cache',
                    '--disk-cache-size=0',
                    '--disable-dev-shm-usage', // Para ambientes con poca memoria
                    '--no-zygote', // Mejor para Salesforce
                ] 
            });
});

Before( async function() {
    context = await browser.newContext({ 
        viewport: null, 
        ignoreHTTPSErrors: true,
        storageState: undefined, 
        permissions: ['clipboard-read', 'clipboard-write'],
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        extraHTTPHeaders: {
         'Accept-Language': 'en-US,en;q=0.9',
        },
    });
    
    page = await context.newPage();
    
    await context.clearCookies();
    pageFixture.page = page;  
    pageFixture.context = context;
});

// AfterStep( async function({ pickle }) {
//     //Screenshot on steps
//     if (pageFixture.page) {
//         const img = await pageFixture.page.screenshot({ path: `./win/screenshots/${pickle.name}.png`, type: "png" });
//         this.attach(img, 'image/png');
//     }
// });

After( async function({ pickle, result }) {
    //Screenshot on failure
    if (result?.status === Status.FAILED) {
        if (pageFixture.page) {
            const img = await pageFixture.page.screenshot({ path: `./fail/screenshots/${pickle.name}.png`, type: "png", fullPage: true });
            this.attach(img, 'image/png');
        }
    }

    // ✅ Limpiar sesión de Salesforce antes de cerrar
    if (pageFixture.page) {
        try {
            await pageFixture.page.evaluate(() => {
                // Limpiar todo el storage de Salesforce
                localStorage.clear();
                sessionStorage.clear();
                
                // Intentar logout programático si existe
                if ((window as any).SfdcApp?.logout) {
                    (window as any).SfdcApp.logout();
                }
            });
        } catch (e) {
            console.warn('Could not clean Salesforce storage:', e);
        }
    }

    await pageFixture.page?.close();
    await context?.close();
    
});

AfterAll(async function() {
    await browser?.close();
});