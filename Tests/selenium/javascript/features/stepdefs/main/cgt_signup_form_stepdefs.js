const { Given, When, Then } = require('@cucumber/cucumber');
const mainPage = require('../../../pages/mainpage');
const helper = require('../../../helpers/form_helper');

Given(/I open Caregiver Tracker website/, async() => {
    await mainPage.openCGT();
    await mainPage.verifyTitle();
});

Given(/^I confirm that the Caregiver Tracker landing page is displayed$/, async() => {
    await mainPage.verifyTitle();
});

When(/^I enter different passwords in 'Password' field and 'Repeat Password' field in 'signup' form$/, async() => {
    await helper.enterValueInForm("signup", "Password", "name", "abcABC123@");
    await helper.enterValueInForm("signup", "Repeat Password", "name", "abcABC123!");
});

When(/^I get label text of '(.*)' field in 'signup' form and enter '(.*)'$/, async(field, value) => {
    let attrValue = await helper.getLabelTextFromField("signup", field, "name");
    let sumSide;
    switch (field) {
        case 'Add Verify':
            const splitAddElement = attrValue.split('+');
            const leftSide = parseInt(splitAddElement[0].trim());
            const rightSide = parseInt(splitAddElement[1].replace('=').trim());
            sumSide = leftSide + rightSide;
            break;
        default:
            // For others
    }
    
    switch (value) {
        case 'correct value':
            await helper.enterValueInForm("signup", field, "name", sumSide);
            break;
        case 'incorrect value':
            await helper.enterValueInForm("signup", field, "name", sumSide - 1);
            break;
        default:
            await helper.enterValueInForm("signup", field, "name", value);
    }
});