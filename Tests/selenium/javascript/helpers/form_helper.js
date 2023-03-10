const { By, assert } = require('../features/support/env');
const locatorJson = require('../locators.json');
const { Key } = require('selenium-webdriver');

async function enterValueInPage(page, field, attribute, value) {
    const fieldAttr = locatorJson[page][field][attribute];
    await driver.findElement(By.css(`[${attribute}='${fieldAttr}'`)).sendKeys(value, Key.TAB);
}

async function verifyErrorMessage(page, field, attribute, text) {
    const fieldAttr = locatorJson[page][field]["error"];
    assert.equal(await driver.findElement(By.css(`[${attribute}='${fieldAttr}']`)).getText(), text);
}

exports.enterValueInPage = enterValueInPage;
exports.verifyErrorMessage = verifyErrorMessage;