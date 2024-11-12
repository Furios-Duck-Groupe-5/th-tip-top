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

const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

let driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();

driver.get('http://www.google.com').then(() => {
    console.log('Google opened');
}).catch(err => {
    console.error('Error opening browser:', err);
});    
