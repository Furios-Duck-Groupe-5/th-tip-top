import { Builder, By, until } from 'selenium-webdriver';

async function runTest() {
    // Crée une seule instance de driver
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Premier test sur localhost
        await driver.get('http://localhost:8080');
        // Ajoute ici tes assertions et tests Selenium

        // Exemple de test avec Selenium Grid (si nécessaire)
        let gridDriver = await new Builder()
            .usingServer('http://selenium:4444/wd/hub')
            .forBrowser('chrome')
            .build();

        await gridDriver.get('http://www.google.com');
        console.log('Google opened');

    } finally {
        // Ferme le driver après les tests
        await driver.quit();
    }
}

runTest().catch(err => {
    console.error('Test échoué:', err);
});
