const { By, assert, until } = require('../features/support/env');
const locatorJson = require('../locators.json');
const { Key, Select } = require('selenium-webdriver');

async function enterValueInForm(form, field, attribute, value) {
    const fieldAttr = locatorJson[form][field][attribute];
    await driver.findElement(By.css(`[${attribute}='${fieldAttr}'`)).clear();
    await driver.findElement(By.css(`[${attribute}='${fieldAttr}'`)).sendKeys(value, Key.TAB);
}

async function selectValueInForm(form, field, attribute, value) {
    const fieldAttr = locatorJson[form][field][attribute];
    const selectElem = await driver.findElement(By.css(`[${attribute}='${fieldAttr}'`));
    const selectElement = new Select(selectElem);
    await selectElement.selectByVisibleText(value);
}

async function verifySelectOptions(form, field, attribute, options) {
    const fieldAttr = locatorJson[form][field][attribute];
    const selectElem = await driver.findElement(By.css(`[${attribute}='${fieldAttr}'`));
    const selectOptions =  await selectElem.findElements(By.css('option'));
    let elemOptions = [];
    for(const index in selectOptions){
        elemOptions.push(await selectOptions[index].getText())
    }
    assert.sameOrderedMembers(elemOptions, options, `${form} - ${field} has expected options`);
}

async function verifyAndSelectOption(form, field, attribute, option) {
    const fieldAttr = locatorJson[form][field][attribute];
    const selectElem = await driver.findElement(By.css(`[${attribute}='${fieldAttr}'`));
    const selectOptions =  await selectElem.findElements(By.css('option'));
    let elemOptionText = '';
    let elemOption = null;
    for(const index in selectOptions){
        const optionText = await selectOptions[index].getText();
        if(optionText.indexOf(option) > -1) {
            elemOption = await selectOptions[index];
            elemOptionText = optionText;
            break;
        }
    }
    assert.include(elemOptionText, option, `${form} - ${field} has expected options`);
    await elemOption.click();
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
    await driver.manage().setTimeouts({ implicit: 10000 });
    await driver.findElement(By.xpath(`//button[contains(., '${btnText}')]`)).click();
}

async function verifyButtonExistsInPage(page, btnText) {
    await driver.wait(until.elementLocated(By.xpath(`//button[contains(., '${btnText}')]`)), 10000);
    assert.equal(await driver.findElement(By.xpath(`//button[contains(., '${btnText}')]`)).isDisplayed(), true);
}

async function verifyButtonExistsInForm(form, btnText) {
    assert.equal(await driver.findElement(By.xpath(`//button[contains(., '${btnText}')]`)).isDisplayed(), true);
}

async function verifyFieldExistsInForm(form, field, attribute) {
    const fieldAttr = locatorJson[form][field][attribute];
    assert.equal(await driver.findElement(By.css(`[${attribute}='${fieldAttr}'`)).isDisplayed(), true);
}

exports.enterValueInForm = enterValueInForm;
exports.selectValueInForm = selectValueInForm;
exports.verifySelectOptions = verifySelectOptions;
exports.verifyAndSelectOption = verifyAndSelectOption;
exports.verifyErrorMessage = verifyErrorMessage;
exports.getLabelTextFromField = getLabelTextFromField;
exports.verifyButtonDisabled = verifyButtonDisabled;
exports.clickButtonByText = clickButtonByText;
exports.verifyButtonExistsInPage = verifyButtonExistsInPage;
exports.verifyButtonExistsInForm = verifyButtonExistsInForm;
exports.verifyFieldExistsInForm = verifyFieldExistsInForm;