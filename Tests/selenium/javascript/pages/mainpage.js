const { By } = require('../features/support/env');
const locatorJson = require('../locators.json');
const { Key } = require('selenium-webdriver');

async function openCGT() {
    await driver.get('http://localhost:4200/');
}

async function enterValueInPage(page, field, attribute, value) {
    const fieldAttr = locatorJson[page][field][attribute];
    await driver.findElement(By.css(`[${attribute}='${fieldAttr}'`)).sendKeys(value, Key.TAB);
}

exports.openCGT = openCGT;
exports.enterValueInPage = enterValueInPage;