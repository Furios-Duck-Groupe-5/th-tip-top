import { Builder, By, until } from 'selenium-webdriver';


async function runTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:8080');
        // Ajoute ici tes assertions et tests Selenium
    } finally {
        await driver.quit();
    }
}

runTest();

let driver = await new Builder()
    .usingServer('http://selenium:4444/wd/hub')
    .forBrowser('chrome')
    .build();
