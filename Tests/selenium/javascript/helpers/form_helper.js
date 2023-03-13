const { By, assert } = require('../features/support/env');
const locatorJson = require('../locators.json');
const { Key } = require('selenium-webdriver');

async function enterValueInForm(form, field, attribute, value) {
    const fieldAttr = locatorJson[form][field][attribute];
    await driver.findElement(By.css(`[${attribute}='${fieldAttr}'`)).clear();
    await driver.findElement(By.css(`[${attribute}='${fieldAttr}'`)).sendKeys(value, Key.TAB);
}

async function verifyErrorMessage(form, field, attribute, text) {
    const fieldAttr = locatorJson[form][field]["error"];
    assert.equal(await driver.findElement(By.css(`[${attribute}='${fieldAttr}']`)).getText(), text);
}

async function getLabelTextFromField(form, field, field_attribute){
    const fieldAttr = locatorJson[form][field][field_attribute];
    return await driver.findElement(By.css(`label[for='${fieldAttr}']`)).getText();
}

async function verifyButtonDisabled(form, btnText, btnStatus) {
    const expBtnStatus = await driver.findElement(By.xpath(`//button[contains(., '${btnText}')]`)).getAttribute("disabled");
    assert.equal(expBtnStatus, btnStatus);
}

async function clickButtonByText(form, btnText) {
    await driver.findElement(By.xpath(`//button[contains(., '${btnText}')]`)).click();
}

exports.enterValueInForm = enterValueInForm;
exports.verifyErrorMessage = verifyErrorMessage;
exports.getLabelTextFromField = getLabelTextFromField;
exports.verifyButtonDisabled = verifyButtonDisabled;
exports.clickButtonByText = clickButtonByText;