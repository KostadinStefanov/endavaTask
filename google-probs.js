const {
    Builder,
    By,
    until
} = require('selenium-webdriver');

const assert = require('assert');
let driver = new Builder()
    .forBrowser('chrome')
    .build();

async function doGoogleSearch() {
    await driver.get('https://www.google.com');
    var query = driver.wait(until.elementLocated(By.name('q')));
    await query.sendKeys('wiki\n');
    await driver.wait(until.elementLocated(By.id('resultStats')), 5000)
    await driver.findElements(By.css('h3.r > a')).then(async function (titles) {
        await titles[0].getText().then(txt => assert(txt, "Wikipedia"));
    })
    await driver.quit();
}

doGoogleSearch()
    .then(_ => console.log('SUCCESS !'), e => console.error('FAILURE' + e));